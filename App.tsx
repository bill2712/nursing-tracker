import React, { Suspense, lazy, useState, useEffect, useRef, useCallback } from 'react';
import { AppState, LogEntry, ActivityType } from './types';
import Tracker from './components/Tracker';
import { ClockIcon, ListIcon, BarChartIcon, SettingsIcon, HeartIcon, BabyIcon } from './components/Icons';
import { INITIAL_VACCINES, INITIAL_MILESTONES } from './data/healthData';
import { ToastHost } from './components/Toast';
import { MODAL_ROOT_ID } from './components/ModalPortal';

const pageLoaders = {
  history: () => import('./components/History'),
  analysis: () => import('./components/Analysis'),
  settings: () => import('./components/Settings'),
  growth: () => import('./components/Growth'),
  health: () => import('./components/Health'),
  checklist: () => import('./components/DevelopmentChecklist')
};

const History = lazy(pageLoaders.history);
const Analysis = lazy(pageLoaders.analysis);
const Settings = lazy(pageLoaders.settings);
const Growth = lazy(pageLoaders.growth);
const Health = lazy(pageLoaders.health);
const DevelopmentChecklist = lazy(pageLoaders.checklist);

// Download the other tabs in the background once the first screen is shown,
// so switching tabs does not flash a loading state.
const preloadPages = () => {
  const run = () => Object.values(pageLoaders).forEach(load => { load().catch(() => {}); });
  const idle = (window as any).requestIdleCallback as ((cb: () => void) => void) | undefined;
  if (idle) idle(run); else window.setTimeout(run, 1200);
};

type View = 'tracker' | 'history' | 'analysis' | 'checklist' | 'settings' | 'health' | 'growth';

import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { collection, onSnapshot, query, orderBy, doc, setDoc, where, getDoc } from 'firebase/firestore';
import { RECENT_CUTOFF, getOlderState, subscribeOlder, loadOlder, loadAllOlder, mergeLogs, OlderLogsState } from './services/olderLogs';
import { auth, db } from './services/firebase';
import Login from './components/Login';

