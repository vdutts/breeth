import { motion, AnimatePresence } from "framer-motion";
import { Share2 } from "lucide-react";

interface ShareScreenProps {
  isOpen: boolean;
  breathCount: number;
  onClose: () => void;
}

export const ShareScreen = ({ isOpen, breathCount, onClose }: ShareScreenProps) => {
  const handleShare = async () => {
    const text = `I just took ${breathCount} mindful breeth${breathCount === 1 ? "" : "s"} 🌬️✨`;
    
    if (navigator.share) {
      try {
        await navigator.share({ text });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center gradient-breath"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="text-center px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mb-8"
            >
              <div className="w-32 h-32 mx-auto rounded-full gradient-calm glow-strong" />
            </motion.div>

            <h2 className="text-4xl sm:text-5xl font-light text-foreground mb-4">
              Nice work
            </h2>
            <p className="text-xl text-muted-foreground font-light mb-12">
              You took {breathCount} mindful breeth{breathCount === 1 ? "" : "s"}
            </p>

            <button
              onClick={handleShare}
              className="px-8 py-4 rounded-full bg-card text-foreground font-medium text-lg shadow-xl hover:shadow-2xl transition-smooth backdrop-blur-sm border border-border/50 flex items-center gap-3 mx-auto"
            >
              <Share2 size={20} />
              Share
            </button>

            <button
              onClick={onClose}
              className="mt-8 text-muted-foreground text-sm font-light"
            >
              Continue breethin
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
