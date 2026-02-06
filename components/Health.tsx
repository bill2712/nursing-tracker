import React, { useState } from 'react';
import { AppState, Vaccine, Milestone } from '../types';
import { format } from 'date-fns';
import { CheckIcon } from './Icons';
import Growth from './Growth';

interface HealthProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

const Health: React.FC<HealthProps> = ({ appState, setAppState }) => {
  const [activeTab, setActiveTab] = useState<'growth' | 'vaccines' | 'milestones'>('growth');

  const profile = appState.babyProfile;

  const toggleVaccine = (id: string) => {
    setAppState(prev => ({
      ...prev,
      health: {
        ...prev.health,
        vaccines: prev.health.vaccines.map(v => 
          v.id === id 
            ? { ...v, completed: !v.completed, date: !v.completed ? Date.now() : undefined } 
            : v
        )
      }
    }));
  };

  const updateVaccineDate = (id: string, dateStr: string) => {
    const timestamp = new Date(dateStr).getTime();
    setAppState(prev => ({
      ...prev,
      health: {
        ...prev.health,
        vaccines: prev.health.vaccines.map(v => 
          v.id === id ? { ...v, date: timestamp } : v
        )
      }
    }));
  };

  const toggleMilestone = (id: string) => {
    setAppState(prev => ({
      ...prev,
      health: {
        ...prev.health,
        milestones: prev.health.milestones.map(m => 
          m.id === id 
            ? { ...m, completed: !m.completed, date: !m.completed ? Date.now() : undefined } 
            : m
        )
      }
    }));
  };

  const updateMilestoneDate = (id: string, dateStr: string) => {
    const timestamp = new Date(dateStr).getTime();
    setAppState(prev => ({
      ...prev,
      health: {
        ...prev.health,
        milestones: prev.health.milestones.map(m => 
          m.id === id ? { ...m, date: timestamp } : m
        )
      }
    }));
  };

  if (activeTab === 'growth') {
      return (
          <div className="h-full flex flex-col">
              <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 p-2 flex justify-center space-x-2 shrink-0">
                  <TabButton active={true} onClick={() => {}} label="成長" />
                  <TabButton active={false} onClick={() => setActiveTab('vaccines')} label="疫苗" />
                  <TabButton active={false} onClick={() => setActiveTab('milestones')} label="發展" />
              </div>
              <div className="flex-1 overflow-y-auto">
                 <Growth appState={appState} setAppState={setAppState} />
              </div>
          </div>
      );
  }

  // Grouping logic for Vaccines & Milestones
  const vaccinesByAge = (appState.health?.vaccines || []).reduce((acc, v) => {
    const age = v.ageMonths;
    if (!acc[age]) acc[age] = [];
    acc[age].push(v);
    return acc;
  }, {} as Record<number, Vaccine[]>);

  const milestonesByAge = (appState.health?.milestones || []).reduce((acc, m) => {
    const age = m.ageMonths;
    if (!acc[age]) acc[age] = [];
    acc[age].push(m);
    return acc;
  }, {} as Record<number, Milestone[]>);

  const sortedAges = Array.from(new Set([
    ...Object.keys(vaccinesByAge).map(Number),
    ...Object.keys(milestonesByAge).map(Number)
  ])).sort((a, b) => a - b);


  const renderAgeLabel = (months: number) => {
    if (months === 0) return '出生時 (At Birth)';
    if (months < 12) return `${months} 個月`;
    if (months % 12 === 0) return `${months/12} 歲`;
    return `${Math.floor(months/12)}歲 ${months%12}個月`;
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-950">
       <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 p-2 flex justify-center space-x-2 shrink-0 z-10">
            <TabButton active={false} onClick={() => setActiveTab('growth')} label="成長" />
            <TabButton active={activeTab === 'vaccines'} onClick={() => setActiveTab('vaccines')} label="疫苗" />
            <TabButton active={activeTab === 'milestones'} onClick={() => setActiveTab('milestones')} label="發展" />
       </div>

       <div className="flex-1 overflow-y-auto p-4 max-w-md mx-auto w-full pb-24">
          {sortedAges.map(age => {
            const items = activeTab === 'vaccines' ? vaccinesByAge[age] : milestonesByAge[age];
            if (!items || items.length === 0) return null;

            return (
                <div key={age} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                    <div className="bg-slate-50 dark:bg-slate-900/50 px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                        <span className="font-bold text-slate-700 dark:text-slate-300">{renderAgeLabel(age)}</span>
                        <span className="text-xs font-medium text-slate-400">{items.filter((i: any) => i.completed).length} / {items.length} 完成</span>
                    </div>
                    <div>
                        {items.map((item: any) => (
                            <div key={item.id} className={`p-4 border-b border-slate-50 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${item.completed ? 'opacity-70' : ''}`}>
                                <div className="flex items-start gap-3">
                                    <button 
                                        onClick={() => activeTab === 'vaccines' ? toggleVaccine(item.id) : toggleMilestone(item.id)}
                                        className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ${item.completed ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300 dark:border-slate-600'}`}
                                    >
                                        {item.completed && <CheckIcon className="w-3.5 h-3.5" />}
                                    </button>
                                    <div className="flex-1">
                                        <p className={`font-medium text-sm ${item.completed ? 'text-slate-500 line-through' : 'text-slate-800 dark:text-slate-200'}`}>
                                            {activeTab === 'vaccines' ? (item as Vaccine).name : (item as Milestone).description}
                                        </p>
                                        {activeTab === 'milestones' && (
                                            <span className="inline-block mt-1 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
                                                {(item as Milestone).category === 'motor' ? '動作' : 
                                                 (item as Milestone).category === 'language' ? '語言' : 
                                                 (item as Milestone).category === 'cognitive' ? '認知' : '社交'}
                                            </span>
                                        )}
                                        
                                        {item.completed && (
                                            <div className="mt-2 flex items-center space-x-2">
                                                <span className="text-xs text-slate-400">日期:</span>
                                                <input 
                                                    type="date" 
                                                    value={item.date ? format(new Date(item.date), 'yyyy-MM-dd') : ''}
                                                    onChange={(e) => activeTab === 'vaccines' ? updateVaccineDate(item.id, e.target.value) : updateMilestoneDate(item.id, e.target.value)}
                                                    className="bg-transparent border border-slate-200 dark:border-slate-700 rounded px-2 py-0.5 text-xs text-slate-600 dark:text-slate-300"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
          })}
       </div>
    </div>
  );
};

const TabButton = ({ active, onClick, label }: any) => (
    <button 
        onClick={onClick}
        className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all ${active ? 'bg-indigo-500 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
    >
        {label}
    </button>
);

export default Health;
