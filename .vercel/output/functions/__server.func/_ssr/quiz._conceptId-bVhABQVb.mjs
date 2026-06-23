import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quiz._conceptId-bVhABQVb.js
var $$splitErrorComponentImporter = () => import("./quiz._conceptId-CJHm_Jwf.mjs");
var $$splitNotFoundComponentImporter = () => import("./quiz._conceptId-iQ8nwY7U.mjs");
var $$splitComponentImporter = () => import("./quiz._conceptId-CqaCQeFj.mjs");
var Route = createFileRoute("/quiz/$conceptId")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
//#endregion
export { Route as t };
