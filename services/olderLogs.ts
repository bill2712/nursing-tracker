import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { startOfDay, subDays } from 'date-fns';
import { db } from './firebase';
import { LogEntry } from '../types';

// The live listener only reads the most recent days, so opening the app costs
// a few hundred reads instead of thousands. Older logs are fetched once, on
// demand (History "load earlier", an earlier date filter, or a full export).
export const RECENT_DAYS = 10;
export const RECENT_CUTOFF = startOfDay(subDays(new Date(), RECENT_DAYS - 1)).getTime();
const PAGE_DAYS = 10;

const older = new Map<string, LogEntry>();
let loadedFrom = RECENT_CUTOFF; // older logs are loaded for [loadedFrom, RECENT_CUTOFF)
let hasMore = true;
let loading = false;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach(fn => fn());

export interface OlderLogsState {
  logs: LogEntry[];
  loadedFrom: number;
  hasMore: boolean;
  loading: boolean;
}

export const getOlderState = (): OlderLogsState => ({
  logs: Array.from(older.values()),
  loadedFrom,
  hasMore,
  loading
});

export const subscribeOlder = (fn: () => void) => {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
};

const toLog = (d: { id: string; data: () => any }) => ({ ...d.data(), id: d.id } as LogEntry);

const checkHasMore = async () => {
  const snap = await getDocs(query(collection(db, 'logs'), where('startTime', '<', loadedFrom), orderBy('startTime', 'desc'), limit(1)));
  hasMore = !snap.empty;
};

// Load older logs back to `untilTs` (default: another PAGE_DAYS days).
export const loadOlder = async (untilTs?: number) => {
  if (loading || !hasMore) return;
  const target = untilTs ?? startOfDay(subDays(new Date(loadedFrom), PAGE_DAYS)).getTime();
  if (target >= loadedFrom) return;
  loading = true; notify();
  try {
    const snap = await getDocs(query(collection(db, 'logs'), where('startTime', '>=', target), where('startTime', '<', loadedFrom), orderBy('startTime', 'desc')));
    snap.docs.forEach(d => older.set(d.id, toLog(d)));
    loadedFrom = target;
    await checkHasMore();
  } finally {
    loading = false; notify();
  }
};

// Fetch every older log (used before exporting a full backup).
export const loadAllOlder = async () => {
  if (!hasMore) return;
  loading = true; notify();
  try {
    const snap = await getDocs(query(collection(db, 'logs'), where('startTime', '<', loadedFrom), orderBy('startTime', 'desc')));
    snap.docs.forEach(d => older.set(d.id, toLog(d)));
    loadedFrom = 0;
    hasMore = false;
  } finally {
    loading = false; notify();
  }
};

// Keep the cached older logs in step with edits made in the app.
export const upsertOlder = (log: LogEntry) => {
  if (log.startTime < RECENT_CUTOFF) older.set(String(log.id), log);
  else if (!older.delete(String(log.id))) return;
  notify();
};

export const removeOlder = (id: string) => {
  if (older.delete(String(id))) notify();
};

export const mergeLogs = (recent: LogEntry[], olderLogs: LogEntry[]) => {
  const ids = new Set(recent.map(l => String(l.id)));
  return recent.concat(olderLogs.filter(l => !ids.has(String(l.id)))).sort((a, b) => b.startTime - a.startTime);
};
