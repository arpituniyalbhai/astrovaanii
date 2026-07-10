import { t as astrovaanii_logo_default } from "./astrovaanii-logo-BIjzg6F9.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Reveal } from "./Reveal-CznoT_Wi.mjs";
import { t as free_kundlai_generator_default } from "./free-kundlai-generator-DMC-G31z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tools-D_jcykbD.js
var import_jsx_runtime = require_jsx_runtime();
var tools = [{
	title: "Free Kundli Generator",
	description: "Generate your complete Janam Kundli by date of birth, time, and birthplace. Get a full North Indian style birth chart with planet positions, house details, and Vimshottari Dasha using accurate Swiss Ephemeris calculations.",
	image: free_kundlai_generator_default,
	link: "/free-kundli",
	features: [
		"North Indian chart format",
		"Planet positions & houses",
		"Vimshottari Dasha timeline",
		"Lahiri Ayanamsa"
	]
}];
function ToolsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative min-h-screen bg-background grain",
		"data-tsd-source": "/src/routes/tools.tsx:13:10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "orb h-[420px] w-[420px] bg-[color:var(--gold)] -left-32 -top-24",
				"data-tsd-source": "/src/routes/tools.tsx:14:7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "orb h-[360px] w-[360px] bg-[color:var(--clay)] -right-24 bottom-0 opacity-40",
				"data-tsd-source": "/src/routes/tools.tsx:15:7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative z-10 mx-auto flex h-16 max-w-6xl items-center justify-between px-6",
				"data-tsd-source": "/src/routes/tools.tsx:17:7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "/",
					className: "flex items-center gap-2",
					"data-tsd-source": "/src/routes/tools.tsx:18:9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: astrovaanii_logo_default,
						alt: "",
						width: 32,
						height: 32,
						className: "h-8 w-8",
						"data-tsd-source": "/src/routes/tools.tsx:19:11"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-display text-lg",
						"data-tsd-source": "/src/routes/tools.tsx:20:11",
						children: ["Astro", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							"data-tsd-source": "/src/routes/tools.tsx:20:55",
							children: "Vaanii"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex gap-6 text-sm text-muted-foreground",
					"data-tsd-source": "/src/routes/tools.tsx:22:9",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "hover:text-foreground",
						"data-tsd-source": "/src/routes/tools.tsx:23:11",
						children: "Home"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative z-10 mx-auto max-w-6xl px-6 py-16",
				"data-tsd-source": "/src/routes/tools.tsx:27:7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					"data-tsd-source": "/src/routes/tools.tsx:28:9",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center mb-14",
						"data-tsd-source": "/src/routes/tools.tsx:29:11",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "font-display text-4xl md:text-5xl text-foreground",
							"data-tsd-source": "/src/routes/tools.tsx:30:13",
							children: ["Free Vedic Astrology ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary",
								"data-tsd-source": "/src/routes/tools.tsx:31:36",
								children: "Tools"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-lg text-muted-foreground max-w-xl mx-auto",
							"data-tsd-source": "/src/routes/tools.tsx:33:13",
							children: "Accurate calculations powered by Swiss Ephemeris. Free to use, no sign-up required."
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
					"data-tsd-source": "/src/routes/tools.tsx:39:9",
					children: tools.map((tool, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: i * 100,
						"data-tsd-source": "/src/routes/tools.tsx:40:35",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: tool.link,
							className: "group block h-full rounded-3xl border border-border bg-card/80 shadow-xl backdrop-blur-md overflow-hidden hover:shadow-2xl hover:border-primary/30 transition-all duration-300",
							"data-tsd-source": "/src/routes/tools.tsx:41:15",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "aspect-[16/9] overflow-hidden bg-[color:var(--accent)]/30",
								"data-tsd-source": "/src/routes/tools.tsx:42:17",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: tool.image,
									alt: tool.title,
									className: "h-full w-full object-cover group-hover:scale-105 transition-transform duration-500",
									"data-tsd-source": "/src/routes/tools.tsx:43:19"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-6",
								"data-tsd-source": "/src/routes/tools.tsx:45:17",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-display text-xl text-foreground group-hover:text-primary transition-colors",
										"data-tsd-source": "/src/routes/tools.tsx:46:19",
										children: tool.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted-foreground leading-relaxed",
										"data-tsd-source": "/src/routes/tools.tsx:49:19",
										children: tool.description
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-4 flex flex-wrap gap-2",
										"data-tsd-source": "/src/routes/tools.tsx:52:19",
										children: tool.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
											className: "rounded-full border border-border bg-background/70 px-3 py-1 text-xs text-muted-foreground",
											"data-tsd-source": "/src/routes/tools.tsx:53:45",
											children: f
										}, f))
									})
								]
							})]
						})
					}, tool.title))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border bg-card/40 py-12",
				"data-tsd-source": "/src/routes/tools.tsx:63:7",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col gap-6 px-6 text-center text-sm text-muted-foreground",
					"data-tsd-source": "/src/routes/tools.tsx:64:9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-center gap-2",
						"data-tsd-source": "/src/routes/tools.tsx:65:11",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: astrovaanii_logo_default,
							alt: "",
							width: 24,
							height: 24,
							className: "h-6 w-6",
							"data-tsd-source": "/src/routes/tools.tsx:66:13"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg",
							"data-tsd-source": "/src/routes/tools.tsx:67:13",
							children: "AstroVaanii"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-tsd-source": "/src/routes/tools.tsx:69:11",
						children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" AstroVaanii. All rights reserved."
						]
					})]
				})
			})
		]
	});
}
//#endregion
export { ToolsPage as component };
