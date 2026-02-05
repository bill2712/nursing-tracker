import React, { useState, useEffect } from 'react';
import { AppState, LogEntry, ActivityType } from './types';
import { STORAGE_KEY } from './constants';
import Tracker from './components/Tracker';
import History from './components/History';
import Analysis from './components/Analysis';
import Settings from './components/Settings';
import Growth from './components/Growth';
import { ClockIcon, ListIcon, BarChartIcon, SettingsIcon, RulerIcon } from './components/Icons';

type View = 'tracker' | 'history' | 'analysis' | 'growth' | 'settings';

import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { collection, onSnapshot, query, orderBy, doc, setDoc, limit } from 'firebase/firestore';
import { auth, db } from './services/firebase';
import Login from './components/Login';

const ALERT_emails = ["bill27122002@gmail.com", "suet0806@gmail.com", "pingwai03@gmail.com"];

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
    }
  });

  const [currentView, setCurrentView] = useState<View>('tracker');

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

    // 1. Listen to Logs
    const q = query(collection(db, 'logs'), orderBy('startTime', 'desc'), limit(500)); 
    const unsubLogs = onSnapshot(q, (snapshot) => {
      const logs = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as LogEntry));
      setAppState(prev => ({ ...prev, logs }));
    });

    // 2. Listen to Active Timer (Global Singleton)
    const unsubTimer = onSnapshot(doc(db, 'system', 'activeTimer'), (doc) => {
      if (doc.exists()) {
        setAppState(prev => ({ ...prev, activeTimer: doc.data() as any }));
      } else {
        setAppState(prev => ({ ...prev, activeTimer: null }));
      }
    });

    return () => {
      unsubLogs();
      unsubTimer();
    };
  }, [user]);

  // Handle Logout
  const handleLogout = () => signOut(auth);

  if (loading) return <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">Loading...</div>;
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
        return <History logs={appState.logs} setAppState={setAppState} />;
      case 'analysis':
        return <Analysis appState={appState} />;
      case 'growth':
        return <Growth appState={appState} setAppState={setAppState} />;
      case 'settings':
        return <Settings appState={appState} setAppState={setAppState} />;
      default:
        return <Tracker appState={appState} setAppState={setAppState} />;
    }
  };

  return (
    <div className={`h-screen w-full flex flex-col mx-auto max-w-md shadow-2xl overflow-hidden relative ${appState.darkMode ? 'dark' : ''}`}>
      <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200">
          <main className="flex-1 overflow-y-auto no-scrollbar relative z-0">
             {renderView()}
          </main>

          <nav className="h-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-around items-center px-2 z-10 shrink-0 safe-area-pb transition-colors duration-200">
            <NavButton 
              active={currentView === 'tracker'} 
              onClick={() => setCurrentView('tracker')} 
              icon={<ClockIcon />} 
              label="Track" 
            />
            <NavButton 
              active={currentView === 'history'} 
              onClick={() => setCurrentView('history')} 
              icon={<ListIcon />} 
              label="History" 
            />
            <NavButton 
              active={currentView === 'analysis'} 
              onClick={() => setCurrentView('analysis')} 
              icon={<BarChartIcon />} 
              label="Insights" 
            />
            <NavButton 
              active={currentView === 'growth'} 
              onClick={() => setCurrentView('growth')} 
              icon={<RulerIcon />} 
              label="Growth" 
            />
            <NavButton 
              active={currentView === 'settings'} 
              onClick={() => setCurrentView('settings')} 
              icon={<SettingsIcon />} 
              label="Settings" 
            />
          </nav>
      </div>
    </div>
  );
};

const NavButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${active ? 'text-pink-600 dark:text-pink-400' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
  >
    <div className={`p-1 rounded-xl transition-all ${active ? 'bg-pink-50 dark:bg-pink-900/20' : ''}`}>
      {React.cloneElement(icon as React.ReactElement, { className: "w-6 h-6" })}
    </div>
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);

export default App;