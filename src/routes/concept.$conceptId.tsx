import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { Home, ArrowRight, Sparkles } from "lucide-react";
import { getConcept } from "@/lib/data";
import { OwlMascot } from "@/components/OwlMascot";
import { MathText } from "@/components/MathText";
import { TriangleDiagram } from "@/components/TriangleDiagram";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/concept/$conceptId")({
  component: ConceptPage,
  notFoundComponent: () => <div className="p-10">Not found</div>,
  errorComponent: ({ error }) => <div className="p-10">{error.message}</div>,
});

// Color palette for alternating card accents
const cardColors = [
  { border: "border-l-[oklch(0.55_0.2_250)]", badge: "bg-[oklch(0.55_0.2_250)]", title: "text-[oklch(0.45_0.2_250)]", bg: "bg-[oklch(0.98_0.01_240)]" },
  { border: "border-l-[oklch(0.55_0.18_145)]", badge: "bg-[oklch(0.55_0.18_145)]", title: "text-[oklch(0.4_0.18_145)]", bg: "bg-[oklch(0.98_0.02_145)]" },
  { border: "border-l-[oklch(0.62_0.2_55)]", badge: "bg-[oklch(0.62_0.2_55)]", title: "text-[oklch(0.5_0.2_55)]", bg: "bg-[oklch(0.99_0.02_55)]" },
  { border: "border-l-[oklch(0.55_0.22_295)]", badge: "bg-[oklch(0.55_0.22_295)]", title: "text-[oklch(0.45_0.22_295)]", bg: "bg-[oklch(0.98_0.02_295)]" },
];

/**
 * Parse the lhs string to extract sub-formulas.
 * The lhs text often contains multiple sub-formulas separated by \n,
 * each starting with "Sub-formula N:" or similar patterns.
 */
function parseSubFormulas(lhs: string, explanation: string): { title: string; formula: string; note: string }[] {
  // Try splitting by "Sub-formula" pattern
  const subFormulaRegex = /Sub-formula\s*\d+:\s*/gi;
  const parts = lhs.split(subFormulaRegex).filter(p => p.trim());

  if (parts.length > 1) {
    // Extract titles from the original string
    const titleMatches = [...lhs.matchAll(/Sub-formula\s*\d+:\s*([^\n$]*?)(?:,|\n|$)/gi)];
    return parts.map((part, i) => {
      const lines = part.split("\n").filter(l => l.trim());
      // First line typically has the title + formula mixed
      const firstLine = lines[0] || "";
      // Try to separate title from formula
      const dollarIdx = firstLine.indexOf("$");
      let title = "";
      let formula = "";
      let note = "";

      if (dollarIdx > 0) {
        title = firstLine.substring(0, dollarIdx).trim().replace(/[,:]$/, "").trim();
        formula = firstLine.substring(dollarIdx).trim();
      } else {
        title = firstLine.trim();
        formula = lines.length > 1 ? lines[1] : "";
      }

      // Remaining lines are notes
      const remainingLines = lines.slice(1);
      if (remainingLines.length > 0 && dollarIdx > 0) {
        note = remainingLines.join("\n");
      } else if (remainingLines.length > 1) {
        note = remainingLines.slice(1).join("\n");
      }

      // Clean up: if title has "Note:" prefix
      if (title.toLowerCase().startsWith("note:")) {
        title = title.substring(5).trim();
      }

      return { title: title || `Sub-formula ${i + 1}`, formula, note };
    });
  }

  // If no sub-formula pattern, try splitting by newlines that contain $
  const lines = lhs.split("\n").filter(l => l.trim());
  if (lines.length > 1) {
    return lines.map((line, i) => {
      const dollarIdx = line.indexOf("$");
      if (dollarIdx > 0) {
        const title = line.substring(0, dollarIdx).trim().replace(/[,:]$/, "").trim();
        const formula = line.substring(dollarIdx).trim();
        return { title: title || `Formula ${i + 1}`, formula, note: "" };
      }
      // Entire line is a formula
      if (line.includes("$")) {
        return { title: `Formula ${i + 1}`, formula: line, note: "" };
      }
      return { title: line, formula: "", note: "" };
    });
  }

  // Single formula - use lhs as-is
  return [{ title: "", formula: lhs, note: "" }];
}

