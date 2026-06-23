import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/result._conceptId-CiHJRM6P.js
var $$splitErrorComponentImporter = () => import("./result._conceptId-DDXdq9HM.mjs");
var $$splitNotFoundComponentImporter = () => import("./result._conceptId-CgrtOZ6n.mjs");
var $$splitComponentImporter = () => import("./result._conceptId-BoC5S4e4.mjs");
var Route = createFileRoute("/result/$conceptId")({
	validateSearch: (s) => ({
		score: Number(s.score) || 0,
		total: Number(s.total) || 0,
		hints: Number(s.hints) || 0,
		xp: Number(s.xp) || 0
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
//#endregion
export { Route as t };
