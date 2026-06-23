import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Settings, m as ChartColumn, u as House } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/BottomNav-DGxyn_5j.js
var import_jsx_runtime = require_jsx_runtime();
var items = [
	{
		to: "/",
		label: "Home",
		icon: House
	},
	{
		to: "/progress",
		label: "Progress",
		icon: ChartColumn
	},
	{
		to: "/settings",
		label: "Settings",
		icon: Settings
	}
];
function BottomNav() {
	const path = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "fixed bottom-0 inset-x-0 z-40 px-4 pb-[env(safe-area-inset-bottom)] pointer-events-none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-md bg-card rounded-2xl shadow-card border border-border flex items-stretch justify-around p-2 pointer-events-auto",
			children: items.map(({ to, label, icon: Icon }) => {
				const active = path === to;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to,
					className: "flex-1 flex flex-col items-center gap-1 py-2 rounded-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: `size-6 ${active ? "text-primary" : "text-muted-foreground"}`,
							strokeWidth: active ? 2.5 : 2
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `text-xs font-bold ${active ? "text-primary" : "text-muted-foreground"}`,
							children: label
						}),
						active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-0.5 w-6 bg-primary rounded-full" })
					]
				}, to);
			})
		})
	});
}
//#endregion
export { BottomNav as t };
