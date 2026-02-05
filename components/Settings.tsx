import React, { useState } from 'react';
import { AppState, LogEntry } from '../types';
import { exportToCSV, downloadFile } from '../utils';
import { format } from 'date-fns';

interface SettingsProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

const Settings: React.FC<SettingsProps> = ({ appState, setAppState }) => {
  const [importText, setImportText] = useState('');
  const [showImport, setShowImport] = useState(false);

  const handleExportJson = () => {
    const data = JSON.stringify(appState.logs);
    navigator.clipboard.writeText(data).then(() => {
      alert("Data copied to clipboard! Send this text to your partner.");
    });
  };

  const handleDownloadBackup = () => {
    const data = JSON.stringify(appState.logs, null, 2);
    downloadFile(data, `nurturetrack-backup-${format(new Date(), 'yyyy-MM-dd-HHmm')}.json`, 'application/json');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsedLogs = JSON.parse(text);
        
        if (Array.isArray(parsedLogs)) {
             if(confirm(`Found ${parsedLogs.length} records in file. data. Merge with current history?`)) {
                // Sanitize IDs
                const sanitizedLogs = parsedLogs.map((l: any) => ({
                    ...l,
                    id: String(l.id)
                })) as LogEntry[];

                // Merge Logic
                const currentIds = new Set(appState.logs.map(l => String(l.id)));
                const newLogs = sanitizedLogs.filter(l => !currentIds.has(l.id));

                if (newLogs.length === 0) {
                    alert("No new data found to import (all records already exist).");
                    return;
                }

                setAppState(prev => ({ 
                    ...prev, 
                    logs: [...prev.logs, ...newLogs].sort((a, b) => b.startTime - a.startTime) 
                }));
                alert(`Successfully imported ${newLogs.length} new records!`);
             }
        } else {
            alert("Invalid file format. Expected a JSON array of logs.");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to parse file. Is it a valid JSON backup?");
      }
    };
    reader.readAsText(file);
    // Reset input
    e.target.value = '';
  };

  const handleManualImportJson = () => {
    try {
      const parsedLogs = JSON.parse(importText);
      if (Array.isArray(parsedLogs)) {
        if(confirm("This will merge imported data with your current data. Continue?")) {
            // Sanitize and normalize IDs to strings
            const sanitizedLogs = parsedLogs.map((l: any) => ({
              ...l,
              id: String(l.id)
            })) as LogEntry[];

            // Merge and deduplicate by ID
            const currentIds = new Set(appState.logs.map(l => String(l.id)));
            const newLogs = sanitizedLogs.filter(l => !currentIds.has(l.id));
            
            if (newLogs.length === 0) {
              alert("No new data found to import.");
              return;
            }

            setAppState(prev => ({ ...prev, logs: [...prev.logs, ...newLogs] }));
            setImportText('');
            setShowImport(false);
            alert(`Successfully imported ${newLogs.length} records!`);
        }
      } else {
        alert("Invalid data format: Expected an array of logs.");
      }
    } catch (e) {
      console.error(e);
      alert("Error parsing data. Please ensure you pasted the exact JSON text.");
    }
  };

  const clearAllData = () => {
      if(confirm("CRITICAL WARNING: This will delete ALL history permanently. Are you sure?")) {
          setAppState(prev => ({ ...prev, logs: [] }));
      }
  }

  const toggleNotifications = async () => {
    if (appState.reminders.enabled) {
      setAppState(prev => ({ ...prev, reminders: { ...prev.reminders, enabled: false } }));
    } else {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setAppState(prev => ({ ...prev, reminders: { ...prev.reminders, enabled: true } }));
      } else {
        alert("You must allow notifications in your browser settings to use this feature.");
      }
    }
  };

  const updateReminder = (field: 'feeding' | 'sleep' | 'diaper', value: number) => {
    setAppState(prev => ({
      ...prev,
      reminders: { ...prev.reminders, [field]: value }
    }));
  };

  const updateSleepGoal = (field: 'hours' | 'minutes', value: number) => {
    setAppState(prev => ({
      ...prev,
      sleepGoal: { ...prev.sleepGoal, [field]: value }
    }));
  };

  return (
    <div className="p-6 space-y-8 pb-24">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Settings</h1>
        <div className="flex items-center space-x-3">
             <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Dark Mode</span>
             <button 
               onClick={() => setAppState(prev => ({ ...prev, darkMode: !prev.darkMode }))}
               className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out ${appState.darkMode ? 'bg-indigo-600' : 'bg-slate-200'}`}
             >
               <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ${appState.darkMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
             </button>
        </div>
      </header>

      {/* Sleep Goals */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Daily Sleep Goal</h3>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-between">
           <div className="flex flex-col items-center">
              <input 
                type="number" min="0" max="24"
                value={appState.sleepGoal.hours}
                onChange={(e) => updateSleepGoal('hours', parseInt(e.target.value) || 0)}
                className="w-16 p-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-lg text-center text-xl font-bold dark:text-white"
              />
              <span className="text-xs text-slate-500 mt-1">Hours</span>
           </div>
           <span className="text-slate-300 text-2xl">:</span>
           <div className="flex flex-col items-center">
              <input 
                type="number" min="0" max="59"
                value={appState.sleepGoal.minutes}
                onChange={(e) => updateSleepGoal('minutes', parseInt(e.target.value) || 0)}
                className="w-16 p-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-lg text-center text-xl font-bold dark:text-white"
              />
              <span className="text-xs text-slate-500 mt-1">Minutes</span>
           </div>
           <div className="text-xs text-slate-400 w-24 text-right">
              Total Target: <br/>
              <span className="font-bold text-indigo-500">{appState.sleepGoal.hours}h {appState.sleepGoal.minutes}m</span>
           </div>
        </div>
      </section>

      {/* Reminders Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Reminders</h3>
          <button 
             onClick={toggleNotifications}
             className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${appState.reminders.enabled ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}
          >
             {appState.reminders.enabled ? 'Enabled' : 'Disabled'}
          </button>
        </div>
        
        {appState.reminders.enabled && (
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-6 animate-fade-in">
             <div className="space-y-2">
               <div className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300">
                  <span>Feed Reminder</span>
               </div>
               <div className="flex items-center space-x-3">
                 <input 
                   type="number" min="0" 
                   value={appState.reminders.feeding}
                   onChange={(e) => updateReminder('feeding', parseInt(e.target.value) || 0)}
                   className="w-20 p-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-lg text-center"
                 />
                 <span className="text-slate-500 dark:text-slate-400 text-sm">minutes after last feed</span>
               </div>
               <p className="text-xs text-slate-400">Set to 0 to disable this specific reminder.</p>
             </div>

             <div className="space-y-2">
               <div className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300">
                  <span>Sleep Reminder</span>
               </div>
               <div className="flex items-center space-x-3">
                 <input 
                   type="number" min="0" 
                   value={appState.reminders.sleep}
                   onChange={(e) => updateReminder('sleep', parseInt(e.target.value) || 0)}
                   className="w-20 p-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-lg text-center"
                 />
                 <span className="text-slate-500 dark:text-slate-400 text-sm">minutes after waking up</span>
               </div>
             </div>

             <div className="space-y-2">
               <div className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300">
                  <span>Diaper Check</span>
               </div>
               <div className="flex items-center space-x-3">
                 <input 
                   type="number" min="0" 
                   value={appState.reminders.diaper}
                   onChange={(e) => updateReminder('diaper', parseInt(e.target.value) || 0)}
                   className="w-20 p-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-lg text-center"
                 />
                 <span className="text-slate-500 dark:text-slate-400 text-sm">minutes after last change</span>
               </div>
             </div>
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Data Management</h3>
        
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
           <button 
              onClick={() => exportToCSV(appState.logs)}
              className="w-full text-left px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium"
           >
              Download CSV Export
           </button>
           <button 
             onClick={clearAllData}
             className="w-full text-left px-6 py-4 hover:bg-red-50 dark:hover:bg-red-900/10 text-red-600 dark:text-red-400 font-medium"
           >
              Clear All Data
           </button>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Partner Sharing (File Sync)</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
           Download a backup file and send it to your partner to keep devices in sync.
        </p>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-4">
            {/* Download Backup */}
            <button 
                onClick={handleDownloadBackup}
                className="w-full py-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-semibold rounded-lg border border-indigo-100 dark:border-indigo-900 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 flex items-center justify-center space-x-2"
            >
                <span>Download Backup File</span>
            </button>
            
            {/* Upload Backup */}
            <div className="relative">
                <input 
                    type="file" 
                    accept=".json"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <button 
                    className="w-full py-3 bg-slate-800 dark:bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-900 dark:hover:bg-slate-600 pointer-events-none"
                >
                    Restore / Merge from File
                </button>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                <p className="text-xs text-slate-400 mb-2 text-center">- OR Legacy Plain Text -</p>
                <div className="flex space-x-2">
                    <button 
                        onClick={handleExportJson}
                        className="flex-1 py-2 text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-lg"
                    >
                        Copy Text
                    </button>
                    <button 
                        onClick={() => setShowImport(!showImport)}
                        className="flex-1 py-2 text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-lg"
                    >
                        {showImport ? 'Hide Text Import' : 'Paste Text'}
                    </button>
                </div>
                
                {showImport && (
                    <div className="mt-3 space-y-3 animate-fade-in">
                        <textarea 
                            className="w-full h-32 p-3 text-xs font-mono border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 dark:text-slate-300"
                            placeholder="Paste JSON text data here..."
                            value={importText}
                            onChange={(e) => setImportText(e.target.value)}
                        />
                        <button 
                            onClick={handleManualImportJson}
                            disabled={!importText}
                            className="w-full py-3 bg-slate-800 dark:bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-900 dark:hover:bg-slate-600 disabled:opacity-50"
                        >
                            Import Text Data
                        </button>
                    </div>
                )}
            </div>
        </div>
      </section>
    </div>
  );
};

export default Settings;