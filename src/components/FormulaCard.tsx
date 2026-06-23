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
  
  const totalLen = lhs.length + (num?.length || 0) + (den?.length || 0);
  const isTextMode = lhs.length > 50 && !num && !den && !lhs.includes("\\");

  let baseSize = compact ? "text-lg" : "text-3xl";
  let numDenSize = compact ? "text-base" : "text-xl";
  let denOnlySize = compact ? "text-lg" : "text-2xl";

  if (totalLen >= 50) {
    baseSize = compact ? "text-xs" : "text-base";
    numDenSize = compact ? "text-[10px]" : "text-xs";
    denOnlySize = compact ? "text-xs" : "text-sm";
  } else if (totalLen >= 30) {
    baseSize = compact ? "text-sm" : "text-xl";
    numDenSize = compact ? "text-xs" : "text-base";
    denOnlySize = compact ? "text-sm" : "text-lg";
  } else if (totalLen >= 15) {
    baseSize = compact ? "text-base" : "text-2xl";
    numDenSize = compact ? "text-sm" : "text-lg";
    denOnlySize = compact ? "text-base" : "text-xl";
  }

  // Wrap lhs in $ so MathText renders it as KaTeX math
  const renderedLhs = `$${lhs}$`;

  return (
    <div className={`rounded-2xl border border-border bg-[oklch(0.98_0.01_240)] overflow-x-auto ${compact ? "p-1.5" : "p-2.5"} flex justify-center text-center`}>
      {isTextMode ? (
        <div className={`${c} ${baseSize} font-medium whitespace-pre-wrap leading-relaxed`}><MathText>{renderedLhs}</MathText></div>
      ) : (
        <div className="flex items-center justify-center gap-2 sm:gap-3 w-max mx-auto">
          <span className={`${c} ${baseSize} font-bold italic`}><MathText>{renderedLhs}</MathText></span>
          {(num || den) && (
            <>
              <span className={`${baseSize} text-muted-foreground`}>=</span>
              {num ? (
                <div className="flex flex-col items-center">
                  <span className={`${c} ${numDenSize} font-bold`}><MathText>{`$${num}$`}</MathText></span>
                  <span className="block w-full border-t-2 border-foreground/40 my-0.5" />
                  <span className={`${c} ${numDenSize} font-bold`}><MathText>{`$${den}$`}</MathText></span>
                </div>
              ) : (
                <span className={`${c} ${denOnlySize} font-bold`}><MathText>{`$${den}$`}</MathText></span>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