const ALERT_emails = ["bill27122002@gmail.com", "suet0806@gmail.com"];

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize with default state
  const [appState, setAppState] = useState<AppState>({ 
    logs: [], 
    activeTimer: null,
    reminders: { enabled: false, feeding: 0, sleep: 0, diaper: 0, lastNotified: {} },
    sleepGoal: { hours: 14, minutes: 0 },
    darkMode: false,
    growth: [],
    babyProfile: {
        name: 'Baby',
        gender: 'boy',
        birthDate: Date.now(),
        weightUnit: 'kg',
        lengthUnit: 'cm'
    },
    health: {
        vaccines: INITIAL_VACCINES.map(v => ({ ...v, completed: false })),
        milestones: INITIAL_MILESTONES.map(m => ({ ...m, completed: false }))
    },
    completedChecklistItems: []
  });

  // Load purely local settings (dark mode, reminders) on mount
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('nurturetrack-local-prefs');
      if (stored) {
        const prefs = JSON.parse(stored);
        setAppState(prev => ({
          ...prev,
          ...(prefs.darkMode !== undefined ? { darkMode: prefs.darkMode } : {}),
          ...(prefs.reminders ? { reminders: prefs.reminders } : {})
        }));
      }
    } catch(e) {}
  }, []);

  // Save purely local settings whenever they change
  useEffect(() => {
    window.localStorage.setItem('nurturetrack-local-prefs', JSON.stringify({
      darkMode: appState.darkMode,
      reminders: appState.reminders
    }));
  }, [appState.darkMode, appState.reminders]);

  const [currentView, setCurrentView] = useState<View>('tracker');

  // Recent logs come from the live listener; older ones are loaded on demand.
  const recentLogsRef = useRef<LogEntry[]>([]);
  const [olderState, setOlderState] = useState<OlderLogsState>(getOlderState);
  const publishLogs = useCallback(() => {
    const merged = mergeLogs(recentLogsRef.current, getOlderState().logs);
    setAppState(prev => ({ ...prev, logs: merged }));
  }, []);
  useEffect(() => subscribeOlder(() => { setOlderState(getOlderState()); publishLogs(); }), [publishLogs]);
  const getAllLogs = useCallback(async () => {
    await loadAllOlder();
    return mergeLogs(recentLogsRef.current, getOlderState().logs);
  }, []);

  const changeView = (view: View) => {
    setCurrentView(view);
    document.querySelector('.app-main')?.scrollTo({ top: 0 });
  };

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Data Sync Listeners (Only when logged in AND permitted)
  useEffect(() => {
    if (!user || !ALERT_emails.includes(user.email || '')) return;

    preloadPages();

    // 1. Listen to Logs (only the recent days; older logs load on demand)
    const q = query(collection(db, 'logs'), where('startTime', '>=', RECENT_CUTOFF), orderBy('startTime', 'desc'));
    const unsubLogs = onSnapshot(q, (snapshot) => {
      recentLogsRef.current = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as LogEntry));
      const logs = mergeLogs(recentLogsRef.current, getOlderState().logs);
      setAppState(prev => ({ 
          ...prev, 
          logs,
          // Merge in health data if not present (migration)
          health: prev.health || {
            vaccines: INITIAL_VACCINES.map(v => ({ ...v, completed: false })),
            milestones: INITIAL_MILESTONES.map(m => ({ ...m, completed: false }))
          },
          // Merge in checklist
          completedChecklistItems: prev.completedChecklistItems || []
      }));
    });

    // 2. Listen to Active Timer (Global Singleton)
    const unsubTimer = onSnapshot(doc(db, 'system', 'activeTimer'), (docSnap) => {
      if (docSnap.exists()) {
        setAppState(prev => ({ ...prev, activeTimer: docSnap.data() as any }));
      } else {
        setAppState(prev => ({ ...prev, activeTimer: null }));
      }
    });

    // 3. Listen to Shared State (Growth, Health, Checklist)
    const sharedRef = doc(db, 'system', 'sharedState');
    const initSharedState = async () => {
      const docSnap = await getDoc(sharedRef);
      if (!docSnap.exists()) {
        await setDoc(sharedRef, {
          growth: [],
          health: {
            vaccines: INITIAL_VACCINES.map(v => ({...v, completed: false})),
            milestones: INITIAL_MILESTONES.map(m => ({...m, completed: false}))
          },
          completedChecklistItems: [],
          babyProfile: appState.babyProfile,
          sleepGoal: appState.sleepGoal
        });
      }
    };
    initSharedState();

    const unsubShared = onSnapshot(sharedRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const mergedVaccines = INITIAL_VACCINES.map(v => {
            const saved = data.health?.vaccines?.find((sv: any) => sv.id === v.id);
            const res: any = { ...v, completed: saved?.completed || false };
            if (saved?.date) res.date = saved.date;
            if (saved?.notes) res.notes = saved.notes;
            return res;
        });

        const mergedMilestones = INITIAL_MILESTONES.map(m => {
            const saved = data.health?.milestones?.find((sm: any) => sm.id === m.id);
            const res: any = { ...m, completed: saved?.completed || false };
            if (saved?.date) res.date = saved.date;
            return res;
        });

        setAppState(prev => ({
          ...prev,
          growth: data.growth || prev.growth,
          health: { vaccines: mergedVaccines, milestones: mergedMilestones },
          completedChecklistItems: data.completedChecklistItems || prev.completedChecklistItems,
          babyProfile: data.babyProfile || prev.babyProfile,
          sleepGoal: data.sleepGoal || prev.sleepGoal
        }));
      }
    });

    return () => {
      unsubLogs();
      unsubTimer();
      unsubShared();
    };
  }, [user]);

  // Handle Logout
  const handleLogout = () => signOut(auth);

  if (loading) return (
    <div className="h-[100dvh] flex flex-col items-center justify-center gap-3 text-sm font-semibold text-slate-400">
      <div className="spinner" aria-hidden="true" />
      載入中…
    </div>
  );
  if (!user) return <Login />;

  // ACCESS CHECK
  if (!ALERT_emails.includes(user.email || '')) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 space-y-6 text-center">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 max-w-sm w-full">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                      🔒
                  </div>
                  <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">存取被拒 Access Denied</h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                      抱歉，帳號 <strong>{user.email}</strong> 沒有權限查看此資料。
                  </p>
                  <button 
                      onClick={handleLogout}
                      className="w-full py-3 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                  >
                      登出 (Sign Out)
                  </button>
              </div>
          </div>
      );
  }

  // Render view based on state
  const renderView = () => {
    switch (currentView) {
      case 'tracker':
        return <Tracker appState={appState} setAppState={setAppState} />;
      case 'history':
        return <History logs={appState.logs} setAppState={setAppState} older={olderState} onLoadOlder={loadOlder} getAllLogs={getAllLogs} />;
      case 'analysis':
        return <Analysis appState={appState} />;
      case 'growth':
        return <Growth appState={appState} setAppState={setAppState} />;
      case 'settings':
        return <Settings appState={appState} setAppState={setAppState} getAllLogs={getAllLogs} />;
      case 'health':
        return <Health appState={appState} setAppState={setAppState} />;
      case 'checklist':
        return <DevelopmentChecklist appState={appState} setAppState={setAppState} />;
      default:
        return <Tracker appState={appState} setAppState={setAppState} />;
    }
  };

  return (
    <div className={`app-shell h-[100dvh] w-full flex flex-col mx-auto max-w-lg sm:my-4 sm:h-[calc(100dvh-2rem)] overflow-hidden relative ${appState.darkMode ? 'dark' : ''}`}>
      <div className="app-frame flex flex-col h-full text-slate-900 dark:text-slate-100 transition-colors duration-200">
          <main className="app-main flex-1 overflow-y-auto no-scrollbar relative">
             <Suspense fallback={<div className="flex min-h-full items-center justify-center p-6"><div className="spinner" aria-label="載入頁面中" /></div>}>
               {renderView()}
             </Suspense>
          </main>

          <nav aria-label="主要導覽" className="bottom-nav flex justify-around items-center px-1 z-10 shrink-0 safe-area-pb transition-colors duration-200">
            <NavButton 
              active={currentView === 'tracker'} 
              onClick={() => changeView('tracker')} 
              icon={<ClockIcon />} 
              label="追蹤" 
            />
            <NavButton 
              active={currentView === 'history'} 
              onClick={() => changeView('history')} 
              icon={<ListIcon />} 
              label="紀錄" 
            />
            <NavButton 
              active={currentView === 'analysis'} 
              onClick={() => changeView('analysis')} 
              icon={<BarChartIcon />} 
              label="分析" 
            />
            <NavButton 
              active={currentView === 'checklist'} 
              onClick={() => changeView('checklist')} 
              icon={<BabyIcon />} 
              label="發展" 
            />
            <NavButton 
              active={currentView === 'health'} 
              onClick={() => changeView('health')} 
              icon={<HeartIcon />} 
              label="健康" 
            />
            <NavButton 
              active={currentView === 'settings'} 
              onClick={() => changeView('settings')} 
              icon={<SettingsIcon />} 
              label="設定" 
            />
          </nav>
          <ToastHost />
      </div>
      {/* Modals render here, outside the scrolling area and above the nav bar. */}
      <div id={MODAL_ROOT_ID} className="modal-root" />
    </div>
  );
};

const NavButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button 
    onClick={onClick}
    aria-current={active ? 'page' : undefined}
    aria-label={label}
    className={`nav-button flex flex-col items-center justify-center min-w-0 min-h-16 py-2 space-y-1 rounded-xl ${active ? 'text-pink-600 dark:text-pink-400' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
  >
    <div className="nav-icon">
      {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6" })}
    </div>
    <span className="text-[11px] font-semibold truncate">{label}</span>
  </button>
);

export default App;
