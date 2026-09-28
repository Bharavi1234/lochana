import React from 'react';
import { motion } from 'framer-motion';
import { CONFIG } from '../config';
import Confetti from './Confetti';

export default function Celebration() {
  const { ringEmoji, heading, message, receiptNote } = CONFIG.celebration;

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 text-center overflow-hidden">
      {/* Confetti explosions */}
      <Confetti />

      {/* Main Glassmorphic Celebration Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.75, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 120,
          mass: 0.8,
          delay: 0.1,
        }}
        className="glass-card max-w-xl w-full mx-auto rounded-3xl p-8 sm:p-12 relative z-30 text-center"
      >
        {/* Soft background ambient radial highlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-rose/20 rounded-full blur-3xl pointer-events-none" />

        {/* Big Pop-in Ring Emoji with Continuous Floating Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 18,
            delay: 0.25,
          }}
          className="relative inline-block mb-6 select-none"
        >
          <motion.div
            animate={{
              y: [-6, 6, -6],
              rotate: [-4, 4, -4],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-7xl sm:text-8xl filter drop-shadow-[0_0_35px_rgba(240,201,160,0.6)]"
          >
            {ringEmoji}
          </motion.div>
        </motion.div>

        {/* Heading: "She said YES!" */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="font-serif text-4xl sm:text-6xl text-shimmer font-semibold mb-6 tracking-wide drop-shadow-[0_4px_25px_rgba(251,111,146,0.4)]"
        >
          {heading}
        </motion.h1>

        {/* Warm Love Note */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
          className="text-cream text-lg sm:text-xl font-light leading-relaxed mb-8 max-w-md mx-auto"
        >
          {message}
        </motion.p>

        {/* Screenshot Receipt Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          className="inline-block py-3 px-6 rounded-2xl bg-wine-950/60 border border-gold/30 text-gold text-xs sm:text-sm font-medium tracking-wide shadow-inner backdrop-blur-md"
        >
          {receiptNote}
        </motion.div>
      </motion.div>
    </div>
  );
}
