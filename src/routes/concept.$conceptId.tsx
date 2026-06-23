import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { Home, ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { getConcept } from "@/lib/data";
import { OwlMascot } from "@/components/OwlMascot";
import { FormulaCard } from "@/components/FormulaCard";
import { MathText } from "@/components/MathText";
import { TriangleDiagram } from "@/components/TriangleDiagram";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/concept/$conceptId")({
  component: ConceptPage,
  notFoundComponent: () => <div className="p-10">Not found</div>,
  errorComponent: ({ error }) => <div className="p-10">{error.message}</div>,
});

function ConceptPage() {
  const { conceptId } = Route.useParams();
  const data = getConcept(conceptId);
  const router = useRouter();
  const nav = useNavigate();
  const [idx, setIdx] = useState(0);
  if (!data) return <div className="p-10">Not found</div>;
  const { concept } = data;
  const total = concept.formulas.length || 6;
  const formula = concept.formulas[idx];
  const isLast = idx === concept.formulas.length - 1;

  return (
    <div className="min-h-screen pb-32">
      <div className="mx-auto max-w-md px-5 pt-6">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => nav({ to: "/" })} className="size-11 rounded-full bg-card border border-border flex items-center justify-center shadow-soft">
            <Home className="size-5 text-[oklch(0.55_0.22_295)]" />
          </button>
          <h1 className="flex-1 text-center text-xl font-extrabold">{concept.title}</h1>
          <OwlMascot size={48} />
        </div>

        <div className="flex items-center gap-2 mb-6">
          <div className="flex-1 flex gap-1.5">
            {Array.from({ length: total }).map((_, i) => (
              <div key={i} className={`h-2 flex-1 rounded-full ${i <= idx ? "bg-[oklch(0.55_0.22_295)]" : "bg-muted"}`} />
            ))}
          </div>
          <span className="text-sm font-bold text-[oklch(0.55_0.22_295)]">{idx + 1} of {total}</span>
        </div>

        {formula ? (
          <>
            {formula.descriptionAbove && (
              <div className="mb-4 text-sm leading-relaxed whitespace-pre-wrap"><MathText>{formula.descriptionAbove}</MathText></div>
            )}
            <FormulaCard formula={formula} />
            {formula.descriptionBelow && (
              <div className="mt-4 text-sm leading-relaxed whitespace-pre-wrap"><MathText>{formula.descriptionBelow}</MathText></div>
            )}

            {formula.example && formula.example.trim() !== "" && (
              <div className="mt-5 rounded-2xl border-2 border-[oklch(0.85_0.1_200)] bg-[oklch(0.97_0.02_200)] p-4 shadow-soft">
                <p className="text-sm font-extrabold text-[oklch(0.4_0.15_200)] mb-2 flex items-center gap-1.5">
                  <span className="text-base leading-none">📝</span> Example
                </p>
                <div className="text-sm leading-relaxed text-foreground/80 whitespace-pre-wrap"><MathText>{formula.example}</MathText></div>
              </div>
            )}

            {formula.mnemonic && formula.mnemonic.trim() !== "" && (
              <div className="flex justify-center w-full mt-4 mb-2">
                <div className="rounded-xl bg-[oklch(0.98_0.06_85)] border border-[oklch(0.9_0.1_85)] px-4 py-3 inline-block">
                  <p className="text-sm font-bold text-[oklch(0.5_0.16_85)] flex items-center justify-center gap-1.5">
                    <span className="text-base leading-none">💡</span> Memory Tip
                  </p>
                  <p className="italic mt-1 text-sm text-center">{formula.mnemonic}</p>
                </div>
              </div>
            )}

            <div className="mt-4 text-sm leading-relaxed"><MathText>{formula.explanation}</MathText></div>
            {data.chapter.id === "trigonometry" && (
              <>
                <p className="mt-2 text-sm leading-relaxed">They are the foundation of trigonometry!</p>
                <div className="my-8"><TriangleDiagram /></div>
              </>
            )}

            <div className="flex items-center justify-center gap-3 mt-8">
              {idx > 0 && (
                <button onClick={() => setIdx((i) => Math.max(0, i - 1))}
                  className="size-11 rounded-full bg-card border border-border shrink-0 flex items-center justify-center shadow-soft">
                  <ArrowLeft className="size-4" />
                </button>
              )}
              {isLast ? (
                <button onClick={() => nav({ to: "/quiz/$conceptId", params: { conceptId } })}
                  className="px-6 h-12 rounded-xl gradient-algebra text-white font-bold text-base shadow-card flex items-center justify-center gap-2 active:scale-[0.98]">
                  Start Practice Questions <ArrowRight className="size-4" />
                </button>
              ) : (
                <button onClick={() => setIdx((i) => Math.min(concept.formulas.length - 1, i + 1))}
                  className="px-6 h-12 rounded-xl bg-primary text-primary-foreground font-bold text-base shadow-card flex items-center justify-center gap-2 active:scale-[0.98]">
                  Next <ArrowRight className="size-4" />
                </button>
              )}
            </div>
          </>
        ) : (
          <p className="text-center text-muted-foreground py-10">Formulas coming soon!</p>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
