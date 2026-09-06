import { format, differenceInMinutes, differenceInCalendarDays, startOfDay } from 'date-fns';
import { LogEntry } from './types';

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
};

export const formatDuration = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  
  if (h > 0) {
    return `${h}時 ${m}分 ${s}秒`;
  }
  return `${m}分 ${s}秒`;
};

export const formatTimer = (totalSeconds: number): string => {
  const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const s = (totalSeconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
};

export const formatTimeAgo = (timestamp: number): string => {
  const now = Date.now();
  const calendarDaysDiff = differenceInCalendarDays(now, timestamp);

  if (calendarDaysDiff > 0) {
    return `${calendarDaysDiff}天前`;
  }

  const mins = Math.max(0, differenceInMinutes(now, timestamp));
  if (mins < 1) return '剛剛';
  if (mins < 60) return `${mins}分鐘前`;
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  
  return `${hours}小時 ${remainingMins}分鐘前`;
};

export const formatTimeAgoAbsolute = (timestamp: number): string => {
  const now = Date.now();
  const mins = Math.max(0, differenceInMinutes(now, timestamp));
  
  if (mins < 1) return '剛剛';
  if (mins < 60) return `${mins}分鐘前`;
  
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  
  return `${hours}小時 ${remainingMins}分鐘前`;
};

export const normalizeMl = (value: unknown, max = 2000): number | null => {
  const amount = typeof value === 'string' && value.trim() === '' ? NaN : Number(value);
  if (!Number.isFinite(amount) || amount <= 0 || amount > max) return null;
  return Math.round(amount);
};

export const getTodayVolumeTotals = (logs: LogEntry[], now: number = Date.now()) => {
  const dayStart = startOfDay(now).getTime();
  return logs.reduce((totals, log) => {
    if (log.startTime < dayStart || log.startTime > now) return totals;
    if (log.type === 'solids') totals.solidsMl += normalizeMl(log.details.amountMl) || 0;
    if (log.type === 'diaper') totals.urineMl += normalizeMl(log.details.urineMl) || 0;
    return totals;
  }, { solidsMl: 0, urineMl: 0 });
};

export const getFoodIntakeTotals = (logs: LogEntry[]) => {
  const totals = logs.reduce((result, log) => {
    const amountMl = normalizeMl(log.details.amountMl) || 0;
    if (log.type === 'feeding') result.feedingMl += amountMl;
    if (log.type === 'solids') result.solidsMl += amountMl;
    return result;
  }, { feedingMl: 0, solidsMl: 0 });

  return { ...totals, totalMl: totals.feedingMl + totals.solidsMl };
};

export interface ExportColumn {
  key: string;
  label: string;
  enabled: boolean;
  value: (log: LogEntry) => string;
}

export const downloadFile = (content: string, filename: string, type: string) => {
  const blob = new Blob([content], { type: `${type};charset=utf-8;` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportToCSV = (logs: LogEntry[], columns?: ExportColumn[]) => {
  // Default columns if not provided
  const defCols: ExportColumn[] = [
    { key: 'id', label: 'ID', enabled: true, value: (l) => l.id },
    { key: 'type', label: '類型', enabled: true, value: (l) => {
        const map: Record<string, string> = { feeding: '餵奶', sleep: '睡眠', diaper: '換片', pumping: '擠奶', solids: '副食品', colic: 'Colic', clear_snot: '清鼻涕', clean_mouth: '清潔口腔' };
        return map[l.type] || l.type;
    }},
    { key: 'start', label: '開始時間', enabled: true, value: (l) => format(new Date(l.startTime), 'yyyy-MM-dd HH:mm:ss') },
    { key: 'end', label: '結束時間', enabled: true, value: (l) => l.endTime ? format(new Date(l.endTime), 'yyyy-MM-dd HH:mm:ss') : '' },
    { key: 'duration', label: '持續時間 (秒)', enabled: true, value: (l) => (l.durationSeconds || 0).toString() },
    { key: 'details', label: '詳情', enabled: true, value: (l) => {
        let det = [];
        if (l.details.feedingType) det.push(l.details.feedingType === 'nursing' ? '親餵' : (l.details.feedingType === 'bottle' ? '瓶餵' : l.details.feedingType));
        if (l.details.side) det.push(l.details.side === 'left' ? '左' : (l.details.side === 'right' ? '右' : (l.details.side === 'both' ? '雙邊' : l.details.side)));
        if (l.details.amountMl) det.push(`${l.details.amountMl}ml`);
        if (l.details.diaperState) det.push(l.details.diaperState === 'wet' ? '濕' : (l.details.diaperState === 'dirty' ? '髒' : (l.details.diaperState === 'mixed' ? '混合' : l.details.diaperState)));
        if (l.details.urineMl) det.push(`尿量 ${l.details.urineMl}ml`);
        return det.join('; ');
    }},
    { key: 'notes', label: '備註', enabled: true, value: (l) => l.details.notes || '' }
  ];

  const colsToUse = columns || defCols;
  const activeCols = colsToUse.filter(c => c.enabled);

  const escapeCsvValue = (value: string) => {
    if (!/[",\n\r]/.test(value)) return value;
    return `"${value.replace(/"/g, '""')}"`;
  };

  const headers = activeCols.map(c => escapeCsvValue(c.label)).join(',');
  const rows = logs.map(log => {
    return activeCols.map(c => escapeCsvValue(c.value(log))).join(',');
  });

  const csvContent = `\uFEFF${[headers, ...rows].join('\r\n')}`;
  downloadFile(csvContent, `nurturetrack_export_${format(new Date(), 'yyyyMMdd')}.csv`, 'text/csv');
};

// Unit Conversions
export const kgToLb = (kg: number): number => kg * 2.20462;
export const lbToKg = (lb: number): number => lb / 2.20462;
export const cmToIn = (cm: number): number => cm / 2.54;
export const inToCm = (inches: number): number => inches * 2.54;

export const formatWeight = (kg: number, unit: 'kg' | 'lb'): string => {
  if (unit === 'kg') return `${kg.toFixed(2)}kg`;
  return `${kgToLb(kg).toFixed(2)}lb`;
};

export const formatLength = (cm: number, unit: 'cm' | 'in'): string => {
  if (unit === 'cm') return `${cm.toFixed(1)}cm`;
  return `${cmToIn(cm).toFixed(1)}in`;
};

export const getAgeInMonths = (birthDate: number, targetDate: number = Date.now()): number => {
    // Precise calculation including partial months for smoother plotting
    const diff = targetDate - birthDate;
    const days = diff / (1000 * 60 * 60 * 24);
    return days / 30.437; // Average days per month
};

export const getGrowthViewMaxAge = (maxUserAge: number): 6 | 12 | 24 | 36 | 60 => {
  if (maxUserAge > 30) return 60;
  if (maxUserAge > 20) return 36;
  if (maxUserAge > 10) return 24;
  if (maxUserAge > 4) return 12;
  return 6;
};

export const getWhoDatasetKey = (gender: 'boy' | 'girl' | undefined): 'boys' | 'girls' => {
  return gender === 'girl' ? 'girls' : 'boys';
};

// Error function approximation
function erf(x: number): number {
    const sign = (x >= 0) ? 1 : -1;
    x = Math.abs(x);
    const a1 =  0.254829592;
    const a2 = -0.284496736;
    const a3 =  1.421413741;
    const a4 = -1.453152027;
    const a5 =  1.061405429;
    const p  =  0.3275911;
    const t = 1.0/(1.0 + p*x);
    const y = 1.0 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*Math.exp(-x*x);
    return sign * y;
}

// Calculate percentile based on L, M, S
export const calculatePercentile = (val: number, L: number | undefined, M: number | undefined, S: number | undefined): number | null => {
    if (L === undefined || M === undefined || S === undefined) return null;
    let Z;
    if (L === 0) {
        Z = Math.log(val / M) / S;
    } else {
        Z = (Math.pow(val / M, L) - 1) / (L * S);
    }
    // cumulative normal distribution
    const cdf = (1.0 + erf(Z / Math.sqrt(2.0))) / 2.0;
    return cdf * 100;
};
