import { o as __toESM } from "../_runtime.mjs";
import { t as faqs } from "./ai-astrology-website-free-SAezLrG3.mjs";
import { t as astrovaanii_logo_default } from "./astrovaanii-logo-BIjzg6F9.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Briefcase, E as BellRing, S as ChartColumn, T as BookOpen, _ as Gem, a as Sparkles, b as CircleArrowDown, c as ScanLine, d as Orbit, f as MessageCircle, g as Globe, h as HeartHandshake, i as Stethoscope, l as Pointer, m as IndianRupee, n as TriangleAlert, o as Smartphone, p as Lightbulb, r as Store, s as ShieldCheck, t as Zap, u as Palette, v as Clover, w as BrainCircuit, x as ChevronRight, y as CircleArrowUp } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-astrology-website-free-DbNmChUV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var featuresList = [
	{
		icon: Sparkles,
		title: "100% Free",
		desc: "No hidden charges. No credit card required. Get unlimited readings without spending a rupee.",
		color: "text-amber-500",
		bg: "bg-amber-50 dark:bg-amber-950/30",
		border: "border-amber-200 dark:border-amber-800/40"
	},
	{
		icon: Zap,
		title: "Instant Horoscope",
		desc: "Reports generated in seconds. Enter your birth details and receive personalized predictions immediately.",
		color: "text-yellow-500",
		bg: "bg-yellow-50 dark:bg-yellow-950/30",
		border: "border-yellow-200 dark:border-yellow-800/40"
	},
	{
		icon: Globe,
		title: "Vedic Astrology",
		desc: "Based on traditional Vedic principles. Uses Parashara and Jaimini methods for authentic Jyotish readings.",
		color: "text-emerald-500",
		bg: "bg-emerald-50 dark:bg-emerald-950/30",
		border: "border-emerald-200 dark:border-emerald-800/40"
	},
	{
		icon: BrainCircuit,
		title: "AI Powered",
		desc: "Easy explanations anyone can understand. Complex astrology translated into simple, natural language.",
		color: "text-violet-500",
		bg: "bg-violet-50 dark:bg-violet-950/30",
		border: "border-violet-200 dark:border-violet-800/40"
	},
	{
		icon: ShieldCheck,
		title: "Private",
		desc: "Birth details remain secure and encrypted. You can delete your chart and conversations anytime.",
		color: "text-blue-500",
		bg: "bg-blue-50 dark:bg-blue-950/30",
		border: "border-blue-200 dark:border-blue-800/40"
	},
	{
		icon: Smartphone,
		title: "Mobile Friendly",
		desc: "Works on every device. Get your AI astrology reading on phone, tablet, or desktop.",
		color: "text-rose-500",
		bg: "bg-rose-50 dark:bg-rose-950/30",
		border: "border-rose-200 dark:border-rose-800/40"
	}
];
var whatYouGetGroups = [
	{
		title: "Life Areas",
		items: [
			{
				icon: Briefcase,
				label: "Career Prediction",
				desc: "Job changes, promotions, business timing"
			},
			{
				icon: HeartHandshake,
				label: "Love Compatibility",
				desc: "Relationship harmony and understanding"
			},
			{
				icon: BellRing,
				label: "Marriage Timing",
				desc: "Favorable periods and dosha checks"
			},
			{
				icon: BookOpen,
				label: "Education",
				desc: "Learning aptitude and academic timing"
			},
			{
				icon: Stethoscope,
				label: "Health",
				desc: "Predispositions and wellness periods"
			},
			{
				icon: IndianRupee,
				label: "Finance",
				desc: "Wealth periods and investment timing"
			},
			{
				icon: Store,
				label: "Business",
				desc: "Venture timing and growth periods"
			}
		]
	},
	{
		title: "Astrological Analysis",
		items: [
			{
				icon: TriangleAlert,
				label: "Doshas",
				desc: "Mangal, Kaal Sarp, Nadi & more"
			},
			{
				icon: Orbit,
				label: "Planet Analysis",
				desc: "Graha positions and their influences"
			},
			{
				icon: ChartColumn,
				label: "Dasha Analysis",
				desc: "Timeline of planetary periods"
			}
		]
	},
	{
		title: "Personal Guidance",
		items: [
			{
				icon: Clover,
				label: "Lucky Numbers",
				desc: "Numerologically aligned digits"
			},
			{
				icon: Palette,
				label: "Lucky Color",
				desc: "Colors that harmonize with your chart"
			},
			{
				icon: Gem,
				label: "Gemstone Suggestions",
				desc: "Ratna recommendations for balance"
			},
			{
				icon: Lightbulb,
				label: "Today's Advice",
				desc: "Daily guidance based on transits"
			},
			{
				icon: CircleArrowUp,
				label: "Strengths",
				desc: "Your innate cosmic advantages"
			},
			{
				icon: CircleArrowDown,
				label: "Weaknesses",
				desc: "Areas that need mindful attention"
			}
		]
	}
];
function FaqItem({ q, a, isOpen, toggle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-b border-border last:border-b-0",
		"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:143:10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: toggle,
			className: "flex w-full items-center justify-between gap-4 px-6 py-5 text-left",
			"aria-expanded": isOpen,
			"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:144:7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-base font-medium text-foreground",
				"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:145:9",
				children: q
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-primary transition-transform ${isOpen ? "rotate-45" : ""}`,
				"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:146:9",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					viewBox: "0 0 24 24",
					className: "h-full w-full",
					"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:147:11",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M12 5v14M5 12h14",
						stroke: "currentColor",
						strokeWidth: "1.5",
						fill: "none",
						strokeLinecap: "round",
						"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:148:13"
					})
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `grid overflow-hidden transition-all duration-500 ${isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"}`,
			"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:152:7",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "min-h-0 px-6 text-sm leading-relaxed text-muted-foreground",
				dangerouslySetInnerHTML: { __html: a },
				"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:153:9"
			})
		})]
	});
}
function FreeAiAstrologyPage() {
	const [openFaq, setOpenFaq] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background",
		"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:161:10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-md",
				"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:163:7",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-6",
					"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:164:9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-2",
						"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:165:11",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: astrovaanii_logo_default,
							alt: "",
							width: 32,
							height: 32,
							className: "h-8 w-8",
							"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:166:13"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-display text-lg",
							"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:167:13",
							children: ["Astro", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:168:20",
								children: "Vaanii"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/signup",
						className: "rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90",
						"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:171:11",
						children: "Try AI Astrologer — Free"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8",
				"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:177:7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						"aria-label": "Breadcrumb",
						className: "mb-8",
						"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:179:9",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
							className: "flex items-center gap-2 text-sm text-muted-foreground",
							"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:180:11",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:181:13",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/",
										className: "hover:text-foreground transition-colors",
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:182:15",
										children: "Home"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "text-muted-foreground/40",
									"aria-hidden": "true",
									"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:186:13",
									children: "/"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "text-foreground font-medium",
									"aria-current": "page",
									"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:189:13",
									children: "Free AI Astrology Website"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card/80 to-background p-8 md:p-12 lg:p-16",
						"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:196:9",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative z-10 grid grid-cols-1 items-center gap-10 md:grid-cols-2",
							"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:197:11",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:198:13",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl",
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:199:15",
										children: "Get Free AI Astrology Predictions in Seconds"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-6 text-lg leading-relaxed text-muted-foreground",
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:202:15",
										children: "Discover personalized Vedic astrology insights powered by AI. Enter your birth details and receive instant predictions about career, love, marriage, health, education, and more."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-8",
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:207:15",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/signup",
											className: "inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90",
											"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:208:17",
											children: "✅ Start Free AI Reading"
										})
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-center",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:213:13",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/free-ai-astrology-website.webp",
									alt: "Free AI astrology website - Get instant Vedic predictions online",
									width: 1200,
									height: 630,
									className: "w-full max-w-lg rounded-2xl object-cover shadow-xl",
									loading: "eager",
									"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:214:15"
								})
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-20",
						"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:220:9",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center",
							"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:221:11",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs uppercase tracking-[0.2em] text-primary",
									"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:222:13",
									children: "Features"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-4 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl",
									"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:223:13",
									children: "Why Use Our AI Astrology?"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mx-auto mt-4 max-w-2xl text-lg text-muted-foreground",
									"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:226:13",
									children: "Our free AI astrology platform combines ancient Vedic wisdom with modern technology to give you accurate, personalized readings in seconds."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
							"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:231:11",
							children: featuresList.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `group relative overflow-hidden rounded-2xl border ${f.border} ${f.bg} p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5`,
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:232:41",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute -right-6 -top-6 h-24 w-24 rounded-full bg-background/40 blur-2xl",
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:233:17"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `flex h-12 w-12 items-center justify-center rounded-xl border ${f.border} ${f.bg} ${f.color}`,
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:234:17",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, {
											size: 22,
											strokeWidth: 1.5,
											"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:235:19"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-5 font-display text-lg font-medium text-foreground",
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:237:17",
										children: f.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm leading-relaxed text-muted-foreground",
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:238:17",
										children: f.desc
									})
								]
							}, f.title))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-20",
						"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:244:9",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:245:11",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs uppercase tracking-[0.2em] text-primary",
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:246:13",
										children: "Process"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-4 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl",
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:247:13",
										children: "How It Works"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mx-auto mt-4 max-w-2xl text-lg text-muted-foreground",
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:250:13",
										children: "Getting your free AI astrology reading takes just a few seconds. Follow these four simple steps."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-14 grid grid-cols-1 gap-8 md:grid-cols-4",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:256:11",
								children: [
									{
										icon: Pointer,
										title: "Enter Birth Details",
										desc: "Share your date of birth, exact birth time, and birth place. That is all we need to cast your chart.",
										highlight: "Date, Time & Place"
									},
									{
										icon: ScanLine,
										title: "AI Analyzes Your Horoscope",
										desc: "Our engine computes planetary positions, houses, nakshatras, dashas, and yogas using classical Vedic rules.",
										highlight: "Instant calculation"
									},
									{
										icon: MessageCircle,
										title: "Receive Personalized Predictions",
										desc: "Vaanii reads your chart and delivers predictions about career, love, marriage, health, and more in plain language.",
										highlight: "Career, love, health & more"
									},
									{
										icon: ChevronRight,
										title: "Ask Follow-up Questions",
										desc: "Dig deeper into any area. Your chart stays in context, so every follow-up builds on your previous reading.",
										highlight: "Unlimited follow-ups"
									}
								].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "group relative",
									"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:277:28",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5",
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:278:17",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mb-4 flex items-center justify-between",
												"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:280:19",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-display text-4xl font-bold tracking-tighter text-primary/20",
													"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:281:21",
													children: String(i + 1).padStart(2, "0")
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary",
													"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:284:21",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, {
														size: 20,
														strokeWidth: 1.5,
														"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:285:23"
													})
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-display text-lg font-medium text-foreground",
												"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:288:19",
												children: s.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-sm leading-relaxed text-muted-foreground",
												"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:289:19",
												children: s.desc
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-4 inline-block rounded-full bg-primary/5 px-3 py-1 text-xs font-medium text-primary",
												"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:290:19",
												children: s.highlight
											})
										]
									}), i < 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute -right-4 top-1/2 hidden -translate-y-1/2 text-muted-foreground/30 md:block",
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:296:27",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
											size: 24,
											strokeWidth: 1.5,
											"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:297:21"
										})
									})]
								}, s.title))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 flex justify-center gap-2 md:hidden",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:303:11",
								children: [
									0,
									1,
									2,
									3
								].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-2 w-2 rounded-full bg-primary/40",
									"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:304:36"
								}, i))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-20",
						"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:309:9",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center",
							"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:310:11",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs uppercase tracking-[0.2em] text-primary",
									"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:311:13",
									children: "What you get"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-4 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl",
									"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:312:13",
									children: "Your Complete AI Astrology Reading"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mx-auto mt-4 max-w-2xl text-lg text-muted-foreground",
									"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:315:13",
									children: "Every reading covers 16 dimensions of your life, grouped into three categories for easy understanding."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-14 space-y-10",
							"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:321:11",
							children: whatYouGetGroups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:322:44",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-5 flex items-center gap-3",
									"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:323:17",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-xl font-medium text-foreground",
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:324:19",
										children: group.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-px flex-1 bg-border",
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:327:19"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7",
									"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:329:17",
									children: group.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "group flex flex-col items-center rounded-xl border border-border bg-card p-4 text-center transition-all duration-200 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5",
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:330:44",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground",
												"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:331:23",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
													size: 18,
													strokeWidth: 1.5,
													"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:332:25"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mt-3 text-xs font-medium text-foreground sm:text-sm",
												"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:334:23",
												children: item.label
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mt-1 text-[10px] leading-tight text-muted-foreground sm:text-xs",
												"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:337:23",
												children: item.desc
											})
										]
									}, item.label))
								})]
							}, group.title))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "mt-20",
						"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:347:9",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl font-semibold text-foreground md:text-4xl",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:348:11",
								children: "Free AI Astrology Website — Your Complete Guide to Instant Vedic Predictions"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 text-lg leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:352:11",
								children: "Astrology has guided human decisions for thousands of years. From kings consulting court astrologers before battles to modern professionals checking their horoscope before signing a deal, the desire to understand what the stars reveal is timeless. But traditional astrology has always had barriers — high costs, limited availability, and complex jargon that only experts could decode."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:359:11",
								children: [
									"A ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:360:15",
										children: "free AI astrology website"
									}),
									" changes everything. It removes every barrier. No appointments, no fees, no confusing terminology. You enter your birth details and receive a complete, personalized reading within seconds. This is not a generic sun-sign horoscope that applies to millions of people. This is a reading based on your unique birth chart, calculated using classical Vedic principles and delivered through artificial intelligence."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:367:11",
								children: "In this comprehensive guide, you will learn everything about free AI astrology websites — how they work, what they can tell you, which features matter, and how to get the most accurate reading possible."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-10 font-display text-2xl font-semibold text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:373:11",
								children: "What Is a Free AI Astrology Website?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:376:11",
								children: [
									"A ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:377:15",
										children: "free AI astrology website"
									}),
									" is an online platform that uses artificial intelligence to analyze your birth chart and provide personalized astrology insights without charging any fees. Unlike traditional astrology services that require paid consultations, these platforms make Vedic wisdom accessible to everyone."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:383:11",
								children: "The core technology behind these platforms combines two elements: astrological calculation engines that compute planetary positions, houses, dashas, and yogas with precision, and AI language models that translate complex astrological data into simple, human-readable explanations. This combination makes it possible for anyone to understand their birth chart without spending years studying astrology."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-10 font-display text-2xl font-semibold text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:391:11",
								children: "How Does a Free AI Astrology Website Work?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:394:11",
								children: "Many people assume AI astrology is just a chatbot with generic answers. In reality, a well-designed free AI astrology website follows a precise, multi-step process before delivering any prediction."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:399:11",
								children: "First, the system collects your birth details: date of birth, exact time of birth, and place of birth. These three parameters are critical because even a difference of a few minutes in birth time can change your rising sign (Lagna), house placements, and the entire structure of your birth chart."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:405:11",
								children: "Second, the astrological calculation engine computes the exact positions of all planets at the moment of your birth. This includes the Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Rahu, and Ketu. The engine also determines which zodiac sign and nakshatra each planet occupies, which house it sits in, and what aspects it forms with other planets."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:411:11",
								children: "Third, the AI analyzes thousands of astrological combinations simultaneously. It checks for yogas (favorable combinations), doshas (unfavorable combinations), dasha periods (planetary time lords), transits, and divisional charts. A human astrologer might take hours to analyze all these factors. AI completes the same analysis in seconds."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:417:11",
								children: "Finally, the system generates a personalized report in natural language. Instead of showing you complex tables and technical terms, the AI explains what each combination means for your life — your career, relationships, health, finances, and personal growth."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-10 font-display text-2xl font-semibold text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:423:11",
								children: "Key Features of the Best Free AI Astrology Websites"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:426:11",
								children: "Not all free AI astrology websites are created equal. Here are the features that separate high-quality platforms from basic tools."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-medium text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:430:11",
								children: "Accurate Birth Chart Calculation"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:431:11",
								children: "The foundation of any good AI astrology reading is accurate chart calculation. The best platforms use NASA-grade ephemeris data or Swiss Ephemeris for precise astronomical calculations. Without accurate planetary positions, every prediction that follows will be unreliable."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-medium text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:437:11",
								children: "Vedic Astrology System"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:438:11",
								children: "Vedic astrology (Jyotish) differs significantly from Western astrology. It uses sidereal zodiac, nakshatras (lunar mansions), and a sophisticated dasha system for timing predictions. The best free AI astrology websites are built on classical Vedic principles, typically following Parashara and Jaimini traditions."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-medium text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:444:11",
								children: "Conversational AI"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:445:11",
								children: "Static reports give you one set of predictions and stop there. Conversational AI astrology allows you to ask follow-up questions, explore specific areas in more depth, and get clarifications. This turns a one-time reading into an ongoing dialogue."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-medium text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:450:11",
								children: "Multi-language Support"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:451:11",
								children: "Astrology is deeply personal, and language matters. The best platforms offer native support for multiple languages, not machine-translated outputs. This ensures that metaphors, cultural context, and emotional tone are preserved in every reading."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-medium text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:456:11",
								children: "Privacy and Security"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:457:11",
								children: "Birth details are sensitive personal information. Reputable AI astrology websites encrypt this data, never share it with third parties, and allow users to delete their information permanently. Always verify a platform's privacy practices before sharing your birth details."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-10 font-display text-2xl font-semibold text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:464:11",
								children: "What Can a Free AI Astrology Website Tell You?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:467:11",
								children: "A comprehensive free AI astrology website can provide insights across many areas of life. Here is what you can expect from a quality reading."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "mt-6 font-display text-xl font-medium text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:472:11",
								children: "Career and Professional Life"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:475:11",
								children: "Your birth chart reveals natural career inclinations, favorable periods for job changes, business opportunities, and professional growth. AI astrology can identify which career paths align with your planetary placements and when to make major career moves. The 10th house (Karma Bhava) and its lord, along with the placement of Saturn, Jupiter, and Mercury, provide deep insights into professional success."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "mt-6 font-display text-xl font-medium text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:483:11",
								children: "Love and Relationships"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:486:11",
								children: [
									"The 5th house (love, romance) and 7th house (marriage, partnership) in your birth chart reveal relationship patterns, compatibility factors, and timing for meaningful connections. AI astrology can analyze planetary placements affecting your love life, including Venus, Moon, and the 7th lord. It can also perform",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/free-kundli",
										className: "text-primary underline underline-offset-4 hover:opacity-80",
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:491:13",
										children: "Kundli matching"
									}),
									" ",
									"for compatibility assessment between partners."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "mt-6 font-display text-xl font-medium text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:497:11",
								children: "Marriage Timing"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:498:11",
								children: "One of the most common questions people ask astrology is about marriage timing. AI astrology analyzes your dasha periods, transit of Jupiter and Saturn, and 7th house conditions to identify favorable marriage windows. It can also check for mangal dosha (Mars affliction) and other factors that may influence marriage timing."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "mt-6 font-display text-xl font-medium text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:505:11",
								children: "Health and Wellness"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:508:11",
								children: "Certain houses and planets in your birth chart indicate health predispositions. The AI can analyze the 6th house (health, disease), 8th house (longevity), and the placement of Sun, Moon, and Ascendant lord to provide health insights. This is not a substitute for medical advice but offers a complementary perspective on your well-being."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "mt-6 font-display text-xl font-medium text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:515:11",
								children: "Education and Learning"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:518:11",
								children: "The 4th house (education) and 5th house (intellect) along with Mercury and Jupiter placements reveal natural learning styles, academic strengths, and favorable periods for education. AI astrology can guide students and parents on educational timing and subject choices."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "mt-6 font-display text-xl font-medium text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:525:11",
								children: "Finance and Wealth"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:528:11",
								children: "The 2nd house (wealth), 11th house (gains), and the placement of Jupiter (wealth giver) and Venus (luxuries) provide financial insights. AI astrology can identify favorable periods for investments, business expansion, and wealth accumulation."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "mt-6 font-display text-xl font-medium text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:534:11",
								children: "Dosha Analysis"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:535:11",
								children: "Vedic astrology identifies several doshas (afflictions) in a birth chart, including Mangal Dosha (Mars affliction), Kaal Sarp Dosha (Rahu-Ketu affliction), Nadi Dosha (for compatibility), and Pitru Dosha (ancestral affliction). A good AI astrology website can detect these doshas and suggest appropriate remedies based on classical texts."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-10 font-display text-2xl font-semibold text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:542:11",
								children: "Free AI Astrology Website vs Traditional Astrologer"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:545:11",
								children: "Understanding the difference between a free AI astrology website and a traditional human astrologer helps you choose the right approach for your needs."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 overflow-hidden rounded-2xl border border-border",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:549:11",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-3 border-b border-border bg-card/40 text-sm font-medium",
									"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:550:13",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "p-4 text-muted-foreground",
											"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:551:15",
											children: "Factor"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "p-4 text-primary",
											"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:552:15",
											children: "AI Astrology Website"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "p-4 text-muted-foreground",
											"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:553:15",
											children: "Human Astrologer"
										})
									]
								}), [
									{
										factor: "Cost",
										ai: "Free",
										human: "₹500–₹5000 per session"
									},
									{
										factor: "Speed",
										ai: "Instant (seconds)",
										human: "30–90 minutes"
									},
									{
										factor: "Availability",
										ai: "24/7",
										human: "By appointment"
									},
									{
										factor: "Consistency",
										ai: "Identical every time",
										human: "Varies by mood/expertise"
									},
									{
										factor: "Follow-ups",
										ai: "Unlimited, free",
										human: "New session required"
									},
									{
										factor: "Languages",
										ai: "Multiple (native)",
										human: "Usually 1–2 languages"
									},
									{
										factor: "Depth",
										ai: "Comprehensive analysis",
										human: "Depends on expertise"
									}
								].map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `grid grid-cols-3 text-sm ${i % 2 === 0 ? "bg-background/40" : ""}`,
									"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:583:30",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "p-4 font-medium text-foreground",
											"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:584:17",
											children: row.factor
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "p-4 text-foreground",
											"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:585:17",
											children: row.ai
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "p-4 text-muted-foreground",
											"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:586:17",
											children: row.human
										})
									]
								}, row.factor))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:589:11",
								children: "Both approaches have their place. A free AI astrology website is ideal for daily guidance, quick insights, and exploring your chart without commitment. A human astrologer is better for deep consultations, personalized remedies, and emotional support during major life transitions. Many people now use both — AI for regular check-ins and humans for special occasions."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-10 font-display text-2xl font-semibold text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:597:11",
								children: "Who Should Use a Free AI Astrology Website?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:600:11",
								children: "A free AI astrology website is valuable for many different types of users."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-4 list-disc space-y-2 pl-6 text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:603:11",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:604:13",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-foreground",
											"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:605:15",
											children: "Astrology beginners"
										}), " who want to understand their birth chart without learning complex terminology."]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:608:13",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-foreground",
											"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:609:15",
											children: "Busy professionals"
										}), " who need quick daily guidance without scheduling appointments."]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:612:13",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-foreground",
											"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:613:15",
											children: "Students"
										}), " exploring career and education options based on astrological timing."]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:616:13",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-foreground",
											"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:617:15",
											children: "Couples"
										}), " checking compatibility before marriage through Kundli matching."]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:620:13",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-foreground",
											"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:621:15",
											children: "Curious individuals"
										}), " who want to explore what astrology reveals about their personality and life path."]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:624:13",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-foreground",
											"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:625:15",
											children: "Regular seekers"
										}), " who want daily, weekly, or monthly horoscope updates based on their personal birth chart."]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-10 font-display text-2xl font-semibold text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:630:11",
								children: "Common Mistakes People Make with Free AI Astrology"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:633:11",
								children: "To get the most accurate reading from a free AI astrology website, avoid these common mistakes."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-medium text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:637:11",
								children: "Incorrect Birth Time"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:638:11",
								children: "The most common mistake is entering an approximate birth time. Even 10–15 minutes difference can change your Lagna (rising sign) and house placements. Always use the exact birth time from your birth certificate if possible."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-medium text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:643:11",
								children: "Unknown Birth Time"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:644:11",
								children: "If you do not know your exact birth time, many AI astrology websites offer birth time rectification or allow you to proceed with default settings. The reading will be less precise, but you can still get valuable insights from planetary positions and sign placements."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-medium text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:650:11",
								children: "Expecting Absolute Certainty"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:651:11",
								children: "Astrology, whether from AI or a human expert, provides guidance — not guarantees. Treat AI astrology readings as helpful perspectives that inform your decisions, not as absolute predictions that control your life."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-medium text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:656:11",
								children: "Ignoring Follow-up Questions"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:657:11",
								children: "The real power of AI astrology is the ability to ask follow-up questions. Do not stop at your first reading. Ask for clarifications, explore specific areas, and dig deeper into aspects that matter to you."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-10 font-display text-2xl font-semibold text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:663:11",
								children: "Myths and Facts About Free AI Astrology Websites"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:666:11",
								children: "Let us clear up some common misconceptions about AI astrology."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-medium text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:669:11",
								children: "Myth: AI astrology is just random predictions."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:672:11",
								children: "Fact: A quality AI astrology website performs real astronomical calculations based on your birth details. The predictions are based on classical astrological rules, not random generation."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-medium text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:677:11",
								children: "Myth: Free AI astrology websites are not accurate."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:680:11",
								children: "Fact: Many free AI astrology websites use the same calculation engines and astrological rules as paid platforms. The accuracy depends on the quality of the astrological engine, not the price tag."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-medium text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:685:11",
								children: "Myth: AI will replace human astrologers."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:688:11",
								children: "Fact: AI astrology complements human astrologers by making basic chart analysis accessible to everyone. Human astrologers bring intuition, experience, and personalized emotional support that AI cannot replicate."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-medium text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:693:11",
								children: "Myth: AI astrology does not follow real Vedic principles."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:696:11",
								children: "Fact: The best AI astrology websites are trained on classical Vedic texts including Parashara and Jaimini traditions. They follow the same rules and principles taught in traditional Vedic astrology."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-10 font-display text-2xl font-semibold text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:702:11",
								children: "How to Get the Most Out of a Free AI Astrology Website"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:705:11",
								children: "Follow these tips to maximize the value you receive from any AI astrology platform."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-medium text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:708:11",
								children: "1. Enter accurate birth details"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:709:11",
								children: "The quality of your reading depends entirely on the accuracy of your birth data. Take the time to find your correct birth time from reliable sources."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-medium text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:713:11",
								children: "2. Start with broad questions"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:714:11",
								children: "Begin with general questions about your chart before diving into specific areas. This helps the AI build context for more detailed follow-up questions."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-medium text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:718:11",
								children: "3. Ask specific follow-ups"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:719:11",
								children: "Once you have a general understanding, ask specific questions about career timing, relationship compatibility, health periods, or financial opportunities."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-medium text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:723:11",
								children: "4. Cross-reference multiple readings"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:724:11",
								children: "Check your AI reading against other sources or consult a human astrologer for major life decisions. Multiple perspectives lead to better understanding."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-medium text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:728:11",
								children: "5. Track predictions over time"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:729:11",
								children: "Keep notes on the predictions you receive and observe how they align with actual events in your life. This helps you understand which areas of your chart are most active and accurate."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-10 font-display text-2xl font-semibold text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:735:11",
								children: "Frequently Asked Questions About Free AI Astrology Websites"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:738:11",
								children: "Here are answers to the most common questions people ask before trying a free AI astrology website."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-medium text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:742:11",
								children: "Is a free AI astrology website as good as a paid one?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:745:11",
								children: "Many free AI astrology websites offer the same quality of chart calculation and analysis as paid platforms. The difference is often in premium features like detailed PDF reports, personalized remedy suggestions, or priority support. For basic daily readings and chart exploration, free platforms are excellent."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-medium text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:751:11",
								children: "Can a free AI astrology website do Kundli matching?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:754:11",
								children: "Yes, many AI astrology websites offer free Kundli matching (Kundli Milan) for compatibility analysis. This compares the birth charts of two individuals across multiple factors including nakshatra compatibility, dosha analysis, and planetary harmony."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-medium text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:760:11",
								children: "How does an AI astrology website handle unknown birth times?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:763:11",
								children: "Some platforms offer birth time rectification based on major life events. Others allow you to proceed with a default time (usually sunrise or 12:00 PM) and note that house placements may vary. The planetary sign placements remain accurate regardless of birth time."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-10 font-display text-2xl font-semibold text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:770:11",
								children: "The Future of Free AI Astrology"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:773:11",
								children: "Artificial intelligence in astrology is still in its early stages. The technology improves rapidly as AI models become more sophisticated and astrological knowledge bases expand."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:778:11",
								children: "Future free AI astrology websites will likely offer voice-based conversations, personalized remedial recommendations based on your specific chart, integration with wearable devices for real-time astrological guidance, and even more accurate timing predictions through advanced dasha analysis."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:784:11",
								children: "As Vedic astrology continues to gain global recognition, AI-powered platforms will play an increasingly important role in making this ancient wisdom accessible to people everywhere, regardless of their budget, location, or prior knowledge."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-10 font-display text-2xl font-semibold text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:790:11",
								children: "Why AstroVaanii Is the Best Free AI Astrology Website"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:793:11",
								children: "With so many AI astrology websites available, you might wonder what makes AstroVaanii different. Here is why thousands of users choose AstroVaanii for their free AI astrology readings."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:798:11",
								children: "AstroVaanii is built on classical Parashara and Jaimini Vedic methods — not generic Western astrology repackaged. The calculation engine uses precise ephemeris data for accurate planetary positions. The AI interpretation layer is trained on thousands of real Jyotish readings and audited weekly by practicing astrologers."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:804:11",
								children: "AstroVaanii supports 9 Indian languages natively, including Hindi, Tamil, Telugu, Kannada, Malayalam, Bengali, Marathi, Gujarati, and English. The conversations feel natural because the AI understands cultural context and astrological terminology in each language."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:810:11",
								children: "Unlike static report generators, AstroVaanii offers true conversational AI. You can ask unlimited follow-up questions, explore specific life areas in depth, and pick up conversations weeks later with full context retained."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-10 font-display text-2xl font-semibold text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:816:11",
								children: "Internal Links for Further Exploration"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:819:11",
								children: "To deepen your understanding of Vedic astrology and AI-powered predictions, explore these related resources:"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-4 list-disc space-y-2 pl-6 text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:823:11",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:824:13",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/",
											className: "text-primary underline underline-offset-4 hover:opacity-80",
											"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:825:15",
											children: "Homepage — Chat with Vaanii AI"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:829:13",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/free-kundli",
											className: "text-primary underline underline-offset-4 hover:opacity-80",
											"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:830:15",
											children: "Free AI Kundli Generator"
										}), "— Generate your complete birth chart with AI analysis"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:835:13",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/blogs/what-is-ai-astrologer",
											className: "text-primary underline underline-offset-4 hover:opacity-80",
											"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:836:15",
											children: "What Is an AI Astrologer?"
										}), "— A simple guide to how AI astrology works"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:841:13",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/blogs",
											className: "text-primary underline underline-offset-4 hover:opacity-80",
											"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:842:15",
											children: "Astrology Blog"
										}), "— More articles about Vedic astrology, birth charts, and AI predictions"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-10 rounded-3xl border border-border bg-card p-8",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:849:11",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-2xl font-semibold text-foreground",
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:850:13",
										children: "Final Thoughts"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-4 leading-relaxed text-muted-foreground",
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:851:13",
										children: [
											"A ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-foreground",
												"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:852:17",
												children: "free AI astrology website"
											}),
											" is the easiest way to explore your birth chart and receive personalized Vedic insights without spending money or scheduling appointments. Whether you are curious about your career path, love life, health, or financial future, AI astrology gives you instant access to wisdom that was once reserved for experts."
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 leading-relaxed text-muted-foreground",
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:858:13",
										children: "The key is to choose a platform that uses accurate astrological calculations, follows authentic Vedic principles, and explains everything in simple language. AstroVaanii meets all these criteria and more — it is free, conversational, multilingual, and built on classical traditions."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 leading-relaxed text-muted-foreground",
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:864:13",
										children: "Your birth chart is a map of your cosmic blueprint. With AI astrology, you can read that map in minutes instead of years. Start your journey today and discover what the stars have to say about your unique path."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-6",
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:869:13",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/signup",
											className: "inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90",
											"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:870:15",
											children: "✅ Start Free AI Reading"
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-10 rounded-3xl border border-border bg-primary/5 p-8",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:877:11",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-2xl font-semibold text-foreground",
									"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:878:13",
									children: "Key Takeaways"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "mt-4 list-disc space-y-2 pl-6 text-muted-foreground",
									"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:879:13",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
											"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:880:15",
											children: "A free AI astrology website provides personalized Vedic readings based on your exact birth details — no appointments or fees required."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
											"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:884:15",
											children: "The best platforms use precise astronomical calculations and follow classical Parashara and Jaimini traditions."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
											"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:888:15",
											children: "AI astrology can cover career, love, marriage, health, finance, doshas, dasha periods, and more."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
											"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:892:15",
											children: "Enter accurate birth details for the most reliable readings. Even small time differences can affect your chart."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
											"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:896:15",
											children: "AI astrology is a complementary tool — use it alongside human astrologers for major life decisions."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
											"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:900:15",
											children: "AstroVaanii offers free, conversational AI astrology in 9 Indian languages with unlimited follow-up questions."
										})
									]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-20",
						"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:909:9",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl font-semibold text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:910:11",
								children: "Frequently Asked Questions"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:913:11",
								children: "Everything you need to know about free AI astrology websites."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 divide-y divide-border rounded-3xl border border-border bg-card",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:916:11",
								children: faqs.map((faq, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaqItem, {
									q: faq.q,
									a: faq.a,
									isOpen: openFaq === i,
									toggle: () => setOpenFaq(openFaq === i ? null : i),
									"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:917:35"
								}, faq.q))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "mt-20 text-center",
						"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:922:9",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-border bg-gradient-to-br from-card/80 to-background p-10",
							"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:923:11",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-3xl font-semibold text-foreground md:text-4xl",
									"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:924:13",
									children: "Ready to Try a Free AI Astrology Reading?"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mx-auto mt-4 max-w-2xl text-lg text-muted-foreground",
									"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:927:13",
									children: "Get your personalized Vedic astrology reading in seconds. No credit card required. No appointments. Just enter your birth details and discover what the stars reveal about your life."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-8",
									"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:932:13",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/signup",
										className: "inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90",
										"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:933:15",
										children: "✅ Start Free AI Reading"
									})
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "mt-16 border-t border-border pt-12 text-center",
						"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:940:9",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-muted-foreground",
							"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:941:11",
							children: [
								"Want to learn more? Read our guide on",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/blogs/what-is-ai-astrologer",
									className: "text-primary underline underline-offset-4 hover:opacity-80",
									"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:943:13",
									children: "what is an AI astrologer"
								}),
								" ",
								"or try",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/free-kundli",
									className: "text-primary underline underline-offset-4 hover:opacity-80",
									"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:947:13",
									children: "free AI Kundli generation"
								}),
								"."
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border bg-card/40 py-12",
				"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:956:7",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8",
					"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:957:9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground",
						"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:958:11",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "hover:text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:959:13",
								children: "Home"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/blogs",
								className: "hover:text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:962:13",
								children: "Blog"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/blogs/what-is-ai-astrologer",
								className: "hover:text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:965:13",
								children: "What Is an AI Astrologer?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/free-kundli",
								className: "hover:text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:968:13",
								children: "Free Kundli"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/privacy-policy",
								className: "hover:text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:971:13",
								children: "Privacy Policy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/terms-and-conditions",
								className: "hover:text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:974:13",
								children: "Terms & Conditions"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/refund-policy",
								className: "hover:text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:977:13",
								children: "Refund Policy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/disclaimer",
								className: "hover:text-foreground",
								"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:980:13",
								children: "Disclaimer"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-center text-xs text-muted-foreground/60",
						"data-tsd-source": "/src/routes/ai-astrology-website-free.tsx:984:11",
						children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" AstroVaanii"
						]
					})]
				})
			})
		]
	});
}
//#endregion
export { FreeAiAstrologyPage as component };
