'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ProductImageZoom — renders the product image and opens a full-screen
 * zoom modal when clicked. Inside the modal, the user can:
 *  - Click/toggle to switch between fit-to-screen and 100% zoom
 *  - Drag to pan when zoomed in
 *  - Use the mouse wheel to zoom in/out (desktop)
 *  - Pinch to zoom on mobile (via touch drag)
 *  - Press Escape or click the backdrop to close
 *  - Use the preset zoom buttons (50%, 100%, 200%) at the bottom
 *
 * This is a client component because it needs interactivity (state for
 * the modal open/close + zoom level + pan position).
 */
interface ProductImageZoomProps {
  src: string;
  alt: string;
}

// Zoom presets — Fit (1x = fit-to-screen), 50%, 100%, 200%
// "Fit" and "100%" are different: Fit scales the image to fit the viewport,
// while 100% shows the image at its natural pixel size (which is larger).
// We use zoomScale values: 1 = Fit, 1.5 = "100%" (relative to fit), 3 = 200%
const ZOOM_PRESETS = [
  { scale: 1, label: 'Fit' },
  { scale: 0.5, label: '50%' },
  { scale: 1.5, label: '100%' },
  { scale: 3, label: '200%' },
] as const;

export function ProductImageZoom({ src, alt }: ProductImageZoomProps) {
  const [modalOpen, setModalOpen] = useState(false);
  // zoomScale: 1 = fit-to-screen, 2 = 200%, etc.
  const [zoomScale, setZoomScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragStartRef = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);

  const isZoomed = zoomScale > 1;

  // Lock body scroll when modal is open + handle Escape
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setModalOpen(false);
          setZoomScale(1);
          setPan({ x: 0, y: 0 });
        }
      };
      window.addEventListener('keydown', handleKey);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKey);
      };
    }
  }, [modalOpen]);

  // Reset zoom state when modal closes
  const closeModal = useCallback(() => {
    setModalOpen(false);
    setZoomScale(1);
    setPan({ x: 0, y: 0 });
  }, []);

  // Toggle between fit (1x) and 100% (1.5x) on image click
  const toggleZoom = useCallback(() => {
    setZoomScale((s) => {
      const next = s > 1 ? 1 : 1.5;
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  }, []);

  // Set a specific zoom preset
  const setZoomPreset = useCallback((scale: number) => {
    setZoomScale(scale);
    if (scale <= 1) setPan({ x: 0, y: 0 });
  }, []);

  // Mouse wheel zoom (desktop) — cycle through presets
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.deltaY < 0) {
      // Zoom in: Fit → 100% → 200%
      setZoomScale((s) => {
        if (s <= 1) return 1.5;
        if (s < 1.5) return 1.5;
        if (s < 3) return 3;
        return 3;
      });
    } else {
      // Zoom out: 200% → 100% → Fit
      setZoomScale((s) => {
        if (s > 1.5) return 1.5;
        if (s > 1) return 1;
        return 1;
      });
      setPan({ x: 0, y: 0 });
    }
  }, []);

  // Pan when zoomed — mouse drag (desktop) and touch drag (mobile)
  const handlePanStart = useCallback((clientX: number, clientY: number) => {
    if (!isZoomed) return;
    dragStartRef.current = { x: clientX, y: clientY, panX: pan.x, panY: pan.y };
  }, [isZoomed, pan]);

  const handlePanMove = useCallback((clientX: number, clientY: number) => {
    if (!dragStartRef.current) return;
    const dx = clientX - dragStartRef.current.x;
    const dy = clientY - dragStartRef.current.y;
    setPan({
      x: dragStartRef.current.panX + dx,
      y: dragStartRef.current.panY + dy,
    });
  }, []);

  const handlePanEnd = useCallback(() => {
    dragStartRef.current = null;
  }, []);

  // Mouse handlers
  const onMouseDownPan = useCallback((e: React.MouseEvent) => {
    if (!isZoomed) return;
    e.preventDefault();
    handlePanStart(e.clientX, e.clientY);
    const onMove = (ev: MouseEvent) => handlePanMove(ev.clientX, ev.clientY);
    const onUp = () => {
      handlePanEnd();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [isZoomed, handlePanStart, handlePanMove, handlePanEnd]);

  // Touch handlers — when zoomed, pan; when not zoomed, tap toggles zoom
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (isZoomed && e.touches.length === 1) {
      handlePanStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, [isZoomed, handlePanStart]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (isZoomed && e.touches.length === 1) {
      e.preventDefault();
      handlePanMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, [isZoomed, handlePanMove]);

  const onTouchEnd = useCallback(() => {
    handlePanEnd();
  }, [handlePanEnd]);

  // Current zoom label for the indicator — matches the preset labels
  const zoomLabel = ZOOM_PRESETS.find((p) => Math.abs(zoomScale - p.scale) < 0.01)?.label
    || (zoomScale <= 1 ? 'Fit' : `${Math.round(zoomScale * 100 / 1.5 * 100)}%`);

  return (
    <>
      {/* The product image itself — clicking opens the zoom modal */}
      <div className="relative w-full h-full min-h-[50vh] md:min-h-[70vh]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={100}
          className="object-contain object-center pointer-events-none select-none"
          draggable={false}
          priority
        />
        {/* Clickable overlay — opens the modal. Has a subtle "click to zoom"
            hint that appears on hover (desktop). */}
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="absolute inset-0 z-[2] cursor-zoom-in flex items-center justify-center group"
          aria-label="Open zoom view"
        >
          <span
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] tracking-[0.32em] uppercase text-[var(--ink)] px-4 py-2 backdrop-blur-sm"
            style={{ background: 'rgba(248,243,234,0.88)' }}
          >
            Click to Zoom
          </span>
        </button>
      </div>

      {/* Zoom modal — full-screen lightbox with pan + zoom + presets */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            key="zoom-modal"
            className="fixed inset-0 z-[150] flex items-center justify-center"
            style={{ background: 'rgba(20,16,12,0.95)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Zoomed product view"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[152] w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-white/80 hover:text-white transition-colors"
              aria-label="Close zoom view"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Zoom level indicator (top-left) */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-[152] text-white/60 text-[10px] tracking-[0.22em] uppercase">
              {zoomLabel}{isZoomed ? ' — Drag to pan' : ' — Click to zoom'}
            </div>

            {/* The image — zoomable + pannable */}
            <motion.div
              key="zoom-image"
              className="relative max-w-[90vw] max-h-[80vh] flex items-center justify-center"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => {
                e.stopPropagation();
                toggleZoom();
              }}
              onWheel={handleWheel}
              onMouseDown={onMouseDownPan}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              style={{
                cursor: isZoomed ? 'grab' : 'zoom-in',
                overflow: 'visible',
              }}
            >
              <motion.div
                animate={{
                  scale: zoomScale,
                  x: pan.x,
                  y: pan.y,
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 30 }}
                style={{ willChange: 'transform' }}
              >
                <Image
                  src={src}
                  alt={alt}
                  width={800}
                  height={1200}
                  quality={100}
                  className="w-auto h-auto max-w-[85vw] max-h-[75vh] object-contain pointer-events-none select-none"
                  style={{ filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.5))' }}
                  draggable={false}
                  priority
                />
              </motion.div>
            </motion.div>

            {/* Zoom preset control bar (bottom center) */}
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[152] flex items-center gap-1 px-2 py-2 rounded-full"
              style={{ background: 'rgba(28,25,23,0.85)', backdropFilter: 'blur(12px)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {ZOOM_PRESETS.map((preset) => {
                const isActive = Math.abs(zoomScale - preset.scale) < 0.01;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setZoomPreset(preset.scale)}
                    className={`px-4 py-2 rounded-full text-[11px] tracking-[0.18em] uppercase transition-colors ${
                      isActive
                        ? 'bg-white text-[var(--ink)]'
                        : 'text-white/60 hover:text-white'
                    }`}
                    aria-label={`Zoom to ${preset.label}`}
                    aria-pressed={isActive}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

