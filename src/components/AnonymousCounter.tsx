import { motion } from "framer-motion";

interface AnonymousCounterProps {
  count: number;
}

export const AnonymousCounter = ({ count }: AnonymousCounterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10"
    >
      <p className="text-sm text-muted-foreground font-light">
        {count.toLocaleString()} people breathing right now
      </p>
    </motion.div>
  );
};
