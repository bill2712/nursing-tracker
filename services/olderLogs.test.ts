import { describe, it, expect, vi, beforeEach } from 'vitest';

// Fake Firestore: a list of logs, queried by startTime range.
const DAY = 86400000;
const store: { id: string; startTime: number }[] = [];
const calls: string[] = [];
vi.mock('./firebase', () => ({ db: {} }));
vi.mock('firebase/firestore', () => ({
  collection: () => ({}),
  orderBy: () => ({ kind: 'order' }),
  limit: (n: number) => ({ kind: 'limit', n }),
  where: (_f: string, op: string, v: number) => ({ kind: 'where', op, v }),
  query: (_c: unknown, ...parts: any[]) => parts,
  getDocs: async (parts: any[]) => {
    let rows = store.slice();
    parts.filter(p => p.kind === 'where').forEach(p => { rows = rows.filter(r => (p.op === '>=' ? r.startTime >= p.v : r.startTime < p.v)); });
    rows.sort((a, b) => b.startTime - a.startTime);
    const lim = parts.find(p => p.kind === 'limit');
    if (lim) rows = rows.slice(0, lim.n);
    calls.push(parts.map(p => p.kind + (p.op || '')).join(','));
    return { empty: rows.length === 0, docs: rows.map(r => ({ id: r.id, data: () => ({ type: 'feeding', details: {}, startTime: r.startTime }) })) };
  },
}));

describe('olderLogs', () => {
  beforeEach(() => { vi.resetModules(); store.length = 0; calls.length = 0; });

  it('loads older logs page by page and stops when none are left', async () => {
    const m = await import('./olderLogs');
    for (let d = 1; d <= 25; d++) store.push({ id: 'o' + d, startTime: m.RECENT_CUTOFF - d * DAY + 1000 });
    expect(m.getOlderState().logs.length).toBe(0);
    await m.loadOlder();
    const first = m.getOlderState();
    expect(first.logs.length).toBe(10);
    expect(first.hasMore).toBe(true);
    await m.loadOlder();
    await m.loadOlder();
    const done = m.getOlderState();
    expect(done.logs.length).toBe(25);
    expect(done.hasMore).toBe(false);
  });

  it('loads back to a chosen date and can load everything for export', async () => {
    const m = await import('./olderLogs');
    for (let d = 1; d <= 40; d++) store.push({ id: 'o' + d, startTime: m.RECENT_CUTOFF - d * DAY + 1000 });
    await m.loadOlder(m.RECENT_CUTOFF - 20 * DAY);
    expect(m.getOlderState().logs.length).toBe(20);
    await m.loadAllOlder();
    expect(m.getOlderState().logs.length).toBe(40);
    expect(m.getOlderState().hasMore).toBe(false);
  });

  it('keeps edits in step and merges without duplicates', async () => {
    const m = await import('./olderLogs');
    const old = { id: 'x', type: 'diaper', startTime: m.RECENT_CUTOFF - 3 * DAY, details: {} } as any;
    m.upsertOlder(old);
    expect(m.getOlderState().logs.map(l => l.id)).toEqual(['x']);
    m.upsertOlder({ ...old, startTime: Date.now() }); // moved into the recent window
    expect(m.getOlderState().logs.length).toBe(0);
    m.upsertOlder(old);
    m.removeOlder('x');
    expect(m.getOlderState().logs.length).toBe(0);
    const recent = [{ id: 'a', startTime: Date.now() }] as any;
    const merged = m.mergeLogs(recent, [{ id: 'a', startTime: 1 }, { id: 'b', startTime: 2 }] as any);
    expect(merged.map(l => l.id)).toEqual(['a', 'b']);
  });
});
