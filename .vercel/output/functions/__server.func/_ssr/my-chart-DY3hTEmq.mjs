import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as startalks_icon_default } from "./startalks-icon-Ch-3XBzc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/my-chart-DY3hTEmq.js
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
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl text-primary mb-4",
					children: "Chart Not Found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground mb-6",
					children: "Complete your profile to generate your birth chart."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/onboarding",
					className: "rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground",
					children: "Complete Profile"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background grain",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/50",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/dashboard",
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: startalks_icon_default,
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
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/dashboard",
					className: "text-sm text-muted-foreground hover:text-foreground",
					children: "← Dashboard"
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-5xl px-6 py-10 space-y-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "font-display text-3xl text-primary",
					children: [userName, "'s Birth Chart"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground mt-1",
					children: "Lahiri Ayanamsa · Whole Sign Houses · Swiss Ephemeris"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartSummaryCard, { chart }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanetPositionsCard, { planets: chart.planets })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseOccupantsCard, {
					occupants: chart.houseOccupants,
					signNames: chart.houseSignNames,
					lords: chart.houseLords
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashaCard, { dasha: chart.vimshottari })
			]
		})]
	});
}
function ChartSummaryCard({ chart }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl border border-border bg-card p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg mb-4",
			children: "Chart Summary"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "space-y-3 text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: "Ascendant",
					value: `${chart.ascendantSignName} ${chart.ascendantDegree.toFixed(2)}°`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: "Moon Nakshatra",
					value: `${chart.nakshatraName} ${chart.pada} Pada`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: "Nakshatra Lord",
					value: chart.nakshatraLord
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: "Mahadasha",
					value: `${chart.mahadasha.planet}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: "Ayanamsa",
					value: chart.ayanamsa
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					label: "House System",
					value: chart.houseSystem
				})
			]
		})]
	});
}
function PlanetPositionsCard({ planets }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl border border-border bg-card p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg mb-4",
			children: "Planet Positions"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2 text-sm",
			children: Object.entries(planets).map(([name, p]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between items-center py-1.5 border-b border-border/50 last:border-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					children: name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-muted-foreground",
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
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg mb-4",
			children: "House Occupants"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm",
			children: Array.from({ length: 12 }, (_, i) => i + 1).map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border/60 bg-background/50 p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-medium",
						children: ["House ", h]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-muted-foreground",
						children: [
							signNames[h],
							" · Lord ",
							lords[h]
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-xs",
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
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg mb-4",
			children: "Vimshottari Dasha"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2 text-sm",
			children: dasha.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between items-center py-1.5 border-b border-border/50 last:border-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					children: d.planet
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-muted-foreground",
					children: [d.years.toFixed(2), " years"]
				})]
			}, i))
		})]
	});
}
function Row({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "font-medium",
			children: value
		})]
	});
}
//#endregion
export { MyChartPage as component };
