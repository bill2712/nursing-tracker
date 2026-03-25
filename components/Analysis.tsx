import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid, AreaChart, Area } from 'recharts';
import { AppState } from '../types';
import { SparklesIcon } from './Icons';
import { getGeminiInsights } from '../services/geminiService';
import { format, startOfDay, endOfDay, isWithinInterval, subDays, eachDayOfInterval } from 'date-fns';
import { formatDuration } from '../utils';

interface AnalysisProps {
  appState: AppState;
}

const Analysis: React.FC<AnalysisProps> = ({ appState }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const today = new Date();

  // Recommended daily feeding volume from growth plan (MM/DD -> ml)
  const babyGrowthPlan: Record<string, number> = {
    '02/20': 483, '02/21': 484, '02/22': 484, '02/23': 484, '02/24': 484,
    '02/25': 485, '02/26': 485, '02/27': 485, '02/28': 508, '03/01': 530,
    '03/02': 553, '03/03': 559, '03/04': 565, '03/05': 571, '03/06': 578,
    '03/07': 584, '03/08': 590, '03/09': 596, '03/10': 603, '03/11': 609,
    '03/12': 615, '03/13': 621, '03/14': 628, '03/15': 634, '03/16': 640,
    '03/17': 646, '03/18': 652, '03/19': 659, '03/20': 665, '03/21': 671,
    '03/22': 677, '03/23': 682, '03/24': 688, '03/25': 694, '03/26': 700,
    '03/27': 705, '03/28': 711, '03/29': 717, '03/30': 723, '03/31': 728,
    '04/01': 734, '04/02': 740, '04/03': 746, '04/04': 752, '04/05': 757,
    '04/06': 763, '04/07': 769, '04/08': 775, '04/09': 780, '04/10': 786,
    '04/11': 792, '04/12': 798, '04/13': 804, '04/14': 809, '04/15': 815,
    '04/16': 821, '04/17': 827, '04/18': 831, '04/19': 836, '04/20': 841,
    '04/21': 845, '04/22': 850, '04/23': 854, '04/24': 859, '04/25': 864,
    '04/26': 868, '04/27': 873, '04/28': 877, '04/29': 882, '04/30': 887,
    '05/01': 891, '05/02': 896, '05/03': 901, '05/04': 905, '05/05': 910,
    '05/06': 914, '05/07': 919, '05/08': 924, '05/09': 928, '05/10': 933,
    '05/11': 938, '05/12': 942, '05/13': 947, '05/14': 951, '05/15': 956,
  };

  const handleGetInsight = async () => {
    setLoading(true);
    const text = await getGeminiInsights(appState.logs);
    setInsight(text);
    setLoading(false);
  };

  // Trend Chart (Last 10 Days)
  const last10Days = eachDayOfInterval({
    start: subDays(today, 9),
    end: today
  });

  const trendData = last10Days.map(day => {
    const dayStart = startOfDay(day);
    const dayEnd = endOfDay(day);
    
    const logsInDay = appState.logs.filter(l => isWithinInterval(l.startTime, { start: dayStart, end: dayEnd }));

    // Sleep
    const dailySleepSeconds = logsInDay
      .filter(l => l.type === 'sleep')
      .reduce((acc, curr) => acc + (curr.durationSeconds || 0), 0);

    // Feeding Volume
    const dailyFeedingMl = logsInDay
      .filter(l => l.type === 'feeding')
      .reduce((acc, curr) => acc + (curr.details.amountMl || 0), 0);
      
    // Diaper Breakdown
    const diapers = logsInDay.filter(l => l.type === 'diaper');
    let wet = 0; let dirty = 0;
    diapers.forEach(d => {
      if (d.details.diaperState === 'wet') wet++;
      if (d.details.diaperState === 'dirty') dirty++;
      if (d.details.diaperState === 'mixed') { wet++; dirty++; }
    });

    // Colic Count
    const colicCount = logsInDay.filter(l => l.type === 'colic').length;

    // Feeding Count
    const feedingCount = logsInDay.filter(l => l.type === 'feeding').length;

    // Recommended ml from growth plan (key: MM/DD)
    const mmdd = format(day, 'MM/dd').replace('-', '/');
    // format returns MM/dd, need MM/DD (uppercase has no effect on numbers), key matches
    const recommendedMl = babyGrowthPlan[format(day, 'MM/dd')] ?? null;

    return {
      date: format(day, 'EEE'), // Mon, Tue...
      fullDate: format(day, 'MMM d'),
      sleepHours: parseFloat((dailySleepSeconds / 3600).toFixed(1)),
      sleepSeconds: dailySleepSeconds,
      feedingMl: dailyFeedingMl,
      feedingCount: feedingCount,
      recommendedMl: recommendedMl,
      wetDiapers: wet,
      dirtyDiapers: dirty,
      colicCount: colicCount
    };
  });

  const SleepTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const hrs = Math.floor(data.sleepSeconds / 3600);
      const mins = Math.floor((data.sleepSeconds % 3600) / 60);
      return (
        <div className="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">{data.fullDate}</p>
          <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
            {hrs}時 {mins}分 沖涼
          </p>
        </div>
      );
    }
    return null;
  };

  const FeedingTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">{data.fullDate}</p>
          <p className="text-sm font-bold text-pink-600 dark:text-pink-400">
            實際: {data.feedingMl}ml
          </p>
          {data.recommendedMl !== null && (
            <p className="text-sm font-bold text-amber-500 dark:text-amber-400">
              建議: {data.recommendedMl}ml
            </p>
          )}
          {data.recommendedMl !== null && (
            <p className={`text-xs font-semibold mt-1 ${data.feedingMl >= data.recommendedMl ? 'text-emerald-500' : 'text-rose-500'}`}>
              {data.feedingMl >= data.recommendedMl ? `超達 +${data.feedingMl - data.recommendedMl}ml ✅` : `尚缺 ${data.recommendedMl - data.feedingMl}ml`}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const FeedingCountTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">{data.fullDate}</p>
          <p className="text-sm font-bold text-fuchsia-600 dark:text-fuchsia-400">
            餵奶次數: {data.feedingCount}次
          </p>
        </div>
      );
    }
    return null;
  };

  const DiaperTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">{data.fullDate}</p>
          <p className="text-sm font-bold text-sky-500">濕: {data.wetDiapers}次</p>
          <p className="text-sm font-bold text-amber-600">髒: {data.dirtyDiapers}次</p>
        </div>
      );
    }
    return null;
  };

  const ColicTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">{data.fullDate}</p>
          <p className="text-sm font-bold text-rose-500">
            次數: {data.colicCount}次
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 space-y-6 pb-24">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">數據分析</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Feeding Trend Chart */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1">餵奶奶量趨勢 (過去10天)</h3>
          <div className="flex items-center space-x-4 mb-3">
            <span className="flex items-center space-x-1.5 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="inline-block w-6 h-0.5 bg-pink-400 rounded"></span>
              <span>實際奶量</span>
            </span>
            <span className="flex items-center space-x-1.5 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="inline-block w-6 border-t-2 border-dashed border-amber-400"></span>
              <span>建議奶量</span>
            </span>
          </div>
          <div style={{height: 220}}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                <defs>
                  <linearGradient id="colorFeed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={appState.darkMode ? '#334155' : '#f1f5f9'} />
                <XAxis dataKey="fullDate" tickFormatter={(val) => { const item = trendData.find(d => d.fullDate === val); return item ? item.date : val; }} fontSize={12} tickLine={false} axisLine={false} tick={{fill: '#94a3b8'}} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} tick={{fill: '#94a3b8'}} />
                <Tooltip content={<FeedingTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Area 
                  type="monotone" 
                  dataKey="feedingMl" 
                  name="實際奶量"
                  stroke="#ec4899" 
                  fillOpacity={1}
                  fill="url(#colorFeed)"
                  strokeWidth={3}
                  dot={{ fill: '#ec4899', strokeWidth: 2, r: 4, stroke: appState.darkMode ? '#1e293b' : '#fff' }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="recommendedMl"
                  name="建議奶量"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  strokeDasharray="6 3"
                  dot={false}
                  activeDot={{ r: 5, fill: '#f59e0b' }}
                  connectNulls
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Per-day summary */}
          <div className="mt-4 border-t border-slate-100 dark:border-slate-800 pt-3">
            <div className="grid grid-cols-5 gap-1 text-center text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-2 px-1">
              <span>日期</span>
              <span>實際</span>
              <span>建議</span>
              <span>差距</span>
              <span>狀態</span>
            </div>
            <div className="space-y-1">
              {trendData.map((d, i) => {
                const diff = d.recommendedMl !== null ? d.feedingMl - d.recommendedMl : null;
                return (
                  <div key={i} className="grid grid-cols-5 gap-1 text-center text-[11px] px-1 py-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <span className="font-bold text-slate-600 dark:text-slate-300">{d.date}</span>
                    <span className="font-black text-pink-600 dark:text-pink-400">{d.feedingMl > 0 ? `${d.feedingMl}` : <span className="text-slate-300">--</span>}</span>
                    <span className="font-semibold text-amber-500">{d.recommendedMl !== null ? d.recommendedMl : <span className="text-slate-300">--</span>}</span>
                    <span className={`font-bold ${
                      diff === null ? 'text-slate-300' :
                      diff >= 0 ? 'text-emerald-500' : 'text-rose-500'
                    }`}>{diff === null ? '--' : diff >= 0 ? `+${diff}` : `${diff}`}</span>
                    <span>{diff === null ? '' : diff >= 0 ? '✅' : '⚠️'}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Feeding Count Chart */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 h-72">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-4">餵奶次數趨勢 (過去10天)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trendData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={appState.darkMode ? '#334155' : '#f1f5f9'} />
              <XAxis dataKey="fullDate" tickFormatter={(val) => { const item = trendData.find(d => d.fullDate === val); return item ? item.date : val; }} fontSize={12} tickLine={false} axisLine={false} tick={{fill: '#94a3b8'}} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} tick={{fill: '#94a3b8'}} allowDecimals={false} />
              <Tooltip content={<FeedingCountTooltip />} cursor={{fill: 'transparent'}} />
              <Bar dataKey="feedingCount" radius={[6, 6, 0, 0]}>
                {trendData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.feedingCount >= 8 ? '#a855f7' : '#e879f9'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Diaper Trend Chart */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 h-72">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-4">換片次數趨勢 (過去10天)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={appState.darkMode ? '#334155' : '#f1f5f9'} />
              <XAxis dataKey="fullDate" tickFormatter={(val) => { const item = trendData.find(d => d.fullDate === val); return item ? item.date : val; }} fontSize={12} tickLine={false} axisLine={false} tick={{fill: '#94a3b8'}} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} tick={{fill: '#94a3b8'}} />
              <Tooltip content={<DiaperTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Line 
                type="monotone" 
                dataKey="wetDiapers" 
                name="濕片"
                stroke="#0ea5e9" 
                strokeWidth={3}
                dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 4, stroke: appState.darkMode ? '#1e293b' : '#fff' }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="dirtyDiapers" 
                name="髒片"
                stroke="#d97706" 
                strokeWidth={3}
                dot={{ fill: '#d97706', strokeWidth: 2, r: 4, stroke: appState.darkMode ? '#1e293b' : '#fff' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Colic Trend Chart */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 h-72">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-4">Colic 趨勢 (過去10天)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trendData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={appState.darkMode ? '#334155' : '#f1f5f9'} />
              <XAxis dataKey="fullDate" tickFormatter={(val) => { const item = trendData.find(d => d.fullDate === val); return item ? item.date : val; }} fontSize={12} tickLine={false} axisLine={false} tick={{fill: '#94a3b8'}} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} tick={{fill: '#94a3b8'}} />
              <Tooltip content={<ColicTooltip />} cursor={{fill: 'transparent'}} />
              <Bar dataKey="colicCount" fill="#f43f5e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sleep Trend Chart */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 h-72">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-4">沖涼趨勢 (過去10天)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={appState.darkMode ? '#334155' : '#f1f5f9'} />
              <XAxis dataKey="fullDate" tickFormatter={(val) => { const item = trendData.find(d => d.fullDate === val); return item ? item.date : val; }} fontSize={12} tickLine={false} axisLine={false} tick={{fill: '#94a3b8'}} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} tick={{fill: '#94a3b8'}} />
              <Tooltip content={<SleepTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Line 
                type="monotone" 
                dataKey="sleepHours" 
                stroke="#6366f1" 
                strokeWidth={3}
                dot={{ fill: '#6366f1', strokeWidth: 2, r: 4, stroke: appState.darkMode ? '#1e293b' : '#fff' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Gemini AI Section */}
      <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-950/40 dark:to-fuchsia-950/40 p-6 rounded-2xl border border-violet-100 dark:border-violet-900/50">
        <div className="flex items-center space-x-2 mb-4">
           <SparklesIcon className="w-5 h-5 text-violet-600 dark:text-violet-400" />
           <h3 className="text-lg font-bold text-violet-800 dark:text-violet-200">詢問 AI 教練</h3>
        </div>
        
        <p className="text-sm text-violet-700 dark:text-violet-300 mb-4 leading-relaxed">
          讓 AI 為您分析寶寶的作息、洗澡習慣和餵食習慣，提供個人化建議。
        </p>

        {!insight && !loading && (
          <button 
            onClick={handleGetInsight}
            className="w-full py-3 bg-white dark:bg-violet-900/50 text-violet-600 dark:text-violet-200 font-semibold rounded-xl shadow-sm border border-violet-100 dark:border-violet-800 hover:bg-violet-50 dark:hover:bg-violet-900/70 transition-colors"
          >
            分析作息
          </button>
        )}

        {loading && (
          <div className="flex items-center justify-center space-x-2 py-4 text-violet-600 dark:text-violet-400">
            <div className="w-2 h-2 bg-violet-600 dark:bg-violet-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-violet-600 dark:bg-violet-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-violet-600 dark:bg-violet-400 rounded-full animate-bounce delay-200"></div>
          </div>
        )}

        {insight && (
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl text-sm text-slate-700 dark:text-slate-300 leading-relaxed border border-violet-100 dark:border-violet-900/50 animate-fade-in">
             <div className="whitespace-pre-line">{insight}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analysis;