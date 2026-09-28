import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Background from './components/Background';
import PasswordGate from './components/PasswordGate';
import Proposal from './components/Proposal';
import Celebration from './components/Celebration';
import AudioToggle from './components/AudioToggle';

// Stages enum
export const STAGES = {
  GATE: 'GATE',
  PROPOSAL: 'PROPOSAL',
  CELEBRATION: 'CELEBRATION',
};

const STORAGE_KEY_ACCEPTED = 'proposal_lochana_accepted';
const STORAGE_KEY_UNLOCKED = 'proposal_lochana_unlocked';

export default function App() {
  const [currentStage, setCurrentStage] = useState(() => {
    // Check if ?reset=true is in URL to allow quick testing/resetting
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('reset') === 'true') {
        localStorage.removeItem(STORAGE_KEY_ACCEPTED);
        sessionStorage.removeItem(STORAGE_KEY_UNLOCKED);
        return STAGES.GATE;
      }

      // If she already said yes, take her straight to celebration
      const hasAccepted = localStorage.getItem(STORAGE_KEY_ACCEPTED);
      if (hasAccepted === 'true') {
        return STAGES.CELEBRATION;
      }

      // If unlocked this session, proceed to proposal
      const hasUnlocked = sessionStorage.getItem(STORAGE_KEY_UNLOCKED);
      if (hasUnlocked === 'true') {
        return STAGES.PROPOSAL;
      }
    }
    return STAGES.GATE;
  });

  const handleUnlock = () => {
    sessionStorage.setItem(STORAGE_KEY_UNLOCKED, 'true');
    setCurrentStage(STAGES.PROPOSAL);
  };

  const handleAcceptProposal = () => {
    localStorage.setItem(STORAGE_KEY_ACCEPTED, 'true');
    setCurrentStage(STAGES.CELEBRATION);
  };

  return (
    <main className="relative min-h-screen w-full bg-wine-900 text-cream selection:bg-rose selection:text-white overflow-hidden">
      {/* Dynamic Animated Atmospheric Background */}
      <Background />

      {/* Ambient Music Toggle */}
      <AudioToggle />

      {/* Screen Stage Manager with Smooth Fade & Scale Transitions */}
      <AnimatePresence mode="wait">
        {currentStage === STAGES.GATE && (
          <motion.div
            key="stage-gate"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="w-full min-h-screen"
          >
            <PasswordGate onUnlock={handleUnlock} />
          </motion.div>
        )}

        {currentStage === STAGES.PROPOSAL && (
          <motion.div
            key="stage-proposal"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.06 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="w-full min-h-screen"
          >
            <Proposal onAccept={handleAcceptProposal} />
          </motion.div>
        )}

        {currentStage === STAGES.CELEBRATION && (
          <motion.div
            key="stage-celebration"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="w-full min-h-screen"
          >
            <Celebration />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
