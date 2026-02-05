import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { AppState } from '../types';
import { SparklesIcon } from './Icons';
import { getGeminiInsights } from '../services/geminiService';
import { format, startOfDay, endOfDay, isWithinInterval, subDays, eachDayOfInterval } from 'date-fns';

interface AnalysisProps {
  appState: AppState;
}

const Analysis: React.FC<AnalysisProps> = ({ appState }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Simple daily stats calculation
  const today = new Date();
  const todaysLogs = appState.logs.filter(log => 
    isWithinInterval(log.startTime, { start: startOfDay(today), end: endOfDay(today) })
  );

  const sleepTotal = todaysLogs
    .filter(l => l.type === 'sleep')
    .reduce((acc, curr) => acc + (curr.durationSeconds || 0), 0);

  const feedsTotal = todaysLogs.filter(l => l.type === 'feeding').length;
  const diaperTotal = todaysLogs.filter(l => l.type === 'diaper').length;

  // Calculate Goal Progress
  const sleepTotalHours = sleepTotal / 3600;
  const goalTotalHours = (appState.sleepGoal.hours || 0) + (appState.sleepGoal.minutes || 0) / 60;
  const sleepProgress = goalTotalHours > 0 ? Math.min(100, (sleepTotalHours / goalTotalHours) * 100) : 0;

  const handleGetInsight = async () => {
    setLoading(true);
    const text = await getGeminiInsights(appState.logs);
    setInsight(text);
    setLoading(false);
  };

  // Daily Activity Chart (Today)
  const chartData = [
    { name: 'Feed', value: feedsTotal, color: '#ec4899' },
    { name: 'Sleep (hrs)', value: Math.round(sleepTotalHours), color: '#6366f1' },
    { name: 'Diaper', value: diaperTotal, color: '#10b981' },
  ];

  // Sleep Trend Chart (Last 7 Days)
  const last7Days = eachDayOfInterval({
    start: subDays(today, 6),
    end: today
  });

  const sleepTrendData = last7Days.map(day => {
    const dayStart = startOfDay(day);
    const dayEnd = endOfDay(day);
    
    // Find sleep logs that started on this day
    const dailySleepSeconds = appState.logs
      .filter(l => l.type === 'sleep' && isWithinInterval(l.startTime, { start: dayStart, end: dayEnd }))
      .reduce((acc, curr) => acc + (curr.durationSeconds || 0), 0);

    return {
      date: format(day, 'EEE'), // Mon, Tue...
      fullDate: format(day, 'MMM d'),
      hours: parseFloat((dailySleepSeconds / 3600).toFixed(1)),
      seconds: dailySleepSeconds
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const hrs = Math.floor(data.seconds / 3600);
      const mins = Math.floor((data.seconds % 3600) / 60);
      
      return (
        <div className="bg-white dark:bg-slate-800 p-3 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">{data.fullDate}</p>
          <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
            {hrs}h {mins}m Sleep
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 space-y-6 pb-24">
      <header>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Insights</h1>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 text-center">
          <div className="text-2xl font-bold text-pink-500">{feedsTotal}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Feeds</div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 text-center flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-indigo-500">{sleepTotalHours.toFixed(1)}h</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Sleep</div>
          {/* Goal Indicator */}
          <div className="w-full mt-2 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
             <div className="h-full bg-indigo-500" style={{ width: `${sleepProgress}%` }}></div>
          </div>
          <div className="text-[9px] text-slate-400 mt-1">Goal: {goalTotalHours.toFixed(1)}h</div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 text-center">
          <div className="text-2xl font-bold text-emerald-500">{diaperTotal}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Changes</div>
        </div>
      </div>

      {/* Sleep Trend Chart */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 h-72">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-4">Sleep Trend (Last 7 Days)</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sleepTrendData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={appState.darkMode ? '#334155' : '#f1f5f9'} />
            <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} tick={{fill: '#94a3b8'}} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} tick={{fill: '#94a3b8'}} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Line 
              type="monotone" 
              dataKey="hours" 
              stroke="#6366f1" 
              strokeWidth={3}
              dot={{ fill: '#6366f1', strokeWidth: 2, r: 4, stroke: appState.darkMode ? '#1e293b' : '#fff' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Basic Activity Chart */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 h-64">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-4">Today's Activity Breakdown</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} tick={{fill: '#94a3b8'}} />
            <YAxis hide />
            <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', backgroundColor: appState.darkMode ? '#1e293b' : '#fff', borderColor: appState.darkMode ? '#334155' : '#f1f5f9', color: appState.darkMode ? '#fff' : '#000' }} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gemini AI Section */}
      <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-950/40 dark:to-fuchsia-950/40 p-6 rounded-2xl border border-violet-100 dark:border-violet-900/50">
        <div className="flex items-center space-x-2 mb-4">
           <SparklesIcon className="w-5 h-5 text-violet-600 dark:text-violet-400" />
           <h3 className="text-lg font-bold text-violet-800 dark:text-violet-200">Ask AI Coach</h3>
        </div>
        
        <p className="text-sm text-violet-700 dark:text-violet-300 mb-4 leading-relaxed">
          Get a personalized analysis of your baby's schedule, sleep patterns, and feeding habits from our AI.
        </p>

        {!insight && !loading && (
          <button 
            onClick={handleGetInsight}
            className="w-full py-3 bg-white dark:bg-violet-900/50 text-violet-600 dark:text-violet-200 font-semibold rounded-xl shadow-sm border border-violet-100 dark:border-violet-800 hover:bg-violet-50 dark:hover:bg-violet-900/70 transition-colors"
          >
            Analyze Schedule
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