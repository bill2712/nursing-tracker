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

    return {
      date: format(day, 'EEE'), // Mon, Tue...
      fullDate: format(day, 'MMM d'),
      sleepHours: parseFloat((dailySleepSeconds / 3600).toFixed(1)),
      sleepSeconds: dailySleepSeconds,
      feedingMl: dailyFeedingMl,
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
            總共: {data.feedingMl}ml
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
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 h-72">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-4">餵奶奶量趨勢 (過去10天)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
              <defs>
                <linearGradient id="colorFeed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={appState.darkMode ? '#334155' : '#f1f5f9'} />
              <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} tick={{fill: '#94a3b8'}} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} tick={{fill: '#94a3b8'}} />
              <Tooltip content={<FeedingTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Area 
                type="monotone" 
                dataKey="feedingMl" 
                stroke="#ec4899" 
                fillOpacity={1}
                fill="url(#colorFeed)"
                strokeWidth={3}
                dot={{ fill: '#ec4899', strokeWidth: 2, r: 4, stroke: appState.darkMode ? '#1e293b' : '#fff' }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Diaper Trend Chart */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 h-72">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-4">換片次數趨勢 (過去10天)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={appState.darkMode ? '#334155' : '#f1f5f9'} />
              <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} tick={{fill: '#94a3b8'}} />
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
              <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} tick={{fill: '#94a3b8'}} />
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
              <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} tick={{fill: '#94a3b8'}} />
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