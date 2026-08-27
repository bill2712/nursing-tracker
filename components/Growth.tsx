import React, { useState, useMemo } from 'react';
import { AppState, GrowthEntry } from '../types';
import { generateId, kgToLb, lbToKg, cmToIn, inToCm, formatWeight, formatLength, getAgeInMonths, calculatePercentile, getGrowthViewMaxAge, getWhoDatasetKey } from '../utils';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { WHO_STANDARDS } from './WHOStandards';
import { format } from 'date-fns';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

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

  const saveEntry = async () => {
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

    const newEntry = {
        id: editingId || generateId(),
        date: new Date(date).getTime(),
    } as GrowthEntry;
    if (!isNaN(finalWeight)) newEntry.weight = finalWeight;
    if (!isNaN(finalLength)) newEntry.length = finalLength;
    if (!isNaN(finalHead)) newEntry.headCircumference = finalHead;
    if (notes.trim()) newEntry.notes = notes.trim();

    const existing = appState.growth || [];
    let updated;
    if (editingId) {
        updated = existing.map(g => g.id === editingId ? newEntry : g);
    } else {
        updated = [...existing, newEntry];
    }
    
    await setDoc(doc(db, 'system', 'sharedState'), { growth: updated }, { merge: true });

    setIsAdding(false);
  };

  const deleteEntry = async (id: string) => {
    if (confirm("確定要刪除此成長紀錄？")) {
        const updated = appState.growth.filter(g => g.id !== id);
        await setDoc(doc(db, 'system', 'sharedState'), { growth: updated }, { merge: true });
    }
  };

  // Chart Data Preparation
  const chartData = useMemo(() => {
    const standards = WHO_STANDARDS;
    const gender = getWhoDatasetKey(profile.gender);
    
    const dataPoints = sortedGrowth.map(g => {
       const ageMonths = getAgeInMonths(profile.birthDate, g.date);
       
       let val = 0;
       if (activeTab === 'weight') val = g.weight || 0;
       if (activeTab === 'length') val = g.length || 0;
       if (activeTab === 'head') val = g.headCircumference || 0;

       // Filter out empty values for the active chart
       if (!val) return null;

       // Convert for display on chart if needed
       let displayVal = val;
       if (activeTab === 'weight' && profile.weightUnit === 'lb') displayVal = kgToLb(val);
       if ((activeTab === 'length' || activeTab === 'head') && profile.lengthUnit === 'in') displayVal = cmToIn(val);

       return {
           age: ageMonths,
           date: g.date,
           value: displayVal,
           originalValue: val,
           details: g
       };
    }).filter(d => d !== null) as any[];

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
    
    const refLines = standardSource.map(s => {
        let p3 = s.p3, p50 = s.p50, p97 = s.p97;
        
        if (activeTab === 'weight' && profile.weightUnit === 'lb') {
            p3 = kgToLb(p3); p50 = kgToLb(p50); p97 = kgToLb(p97);
        }
        if ((activeTab === 'length' || activeTab === 'head') && profile.lengthUnit === 'in') {
            p3 = cmToIn(p3); p50 = cmToIn(p50); p97 = cmToIn(p97);
        }

        return { age: s.month, p3, p50, p97, isRef: true };
    });
    
    // Keep the view close to the baby's current age. Recharts otherwise expands
    // the numeric axis to include the whole WHO dataset and compresses early data.
    const maxUserAge = dataPoints.length > 0 ? Math.max(...dataPoints.map(d => d.age)) : 0;
    const viewMaxAge = getGrowthViewMaxAge(maxUserAge);

    const visibleRef = refLines.filter(point => point.age <= viewMaxAge);
    const visibleUser = dataPoints.filter(point => point.age >= 0 && point.age <= viewMaxAge);
    const yValues = [
      ...visibleRef.flatMap(point => [point.p3, point.p50, point.p97]),
      ...visibleUser.map(point => point.value)
    ].filter(value => Number.isFinite(value));
    const minValue = yValues.length ? Math.min(...yValues) : 0;
    const maxValue = yValues.length ? Math.max(...yValues) : 10;
    const padding = Math.max((maxValue - minValue) * 0.1, activeTab === 'weight' ? 0.5 : 1);
    const yDomain: [number, number] = [
      Math.max(0, Math.floor((minValue - padding) * 10) / 10),
      Math.ceil((maxValue + padding) * 10) / 10
    ];

    return { user: visibleUser, ref: visibleRef, viewMaxAge, yDomain };
  }, [sortedGrowth, activeTab, profile]);

  const getPercentileStr = (age: number, value: number | undefined, tab: 'weight' | 'length' | 'head') => {
      if (!value) return null;
      const standards = WHO_STANDARDS;
      const gender = getWhoDatasetKey(profile.gender);
      let source;
      if (tab === 'weight') source = standards.weightForAge[gender];
      else if (tab === 'length') source = standards.lengthForAge[gender];
      else source = standards.headCircumferenceForAge[gender];
      
      let closest = source[0];
      let minDiff = Math.abs(age - closest.month);
      for (const s of source) {
          const diff = Math.abs(age - s.month);
          if (diff < minDiff) {
              closest = s;
              minDiff = diff;
          }
      }
      
      const p = calculatePercentile(value, closest.L, closest.M, closest.S);
      if (p === null) return null;
      return `第 ${p.toFixed(1)} 百分位`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
          const userPoint = payload.find((item: any) => item.payload?.originalValue !== undefined)?.payload;
          const p = userPoint || payload.find((item: any) => item.payload?.isRef)?.payload;
          if (!p) return null;
          if (!userPoint && p.isRef) {
              return (
                 <div className="rounded-2xl border border-slate-200 bg-white p-3 text-xs shadow-xl dark:border-slate-700 dark:bg-slate-800">
                     <p className="mb-1 font-bold text-slate-700 dark:text-slate-200">{p.age.toFixed(1)} 個月 WHO 參考</p>
                     <p className="font-semibold text-emerald-600">第 97 百分位：{p.p97.toFixed(1)}</p>
                     <p className="font-semibold text-blue-600">第 50 百分位：{p.p50.toFixed(1)}</p>
                     <p className="font-semibold text-orange-600">第 3 百分位：{p.p3.toFixed(1)}</p>
                 </div>
              );
          }
          
          const percentile = getPercentileStr(p.age, p.originalValue, activeTab);
          
          return (
             <div className="rounded-2xl border border-slate-200 bg-white p-3 text-xs shadow-xl dark:border-slate-700 dark:bg-slate-800">
                  <p className="font-bold text-slate-700 dark:text-slate-200">{format(new Date(p.date), 'yyyy年M月d日')}</p>
                  <p className="mt-1 text-slate-500">年齡：{p.age.toFixed(1)} 個月</p>
                  <p className="text-base font-black text-pink-600">
                      {p.value.toFixed(1)}
                      {activeTab === 'weight' ? profile.weightUnit : profile.lengthUnit}
                  </p>
                  {percentile && <p className="mt-1 font-bold text-indigo-600">WHO {percentile}</p>}
             </div>
          );
      }
      return null;
  };

  const latestPoint = chartData.user[chartData.user.length - 1];
  const activeUnit = activeTab === 'weight' ? profile.weightUnit : profile.lengthUnit;
  const latestPercentile = latestPoint
    ? getPercentileStr(latestPoint.age, latestPoint.originalValue, activeTab)
    : null;
  const activeLabel = activeTab === 'weight' ? '體重' : activeTab === 'length' ? '身高' : '頭圍';
  const whoSexLabel = getWhoDatasetKey(profile.gender) === 'boys' ? '男嬰' : '女嬰';

  return (
    <div className="space-y-5 p-4 pb-24 sm:p-5 sm:pb-24">
      <header className="flex justify-between items-center">
        <div>
           <p className="text-xs font-bold tracking-[0.18em] text-pink-500">成長趨勢</p>
           <h1 className="mt-1 text-2xl font-black text-slate-800 dark:text-slate-100">成長紀錄</h1>
           <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{profile.name} 的成長進度</p>
        </div>
        <button
            onClick={initAdd}
            className="min-h-11 rounded-2xl bg-pink-500 px-4 py-2 text-sm font-black text-white shadow-lg shadow-pink-200 transition-colors hover:bg-pink-600 dark:shadow-none"
        >
            ＋ 紀錄
        </button>
      </header>

      {/* Tabs */}
      <div className="flex rounded-2xl bg-slate-100 p-1.5 dark:bg-slate-800">
          {[
              { id: 'weight', label: '體重' },
              { id: 'length', label: '身高' },
              { id: 'head', label: '頭圍' }
          ].map((tab: any) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`min-h-11 flex-1 rounded-xl py-2 text-sm font-black transition-all ${activeTab === tab.id ? 'bg-white text-pink-600 shadow-sm dark:bg-slate-700 dark:text-pink-400' : 'text-slate-500 dark:text-slate-400'}`}
              >
                  {tab.label}
              </button>
          ))}
      </div>

      <section className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400">最新{activeLabel}</p>
            {latestPoint ? (
              <>
                <p className="mt-0.5 text-3xl font-black tabular-nums text-pink-600">{latestPoint.value.toFixed(1)}<span className="ml-1 text-sm">{activeUnit}</span></p>
                <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {latestPoint.age.toFixed(1)} 個月 · WHO {whoSexLabel}標準{latestPercentile ? ` · ${latestPercentile}` : ''}
                </p>
              </>
            ) : (
              <p className="mt-1 text-sm font-bold text-slate-400">尚未有紀錄</p>
            )}
          </div>
          <button 
             onClick={() => toggleUnit(activeTab === 'weight' ? 'weight' : 'length')}
             aria-label={`切換${activeLabel}單位，目前為 ${activeUnit}`}
             className="min-h-10 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-black uppercase tracking-wide text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
             單位 {activeUnit} ⇄
          </button>
        </div>

        <div className="mb-2 flex flex-wrap gap-x-3 gap-y-1 rounded-2xl bg-slate-50 px-3 py-2 text-[11px] font-bold dark:bg-slate-800/70">
          <span className="text-pink-600">● 寶寶紀錄</span>
          <span className="text-emerald-600">┄ WHO {whoSexLabel}第 97 百分位</span>
          <span className="text-blue-600">┄ WHO {whoSexLabel}第 50 百分位</span>
          <span className="text-orange-600">┄ WHO {whoSexLabel}第 3 百分位</span>
        </div>

        <div className="h-[390px] w-full" role="img" aria-label={`${activeLabel}成長曲線，顯示出生至 ${chartData.viewMaxAge} 個月`}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart margin={{ top: 12, right: 8, bottom: 28, left: 2 }} accessibilityLayer>
             <CartesianGrid strokeDasharray="4 5" vertical={false} stroke={appState.darkMode ? '#334155' : '#e2e8f0'} />
             <XAxis 
                type="number" 
                dataKey="age" 
                name="年齡 (月)" 
                domain={[0, chartData.viewMaxAge]} 
                allowDataOverflow
                ticks={Array.from({length: chartData.viewMaxAge + 1}, (_, i) => i).filter(i => chartData.viewMaxAge <= 12 || i % (chartData.viewMaxAge <= 24 ? 2 : 6) === 0)}
                label={{ value: '年齡（月）', position: 'bottom', offset: 8, fontSize: 12, fill: '#64748b', fontWeight: 700 }}
                tick={{fontSize: 12, fill: '#64748b', fontWeight: 700}}
                axisLine={{ stroke: '#cbd5e1' }}
                tickLine={false}
                tickMargin={10}
             />
             <YAxis 
                domain={chartData.yDomain}
                allowDataOverflow
                width={42}
                tick={{fontSize: 12, fill: '#64748b', fontWeight: 700}}
                axisLine={false}
                tickLine={false}
             />
             <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '3 3' }} />
             
             {/* Reference Lines (WHO) */}
             <Line data={chartData.ref} type="monotone" dataKey="p97" stroke="#059669" strokeDasharray="7 5" dot={false} strokeWidth={3} strokeOpacity={0.75} name="第 97 百分位" />
             <Line data={chartData.ref} type="monotone" dataKey="p50" stroke="#2563eb" strokeDasharray="7 5" dot={false} strokeWidth={3} strokeOpacity={0.75} name="第 50 百分位" />
             <Line data={chartData.ref} type="monotone" dataKey="p3" stroke="#ea580c" strokeDasharray="7 5" dot={false} strokeWidth={3} strokeOpacity={0.75} name="第 3 百分位" />

             {/* User Data */}
             <Line 
                data={chartData.user} 
                type="monotone" 
                dataKey="value" 
                stroke="#ec4899" 
                name="寶寶紀錄"
                strokeWidth={5}
                dot={{ r: 7, strokeWidth: 4, fill: '#ffffff', stroke: '#ec4899' }}
                activeDot={{ r: 9, stroke: '#ec4899', strokeWidth: 3, fill: '#ffffff' }}
             />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-1 text-center text-xs font-semibold text-slate-400">資料採用 WHO 0–5 歲{whoSexLabel}{activeLabel}年齡標準，圖表會按目前年齡自動放大。</p>
      </section>

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
                      {/* WHO Percentiles */}
                      {(() => {
                          const age = getAgeInMonths(profile.birthDate, entry.date);
                          const pWeight = getPercentileStr(age, entry.weight, 'weight');
                          const pLength = getPercentileStr(age, entry.length, 'length');
                          const pHead = getPercentileStr(age, entry.headCircumference, 'head');
                          
                          if (!pWeight && !pLength && !pHead) return null;

                          return (
                              <div className="flex gap-2 mt-1.5">
                                  {pWeight && <span className="text-[10px] bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded font-bold">體重: WHO {pWeight}</span>}
                                  {pLength && <span className="text-[10px] bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded font-bold">身高: WHO {pLength}</span>}
                                  {pHead && <span className="text-[10px] bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded font-bold">頭圍: WHO {pHead}</span>}
                              </div>
                          );
                      })()}
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
