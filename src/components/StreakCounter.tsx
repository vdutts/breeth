import { motion } from "framer-motion";

interface StreakCounterProps {
  streak: number;
}

export const StreakCounter = ({ streak }: StreakCounterProps) => {
  if (streak === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-20"
    >
      <div className="px-6 py-3 rounded-full bg-card/80 backdrop-blur-md border border-border/50 shadow-lg">
        <p className="text-lg font-medium text-foreground">
          🔥 <span className="font-semibold">{streak}</span> day streak
        </p>
      </div>
    </motion.div>
  );
};
