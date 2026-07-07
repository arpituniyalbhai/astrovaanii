import { o as __toESM } from "../_runtime.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as startalks_icon_default } from "./startalks-icon-Cbm8TXZv.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pricing-Bx3wt2Zz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var plans = [
	{
		name: "Starter",
		price: "₹79",
		features: [
			"5 AI chat questions",
			"Daily predictions",
			"Basic birth chart",
			"Career insights"
		]
	},
	{
		name: "Pro",
		price: "₹139",
		features: [
			"10 AI chat questions",
			"Advanced chart analysis",
			"Love compatibility",
			"Dasha predictions",
			"Priority response"
		],
		popular: true
	},
	{
		name: "Premium",
		price: "₹249",
		features: [
			"20 AI chat questions",
			"Advanced analyzing",
			"Personalized remedies",
			"Live consultations",
			"Priority support",
			"Detailed transit analysis"
		]
	}
];
function PricingPage() {
	const navigate = useNavigate();
	const [userName, setUserName] = (0, import_react.useState)("User");
	(0, import_react.useEffect)(() => {
		const local = JSON.parse(localStorage.getItem("userData") || "{}");
		setUserName(local.name || "User");
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background grain",
		"data-tsd-source": "/src/routes/pricing.tsx:26:10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "orb h-[420px] w-[420px] bg-[color:var(--gold)] -left-32 -top-24 fixed",
				"data-tsd-source": "/src/routes/pricing.tsx:27:7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "orb h-[360px] w-[360px] bg-[color:var(--clay)] -right-24 bottom-0 opacity-40 fixed",
				"data-tsd-source": "/src/routes/pricing.tsx:28:7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/50",
				"data-tsd-source": "/src/routes/pricing.tsx:30:7",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-6",
					"data-tsd-source": "/src/routes/pricing.tsx:31:9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/dashboard",
						className: "flex items-center gap-2",
						"data-tsd-source": "/src/routes/pricing.tsx:32:11",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: startalks_icon_default,
							alt: "",
							width: 28,
							height: 28,
							className: "h-7 w-7",
							"data-tsd-source": "/src/routes/pricing.tsx:33:13"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-display text-lg",
							"data-tsd-source": "/src/routes/pricing.tsx:34:13",
							children: ["Astro", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary",
								"data-tsd-source": "/src/routes/pricing.tsx:34:57",
								children: "Vaanii"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						"data-tsd-source": "/src/routes/pricing.tsx:36:11",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "hidden sm:block text-sm text-muted-foreground",
							"data-tsd-source": "/src/routes/pricing.tsx:37:13",
							children: ["Welcome, ", userName]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard",
							className: "rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90",
							"data-tsd-source": "/src/routes/pricing.tsx:38:13",
							children: "Back to Dashboard"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative z-10 mx-auto max-w-6xl px-6 py-16",
				"data-tsd-source": "/src/routes/pricing.tsx:45:7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center mb-12",
						"data-tsd-source": "/src/routes/pricing.tsx:46:9",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl md:text-5xl text-primary mb-4",
							"data-tsd-source": "/src/routes/pricing.tsx:47:11",
							children: "Choose Your Plan"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground text-lg max-w-lg mx-auto",
							"data-tsd-source": "/src/routes/pricing.tsx:48:11",
							children: "Unlock deeper insights with our premium plans"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid md:grid-cols-3 gap-6 max-w-5xl mx-auto",
						"data-tsd-source": "/src/routes/pricing.tsx:53:9",
						children: plans.map((plan) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `relative rounded-3xl border border-border bg-card/80 p-6 shadow-xl backdrop-blur-md ${plan.popular ? "border-primary/50 ring-2 ring-primary/20" : ""}`,
							"data-tsd-source": "/src/routes/pricing.tsx:54:30",
							children: [
								plan.popular && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground",
									"data-tsd-source": "/src/routes/pricing.tsx:55:32",
									children: "Most Popular"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-xl text-foreground mb-2",
									"data-tsd-source": "/src/routes/pricing.tsx:58:15",
									children: plan.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-3xl font-bold text-primary mb-4",
									"data-tsd-source": "/src/routes/pricing.tsx:59:15",
									children: plan.price
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-2 mb-6",
									"data-tsd-source": "/src/routes/pricing.tsx:60:15",
									children: plan.features.map((feature) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-2 text-sm text-muted-foreground",
										"data-tsd-source": "/src/routes/pricing.tsx:61:47",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											width: "16",
											height: "16",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2",
											className: "text-[color:var(--sage)] shrink-0",
											"data-tsd-source": "/src/routes/pricing.tsx:62:21",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
												points: "20 6 9 17 4 12",
												"data-tsd-source": "/src/routes/pricing.tsx:63:23"
											})
										}), feature]
									}, feature))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => navigate({ to: "/chat" }),
									className: `w-full rounded-full py-3 text-sm font-medium transition-all ${plan.popular ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90" : "border border-border bg-background/70 hover:bg-card"}`,
									"data-tsd-source": "/src/routes/pricing.tsx:68:15",
									children: plan.name === "Free" ? "Current Plan" : "Upgrade"
								})
							]
						}, plan.name))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center mt-12",
						"data-tsd-source": "/src/routes/pricing.tsx:76:9",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							"data-tsd-source": "/src/routes/pricing.tsx:77:11",
							children: [
								"All plans include access to Vaanii AI Advance Model",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", { "data-tsd-source": "/src/routes/pricing.tsx:79:13" }),
								"Questions?",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "mailto:hello@astrovaanii.ai",
									className: "text-primary underline underline-offset-4",
									"data-tsd-source": "/src/routes/pricing.tsx:81:13",
									children: "hello@astrovaanii.ai"
								})
							]
						})
					})
				]
			})
		]
	});
}
//#endregion
export { PricingPage as component };
