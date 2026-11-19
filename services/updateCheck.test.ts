import { describe, expect, it } from 'vitest';
import { findEntryScript, isNewerBuild } from './updateCheck';

const page = (hash: string) =>
  `<!doctype html><head><script type="module" crossorigin src="/nursing-tracker/assets/index-${hash}.js"></script></head>`;

describe('update check', () => {
  it('reads the entry script from a URL or from index.html', () => {
    expect(findEntryScript('https://bill2712.github.io/nursing-tracker/assets/index-D3Kr-YlU.js')).toBe('assets/index-D3Kr-YlU.js');
    expect(findEntryScript(page('abc_123'))).toBe('assets/index-abc_123.js');
    expect(findEntryScript('<html>no script</html>')).toBeNull();
  });

  it('only reports a newer build when the live entry script differs', () => {
    expect(isNewerBuild('assets/index-old.js', page('new'))).toBe(true);
    expect(isNewerBuild('assets/index-same.js', page('same'))).toBe(false);
    expect(isNewerBuild('assets/index-old.js', '<html>error page</html>')).toBe(false);
    expect(isNewerBuild(null, page('new'))).toBe(false);
  });
});
