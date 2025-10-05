import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type BreathPhase = "inhale" | "hold" | "exhale" | "rest";

const BREATH_TIMING = {
  inhale: 4000,
  hold: 7000,
  exhale: 8000,
  rest: 1000,
};

export const BreathingCircle = () => {
  const [phase, setPhase] = useState<BreathPhase>("rest");
  const [isActive, setIsActive] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const runBreathCycle = async () => {
      // Inhale
      setPhase("inhale");
      await new Promise((resolve) => setTimeout(resolve, BREATH_TIMING.inhale));

      // Hold
      setPhase("hold");
      await new Promise((resolve) => setTimeout(resolve, BREATH_TIMING.hold));

      // Exhale
      setPhase("exhale");
      await new Promise((resolve) => setTimeout(resolve, BREATH_TIMING.exhale));

      // Rest
      setPhase("rest");
      await new Promise((resolve) => setTimeout(resolve, BREATH_TIMING.rest));

      setCycleCount((prev) => prev + 1);
    };

    runBreathCycle();
  }, [isActive, cycleCount]);

  const handleStart = () => {
    setIsActive(true);
    setCycleCount(0);
  };

  const handleStop = () => {
    setIsActive(false);
    setPhase("rest");
    setCycleCount(0);
  };

  const getPhaseText = () => {
    switch (phase) {
      case "inhale":
        return "breathe in";
      case "hold":
        return "hold";
      case "exhale":
        return "breathe out";
      default:
        return "ready";
    }
  };

  const getPhaseScale = () => {
    switch (phase) {
      case "inhale":
        return 1.5;
      case "hold":
        return 1.5;
      case "exhale":
        return 1;
      default:
        return 1;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 gradient-breath">
      <div className="flex flex-col items-center gap-12 w-full max-w-md">
        {/* Breathing Circle */}
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
          {/* Outer glow rings */}
          <motion.div
            className="absolute inset-0 rounded-full gradient-calm opacity-20"
            animate={{
              scale: isActive ? [1, 1.2, 1] : 1,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full gradient-calm opacity-10"
            animate={{
              scale: isActive ? [1, 1.4, 1] : 1,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />

          {/* Main breathing circle */}
          <motion.div
            className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-full gradient-calm glow-strong flex items-center justify-center"
            animate={{
              scale: getPhaseScale(),
            }}
            transition={{
              duration:
                phase === "inhale"
                  ? BREATH_TIMING.inhale / 1000
                  : phase === "exhale"
                  ? BREATH_TIMING.exhale / 1000
                  : 0.5,
              ease: [0.4, 0, 0.6, 1],
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <p className="text-2xl sm:text-3xl font-light text-white tracking-wide">
                  {getPhaseText()}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Counter */}
        {isActive && cycleCount > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted-foreground text-sm font-medium"
          >
            {cycleCount} {cycleCount === 1 ? "breath" : "breaths"}
          </motion.div>
        )}

        {/* Control Button */}
        <motion.button
          onClick={isActive ? handleStop : handleStart}
          className="px-12 py-4 rounded-full bg-card text-foreground font-medium text-lg shadow-lg hover:shadow-xl transition-smooth backdrop-blur-sm border border-border/50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isActive ? "pause" : "begin"}
        </motion.button>

        {/* Subtle instruction */}
        {!isActive && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground text-sm text-center max-w-xs font-light"
          >
            4-7-8 breathing technique for calm and focus
          </motion.p>
        )}
      </div>
    </div>
  );
};
