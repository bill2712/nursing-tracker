export type ActivityType = 'feeding' | 'sleep' | 'diaper';

export type FeedingType = 'nursing' | 'bottle';
export type FeedingSide = 'left' | 'right' | 'both';

export interface LogEntry {
  id: string;
  type: ActivityType;
  startTime: number;
  endTime?: number; // If null, it's a point-in-time event (like diaper) or currently running
  durationSeconds?: number;
  details: {
    feedingType?: FeedingType;
    side?: FeedingSide;
    amountMl?: number;
    diaperState?: 'wet' | 'dirty' | 'mixed';
    notes?: string;
  };
}

export interface ReminderConfig {
  enabled: boolean;
  feeding: number; // minutes, 0 disabled
  sleep: number; // minutes
  diaper: number; // minutes
  lastNotified: Record<string, number>; // timestamp of last notification
}

export interface ActiveTimer {
  type: ActivityType;
  startTime: number;
  details: LogEntry['details'];
  pauseStartTime?: number; // If set, the timer is currently paused starting at this timestamp
  snoozeEndTime?: number; // If set, the timer is paused and will auto-resume at this timestamp
  ignoredDurationMs?: number; // Accumulated duration in ms that should be subtracted from total time
}

export interface SleepGoal {
  hours: number;
  minutes: number;
}

export interface AppState {
  logs: LogEntry[];
  activeTimer: ActiveTimer | null;
  reminders: ReminderConfig;
  sleepGoal: SleepGoal;
  darkMode: boolean;
}

export interface TimerDisplayProps {
  startTime: number;
}