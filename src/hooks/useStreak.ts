import { useState, useEffect } from "react";

const STREAK_KEY = "breath-streak";
const LAST_SESSION_KEY = "breath-last-session";

export const useStreak = () => {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const storedStreak = localStorage.getItem(STREAK_KEY);
    const lastSession = localStorage.getItem(LAST_SESSION_KEY);
    
    if (lastSession) {
      const lastDate = new Date(lastSession);
      const today = new Date();
      const isToday = lastDate.toDateString() === today.toDateString();
      const isYesterday = new Date(today.setDate(today.getDate() - 1)).toDateString() === lastDate.toDateString();
      
      if (isToday) {
        setStreak(parseInt(storedStreak || "0"));
      } else if (!isYesterday) {
        // Reset streak if missed a day
        localStorage.setItem(STREAK_KEY, "0");
        setStreak(0);
      } else {
        setStreak(parseInt(storedStreak || "0"));
      }
    }
  }, []);

  const incrementStreak = () => {
    const today = new Date().toDateString();
    const lastSession = localStorage.getItem(LAST_SESSION_KEY);
    
    if (!lastSession || new Date(lastSession).toDateString() !== today) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      localStorage.setItem(STREAK_KEY, newStreak.toString());
      localStorage.setItem(LAST_SESSION_KEY, new Date().toISOString());
    }
  };

  return { streak, incrementStreak };
};
