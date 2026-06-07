"use client";

import { motion, AnimatePresence } from "framer-motion";

const DOT_COLORS = ["#FFB74D", "#E57373", "#8D6E63"];

export default function Loader({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-2xl"
        >
          {/* Dots */}
          <div className="flex items-center gap-4 mb-8">
            {DOT_COLORS.map((color, i) => (
              <motion.span
                key={i}
                style={{ backgroundColor: color }}
                className="w-5 h-5 rounded-full block shadow-lg"
                animate={{
                  y: [0, -18, 0],
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  delay: i * 0.18,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Text */}
          <motion.p
            className="text-white/70 text-lg font-semibold tracking-widest uppercase"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            Mixing the juice
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            >
              …
            </motion.span>
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
