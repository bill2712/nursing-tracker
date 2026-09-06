import React, { useState } from 'react';
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts';
import { eachDayOfInterval, endOfDay, format, isWithinInterval, startOfDay, subDays } from 'date-fns';
import { AppState } from '../types';
import { getFoodIntakeTotals } from '../utils';
import { SparklesIcon } from './Icons';
import { getGeminiInsights } from '../services/geminiService';

interface AnalysisProps {
  appState: AppState;
}

const chartCardClass = 'ui-card chart-card p-4 sm:p-5 rounded-3xl';

const Analysis: React.FC<AnalysisProps> = ({ appState }) => {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const today = new Date();

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

  const trendData = eachDayOfInterval({ start: subDays(today, 9), end: today }).map(day => {
    const logsInDay = appState.logs.filter(log => isWithinInterval(log.startTime, {
      start: startOfDay(day), end: endOfDay(day)
    }));
    const feedingLogs = logsInDay.filter(log => log.type === 'feeding');
    const foodTotals = getFoodIntakeTotals(logsInDay);
    const dailyFeedingMl = foodTotals.feedingMl;
    const dailySleepSeconds = logsInDay
      .filter(log => log.type === 'sleep')
      .reduce((total, log) => total + (log.durationSeconds || 0), 0);
    const solidsLogs = logsInDay.filter(log => log.type === 'solids');
    const solidsMl = foodTotals.solidsMl;
    const urineMl = logsInDay
      .filter(log => log.type === 'diaper')
      .reduce((total, log) => total + (log.details.urineMl || 0), 0);

    let wetDiapers = 0;
    let dirtyDiapers = 0;
    logsInDay.filter(log => log.type === 'diaper').forEach(log => {
      if (log.details.diaperState === 'wet') wetDiapers++;
      if (log.details.diaperState === 'dirty') dirtyDiapers++;
      if (log.details.diaperState === 'mixed') {
        wetDiapers++;
        dirtyDiapers++;
      }
    });

    const totalFoodMl = foodTotals.totalMl;
    const hasFoodLogs = feedingLogs.length > 0 || solidsLogs.length > 0;

    return {
      fullDate: format(day, 'MMM d'),
      shortDate: format(day, 'M/d'),
      feedingMl: dailyFeedingMl,
      feedingMlPlot: feedingLogs.length > 0 ? dailyFeedingMl : null,
      feedingCount: feedingLogs.length,
      totalFoodMl,
      totalFoodMlPlot: hasFoodLogs ? totalFoodMl : null,
      recommendedMl: babyGrowthPlan[format(day, 'MM/dd')] ?? null,
      wetDiapers, dirtyDiapers, solidsMl, urineMl,
      sleepHours: Number((dailySleepSeconds / 3600).toFixed(1)),
      sleepSeconds: dailySleepSeconds
    };
  });

  const todayData = trendData[trendData.length - 1];
  const tickColor = appState.darkMode ? '#94a3b8' : '#64748b';
  const gridColor = appState.darkMode ? '#334155' : '#e2e8f0';
  const xAxisProps = {
    dataKey: 'fullDate', interval: 1,
    tickFormatter: (value: string) => trendData.find(item => item.fullDate === value)?.shortDate || value,
    tick: { fill: tickColor, fontSize: 11, fontWeight: 600 },
    tickLine: false, axisLine: false, tickMargin: 10
  };
  const yAxisProps = {
    width: 42, tick: { fill: tickColor, fontSize: 11, fontWeight: 600 },
    tickLine: false, axisLine: false
  };

  const TotalFoodTooltip = ({ active, payload }: any) => {
    const data = payload?.[0]?.payload;
    if (!active || !data) return null;
    return <ChartTooltip date={data.shortDate} rows={[
      { label: '總食量', value: `${data.totalFoodMl} ml`, color: 'text-emerald-600 dark:text-emerald-400' },
      { label: '奶量', value: `${data.feedingMl} ml`, color: 'text-pink-600 dark:text-pink-400' },
      { label: '副食', value: `${data.solidsMl} ml`, color: 'text-orange-600 dark:text-orange-400' },
      ...(data.recommendedMl === null ? [] : [{ label: '建議', value: `${data.recommendedMl} ml`, color: 'text-amber-600 dark:text-amber-400' }])
    ]} />;
  };

  const FeedingTooltip = ({ active, payload }: any) => {
    const data = payload?.[0]?.payload;
    if (!active || !data) return null;
    return <ChartTooltip date={data.shortDate} rows={[
      { label: '實際', value: `${data.feedingMl} ml`, color: 'text-pink-600' },
      ...(data.recommendedMl === null ? [] : [{ label: '建議', value: `${data.recommendedMl} ml`, color: 'text-amber-600' }])
    ]} />;
  };

  const CountTooltip = ({ active, payload }: any) => {
    const data = payload?.[0]?.payload;
    if (!active || !data) return null;
    return <ChartTooltip date={data.shortDate} rows={[{ label: '餵奶', value: `${data.feedingCount} 次`, color: 'text-violet-600' }]} />;
  };

  const DiaperTooltip = ({ active, payload }: any) => {
    const data = payload?.[0]?.payload;
    if (!active || !data) return null;
    return <ChartTooltip date={data.shortDate} rows={[
      { label: '濕片', value: `${data.wetDiapers} 次`, color: 'text-sky-600' },
      { label: '便便', value: `${data.dirtyDiapers} 次`, color: 'text-amber-600' },
      ...(data.urineMl > 0 ? [{ label: '已量度尿量', value: `${data.urineMl} ml`, color: 'text-cyan-600' }] : [])
    ]} />;
  };

  const VolumeTooltip = ({ active, payload }: any) => {
    const data = payload?.[0]?.payload;
    if (!active || !data) return null;
    return <ChartTooltip date={data.shortDate} rows={[
      { label: '副食', value: `${data.solidsMl} ml`, color: 'text-orange-600' },
      { label: '尿量', value: `${data.urineMl} ml`, color: 'text-cyan-600' }
    ]} />;
  };

  const BathTooltip = ({ active, payload }: any) => {
    const data = payload?.[0]?.payload;
    if (!active || !data) return null;
    const hours = Math.floor(data.sleepSeconds / 3600);
    const minutes = Math.floor((data.sleepSeconds % 3600) / 60);
    return <ChartTooltip date={data.shortDate} rows={[{
      label: '沖涼', value: `${hours > 0 ? `${hours} 小時 ` : ''}${minutes} 分鐘`, color: 'text-indigo-600'
    }]} />;
  };

  return (
    <div className="page-shell space-y-5 p-4 pb-24 sm:p-5 sm:pb-24">
      <header className="page-header">
        <p className="text-xs font-bold tracking-[0.18em] text-pink-500">過去 10 天</p>
        <h1 className="mt-1 text-2xl font-black text-slate-800 dark:text-slate-100">數據分析</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">先看今日重點，再向下比較每日趨勢。</p>
      </header>

      <section aria-label="今日重點" className="grid grid-cols-2 gap-3">
        {[
          { label: '今日奶量', value: todayData.feedingMl, unit: 'ml', secondary: `總食量 ${todayData.totalFoodMl} ml（奶＋副食）`, color: 'text-pink-600', bg: 'bg-pink-50 dark:bg-pink-950/30' },
          { label: '今日餵奶', value: todayData.feedingCount, unit: '次', secondary: null, color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-950/30' },
          { label: '今日副食', value: todayData.solidsMl, unit: 'ml', secondary: null, color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-950/30' },
          { label: '今日尿量', value: todayData.urineMl, unit: 'ml', secondary: null, color: 'text-cyan-600', bg: 'bg-cyan-50 dark:bg-cyan-950/30' }
        ].map(item => (
          <div key={item.label} className={`ui-card ${item.bg} rounded-3xl border border-white/70 p-4 dark:border-white/5`}>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{item.label}</p>
            <p className={`mt-1 text-2xl font-black tabular-nums ${item.color}`}>{item.value}<span className="ml-1 text-xs font-bold">{item.unit}</span></p>
            {item.secondary && <p className="mt-1.5 text-[10px] font-black text-emerald-600 dark:text-emerald-400">{item.secondary}</p>}
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <article className={chartCardClass}>
          <div className="mb-3">
            <h2 className="text-base font-black text-slate-800 dark:text-slate-100">每日食量 <span className="text-xs text-slate-400">(ml)</span></h2>
            <div className="mt-2 flex flex-wrap gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-2"><span className="h-1 w-6 rounded-full bg-emerald-500" />總食量 (奶量+副食)</span>
              <span className="flex items-center gap-2"><span className="w-6 border-t-2 border-dashed border-amber-500" />建議量</span>
            </div>
          </div>
          <div className="h-72" role="img" aria-label="過去十天每日總食量折線圖">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 8, right: 4, bottom: 4, left: 0 }} accessibilityLayer>
                <defs>
                  <linearGradient id="total-food-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 5" vertical={false} stroke={gridColor} />
                <XAxis {...xAxisProps} />
                <YAxis {...yAxisProps} />
                <Tooltip content={<TotalFoodTooltip />} cursor={{ stroke: '#cbd5e1', strokeDasharray: '4 4' }} />
                <Area type="monotone" dataKey="totalFoodMlPlot" stroke="#10b981" fill="url(#total-food-area)" strokeWidth={4} connectNulls dot={{ fill: '#fff', stroke: '#10b981', strokeWidth: 3, r: 5 }} activeDot={{ r: 7 }} />
                <Line type="monotone" dataKey="recommendedMl" stroke="#f59e0b" strokeWidth={3} strokeDasharray="7 5" dot={false} connectNulls />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <details className="group mt-3 border-t border-slate-100 pt-3 dark:border-slate-800">
            <summary className="cursor-pointer list-none rounded-xl py-2 text-center text-sm font-bold text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800">
              查看每日數字 <span aria-hidden="true" className="inline-block transition-transform group-open:rotate-180">⌄</span>
            </summary>
            <div className="mt-2 overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="grid grid-cols-4 bg-slate-50 px-3 py-2 text-center text-[11px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                <span>日期</span><span>總食量</span><span>建議</span><span>差距</span>
              </div>
              {trendData.map(item => {
                const difference = item.recommendedMl === null ? null : item.totalFoodMl - item.recommendedMl;
                return (
                  <div key={item.fullDate} className="grid grid-cols-4 border-t border-slate-100 px-3 py-2 text-center text-xs font-semibold dark:border-slate-800">
                    <span className="text-slate-600 dark:text-slate-300">{item.shortDate}</span>
                    <span className="text-emerald-600 dark:text-emerald-400">{item.totalFoodMl || '—'}</span>
                    <span className="text-amber-600">{item.recommendedMl ?? '—'}</span>
                    <span className={difference === null ? 'text-slate-400' : difference >= 0 ? 'text-emerald-600' : 'text-rose-600'}>{difference === null ? '—' : difference > 0 ? `+${difference}` : difference}</span>
                  </div>
                );
              })}
            </div>
          </details>
        </article>

        <article className={chartCardClass}>
          <div className="mb-3">
            <h2 className="text-base font-black text-slate-800 dark:text-slate-100">每日奶量 <span className="text-xs text-slate-400">(ml)</span></h2>
            <div className="mt-2 flex flex-wrap gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-2"><span className="h-1 w-6 rounded-full bg-pink-500" />實際奶量</span>
              <span className="flex items-center gap-2"><span className="w-6 border-t-2 border-dashed border-amber-500" />建議奶量</span>
            </div>
          </div>
          <div className="h-72" role="img" aria-label="過去十天每日餵奶奶量折線圖">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 8, right: 4, bottom: 4, left: 0 }} accessibilityLayer>
                <defs>
                  <linearGradient id="feeding-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 5" vertical={false} stroke={gridColor} />
                <XAxis {...xAxisProps} />
                <YAxis {...yAxisProps} />
                <Tooltip content={<FeedingTooltip />} cursor={{ stroke: '#cbd5e1', strokeDasharray: '4 4' }} />
                <Area type="monotone" dataKey="feedingMlPlot" stroke="#ec4899" fill="url(#feeding-area)" strokeWidth={4} connectNulls dot={{ fill: '#fff', stroke: '#ec4899', strokeWidth: 3, r: 5 }} activeDot={{ r: 7 }} />
                <Line type="monotone" dataKey="recommendedMl" stroke="#f59e0b" strokeWidth={3} strokeDasharray="7 5" dot={false} connectNulls />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <details className="group mt-3 border-t border-slate-100 pt-3 dark:border-slate-800">
            <summary className="cursor-pointer list-none rounded-xl py-2 text-center text-sm font-bold text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800">
              查看每日數字 <span aria-hidden="true" className="inline-block transition-transform group-open:rotate-180">⌄</span>
            </summary>
            <div className="mt-2 overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="grid grid-cols-4 bg-slate-50 px-3 py-2 text-center text-[11px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                <span>日期</span><span>實際</span><span>建議</span><span>差距</span>
              </div>
              {trendData.map(item => {
                const difference = item.recommendedMl === null ? null : item.feedingMl - item.recommendedMl;
                return (
                  <div key={item.fullDate} className="grid grid-cols-4 border-t border-slate-100 px-3 py-2 text-center text-xs font-semibold dark:border-slate-800">
                    <span className="text-slate-600 dark:text-slate-300">{item.shortDate}</span>
                    <span className="text-pink-600">{item.feedingMl || '—'}</span>
                    <span className="text-amber-600">{item.recommendedMl ?? '—'}</span>
                    <span className={difference === null ? 'text-slate-400' : difference >= 0 ? 'text-emerald-600' : 'text-rose-600'}>{difference === null ? '—' : difference > 0 ? `+${difference}` : difference}</span>
                  </div>
                );
              })}
            </div>
          </details>
        </article>

        <article className={chartCardClass}>
          <h2 className="mb-3 text-base font-black text-slate-800 dark:text-slate-100">每日餵奶次數</h2>
          <div className="h-64" role="img" aria-label="過去十天每日餵奶次數柱狀圖">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData} margin={{ top: 8, right: 4, bottom: 4, left: 0 }} accessibilityLayer>
                <CartesianGrid strokeDasharray="4 5" vertical={false} stroke={gridColor} />
                <XAxis {...xAxisProps} />
                <YAxis {...yAxisProps} allowDecimals={false} />
                <Tooltip content={<CountTooltip />} cursor={{ fill: appState.darkMode ? '#1e293b' : '#f8fafc' }} />
                <Bar dataKey="feedingCount" radius={[8, 8, 2, 2]} maxBarSize={24}>
                  {trendData.map((item, index) => <Cell key={item.fullDate} fill={index === trendData.length - 1 ? '#7c3aed' : '#c084fc'} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className={chartCardClass}>
          <div className="mb-3 flex items-start justify-between gap-3">
            <h2 className="text-base font-black text-slate-800 dark:text-slate-100">每日換片</h2>
            <div className="flex gap-3 text-xs font-bold"><span className="text-sky-600">● 濕片</span><span className="text-amber-600">● 便便</span></div>
          </div>
          <div className="h-64" role="img" aria-label="過去十天濕片及便便次數折線圖">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 8, right: 4, bottom: 4, left: 0 }} accessibilityLayer>
                <CartesianGrid strokeDasharray="4 5" vertical={false} stroke={gridColor} />
                <XAxis {...xAxisProps} />
                <YAxis {...yAxisProps} allowDecimals={false} />
                <Tooltip content={<DiaperTooltip />} />
                <Line type="monotone" dataKey="wetDiapers" stroke="#0284c7" strokeWidth={4} dot={{ fill: '#fff', stroke: '#0284c7', strokeWidth: 3, r: 5 }} activeDot={{ r: 7 }} />
                <Line type="monotone" dataKey="dirtyDiapers" stroke="#d97706" strokeWidth={4} dot={{ fill: '#fff', stroke: '#d97706', strokeWidth: 3, r: 5 }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className={chartCardClass}>
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <h2 className="text-base font-black text-slate-800 dark:text-slate-100">副食與尿量 <span className="text-xs text-slate-400">(ml)</span></h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">只計已輸入 ml 的紀錄</p>
            </div>
            <div className="flex flex-col items-end gap-1 text-xs font-bold"><span className="text-orange-600">● 副食</span><span className="text-cyan-600">● 尿量</span></div>
          </div>
          <div className="h-64" role="img" aria-label="過去十天副食及尿量柱狀圖">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData} margin={{ top: 8, right: 4, bottom: 4, left: 0 }} barGap={2} accessibilityLayer>
                <CartesianGrid strokeDasharray="4 5" vertical={false} stroke={gridColor} />
                <XAxis {...xAxisProps} />
                <YAxis {...yAxisProps} />
                <Tooltip content={<VolumeTooltip />} cursor={{ fill: appState.darkMode ? '#1e293b' : '#f8fafc' }} />
                <Bar dataKey="solidsMl" fill="#f97316" radius={[7, 7, 2, 2]} maxBarSize={18} />
                <Bar dataKey="urineMl" fill="#06b6d4" radius={[7, 7, 2, 2]} maxBarSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className={chartCardClass}>
          <h2 className="mb-3 text-base font-black text-slate-800 dark:text-slate-100">每日沖涼時間 <span className="text-xs text-slate-400">(小時)</span></h2>
          <div className="h-64" role="img" aria-label="過去十天每日沖涼時數折線圖">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 8, right: 4, bottom: 4, left: 0 }} accessibilityLayer>
                <CartesianGrid strokeDasharray="4 5" vertical={false} stroke={gridColor} />
                <XAxis {...xAxisProps} />
                <YAxis {...yAxisProps} />
                <Tooltip content={<BathTooltip />} />
                <Line type="monotone" dataKey="sleepHours" stroke="#4f46e5" strokeWidth={4} dot={{ fill: '#fff', stroke: '#4f46e5', strokeWidth: 3, r: 5 }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </article>
      </section>

      <section className="ui-card rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 to-fuchsia-50 p-5 dark:border-violet-900/50 dark:from-violet-950/40 dark:to-fuchsia-950/40">
        <div className="mb-3 flex items-center gap-2">
          <SparklesIcon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
          <h2 className="text-lg font-black text-violet-800 dark:text-violet-200">詢問 AI 教練</h2>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-violet-700 dark:text-violet-300">分析寶寶的作息、沖涼與餵食習慣，提供個人化建議。</p>
        {!insight && !loading && <button onClick={handleGetInsight} className="w-full rounded-xl border border-violet-100 bg-white py-3 font-bold text-violet-600 shadow-sm transition-colors hover:bg-violet-50 dark:border-violet-800 dark:bg-violet-900/50 dark:text-violet-200">分析作息</button>}
        {loading && <div className="py-4 text-center text-sm font-bold text-violet-600">分析中…</div>}
        {insight && <div className="animate-fade-in whitespace-pre-line rounded-xl border border-violet-100 bg-white p-4 text-sm leading-relaxed text-slate-700 dark:border-violet-900/50 dark:bg-slate-900 dark:text-slate-300">{insight}</div>}
      </section>
    </div>
  );
};

const ChartTooltip = ({ date, rows }: { date: string; rows: Array<{ label: string; value: string; color: string }> }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-3 text-sm shadow-xl dark:border-slate-700 dark:bg-slate-800">
    <p className="mb-1 font-bold text-slate-700 dark:text-slate-200">{date}</p>
    {rows.map(row => <p key={row.label} className={`font-bold ${row.color}`}>{row.label} {row.value}</p>)}
  </div>
);

export default Analysis;
