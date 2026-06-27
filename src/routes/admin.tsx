import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { ArrowLeft, Settings } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div className="min-h-screen bg-[oklch(0.98_0.01_240)] font-sans">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Link to="/" className="p-2 -ml-2 rounded-full hover:bg-muted text-muted-foreground transition-colors">
            <ArrowLeft className="size-5" />
          </Link>
          <h1 className="font-extrabold text-lg text-foreground flex items-center gap-2">
            <Settings className="size-5 text-primary" /> Admin Panel
          </h1>
        </div>
      </header>
      
      <main className="p-4 md:p-8 max-w-5xl mx-auto pb-32">
        <Outlet />
      </main>
    </div>
  );
}
