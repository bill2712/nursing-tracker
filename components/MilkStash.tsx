import React, { useState, useMemo } from 'react';
import { AppState, MilkStashEntry } from '../types';
import { generateId, formatTimeAgo } from '../utils';
import { SnowflakeIcon, TrashIcon } from './Icons';
import { format, addDays, isBefore } from 'date-fns';

interface MilkStashProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

const MilkStash: React.FC<MilkStashProps> = ({ appState, setAppState }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 16));
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');

  const stash = useMemo(() => {
    return [...(appState.milkStash || [])].sort((a, b) => a.date - b.date); // Oldest first (FIFO)
  }, [appState.milkStash]);

  const totalVolume = stash.reduce((sum, item) => sum + item.amountMl, 0);

  const handleAdd = () => {
    if (!amount || !date) return;
    
    const newEntry: MilkStashEntry = {
        id: generateId(),
        date: new Date(date).getTime(),
        amountMl: parseInt(amount),
        notes,
        isFrozen: true
    };

    setAppState(prev => ({
        ...prev,
        milkStash: [...(prev.milkStash || []), newEntry]
    }));
    
    setIsAdding(false);
    setAmount('');
    setNotes('');
  };

  const handleUse = (id: string) => {
      if(confirm("確認使用/移除此庫存？")) {
          setAppState(prev => ({
              ...prev,
              milkStash: prev.milkStash.filter(item => item.id !== id)
          }));
      }
  };

  return (
    <div className="pb-24 pt-4 px-4 max-w-md mx-auto h-full overflow-y-auto">
        <header className="mb-6 flex justify-between items-center">
             <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">母乳庫存</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">總庫存量: <span className="font-bold text-indigo-600 dark:text-indigo-400">{totalVolume} ml</span></p>
             </div>
             <button 
                onClick={() => setIsAdding(true)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-md transition-colors flex items-center gap-2"
             >
                <SnowflakeIcon className="w-4 h-4" />
                新增
             </button>
        </header>

        {/* Add Modal */}
        {isAdding && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl p-6 shadow-2xl animate-fade-in">
                    <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-white">新增冷凍奶</h3>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase">擠奶日期時間</label>
                            <input 
                                type="datetime-local"
                                value={date} 
                                onChange={e => setDate(e.target.value)}
                                className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase">容量 (ml)</label>
                            <input 
                                type="number" 
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                                placeholder="例如: 150"
                                className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 dark:text-white"
                                autoFocus
                            />
                        </div>
                        <div>
                             <label className="text-xs font-bold text-slate-500 uppercase">備註</label>
                             <input 
                                type="text" 
                                value={notes}
                                onChange={e => setNotes(e.target.value)}
                                placeholder="選填"
                                className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 dark:text-white"
                             />
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button onClick={() => setIsAdding(false)} className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-xl">
                            取消
                        </button>
                        <button onClick={handleAdd} className="flex-1 py-3 bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none">
                            儲存
                        </button>
                    </div>
                </div>
            </div>
        )}

        <div className="space-y-3">
            {stash.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                    <SnowflakeIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>冰箱空空的...</p>
                </div>
            ) : (
                stash.map(item => {
                    const expiryDate = addDays(item.date, 90); // 3 months rule
                    const isExpiring = isBefore(expiryDate, addDays(new Date(), 7)); // Warn if < 7 days left

                    return (
                        <div key={item.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                             <div>
                                 <div className="flex items-center gap-2 mb-1">
                                     <span className="font-bold text-lg text-slate-800 dark:text-slate-200">{item.amountMl}ml</span>
                                     {isExpiring && <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold">即將過期</span>}
                                 </div>
                                 <div className="text-xs text-slate-500 dark:text-slate-400">
                                     {format(item.date, 'MM/dd HH:mm')} ({formatTimeAgo(item.date)})
                                 </div>
                                 {item.notes && <p className="text-xs text-slate-400 mt-1 italic">{item.notes}</p>}
                             </div>
                             <button 
                                onClick={() => handleUse(item.id)}
                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                             >
                                <TrashIcon className="w-5 h-5" />
                             </button>
                        </div>
                    );
                })
            )}
        </div>
    </div>
  );
};

export default MilkStash;
