import { useState, useEffect, useRef } from "react";

const SOUND_KEY = "breath-sound-enabled";

export const useSound = () => {
  const [enabled, setEnabled] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(SOUND_KEY);
    if (stored !== null) {
      setEnabled(stored === "true");
    }
  }, []);

  const toggleSound = () => {
    const newValue = !enabled;
    setEnabled(newValue);
    localStorage.setItem(SOUND_KEY, newValue.toString());
  };

  const playExhaleSound = () => {
    if (!enabled) return;

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(200, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.6);

    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.6);
  };

  return { enabled, toggleSound, playExhaleSound };
};
