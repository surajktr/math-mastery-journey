import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { listChapters, saveChapter } from "@/lib/admin-api";
import type { Concept, Chapter } from "@/lib/data";
import { useState, useEffect } from "react";
import { ArrowLeft, ChevronRight, Save, FileJson, CheckCircle2 } from "lucide-react";
import { SmartTextEditor } from "@/components/admin/SmartTextEditor";

export const Route = createFileRoute("/admin/concept/$chapterId/$conceptId")({
  component: ConceptEditor,
  loader: async ({ params }) => {
    const chapters = await listChapters();
    const ch = chapters.find(c => c.id === params.chapterId);
    const co = ch?.concepts.find(c => c.id === params.conceptId);
    return { chapter: ch, concept: co };
  },
});

function ConceptEditor() {
  const { chapter: initialChapter, concept: initialConcept } = Route.useLoaderData();
  const [chapter, setChapter] = useState<Chapter | null>(initialChapter ?? null);
  const [concept, setConcept] = useState<Concept | null>(initialConcept ?? null);
  
  const [showJsonPaste, setShowJsonPaste] = useState(false);
  const [jsonInput, setJsonInput] = useState("");
  
  const router = useRouter();
  const save = useServerFn(saveChapter);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setChapter(initialChapter ?? null);
    setConcept(initialConcept ?? null);
  }, [initialChapter, initialConcept]);

  if (!chapter || !concept) return <div>Not found</div>;

  const handleSave = async () => {
    setSaving(true);
    try {
      const updatedConcepts = chapter.concepts.map(c => c.id === concept.id ? concept : c);
      const updatedChapter = { ...chapter, concepts: updatedConcepts };
      await save({ data: updatedChapter });
      alert("Concept saved successfully!");
      router.invalidate();
    } catch (e) {
      alert("Failed to save concept");
    } finally {
      setSaving(false);
    }
  };

  const handleJsonImport = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setConcept({ ...concept, ...parsed, id: concept.id }); // preserve ID
      setShowJsonPaste(false);
      setJsonInput("");
    } catch (e) {
      alert("Invalid JSON format!");
    }
  };

  const updateFormula = (formulaId: string, field: string, value: any) => {
    setConcept(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        formulas: prev.formulas.map(f => {
          if (f.id === formulaId) {
            if (field.includes(".")) {
              const [parent, child] = field.split(".");
              return { ...f, [parent]: { ...(f as any)[parent], [child]: value } };
            }
            return { ...f, [field]: value };
          }
          return f;
        })
      };
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/admin" className="text-muted-foreground hover:text-foreground">Dashboard</Link>
        <ChevronRight className="size-4 text-muted-foreground" />
        <Link to={`/admin/chapter/${chapter.id}`} className="text-muted-foreground hover:text-foreground">{chapter.title}</Link>
        <ChevronRight className="size-4 text-muted-foreground" />
        <h2 className="text-2xl font-black tracking-tight">{concept.title || "Editing Concept"}</h2>
        
        <div className="ml-auto flex gap-3">
          <button 
            onClick={() => setShowJsonPaste(!showJsonPaste)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground font-bold rounded-xl hover:bg-secondary/80 transition-colors"
          >
            <FileJson className="size-5" /> {showJsonPaste ? "Hide JSON" : "Paste JSON"}
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Save className="size-5" /> {saving ? "Saving..." : "Save Concept"}
          </button>
        </div>
      </div>

      {showJsonPaste && (
        <div className="bg-[oklch(0.2_0_0)] text-white p-6 rounded-2xl shadow-xl">
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><FileJson /> Paste Concept JSON</h3>
          <p className="text-white/70 text-sm mb-4">Paste the full JSON object for this concept. Use <code>[IMAGE]</code> in text fields if you want to paste images later.</p>
          <textarea 
            value={jsonInput}
            onChange={e => setJsonInput(e.target.value)}
            className="w-full h-64 bg-black/50 border border-white/20 rounded-xl p-4 font-mono text-sm text-green-400 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder='{ "title": "...", "formulas": [...] }'
          />
          <div className="mt-4 flex justify-end">
            <button onClick={handleJsonImport} className="px-6 py-2 bg-primary text-white font-bold rounded-xl flex items-center gap-2">
              <CheckCircle2 className="size-5" /> Apply JSON
            </button>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
        <h3 className="font-bold text-lg border-b pb-2 mb-4">Concept Info</h3>
        <div className="grid grid-cols-2 gap-4">
          <SmartTextEditor label="Title" value={concept.title} onChange={v => setConcept({...concept, title: v})} />
          <SmartTextEditor label="Subtitle" value={concept.subtitle} onChange={v => setConcept({...concept, subtitle: v})} />
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="font-black text-2xl">Formulas & Content</h3>
        {concept.formulas?.map((formula, idx) => (
          <div key={formula.id} className="bg-white p-6 rounded-2xl border shadow-sm">
            <h4 className="font-bold text-xl mb-4 border-b pb-2 text-primary">Formula {idx + 1}: {formula.name || "Untitled"}</h4>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <SmartTextEditor label="Formula Name" value={formula.name} onChange={v => updateFormula(formula.id, "name", v)} />
                <SmartTextEditor label="Expression (LHS)" value={formula.expression.lhs} onChange={v => updateFormula(formula.id, "expression.lhs", v)} />
                <SmartTextEditor label="Expression (Numerator)" value={formula.expression.num} onChange={v => updateFormula(formula.id, "expression.num", v)} />
                <SmartTextEditor label="Expression (Denominator)" value={formula.expression.den} onChange={v => updateFormula(formula.id, "expression.den", v)} />
              </div>
              <div className="space-y-4">
                <SmartTextEditor label="Description Above" multiline value={formula.descriptionAbove || ""} onChange={v => updateFormula(formula.id, "descriptionAbove", v)} />
                <SmartTextEditor label="Description Below" multiline value={formula.descriptionBelow || ""} onChange={v => updateFormula(formula.id, "descriptionBelow", v)} />
                <SmartTextEditor label="Explanation" multiline value={formula.explanation} onChange={v => updateFormula(formula.id, "explanation", v)} />
                <SmartTextEditor label="Example" multiline value={formula.example || ""} onChange={v => updateFormula(formula.id, "example", v)} />
              </div>
            </div>

            {formula.questions?.length > 0 && (
              <div className="mt-8">
                <h5 className="font-bold text-lg mb-4 text-muted-foreground">Questions ({formula.questions.length})</h5>
                <div className="space-y-4">
                  {formula.questions.map((q, qIdx) => (
                    <div key={q.id} className="p-4 bg-muted/20 border rounded-xl">
                      <SmartTextEditor 
                        label={`Q${qIdx + 1} Text`} 
                        multiline 
                        value={q.text} 
                        onChange={v => {
                          const newQs = [...formula.questions];
                          newQs[qIdx].text = v;
                          updateFormula(formula.id, "questions", newQs);
                        }} 
                      />
                      {q.solution && (
                        <div className="mt-4 pt-4 border-t border-dashed">
                          <SmartTextEditor 
                            label="Solution" 
                            multiline 
                            value={q.solution} 
                            onChange={v => {
                              const newQs = [...formula.questions];
                              newQs[qIdx].solution = v;
                              updateFormula(formula.id, "questions", newQs);
                            }} 
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        {(!concept.formulas || concept.formulas.length === 0) && (
          <div className="p-8 border-2 border-dashed rounded-2xl text-center text-muted-foreground font-bold bg-white">
            No formulas yet. Paste JSON to add them!
          </div>
        )}
      </div>
    </div>
  );
}
