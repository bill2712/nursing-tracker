import React, { useState, useEffect, useMemo } from 'react';
import { startOfWeek, startOfDay } from 'date-fns';
import { MilkIcon, PencilIcon, PumpIcon, FoodIcon, DropletIcon } from './Icons';
import { AppState, LogEntry, ActivityType } from '../types';
import { formatTimer, generateId, formatTimeAgoAbsolute, getTodayVolumeTotals, normalizeMl } from '../utils';

interface TrackerProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

const Tracker: React.FC<TrackerProps> = ({ appState }) => {
  const [elapsed, setElapsed] = useState(0);
  const [showManualModal, setShowManualModal] = useState(false);
  
  const [manualType, setManualType] = useState<ActivityType>('feeding');
  const [manualStartTime, setManualStartTime] = useState('');
  const [manualEndTime, setManualEndTime] = useState('');
  const [manualDetails, setManualDetails] = useState<LogEntry['details']>({ feedingType: 'bottle', foods: [] });
  const [quickSolidMl, setQuickSolidMl] = useState('');
  const [quickUrineMl, setQuickUrineMl] = useState('');
  const [quickSaving, setQuickSaving] = useState<'solids' | 'diaper' | null>(null);

  // Active Timer Edit Modal State
  const [showActiveEditModal, setShowActiveEditModal] = useState(false);
  const [activeEditStartTime, setActiveEditStartTime] = useState('');

  // Timer Tick
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    const updateTick = () => {
      if (!appState.activeTimer) {
        setElapsed(0);
        return;
      }

      const now = Date.now();
      const { startTime, pauseStartTime, ignoredDurationMs, addedDurationMs } = appState.activeTimer;
      const totalIgnored = ignoredDurationMs || 0;
      const totalAdded = addedDurationMs || 0;

      if (pauseStartTime) {
        // If paused, elapsed time is fixed at the moment pause started
        setElapsed(Math.floor((pauseStartTime - startTime - totalIgnored + totalAdded) / 1000));
      } else {
        // Running normally
        setElapsed(Math.floor((now - startTime - totalIgnored + totalAdded) / 1000));
      }
    };

    if (appState.activeTimer) {
      updateTick(); // Initial update
      interval = setInterval(updateTick, 1000);
    } else {
      setElapsed(0);
    }
    return () => clearInterval(interval);
  }, [appState.activeTimer]);

  // Resume a snoozed timer when its five-minute pause expires, even if this
  // screen was left open in the background.
  useEffect(() => {
    const timer = appState.activeTimer;
    if (!timer?.snoozeEndTime || !timer.pauseStartTime) return;

    const resume = async () => {
      const resumeTime = Math.max(Date.now(), timer.snoozeEndTime as number);
      const { pauseStartTime, snoozeEndTime, ...runningTimer } = timer;
      await setDoc(doc(db, 'system', 'activeTimer'), {
        ...runningTimer,
        ignoredDurationMs: (timer.ignoredDurationMs || 0) + (resumeTime - pauseStartTime)
      });
    };

    const remaining = timer.snoozeEndTime - Date.now();
    if (remaining <= 0) {
      void resume();
      return;
    }
    const timeoutId = window.setTimeout(() => void resume(), remaining);
    return () => window.clearTimeout(timeoutId);
  }, [appState.activeTimer]);

  const lastActivities = useMemo(() => {
    const sorted = [...appState.logs].sort((a, b) => b.startTime - a.startTime);
    return {
      feeding: sorted.find(l => l.type === 'feeding'),
      sleep: sorted.find(l => l.type === 'sleep'),
      diaper: sorted.find(l => l.type === 'diaper'),
      solids: sorted.find(l => l.type === 'solids')
    };
  }, [appState.logs]);

  const weeklyBathCount = useMemo(() => {
    const now = Date.now();
    const weekStart = startOfWeek(now, { weekStartsOn: 1 }).getTime();
    return appState.logs.filter(l => l.type === 'sleep' && l.startTime >= weekStart).length;
  }, [appState.logs]);

  const dailyFeedingVolume = useMemo(() => {
    const now = Date.now();
    const dayStart = startOfDay(now).getTime();
    return appState.logs
      .filter(l => l.type === 'feeding' && l.startTime >= dayStart)
      .reduce((acc, curr) => acc + (curr.details.amountMl || 0), 0);
  }, [appState.logs]);

  const dailyFeedingCount = useMemo(() => {
    const now = Date.now();
    const dayStart = startOfDay(now).getTime();
    return appState.logs.filter(l => l.type === 'feeding' && l.startTime >= dayStart).length;
  }, [appState.logs]);

  const dailyDiaperCounts = useMemo(() => {
    const now = Date.now();
    const dayStart = startOfDay(now).getTime();
    const diapers = appState.logs.filter(l => l.type === 'diaper' && l.startTime >= dayStart);
    let wet = 0; let dirty = 0;
    diapers.forEach(d => {
      if (d.details.diaperState === 'wet') wet++;
      if (d.details.diaperState === 'dirty') dirty++;
      if (d.details.diaperState === 'mixed') { wet++; dirty++; }
    });
    return { wet, dirty, total: diapers.length };
  }, [appState.logs]);

  const dailyVolumeTotals = useMemo(() => getTodayVolumeTotals(appState.logs), [appState.logs]);

  const dailySnotCount = useMemo(() => {
    const now = Date.now();
    const dayStart = startOfDay(now).getTime();
    return appState.logs.filter(l => l.type === 'clear_snot' && l.startTime >= dayStart).length;
  }, [appState.logs]);

  const dailyMouthCount = useMemo(() => {
    const now = Date.now();
    const dayStart = startOfDay(now).getTime();
    return appState.logs.filter(l => l.type === 'clean_mouth' && l.startTime >= dayStart).length;
  }, [appState.logs]);

  // --- Firestore Actions ---

  const startTimer = async (type: ActivityType) => {
    const newTimer = {
      type,
      startTime: Date.now(),
      ignoredDurationMs: 0,
      details: type === 'feeding' ? { feedingType: 'bottle' } : {} // Default feeding to bottle
    };
    await setDoc(doc(db, 'system', 'activeTimer'), newTimer);
  };

  const quickLogSleep = async (minutes: number) => {
    const now = Date.now();
    const start = now - (minutes * 60 * 1000);
    const newLog: LogEntry = {
        id: generateId(),
        type: 'sleep',
        startTime: start,
        endTime: now,
        durationSeconds: minutes * 60,
        details: {}
    };
    // Use Log ID as document ID
    await setDoc(doc(db, 'logs', newLog.id), newLog);
  };

  const quickLogSolids = async () => {
    const amountMl = normalizeMl(quickSolidMl);
    if (!amountMl) {
      alert('請輸入 1 至 2000 ml 的副食份量');
      return;
    }

    setQuickSaving('solids');
    try {
      const newLog: LogEntry = {
        id: generateId(),
        type: 'solids',
        startTime: Date.now(),
        details: { amountMl }
      };
      await setDoc(doc(db, 'logs', newLog.id), newLog);
      setQuickSolidMl('');
    } finally {
      setQuickSaving(null);
    }
  };

  const quickLogDiaper = async (diaperState: 'wet' | 'dirty' | 'mixed') => {
    const enteredUrineMl = quickUrineMl.trim() ? normalizeMl(quickUrineMl) : null;
    if (quickUrineMl.trim() && !enteredUrineMl) {
      alert('尿量請輸入 1 至 2000 ml');
      return;
    }

    setQuickSaving('diaper');
    try {
      const details: LogEntry['details'] = { diaperState };
      if (enteredUrineMl) details.urineMl = enteredUrineMl;
      const newLog: LogEntry = {
        id: generateId(),
        type: 'diaper',
        startTime: Date.now(),
        details
      };
      await setDoc(doc(db, 'logs', newLog.id), newLog);
      setQuickUrineMl('');
    } finally {
      setQuickSaving(null);
    }
  };

  const updateActiveDetails = async (updates: Partial<LogEntry['details']>) => {
      if (!appState.activeTimer) return;
      const updatedTimer = {
          ...appState.activeTimer,
          details: { ...appState.activeTimer.details, ...updates }
      };
      await setDoc(doc(db, 'system', 'activeTimer'), updatedTimer);
  };

  const toLocalISO = (timestamp: number) => {
    const d = new Date(timestamp);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  };

  const openActiveEditModal = () => {
      if (appState.activeTimer) {
          setActiveEditStartTime(toLocalISO(appState.activeTimer.startTime));
          setShowActiveEditModal(true);
      }
  };

  const saveActiveEdit = async () => {
      if (!appState.activeTimer) return;
      const newStart = new Date(activeEditStartTime).getTime();
      
      const updatedTimer = {
          ...appState.activeTimer,
          startTime: newStart
      };
      await setDoc(doc(db, 'system', 'activeTimer'), updatedTimer);
      setShowActiveEditModal(false);
  };

  const stopTimer = async () => {
    if (!appState.activeTimer) return;

    const { startTime, pauseStartTime, ignoredDurationMs, addedDurationMs } = appState.activeTimer;
    
    // Calculate end time and duration
    const effectiveEndTime = pauseStartTime || Date.now();
    const durationSeconds = Math.floor((effectiveEndTime - startTime - (ignoredDurationMs || 0)) / 1000);
    
    if (durationSeconds > 2) {
      const newLog: LogEntry = {
        id: generateId(),
        type: appState.activeTimer.type,
        startTime: appState.activeTimer.startTime,
        endTime: effectiveEndTime,
        durationSeconds,
        details: appState.activeTimer.details
      };
      
      // Batch write: Add log AND clear timer
      await setDoc(doc(db, 'logs', newLog.id), newLog);
      await deleteDoc(doc(db, 'system', 'activeTimer'));
    } else {
      // Just clear timer if too short
      await deleteDoc(doc(db, 'system', 'activeTimer'));
    }
  };

  const cancelTimer = async () => {
    await deleteDoc(doc(db, 'system', 'activeTimer'));
  };

  const togglePause = async () => {
    if (!appState.activeTimer) return;
    
    const now = Date.now();
    let updatedTimer;

    if (appState.activeTimer.pauseStartTime) {
        // RESUME
        const pausedDuration = now - appState.activeTimer.pauseStartTime;
        const { pauseStartTime, snoozeEndTime, ...runningTimer } = appState.activeTimer;
        updatedTimer = {
            ...runningTimer,
            ignoredDurationMs: (appState.activeTimer.ignoredDurationMs || 0) + pausedDuration
        };
    } else {
        // PAUSE
        updatedTimer = {
            ...appState.activeTimer,
            pauseStartTime: now
        };
    }
    await setDoc(doc(db, 'system', 'activeTimer'), updatedTimer);
  };

  const handleSnooze = async () => {
    if (!appState.activeTimer) return;
    
    const now = Date.now();
    const SNOOZE_DURATION = 5 * 60 * 1000;
    let updatedTimer;

    if (appState.activeTimer.snoozeEndTime) {
        // Resume from snooze
        // Reuse togglePause logic essentially? No, snooze is special state.
        // Actually UI calls togglePause if Snoozing.
        // But here we handle switching TO Snooze.
        // Only if currently snoozing we call THIS function? No.
        // Logic below assumes switching TO snooze.
        return; 
    } 
    
    // Switch TO Snooze
    if (appState.activeTimer.pauseStartTime) {
        // Manually Paused -> Switch to Snooze
        updatedTimer = {
            ...appState.activeTimer,
            snoozeEndTime: now + SNOOZE_DURATION
        };
    } else {
        // Running -> Pause & Snooze
        updatedTimer = {
            ...appState.activeTimer,
            pauseStartTime: now,
            snoozeEndTime: now + SNOOZE_DURATION
        };
    }
    await setDoc(doc(db, 'system', 'activeTimer'), updatedTimer);
  };

  const handleAddTime = async (minutes: number) => {
    if (!appState.activeTimer) return;
    const msToAdd = minutes * 60 * 1000;
    const updatedTimer = {
        ...appState.activeTimer,
        addedDurationMs: (appState.activeTimer.addedDurationMs || 0) + msToAdd
    };
    await setDoc(doc(db, 'system', 'activeTimer'), updatedTimer);
  };

  const handleManualSubmit = async () => {
    const isPointEvent = manualType === 'diaper' || manualType === 'solids';
    if (!manualStartTime || (!isPointEvent && !manualEndTime)) {
      alert(isPointEvent ? '請選擇紀錄時間' : '請選擇開始及結束時間');
      return;
    }

    const start = new Date(manualStartTime).getTime();
    const end = isPointEvent ? undefined : new Date(manualEndTime).getTime();

    if (!Number.isFinite(start) || (!isPointEvent && (!Number.isFinite(end) || (end as number) <= start))) {
      alert('結束時間必須遲於開始時間');
      return;
    }

    if (manualDetails.amountMl !== undefined && (manualDetails.amountMl < 0 || manualDetails.amountMl > 2000)) {
      alert('份量請輸入 0 至 2000 ml');
      return;
    }
    if (manualDetails.urineMl !== undefined && (manualDetails.urineMl < 0 || manualDetails.urineMl > 2000)) {
      alert('尿量請輸入 0 至 2000 ml');
      return;
    }

    const details: LogEntry['details'] = { ...manualDetails };
    if (manualType === 'feeding') {
      details.feedingType = 'bottle';
      delete details.diaperState;
      delete details.urineMl;
      delete details.foods;
      delete details.reaction;
    } else if (manualType === 'diaper') {
      details.diaperState ||= 'wet';
      delete details.amountMl;
      delete details.feedingType;
      delete details.foods;
      delete details.reaction;
    } else if (manualType === 'solids') {
      delete details.diaperState;
      delete details.urineMl;
      delete details.feedingType;
    } else {
      delete details.amountMl;
      delete details.diaperState;
      delete details.urineMl;
      delete details.feedingType;
      delete details.foods;
      delete details.reaction;
    }
    Object.keys(details).forEach(key => {
      if (details[key as keyof LogEntry['details']] === undefined) {
        delete details[key as keyof LogEntry['details']];
      }
    });

    const newLog: LogEntry = {
      id: generateId(),
      type: manualType,
      startTime: start,
      ...(end ? { endTime: end, durationSeconds: Math.floor((end - start) / 1000) } : {}),
      details
    };

    await setDoc(doc(db, 'logs', newLog.id), newLog);
    setShowManualModal(false);
  };

  const initManualEntry = () => {
    const now = new Date();
    const localIso = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
    setManualStartTime(localIso);
    setManualEndTime(localIso);
    setManualType('feeding');
    setManualDetails({ feedingType: 'bottle', foods: [] }); // Default to bottle
    setShowManualModal(true);
  };

  const selectManualType = (type: ActivityType) => {
    setManualType(type);
    setManualDetails(
      type === 'feeding' ? { feedingType: 'bottle' } :
      type === 'diaper' ? { diaperState: 'wet' } :
      type === 'solids' ? { foods: [] } : {}
    );
  };

  if (appState.activeTimer) {
    const isFeeding = appState.activeTimer.type === 'feeding';
    const isPumping = appState.activeTimer.type === 'pumping';
    const isSleep = appState.activeTimer.type === 'sleep';
    const isPaused = !!appState.activeTimer.pauseStartTime;
    const isSnoozed = !!appState.activeTimer.snoozeEndTime;
    
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 space-y-6 animate-fade-in relative">
        <div className="relative mt-4">
          <div className={`absolute -inset-4 rounded-full opacity-30 transition-all duration-500
             ${isSnoozed ? 'bg-amber-400 animate-pulse' : 
               isPaused ? 'bg-slate-300 dark:bg-slate-700' : 
               (isFeeding ? 'bg-pink-300 dark:bg-pink-800 animate-pulse' : 
                (isPumping ? 'bg-cyan-300 dark:bg-cyan-800 animate-pulse' :
                'bg-indigo-300 dark:bg-indigo-800 animate-pulse'))}
          `}></div>
          <div className={`relative p-8 rounded-full border-4 transition-all duration-500 flex items-center justify-center
             ${isSnoozed ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/50' : 
               isPaused ? 'border-slate-400 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 grayscale' : 
               (isFeeding ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/40' : 
                (isPumping ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/40' :
                'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/40'))}
          `}>
             {isFeeding ? <MilkIcon className="w-16 h-16 text-pink-500" /> : 
              (isPumping ? <PumpIcon className="w-16 h-16 text-cyan-500" /> : <DropletIcon className="w-16 h-16 text-indigo-500" />)}
             
             {/* Visual Overlay for Paused/Snoozed */}
             {(isPaused || isSnoozed) && (
                 <div className="absolute inset-0 flex items-center justify-center bg-white/40 dark:bg-black/40 rounded-full backdrop-blur-[1px]">
                     <span className={`font-black text-xs uppercase tracking-widest px-2 py-1 rounded bg-white dark:bg-slate-900 shadow-sm
                        ${isSnoozed ? 'text-amber-600 dark:text-amber-400 animate-pulse' : 'text-slate-600 dark:text-slate-300 animate-pulse'}
                     `}>
                        {isSnoozed ? '貪睡中' : '已暫停'}
                     </span>
                 </div>
             )}
          </div>
          
          {isSnoozed && (
             <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-sm tracking-wider uppercase bg-amber-500 animate-bounce whitespace-nowrap z-10">
                Resuming Soon
             </div>
          )}
        </div>
        
        <div className="text-center relative">
          <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-1">
            {isSnoozed ? '貪睡中...' : (isPaused ? '計時暫停' : (isFeeding ? '餵奶時間' : (isPumping ? '擠奶時間' : '沖涼中')))}
          </h2>
          <div className={`flex items-center justify-center space-x-2 transition-all duration-300 ${isPaused || isSnoozed ? 'opacity-70' : 'opacity-100'}`}>
              <div className={`text-5xl font-mono font-medium tracking-wider transition-all duration-300 ${isPaused || isSnoozed ? 'text-slate-500 dark:text-slate-500' : 'text-slate-800 dark:text-white'} ${(isPaused || isSnoozed) ? 'animate-pulse' : ''}`}>
                {formatTimer(elapsed)}
              </div>
              <button 
                onClick={openActiveEditModal}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                aria-label="Edit Start Time"
              >
                  <PencilIcon className="w-5 h-5" />
              </button>
          </div>
          {isSnoozed && <div className="text-sm text-amber-600 dark:text-amber-400 mt-2 font-bold animate-pulse">5分鐘後自動繼續</div>}
        </div>

        {/* Notes Input (Hidden for Feeding) */}
        {!isFeeding && (
          <div className="w-full max-w-sm space-y-2">
             <label className="text-xs font-bold text-slate-400 uppercase ml-1">備註</label>
             <textarea
               className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-pink-500 outline-none resize-none text-slate-700 dark:text-slate-200 bg-white/50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-800 transition-colors"
               placeholder="新增備註..."
               value={appState.activeTimer.details?.notes || ''}
               onChange={(e) => updateActiveDetails({ notes: e.target.value })}
               rows={2}
             />
          </div>
        )}

        {/* Simplified Feeding Controls */}
        {isFeeding && (
          <div className="w-full max-w-sm space-y-4 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
              {/* Duration Controls */}
              <div className="flex flex-col items-center space-y-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex justify-center space-x-2 mb-1">
                    <span className="text-sm font-bold text-pink-600 dark:text-pink-400">增加餵奶時間</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <input 
                      type="number" 
                      inputMode="decimal"
                      pattern="[0-9]*"
                      placeholder="+20" 
                      id="custom-duration-input"
                      className="w-24 p-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-lg text-center font-mono text-lg"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const val = parseInt(e.currentTarget.value);
                          if (!isNaN(val) && val > 0) {
                            handleAddTime(val);
                            e.currentTarget.value = '';
                          }
                        }
                      }}
                    />
                    <span className="text-slate-500 dark:text-slate-400 font-medium">分鐘</span>
                    <button 
                      onClick={() => {
                        const input = document.getElementById('custom-duration-input') as HTMLInputElement;
                        const val = parseInt(input.value);
                        if (!isNaN(val) && val > 0) {
                          handleAddTime(val);
                          input.value = '';
                        }
                      }}
                      className="ml-1 px-3 py-2 bg-pink-100 hover:bg-pink-200 dark:bg-pink-900/30 dark:hover:bg-pink-900/50 text-pink-600 dark:text-pink-400 rounded-lg text-sm font-bold transition-colors"
                    >
                      加入
                    </button>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 mt-1">
                      {[10, 15, 20].map(mins => (
                          <button 
                              key={mins}
                              onClick={() => handleAddTime(mins)}
                              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 transition-all h-9 flex items-center justify-center"
                          >
                              +{mins} 分鐘
                          </button>
                      ))}
                  </div>
              </div>

              {/* Volume Controls */}
              <div className="flex justify-center space-x-2 mb-2 mt-2">
                <span className="text-sm font-bold text-pink-600 dark:text-pink-400">餵奶份量</span>
              </div>
              <div className="flex flex-col items-center space-y-3">
                  <div className="flex items-center justify-center space-x-2">
                    <input 
                      type="number" 
                      inputMode="decimal"
                      pattern="[0-9]*"
                      placeholder="ml" 
                      value={appState.activeTimer.details?.amountMl || ''}
                      className="w-24 p-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-lg text-center font-mono text-lg"
                      onChange={(e) => updateActiveDetails({ amountMl: parseInt(e.target.value) || 0, feedingType: 'bottle' })}
                    />
                    <span className="text-slate-500 dark:text-slate-400 font-medium">ml</span>
                  </div>
                  {/* Quick Select Buttons */}
                  <div className="flex flex-wrap justify-center gap-2">
                      {[110, 140, 170, 200].map(amt => (
                          <button 
                              key={amt}
                              onClick={() => updateActiveDetails({ amountMl: amt, feedingType: 'bottle' })}
                              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 transition-all h-9 flex items-center justify-center"
                          >
                              {amt}ml
                          </button>
                      ))}
                  </div>
              </div>
          </div>
        )}

        {/* Simplified Sleep Controls */}
        {isSleep && (
          <div className="w-full max-w-sm space-y-4 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="flex flex-col items-center space-y-3 pb-2">
                  <div className="flex justify-center space-x-2 mb-1">
                    <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">增加沖涼時間</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <input 
                      type="number" 
                      inputMode="decimal"
                      pattern="[0-9]*"
                      placeholder="+10" 
                      id="active-sleep-duration-input"
                      className="w-24 p-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-lg text-center font-mono text-lg"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const val = parseInt(e.currentTarget.value);
                          if (!isNaN(val) && val > 0) {
                            handleAddTime(val);
                            e.currentTarget.value = '';
                          }
                        }
                      }}
                    />
                    <span className="text-slate-500 dark:text-slate-400 font-medium">分鐘</span>
                    <button 
                      onClick={() => {
                        const input = document.getElementById('active-sleep-duration-input') as HTMLInputElement;
                        const val = parseInt(input.value);
                        if (!isNaN(val) && val > 0) {
                          handleAddTime(val);
                          input.value = '';
                        }
                      }}
                      className="ml-1 px-3 py-2 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm font-bold transition-colors"
                    >
                      加入
                    </button>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 mt-1">
                      {[5, 10, 15, 20].map(mins => (
                          <button 
                              key={mins}
                              onClick={() => handleAddTime(mins)}
                              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 transition-all h-9 flex items-center justify-center"
                          >
                              +{mins} 分鐘
                          </button>
                      ))}
                  </div>
              </div>
          </div>
        )}

        {/* Timer Controls */}
        <div className="w-full max-w-xs space-y-3">
            {!isFeeding && (
                <div className="flex space-x-3">
                    <button
                        onClick={togglePause}
                        className={`flex-1 py-3 rounded-xl font-bold text-sm transition-colors ${isPaused && !isSnoozed ? 'bg-emerald-500 text-white shadow-emerald-200 dark:shadow-none shadow-md' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                    >
                        {isPaused && !isSnoozed ? '繼續' : '暫停'}
                    </button>
                    <button
                        onClick={handleSnooze}
                        className={`flex-1 py-3 rounded-xl font-bold text-sm transition-colors ${isSnoozed ? 'bg-emerald-500 text-white shadow-emerald-200 dark:shadow-none shadow-md' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                    >
                        {isSnoozed ? '繼續' : '貪睡 5分'}
                    </button>
                </div>
            )}

            <div className="flex space-x-4 w-full">
                <button 
                    onClick={cancelTimer}
                    className="flex-1 py-4 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                >
                    取消
                </button>
                <button 
                    onClick={stopTimer}
                    className={`flex-1 py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-transform active:scale-95 ${isFeeding ? 'bg-pink-500 hover:bg-pink-600 shadow-pink-200 dark:shadow-none' : (isPumping ? 'bg-cyan-500 hover:bg-cyan-600 shadow-cyan-200 dark:shadow-none' : 'bg-indigo-500 hover:bg-indigo-600 shadow-indigo-200 dark:shadow-none')}`}
                >
                    完成
                </button>
            </div>
        </div>

        {/* Edit Active Timer Modal */}
        {showActiveEditModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in" onClick={() => setShowActiveEditModal(false)}>
                <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl shadow-xl overflow-hidden p-6" onClick={e => e.stopPropagation()}>
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-4">編輯開始時間</h3>
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">開始時間</label>
                            <input 
                                type="datetime-local" 
                                value={activeEditStartTime}
                                onChange={e => setActiveEditStartTime(e.target.value)}
                                className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white rounded-lg text-sm"
                            />
                            <p className="text-xs text-slate-400">如果您忘記按開始，可在此修正。</p>
                        </div>
                        <button 
                            onClick={saveActiveEdit}
                            className="w-full py-3 bg-slate-900 dark:bg-slate-700 text-white font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors"
                        >
                            更新時間
                        </button>
                    </div>
                </div>
            </div>
        )}
      </div>
    );
  }

  // --- Main Tracker View ---
  return (
    <div className="flex flex-col h-full p-3 sm:p-4 space-y-3 overflow-y-auto pb-24">
      {/* Hide Header internally or remove it per user request */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">今日概覽</p>
          <p className="text-sm font-black text-slate-700 dark:text-slate-200">照顧紀錄</p>
        </div>
        <button 
          onClick={initManualEntry}
          className="min-h-10 text-xs font-bold text-pink-700 dark:text-pink-300 bg-pink-50 dark:bg-pink-900/20 px-3 py-2 rounded-xl hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors"
        >
          + 補登紀錄
        </button>
      </div>

      {/* Last Activity Dashboard */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between min-h-28">
           <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase">上次餵奶</span>
           <span className="text-xl font-black text-pink-600 dark:text-pink-400 leading-tight mt-2">
             {lastActivities.feeding ? formatTimeAgoAbsolute(lastActivities.feeding.endTime || lastActivities.feeding.startTime) : '--'}
           </span>
           <div className="mt-2">
             <span className="block text-sm font-black text-pink-500/80 dark:text-pink-400/80">
               {lastActivities.feeding?.details?.amountMl ? `${lastActivities.feeding.details.amountMl}ml` : ' '}
             </span>
             <span className="block text-[11px] font-bold text-slate-500 dark:text-slate-400">
               今日 {dailyFeedingCount}次 / {dailyFeedingVolume}ml
             </span>
           </div>
        </div>
        
        <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between min-h-28">
           <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase">上次沖涼</span>
           <span className="text-xl font-black text-indigo-600 dark:text-indigo-400 leading-tight mt-2">
             {lastActivities.sleep ? formatTimeAgoAbsolute(lastActivities.sleep.endTime || lastActivities.sleep.startTime) : '--'}
           </span>
           <div className="mt-2 space-y-0.5">
             <span className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-1">
               本週 {weeklyBathCount} 次
             </span>
           </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between min-h-28">
           <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase">上次換片</span>
           <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 leading-tight mt-2">
             {lastActivities.diaper ? formatTimeAgoAbsolute(lastActivities.diaper.startTime) : '--'}
           </span>
           <div className="mt-2 space-y-0.5">
             <span className="block text-sm font-black text-emerald-500/80 dark:text-emerald-400/80">
               {lastActivities.diaper?.details?.diaperState ? (
                 lastActivities.diaper.details.diaperState === 'wet' ? '濕' : lastActivities.diaper.details.diaperState === 'dirty' ? '髒' : '混合'
               ) : ' '}
               {lastActivities.diaper?.details?.urineMl ? ` · ${lastActivities.diaper.details.urineMl}ml` : ''}
             </span>
             <span className="block text-[11px] font-bold text-slate-500 dark:text-slate-400">
               今日 {dailyDiaperCounts.wet}濕 {dailyDiaperCounts.dirty}髒 · {dailyVolumeTotals.urineMl}ml
             </span>
           </div>
        </div>
        
        <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between min-h-28">
           <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase">上次副食</span>
           <span className="text-xl font-black text-orange-600 dark:text-orange-400 leading-tight mt-2">
             {lastActivities.solids ? formatTimeAgoAbsolute(lastActivities.solids.startTime) : '--'}
           </span>
           <div className="mt-2 space-y-0.5">
             <span className="block text-sm font-black text-orange-500/80 dark:text-orange-400/80">
               {lastActivities.solids?.details.amountMl ? `${lastActivities.solids.details.amountMl}ml` : ' '}
             </span>
             <span className="block text-[11px] font-bold text-slate-500 dark:text-slate-400">
               今日副食 {dailyVolumeTotals.solidsMl}ml
             </span>
           </div>
        </div>
      </div>


      {/* Prediction Widget (Removed since Sleep is changed to Bathe) */}

      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div className="relative group h-full">
            <button 
              onClick={() => startTimer('feeding')}
              className="w-full relative overflow-hidden bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-[20px] shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md hover:border-pink-200 dark:hover:border-pink-900 transition-all text-left flex flex-col justify-start active:scale-[0.98] h-full pb-3 sm:pb-4"
            >
              <div className="absolute -right-4 -bottom-4 pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
                <MilkIcon className="w-40 h-40 text-pink-500" />
              </div>
              <div className="relative z-10 flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center text-pink-600 dark:text-pink-400 shadow-sm">
                  <MilkIcon className="w-5 h-5" />
                </div>
                <div>
                   <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight">開始餵奶</h3>
                   <p className="text-slate-500 dark:text-slate-400 text-[10px] sm:text-xs font-medium">記錄時間和份量</p>
                </div>
              </div>
            </button>
        </div>

        <div className="relative group h-full">
            <button 
              onClick={() => startTimer('sleep')}
              className="w-full relative overflow-hidden bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-[20px] shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-900 transition-all text-left flex flex-col justify-start active:scale-[0.98] h-full pb-10 sm:pb-12"
            >
              <div className="absolute -right-4 -bottom-4 pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
                <DropletIcon className="w-40 h-40 text-indigo-500" />
              </div>
              <div className="relative z-10 flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-sm">
                  <DropletIcon className="w-5 h-5" />
                </div>
                <div>
                   <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight">開始沖涼</h3>
                   <p className="text-slate-500 dark:text-slate-400 text-[10px] sm:text-xs font-medium">記錄洗澡時間</p>
                </div>
              </div>
            </button>
            {/* Quick Bathe Log Buttons Overlay */}
            <div className="absolute bottom-2 left-2 right-2 flex space-x-1.5 z-20">
                {[5, 10, 15].map(mins => (
                    <button
                        key={mins}
                        onClick={(e) => {
                            e.stopPropagation();
                            quickLogSleep(mins);
                        }}
                        className="flex-1 py-1 text-[11px] font-bold bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors border border-indigo-200/50 dark:border-indigo-800 active:scale-95 shadow-sm"
                    >
                        {mins}分
                    </button>
                ))}
            </div>
        </div>
      </div>
      
      {/* Quick Actions (Bottom) */}
      <div className="space-y-2">
         {/* 每日任務 Daily Tasks */}
         <div>
            <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 mb-1.5 uppercase tracking-wider">每日任務</p>
            <div className="grid grid-cols-2 gap-2">
               <button
                   onClick={async () => {
                       const newLog: LogEntry = {
                           id: generateId(),
                           type: 'clear_snot',
                           startTime: Date.now(),
                           details: {}
                       };
                       await setDoc(doc(db, 'logs', newLog.id), newLog);
                   }}
                   className={`py-2 px-3 rounded-xl text-[13px] font-black transition-all flex justify-between items-center active:scale-95 shadow-sm ${dailySnotCount >= 2 ? 'bg-sky-500 text-white shadow-sky-200 dark:shadow-none' : 'bg-sky-50 dark:bg-sky-900/30 hover:bg-sky-100 dark:hover:bg-sky-900/50 text-sky-700 dark:text-sky-300'}`}
               >
                   <span className="flex items-center space-x-1.5">
                       <span className="text-lg">🤧</span>
                       <span>清鼻涕</span>
                   </span>
                   <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${dailySnotCount >= 2 ? 'bg-white/20 text-white' : 'bg-sky-200/50 dark:bg-sky-800 text-sky-800 dark:text-sky-200'}`}>
                       {dailySnotCount} / 2
                   </span>
               </button>
               <button
                   onClick={async () => {
                       const newLog: LogEntry = {
                           id: generateId(),
                           type: 'clean_mouth',
                           startTime: Date.now(),
                           details: {}
                       };
                       await setDoc(doc(db, 'logs', newLog.id), newLog);
                   }}
                   className={`py-2 px-3 rounded-xl text-[13px] font-black transition-all flex justify-between items-center active:scale-95 shadow-sm ${dailyMouthCount >= 1 ? 'bg-teal-500 text-white shadow-teal-200 dark:shadow-none' : 'bg-teal-50 dark:bg-teal-900/30 hover:bg-teal-100 dark:hover:bg-teal-900/50 text-teal-700 dark:text-teal-300'}`}
               >
                   <span className="flex items-center space-x-1.5">
                       <span className="text-lg">🦷</span>
                       <span>清潔口腔</span>
                   </span>
                   <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${dailyMouthCount >= 1 ? 'bg-white/20 text-white' : 'bg-teal-200/50 dark:bg-teal-800 text-teal-800 dark:text-teal-200'}`}>
                       {dailyMouthCount} / 1
                   </span>
               </button>
            </div>
         </div>

         {/* Quick Add Solids */}
         <div className="rounded-2xl border border-orange-100 bg-orange-50/70 p-3 dark:border-orange-900/40 dark:bg-orange-950/20">
           <div className="mb-2 flex items-center justify-between gap-2">
             <p className="text-xs font-black text-orange-800 dark:text-orange-300">🥣 快速記錄副食</p>
             <span className="text-[11px] font-bold text-orange-700/70 dark:text-orange-300/70">今日 {dailyVolumeTotals.solidsMl}ml</span>
           </div>
           <div className="flex gap-2">
             <label className="relative min-w-0 flex-1">
               <span className="sr-only">副食份量</span>
               <input
                 type="number"
                 inputMode="numeric"
                 min="1"
                 max="2000"
                 value={quickSolidMl}
                 onChange={event => setQuickSolidMl(event.target.value)}
                 onKeyDown={event => { if (event.key === 'Enter') quickLogSolids(); }}
                 placeholder="輸入份量"
                 className="min-h-11 w-full rounded-xl border border-orange-200 bg-white px-3 pe-10 text-base font-bold text-slate-800 placeholder:text-slate-400 dark:border-orange-900 dark:bg-slate-900 dark:text-white"
               />
               <span className="pointer-events-none absolute inset-y-0 end-3 flex items-center text-xs font-bold text-slate-400">ml</span>
             </label>
             <button
               onClick={quickLogSolids}
               disabled={quickSaving !== null}
               className="min-h-11 shrink-0 rounded-xl bg-orange-500 px-4 text-sm font-black text-white shadow-sm transition hover:bg-orange-600 active:scale-95 disabled:cursor-wait disabled:opacity-60"
             >
               {quickSaving === 'solids' ? '儲存中' : '記錄'}
             </button>
           </div>
         </div>

         {/* Quick Add Diaper */}
         <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-3 dark:border-emerald-900/40 dark:bg-emerald-950/20">
           <div className="mb-2 flex items-center justify-between gap-2">
             <p className="text-xs font-black text-emerald-800 dark:text-emerald-300">快速換片</p>
             <span className="text-[11px] font-bold text-emerald-700/70 dark:text-emerald-300/70">今日 {dailyDiaperCounts.total}次 · {dailyVolumeTotals.urineMl}ml</span>
           </div>
           <label className="relative mb-2 block">
             <span className="sr-only">今次尿量，可選填</span>
             <input
               type="number"
               inputMode="numeric"
               min="1"
               max="2000"
               value={quickUrineMl}
               onChange={event => setQuickUrineMl(event.target.value)}
               placeholder="今次尿量（可選填）"
               className="min-h-11 w-full rounded-xl border border-emerald-200 bg-white px-3 pe-10 text-base font-bold text-slate-800 placeholder:text-sm placeholder:font-medium placeholder:text-slate-400 dark:border-emerald-900 dark:bg-slate-900 dark:text-white"
             />
             <span className="pointer-events-none absolute inset-y-0 end-3 flex items-center text-xs font-bold text-slate-400">ml</span>
           </label>
            <div className="grid grid-cols-3 gap-2">
               {(['wet', 'dirty', 'mixed'] as const).map((type) => (
                   <button
                       key={type}
                       onClick={() => quickLogDiaper(type)}
                       disabled={quickSaving !== null}
                       className="min-h-11 bg-emerald-100 dark:bg-emerald-900/40 hover:bg-emerald-200 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 py-2.5 rounded-xl text-[12px] font-black tracking-wide transition-all active:scale-95 shadow-sm flex justify-center items-center disabled:cursor-wait disabled:opacity-60"
                   >
                       <span>{type === 'wet' ? '💧 濕' : (type === 'dirty' ? '💩 髒' : '✨ 混合')}</span>
                   </button>
               ))}
            </div>
         </div>
      </div>

      {/* Manual Entry Modal */}
      {showManualModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowManualModal(false)}>
           <div 
             className="bg-white dark:bg-slate-900 w-full sm:max-w-sm rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden animate-slide-up sm:animate-fade-in flex flex-col max-h-[90vh]" 
             onClick={e => e.stopPropagation()}
           >
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 shrink-0">
                 <h3 className="font-bold text-slate-700 dark:text-slate-200">補登紀錄</h3>
                 <button onClick={() => setShowManualModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 font-medium">取消</button>
              </div>
              
               <div className="p-6 space-y-6 overflow-y-auto w-full">
                 {/* Type Selector */}
                 <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex-wrap">
                    {['feeding', 'sleep', 'diaper', 'solids'].map((t) => (
                      <button 
                        key={t}
                        onClick={() => selectManualType(t as ActivityType)}
                        className={`py-2 px-3 text-xs sm:text-sm font-bold rounded-lg transition-all ${manualType === t ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
                      >{
                        t === 'feeding' ? '餵奶' : 
                        (t === 'sleep' ? '沖涼' : 
                        (t === 'solids' ? '副食品' : '換片'))
                      }</button>
                    ))}
                 </div>
                 
                 {/* Special "All Day Sleep" Shortcut removed for bath */}
                 {/* Time Inputs */}
                 {manualType === 'diaper' || manualType === 'solids' ? (
                     <div className="space-y-4">
                         <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">時間</label>
                            <input 
                              type="datetime-local" 
                              value={manualStartTime}
                              onChange={e => setManualStartTime(e.target.value)}
                              className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-200 rounded-lg text-sm"
                            />
                         </div>
                         {manualType === 'diaper' && <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">狀態</label>
                            <div className="grid grid-cols-3 gap-2">
                               {['wet', 'dirty', 'mixed'].map((type) => (
                                   <button
                                       key={type}
                                       onClick={() => setManualDetails(p => ({ ...p, diaperState: type as any }))}
                                       className={`py-2 rounded-xl text-xs font-bold transition-colors border ${manualDetails.diaperState === type ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
                                   >
                                       {type === 'wet' ? '濕' : (type === 'dirty' ? '髒' : '混')}
                                   </button>
                               ))}
                            </div>
                         </div>}
                     </div>
                 ) : (
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                           <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">開始時間</label>
                           <input 
                             type="datetime-local" 
                             value={manualStartTime}
                             onChange={e => setManualStartTime(e.target.value)}
                             className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-200 rounded-lg text-sm"
                           />
                        </div>
                        <div className="space-y-1">
                           <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">結束時間</label>
                           <input 
                             type="datetime-local" 
                             value={manualEndTime}
                             onChange={e => setManualEndTime(e.target.value)}
                             className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-200 rounded-lg text-sm"
                           />
                        </div>
                     </div>
                 )}

                 {/* Quick Durations for Sleep */}
                 {manualType === 'sleep' && (
                     <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800 mt-4">
                          <div className="flex flex-col items-center space-y-3">
                              <div className="flex justify-center space-x-2 mt-2">
                                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">快速設定沖涼時間（由結束時間回推）</span>
                              </div>
                              <div className="flex items-center justify-center space-x-2">
                                <input 
                                  type="number" 
                                  placeholder="10" 
                                  id="manual-sleep-duration-input"
                                  className="w-24 p-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-lg text-center font-mono text-lg"
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      const val = parseInt(e.currentTarget.value);
                                      if (!isNaN(val) && val > 0) {
                                        const end = new Date(manualEndTime).getTime();
                                        const newStart = end - val * 60 * 1000;
                                        setManualStartTime(new Date(newStart - new Date(newStart).getTimezoneOffset() * 60000).toISOString().slice(0, 16));
                                        e.currentTarget.value = '';
                                      }
                                    }
                                  }}
                                />
                                <span className="text-slate-500 dark:text-slate-400 font-medium">分鐘</span>
                                <button 
                                  onClick={() => {
                                    const input = document.getElementById('manual-sleep-duration-input') as HTMLInputElement;
                                    const val = parseInt(input.value);
                                    if (!isNaN(val) && val > 0) {
                                      const end = new Date(manualEndTime).getTime();
                                      const newStart = end - val * 60 * 1000;
                                      setManualStartTime(new Date(newStart - new Date(newStart).getTimezoneOffset() * 60000).toISOString().slice(0, 16));
                                      input.value = '';
                                    }
                                  }}
                                  className="ml-1 px-3 py-2 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm font-bold transition-colors"
                                >
                                  設定
                                </button>
                              </div>
                              <div className="flex flex-wrap justify-center gap-2 mt-1 mb-2">
                                  {[5, 10, 15, 20].map(mins => (
                                      <button 
                                          key={mins}
                                          onClick={() => {
                                              const end = new Date(manualEndTime).getTime();
                                              const newStart = end - mins * 60 * 1000;
                                              setManualStartTime(new Date(newStart - new Date(newStart).getTimezoneOffset() * 60000).toISOString().slice(0, 16));
                                          }}
                                          className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 transition-all h-9 flex items-center justify-center"
                                      >
                                          {mins} 分鐘
                                      </button>
                                  ))}
                              </div>
                          </div>
                     </div>
                 )}

                 {manualType === 'solids' && (
                    <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">副食份量</label>
                          <div className="relative">
                            <input
                              type="number"
                              inputMode="numeric"
                              min="0"
                              max="2000"
                              value={manualDetails.amountMl ?? ''}
                              onChange={e => setManualDetails(previous => ({ ...previous, amountMl: e.target.value ? Number(e.target.value) : undefined }))}
                              placeholder="輸入份量"
                              className="w-full rounded-xl border border-orange-200 bg-orange-50/50 p-3 pe-12 text-base font-bold text-slate-800 dark:border-orange-900 dark:bg-orange-950/20 dark:text-white"
                            />
                            <span className="pointer-events-none absolute inset-y-0 end-3 flex items-center text-xs font-bold text-slate-400">ml</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                             <div className="flex flex-wrap gap-2 mb-2">
                                {manualDetails.foods && manualDetails.foods.map((food, i) => (
                                    <span key={i} className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                                        {food}
                                        <button 
                                            onClick={() => setManualDetails(p => ({ ...p, foods: p.foods?.filter((_, idx) => idx !== i) }))}
                                            className="hover:text-orange-900 dark:hover:text-orange-100"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                             </div>
                             <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="新增食物 (如: '紅蘿蔔')"
                                    className="flex-1 p-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg text-sm"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            const val = e.currentTarget.value.trim();
                                            if (val) {
                                                setManualDetails(p => ({ ...p, foods: [...(p.foods || []), val] }));
                                                e.currentTarget.value = '';
                                            }
                                        }
                                    }}
                                />
                                <button
                                    onClick={(e) => {
                                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                        const val = input.value.trim();
                                        if (val) {
                                            setManualDetails(p => ({ ...p, foods: [...(p.foods || []), val] }));
                                            input.value = '';
                                        }
                                    }}
                                    className="px-3 py-2 bg-orange-500 text-white rounded-lg font-bold text-sm"
                                >
                                    新增
                                </button>
                             </div>
                             <p className="text-[10px] text-slate-400">按 Enter 可新增多項</p>
                        </div>

                        <div className="space-y-1">
                           <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">反應?</label>
                           <input 
                             type="text"
                             placeholder="如: 紅疹, 脹氣 (選填)"
                             value={manualDetails.reaction || ''}
                             onChange={e => setManualDetails(p => ({ ...p, reaction: e.target.value }))}
                             className="w-full p-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg text-sm"
                           />
                        </div>
                    </div>
                 )}

                 {manualType === 'diaper' && (
                   <div className="space-y-1 border-t border-slate-100 pt-4 dark:border-slate-800">
                     <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">尿量（可選填）</label>
                     <div className="relative">
                       <input
                         type="number"
                         inputMode="numeric"
                         min="0"
                         max="2000"
                         value={manualDetails.urineMl ?? ''}
                         onChange={e => setManualDetails(previous => ({ ...previous, urineMl: e.target.value ? Number(e.target.value) : undefined }))}
                         placeholder="輸入尿量"
                         className="w-full rounded-xl border border-emerald-200 bg-emerald-50/50 p-3 pe-12 text-base font-bold text-slate-800 dark:border-emerald-900 dark:bg-emerald-950/20 dark:text-white"
                       />
                       <span className="pointer-events-none absolute inset-y-0 end-3 flex items-center text-xs font-bold text-slate-400">ml</span>
                     </div>
                   </div>
                 )}

                 {manualType === 'feeding' && (
                    <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                         <div className="flex flex-col items-center space-y-3">
                              <div className="flex justify-center space-x-2 mt-2">
                                <span className="text-sm font-bold text-pink-600 dark:text-pink-400">快速設定餵奶時間（由結束時間回推）</span>
                              </div>
                              <div className="flex items-center justify-center space-x-2">
                                <input 
                                  type="number" 
                                  inputMode="decimal"
                                  pattern="[0-9]*"
                                  placeholder="20" 
                                  id="manual-duration-input"
                                  className="w-24 p-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-lg text-center font-mono text-lg"
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      const val = parseInt(e.currentTarget.value);
                                      if (!isNaN(val) && val > 0) {
                                        const end = new Date(manualEndTime).getTime();
                                        const newStart = end - val * 60 * 1000;
                                        setManualStartTime(new Date(newStart - new Date(newStart).getTimezoneOffset() * 60000).toISOString().slice(0, 16));
                                        e.currentTarget.value = '';
                                      }
                                    }
                                  }}
                                />
                                <span className="text-slate-500 dark:text-slate-400 font-medium">分鐘</span>
                                <button 
                                  onClick={() => {
                                    const input = document.getElementById('manual-duration-input') as HTMLInputElement;
                                    const val = parseInt(input.value);
                                    if (!isNaN(val) && val > 0) {
                                      const end = new Date(manualEndTime).getTime();
                                      const newStart = end - val * 60 * 1000;
                                      setManualStartTime(new Date(newStart - new Date(newStart).getTimezoneOffset() * 60000).toISOString().slice(0, 16));
                                      input.value = '';
                                    }
                                  }}
                                  className="ml-1 px-3 py-2 bg-pink-100 hover:bg-pink-200 dark:bg-pink-900/30 dark:hover:bg-pink-900/50 text-pink-600 dark:text-pink-400 rounded-lg text-sm font-bold transition-colors"
                                >
                                  設定
                                </button>
                              </div>
                              <div className="flex flex-wrap justify-center gap-2 mt-1 mb-4">
                                  {[10, 15, 20].map(mins => (
                                      <button 
                                          key={mins}
                                          onClick={() => {
                                              const end = new Date(manualEndTime).getTime();
                                              const newStart = end - mins * 60 * 1000;
                                              setManualStartTime(new Date(newStart - new Date(newStart).getTimezoneOffset() * 60000).toISOString().slice(0, 16));
                                          }}
                                          className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 transition-all h-9 flex items-center justify-center"
                                      >
                                          {mins} 分鐘
                                      </button>
                                  ))}
                              </div>

                              <div className="flex justify-center flex-col items-center space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800 w-full">
                                  <div className="flex justify-center space-x-2">
                                    <span className="text-sm font-bold text-pink-600 dark:text-pink-400">餵奶份量</span>
                                  </div>
                                  <div className="flex justify-center items-center space-x-2">
                                    <input 
                                      type="number" 
                                      inputMode="decimal"
                                      pattern="[0-9]*"
                                      placeholder="份量" 
                                      value={manualDetails.amountMl || ''}
                                      className="w-24 p-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg text-center font-mono text-lg"
                                      onChange={e => setManualDetails(p => ({ ...p, amountMl: parseInt(e.target.value) || 0, feedingType: 'bottle' }))}
                                    />
                                    <span className="text-slate-500 dark:text-slate-400 text-sm">ml</span>
                                  </div>
                                   {/* Quick Select Buttons */}
                                   <div className="flex flex-wrap justify-center gap-2">
                                        {[110, 140, 170, 200].map(amt => (
                                            <button 
                                                key={amt}
                                                onClick={() => setManualDetails(p => ({ ...p, amountMl: amt, feedingType: 'bottle' }))}
                                                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 transition-all h-9 flex items-center justify-center"
                                            >
                                                {amt}ml
                                            </button>
                                        ))}
                                    </div>
                               </div>
                           </div>
                    </div>
                 )}

                 {manualType !== 'feeding' && (
                     <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
                       <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">備註</label>
                       <textarea
                         className="w-full p-3 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-pink-500 outline-none resize-none"
                         placeholder="新增內容..."
                         value={manualDetails.notes || ''}
                         onChange={(e) => setManualDetails(p => ({ ...p, notes: e.target.value }))}
                         rows={3}
                       />
                     </div>
                 )}
              </div>
              
              <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 mt-auto shrink-0 pb-8">
                 <button 
                   onClick={handleManualSubmit}
                   className="w-full py-3 bg-slate-800 dark:bg-slate-700 text-white font-bold rounded-xl hover:bg-slate-900 dark:hover:bg-slate-600 transition-colors shadow-lg"
                 >
                    儲存紀錄
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Tracker;
