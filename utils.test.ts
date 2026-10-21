import { describe, expect, it } from 'vitest';
import { getFoodIntakeTotals, getGrowthViewMaxAge, getTrackerSummary, getFinishedTimerTimes, getTodayFoodIntakeTotals, getTodayVolumeTotals, getWhoDatasetKey, normalizeMl } from './utils';
import type { LogEntry } from './types';

describe('normalizeMl', () => {
  it('accepts and rounds sensible positive amounts', () => {
    expect(normalizeMl('42.6')).toBe(43);
    expect(normalizeMl(120)).toBe(120);
  });

  it('rejects empty, negative, non-numeric, and excessive amounts', () => {
    expect(normalizeMl('')).toBeNull();
    expect(normalizeMl(-1)).toBeNull();
    expect(normalizeMl('abc')).toBeNull();
    expect(normalizeMl(2001)).toBeNull();
  });
});

describe('getTodayVolumeTotals', () => {
  it('totals only valid solid and urine volumes from the local calendar day', () => {
    const now = new Date(2026, 7, 26, 12, 0).getTime();
    const today = new Date(2026, 7, 26, 8, 0).getTime();
    const yesterday = new Date(2026, 7, 25, 23, 59).getTime();
    const logs: LogEntry[] = [
      { id: 'solid-today', type: 'solids', startTime: today, details: { amountMl: 80 } },
      { id: 'urine-today', type: 'diaper', startTime: today, details: { diaperState: 'wet', urineMl: 35 } },
      { id: 'solid-yesterday', type: 'solids', startTime: yesterday, details: { amountMl: 120 } },
      { id: 'invalid-negative', type: 'diaper', startTime: today, details: { diaperState: 'wet', urineMl: -20 } }
    ];

    expect(getTodayVolumeTotals(logs, now)).toEqual({ solidsMl: 80, urineMl: 35 });
  });
});

describe('getFoodIntakeTotals', () => {
  it('adds feeding and solids volumes while ignoring unrelated or invalid amounts', () => {
    const logs: LogEntry[] = [
      { id: 'milk', type: 'feeding', startTime: 1, details: { amountMl: 120 } },
      { id: 'solids', type: 'solids', startTime: 2, details: { amountMl: 65 } },
      { id: 'diaper', type: 'diaper', startTime: 3, details: { diaperState: 'wet', urineMl: 85 } },
      { id: 'invalid', type: 'feeding', startTime: 4, details: { amountMl: -20 } }
    ];

    expect(getFoodIntakeTotals(logs)).toEqual({ feedingMl: 120, solidsMl: 65, totalMl: 185 });
  });

  it('limits the homepage total to records from today up to the current time', () => {
    const now = new Date(2026, 8, 6, 12, 0).getTime();
    const today = new Date(2026, 8, 6, 8, 0).getTime();
    const yesterday = new Date(2026, 8, 5, 23, 59).getTime();
    const tomorrow = new Date(2026, 8, 7, 8, 0).getTime();
    const logs: LogEntry[] = [
      { id: 'milk-today', type: 'feeding', startTime: today, details: { amountMl: 120 } },
      { id: 'solids-today', type: 'solids', startTime: today, details: { amountMl: 65 } },
      { id: 'milk-yesterday', type: 'feeding', startTime: yesterday, details: { amountMl: 90 } },
      { id: 'milk-tomorrow', type: 'feeding', startTime: tomorrow, details: { amountMl: 100 } }
    ];

    expect(getTodayFoodIntakeTotals(logs, now)).toEqual({ feedingMl: 120, solidsMl: 65, totalMl: 185 });
  });
});

describe('getGrowthViewMaxAge', () => {
  it('keeps early measurements zoomed in and expands at predictable age bands', () => {
    expect(getGrowthViewMaxAge(3.8)).toBe(6);
    expect(getGrowthViewMaxAge(4.1)).toBe(12);
    expect(getGrowthViewMaxAge(10.1)).toBe(24);
    expect(getGrowthViewMaxAge(20.1)).toBe(36);
    expect(getGrowthViewMaxAge(30.1)).toBe(60);
  });
});

describe('getWhoDatasetKey', () => {
  it('uses the boys dataset by default and only switches for an explicit girl profile', () => {
    expect(getWhoDatasetKey('boy')).toBe('boys');
    expect(getWhoDatasetKey(undefined)).toBe('boys');
    expect(getWhoDatasetKey('girl')).toBe('girls');
  });
});

describe('getTrackerSummary', () => {
  it('matches the per-metric totals shown on the home screen', () => {
    // Wednesday 2026-08-26 12:00, week starts Monday 2026-08-24
    const now = new Date(2026, 7, 26, 12, 0).getTime();
    const at = (d: number, h: number) => new Date(2026, 7, d, h, 0).getTime();
    const logs: LogEntry[] = [
      { id: 'f1', type: 'feeding', startTime: at(26, 8), endTime: at(26, 8) + 600000, details: { amountMl: 120 } },
      { id: 'f0', type: 'feeding', startTime: at(25, 22), details: { amountMl: 150 } },
      { id: 's1', type: 'solids', startTime: at(26, 9), details: { amountMl: 40 } },
      { id: 'd1', type: 'diaper', startTime: at(26, 10), details: { diaperState: 'mixed', urineMl: 30 } },
      { id: 'd2', type: 'diaper', startTime: at(26, 11), details: { diaperState: 'wet' } },
      { id: 'b1', type: 'sleep', startTime: at(24, 19), details: {} },
      { id: 'b0', type: 'sleep', startTime: at(23, 19), details: {} },
      { id: 'n1', type: 'clear_snot', startTime: at(26, 7), details: {} },
      { id: 'm1', type: 'clean_mouth', startTime: at(25, 7), details: {} }
    ];

    const summary = getTrackerSummary(logs, now);
    expect(summary.lastActivities.feeding?.id).toBe('f1');
    expect(summary.lastActivities.sleep?.id).toBe('b1');
    expect(summary.weeklyBathCount).toBe(1);
    expect(summary.dailyFeedingCount).toBe(1);
    expect(summary.dailyDiaperCounts).toEqual({ wet: 2, dirty: 1, total: 2 });
    expect(summary.dailyVolumeTotals).toEqual(getTodayVolumeTotals(logs, now));
    expect(summary.dailyFoodTotals).toEqual(getTodayFoodIntakeTotals(logs, now));
    expect(summary.dailySnotCount).toBe(1);
    expect(summary.dailyMouthCount).toBe(0);
  });
});

describe('getFinishedTimerTimes', () => {
  const minute = 60_000;
  const start = new Date(2026, 7, 26, 10, 0).getTime();

  it('counts manually added minutes in the saved duration and start time', () => {
    const now = start + 5 * minute;
    const result = getFinishedTimerTimes({ startTime: start, addedDurationMs: 10 * minute }, now);
    expect(result.durationSeconds).toBe(15 * 60);
    expect(result.startTime).toBe(start - 10 * minute);
    expect(result.endTime).toBe(now);
  });

  it('leaves out paused time and ends at the pause when still paused', () => {
    const pauseStartTime = start + 20 * minute;
    const result = getFinishedTimerTimes(
      { startTime: start, ignoredDurationMs: 4 * minute, pauseStartTime, addedDurationMs: 2 * minute },
      start + 60 * minute
    );
    expect(result.endTime).toBe(pauseStartTime);
    expect(result.durationSeconds).toBe((20 - 4 + 2) * 60);
  });
});
