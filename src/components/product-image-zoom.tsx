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
 *
 * This is a client component because it needs interactivity (state for
 * the modal open/close + zoom level + pan position).
 */
interface ProductImageZoomProps {
  src: string;
  alt: string;
}

export function ProductImageZoom({ src, alt }: ProductImageZoomProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragStartRef = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);

  // Lock body scroll when modal is open + handle Escape
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setModalOpen(false);
          setZoomed(false);
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
    setZoomed(false);
    setPan({ x: 0, y: 0 });
  }, []);

  // Toggle zoom on image click (inside the modal)
  const toggleZoom = useCallback(() => {
    setZoomed((z) => {
      if (z) setPan({ x: 0, y: 0 }); // reset pan when zooming out
      return !z;
    });
  }, []);

  // Mouse wheel zoom (desktop) — adjust zoom level smoothly
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Wheel down → zoom out, wheel up → zoom in
    // We toggle zoom state based on direction
    if (e.deltaY < 0 && !zoomed) {
      setZoomed(true);
    } else if (e.deltaY > 0 && zoomed) {
      setZoomed(false);
      setPan({ x: 0, y: 0 });
    }
  }, [zoomed]);

  // Pan when zoomed — mouse drag (desktop) and touch drag (mobile)
  const handlePanStart = useCallback((clientX: number, clientY: number) => {
    if (!zoomed) return;
    dragStartRef.current = { x: clientX, y: clientY, panX: pan.x, panY: pan.y };
  }, [zoomed, pan]);

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
    if (!zoomed) return;
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
  }, [zoomed, handlePanStart, handlePanMove, handlePanEnd]);

  // Touch handlers — when zoomed, pan; when not zoomed, tap toggles zoom
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (zoomed && e.touches.length === 1) {
      handlePanStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, [zoomed, handlePanStart]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (zoomed && e.touches.length === 1) {
      e.preventDefault();
      handlePanMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, [zoomed, handlePanMove]);

  const onTouchEnd = useCallback(() => {
    handlePanEnd();
  }, [handlePanEnd]);

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

      {/* Zoom modal — full-screen lightbox with pan + zoom */}
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
              // Click on backdrop closes; click on image toggles zoom
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

            {/* Zoom level indicator */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-[152] text-white/60 text-[10px] tracking-[0.22em] uppercase">
              {zoomed ? '100% — Drag to pan' : 'Fit — Click to zoom'}
            </div>

            {/* The image — zoomable + pannable */}
            <motion.div
              key="zoom-image"
              className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
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
                cursor: zoomed ? 'grab' : 'zoom-in',
                overflow: 'visible',
              }}
            >
              <motion.div
                animate={{
                  scale: zoomed ? 2 : 1,
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
                  className="w-auto h-auto max-w-[85vw] max-h-[80vh] object-contain pointer-events-none select-none"
                  style={{ filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.5))' }}
                  draggable={false}
                  priority
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
