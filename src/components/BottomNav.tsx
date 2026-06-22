import { Link, useRouterState } from "@tanstack/react-router";
import { Home, BarChart3, Settings } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/progress", label: "Progress", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 px-4 pb-[env(safe-area-inset-bottom)] pointer-events-none">
      <div className="mx-auto max-w-md bg-card rounded-2xl shadow-card border border-border flex items-stretch justify-around p-2 pointer-events-auto">
        {items.map(({ to, label, icon: Icon }) => {
          const active = path === to;
          return (
            <Link key={to} to={to} className="flex-1 flex flex-col items-center gap-1 py-2 rounded-xl">
              <Icon className={`size-6 ${active ? "text-primary" : "text-muted-foreground"}`} strokeWidth={active ? 2.5 : 2} />
              <span className={`text-xs font-bold ${active ? "text-primary" : "text-muted-foreground"}`}>{label}</span>
              {active && <span className="h-0.5 w-6 bg-primary rounded-full" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
