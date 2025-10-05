import { useState, useEffect } from "react";

export const useAnonymousCounter = () => {
  const [count, setCount] = useState(Math.floor(Math.random() * 4000) + 1000);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        const change = Math.floor(Math.random() * 20) - 10;
        const newCount = prev + change;
        return Math.max(1000, Math.min(5000, newCount));
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return count;
};
