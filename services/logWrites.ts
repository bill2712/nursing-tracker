import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { LogEntry } from '../types';
import { showToast, vibrate } from '../components/Toast';
import { upsertOlder, removeOlder } from './olderLogs';

// Firestore applies writes to the local cache right away and the snapshot
// listener updates the UI instantly. The returned promise only resolves once the
// server confirms, so callers should not block the UI on it.
const reportError = (error: unknown) => {
  console.error(error);
  showToast({ message: '同步失敗，請檢查網絡後再試', tone: 'error' });
};

export const saveLog = (log: LogEntry) => {
  upsertOlder(log);
  setDoc(doc(db, 'logs', log.id), log).catch(reportError);
};

export const removeLog = (id: string) => {
  removeOlder(id);
  deleteDoc(doc(db, 'logs', id)).catch(reportError);
};

// Save a log and show a confirmation toast with an undo button.
export const saveLogWithUndo = (log: LogEntry, message: string) => {
  saveLog(log);
  vibrate();
  showToast({
    message,
    actionLabel: '復原',
    onAction: () => removeLog(log.id)
  });
};
