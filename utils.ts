import { format, differenceInMinutes } from 'date-fns';
import { LogEntry } from './types';

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
};

export const formatDuration = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  
  if (h > 0) {
    return `${h}h ${m}m ${s}s`;
  }
  return `${m}m ${s}s`;
};

export const formatTimer = (totalSeconds: number): string => {
  const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const s = (totalSeconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
};

export const formatTimeAgo = (timestamp: number): string => {
  const mins = differenceInMinutes(Date.now(), timestamp);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  return `${hours}h ${remainingMins}m ago`;
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
};

export const exportToCSV = (logs: LogEntry[], columns?: ExportColumn[]) => {
  // Default columns if not provided
  const defCols: ExportColumn[] = [
    { key: 'id', label: 'ID', enabled: true, value: (l) => l.id },
    { key: 'type', label: 'Type', enabled: true, value: (l) => l.type },
    { key: 'start', label: 'Start Time', enabled: true, value: (l) => format(new Date(l.startTime), 'yyyy-MM-dd HH:mm:ss') },
    { key: 'end', label: 'End Time', enabled: true, value: (l) => l.endTime ? format(new Date(l.endTime), 'yyyy-MM-dd HH:mm:ss') : '' },
    { key: 'duration', label: 'Duration (s)', enabled: true, value: (l) => (l.durationSeconds || 0).toString() },
    { key: 'details', label: 'Details', enabled: true, value: (l) => {
        let det = [];
        if (l.details.feedingType) det.push(l.details.feedingType);
        if (l.details.side) det.push(l.details.side);
        if (l.details.amountMl) det.push(`${l.details.amountMl}ml`);
        if (l.details.diaperState) det.push(l.details.diaperState);
        return det.join('; ');
    }},
    { key: 'notes', label: 'Notes', enabled: true, value: (l) => `"${(l.details.notes || '').replace(/"/g, '""')}"` }
  ];

  const colsToUse = columns || defCols;
  const activeCols = colsToUse.filter(c => c.enabled);

  const headers = activeCols.map(c => c.label).join(',');
  const rows = logs.map(log => {
    return activeCols.map(c => c.value(log)).join(',');
  });

  const csvContent = [headers, ...rows].join('\n');
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