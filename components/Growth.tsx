import React, { useState, useMemo } from 'react';
import { AppState, GrowthEntry, BabyProfile } from '../types';
import { generateId, kgToLb, lbToKg, cmToIn, inToCm, formatWeight, formatLength, getAgeInMonths } from '../utils';
import { RulerIcon, TrashIcon, PencilIcon } from './Icons';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceArea, ReferenceLine } from 'recharts';
import { WHO_STANDARDS } from './WHOStandards';
import { format } from 'date-fns';

interface GrowthProps {
  appState: AppState;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
}

const Growth: React.FC<GrowthProps> = ({ appState, setAppState }) => {
  const [activeTab, setActiveTab] = useState<'weight' | 'length' | 'head'>('weight');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [date, setDate] = useState(() => {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  });
  const [weight, setWeight] = useState(''); // User input value
  const [length, setLength] = useState(''); // User input value
  const [head, setHead] = useState(''); // User input value
  const [notes, setNotes] = useState('');

  const profile = appState.babyProfile;

  const sortedGrowth = useMemo(() => {
    return [...(appState.growth || [])].sort((a, b) => a.date - b.date);
  }, [appState.growth]);

  const toggleUnit = (type: 'weight' | 'length') => {
    setAppState(prev => ({
      ...prev,
      babyProfile: {
        ...prev.babyProfile,
        [type === 'weight' ? 'weightUnit' : 'lengthUnit']: 
          type === 'weight' 
            ? (prev.babyProfile.weightUnit === 'kg' ? 'lb' : 'kg') 
            : (prev.babyProfile.lengthUnit === 'cm' ? 'in' : 'cm')
      }
    }));
  };

  const initAdd = () => {
    const now = new Date();
    setDate(new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16));
    setWeight('');
    setLength('');
    setHead('');
    setNotes('');
    setEditingId(null);
    setIsAdding(true);
  };

  const handleEdit = (entry: GrowthEntry) => {
    const d = new Date(entry.date);
    setDate(new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16));
    
    // Convert stored metric values to display unit
    if (entry.weight) {
        setWeight(profile.weightUnit === 'kg' ? entry.weight.toString() : kgToLb(entry.weight).toFixed(2));
    } else {
        setWeight('');
    }

    if (entry.length) {
        setLength(profile.lengthUnit === 'cm' ? entry.length.toString() : cmToIn(entry.length).toFixed(1));
    } else {
        setLength('');
    }

    if (entry.headCircumference) {
        setHead(profile.lengthUnit === 'cm' ? entry.headCircumference.toString() : cmToIn(entry.headCircumference).toFixed(1));
    } else {
        setHead('');
    }

    setNotes(entry.notes || '');
    setEditingId(entry.id);
    setIsAdding(true);
  };

  const saveEntry = () => {
    if (!date) return;

    // Parse inputs based on current unit settings
    let finalWeight = parseFloat(weight);
    let finalLength = parseFloat(length);
    let finalHead = parseFloat(head);

    if (profile.weightUnit === 'lb' && !isNaN(finalWeight)) finalWeight = lbToKg(finalWeight);
    if (profile.lengthUnit === 'in') {
        if (!isNaN(finalLength)) finalLength = inToCm(finalLength);
        if (!isNaN(finalHead)) finalHead = inToCm(finalHead);
    }

    const newEntry: GrowthEntry = {
        id: editingId || generateId(),
        date: new Date(date).getTime(),
        weight: isNaN(finalWeight) ? undefined : finalWeight,
        length: isNaN(finalLength) ? undefined : finalLength,
        headCircumference: isNaN(finalHead) ? undefined : finalHead,
        notes: notes.trim() || undefined
    };

    setAppState(prev => {
        const existing = prev.growth || [];
        let updated;
        if (editingId) {
            updated = existing.map(g => g.id === editingId ? newEntry : g);
        } else {
            updated = [...existing, newEntry];
        }
        return { ...prev, growth: updated };
    });

    setIsAdding(false);
  };

  const deleteEntry = (id: string) => {
    if (confirm("確定要刪除此成長紀錄？")) {
        setAppState(prev => ({
            ...prev,
            growth: prev.growth.filter(g => g.id !== id)
        }));
    }
  };

  // Chart Data Preparation
  const chartData = useMemo(() => {
    const standards = WHO_STANDARDS;
    const gender = profile.gender === 'boy' ? 'boys' : 'girls';
    
    const dataPoints = sortedGrowth.map(g => {
       const ageMonths = getAgeInMonths(profile.birthDate, g.date);
       
       let val = 0;
       if (activeTab === 'weight') val = g.weight || 0;
       if (activeTab === 'length') val = g.length || 0;
       if (activeTab === 'head') val = g.headCircumference || 0;

       // Filter out empty values for the active chart
       if (!val) return null;

       // Convert for display on chart if needed
       if (activeTab === 'weight' && profile.weightUnit === 'lb') val = kgToLb(val);
       if ((activeTab === 'length' || activeTab === 'head') && profile.lengthUnit === 'in') val = cmToIn(val);

       return {
           age: ageMonths,
           date: g.date,
           value: val,
           details: g
       };
    }).filter(d => d !== null) as any[];

    // Generate Standard Lines
    // We generate points for the max age in our data, or at least 0-12 months
    const maxAge = Math.max(12, ...dataPoints.map(d => d.age + 1));
    const refData = [];
    
    let standardSource;
    if (activeTab === 'weight') standardSource = standards.weightForAge[gender];
    else if (activeTab === 'length') standardSource = standards.lengthForAge[gender];
    else standardSource = standards.headCircumferenceForAge[gender];

    // Create a combined dataset for the chart
    // We simply use the age as the X-axis (linear).
    // The simplified WHO data is monthly. We can just plot the WHO lines.
    // To mix user data (irregular times) with WHO data (regular months), 
    // we ideally need a Scatter chart with connecting lines, but Recharts LineChart works if we format it right.
    // Easier approach: Use XAxis type="number" dataKey="age".
    
    // Flatten WHO data for the range
    const refLines = standardSource.filter(s => s.month <= maxAge).map(s => {
        let p3 = s.p3, p50 = s.p50, p97 = s.p97;
        
        if (activeTab === 'weight' && profile.weightUnit === 'lb') {
            p3 = kgToLb(p3); p50 = kgToLb(p50); p97 = kgToLb(p97);
        }
        if ((activeTab === 'length' || activeTab === 'head') && profile.lengthUnit === 'in') {
            p3 = cmToIn(p3); p50 = cmToIn(p50); p97 = cmToIn(p97);
        }

        return { age: s.month, p3, p50, p97, isRef: true };
    });

    return { user: dataPoints, ref: refLines };
  }, [sortedGrowth, activeTab, profile, WHO_STANDARDS]);

  const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
          const p = payload[0].payload;
          if (p.isRef) {
              return (
                 <div className="bg-white dark:bg-slate-800 p-2 border border-slate-200 dark:border-slate-700 rounded text-xs">
                     <p className="font-bold">Age: {p.age} months</p>
                     <p className="text-emerald-500">97%: {p.p97.toFixed(1)}</p>
                     <p className="text-blue-500">50%: {p.p50.toFixed(1)}</p>
                     <p className="text-orange-500">3%: {p.p3.toFixed(1)}</p>
                 </div>
              );
          }
          return (
             <div className="bg-white dark:bg-slate-800 p-2 border border-slate-200 dark:border-slate-700 rounded text-xs">
                  <p className="font-bold">{format(new Date(p.date), 'PP')}</p>
                  <p>年齡: {p.age.toFixed(1)}m</p>
                  <p className="text-pink-500 font-bold text-sm">
                      {p.value.toFixed(2)} 
                      {activeTab === 'weight' ? profile.weightUnit : profile.lengthUnit}
                  </p>
             </div>
          );
      }
      return null;
  };

  return (
    <div className="p-6 pb-24 space-y-6">
      <header className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">成長紀錄</h1>
           <p className="text-xs text-slate-500">{profile.name} 的成長進度</p>
        </div>
        <div className="flex space-x-2">
            <button 
                onClick={initAdd}
                className="text-white bg-pink-500 hover:bg-pink-600 p-2 rounded-xl transition-colors shadow-sm"
            >
                <div className="flex items-center space-x-1 font-bold text-sm px-2">
                    <span>+ 紀錄</span>
                </div>
            </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex">
          {[
              { id: 'weight', label: '體重' },
              { id: 'length', label: '身高' },
              { id: 'head', label: '頭圍' }
          ].map((tab: any) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 text-xs font-bold uppercase rounded-lg transition-all ${activeTab === tab.id ? 'bg-white dark:bg-slate-700 text-pink-600 dark:text-pink-400 shadow-sm' : 'text-slate-500'}`}
              >
                  {tab.label}
              </button>
          ))}
      </div>

      {/* Unit Toggle */}
      <div className="flex justify-end">
          <button 
             onClick={() => toggleUnit(activeTab === 'weight' ? 'weight' : 'length')}
             className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1 rounded-full"
          >
             單位: {activeTab === 'weight' ? profile.weightUnit : profile.lengthUnit}
          </button>
      </div>

      {/* Charts */}
      <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 h-80 relative">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
             <XAxis 
                type="number" 
                dataKey="age" 
                name="年齡 (月)" 
                domain={[0, 'auto']} 
                label={{ value: '年齡 (月)', position: 'bottom', fontSize: 10, fill: '#94a3b8' }}
                tick={{fontSize: 10, fill: '#94a3b8'}}
             />
             <YAxis 
                domain={['auto', 'auto']} 
                tick={{fontSize: 10, fill: '#94a3b8'}}
             />
             <Tooltip content={<CustomTooltip />} />
             
             {/* Reference Lines (WHO) */}
             <Line data={chartData.ref} type="monotone" dataKey="p97" stroke="#10b981" strokeDasharray="3 3" dot={false} strokeWidth={1} name="97%" />
             <Line data={chartData.ref} type="monotone" dataKey="p50" stroke="#3b82f6" strokeDasharray="3 3" dot={false} strokeWidth={1} name="50%" />
             <Line data={chartData.ref} type="monotone" dataKey="p3" stroke="#f97316" strokeDasharray="3 3" dot={false} strokeWidth={1} name="3%" />

             {/* User Data */}
             <Line 
                data={chartData.user} 
                type="monotone" 
                dataKey="value" 
                stroke="#ec4899" 
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, fill: '#ffffff', stroke: '#ec4899' }}
                activeDot={{ r: 6 }}
             />
            </LineChart>
          </ResponsiveContainer>
          
          <div className="absolute top-2 right-4 flex flex-col text-[9px] text-slate-400 items-end">
              <span className="text-emerald-500">--- 97th %</span>
              <span className="text-blue-500">--- 50th %</span>
              <span className="text-orange-500">--- 3rd %</span>
          </div>
      </div>

      {/* History List */}
      <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">歷史紀錄</h3>
          {sortedGrowth.slice().reverse().map(entry => (
              <div 
                key={entry.id}
                onClick={() => handleEdit(entry)}
                className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex justify-between items-center group cursor-pointer active:bg-slate-50 dark:active:bg-slate-800"
              >
                  <div>
                      <div className="text-sm font-bold text-slate-700 dark:text-slate-200">
                          {format(new Date(entry.date), 'PP')}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                          年齡: {getAgeInMonths(profile.birthDate, entry.date).toFixed(1)}m
                      </div>
                  </div>
                  <div className="flex flex-col items-end text-sm">
                      {activeTab === 'weight' && entry.weight && (
                          <span className="font-mono font-bold text-pink-600 dark:text-pink-400">
                             {formatWeight(entry.weight, profile.weightUnit)}
                          </span>
                      )}
                      {activeTab === 'length' && entry.length && (
                          <span className="font-mono font-bold text-pink-600 dark:text-pink-400">
                              {formatLength(entry.length, profile.lengthUnit)}
                          </span>
                      )}
                      {activeTab === 'head' && entry.headCircumference && (
                          <span className="font-mono font-bold text-pink-600 dark:text-pink-400">
                              {formatLength(entry.headCircumference, profile.lengthUnit)}
                          </span>
                      )}
                      
                      {/* Show other stats in small text if present */}
                      <div className="flex space-x-2 mt-1 text-[10px] text-slate-400">
                         {entry.weight && activeTab !== 'weight' && <span>W: {formatWeight(entry.weight, profile.weightUnit)}</span>}
                         {entry.length && activeTab !== 'length' && <span>L: {formatLength(entry.length, profile.lengthUnit)}</span>}
                      </div>
                  </div>
              </div>
          ))}
      </div>

      {/* Add/Edit Modal */}
      {isAdding && (
         <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in" onClick={() => setIsAdding(false)}>
             <div className="bg-white dark:bg-slate-900 w-full sm:max-w-sm rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden animate-slide-up sm:animate-fade-in" onClick={e => e.stopPropagation()}>
                 <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                     <h3 className="font-bold text-slate-700 dark:text-slate-200">{editingId ? 'Edit Record' : 'Log Measurement'}</h3>
                     {editingId && (
                         <button onClick={() => deleteEntry(editingId)} className="text-red-500 text-xs font-bold uppercase px-2">Delete</button>
                     )}
                 </div>
                 
                 <div className="p-6 space-y-4">
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">日期</label>
                        <input 
                          type="datetime-local" 
                          value={date}
                          onChange={e => setDate(e.target.value)}
                          className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm dark:text-white"
                        />
                     </div>
                     
                     <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">體重 ({profile.weightUnit})</label>
                            <input 
                                type="number" step="0.01"
                                value={weight}
                                onChange={e => setWeight(e.target.value)}
                                placeholder="0.00"
                                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-lg font-mono dark:text-white"
                            />
                         </div>
                         <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-500 uppercase">身高 ({profile.lengthUnit})</label>
                            <input 
                                type="number" step="0.1"
                                value={length}
                                onChange={e => setLength(e.target.value)}
                                placeholder="0.0"
                                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-lg font-mono dark:text-white"
                            />
                         </div>
                     </div>
                     
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">頭圍 ({profile.lengthUnit})</label>
                        <input 
                            type="number" step="0.1"
                            value={head}
                            onChange={e => setHead(e.target.value)}
                            placeholder="0.0"
                            className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-lg font-mono dark:text-white"
                        />
                     </div>

                     <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase">備註</label>
                        <textarea
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm"
                            rows={2}
                        />
                     </div>

                     <div className="flex gap-3 pt-2">
                        <button onClick={() => setIsAdding(false)} className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-xl">取消</button>
                        <button onClick={saveEntry} className="flex-1 py-3 bg-pink-500 text-white font-bold rounded-xl shadow-lg shadow-pink-200 dark:shadow-none">儲存</button>
                     </div>
                 </div>
             </div>
         </div>
      )}
    </div>
  );
};

export default Growth;
