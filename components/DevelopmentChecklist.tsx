import React, { useState, useMemo } from 'react';
import { AppState } from '../types';
import { DEVELOPMENT_DATA } from '../data/developmentData';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

interface DevelopmentChecklistProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

const DevelopmentChecklist: React.FC<DevelopmentChecklistProps> = ({ appState, setAppState }) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(0);

  const completedItems = appState.completedChecklistItems || [];

  const handleToggle = async (id: string) => {
    const currentCompleted = appState.completedChecklistItems || [];
    const newCompleted = currentCompleted.includes(id)
      ? currentCompleted.filter(itemId => itemId !== id)
      : [...currentCompleted, id];
      
    await setDoc(doc(db, 'system', 'sharedState'), { completedChecklistItems: newCompleted }, { merge: true });
  };

  const currentData = useMemo(() => {
    return DEVELOPMENT_DATA.find(d => d.month === selectedMonth) || DEVELOPMENT_DATA[0];
  }, [selectedMonth]);

  const calculateProgress = (items: any[]) => {
    if (items.length === 0) return 0;
    const completed = items.filter(item => completedItems.includes(item.id)).length;
    return Math.round((completed / items.length) * 100);
  };

  const renderSection = (title: string, items: any[], icon: string, bgColor: string, textColor: string) => {
    if (!items || items.length === 0) return null;
    
    return (
      <div className="mb-6 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className={`px-4 py-3 ${bgColor} border-b border-slate-100 dark:border-slate-800 flex justify-between items-center`}>
          <div className="flex items-center gap-2">
            <span className="text-xl">{icon}</span>
            <span className={`font-bold ${textColor}`}>{title}</span>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-white/50 px-2 py-1 rounded-full">
            {calculateProgress(items)}%
          </span>
        </div>
        
        <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
          {items.map(item => {
            const isCompleted = completedItems.includes(item.id);
            const isWarning = item.id.includes('warn');
            
            return (
              <label 
                key={item.id} 
                className={`flex items-start gap-3 p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${isCompleted ? 'opacity-60' : ''}`}
              >
                <div className="relative flex items-center justify-center mt-0.5">
                  <input 
                    type="checkbox" 
                    checked={isCompleted}
                    onChange={() => handleToggle(item.id)}
                    className="peer sr-only"
                  />
                  <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all
                    ${isCompleted 
                      ? 'bg-indigo-500 border-indigo-500 text-white' 
                      : 'border-slate-300 dark:border-slate-600 bg-transparent'}`}
                  >
                    {isCompleted && (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold text-sm ${isCompleted ? 'text-slate-500 line-through' : isWarning ? 'text-amber-600 dark:text-amber-500' : 'text-slate-800 dark:text-slate-200'}`}>
                      {item.title}
                    </span>
                    {isWarning && !isCompleted && (
                      <span className="text-[10px] bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-1.5 py-0.5 rounded font-bold">注意</span>
                    )}
                  </div>
                  <p className={`text-xs mt-1 leading-relaxed ${isCompleted ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400'}`}>
                    {item.description}
                  </p>
                </div>
              </label>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950">
      {/* Month Selector Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 pb-2 pt-4 px-4 shrink-0 z-10 sticky top-0 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 px-1">成長發展 Checklist</h1>
        
        <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 -mx-2 px-2 snap-x">
          {DEVELOPMENT_DATA.map(data => (
            <button
              key={data.month}
              onClick={() => setSelectedMonth(data.month)}
              className={`snap-start shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap
                ${selectedMonth === data.month 
                  ? 'bg-indigo-500 text-white shadow-md shadow-indigo-200 dark:shadow-none' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
            >
              {data.month === 0 ? '初生' : `${data.month}個月`}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24 max-w-md mx-auto w-full">
        {/* Month Summary Card */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg mb-6">
          <h2 className="text-xl font-bold mb-2">{currentData.title}</h2>
          <p className="text-sm opacity-90 leading-relaxed">{currentData.description}</p>
        </div>

        {/* Categories */}
        {renderSection("能力與表現 (好與壞)", currentData.abilities, "✨", "bg-amber-50 dark:bg-amber-900/10", "text-amber-800 dark:text-amber-500")}
        {renderSection("每日互動與運動", currentData.exercises, "🏃‍♂️", "bg-emerald-50 dark:bg-emerald-900/10", "text-emerald-800 dark:text-emerald-500")}
        {renderSection("照顧指南", currentData.careTasks, "❤️", "bg-rose-50 dark:bg-rose-900/10", "text-rose-800 dark:text-rose-400")}
      </div>
    </div>
  );
};

export default DevelopmentChecklist;