function ConceptPage() {
  const { conceptId } = Route.useParams();
  const data = getConcept(conceptId);
  const router = useRouter();
  const nav = useNavigate();
  if (!data) return <div className="p-10">Not found</div>;
  const { concept } = data;

  return (
    <div className="min-h-screen pb-32">
      <div className="mx-auto max-w-md px-5 pt-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => nav({ to: "/" })} className="size-11 rounded-full bg-card border border-border flex items-center justify-center shadow-soft">
            <Home className="size-5 text-[oklch(0.55_0.22_295)]" />
          </button>
          <h1 className="flex-1 text-center text-lg font-extrabold">{concept.title}</h1>
          <OwlMascot size={48} />
        </div>

        {/* Title Banner */}
        <div className="rounded-xl bg-[oklch(0.25_0.08_250)] text-white px-4 py-3 mb-5 flex items-center gap-2">
          <Sparkles className="size-4 text-[oklch(0.8_0.18_85)]" />
          <span className="font-bold text-sm flex-1">{concept.subtitle}</span>
          <Sparkles className="size-4 text-[oklch(0.8_0.18_85)]" />
        </div>

        {/* Formula Cards */}
        <div className="space-y-4">
          {concept.formulas.map((formula, fIdx) => {
            const subFormulas = parseSubFormulas(formula.expression.lhs, formula.explanation);

            // If only one sub-formula, render a single card
            if (subFormulas.length <= 1) {
              const color = cardColors[fIdx % cardColors.length];
              return (
                <div key={formula.id} className={`rounded-xl border border-border ${color.bg} ${color.border} border-l-4 p-4 shadow-soft`}>
                  <div className="flex items-start gap-3">
                    <div className={`size-8 rounded-full ${color.badge} text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5`}>
                      {fIdx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-sm ${color.title} mb-2`}>{formula.name}</p>
                      <div className="rounded-lg bg-white/70 border border-border/50 px-3 py-2 mb-2 overflow-x-auto">
                        <div className="text-sm"><MathText>{subFormulas[0].formula || formula.expression.lhs}</MathText></div>
                      </div>
                      {subFormulas[0].note && (
                        <p className="text-xs text-muted-foreground leading-relaxed"><MathText>{subFormulas[0].note}</MathText></p>
                      )}
                      <p className="text-xs text-muted-foreground leading-relaxed mt-1"><MathText>{formula.explanation}</MathText></p>
                    </div>
                  </div>
                </div>
              );
            }

            // Multiple sub-formulas: render each as its own numbered card
            return (
              <div key={formula.id} className="space-y-3">
                {subFormulas.map((sub, sIdx) => {
                  const globalIdx = fIdx + sIdx;
                  const color = cardColors[globalIdx % cardColors.length];
                  return (
                    <div key={`${formula.id}-${sIdx}`} className={`rounded-xl border border-border ${color.bg} ${color.border} border-l-4 p-4 shadow-soft`}>
                      <div className="flex items-start gap-3">
                        <div className={`size-8 rounded-full ${color.badge} text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5`}>
                          {sIdx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-bold text-sm ${color.title} mb-2`}>{sub.title}</p>
                          {sub.formula && (
                            <div className="rounded-lg bg-white/70 border border-border/50 px-3 py-2 mb-2 overflow-x-auto">
                              <div className="text-sm"><MathText>{sub.formula}</MathText></div>
                            </div>
                          )}
                          {sub.note && (
                            <p className="text-xs text-muted-foreground leading-relaxed"><MathText>{sub.note}</MathText></p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                {/* Explanation after all sub-formulas */}
                <p className="text-xs text-muted-foreground leading-relaxed px-2"><MathText>{formula.explanation}</MathText></p>
              </div>
            );
          })}
        </div>

        {/* Memory Tip / Key Takeaway */}
        {concept.formulas.some(f => f.mnemonic && f.mnemonic.trim()) && (
          <div className="rounded-xl bg-[oklch(0.98_0.06_85)] border border-dashed border-[oklch(0.85_0.12_85)] px-4 py-3 mt-5 flex items-start gap-2.5">
            <span className="text-xl leading-none mt-0.5">💡</span>
            <div>
              <span className="font-bold text-sm text-[oklch(0.5_0.16_85)]">Key Takeaway: </span>
              <span className="text-sm text-foreground/80">
                {concept.formulas.filter(f => f.mnemonic && f.mnemonic.trim()).map(f => f.mnemonic).join(" ")}
              </span>
            </div>
          </div>
        )}

        {/* Trigonometry special diagram */}
        {data.chapter.id === "trigonometry" && (
          <div className="my-8"><TriangleDiagram /></div>
        )}

        {/* Start Practice Button */}
        <div className="flex justify-center mt-8">
          <button onClick={() => nav({ to: "/quiz/$conceptId", params: { conceptId } })}
            className="px-6 h-12 rounded-xl gradient-algebra text-white font-bold text-base shadow-card flex items-center justify-center gap-2 active:scale-[0.98]">
            Start Practice Questions <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
