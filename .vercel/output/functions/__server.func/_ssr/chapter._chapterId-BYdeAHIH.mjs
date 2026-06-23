import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chapter._chapterId-BYdeAHIH.js
var $$splitErrorComponentImporter = () => import("./chapter._chapterId-BYTSeg4U.mjs");
var $$splitNotFoundComponentImporter = () => import("./chapter._chapterId-C-mfotJQ.mjs");
var $$splitComponentImporter = () => import("./chapter._chapterId-cXJXMTkW.mjs");
var Route = createFileRoute("/chapter/$chapterId")({
	head: ({ params }) => ({ meta: [{ title: `${params.chapterId} — MathDojo` }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
//#endregion
export { Route as t };
