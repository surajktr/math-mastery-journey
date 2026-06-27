import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { listChapters, deleteChapter } from "@/lib/admin-api";
import { Plus, Edit2, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
  loader: async ({ context }) => {
    return { chapters: await listChapters() };
  },
});

function AdminDashboard() {
  const { chapters } = Route.useLoaderData();
  const router = useRouter();
  const delChapter = useServerFn(deleteChapter);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this chapter? This cannot be undone.")) {
      await delChapter({ data: { id } });
      router.invalidate();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black tracking-tight">Chapters</h2>
        <Link 
          to="/admin/chapter/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors"
        >
          <Plus className="size-5" /> New Chapter
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {chapters.map((ch) => (
          <div key={ch.id} className="bg-white p-5 rounded-2xl border shadow-sm flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-lg leading-tight">{ch.title}</h3>
              <span className="text-xs font-bold uppercase px-2 py-1 bg-muted rounded-full text-muted-foreground">{ch.color}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">{ch.tagline}</p>
            
            <div className="text-xs font-bold text-foreground/60 mb-4 bg-muted/30 p-2 rounded-lg text-center">
              {ch.concepts.length} Concepts • {ch.totalConcepts} Total (Target)
            </div>

            <div className="flex gap-2 mt-auto">
              <Link 
                to="/admin/chapter/$chapterId"
                params={{ chapterId: ch.id }}
                className="flex-1 inline-flex justify-center items-center gap-2 bg-secondary text-secondary-foreground py-2 rounded-xl text-sm font-bold hover:bg-secondary/80 transition-colors"
              >
                <Edit2 className="size-4" /> Edit
              </Link>
              <button 
                onClick={() => handleDelete(ch.id)}
                className="p-2 text-destructive bg-destructive/10 hover:bg-destructive hover:text-white rounded-xl transition-colors"
              >
                <Trash2 className="size-5" />
              </button>
            </div>
          </div>
        ))}
        {chapters.length === 0 && (
          <div className="col-span-full p-12 border-2 border-dashed rounded-2xl text-center text-muted-foreground font-bold">
            No chapters found. Create one!
          </div>
        )}
      </div>
    </div>
  );
}
