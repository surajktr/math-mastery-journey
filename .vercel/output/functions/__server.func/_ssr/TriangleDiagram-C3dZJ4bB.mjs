import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as katex } from "../_libs/katex.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/TriangleDiagram-C3dZJ4bB.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Renders a string containing LaTeX math delimiters ($...$, $$...$$)
* into properly formatted HTML using KaTeX directly.
*/
function MathText({ children }) {
	if (!children) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { dangerouslySetInnerHTML: { __html: renderMathInText(children) } });
}
function renderMathInText(text) {
	const parts = [];
	let i = 0;
	while (i < text.length) {
		if (text[i] === "$" && text[i + 1] === "$") {
			const end = text.indexOf("$$", i + 2);
			if (end !== -1) {
				const tex = text.slice(i + 2, end);
				try {
					parts.push(katex.renderToString(tex.trim(), {
						displayMode: true,
						throwOnError: false
					}));
				} catch {
					parts.push(tex);
				}
				i = end + 2;
				continue;
			}
		}
		if (text[i] === "$") {
			const end = text.indexOf("$", i + 1);
			if (end !== -1) {
				const tex = text.slice(i + 1, end);
				try {
					parts.push(katex.renderToString(tex.trim(), {
						displayMode: false,
						throwOnError: false
					}));
				} catch {
					parts.push(tex);
				}
				i = end + 1;
				continue;
			}
		}
		if (text[i] === "\n") {
			parts.push("<br/>");
			i++;
			continue;
		}
		let j = i;
		while (j < text.length && text[j] !== "$" && text[j] !== "\n") j++;
		parts.push(escapeHtml(text.slice(i, j)));
		i = j;
	}
	return parts.join("");
}
function escapeHtml(str) {
	return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function TriangleDiagram({ labels = true, opp, adj, hyp }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 320 200",
		className: "w-full max-w-sm mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "20,170 280,170 280,40",
				fill: "oklch(0.95 0.04 240)",
				stroke: "none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "20",
				y1: "170",
				x2: "280",
				y2: "170",
				stroke: "oklch(0.7 0.18 145)",
				strokeWidth: "4",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "280",
				y1: "170",
				x2: "280",
				y2: "40",
				stroke: "oklch(0.74 0.17 60)",
				strokeWidth: "4",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "20",
				y1: "170",
				x2: "280",
				y2: "40",
				stroke: "oklch(0.68 0.17 240)",
				strokeWidth: "4",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M 268 170 L 268 158 L 280 158",
				fill: "none",
				stroke: "oklch(0.4 0.02 260)",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M 50 170 A 30 30 0 0 0 44 156",
				fill: "none",
				stroke: "oklch(0.7 0.18 145)",
				strokeWidth: "3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "60",
				y: "162",
				fontSize: "16",
				fill: "oklch(0.4 0.02 260)",
				fontWeight: "700",
				children: "θ"
			}),
			labels && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "120",
					y: "100",
					fontSize: "14",
					fill: "oklch(0.68 0.17 240)",
					fontWeight: "700",
					transform: "rotate(-26 120 100)",
					children: hyp ?? "Hypotenuse"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "290",
					y: "110",
					fontSize: "14",
					fill: "oklch(0.74 0.17 60)",
					fontWeight: "700",
					children: opp ?? "Opp"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "130",
					y: "190",
					fontSize: "14",
					fill: "oklch(0.7 0.18 145)",
					fontWeight: "700",
					children: adj ?? "Adjacent"
				})
			] })
		]
	});
}
//#endregion
export { TriangleDiagram as n, MathText as t };
