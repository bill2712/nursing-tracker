export type ActivityType = 'feeding' | 'sleep' | 'diaper' | 'pumping' | 'solids';

export type FeedingType = 'nursing' | 'bottle';
export type FeedingSide = 'left' | 'right' | 'both';

export type MeasurementUnit = 'cm' | 'in' | 'kg' | 'lb';

export interface GrowthEntry {
  id: string;
  date: number; // timestamp
  weight?: number; // always stored in kg
  length?: number; // always stored in cm
  headCircumference?: number; // always stored in cm
  notes?: string;
}

export interface BabyProfile {
  name: string;
  gender: 'boy' | 'girl';
  birthDate: number; // timestamp
  weightUnit: 'kg' | 'lb';
  lengthUnit: 'cm' | 'in';
}

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
    foods?: string[];
    reaction?: string;
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

export interface Vaccine {
  id: string;
  name: string;
  ageMonths: number; // 0 for birth
  completed: boolean;
  date?: number;
  notes?: string;
}

export interface Milestone {
  id: string;
  category: 'motor' | 'language' | 'cognitive' | 'social';
  description: string;
  ageMonths: number;
  completed: boolean;
  date?: number;
}

export interface MilkStashEntry {
  id: string;
  date: number; // pumped date
  amountMl: number;
  notes?: string;
  isFrozen: boolean;
}

export interface AppState {
  logs: LogEntry[];
  activeTimer: ActiveTimer | null;
  reminders: ReminderConfig;
  sleepGoal: SleepGoal;
  darkMode: boolean;
  growth: GrowthEntry[];
  babyProfile: BabyProfile;
  health: {
    vaccines: Vaccine[];
    milestones: Milestone[];
  };
  milkStash: MilkStashEntry[];
}

export interface TimerDisplayProps {
  startTime: number;
}