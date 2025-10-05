import { motion } from "framer-motion";
import { Volume2, VolumeX, Smartphone } from "lucide-react";

interface ControlToggleProps {
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  onToggleSound: () => void;
  onToggleHaptics: () => void;
}

export const ControlToggle = ({
  soundEnabled,
  hapticsEnabled,
  onToggleSound,
  onToggleHaptics,
}: ControlToggleProps) => {
  return (
    <div className="fixed top-6 right-6 z-20 flex gap-3">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onToggleSound}
        className="w-12 h-12 rounded-full bg-card/80 backdrop-blur-md border border-border/50 shadow-lg flex items-center justify-center text-foreground hover:bg-card transition-smooth"
        aria-label="Toggle sound"
      >
        {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onToggleHaptics}
        className="w-12 h-12 rounded-full bg-card/80 backdrop-blur-md border border-border/50 shadow-lg flex items-center justify-center text-foreground hover:bg-card transition-smooth"
        aria-label="Toggle haptics"
      >
        <Smartphone size={20} className={hapticsEnabled ? "" : "opacity-50"} />
      </motion.button>
    </div>
  );
};
