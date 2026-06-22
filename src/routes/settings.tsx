import { createFileRoute } from "@tanstack/react-router";
import { BottomNav } from "@/components/BottomNav";
import { OwlMascot } from "@/components/OwlMascot";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — MathDojo" }] }),
  component: () => (
    <div className="min-h-screen pb-32">
      <div className="mx-auto max-w-md px-5 pt-10 text-center flex flex-col items-center gap-4">
        <OwlMascot size={120} />
        <h1 className="text-3xl font-extrabold">Settings</h1>
        <p className="text-muted-foreground">Coming soon ✨</p>
      </div>
      <BottomNav />
    </div>
  ),
});
