import { createFileRoute, Link, useRouter, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { listChapters, saveChapter } from "@/lib/admin-api";
import type { Chapter, Concept } from "@/lib/data";
import { useState, useEffect } from "react";
import { ArrowLeft, Plus, Save, ChevronRight, GripVertical, FileJson, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/admin/chapter/$chapterId")({
  component: ChapterEditor,
  loader: async ({ params }) => {
    const chapters = await listChapters();
    let ch = chapters.find(c => c.id === params.chapterId);
    if (!ch && params.chapterId === "new") {
      ch = {
        id: "",
        title: "",
        tagline: "",
        color: "algebra",
        totalConcepts: 0,
        concepts: []
      };
    }
    return { chapter: ch };
  },
});

function ChapterEditor() {
  const { chapter: initialChapter } = Route.useLoaderData();
  const [chapter, setChapter] = useState<Chapter | null>(initialChapter);
  const [showJsonPaste, setShowJsonPaste] = useState(false);
  const [jsonInput, setJsonInput] = useState("");
  const router = useRouter();
  const navigate = useNavigate();
  const save = useServerFn(saveChapter);
  const [saving, setSaving] = useState(false);

  const handleJsonImport = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setChapter(prev => {
        if (!prev) return parsed;
        
        // If they pasted an array of concepts directly
        let newConcepts = Array.isArray(parsed) ? parsed : (parsed.concepts || []);
        
        // Append new concepts to existing ones
        const mergedConcepts = [...prev.concepts, ...newConcepts].map((c, idx) => ({
          ...c,
          order: idx + 1, // Re-order them sequentially
          chapterId: prev.id || parsed.id // Ensure they belong to this chapter
        }));

        return {
          ...prev,
          ...parsed, // Overwrite root fields like title/tagline if provided
          id: prev.id || parsed.id,
          concepts: mergedConcepts
        };
      });
      setShowJsonPaste(false);
      setJsonInput("");
    } catch (e) {
      alert("Invalid JSON format!");
    }
  };

  useEffect(() => {
    setChapter(initialChapter);
  }, [initialChapter]);

  if (!chapter) return <div>Chapter not found</div>;

  const handleSave = async () => {
    if (!chapter.id) return alert("ID is required");
    setSaving(true);
    try {
      await save({ data: chapter });
      alert("Saved successfully!");
      if (initialChapter?.id === "") {
        navigate({ to: "/admin/chapter/$chapterId", params: { chapterId: chapter.id } });
      } else {
        router.invalidate();
      }
    } catch (e) {
      alert("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const addConcept = () => {
    const newId = prompt("Enter new concept ID (e.g. algebra-c1):");
    if (!newId) return;
    setChapter(prev => prev ? {
      ...prev,
      concepts: [...prev.concepts, {
        id: newId,
        chapterId: prev.id,
        title: "New Concept",
        subtitle: "",
        difficulty: "Medium",
        order: prev.concepts.length + 1,
        formulas: []
      }]
    } : prev);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/admin" className="text-muted-foreground hover:text-foreground">
          Dashboard
        </Link>
        <ChevronRight className="size-4 text-muted-foreground" />
        <h2 className="text-2xl font-black tracking-tight">{chapter.id ? chapter.title : "New Chapter"}</h2>
        
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
            <Save className="size-5" /> {saving ? "Saving..." : "Save Chapter"}
          </button>
        </div>
      </div>

      {showJsonPaste && (
        <div className="bg-[oklch(0.2_0_0)] text-white p-6 rounded-2xl shadow-xl">
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><FileJson /> Paste Full Chapter JSON</h3>
          <p className="text-white/70 text-sm mb-4">Paste the full JSON object for this chapter (including concepts, formulas, etc). Use <code>[IMAGE]</code> in text fields if you want to paste images later in the Concept Editor.</p>
          <textarea 
            value={jsonInput}
            onChange={e => setJsonInput(e.target.value)}
            className="w-full h-64 bg-black/50 border border-white/20 rounded-xl p-4 font-mono text-sm text-green-400 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder='{ "title": "...", "concepts": [...] }'
          />
          <div className="mt-4 flex justify-end">
            <button onClick={handleJsonImport} className="px-6 py-2 bg-primary text-white font-bold rounded-xl flex items-center gap-2">
              <CheckCircle2 className="size-5" /> Apply JSON
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
          <h3 className="font-bold text-lg border-b pb-2 mb-4">Chapter Details</h3>
          
          <div>
            <label className="block text-sm font-bold mb-1">ID (File Name)</label>
            <input 
              value={chapter.id}
              onChange={e => setChapter({...chapter, id: e.target.value})}
              disabled={initialChapter?.id !== ""}
              className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm disabled:opacity-50"
              placeholder="e.g. algebra"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Title</label>
            <input 
              value={chapter.title}
              onChange={e => setChapter({...chapter, title: e.target.value})}
              className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Tagline</label>
            <input 
              value={chapter.tagline}
              onChange={e => setChapter({...chapter, tagline: e.target.value})}
              className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1">Color Theme</label>
              <select 
                value={chapter.color}
                onChange={e => setChapter({...chapter, color: e.target.value as any})}
                className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="algebra">Algebra</option>
                <option value="geometry">Geometry</option>
                <option value="trig">Trigonometry</option>
                <option value="stats">Statistics</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Total Target Concepts</label>
              <input 
                type="number"
                value={chapter.totalConcepts}
                onChange={e => setChapter({...chapter, totalConcepts: parseInt(e.target.value) || 0})}
                className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm flex flex-col">
          <div className="flex items-center justify-between border-b pb-2 mb-4">
            <h3 className="font-bold text-lg">Concepts</h3>
            <button 
              onClick={addConcept}
              className="p-1.5 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80"
            >
              <Plus className="size-4" />
            </button>
          </div>
          
          <div className="space-y-2 flex-grow overflow-y-auto max-h-[400px]">
            {chapter.concepts.map((c, i) => (
              <div key={c.id} className="flex items-center gap-3 p-3 bg-muted/30 border rounded-xl hover:bg-muted/50 transition-colors">
                <GripVertical className="size-4 text-muted-foreground cursor-grab" />
                <div className="flex-grow min-w-0">
                  <p className="font-bold text-sm truncate">{c.title || "Untitled"}</p>
                  <p className="text-xs text-muted-foreground truncate">{c.formulas.length} formulas • {c.difficulty}</p>
                </div>
                <button 
                  onClick={(e) => {
                    if (chapter.id === "" || !initialChapter?.id) {
                      e.preventDefault();
                      alert("Please click 'Save Chapter' before editing individual concepts!");
                    } else {
                      navigate({ to: "/admin/concept/$chapterId/$conceptId", params: { chapterId: chapter.id, conceptId: c.id } });
                    }
                  }}
                  className="px-3 py-1.5 bg-background border rounded-lg text-xs font-bold shadow-sm hover:bg-secondary hover:text-secondary-foreground transition-colors"
                >
                  Edit
                </button>
              </div>
            ))}
            {chapter.concepts.length === 0 && (
              <p className="text-center text-sm text-muted-foreground py-8">No concepts yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
