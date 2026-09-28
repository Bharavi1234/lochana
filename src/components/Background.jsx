import React, { useMemo } from 'react';

// Generates static star data so positions don't jump on re-renders
function generateStars(count = 55) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      x: (Math.random() * 100).toFixed(2),
      y: (Math.random() * 100).toFixed(2),
      size: (Math.random() * 2.5 + 1).toFixed(1),
      delay: (Math.random() * 5).toFixed(2),
      duration: (Math.random() * 3 + 2).toFixed(2),
      opacity: (Math.random() * 0.7 + 0.3).toFixed(2),
    });
  }
  return stars;
}

// Generates rising hearts with varied sizes, speeds, and horizontal offsets
function generateFloatingHearts(count = 18) {
  const hearts = [];
  const emojis = ['♥', '💖', '✨', '💕', '🤍', '🌸'];
  for (let i = 0; i < count; i++) {
    hearts.push({
      id: i,
      char: emojis[i % emojis.length],
      left: (Math.random() * 96 + 2).toFixed(2),
      delay: (Math.random() * 12).toFixed(2),
      duration: (Math.random() * 6 + 10).toFixed(2),
      size: (Math.random() * 16 + 14).toFixed(0),
    });
  }
  return hearts;
}

export default function Background() {
  const stars = useMemo(() => generateStars(55), []);
  const hearts = useMemo(() => generateFloatingHearts(16), []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep wine/plum gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#12040b] via-[#1a0710] to-[#2a0c1b]" />

      {/* Soft glowing ambient drift blobs */}
      <div
        className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] rounded-full bg-rose-deep/20 blur-[120px] animate-blob-drift"
        aria-hidden="true"
      />
      <div
        className="absolute top-[35%] -right-[15%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-rose/15 blur-[140px] animate-blob-drift"
        style={{ animationDelay: '-6s' }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-[20%] left-[25%] w-[65vw] h-[65vw] max-w-[750px] max-h-[750px] rounded-full bg-gold/15 blur-[150px] animate-blob-drift"
        style={{ animationDelay: '-12s' }}
        aria-hidden="true"
      />

      {/* Twinkling stars */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-cream animate-twinkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
              opacity: star.opacity,
              boxShadow: `0 0 ${star.size * 2}px rgba(255, 240, 245, 0.8)`,
            }}
          />
        ))}
      </div>

      {/* Slow-rising floating hearts */}
      <div className="absolute inset-0">
        {hearts.map((h) => (
          <div
            key={h.id}
            className="absolute animate-float-hearts select-none opacity-40 hover:opacity-75 transition-opacity"
            style={{
              left: `${h.left}%`,
              fontSize: `${h.size}px`,
              animationDelay: `${h.delay}s`,
              animationDuration: `${h.duration}s`,
              color: '#ff8fab',
              filter: 'drop-shadow(0 0 8px rgba(251, 111, 146, 0.4))',
            }}
          >
            {h.char}
          </div>
        ))}
      </div>

      {/* Subtle cinematic vignette */}
      <div className="absolute inset-0 vignette" />

      {/* Filmic warm grain texture */}
      <div className="absolute inset-0 film-grain" />
    </div>
  );
}
