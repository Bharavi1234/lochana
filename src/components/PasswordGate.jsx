import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../config';

export default function PasswordGate({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);

  // Autofocus input on initial mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password.trim()) return;

    const trimmedInput = password.trim().toLowerCase();
    const correctPassword = CONFIG.password.trim().toLowerCase();

    if (trimmedInput === correctPassword) {
      setHasError(false);
      setIsSubmitting(true);
      // Small pause for smooth tactile feel before transitioning
      setTimeout(() => {
        onUnlock();
      }, 400);
    } else {
      setHasError(true);
      setShakeKey((prev) => prev + 1);
      setPassword('');
      // Refocus input after wrong attempt
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-between p-4 sm:p-6">
      {/* Top spacer to balance the footer */}
      <div className="h-6 sm:h-10" />

      {/* Main Glassmorphic Card with Shake and Spring Entrance */}
      <motion.div
        key={shakeKey}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          x: hasError ? [-12, 12, -8, 8, -4, 4, 0] : 0,
        }}
        transition={{
          duration: hasError ? 0.45 : 0.7,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="glass-card w-full max-w-md rounded-3xl p-6 sm:p-10 text-center relative overflow-hidden"
      >
        {/* Subtle decorative inner corner glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-rose/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-gold/10 rounded-full blur-2xl pointer-events-none" />

        {/* Floating Lock Emoji */}
        <motion.div
          animate={{
            y: [-4, 6, -4],
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="text-5xl sm:text-6xl mb-4 select-none filter drop-shadow-[0_4px_16px_rgba(251,111,146,0.35)]"
        >
          {CONFIG.gate.emoji}
        </motion.div>

        {/* Header Titles */}
        <h1 className="font-serif text-3xl sm:text-4xl text-cream font-medium tracking-wide mb-2">
          {CONFIG.gate.title}
        </h1>
        <p className="text-cream/80 text-sm sm:text-base font-light mb-8 max-w-xs mx-auto leading-relaxed">
          {CONFIG.gate.subtitle}
        </p>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              ref={inputRef}
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (hasError) setHasError(false);
              }}
              placeholder={CONFIG.gate.inputPlaceholder}
              autoComplete="off"
              disabled={isSubmitting}
              className={`w-full py-3.5 px-5 bg-wine-950/60 text-center text-cream placeholder-cream/40 rounded-full border text-base tracking-[0.2em] font-medium transition-all duration-300 outline-none backdrop-blur-md ${
                hasError
                  ? 'border-rose-deep shadow-[0_0_20px_rgba(224,87,128,0.5)] animate-pulse'
                  : 'border-rose/30 focus:border-rose focus:shadow-[0_0_20px_rgba(255,143,171,0.3)]'
              }`}
            />
          </div>

          {/* Unlock Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-full font-semibold text-white bg-gradient-to-r from-rose-deep via-rose to-rose-deep shadow-[0_4px_25px_rgba(251,111,146,0.4)] hover:shadow-[0_6px_30px_rgba(251,111,146,0.6)] transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <span>{isSubmitting ? 'Opening... ♥' : CONFIG.gate.unlockButtonText}</span>
          </motion.button>
        </form>

        {/* Error Notification */}
        <AnimatePresence>
          {hasError && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="text-rose text-sm font-medium mt-4 select-none"
            >
              {CONFIG.gate.errorMessage}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Password Hint */}
        <div className="mt-6 pt-5 border-t border-cream/10">
          <p className="text-cream/50 text-xs tracking-wide">
            {CONFIG.passwordHint}
          </p>
        </div>
      </motion.div>

      {/* Gentle Footer only shown on Gate screen */}
      <footer className="text-center py-4 text-xs text-cream/40 tracking-wider">
        {CONFIG.gate.footerText}
      </footer>
    </div>
  );
}
