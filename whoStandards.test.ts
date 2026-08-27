import { describe, expect, it } from 'vitest';
import { WHO_STANDARDS } from './components/WHOStandards';
import { calculatePercentile } from './utils';

describe('WHO boys weight-for-age standard', () => {
  it('matches the WHO boys reference values at 6 months', () => {
    const sixMonths = WHO_STANDARDS.weightForAge.boys.find(point => point.month === 6);

    expect(sixMonths).toMatchObject({ p3: 6.4, p50: 7.9, p97: 9.7 });
    expect(calculatePercentile(6.5, sixMonths?.L, sixMonths?.M, sixMonths?.S)).toBeCloseTo(3.6, 1);
  });
});
