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
      alert("資料已複製到剪貼簿！傳送給伴侶。");
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
             if(confirm(`在檔案中找到 ${parsedLogs.length} 筆紀錄。要合併到目前紀錄嗎？`)) {
                // Sanitize IDs
                const sanitizedLogs = parsedLogs.map((l: any) => ({
                    ...l,
                    id: String(l.id)
                })) as LogEntry[];

                // Merge Logic
                const currentIds = new Set(appState.logs.map(l => String(l.id)));
                const newLogs = sanitizedLogs.filter(l => !currentIds.has(l.id));

                if (newLogs.length === 0) {
                    alert("沒有新資料可匯入 (所有紀錄已存在)。");
                    return;
                }

                setAppState(prev => ({ 
                    ...prev, 
                    logs: [...prev.logs, ...newLogs].sort((a, b) => b.startTime - a.startTime) 
                }));
                alert(`成功匯入 ${newLogs.length} 筆新紀錄！`);
             }
        } else {
            alert("檔案格式無效。需要紀錄的 JSON 陣列。");
        }
      } catch (err) {
        console.error(err);
        alert("解析檔案失敗。檔案是否為有效的 JSON 備份？");
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
        if(confirm("這將合併匯入資料與目前資料。繼續？")) {
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
            alert(`成功匯入 ${newLogs.length} 筆紀錄！`);
        }
      } else {
        alert("資料格式無效：需要紀錄的陣列。");
      }
    } catch (e) {
      console.error(e);
      alert("解析資料錯誤。請確認貼上的是正確的 JSON 文字。");
    }
  };

  const clearAllData = () => {
      if(confirm("嚴重警告：這將永久刪除所有歷史紀錄。確定嗎？")) {
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
        alert("您必須在瀏覽器設定中允許通知才能使用此功能。");
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
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">設定</h1>
        <div className="flex items-center space-x-3">
             <span className="text-sm font-bold text-slate-500 dark:text-slate-400">深色模式</span>
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
        <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">每日睡眠目標</h3>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-between">
           <div className="flex flex-col items-center">
              <input 
                type="number" min="0" max="24"
                value={appState.sleepGoal.hours}
                onChange={(e) => updateSleepGoal('hours', parseInt(e.target.value) || 0)}
                className="w-16 p-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-lg text-center text-xl font-bold dark:text-white"
              />
              <span className="text-xs text-slate-500 mt-1">小時</span>
           </div>
           <span className="text-slate-300 text-2xl">:</span>
           <div className="flex flex-col items-center">
              <input 
                type="number" min="0" max="59"
                value={appState.sleepGoal.minutes}
                onChange={(e) => updateSleepGoal('minutes', parseInt(e.target.value) || 0)}
                className="w-16 p-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-lg text-center text-xl font-bold dark:text-white"
              />
              <span className="text-xs text-slate-500 mt-1">分鐘</span>
           </div>
           <div className="text-xs text-slate-400 w-24 text-right">
              總目標: <br/>
              <span className="font-bold text-indigo-500">{appState.sleepGoal.hours}h {appState.sleepGoal.minutes}m</span> ({((appState.sleepGoal.hours || 0) + (appState.sleepGoal.minutes || 0)/60).toFixed(1)}h)
           </div>
        </div>
      </section>

      {/* Reminders Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">提醒</h3>
          <button 
             onClick={toggleNotifications}
             className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${appState.reminders.enabled ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}
          >
             {appState.reminders.enabled ? '已啟用' : '已停用'}
          </button>
        </div>
        
        {appState.reminders.enabled && (
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-6 animate-fade-in">
             <div className="space-y-2">
               <div className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300">
                  <span>餵奶提醒</span>
               </div>
               <div className="flex items-center space-x-3">
                 <input 
                   type="number" min="0" 
                   value={appState.reminders.feeding}
                   onChange={(e) => updateReminder('feeding', parseInt(e.target.value) || 0)}
                   className="w-20 p-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-lg text-center"
                 />
                 <span className="text-slate-500 dark:text-slate-400 text-sm">上次餵奶後幾分鐘</span>
               </div>
               <p className="text-xs text-slate-400">設為 0 可停用此提醒。</p>
             </div>

             <div className="space-y-2">
               <div className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300">
                  <span>睡眠提醒</span>
               </div>
               <div className="flex items-center space-x-3">
                 <input 
                   type="number" min="0" 
                   value={appState.reminders.sleep}
                   onChange={(e) => updateReminder('sleep', parseInt(e.target.value) || 0)}
                   className="w-20 p-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-lg text-center"
                 />
                 <span className="text-slate-500 dark:text-slate-400 text-sm">醒來後幾分鐘</span>
               </div>
             </div>

             <div className="space-y-2">
               <div className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300">
                  <span>換片檢查</span>
               </div>
               <div className="flex items-center space-x-3">
                 <input 
                   type="number" min="0" 
                   value={appState.reminders.diaper}
                   onChange={(e) => updateReminder('diaper', parseInt(e.target.value) || 0)}
                   className="w-20 p-2 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-lg text-center"
                 />
                 <span className="text-slate-500 dark:text-slate-400 text-sm">上次換片後幾分鐘</span>
               </div>
             </div>
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">資料管理</h3>
        
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
           <button 
              onClick={() => exportToCSV(appState.logs)}
              className="w-full text-left px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium"
           >
              下載 CSV 匯出
           </button>
           <button 
             onClick={clearAllData}
             className="w-full text-left px-6 py-4 hover:bg-red-50 dark:hover:bg-red-900/10 text-red-600 dark:text-red-400 font-medium"
           >
              清除所有資料
           </button>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">伴侶共享 (檔案同步)</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
           下載備份檔並傳送給伴侶以同步裝置。
        </p>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-4">
            {/* Download Backup */}
            <button 
                onClick={handleDownloadBackup}
                className="w-full py-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-semibold rounded-lg border border-indigo-100 dark:border-indigo-900 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 flex items-center justify-center space-x-2"
            >
                <span>下載備份檔</span>
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
                    從檔案還原 / 合併
                </button>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                <p className="text-xs text-slate-400 mb-2 text-center">- 或傳統純文字 -</p>
                <div className="flex space-x-2">
                    <button 
                        onClick={handleExportJson}
                        className="flex-1 py-2 text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-lg"
                    >
                        複製文字
                    </button>
                    <button 
                        onClick={() => setShowImport(!showImport)}
                        className="flex-1 py-2 text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-lg"
                    >
                        {showImport ? '隱藏文字匯入' : '貼上文字'}
                    </button>
                </div>
                
                {showImport && (
                    <div className="mt-3 space-y-3 animate-fade-in">
                        <textarea 
                            className="w-full h-32 p-3 text-xs font-mono border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 dark:text-slate-300"
                            placeholder="在此貼上 JSON 文字資料..."
                            value={importText}
                            onChange={(e) => setImportText(e.target.value)}
                        />
                        <button 
                            onClick={handleManualImportJson}
                            disabled={!importText}
                            className="w-full py-3 bg-slate-800 dark:bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-900 dark:hover:bg-slate-600 disabled:opacity-50"
                        >
                            匯入文字資料
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