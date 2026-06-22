import { Flame } from "lucide-react";
export function StreakBadge({ streak }: { streak: number }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.95_0.06_145)] px-4 py-2 text-[oklch(0.45_0.16_145)] font-bold">
      <Flame className="size-5" fill="oklch(0.7_0.18_145)" stroke="oklch(0.45_0.16_145)" />
      <span>{streak} day streak</span>
    </div>
  );
}
