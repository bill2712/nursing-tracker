import React, { useEffect, useState } from 'react';

export interface ToastOptions {
  message: string;
  tone?: 'success' | 'error';
  actionLabel?: string;
  onAction?: () => void;
  durationMs?: number;
}

interface ToastItem extends ToastOptions {
  id: number;
}

// Tiny module-level store so any component can show a toast without a context provider.
let nextId = 1;
let listener: ((toast: ToastItem) => void) | null = null;

export const showToast = (options: ToastOptions) => {
  listener?.({ ...options, id: nextId++ });
};

export const vibrate = (ms = 12) => {
  try {
    navigator.vibrate?.(ms);
  } catch {
    // Vibration is optional; some browsers throw when it is blocked.
  }
};

export const ToastHost: React.FC = () => {
  const [toast, setToast] = useState<ToastItem | null>(null);

  useEffect(() => {
    listener = setToast;
    return () => { listener = null; };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeoutId = window.setTimeout(() => setToast(null), toast.durationMs ?? 3500);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  if (!toast) return null;

  const isError = toast.tone === 'error';
  return (
    <div className="toast-layer" role="status" aria-live="polite">
      <div key={toast.id} className={`toast ${isError ? 'toast--error' : ''}`}>
        <span className="toast-icon" aria-hidden="true">{isError ? '!' : '✓'}</span>
        <span className="min-w-0 flex-1 truncate">{toast.message}</span>
        {toast.actionLabel && toast.onAction && (
          <button
            className="toast-action"
            onClick={() => {
              toast.onAction?.();
              setToast(null);
            }}
          >
            {toast.actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};
