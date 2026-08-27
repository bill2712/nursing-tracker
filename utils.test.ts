import { describe, expect, it } from 'vitest';
import { getGrowthViewMaxAge, getTodayVolumeTotals, getWhoDatasetKey, normalizeMl } from './utils';
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
