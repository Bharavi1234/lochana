import React, { useState, useEffect, useRef } from 'react';
import { CONFIG } from '../config';

const { colors, piecesPerBurst, burstIntervalMs, totalDurationMs } = CONFIG.celebration.confetti;

function createBurstParticles(burstId, count = 180) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    const isCircle = Math.random() > 0.6;
    const width = Math.floor(Math.random() * 8 + 6);
    const height = isCircle ? width : Math.floor(Math.random() * 12 + 10);
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Spread horizontally across top, or burst slightly from center
    const startX = Math.random() * 100;
    const endX = startX + (Math.random() * 30 - 15);
    const duration = (Math.random() * 2 + 2.5).toFixed(2);
    const delay = (Math.random() * 0.4).toFixed(2);
    const startRot = Math.floor(Math.random() * 360);
    const endRot = startRot + Math.floor(Math.random() * 720 + 360);

    particles.push({
      id: `${burstId}-${i}`,
      startX,
      endX,
      width,
      height,
      color,
      isCircle,
      duration: parseFloat(duration),
      delay: parseFloat(delay),
      startRot,
      endRot,
    });
  }
  return particles;
}

export default function Confetti() {
  const [activeBursts, setActiveBursts] = useState([]);
  const burstCountRef = useRef(0);

  useEffect(() => {
    // Initial explosion on mount
    const triggerBurst = () => {
      const burstId = burstCountRef.current++;
      const newParticles = createBurstParticles(burstId, piecesPerBurst);
      
      setActiveBursts((prev) => [...prev, { id: burstId, particles: newParticles }]);

      // Automatically clean up this burst after its animation finishes (~5 seconds)
      setTimeout(() => {
        setActiveBursts((prev) => prev.filter((b) => b.id !== burstId));
      }, 5000);
    };

    triggerBurst();

    // Repeat bursts every 1.3s for ~10 seconds
    const interval = setInterval(() => {
      triggerBurst();
    }, burstIntervalMs);

    const timer = setTimeout(() => {
      clearInterval(interval);
    }, totalDurationMs);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
      {activeBursts.map((burst) =>
        burst.particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.startX}%`,
              top: '-20px',
              width: `${p.width}px`,
              height: `${p.height}px`,
              backgroundColor: p.color,
              borderRadius: p.isCircle ? '50%' : '2px',
              opacity: 0.9,
              boxShadow: `0 0 6px ${p.color}`,
              animation: `confetti-fall-${p.id} ${p.duration}s linear forwards`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))
      )}

      {/* Dynamic Keyframes for falling confetti pieces */}
      <style>{`
        ${activeBursts
          .flatMap((b) => b.particles)
          .map(
            (p) => `
          @keyframes confetti-fall-${p.id} {
            0% {
              transform: translateY(0) translateX(0) rotate(0deg);
              opacity: 1;
            }
            80% {
              opacity: 0.95;
            }
            100% {
              transform: translateY(105vh) translateX(${p.endX - p.startX}vw) rotate(${p.endRot}deg);
              opacity: 0;
            }
          }
        `
          )
          .join('\n')}
      `}</style>
    </div>
  );
}
