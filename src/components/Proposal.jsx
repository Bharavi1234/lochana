import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../config';

export default function Proposal({ onAccept }) {
  const [escapeCount, setEscapeCount] = useState(0);
  const [noPosition, setNoPosition] = useState(null); // null = normal in-flow, { x, y } = fixed
  const [isEscaped, setIsEscaped] = useState(false);
  
  const noButtonRef = useRef(null);
  const lastEscapeTime = useRef(0);

  const {
    eyebrow,
    heading,
    subtitle,
    yesButtonText,
    noPhrases,
    escapeDistanceDesktop,
    escapeDistanceMobile,
    escapeThrottleMs,
    noScaleFloor,
    yesScaleCap,
    scaleStep,
  } = CONFIG.proposal;

  // Current scale calculations
  const noScale = Math.max(noScaleFloor, 1 - escapeCount * scaleStep);
  const yesScale = Math.min(yesScaleCap, 1 + escapeCount * scaleStep);

  // Label for the No button based on escape count
  const currentPhrase = noPhrases[Math.min(escapeCount, noPhrases.length - 1)];

  /**
   * Generates a safe new random viewport position that is well away from
   * the current pointer and safely padded inside screen boundaries.
   */
  const calculateEscapeCoordinates = useCallback((pointerX, pointerY) => {
    const padding = 28;
    const btnRect = noButtonRef.current?.getBoundingClientRect() || { width: 140, height: 50 };
    const btnWidth = btnRect.width || 140;
    const btnHeight = btnRect.height || 50;

    const maxX = Math.max(padding, window.innerWidth - btnWidth - padding);
    const maxY = Math.max(padding, window.innerHeight - btnHeight - padding);

    let attempts = 0;
    let newX, newY, distToPointer;

    // Pick a point that is sufficiently far (>180px) from the pointer
    do {
      newX = padding + Math.random() * (maxX - padding);
      newY = padding + Math.random() * (maxY - padding);

      const dx = (newX + btnWidth / 2) - pointerX;
      const dy = (newY + btnHeight / 2) - pointerY;
      distToPointer = Math.sqrt(dx * dx + dy * dy);
      attempts++;
    } while (distToPointer < 180 && attempts < 15);

    return { x: Math.round(newX), y: Math.round(newY) };
  }, []);

  /**
   * Triggers the escape jump
   */
  const triggerEscape = useCallback((pointerX, pointerY) => {
    const now = Date.now();
    if (now - lastEscapeTime.current < escapeThrottleMs) {
      return;
    }
    lastEscapeTime.current = now;

    const newPos = calculateEscapeCoordinates(pointerX, pointerY);
    setNoPosition(newPos);
    setIsEscaped(true);
    setEscapeCount((prev) => prev + 1);
  }, [calculateEscapeCoordinates, escapeThrottleMs]);

  /**
   * Handles distance check for pointer / mouse movement
   */
  const handlePointerCheck = useCallback((e) => {
    if (!noButtonRef.current) return;

    const rect = noButtonRef.current.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    const pointerX = e.clientX;
    const pointerY = e.clientY;

    const distance = Math.hypot(pointerX - btnCenterX, pointerY - btnCenterY);
    const threshold = escapeDistanceDesktop;

    if (distance < threshold) {
      triggerEscape(pointerX, pointerY);
    }
  }, [escapeDistanceDesktop, triggerEscape]);

  /**
   * Handles touch proximity for mobile (touchstart & touchmove)
   * Ensures the button jumps BEFORE the tap can register!
   */
  const handleTouchCheck = useCallback((e) => {
    if (!noButtonRef.current || !e.touches || e.touches.length === 0) return;

    const touch = e.touches[0];
    const rect = noButtonRef.current.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    const pointerX = touch.clientX;
    const pointerY = touch.clientY;

    const distance = Math.hypot(pointerX - btnCenterX, pointerY - btnCenterY);
    const threshold = escapeDistanceMobile;

    if (distance < threshold) {
      // Prevent default tap action if touch was aiming right at it
      if (e.cancelable) {
        e.preventDefault();
      }
      triggerEscape(pointerX, pointerY);
    }
  }, [escapeDistanceMobile, triggerEscape]);

  // Window resize handler: clamps button inside visible viewport
  useEffect(() => {
    const handleResize = () => {
      if (!isEscaped || !noPosition || !noButtonRef.current) return;
      const padding = 20;
      const rect = noButtonRef.current.getBoundingClientRect();
      const maxX = window.innerWidth - rect.width - padding;
      const maxY = window.innerHeight - rect.height - padding;

      setNoPosition((prev) => {
        if (!prev) return prev;
        return {
          x: Math.min(Math.max(padding, prev.x), Math.max(padding, maxX)),
          y: Math.min(Math.max(padding, prev.y), Math.max(padding, maxY)),
        };
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isEscaped, noPosition]);

  // Global listeners for desktop pointermove and mobile touch
  useEffect(() => {
    const onPointerMove = (e) => handlePointerCheck(e);
    const onTouchMove = (e) => handleTouchCheck(e);
    const onTouchStart = (e) => handleTouchCheck(e);

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: false });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchstart', onTouchStart);
    };
  }, [handlePointerCheck, handleTouchCheck]);

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 text-center select-none overflow-hidden">
      {/* Central Proposal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mx-auto flex flex-col items-center"
      >
        {/* Eyebrow Name */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gold tracking-[0.3em] uppercase text-xs sm:text-sm font-semibold mb-4 px-4 py-1.5 rounded-full bg-wine-950/40 border border-gold/25 backdrop-blur-md"
        >
          {eyebrow}
        </motion.p>

        {/* Shimmering Serif Question Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-serif text-5xl sm:text-7xl md:text-8xl font-normal tracking-wide text-shimmer mb-6 leading-tight drop-shadow-[0_4px_30px_rgba(251,111,146,0.3)]"
        >
          {heading}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-cream/80 text-base sm:text-xl font-light max-w-lg mb-12 sm:mb-16 leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {/* Action Buttons Container */}
        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 w-full max-w-md">
          {/* YES BUTTON: Primary, Glowing, Growing */}
          <motion.button
            onClick={onAccept}
            style={{ scale: yesScale }}
            whileHover={{ scale: yesScale * 1.05 }}
            whileTap={{ scale: yesScale * 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="relative px-10 py-4 sm:px-12 sm:py-5 rounded-full font-bold text-white text-xl sm:text-2xl bg-gradient-to-r from-rose via-rose-deep to-rose animate-pulse-glow border border-cream/30 z-20 cursor-pointer shadow-[0_0_35px_rgba(251,111,146,0.5)] transition-shadow duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              {yesButtonText}
            </span>
          </motion.button>

          {/* NO BUTTON (In-flow placeholder or Runaway) */}
          <div className="relative h-14 sm:h-16 flex items-center justify-center">
            {/* If escaped, render fixed runaway button */}
            {isEscaped && noPosition ? (
              <motion.button
                ref={noButtonRef}
                style={{
                  position: 'fixed',
                  left: `${noPosition.x}px`,
                  top: `${noPosition.y}px`,
                  scale: noScale,
                  zIndex: 50,
                }}
                animate={{
                  left: `${noPosition.x}px`,
                  top: `${noPosition.y}px`,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 450,
                  damping: 28,
                  mass: 0.6,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  triggerEscape(e.clientX, e.clientY);
                }}
                onTouchStart={(e) => {
                  if (e.cancelable) e.preventDefault();
                  const touch = e.touches[0];
                  triggerEscape(touch.clientX, touch.clientY);
                }}
                className="px-6 py-3 rounded-full text-cream/70 border border-cream/20 bg-wine-950/80 backdrop-blur-md text-sm sm:text-base font-medium whitespace-nowrap shadow-lg cursor-pointer hover:border-rose/40 active:scale-95 transition-colors select-none"
              >
                {currentPhrase}
              </motion.button>
            ) : (
              /* Initial in-flow button before first escape */
              <button
                ref={noButtonRef}
                onClick={(e) => triggerEscape(e.clientX, e.clientY)}
                onTouchStart={(e) => {
                  const touch = e.touches[0];
                  triggerEscape(touch.clientX, touch.clientY);
                }}
                className="px-8 py-3.5 sm:px-9 sm:py-4 rounded-full text-cream/70 border border-cream/20 bg-wine-950/40 backdrop-blur-md text-base sm:text-lg font-medium hover:border-rose/40 transition-all select-none cursor-pointer"
              >
                {currentPhrase}
              </button>
            )}
          </div>
        </div>

        {/* Escape Attempts Counter */}
        <AnimatePresence>
          {escapeCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-12 text-sm sm:text-base text-gold font-light tracking-wide bg-wine-950/50 px-5 py-2 rounded-full border border-gold/20 backdrop-blur-sm"
            >
              <span>{escapeCount} escape {escapeCount === 1 ? 'attempt' : 'attempts'} 😌</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
