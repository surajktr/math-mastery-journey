import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb } from "lucide-react";
import type { Formula } from "@/lib/data";
import { FormulaCard } from "./FormulaCard";
import { MathText } from "./MathText";

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
            className="w-full max-w-md max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] bg-card rounded-t-3xl p-6 pb-8 flex flex-col"
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
            <div className="bg-[oklch(0.98_0.03_85)] rounded-2xl p-4 mb-4 shrink-0">
              <FormulaCard formula={formula} compact />
            </div>
            
            {/* Extract ONLY images from all text fields */}
            {(() => {
              const extractImages = (text: string) => {
                const matches = (text || "").match(/!\[([^\]]*)\]\(([^)]+)\)/g);
                return matches ? matches.join("\n") : "";
              };
              
              const allImages = [
                extractImages(formula.descriptionAbove || ""),
                extractImages(formula.descriptionBelow || ""),
                extractImages(formula.explanation || ""),
                extractImages(formula.mnemonic || ""),
              ].filter(Boolean).join("\n");

              if (!allImages && !formula.mnemonic) return null;

              return (
                <div className="text-center w-full flex flex-col items-center mb-6">
                  {allImages && <MathText>{allImages}</MathText>}
                  {formula.mnemonic && !extractImages(formula.mnemonic) && (
                     <div className="text-sm italic text-muted-foreground mt-4">
                       <MathText>{formula.mnemonic}</MathText>
                     </div>
                  )}
                </div>
              );
            })()}
            <button
              onClick={onClose}
              className="w-full h-14 shrink-0 mt-auto rounded-2xl bg-primary text-primary-foreground font-bold text-lg shadow-card active:scale-[0.98] transition"
            >
              Got it! Back to question
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
