import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb } from "lucide-react";
import type { Formula } from "@/lib/data";
import { FormulaCard } from "./FormulaCard";

export function HintSheet({ open, onClose, formula }: { open: boolean; onClose: () => void; formula: Formula | null }) {
  return (
    <AnimatePresence>
      {open && formula && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center"
          initial={{ backgroundColor: "rgba(0,0,0,0)" }}
          animate={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          exit={{ backgroundColor: "rgba(0,0,0,0)" }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-md bg-card rounded-t-3xl p-6 pb-8"
            initial={{ y: 400 }}
            animate={{ y: 0 }}
            exit={{ y: 400 }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto h-1.5 w-12 rounded-full bg-muted mb-5" />
            <div className="flex flex-col items-center gap-3 mb-4">
              <div className="size-14 rounded-2xl bg-[oklch(0.97_0.08_85)] flex items-center justify-center">
                <Lightbulb className="size-8 text-[oklch(0.7_0.18_85)]" fill="oklch(0.85_0.16_85)" />
              </div>
              <h3 className="text-2xl font-extrabold">Quick Hint</h3>
            </div>
            <div className="bg-[oklch(0.98_0.03_85)] rounded-2xl p-4 mb-4">
              <FormulaCard formula={formula} compact />
            </div>
            <p className="text-center text-sm italic text-muted-foreground mb-6">{formula.mnemonic}</p>
            <button
              onClick={onClose}
              className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-bold text-lg shadow-card active:scale-[0.98] transition"
            >
              Got it! Back to question
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
