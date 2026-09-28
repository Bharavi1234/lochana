import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { CONFIG } from '../config';

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAudioSource, setHasAudioSource] = useState(true);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          // Handled gracefully if browser blocks autoplay or song file is absent
          console.warn('Audio play notice:', err.message);
          setIsPlaying(false);
        });
    }
  };

  if (!CONFIG.music.enabled || !hasAudioSource) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <audio
        ref={audioRef}
        src={CONFIG.music.src}
        loop
        preload="auto"
        onError={() => {
          // If song.mp3 is not present in /public, button remains disabled gracefully
          setHasAudioSource(false);
        }}
      />
      <button
        onClick={togglePlay}
        title={isPlaying ? 'Mute Music' : 'Play Music'}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-wine-950/70 border border-rose/30 text-cream/80 hover:text-cream hover:border-rose/60 backdrop-blur-md shadow-lg transition-all duration-300 text-xs sm:text-sm cursor-pointer select-none"
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-rose animate-pulse" />
            <span className="hidden sm:inline text-xs text-rose">{CONFIG.music.label}</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-cream/50" />
            <span className="hidden sm:inline text-xs text-cream/60">Music</span>
          </>
        )}
      </button>
    </div>
  );
}
