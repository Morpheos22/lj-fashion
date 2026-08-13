'use client';

import { useEffect } from 'react';

/**
 * ImageProtection — client-side guard against casual image downloads.
 *
 * Blocks the common "save image" paths:
 *  - Right-click context menu on <img> elements (prevents "Save Image As...")
 *  - Long-press on touch devices (mobile "save image" popup)
 *  - Keyboard shortcuts: Ctrl/Cmd+S (save page), Ctrl/Cmd+U (view source),
 *    F12 / Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C (devtools)
 *
 * Note: no client-side protection can fully prevent a determined user from
 * extracting an image (DevTools, screenshot, network tab, etc.). This
 * component stops the casual paths that 99% of users would try.
 *
 * Mounted once in the root layout so it applies site-wide.
 */
export function ImageProtection() {
  useEffect(() => {
    // 1. Block right-click context menu ONLY on <img> elements.
    //    This preserves right-click for everything else (text, links, etc.)
    //    so the site doesn't feel hostile to use.
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' || target.closest('img')) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // 2. Block drag-start on images (covers drag-to-desktop / drag-to-tab).
    //    The CSS rule handles most of this, but the JS event listener is
    //    a belt-and-suspenders for browsers that ignore the CSS.
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' || target.closest('img')) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // 3. Block common "save" and "devtools" keyboard shortcuts.
    //    This is intentionally conservative — it only blocks shortcuts
    //    that are commonly used to save images or inspect the page.
    //    Normal browsing shortcuts (Ctrl+C, Ctrl+V, etc.) are unaffected.
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const ctrlOrCmd = e.ctrlKey || e.metaKey;

      // Ctrl/Cmd + S → Save Page (prevents saving the page + its images)
      if (ctrlOrCmd && key === 's') {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Ctrl/Cmd + U → View Source
      if (ctrlOrCmd && key === 'u') {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // F12 → DevTools
      if (e.key === 'F12') {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Ctrl/Cmd + Shift + I / J / C → DevTools panels
      if (ctrlOrCmd && e.shiftKey && ['i', 'j', 'c'].includes(key)) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
    };

    // 4. Block touch long-press on images (mobile "save image" popup).
    //    Touch events with >500ms hold trigger the save popup on iOS/Android.
    //    We can't fully block this without blocking all touch, but we can
    //    intercept the contextmenu event which fires on long-press.
    //    (Already handled by handleContextMenu above — touch long-press
    //    fires a contextmenu event on mobile.)

    document.addEventListener('contextmenu', handleContextMenu, true);
    document.addEventListener('dragstart', handleDragStart, true);
    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu, true);
      document.removeEventListener('dragstart', handleDragStart, true);
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, []);

  return null;
}
