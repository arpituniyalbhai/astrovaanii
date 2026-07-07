import { o as __toESM } from "../_runtime.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as startalks_icon_default } from "./startalks-icon-Ch-3XBzc.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/my-chart-DnXQKsQA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MyChartPage() {
	useNavigate();
	const [chart, setChart] = (0, import_react.useState)(null);
	const [userName, setUserName] = (0, import_react.useState)("User");
	(0, import_react.useEffect)(() => {
		const stored = JSON.parse(localStorage.getItem("userData") || "{}");
		setUserName(stored.name || "User");
		if (stored.chart) setChart(stored.chart);
	}, []);
	if (!chart) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-background grain flex items-center justify-center px-6",
		"data-tsd-source": "/src/routes/my-chart.tsx:14:12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center max-w-md",
			"data-tsd-source": "/src/routes/my-chart.tsx:15:9",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl text-primary mb-4",
					"data-tsd-source": "/src/routes/my-chart.tsx:16:11",
					children: "Chart Not Found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground mb-6",
					"data-tsd-source": "/src/routes/my-chart.tsx:17:11",
					children: "Complete your profile to generate your birth chart."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/onboarding",
					className: "rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground",
					"data-tsd-source": "/src/routes/my-chart.tsx:18:11",
					children: "Complete Profile"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background grain",
		"data-tsd-source": "/src/routes/my-chart.tsx:24:10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/50",
			"data-tsd-source": "/src/routes/my-chart.tsx:25:7",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-6",
				"data-tsd-source": "/src/routes/my-chart.tsx:26:9",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/dashboard",
					className: "flex items-center gap-2",
					"data-tsd-source": "/src/routes/my-chart.tsx:27:11",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: startalks_icon_default,
						alt: "",
						width: 28,
						height: 28,
						className: "h-7 w-7",
						"data-tsd-source": "/src/routes/my-chart.tsx:28:13"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-display text-lg",
						"data-tsd-source": "/src/routes/my-chart.tsx:29:13",
						children: ["Astro", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							"data-tsd-source": "/src/routes/my-chart.tsx:29:57",
							children: "Vaanii"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/dashboard",
					className: "text-sm text-muted-foreground hover:text-foreground",
					"data-tsd-source": "/src/routes/my-chart.tsx:31:11",
					children: "← Dashboard"
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-5xl px-6 py-10 space-y-8",
			"data-tsd-source": "/src/routes/my-chart.tsx:35:7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-tsd-source": "/src/routes/my-chart.tsx:36:9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "font-display text-3xl text-primary",
						"data-tsd-source": "/src/routes/my-chart.tsx:37:11",
						children: [userName, "'s Birth Chart"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground mt-1",
						"data-tsd-source": "/src/routes/my-chart.tsx:38:11",
						children: "Lahiri Ayanamsa · Whole Sign Houses · Swiss Ephemeris"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-6",
					"data-tsd-source": "/src/routes/my-chart.tsx:41:9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartSummaryCard, {
						chart,
						"data-tsd-source": "/src/routes/my-chart.tsx:42:11"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanetPositionsCard, {
						planets: chart.planets,
						"data-tsd-source": "/src/routes/my-chart.tsx:43:11"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseOccupantsCard, {
					occupants: chart.houseOccupants,
					signNames: chart.houseSignNames,
					lords: chart.houseLords,
					"data-tsd-source": "/src/routes/my-chart.tsx:46:9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashaCard, {
					dasha: chart.vimshottari,
					"data-tsd-source": "/src/routes/my-chart.tsx:47:9"
				})
			]
		})]
	});
}
function ChartSummaryCard({ chart }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl border border-border bg-card p-6",
		"data-tsd-source": "/src/routes/my-chart.tsx:56:10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg mb-4",
			"data-tsd-source": "/src/routes/my-chart.tsx:57:7",
			children: "Chart Summary"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "space-y-3 text-sm",
			"data-tsd-source": "/src/routes/my-chart.tsx:58:7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: "Ascendant",
					value: `${chart.ascendantSignName} ${chart.ascendantDegree.toFixed(2)}°`,
					"data-tsd-source": "/src/routes/my-chart.tsx:59:9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: "Moon Nakshatra",
					value: `${chart.nakshatraName} ${chart.pada} Pada`,
					"data-tsd-source": "/src/routes/my-chart.tsx:60:9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: "Nakshatra Lord",
					value: chart.nakshatraLord,
					"data-tsd-source": "/src/routes/my-chart.tsx:61:9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: "Mahadasha",
					value: `${chart.mahadasha.planet}`,
					"data-tsd-source": "/src/routes/my-chart.tsx:62:9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: "Ayanamsa",
					value: chart.ayanamsa,
					"data-tsd-source": "/src/routes/my-chart.tsx:63:9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: "House System",
					value: chart.houseSystem,
					"data-tsd-source": "/src/routes/my-chart.tsx:64:9"
				})
			]
		})]
	});
}
function PlanetPositionsCard({ planets }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl border border-border bg-card p-6",
		"data-tsd-source": "/src/routes/my-chart.tsx:73:10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg mb-4",
			"data-tsd-source": "/src/routes/my-chart.tsx:74:7",
			children: "Planet Positions"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2 text-sm",
			"data-tsd-source": "/src/routes/my-chart.tsx:75:7",
			children: Object.entries(planets).map(([name, p]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between items-center py-1.5 border-b border-border/50 last:border-0",
				"data-tsd-source": "/src/routes/my-chart.tsx:76:53",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					"data-tsd-source": "/src/routes/my-chart.tsx:77:13",
					children: name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-muted-foreground",
					"data-tsd-source": "/src/routes/my-chart.tsx:78:13",
					children: [
						p.signName,
						" ",
						p.degree.toFixed(2),
						"° · House ",
						p.house,
						" · ",
						p.nakshatraName,
						" ",
						p.pada
					]
				})]
			}, name))
		})]
	});
}
function HouseOccupantsCard({ occupants, signNames, lords }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl border border-border bg-card p-6",
		"data-tsd-source": "/src/routes/my-chart.tsx:94:10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg mb-4",
			"data-tsd-source": "/src/routes/my-chart.tsx:95:7",
			children: "House Occupants"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm",
			"data-tsd-source": "/src/routes/my-chart.tsx:96:7",
			children: Array.from({ length: 12 }, (_, i) => i + 1).map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border/60 bg-background/50 p-3",
				"data-tsd-source": "/src/routes/my-chart.tsx:99:36",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-medium",
						"data-tsd-source": "/src/routes/my-chart.tsx:100:13",
						children: ["House ", h]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-muted-foreground",
						"data-tsd-source": "/src/routes/my-chart.tsx:101:13",
						children: [
							signNames[h],
							" · Lord ",
							lords[h]
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-xs",
						"data-tsd-source": "/src/routes/my-chart.tsx:102:13",
						children: occupants[h]?.length ? occupants[h].join(", ") : "—"
					})
				]
			}, h))
		})]
	});
}
function DashaCard({ dasha }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl border border-border bg-card p-6",
		"data-tsd-source": "/src/routes/my-chart.tsx:118:10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg mb-4",
			"data-tsd-source": "/src/routes/my-chart.tsx:119:7",
			children: "Vimshottari Dasha"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2 text-sm",
			"data-tsd-source": "/src/routes/my-chart.tsx:120:7",
			children: dasha.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between items-center py-1.5 border-b border-border/50 last:border-0",
				"data-tsd-source": "/src/routes/my-chart.tsx:121:30",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					"data-tsd-source": "/src/routes/my-chart.tsx:122:13",
					children: d.planet
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-muted-foreground",
					"data-tsd-source": "/src/routes/my-chart.tsx:123:13",
					children: [d.years.toFixed(2), " years"]
				})]
			}, i))
		})]
	});
}
function Row({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between",
		"data-tsd-source": "/src/routes/my-chart.tsx:135:10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted-foreground",
			"data-tsd-source": "/src/routes/my-chart.tsx:136:7",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "font-medium",
			"data-tsd-source": "/src/routes/my-chart.tsx:137:7",
			children: value
		})]
	});
}
//#endregion
export { MyChartPage as component };
