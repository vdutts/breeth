import { motion } from "framer-motion";

interface StreakCounterProps {
  streak: number;
}

export const StreakCounter = ({ streak }: StreakCounterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-6 left-6 z-20"
    >
      <div className="px-5 py-3 rounded-2xl bg-card/40 backdrop-blur-xl border border-border/30 glow-stat">
        <p className="text-xs font-light text-muted-foreground/80 mb-0.5">streak</p>
        <p className="text-lg font-semibold text-foreground tabular-nums">
          🔥 {streak}
        </p>
        <p className="text-xs font-light text-muted-foreground/60">days</p>
      </div>
    </motion.div>
  );
};
