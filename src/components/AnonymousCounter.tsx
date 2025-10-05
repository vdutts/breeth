import { motion } from "framer-motion";

interface AnonymousCounterProps {
  count: number;
}

export const AnonymousCounter = ({ count }: AnonymousCounterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="fixed bottom-6 right-6 z-10"
    >
      <div className="px-5 py-3 rounded-2xl bg-card/40 backdrop-blur-xl border border-border/30 glow-stat">
        <p className="text-xs font-light text-muted-foreground/80 mb-0.5">live</p>
        <p className="text-lg font-semibold text-foreground tabular-nums">
          {count.toLocaleString()}
        </p>
        <p className="text-xs font-light text-muted-foreground/60">breethin</p>
      </div>
    </motion.div>
  );
};
