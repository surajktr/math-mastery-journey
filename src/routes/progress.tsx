import { createFileRoute, Link } from "@tanstack/react-router";
import { BottomNav } from "@/components/BottomNav";
import { OwlMascot } from "@/components/OwlMascot";
import { useStore } from "@/lib/store";
import { chapters, getConcept } from "@/lib/data";
import { Lock, TrendingUp, BookOpen, Calendar, Target } from "lucide-react";

export const Route = createFileRoute("/progress")({
  head: () => ({ meta: [{ title: "My Progress — MathDojo" }] }),
  component: ProgressPage,
});

function ProgressPage() {
  const { progress, heatmap, weakTopics } = useStore();
  const totalConcepts = chapters.reduce((a, c) => a + c.totalConcepts, 0);
  const doneConcepts = Object.values(progress).filter((p) => p.completed).length;
  const overallPct = Math.round((doneConcepts / totalConcepts) * 100);

  const today = new Date();
  const days = Array.from({ length: 30 }).map((_, i) => {
    const d = new Date(today); d.setDate(d.getDate() - (29 - i));
    const key = d.toISOString().slice(0, 10);
    return { key, active: (heatmap[key] ?? 0) > 0, isToday: i === 29 };
  });

  return (
    <div className="min-h-screen pb-32">
      <div className="mx-auto max-w-md px-5 pt-6">
        <div className="flex items-center justify-center gap-3 mb-6">
          <h1 className="text-3xl font-extrabold">My Progress</h1>
          <OwlMascot size={56} />
        </div>

        <Card>
          <SectionHeader icon={<TrendingUp className="size-5" />} title="Overall Progress" />
          <div className="flex items-center gap-5 mt-4">
            <Ring pct={overallPct} />
            <div>
              <p className="text-xl font-extrabold">Great job!</p>
              <p className="text-sm text-muted-foreground">Keep going and you'll master it all.</p>
            </div>
          </div>
        </Card>

        <Card>
          <SectionHeader icon={<BookOpen className="size-5" />} title="Subject-wise Breakdown" />
          <div className="mt-3 divide-y divide-border">
            {chapters.map((ch) => {
              const done = ch.concepts.filter((c) => progress[c.id]?.completed).length;
              const total = ch.totalConcepts;
              const pct = (done / total) * 100;
              const color = `var(--${ch.color === "trig" ? "trig" : ch.color === "geometry" ? "geometry" : ch.color === "algebra" ? "algebra" : "stats"})`;
              return (
                <div key={ch.id} className="flex items-center gap-3 py-3">
                  <div className="size-12 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `color-mix(in oklch, ${color} 15%, white)` }}>
                    <span className="font-extrabold" style={{ color }}>{ch.title[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-extrabold">{ch.title}</p>
                    <div className="h-2 rounded-full bg-muted overflow-hidden mt-1">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-extrabold text-sm" style={{ color }}>{done} / {total}</p>
                    <p className="text-xs text-muted-foreground">concepts</p>
                  </div>
                  {ch.comingSoon && <Lock className="size-5 text-muted-foreground" />}
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <SectionHeader icon={<Calendar className="size-5" />} title="Streak Calendar" />
            <span className="text-xs text-muted-foreground">Last 30 days</span>
          </div>
          <div className="grid grid-cols-10 gap-1.5 mt-4">
            {days.map((d) => (
              <div key={d.key} className={`aspect-square rounded-full ${d.active ? "bg-primary" : "bg-muted"} ${d.isToday ? "ring-2 ring-foreground/60" : ""}`} />
            ))}
          </div>
          <div className="flex items-center justify-center gap-6 mt-4 text-xs">
            <span className="inline-flex items-center gap-1.5"><span className="size-3 rounded-full bg-primary" /> Active day</span>
            <span className="inline-flex items-center gap-1.5"><span className="size-3 rounded-full bg-muted" /> No activity</span>
          </div>
        </Card>

        <Card>
          <SectionHeader icon={<Target className="size-5" />} title="Weak Topics" />
          <p className="text-sm text-muted-foreground mb-3">Focus on these to improve your score!</p>
          <div className="flex flex-wrap gap-2">
            {Object.keys(weakTopics).length === 0 ? (
              <p className="text-sm text-muted-foreground">No weak topics yet — keep practicing!</p>
            ) : (
              Object.entries(weakTopics).map(([fid]) => {
                // find concept
                for (const ch of chapters) for (const c of ch.concepts) {
                  const f = c.formulas.find((f) => f.id === fid);
                  if (f) return (
                    <Link key={fid} to="/concept/$conceptId" params={{ conceptId: c.id }}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[oklch(0.97_0.06_28)] border border-[oklch(0.85_0.15_28)] text-destructive px-3 py-1.5 text-sm font-bold">
                      {f.name}
                    </Link>
                  );
                }
                return null;
              })
            )}
          </div>
        </Card>
      </div>
      <BottomNav />
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl bg-card border border-border p-5 mb-4 shadow-soft">{children}</div>;
}
function SectionHeader({ icon, title }: any) {
  return (
    <div className="flex items-center gap-2 text-[oklch(0.55_0.13_180)]">
      {icon}
      <h3 className="text-lg font-extrabold">{title}</h3>
    </div>
  );
}
function Ring({ pct }: { pct: number }) {
  const r = 52, c = 2 * Math.PI * r;
  const off = c - (pct / 100) * c;
  return (
    <svg viewBox="0 0 130 130" className="w-32 h-32">
      <circle cx="65" cy="65" r={r} fill="none" stroke="oklch(0.93 0.01 250)" strokeWidth="12" />
      <circle cx="65" cy="65" r={r} fill="none" stroke="oklch(0.65 0.14 185)" strokeWidth="12" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={off} transform="rotate(-90 65 65)" style={{ transition: "stroke-dashoffset 1s" }} />
      <text x="65" y="68" textAnchor="middle" fontSize="22" fontWeight="800" fill="oklch(0.2 0.02 260)">{pct}%</text>
      <text x="65" y="86" textAnchor="middle" fontSize="11" fill="oklch(0.55 0.02 260)">done</text>
    </svg>
  );
}
