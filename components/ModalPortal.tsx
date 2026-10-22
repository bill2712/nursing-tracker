import React from 'react';
import { createPortal } from 'react-dom';

export const MODAL_ROOT_ID = 'modal-root';

// Render a modal outside the scrolling page area. On iPhone a fixed sheet
// inside a scroll container stays stuck under the bottom nav bar, which hid
// the save button. The modal root sits inside .app-shell (so dark mode and
// input styles still apply) but outside .app-main and above the nav.
const ModalPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const target = document.getElementById(MODAL_ROOT_ID) ?? document.body;
  return createPortal(children, target);
};

export default ModalPortal;
