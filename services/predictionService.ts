import { LogEntry } from '../types';
import { differenceInMinutes, subDays, isSameDay } from 'date-fns';

export const calculateWakeWindows = (logs: LogEntry[], daysToAnalyze = 3): number[] => {
  // 1. Filter sleep logs for the last N days
  const now = Date.now();
  const startDate = subDays(now, daysToAnalyze).getTime();
  
  const sleepLogs = logs
    .filter(l => l.type === 'sleep' && l.endTime && l.startTime >= startDate)
    .sort((a, b) => a.startTime - b.startTime);

  if (sleepLogs.length < 2) return [];

  const wakeWindows: number[] = [];

  // 2. Calculate time between sleep sessions (end of previous -> start of next)
  for (let i = 0; i < sleepLogs.length - 1; i++) {
    const previousSleep = sleepLogs[i];
    const nextSleep = sleepLogs[i + 1];

    if (previousSleep.endTime && nextSleep.startTime) {
      // Basic sanity check: wake window should be reasonable (e.g., < 12 hours)
      // If it's huge, it might be overnight sleep or missed logs, but for now we include it 
      // unless it's suspiciously long (like they forgot to log a nap).
      // Let's assume max reasonable wake window is 6 hours for a baby.
      const diffMinutes = differenceInMinutes(nextSleep.startTime, previousSleep.endTime);
      
      if (diffMinutes > 30 && diffMinutes < 360) {
        wakeWindows.push(diffMinutes);
      }
    }
  }

  return wakeWindows;
};

export const getAverageWakeWindow = (logs: LogEntry[]): number => {
  const windows = calculateWakeWindows(logs);
  if (windows.length === 0) return 0;
  
  const sum = windows.reduce((acc, curr) => acc + curr, 0);
  return Math.round(sum / windows.length);
};

export const predictNextNap = (logs: LogEntry[], averageWakeWindowMinutes: number): { time: number | null, reason: string } => {
  if (averageWakeWindowMinutes === 0) return { time: null, reason: 'Not enough data' };

  // Find the last sleep session
  const lastSleep = logs
    .filter(l => l.type === 'sleep' && l.endTime)
    .sort((a, b) => b.endTime! - a.endTime!)[0];

  if (!lastSleep || !lastSleep.endTime) {
    return { time: null, reason: 'No recent sleep recorded' };
  }

  // Next nap = Last sleep end + Average Wake Window
  const nextNapTime = lastSleep.endTime + (averageWakeWindowMinutes * 60 * 1000);
  
  return { 
    time: nextNapTime, 
    reason: `Based on avg wake window of ${Math.floor(averageWakeWindowMinutes/60)}h ${averageWakeWindowMinutes%60}m` 
  };
};
