// A desktop tab can stay open for weeks and keep running an old build, so
// bug fixes never reach it. Each build's entry script has a content hash in
// its name; when the live site's index.html names a different one, a newer
// version is out and we offer a reload.
const ENTRY_SCRIPT = /assets\/index-[\w-]+\.js/;
const CHECK_EVERY_MS = 15 * 60 * 1000;
const MIN_GAP_MS = 60 * 1000;

export const findEntryScript = (text: string): string | null => text.match(ENTRY_SCRIPT)?.[0] ?? null;

export const isNewerBuild = (currentEntry: string | null, latestHtml: string): boolean => {
  const latest = findEntryScript(latestHtml);
  return !!currentEntry && !!latest && latest !== currentEntry;
};

export const startUpdateCheck = (onUpdate: () => void) => {
  if (!import.meta.env.PROD) return () => {};
  const current = Array.from(document.scripts).map(s => findEntryScript(s.src)).find(Boolean) ?? null;
  if (!current) return () => {};

  let found = false;
  let lastCheck = Date.now();

  const check = async () => {
    if (found || document.visibilityState !== 'visible') return;
    if (Date.now() - lastCheck < MIN_GAP_MS) return;
    lastCheck = Date.now();
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}?v=${Date.now()}`, { cache: 'no-store' });
      if (!res.ok) return;
      if (isNewerBuild(current, await res.text())) {
        found = true;
        onUpdate();
      }
    } catch {
      // Offline or blocked: try again next time.
    }
  };

  const intervalId = window.setInterval(check, CHECK_EVERY_MS);
  document.addEventListener('visibilitychange', check);
  window.addEventListener('focus', check);
  return () => {
    window.clearInterval(intervalId);
    document.removeEventListener('visibilitychange', check);
    window.removeEventListener('focus', check);
  };
};
