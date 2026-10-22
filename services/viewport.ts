// Phone keyboards cover the bottom of the screen without shrinking it, so a
// bottom sheet sized with vh/dvh keeps its save button hidden behind the
// keyboard. We publish the part of the screen that is really visible as CSS
// variables, and .modal-backdrop sizes itself to that area.
const FIELD_SELECTOR = 'input, textarea, select';

export const keepFieldVisible = (field: Element | null) => {
  if (!(field instanceof HTMLElement) || !field.matches(FIELD_SELECTOR)) return;
  if (!field.closest('.modal-sheet')) return;
  field.scrollIntoView({ block: 'nearest' });
};

export const installViewportTracking = () => {
  const viewport = window.visualViewport;
  if (!viewport) return () => {};

  const root = document.documentElement;
  let frame = 0;
  let lastHeight = 0;

  const apply = () => {
    frame = 0;
    root.style.setProperty('--vv-height', `${Math.round(viewport.height)}px`);
    root.style.setProperty('--vv-top', `${Math.round(viewport.offsetTop)}px`);

    // The keyboard opened or closed: bring the field being typed in back into view.
    if (Math.abs(viewport.height - lastHeight) > 1) {
      lastHeight = viewport.height;
      keepFieldVisible(document.activeElement);
    }
  };

  const schedule = () => {
    if (!frame) frame = window.requestAnimationFrame(apply);
  };

  viewport.addEventListener('resize', schedule);
  viewport.addEventListener('scroll', schedule);
  apply();

  return () => {
    viewport.removeEventListener('resize', schedule);
    viewport.removeEventListener('scroll', schedule);
    if (frame) window.cancelAnimationFrame(frame);
  };
};
