import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/concept._conceptId-Be2A7dN_.js
var $$splitErrorComponentImporter = () => import("./concept._conceptId-xYIq4MSm.mjs");
var $$splitNotFoundComponentImporter = () => import("./concept._conceptId-BuX1kuxN.mjs");
var $$splitComponentImporter = () => import("./concept._conceptId-BZ4Sjgj0.mjs");
var Route = createFileRoute("/concept/$conceptId")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
//#endregion
export { Route as t };
