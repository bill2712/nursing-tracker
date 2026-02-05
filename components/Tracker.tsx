import React, { useState, useEffect, useMemo } from 'react';
import { MilkIcon, MoonIcon, ClockIcon, PencilIcon, PumpIcon, FoodIcon } from './Icons';
import { AppState, LogEntry, ActivityType, FeedingType, FeedingSide } from '../types';
import { formatTimer, generateId, formatTimeAgo } from '../utils';
import { getAverageWakeWindow, predictNextNap } from '../services/predictionService';

interface TrackerProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

import { collection, doc, setDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

const Tracker: React.FC<TrackerProps> = ({ appState, setAppState }) => {
  const [elapsed, setElapsed] = useState(0);
  const [showManualModal, setShowManualModal] = useState(false);
  
  // Active Timer Edit Modal State
  const [showActiveEditModal, setShowActiveEditModal] = useState(false);
  const [activeEditStartTime, setActiveEditStartTime] = useState('');

  // Manual Entry State
  const [manualType, setManualType] = useState<ActivityType>('feeding');
  const [manualStartTime, setManualStartTime] = useState('');
  const [manualEndTime, setManualEndTime] = useState('');
  const [manualDetails, setManualDetails] = useState<LogEntry['details']>({ feedingType: 'nursing', side: 'left', foods: [] });
  const [newFoodInput, setNewFoodInput] = useState('');

  // Timer Tick
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    const updateTick = () => {
      if (!appState.activeTimer) {
        setElapsed(0);
        return;
      }

      const now = Date.now();
      const { startTime, pauseStartTime, ignoredDurationMs } = appState.activeTimer;
      const totalIgnored = ignoredDurationMs || 0;

      if (pauseStartTime) {
        // If paused, elapsed time is fixed at the moment pause started
        setElapsed(Math.floor((pauseStartTime - startTime - totalIgnored) / 1000));
      } else {
        // Running normally
        setElapsed(Math.floor((now - startTime - totalIgnored) / 1000));
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

  const lastActivities = useMemo(() => {
    const sorted = [...appState.logs].sort((a, b) => b.startTime - a.startTime);
    return {
      feeding: sorted.find(l => l.type === 'feeding'),
      sleep: sorted.find(l => l.type === 'sleep'),
      diaper: sorted.find(l => l.type === 'diaper'),
      pumping: sorted.find(l => l.type === 'pumping'),
      solids: sorted.find(l => l.type === 'solids'),
    };
  }, [appState.logs]);

  // --- Firestore Actions ---

  const startTimer = async (type: ActivityType) => {
    const newTimer = {
      type,
      startTime: Date.now(),
      ignoredDurationMs: 0,
      details: {
        side: (type === 'feeding' || type === 'pumping') ? 'left' : undefined, 
        feedingType: type === 'feeding' ? 'nursing' : undefined
      }
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

    const { startTime, pauseStartTime, ignoredDurationMs } = appState.activeTimer;
    
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
        updatedTimer = {
            ...appState.activeTimer,
            pauseStartTime: undefined,
            snoozeEndTime: undefined,
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

  const handleManualSubmit = async () => {
    if (!manualStartTime || !manualEndTime) {
      alert("Please select start and end times");
      return;
    }

    const start = new Date(manualStartTime).getTime();
    const end = new Date(manualEndTime).getTime();

    if (end <= start) {
      alert("End time must be after start time");
      return;
    }

    const newLog: LogEntry = {
      id: generateId(),
      type: manualType,
      startTime: start,
      endTime: end,
      durationSeconds: Math.floor((end - start) / 1000),
      details: manualDetails
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
    setManualDetails({ feedingType: 'nursing', side: 'left', foods: [] });
    setNewFoodInput('');
    setShowManualModal(true);
  };

  const setAllDaySleep = () => {
    const now = new Date();
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);
    
    const toLocalIso = (d: Date) => new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
    
    setManualStartTime(toLocalIso(startOfDay));
    setManualEndTime(toLocalIso(now));
  };

  const addDurationToManual = (minutes: number) => {
      if (!manualStartTime) return;
      const start = new Date(manualStartTime).getTime();
      const end = start + minutes * 60 * 1000;
      
      const endDate = new Date(end);
      const localIso = new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
      setManualEndTime(localIso);
  };

  // --- Active Timer View ---
  if (appState.activeTimer) {
    const isFeeding = appState.activeTimer.type === 'feeding';
    const isPumping = appState.activeTimer.type === 'pumping';
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
              (isPumping ? <PumpIcon className="w-16 h-16 text-cyan-500" /> : <MoonIcon className="w-16 h-16 text-indigo-500" />)}
             
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
            {isSnoozed ? '貪睡中...' : (isPaused ? '計時暫停' : (isFeeding ? '餵奶時間' : '睡覺中'))}
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

        {/* Notes Input */}
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

        {/* Feeding Controls */}
        {isFeeding && (
          <div className="w-full max-w-sm space-y-4 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
             <div className="flex justify-center space-x-2">
                <button 
                  onClick={() => updateActiveDetails({ feedingType: 'nursing' })}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${appState.activeTimer.details?.feedingType === 'nursing' ? 'bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800' : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
                >Nursing</button>
                <button 
                   onClick={() => updateActiveDetails({ feedingType: 'bottle' })}
                   className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${appState.activeTimer.details?.feedingType === 'bottle' ? 'bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800' : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
                >Bottle</button>
             </div>

             {appState.activeTimer.details?.feedingType === 'nursing' && (
               <div className="flex justify-center space-x-4">
                 {(['left', 'right', 'both'] as const).map(side => (
                   <button
                    key={side}
                    onClick={() => updateActiveDetails({ side })}
                    className={`capitalize px-4 py-2 rounded-full border ${appState.activeTimer!.details?.side === side ? 'bg-pink-500 text-white border-pink-500' : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}
                   >
                     {side}
                   </button>
                 ))}
               </div>
             )}

             {appState.activeTimer.details?.feedingType === 'bottle' && (
                <div className="flex flex-col items-center space-y-3">
                    <div className="flex items-center justify-center space-x-2">
                      <input 
                        type="number" 
                        placeholder="ml" 
                        value={appState.activeTimer.details?.amountMl || ''}
                        className="w-24 p-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-lg text-center font-mono text-lg"
                        onChange={(e) => updateActiveDetails({ amountMl: parseInt(e.target.value) || 0 })}
                      />
                      <span className="text-slate-500 dark:text-slate-400 font-medium">ml</span>
                    </div>
                    {/* Quick Select Buttons */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {[60, 90, 120, 150].map(amt => (
                            <button 
                                key={amt}
                                onClick={() => updateActiveDetails({ amountMl: amt })}
                                className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 transition-colors"
                            >
                                {amt}ml
                            </button>
                        ))}
                    </div>
                </div>
             )}
          </div>
        )}

        {/* Timer Controls */}
        <div className="w-full max-w-xs space-y-3">
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

            <div className="flex space-x-4 w-full">
                <button 
                    onClick={cancelTimer}
                    className="flex-1 py-4 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                >
                    Cancel
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
    <div className="flex flex-col h-full p-6 space-y-6 overflow-y-auto">
      <header className="flex justify-between items-center">
        <div>
           <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">快速記錄</h1>
           <p className="text-slate-500 dark:text-slate-400">寶寶正在做什麼？</p>
        </div>
        <button 
          onClick={initManualEntry}
          className="text-sm font-bold text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/20 px-3 py-2 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors"
        >
          + 補登紀錄
        </button>
      </header>

      {/* Last Activity Dashboard */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center">
           <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">上次餵奶</span>
           <span className="text-sm font-bold text-pink-600 dark:text-pink-400">
             {lastActivities.feeding ? formatTimeAgo(lastActivities.feeding.endTime || lastActivities.feeding.startTime) : '--'}
           </span>
        </div>
        <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center">
           <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">上次睡覺</span>
           <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
             {lastActivities.sleep ? formatTimeAgo(lastActivities.sleep.endTime || lastActivities.sleep.startTime) : '--'}
           </span>
        </div>
        <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center text-center">
           <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">上次換片</span>
           <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
             {lastActivities.diaper ? formatTimeAgo(lastActivities.diaper.startTime) : '--'}
           </span>
        </div>
      </div>


      {/* Prediction Widget */}
      {(() => {
        const avgWakeWindow = getAverageWakeWindow(appState.logs);
        const prediction = predictNextNap(appState.logs, avgWakeWindow);
        if (prediction.time && avgWakeWindow > 0) {
            const timeStr = new Date(prediction.time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
            return (
                <div className="bg-gradient-to-r from-indigo-500 to-violet-600 rounded-xl p-4 shadow-lg shadow-indigo-200 dark:shadow-none text-white flex justify-between items-center">
                    <div>
                        <p className="text-xs font-bold text-indigo-100 uppercase tracking-wider mb-1">預計下次小睡</p>
                        <p className="text-2xl font-bold">{timeStr}</p>
                        <p className="text-[10px] text-indigo-200 mt-1 opacity-80">{prediction.reason}</p>
                    </div>
                    <div className="bg-white/20 p-3 rounded-full">
                        <MoonIcon className="w-6 h-6 text-white" />
                    </div>
                </div>
            );
        }
        return null;
      })()}

      <div className="grid grid-cols-1 gap-6">
        <button 
          onClick={() => startTimer('feeding')}
          className="group relative overflow-hidden bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md hover:border-pink-200 dark:hover:border-pink-900 transition-all text-left"
        >
          <div className="absolute right-0 top-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <MilkIcon className="w-32 h-32 text-pink-500" />
          </div>
          <div className="relative z-10">
            <div className="w-14 h-14 bg-pink-100 dark:bg-pink-900/30 rounded-2xl flex items-center justify-center mb-4 text-pink-600 dark:text-pink-400">
              <MilkIcon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">開始餵奶</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">親餵或瓶餵計時</p>
          </div>
        </button>

        <div className="relative group">
            <button 
              onClick={() => startTimer('sleep')}
              className="w-full relative overflow-hidden bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-900 transition-all text-left pb-16"
            >
              <div className="absolute right-0 top-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <MoonIcon className="w-32 h-32 text-indigo-500" />
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400">
                  <MoonIcon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">開始睡覺</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">記錄小睡或長睡眠</p>
              </div>
            </button>
            {/* Quick Sleep Log Buttons Overlay */}
            <div className="absolute bottom-4 left-8 right-8 flex space-x-2 z-20">
                {[30, 60, 120].map(mins => (
                    <button
                        key={mins}
                        onClick={(e) => {
                            e.stopPropagation();
                            quickLogSleep(mins);
                        }}
                        className="flex-1 py-2 text-xs font-bold bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors border border-indigo-100 dark:border-indigo-800"
                    >
                        記錄 {mins < 60 ? `${mins}分` : `${mins/60}小時`}
                    </button>
                ))}
            </div>
        </div>
      </div>
      
      {/* Quick Add Diaper */}
      <div className="mt-auto">
         <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 mb-3 uppercase tracking-wider">快速換片</p>
         <div className="grid grid-cols-3 gap-3">
            {['wet', 'dirty', 'mixed'].map((type) => (
                <button
                    key={type}
                    onClick={async () => {
                        const newLog: LogEntry = {
                            id: generateId(),
                            type: 'diaper',
                            startTime: Date.now(),
                            details: { diaperState: type as any }
                        };
                        await setDoc(doc(db, 'logs', newLog.id), newLog);
                    }}
                    className="bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 py-3 rounded-xl text-sm font-medium capitalize transition-colors"
                >
                    {type === 'wet' ? '濕' : (type === 'dirty' ? '髒' : '混合')}
                </button>
            ))}
         </div>
      </div>

      {/* Manual Entry Modal */}
      {showManualModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowManualModal(false)}>
           <div 
             className="bg-white dark:bg-slate-900 w-full sm:max-w-sm rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden animate-slide-up sm:animate-fade-in" 
             onClick={e => e.stopPropagation()}
           >
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                 <h3 className="font-bold text-slate-700 dark:text-slate-200">補登紀錄</h3>
                 <button onClick={() => setShowManualModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 font-medium">取消</button>
              </div>
              
              <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                 {/* Type Selector */}
                 <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                    <button 
                      onClick={() => setManualType('feeding')}
                      className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${manualType === 'feeding' ? 'bg-white dark:bg-slate-700 text-pink-600 dark:text-pink-400 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
                    >餵奶</button>
                    <button 
                      onClick={() => setManualType('sleep')}
                      className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${manualType === 'sleep' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
                    >睡眠</button>
                    <button 
                      onClick={() => setManualType('pumping')}
                      className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${manualType === 'pumping' ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
                    >擠奶</button>
                    <button 
                      onClick={() => setManualType('solids')}
                      className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${manualType === 'solids' ? 'bg-white dark:bg-slate-700 text-orange-600 dark:text-orange-400 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
                    >副食品</button>
                 </div>
                 
                 {/* Special "All Day Sleep" Shortcut */}
                 {manualType === 'sleep' && (
                    <button 
                      onClick={setAllDaySleep}
                      className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors w-full border border-indigo-100 dark:border-indigo-800 mb-2"
                    >
                      記錄此日為「整天睡覺」
                    </button>
                 )}

                 {/* Time Inputs */}
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                       <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Start Time</label>
                       <input 
                         type="datetime-local" 
                         value={manualStartTime}
                         onChange={e => setManualStartTime(e.target.value)}
                         className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-200 rounded-lg text-sm"
                       />
                    </div>
                    <div className="space-y-1">
                       <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">End Time</label>
                       <input 
                         type="datetime-local" 
                         value={manualEndTime}
                         onChange={e => setManualEndTime(e.target.value)}
                         className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-slate-200 rounded-lg text-sm"
                       />
                    </div>
                 </div>

                 {/* Quick Durations for Sleep */}
                 {manualType === 'sleep' && (
                     <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                         {[30, 60, 90, 120, 180, 240, 480].map(m => (
                             <button 
                                key={m} 
                                onClick={() => addDurationToManual(m)}
                                className="shrink-0 px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-bold border border-indigo-100 dark:border-indigo-800"
                             >
                                 +{m < 60 ? m+'分' : (m/60)+'小時'}
                             </button>
                         ))}
                     </div>
                 )}

                 {manualType === 'solids' && (
                    <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
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
                                    Add
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

                 {manualType === 'feeding' && (
                    <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex justify-center space-x-3">
                           <button 
                              onClick={() => setManualDetails(p => ({ ...p, feedingType: 'nursing' }))}
                              className={`px-4 py-2 rounded-lg text-sm font-medium border ${manualDetails.feedingType === 'nursing' ? 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800 text-pink-700 dark:text-pink-400' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}
                           >親餵</button>
                           <button 
                              onClick={() => setManualDetails(p => ({ ...p, feedingType: 'bottle' }))}
                              className={`px-4 py-2 rounded-lg text-sm font-medium border ${manualDetails.feedingType === 'bottle' ? 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800 text-pink-700 dark:text-pink-400' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}
                           >瓶餵</button>
                        </div>

                        {manualDetails.feedingType === 'nursing' && (
                           <div className="flex justify-center space-x-2">
                              {(['left', 'right', 'both'] as const).map(side => (
                                 <button
                                    key={side}
                                    onClick={() => setManualDetails(p => ({ ...p, side }))}
                                    className={`capitalize px-3 py-1.5 rounded-full text-sm border ${manualDetails.side === side ? 'bg-pink-500 text-white border-pink-500' : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400'}`}
                                 >
                                    {side}
                                 </button>
                              ))}
                           </div>
                        )}
                        
                        {manualDetails.feedingType === 'bottle' && (
                           <div className="flex flex-col items-center space-y-3">
                              <div className="flex justify-center items-center space-x-2">
                                <input 
                                  type="number" 
                                  placeholder="Amount" 
                                  value={manualDetails.amountMl || ''}
                                  className="w-24 p-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg text-center"
                                  onChange={e => setManualDetails(p => ({ ...p, amountMl: parseInt(e.target.value) || 0 }))}
                                />
                                <span className="text-slate-500 dark:text-slate-400 text-sm">ml</span>
                              </div>
                               {/* Quick Select Buttons */}
                               <div className="flex flex-wrap justify-center gap-2">
                                    {[60, 90, 120, 150].map(amt => (
                                        <button 
                                            key={amt}
                                            onClick={() => setManualDetails(p => ({ ...p, amountMl: amt }))}
                                            className="px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300"
                                        >
                                            {amt}ml
                                        </button>
                                    ))}
                                </div>
                           </div>
                        )}
                    </div>
                 )}

                 <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
                   <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Notes</label>
                   <textarea
                     className="w-full p-3 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-pink-500 outline-none resize-none"
                     placeholder="Add details..."
                     value={manualDetails.notes || ''}
                     onChange={(e) => setManualDetails(p => ({ ...p, notes: e.target.value }))}
                     rows={3}
                   />
                 </div>

                 <button 
                   onClick={handleManualSubmit}
                   className="w-full py-3 bg-slate-800 dark:bg-slate-700 text-white font-bold rounded-xl hover:bg-slate-900 dark:hover:bg-slate-600 transition-colors"
                 >
                    Save Record
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Tracker;