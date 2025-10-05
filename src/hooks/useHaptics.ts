import { useState, useEffect } from "react";

const HAPTICS_KEY = "breath-haptics-enabled";

export const useHaptics = () => {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(HAPTICS_KEY);
    if (stored !== null) {
      setEnabled(stored === "true");
    }
  }, []);

  const toggleHaptics = () => {
    const newValue = !enabled;
    setEnabled(newValue);
    localStorage.setItem(HAPTICS_KEY, newValue.toString());
  };

  const vibrate = (pattern: number | number[]) => {
    if (enabled && "vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
  };

  return { enabled, toggleHaptics, vibrate };
};
