import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as astrovaanii_logo_default } from "./astrovaanii-logo-BIjzg6F9.mjs";
import { t as free_kundlai_generator_default } from "./free-kundlai-generator-DMC-G31z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tools-BHRnuHac.js
var import_jsx_runtime = require_jsx_runtime();
function ToolsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background grain",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/50",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "/",
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: astrovaanii_logo_default,
						alt: "",
						width: 28,
						height: 28,
						className: "h-7 w-7"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-display text-lg",
						children: ["Astro", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							children: "Vaanii"
						})]
					})]
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-4xl px-6 py-10 space-y-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl md:text-5xl text-primary",
					children: "Free Astrology Tools"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg text-muted-foreground max-w-2xl mx-auto",
					children: "Explore our collection of free Vedic astrology tools powered by accurate Swiss Ephemeris calculations."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-6 mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/tools/kundli-generator",
					className: "group rounded-3xl border border-border bg-card p-6 hover:shadow-xl transition-all duration-300 hover:border-primary/30",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "aspect-video rounded-2xl overflow-hidden bg-background/70 mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: free_kundlai_generator_default,
								alt: "Free Kundli Generator",
								className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl text-primary group-hover:text-primary/80 transition-colors",
							children: "Free Kundli Generator"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mt-2",
							children: "Generate your Janam Kundli by date of birth and time. Complete North Indian style birth chart with planet positions, houses, and Vimshottari dasha."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-block mt-3 text-sm font-medium text-primary",
							children: "Generate Kundli →"
						})
					]
				})
			})]
		})]
	});
}
//#endregion
export { ToolsPage as component };
