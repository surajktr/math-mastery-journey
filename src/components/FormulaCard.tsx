import { useRef, useLayoutEffect, useState } from "react";
import type { Formula } from "@/lib/data";
import { MathText } from "./MathText";

const colorMap: Record<string, string> = {
  info: "text-[oklch(0.55_0.2_250)]",
  success: "text-[oklch(0.55_0.18_145)]",
  warning: "text-[oklch(0.62_0.2_55)]",
};

function AutoFitText({ children, className, maxSize = 24, minSize = 9 }: {
  children: React.ReactNode;
  className?: string;
  maxSize?: number;
  minSize?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(maxSize);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    let size = maxSize;
    content.style.fontSize = `${size}px`;

    // Shrink until it fits or hits minSize
    while (content.scrollWidth > container.clientWidth && size > minSize) {
      size -= 0.5;
      content.style.fontSize = `${size}px`;
    }
    setFontSize(size);
  }, [children, maxSize, minSize]);

  return (
    <div ref={containerRef} className="max-w-full overflow-hidden flex items-center justify-center shrink min-w-0">
      <div
        ref={contentRef}
        style={{ fontSize: `${fontSize}px`, whiteSpace: "nowrap" }}
        className={className}
      >
        {children}
      </div>
    </div>
  );
}

export function FormulaCard({ formula, compact = false }: { formula: Formula; compact?: boolean }) {
  const c = colorMap[formula.expression.color] ?? "text-foreground";
  const { lhs, num, den } = formula.expression;

  const maxSize = compact ? 16 : 22;
  const minSize = compact ? 8 : 9;

  const renderedLhs = `$${lhs}$`;

  return (
    <div className={`rounded-2xl border border-border bg-[oklch(0.98_0.01_240)] ${compact ? "p-1.5" : "p-2.5"} w-full`}>
      {(num || den) ? (
        // Has fraction part — show lhs = num/den
        <div className="flex items-center justify-center gap-2 sm:gap-3 w-full">
          <AutoFitText maxSize={maxSize} minSize={minSize} className={`${c} font-bold italic`}>
            <MathText>{renderedLhs}</MathText>
          </AutoFitText>
          <AutoFitText maxSize={maxSize} minSize={minSize} className="text-muted-foreground">
            <span>=</span>
          </AutoFitText>
          {num ? (
            <div className="flex flex-col items-center shrink-0">
              <span className={`${c} font-bold`} style={{ fontSize: `${Math.max(minSize, maxSize - 4)}px` }}>
                <MathText>{`$${num}$`}</MathText>
              </span>
              <span className="block w-full border-t-2 border-foreground/40 my-0.5" />
              <span className={`${c} font-bold`} style={{ fontSize: `${Math.max(minSize, maxSize - 4)}px` }}>
                <MathText>{`$${den}$`}</MathText>
              </span>
            </div>
          ) : (
            <span className={`${c} font-bold shrink-0`} style={{ fontSize: `${maxSize}px` }}>
              <MathText>{`$${den}$`}</MathText>
            </span>
          )}
        </div>
      ) : (
        // Simple formula — auto-fit lhs on one line
        <AutoFitText maxSize={maxSize} minSize={minSize} className={`${c} font-bold italic`}>
          <MathText>{renderedLhs}</MathText>
        </AutoFitText>
      )}
    </div>
  );
}
