import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/concept._conceptId-DkFnwgLX.js
var $$splitErrorComponentImporter = () => import("./concept._conceptId-CoVk7i1k.mjs");
var $$splitNotFoundComponentImporter = () => import("./concept._conceptId-LhCH1ssT.mjs");
var $$splitComponentImporter = () => import("./concept._conceptId-D7wcAhez.mjs");
var Route = createFileRoute("/concept/$conceptId")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
//#endregion
export { Route as t };
