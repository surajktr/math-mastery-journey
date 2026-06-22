import type { Formula } from "@/lib/data";
import { MathText } from "./MathText";

const colorMap: Record<string, string> = {
  info: "text-[oklch(0.55_0.2_250)]",
  success: "text-[oklch(0.55_0.18_145)]",
  warning: "text-[oklch(0.62_0.2_55)]",
};

export function FormulaCard({ formula, compact = false }: { formula: Formula; compact?: boolean }) {
  const c = colorMap[formula.expression.color] ?? "text-foreground";
  const { lhs, num, den } = formula.expression;
  const isTextMode = lhs.length > 50 && !num && !den;

  return (
    <div className={`rounded-2xl border border-border bg-[oklch(0.98_0.01_240)] overflow-x-auto ${compact ? "p-3" : "p-4"}`}>
      {isTextMode ? (
        <div className={`${c} text-sm font-medium whitespace-pre-wrap leading-relaxed`}><MathText>{lhs}</MathText></div>
      ) : (
        <div className="flex items-center justify-center gap-4 sm:gap-6">
          <span className={`${c} ${compact ? "text-2xl" : "text-4xl"} font-bold italic`}><MathText>{lhs}</MathText></span>
          <span className={`${compact ? "text-2xl" : "text-4xl"} text-muted-foreground`}>=</span>
          {num ? (
            <div className="flex flex-col items-center">
              <span className={`${c} ${compact ? "text-lg" : "text-2xl"} font-bold`}><MathText>{num}</MathText></span>
              <span className="block w-full border-t-2 border-foreground/40 my-1" />
              <span className={`${c} ${compact ? "text-lg" : "text-2xl"} font-bold`}><MathText>{den}</MathText></span>
            </div>
          ) : (
            <span className={`${c} ${compact ? "text-2xl" : "text-3xl"} font-bold`}><MathText>{den}</MathText></span>
          )}
        </div>
      )}
    </div>
  );
}
