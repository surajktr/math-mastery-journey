import type { Formula } from "@/lib/data";

const colorMap: Record<string, string> = {
  info: "text-[oklch(0.55_0.2_250)]",
  success: "text-[oklch(0.55_0.18_145)]",
  warning: "text-[oklch(0.62_0.2_55)]",
};

export function FormulaCard({ formula, compact = false }: { formula: Formula; compact?: boolean }) {
  const c = colorMap[formula.expression.color] ?? "text-foreground";
  const { lhs, num, den } = formula.expression;
  return (
    <div className={`rounded-2xl border border-border bg-[oklch(0.98_0.01_240)] ${compact ? "p-4" : "p-6"}`}>
      <div className="flex items-center justify-center gap-4 sm:gap-6">
        <span className={`${c} ${compact ? "text-2xl" : "text-4xl"} font-bold italic`}>{lhs}</span>
        <span className={`${compact ? "text-2xl" : "text-4xl"} text-muted-foreground`}>=</span>
        {num ? (
          <div className="flex flex-col items-center">
            <span className={`${c} ${compact ? "text-lg" : "text-2xl"} font-bold`}>{num}</span>
            <span className="block w-full border-t-2 border-foreground/40 my-1" />
            <span className={`${c} ${compact ? "text-lg" : "text-2xl"} font-bold`}>{den}</span>
          </div>
        ) : (
          <span className={`${c} ${compact ? "text-2xl" : "text-3xl"} font-bold`}>{den}</span>
        )}
      </div>
    </div>
  );
}
