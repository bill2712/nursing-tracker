import React, { useState, useEffect } from 'react';
import { AppState, LogEntry, ActivityType } from './types';
import { STORAGE_KEY } from './constants';
import Tracker from './components/Tracker';
import History from './components/History';
import Analysis from './components/Analysis';
import Settings from './components/Settings';
import { ClockIcon, ListIcon, BarChartIcon, SettingsIcon } from './components/Icons';

type View = 'tracker' | 'history' | 'analysis' | 'settings';

const App: React.FC = () => {
  // Load initial state from local storage or default
  const [appState, setAppState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Migration: Ensure new fields structure exist
        return {
          logs: parsed.logs || [],
          activeTimer: parsed.activeTimer || null,
          reminders: parsed.reminders || { 
            enabled: false, 
            feeding: 0, 
            sleep: 0, 
            diaper: 0, 
            lastNotified: {} 
          },
          sleepGoal: parsed.sleepGoal || { hours: 14, minutes: 0 },
          darkMode: parsed.darkMode || false
        };
      } catch (e) {
        console.error("Failed to parse saved state");
      }
    }
    return { 
      logs: [], 
      activeTimer: null,
      reminders: { enabled: false, feeding: 0, sleep: 0, diaper: 0, lastNotified: {} },
      sleepGoal: { hours: 14, minutes: 0 },
      darkMode: false
    };
  });

  const [currentView, setCurrentView] = useState<View>('tracker');

  // Persistence effect
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  }, [appState]);

  // Global Timer Effect: Handles Reminders and Snooze Auto-Resume
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      let stateChanged = false;
      let newState = { ...appState };

      // 1. Handle Snooze Auto-Resume
      if (newState.activeTimer?.snoozeEndTime && now >= newState.activeTimer.snoozeEndTime) {
        // Snooze time is up. 
        if (newState.activeTimer.pauseStartTime) {
            const pausedDuration = now - newState.activeTimer.pauseStartTime;
            newState.activeTimer = {
                ...newState.activeTimer,
                snoozeEndTime: undefined,
                pauseStartTime: undefined,
                ignoredDurationMs: (newState.activeTimer.ignoredDurationMs || 0) + pausedDuration
            };
            stateChanged = true;

            // Notify resumption
            if (Notification.permission === 'granted' && newState.reminders.enabled) {
                new Notification("Timer Resumed", { body: "Your snooze period is over. Tracking has resumed." });
            }
        }
      }

      // 2. Handle Reminders
      if (newState.reminders.enabled) {
        const checkReminder = (type: ActivityType, intervalMins: number) => {
          if (intervalMins <= 0) return;
          
          // If active timer is running for this type, don't remind
          if (newState.activeTimer?.type === type) return;

          // Find last activity of this type
          const lastLog = newState.logs.find(l => l.type === type);
          
          // Determine reference time: endTime if available (feeding/sleep), else startTime (diaper)
          const refTime = lastLog ? (lastLog.endTime || lastLog.startTime) : 0;
          
          // If no log exists, we don't remind
          if (!refTime) return;

          const timeSince = now - refTime;
          const intervalMs = intervalMins * 60 * 1000;
          
          if (timeSince >= intervalMs) {
            // Check if already notified recently (within last 5 mins to avoid spam)
            const lastNotified = newState.reminders.lastNotified[type] || 0;
            if (now - lastNotified > 5 * 60 * 1000) {
              
              if (Notification.permission === 'granted') {
                 const hours = Math.floor(timeSince / 3600000);
                 const mins = Math.floor((timeSince % 3600000) / 60000);
                 const timeString = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;

                 new Notification(`${type.charAt(0).toUpperCase() + type.slice(1)} Reminder`, {
                   body: `It has been ${timeString} since last ${type}.`
                 });
                 
                 newState.reminders = {
                   ...newState.reminders,
                   lastNotified: {
                     ...newState.reminders.lastNotified,
                     [type]: now
                   }
                 };
                 stateChanged = true;
              }
            }
          }
        };

        checkReminder('feeding', newState.reminders.feeding);
        checkReminder('sleep', newState.reminders.sleep);
        checkReminder('diaper', newState.reminders.diaper);
      }

      if (stateChanged) {
        setAppState(prev => ({...prev, ...newState}));
      }

    }, 1000);

    return () => clearInterval(interval);
  }, [appState]);

  // Render view based on state
  const renderView = () => {
    switch (currentView) {
      case 'tracker':
        return <Tracker appState={appState} setAppState={setAppState} />;
      case 'history':
        return <History logs={appState.logs} setAppState={setAppState} />;
      case 'analysis':
        return <Analysis appState={appState} />;
      case 'settings':
        return <Settings appState={appState} setAppState={setAppState} />;
      default:
        return <Tracker appState={appState} setAppState={setAppState} />;
    }
  };

  return (
    <div className={`h-screen w-full flex flex-col mx-auto max-w-md shadow-2xl overflow-hidden relative ${appState.darkMode ? 'dark' : ''}`}>
      <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
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