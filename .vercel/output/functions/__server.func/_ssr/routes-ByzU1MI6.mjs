import { o as __toESM } from "../_runtime.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as vaanii_persona_default, t as auth } from "./vaanii-persona-D2kfjqvC.mjs";
import { t as startalks_icon_default } from "./startalks-icon-Ch-3XBzc.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as Reveal } from "./Reveal-CznoT_Wi.mjs";
import { t as faqs } from "./routes-DcqvICF5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-ByzU1MI6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Loader() {
	const [gone, setGone] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const t = setTimeout(() => setGone(true), 2200);
		return () => clearTimeout(t);
	}, []);
	if (gone) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "loader-out fixed inset-0 z-[100] flex items-center justify-center bg-background",
		"data-tsd-source": "/src/components/landing/Loader.tsx:12:5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-40 w-40",
			"data-tsd-source": "/src/components/landing/Loader.tsx:13:7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					viewBox: "0 0 200 200",
					className: "spin-slow absolute inset-0 text-primary/70",
					"data-tsd-source": "/src/components/landing/Loader.tsx:14:9",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "100",
							cy: "100",
							r: "80",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "0.6",
							strokeDasharray: "2 6",
							"data-tsd-source": "/src/components/landing/Loader.tsx:15:11"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "100",
							cy: "100",
							r: "60",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "0.6",
							"data-tsd-source": "/src/components/landing/Loader.tsx:16:11"
						}),
						Array.from({ length: 12 }).map((_, i) => {
							const a = i * Math.PI * 2 / 12;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
								x1: 100 + Math.cos(a) * 60,
								y1: 100 + Math.sin(a) * 60,
								x2: 100 + Math.cos(a) * 80,
								y2: 100 + Math.sin(a) * 80,
								stroke: "currentColor",
								strokeWidth: "0.8",
								"data-tsd-source": "/src/components/landing/Loader.tsx:20:15"
							}, i);
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					viewBox: "0 0 200 200",
					className: "absolute inset-0",
					"data-tsd-source": "/src/components/landing/Loader.tsx:32:9",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
						transform: "translate(100 100)",
						fill: "none",
						stroke: "var(--gold)",
						strokeWidth: "1.2",
						"data-tsd-source": "/src/components/landing/Loader.tsx:33:11",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M 0 -40 L 6 -6 L 40 0 L 6 6 L 0 40 L -6 6 L -40 0 L -6 -6 Z",
							"data-tsd-source": "/src/components/landing/Loader.tsx:34:13"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-x-0 -bottom-10 text-center",
					"data-tsd-source": "/src/components/landing/Loader.tsx:37:9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg tracking-wide text-primary",
						"data-tsd-source": "/src/components/landing/Loader.tsx:38:11",
						children: "Astro"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-1 font-display text-lg text-foreground/60",
						"data-tsd-source": "/src/components/landing/Loader.tsx:39:11",
						children: "Vaanii"
					})]
				})
			]
		})
	});
}
var chat_preview_default = "/assets/chat-preview-BZj__lbt.jpg";
var section_cosmos_default = "/assets/section-cosmos-1izFefyP.jpg";
var reviews = [
	{
		name: "Priya S.",
		city: "Pune",
		stars: 5,
		text: "I asked Vaanii about my career shift at 2 AM and got a thoughtful reading in five minutes. No astrologer would pick up. This just works."
	},
	{
		name: "Arun K.",
		city: "Chennai",
		stars: 5,
		text: "Follow-up questions are the game changer. I kept asking 'but why?' and Vaanii kept explaining — like a patient teacher, not a horoscope app."
	},
	{
		name: "Meera J.",
		city: "Ahmedabad",
		stars: 5,
		text: "Switched to Gujarati mid-conversation and it flowed naturally. Felt like talking to a family jyotishi, not a chatbot."
	},
	{
		name: "Rahul V.",
		city: "Bengaluru",
		stars: 5,
		text: "The Kundli Milan chat was more honest than three astrologers we visited. Vaanii flagged Nadi dosha without sugar-coating."
	}
];
var languages = [
	"English",
	"हिंदी",
	"मराठी",
	"தமிழ்",
	"తెలుగు",
	"ಕನ್ನಡ",
	"മലയാളം",
	"বাংলা",
	"ગુજરાતી"
];
function Nav() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/50",
		"data-tsd-source": "/src/routes/index.tsx:34:10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-6",
			"data-tsd-source": "/src/routes/index.tsx:35:7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#top",
					className: "flex items-center gap-2",
					"data-tsd-source": "/src/routes/index.tsx:36:9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: startalks_icon_default,
						alt: "",
						width: 32,
						height: 32,
						className: "h-8 w-8",
						"data-tsd-source": "/src/routes/index.tsx:37:11"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-display text-lg",
						"data-tsd-source": "/src/routes/index.tsx:38:11",
						children: ["Astro", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							"data-tsd-source": "/src/routes/index.tsx:38:55",
							children: "Vaanii"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden gap-8 text-sm text-muted-foreground md:flex",
					"data-tsd-source": "/src/routes/index.tsx:40:9",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#meet",
							className: "hover:text-foreground",
							"data-tsd-source": "/src/routes/index.tsx:41:11",
							children: "Meet Vaanii"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#daily",
							className: "hover:text-foreground",
							"data-tsd-source": "/src/routes/index.tsx:42:11",
							children: "Daily prediction"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#how",
							className: "hover:text-foreground",
							"data-tsd-source": "/src/routes/index.tsx:43:11",
							children: "How it works"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#faq",
							className: "hover:text-foreground",
							"data-tsd-source": "/src/routes/index.tsx:44:11",
							children: "FAQ"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/signup",
					className: "rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90",
					"data-tsd-source": "/src/routes/index.tsx:46:9",
					children: "Start chat"
				})
			]
		})
	});
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "top",
		className: "relative overflow-hidden grain",
		"data-tsd-source": "/src/routes/index.tsx:53:10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "orb h-[420px] w-[420px] bg-[color:var(--gold)] -left-32 -top-24",
				"data-tsd-source": "/src/routes/index.tsx:54:7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "orb h-[380px] w-[380px] bg-[color:var(--clay)] -right-24 top-40 opacity-40",
				"data-tsd-source": "/src/routes/index.tsx:55:7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28",
				"data-tsd-source": "/src/routes/index.tsx:57:7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-tsd-source": "/src/routes/index.tsx:58:9",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							"data-tsd-source": "/src/routes/index.tsx:59:11",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground",
								"data-tsd-source": "/src/routes/index.tsx:60:13",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "h-1.5 w-1.5 rounded-full bg-[color:var(--sage)]",
									"data-tsd-source": "/src/routes/index.tsx:61:15"
								}), "Trained on classical Parashara & Jaimini methods"]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: 80,
							"data-tsd-source": "/src/routes/index.tsx:65:11",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-6 font-display text-5xl leading-[1.05] tracking-tight text-foreground md:text-6xl",
								"data-tsd-source": "/src/routes/index.tsx:66:13",
								children: [
									"Meet ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
										className: "not-italic text-primary",
										"data-tsd-source": "/src/routes/index.tsx:67:20",
										children: "Vaanii"
									}),
									", your personal AI astrologer."
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: 160,
							"data-tsd-source": "/src/routes/index.tsx:70:11",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/index.tsx:71:13",
								children: "AstroVaanii is a Vedic AI astrologer available 24/7 — no appointments, no waiting. Classical Jyotish calculations, natural conversation, nine Indian languages."
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: 240,
							"data-tsd-source": "/src/routes/index.tsx:76:11",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 flex flex-wrap items-center gap-3",
								"data-tsd-source": "/src/routes/index.tsx:77:13",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/signup",
									className: "rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90",
									"data-tsd-source": "/src/routes/index.tsx:78:15",
									children: "Chat with Vaanii AI - it's Free"
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							delay: 320,
							"data-tsd-source": "/src/routes/index.tsx:83:11",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-8",
								"data-tsd-source": "/src/routes/index.tsx:84:13",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-tsd-source": "/src/routes/index.tsx:85:15",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "text-xs uppercase tracking-wider text-muted-foreground",
											"data-tsd-source": "/src/routes/index.tsx:85:20",
											children: "Conversations"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "mt-1 font-display text-2xl",
											"data-tsd-source": "/src/routes/index.tsx:85:109",
											children: "2.4M+"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-tsd-source": "/src/routes/index.tsx:86:15",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "text-xs uppercase tracking-wider text-muted-foreground",
											"data-tsd-source": "/src/routes/index.tsx:86:20",
											children: "Languages"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "mt-1 font-display text-2xl",
											"data-tsd-source": "/src/routes/index.tsx:86:105",
											children: "9"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-tsd-source": "/src/routes/index.tsx:87:15",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "text-xs uppercase tracking-wider text-muted-foreground",
											"data-tsd-source": "/src/routes/index.tsx:87:20",
											children: "Rating"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "mt-1 font-display text-2xl",
											"data-tsd-source": "/src/routes/index.tsx:87:102",
											children: "4.9★"
										})]
									})
								]
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: 200,
					className: "relative",
					"data-tsd-source": "/src/routes/index.tsx:92:9",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto aspect-[4/5] w-full max-w-md",
						"data-tsd-source": "/src/routes/index.tsx:93:11",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 -rotate-3 rounded-[999px_999px_28px_28px] bg-[color:var(--accent)] shadow-xl",
								"data-tsd-source": "/src/routes/index.tsx:95:13"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative h-full w-full overflow-hidden rounded-[999px_999px_28px_28px] shadow-2xl ring-1 ring-[color:var(--gold)]/40",
								"data-tsd-source": "/src/routes/index.tsx:96:13",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: vaanii_persona_default,
										alt: "Portrait of Vaanii, the AstroVaanii AI astrologer",
										width: 1024,
										height: 1280,
										className: "h-full w-full object-cover",
										"data-tsd-source": "/src/routes/index.tsx:97:15"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "pointer-events-none absolute inset-0 bg-[radial-gradient(120%_60%_at_50%_0%,transparent_55%,rgba(0,0,0,0.35))]",
										"data-tsd-source": "/src/routes/index.tsx:99:15"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute inset-x-4 bottom-4 rounded-2xl border border-white/20 bg-black/35 px-4 py-3 text-white backdrop-blur-md",
										"data-tsd-source": "/src/routes/index.tsx:101:15",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											"data-tsd-source": "/src/routes/index.tsx:102:17",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												"data-tsd-source": "/src/routes/index.tsx:103:19",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-display text-base leading-tight",
													"data-tsd-source": "/src/routes/index.tsx:104:21",
													children: "Vaanii"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[11px] uppercase tracking-widest text-white/70",
													"data-tsd-source": "/src/routes/index.tsx:105:21",
													children: "AI Vedic Astrologer"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5 text-[11px]",
												"data-tsd-source": "/src/routes/index.tsx:107:19",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "h-2 w-2 rounded-full bg-[color:var(--sage)] shadow-[0_0_8px_var(--sage)]",
													"data-tsd-source": "/src/routes/index.tsx:108:21"
												}), "Online"]
											})]
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "float absolute -left-8 top-10 w-44 rounded-2xl border border-border bg-card p-4 shadow-lg",
								style: { ["--r"]: "-4deg" },
								"data-tsd-source": "/src/routes/index.tsx:115:13",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground",
										"data-tsd-source": "/src/routes/index.tsx:118:15",
										children: "You asked"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 font-display text-sm leading-snug",
										"data-tsd-source": "/src/routes/index.tsx:119:15",
										children: "\"How is my day today?\""
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 text-xs text-[color:var(--sage)]",
										"data-tsd-source": "/src/routes/index.tsx:120:15",
										children: "Reply in 4 seconds"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "float absolute -right-6 bottom-24 w-40 rounded-2xl border border-border bg-card p-4 shadow-lg",
								style: {
									["--r"]: "3deg",
									animationDelay: "1.4s"
								},
								"data-tsd-source": "/src/routes/index.tsx:122:13",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground",
										"data-tsd-source": "/src/routes/index.tsx:126:15",
										children: "Available"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 font-display text-2xl text-primary",
										"data-tsd-source": "/src/routes/index.tsx:127:15",
										children: "24/7"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 text-xs",
										"data-tsd-source": "/src/routes/index.tsx:128:15",
										children: "No appointment"
									})
								]
							})
						]
					})
				})]
			})
		]
	});
}
function Marquee() {
	const items = [
		"Today",
		"Tomorrow",
		"Career",
		"Marriage",
		"Kundli Milan",
		"Wealth",
		"Timing",
		"Doshas",
		"Remedies"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "border-y border-border bg-card/40 py-5 overflow-hidden",
		"data-tsd-source": "/src/routes/index.tsx:138:10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "marquee-track gap-12 text-muted-foreground",
			"data-tsd-source": "/src/routes/index.tsx:139:7",
			children: [...items, ...items].map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-12 font-display text-xl",
				"data-tsd-source": "/src/routes/index.tsx:140:32",
				children: [w, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-primary/50",
					"data-tsd-source": "/src/routes/index.tsx:142:13",
					children: "✦"
				})]
			}, i))
		})
	});
}
function DailyPrediction() {
	const [day, setDay] = (0, import_react.useState)("today");
	const samplePrompts = day === "today" ? [
		"Vaanii, how is my day today?",
		"Is today a good day to sign the contract?",
		"Which hour is most favourable today?"
	] : [
		"What does tomorrow look like for me?",
		"Should I travel tomorrow?",
		"Any dosha active in tomorrow's transit?"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "daily",
		className: "relative overflow-hidden py-24",
		"data-tsd-source": "/src/routes/index.tsx:150:10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "orb h-[360px] w-[360px] bg-[color:var(--clay)] left-1/3 top-10 opacity-40",
			"data-tsd-source": "/src/routes/index.tsx:151:7"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-6xl px-6",
			"data-tsd-source": "/src/routes/index.tsx:152:7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-start justify-between gap-6 md:flex-row md:items-end",
				"data-tsd-source": "/src/routes/index.tsx:153:9",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					"data-tsd-source": "/src/routes/index.tsx:154:11",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs uppercase tracking-[0.2em] text-primary",
							"data-tsd-source": "/src/routes/index.tsx:155:13",
							children: "Daily readings"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mt-4 max-w-2xl font-display text-4xl md:text-5xl",
							"data-tsd-source": "/src/routes/index.tsx:156:13",
							children: [
								"Ask Vaanii for your ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: "not-italic text-primary",
									"data-tsd-source": "/src/routes/index.tsx:157:35",
									children: "today"
								}),
								" and",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: "not-italic text-primary",
									"data-tsd-source": "/src/routes/index.tsx:158:15",
									children: "tomorrow"
								}),
								" prediction."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-xl text-muted-foreground",
							"data-tsd-source": "/src/routes/index.tsx:160:13",
							children: "A quick, personal reading based on live planetary transits and your own chart — not a generic sun-sign horoscope everyone else is reading."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: 100,
					"data-tsd-source": "/src/routes/index.tsx:166:11",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex rounded-full border border-border bg-card p-1 text-sm",
						"data-tsd-source": "/src/routes/index.tsx:167:13",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setDay("today"),
							className: `rounded-full px-5 py-2 transition ${day === "today" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`,
							"data-tsd-source": "/src/routes/index.tsx:168:15",
							children: "Today"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setDay("tomorrow"),
							className: `rounded-full px-5 py-2 transition ${day === "tomorrow" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`,
							"data-tsd-source": "/src/routes/index.tsx:171:15",
							children: "Tomorrow"
						})]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_1fr]",
				"data-tsd-source": "/src/routes/index.tsx:178:9",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					"data-tsd-source": "/src/routes/index.tsx:180:11",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border bg-card p-6 shadow-xl",
						"data-tsd-source": "/src/routes/index.tsx:181:13",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 border-b border-border pb-4",
								"data-tsd-source": "/src/routes/index.tsx:182:15",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: vaanii_persona_default,
									alt: "",
									width: 40,
									height: 40,
									className: "h-10 w-10 rounded-full object-cover ring-1 ring-[color:var(--gold)]/50",
									"data-tsd-source": "/src/routes/index.tsx:183:17"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-tsd-source": "/src/routes/index.tsx:184:17",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-display text-base",
										"data-tsd-source": "/src/routes/index.tsx:185:19",
										children: "Vaanii"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5 text-xs text-muted-foreground",
										"data-tsd-source": "/src/routes/index.tsx:186:19",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "h-1.5 w-1.5 rounded-full bg-[color:var(--sage)]",
												"data-tsd-source": "/src/routes/index.tsx:187:21"
											}),
											" typing your ",
											day,
											"'s reading…"
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 space-y-4",
								"data-tsd-source": "/src/routes/index.tsx:192:15",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "ml-auto max-w-[75%] rounded-2xl rounded-br-md bg-primary px-4 py-3 text-sm text-primary-foreground",
										"data-tsd-source": "/src/routes/index.tsx:193:17",
										children: samplePrompts[0]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "max-w-[85%] rounded-2xl rounded-bl-md bg-[color:var(--accent)]/60 px-4 py-3 text-sm leading-relaxed text-foreground",
										"data-tsd-source": "/src/routes/index.tsx:196:17",
										children: day === "today" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
											"Moon transits your 10th house — a strong career window between",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
												"data-tsd-source": "/src/routes/index.tsx:199:23",
												children: "11:20 AM – 1:40 PM"
											}),
											". Send that pending message, but avoid financial commitments after sunset. Rahu is subtle today; keep decisions simple."
										] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
											"Tomorrow's Chandra shifts into your 5th — creativity and children-related news feel warm. Favourable muhurta around ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
												"data-tsd-source": "/src/routes/index.tsx:203:49",
												children: "9:05 AM – 10:30 AM"
											}),
											". Postpone travel past 7 PM; Mars aspect is restless."
										] })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "ml-auto max-w-[75%] rounded-2xl rounded-br-md bg-primary/90 px-4 py-3 text-sm text-primary-foreground",
										"data-tsd-source": "/src/routes/index.tsx:207:17",
										children: samplePrompts[1]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1 text-muted-foreground",
										"data-tsd-source": "/src/routes/index.tsx:210:17",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "h-2 w-2 animate-pulse rounded-full bg-primary",
												"data-tsd-source": "/src/routes/index.tsx:211:19"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "h-2 w-2 animate-pulse rounded-full bg-primary [animation-delay:200ms]",
												"data-tsd-source": "/src/routes/index.tsx:212:19"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "h-2 w-2 animate-pulse rounded-full bg-primary [animation-delay:400ms]",
												"data-tsd-source": "/src/routes/index.tsx:213:19"
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 flex flex-wrap gap-2",
								"data-tsd-source": "/src/routes/index.tsx:217:15",
								children: samplePrompts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground/80 hover:bg-accent",
									"data-tsd-source": "/src/routes/index.tsx:218:41",
									children: p
								}, p))
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: 120,
					"data-tsd-source": "/src/routes/index.tsx:226:11",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border bg-card/70 p-6 backdrop-blur",
						"data-tsd-source": "/src/routes/index.tsx:227:13",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-baseline justify-between",
								"data-tsd-source": "/src/routes/index.tsx:228:15",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "font-display text-xl",
									"data-tsd-source": "/src/routes/index.tsx:229:17",
									children: [
										"How we see your ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-primary",
											"data-tsd-source": "/src/routes/index.tsx:230:35",
											children: [day, "'s"]
										}),
										" prediction"
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								"data-tsd-source": "/src/routes/index.tsx:233:15",
								children: "No sun-sign horoscopes. Three real inputs, one personal reading."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
								className: "mt-6 space-y-5",
								"data-tsd-source": "/src/routes/index.tsx:237:15",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex gap-4",
										"data-tsd-source": "/src/routes/index.tsx:238:17",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-display text-sm text-primary",
											"data-tsd-source": "/src/routes/index.tsx:239:19",
											children: "1"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-tsd-source": "/src/routes/index.tsx:240:19",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-display text-base",
												"data-tsd-source": "/src/routes/index.tsx:241:21",
												children: "Your birth details"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-sm text-muted-foreground",
												"data-tsd-source": "/src/routes/index.tsx:242:21",
												children: "Date, exact time and place of birth — the foundation of your personal Kundli."
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex gap-4",
										"data-tsd-source": "/src/routes/index.tsx:247:17",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-display text-sm text-primary",
											"data-tsd-source": "/src/routes/index.tsx:248:19",
											children: "2"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-tsd-source": "/src/routes/index.tsx:249:19",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-display text-base",
												"data-tsd-source": "/src/routes/index.tsx:250:21",
												children: "Real-time planetary positions"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-sm text-muted-foreground",
												"data-tsd-source": "/src/routes/index.tsx:251:21",
												children: "We pull live transits from a NASA-grade ephemeris API — the same precision used in space missions, updated every minute."
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex gap-4",
										"data-tsd-source": "/src/routes/index.tsx:257:17",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 font-display text-sm text-primary",
											"data-tsd-source": "/src/routes/index.tsx:258:19",
											children: "3"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											"data-tsd-source": "/src/routes/index.tsx:259:19",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-display text-base",
												"data-tsd-source": "/src/routes/index.tsx:260:21",
												children: "Analyzed by Vaanii AI"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-sm text-muted-foreground",
												"data-tsd-source": "/src/routes/index.tsx:261:21",
												children: "Vaanii cross-reads your chart against today's transits using classical Parashara rules — and explains it in plain language."
											})]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "#meet",
								className: "mt-7 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90",
								"data-tsd-source": "/src/routes/index.tsx:269:15",
								children: [
									"Get my ",
									day,
									"'s reading"
								]
							})
						]
					})
				})]
			})]
		})]
	});
}
function WhatIs() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative py-24",
		"data-tsd-source": "/src/routes/index.tsx:279:10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 md:grid-cols-2",
			"data-tsd-source": "/src/routes/index.tsx:280:7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				"data-tsd-source": "/src/routes/index.tsx:281:9",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs uppercase tracking-[0.2em] text-primary",
					"data-tsd-source": "/src/routes/index.tsx:282:11",
					children: "What is an AI Astrologer"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 font-display text-4xl leading-tight md:text-5xl",
					"data-tsd-source": "/src/routes/index.tsx:283:11",
					children: "An astrologer who never sleeps, never rushes, never judges."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				delay: 120,
				"data-tsd-source": "/src/routes/index.tsx:287:9",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg leading-relaxed text-muted-foreground",
					"data-tsd-source": "/src/routes/index.tsx:288:11",
					children: "AstroVaanii combines exact classical Vedic calculations with an interpretation model trained on thousands of real Jyotish readings. Vaanii reads your chart the way a seasoned astrologer would — just faster, always available, and consistent every single time."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-6 space-y-3 text-foreground/90",
					"data-tsd-source": "/src/routes/index.tsx:293:11",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							"data-tsd-source": "/src/routes/index.tsx:294:13",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary",
								"data-tsd-source": "/src/routes/index.tsx:294:40"
							}), "Instant chart generation with zero wait time"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							"data-tsd-source": "/src/routes/index.tsx:295:13",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary",
								"data-tsd-source": "/src/routes/index.tsx:295:40"
							}), "Trained on classical Parashara & Jaimini texts"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							"data-tsd-source": "/src/routes/index.tsx:296:13",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary",
								"data-tsd-source": "/src/routes/index.tsx:296:40"
							}), "Available in 9 Indian languages, 24/7"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-3",
							"data-tsd-source": "/src/routes/index.tsx:297:13",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary",
								"data-tsd-source": "/src/routes/index.tsx:297:40"
							}), "Audited weekly by practising Jyotishis"]
						})
					]
				})]
			})]
		})
	});
}
function MeetAI() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "meet",
		className: "relative py-24",
		"data-tsd-source": "/src/routes/index.tsx:305:10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "orb h-[320px] w-[320px] bg-[color:var(--gold)] right-0 top-10 opacity-40",
			"data-tsd-source": "/src/routes/index.tsx:306:7"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 md:grid-cols-[1.1fr_1fr]",
			"data-tsd-source": "/src/routes/index.tsx:307:7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: 100,
				className: "order-2 md:order-1",
				"data-tsd-source": "/src/routes/index.tsx:308:9",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative aspect-square w-full max-w-md",
					"data-tsd-source": "/src/routes/index.tsx:309:11",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 rotate-2 rounded-3xl bg-[color:var(--accent)] shadow-xl",
						"data-tsd-source": "/src/routes/index.tsx:310:13"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: chat_preview_default,
						alt: "Preview of a chat conversation with Vaanii, the AstroVaanii AI astrologer",
						loading: "lazy",
						width: 1024,
						height: 1024,
						className: "relative h-full w-full rounded-3xl object-cover shadow-2xl",
						"data-tsd-source": "/src/routes/index.tsx:311:13"
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "order-1 md:order-2",
				"data-tsd-source": "/src/routes/index.tsx:314:9",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
						"data-tsd-source": "/src/routes/index.tsx:315:11",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs uppercase tracking-[0.2em] text-primary",
							"data-tsd-source": "/src/routes/index.tsx:316:13",
							children: "Meet Vaanii"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mt-4 font-display text-4xl md:text-5xl",
							"data-tsd-source": "/src/routes/index.tsx:317:13",
							children: [
								"Ask ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
									className: "not-italic text-primary",
									"data-tsd-source": "/src/routes/index.tsx:318:19",
									children: "anything"
								}),
								". About today, tomorrow, career, karma."
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: 100,
						"data-tsd-source": "/src/routes/index.tsx:321:11",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-lg text-muted-foreground",
							"data-tsd-source": "/src/routes/index.tsx:322:13",
							children: "AstroVaanii is a conversation, not a static report. Ask a question, follow up, dig deeper — your chart stays in context throughout."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: 200,
						"data-tsd-source": "/src/routes/index.tsx:327:11",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-8 flex flex-wrap gap-2",
							"data-tsd-source": "/src/routes/index.tsx:328:13",
							children: [
								"How is my day today?",
								"What does tomorrow bring?",
								"Is this the right time to switch jobs?",
								"Read my Kundli Milan with this person.",
								"What remedy can help my Mangal dosha?"
							].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground/80",
								"data-tsd-source": "/src/routes/index.tsx:329:33",
								children: [
									"“",
									p,
									"”"
								]
							}, p))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: 280,
						"data-tsd-source": "/src/routes/index.tsx:334:11",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#meet",
							className: "mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90",
							"data-tsd-source": "/src/routes/index.tsx:335:13",
							children: "Start your first chat — free"
						})
					})
				]
			})]
		})]
	});
}
function HowItWorks() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "how",
		className: "relative overflow-hidden py-24",
		"data-tsd-source": "/src/routes/index.tsx:361:10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: section_cosmos_default,
			alt: "",
			"aria-hidden": true,
			loading: "lazy",
			width: 1600,
			height: 912,
			className: "absolute inset-0 h-full w-full object-cover opacity-20 blur-sm",
			"data-tsd-source": "/src/routes/index.tsx:362:7"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-6xl px-6",
			"data-tsd-source": "/src/routes/index.tsx:363:7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				"data-tsd-source": "/src/routes/index.tsx:364:9",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs uppercase tracking-[0.2em] text-primary",
					"data-tsd-source": "/src/routes/index.tsx:365:11",
					children: "How it works"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 max-w-2xl font-display text-4xl md:text-5xl",
					"data-tsd-source": "/src/routes/index.tsx:366:11",
					children: "From birth date to a full Jyotish conversation in under a minute."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4",
				"data-tsd-source": "/src/routes/index.tsx:371:9",
				children: [
					{
						n: "01",
						t: "Share birth details",
						d: "Date, time and place. That's the only data Vaanii needs to cast your chart."
					},
					{
						n: "02",
						t: "We compute your Kundli",
						d: "Planetary positions, houses, dashas — calculated with classical precision."
					},
					{
						n: "03",
						t: "Vaanii interprets",
						d: "AstroVaanii reads dashas, yogas and doshas and translates them into natural conversation."
					},
					{
						n: "04",
						t: "Ask, follow up, revisit",
						d: "Reply in nine languages, ask anything, and pick up the same chat weeks later."
					}
				].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * 100,
					"data-tsd-source": "/src/routes/index.tsx:372:32",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "h-full rounded-3xl border border-border bg-card/80 p-6 backdrop-blur",
						"data-tsd-source": "/src/routes/index.tsx:373:15",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-3xl text-primary/60",
								"data-tsd-source": "/src/routes/index.tsx:374:17",
								children: s.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 font-display text-xl",
								"data-tsd-source": "/src/routes/index.tsx:375:17",
								children: s.t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/index.tsx:376:17",
								children: s.d
							})
						]
					})
				}, s.n))
			})]
		})]
	});
}
function Compare() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "why",
		className: "py-24",
		"data-tsd-source": "/src/routes/index.tsx:409:10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-6",
			"data-tsd-source": "/src/routes/index.tsx:410:7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				"data-tsd-source": "/src/routes/index.tsx:411:9",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs uppercase tracking-[0.2em] text-primary",
					"data-tsd-source": "/src/routes/index.tsx:412:11",
					children: "Comparison"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 max-w-2xl font-display text-4xl md:text-5xl",
					"data-tsd-source": "/src/routes/index.tsx:413:11",
					children: "AstroVaanii vs a traditional astrologer."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: 120,
				"data-tsd-source": "/src/routes/index.tsx:417:9",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 overflow-hidden rounded-3xl border border-border bg-card",
					"data-tsd-source": "/src/routes/index.tsx:418:11",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 border-b border-border bg-[color:var(--accent)]/40 text-sm font-medium",
						"data-tsd-source": "/src/routes/index.tsx:419:13",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-5 text-muted-foreground",
								"data-tsd-source": "/src/routes/index.tsx:420:15",
								children: "What matters"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-5 text-primary",
								"data-tsd-source": "/src/routes/index.tsx:421:15",
								children: "AstroVaanii"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-5 text-muted-foreground",
								"data-tsd-source": "/src/routes/index.tsx:422:15",
								children: "Traditional"
							})
						]
					}), [
						{
							k: "Speed",
							ai: "Instant reply",
							trad: "Days of waiting"
						},
						{
							k: "Availability",
							ai: "24/7, any time zone",
							trad: "By appointment only"
						},
						{
							k: "Cost",
							ai: "Affordable, unlimited chats",
							trad: "Expensive per session"
						},
						{
							k: "Consistency",
							ai: "Same rigour every reading",
							trad: "Varies by astrologer"
						},
						{
							k: "Languages",
							ai: "9 Indian languages",
							trad: "Usually one or two"
						},
						{
							k: "Follow-ups",
							ai: "Ask again, anytime",
							trad: "New session, new fee"
						}
					].map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `grid grid-cols-3 text-sm ${i % 2 ? "bg-background/40" : ""}`,
						"data-tsd-source": "/src/routes/index.tsx:424:33",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-5 font-display text-base",
								"data-tsd-source": "/src/routes/index.tsx:425:17",
								children: r.k
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-5 text-foreground",
								"data-tsd-source": "/src/routes/index.tsx:426:17",
								children: r.ai
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-5 text-muted-foreground",
								"data-tsd-source": "/src/routes/index.tsx:427:17",
								children: r.trad
							})
						]
					}, r.k))]
				})
			})]
		})
	});
}
function WhyBetter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-24",
		"data-tsd-source": "/src/routes/index.tsx:454:10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-6",
			"data-tsd-source": "/src/routes/index.tsx:455:7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				"data-tsd-source": "/src/routes/index.tsx:456:9",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs uppercase tracking-[0.2em] text-primary",
					"data-tsd-source": "/src/routes/index.tsx:457:11",
					children: "Why AstroVaanii"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 max-w-2xl font-display text-4xl md:text-5xl",
					"data-tsd-source": "/src/routes/index.tsx:458:11",
					children: "Six reasons AstroVaanii is different from other AI astrologers."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
				"data-tsd-source": "/src/routes/index.tsx:462:9",
				children: [
					{
						t: "Trained on classical texts",
						d: "Not a generic chatbot with an astrology prompt. Vaanii is tuned on Parashara, Jaimini and thousands of real Jyotish readings."
					},
					{
						t: "Weekly human audit",
						d: "Practising astrologers review sample conversations every week and tune the interpretation layer for accuracy."
					},
					{
						t: "Chart-aware conversations",
						d: "Follow-ups don't lose context. Your chart, dashas and past questions stay in every reply."
					},
					{
						t: "Truly multilingual",
						d: "Nine Indian languages, natively — not machine-translated English underneath."
					},
					{
						t: "Private by default",
						d: "Birth data encrypted, never sold, never used to train third-party models. Delete anytime."
					},
					{
						t: "Honest about timing",
						d: "Vaanii tells you when a window closes, not just what you want to hear."
					}
				].map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * 80,
					"data-tsd-source": "/src/routes/index.tsx:463:33",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "h-full rounded-3xl border border-border bg-card p-6",
						"data-tsd-source": "/src/routes/index.tsx:464:15",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--accent)]",
								"data-tsd-source": "/src/routes/index.tsx:465:17",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: startalks_icon_default,
									alt: "",
									width: 28,
									height: 28,
									className: "h-6 w-6",
									"data-tsd-source": "/src/routes/index.tsx:466:19"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-5 font-display text-xl",
								"data-tsd-source": "/src/routes/index.tsx:468:17",
								children: it.t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/index.tsx:469:17",
								children: it.d
							})
						]
					})
				}, it.t))
			})]
		})
	});
}
function Languages() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-24",
		"data-tsd-source": "/src/routes/index.tsx:477:10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2",
			"data-tsd-source": "/src/routes/index.tsx:478:7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				"data-tsd-source": "/src/routes/index.tsx:479:9",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs uppercase tracking-[0.2em] text-primary",
						"data-tsd-source": "/src/routes/index.tsx:480:11",
						children: "Your language"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-display text-4xl md:text-5xl",
						"data-tsd-source": "/src/routes/index.tsx:481:11",
						children: "Chat with Vaanii in nine native scripts."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-md text-muted-foreground",
						"data-tsd-source": "/src/routes/index.tsx:482:11",
						children: "Astrology loses nuance in translation. Vaanii replies natively in each language — metaphor, tone and warmth intact. Switch anytime; your context follows."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: 120,
				"data-tsd-source": "/src/routes/index.tsx:487:9",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto flex h-[360px] w-full max-w-md items-center justify-center",
					"data-tsd-source": "/src/routes/index.tsx:488:11",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute h-64 w-64 rounded-full border border-dashed border-border",
							"data-tsd-source": "/src/routes/index.tsx:489:13"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute h-96 w-96 rounded-full border border-dashed border-border/50",
							"data-tsd-source": "/src/routes/index.tsx:490:13"
						}),
						languages.map((lang, i) => {
							const angle = i / languages.length * Math.PI * 2 - Math.PI / 2;
							const isPrimary = lang === "हिंदी";
							const r = isPrimary ? 0 : 140;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `absolute flex items-center justify-center rounded-2xl text-center font-display transition-transform hover:scale-110 ${isPrimary ? "z-10 h-24 w-24 bg-primary text-primary-foreground text-3xl shadow-xl" : "h-14 w-14 bg-card text-foreground text-sm border border-border shadow"}`,
								style: { transform: `translate(${Math.cos(angle) * r}px, ${Math.sin(angle) * r}px)` },
								"data-tsd-source": "/src/routes/index.tsx:495:20",
								children: lang
							}, lang);
						})
					]
				})
			})]
		})
	});
}
function Reviews() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "reviews",
		className: "py-24",
		"data-tsd-source": "/src/routes/index.tsx:507:10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-6",
			"data-tsd-source": "/src/routes/index.tsx:508:7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-start justify-between gap-6 md:flex-row md:items-end",
				"data-tsd-source": "/src/routes/index.tsx:509:9",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
					"data-tsd-source": "/src/routes/index.tsx:510:11",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs uppercase tracking-[0.2em] text-primary",
						"data-tsd-source": "/src/routes/index.tsx:511:13",
						children: "Reviews"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 max-w-xl font-display text-4xl md:text-5xl",
						"data-tsd-source": "/src/routes/index.tsx:512:13",
						children: "What seekers say after chatting with Vaanii."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: 100,
					"data-tsd-source": "/src/routes/index.tsx:516:11",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 text-sm text-muted-foreground",
						"data-tsd-source": "/src/routes/index.tsx:517:13",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex text-primary text-lg",
							"data-tsd-source": "/src/routes/index.tsx:518:15",
							children: "★★★★★"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"data-tsd-source": "/src/routes/index.tsx:519:15",
							children: "4.9 average from 48,000+ reviews"
						})]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-14 grid grid-cols-1 gap-6 md:grid-cols-2",
				"data-tsd-source": "/src/routes/index.tsx:524:9",
				children: reviews.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: i * 80,
					"data-tsd-source": "/src/routes/index.tsx:525:34",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
						className: "h-full rounded-3xl border border-border bg-card p-8",
						"data-tsd-source": "/src/routes/index.tsx:526:15",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex text-primary",
								"data-tsd-source": "/src/routes/index.tsx:527:17",
								children: "★".repeat(r.stars)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
								className: "mt-4 font-display text-xl leading-snug text-foreground",
								"data-tsd-source": "/src/routes/index.tsx:528:17",
								children: [
									"\"",
									r.text,
									"\""
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
								className: "mt-6 text-sm text-muted-foreground",
								"data-tsd-source": "/src/routes/index.tsx:531:17",
								children: [
									r.name,
									" · ",
									r.city
								]
							})
						]
					})
				}, r.name))
			})]
		})
	});
}
function FAQ() {
	const [open, setOpen] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "faq",
		className: "py-24",
		"data-tsd-source": "/src/routes/index.tsx:542:10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 md:grid-cols-[1fr_1.4fr]",
			"data-tsd-source": "/src/routes/index.tsx:543:7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				"data-tsd-source": "/src/routes/index.tsx:544:9",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs uppercase tracking-[0.2em] text-primary",
						"data-tsd-source": "/src/routes/index.tsx:545:11",
						children: "FAQ"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-display text-4xl md:text-5xl",
						"data-tsd-source": "/src/routes/index.tsx:546:11",
						children: "Everything about AstroVaanii."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 text-muted-foreground",
						"data-tsd-source": "/src/routes/index.tsx:547:11",
						children: [
							"Real answers written by our astrology team. Still curious? Write to us at",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "mailto:hello@astrovaanii.ai",
								className: "ml-1 text-primary underline underline-offset-4",
								"data-tsd-source": "/src/routes/index.tsx:549:13",
								children: "hello@astrovaanii.ai"
							}),
							"."
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: 120,
				"data-tsd-source": "/src/routes/index.tsx:552:9",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-border rounded-3xl border border-border bg-card",
					"data-tsd-source": "/src/routes/index.tsx:553:11",
					children: faqs.map((f, i) => {
						const isOpen = open === i;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							"data-tsd-source": "/src/routes/index.tsx:556:20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setOpen(isOpen ? null : i),
								className: "flex w-full items-center justify-between gap-6 px-6 py-5 text-left",
								"aria-expanded": isOpen,
								"data-tsd-source": "/src/routes/index.tsx:557:19",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-lg",
									"data-tsd-source": "/src/routes/index.tsx:558:21",
									children: f.q
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `h-6 w-6 shrink-0 rounded-full border border-border text-primary transition-transform ${isOpen ? "rotate-45" : ""}`,
									"data-tsd-source": "/src/routes/index.tsx:559:21",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										viewBox: "0 0 24 24",
										className: "h-full w-full",
										"data-tsd-source": "/src/routes/index.tsx:560:23",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: "M12 5v14M5 12h14",
											stroke: "currentColor",
											strokeWidth: "1.5",
											fill: "none",
											strokeLinecap: "round",
											"data-tsd-source": "/src/routes/index.tsx:560:74"
										})
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `grid overflow-hidden px-6 transition-all duration-500 ${isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"}`,
								"data-tsd-source": "/src/routes/index.tsx:563:19",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "min-h-0 text-muted-foreground leading-relaxed",
									"data-tsd-source": "/src/routes/index.tsx:564:21",
									children: f.a
								})
							})]
						}, f.q);
					})
				})
			})]
		})
	});
}
function CTA() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden py-24",
		"data-tsd-source": "/src/routes/index.tsx:574:10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "orb h-[360px] w-[360px] bg-[color:var(--gold)] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60",
			"data-tsd-source": "/src/routes/index.tsx:575:7"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-3xl px-6 text-center",
			"data-tsd-source": "/src/routes/index.tsx:576:7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					"data-tsd-source": "/src/routes/index.tsx:577:9",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-4xl leading-tight md:text-6xl",
						"data-tsd-source": "/src/routes/index.tsx:578:11",
						children: [
							"Vaanii is online.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", { "data-tsd-source": "/src/routes/index.tsx:579:30" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
								className: "not-italic text-primary",
								"data-tsd-source": "/src/routes/index.tsx:579:36",
								children: "Ask your first question."
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: 120,
					"data-tsd-source": "/src/routes/index.tsx:582:9",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-6 max-w-lg text-lg text-muted-foreground",
						"data-tsd-source": "/src/routes/index.tsx:583:11",
						children: "Start a free chat in under a minute. Bring your birth details — AstroVaanii handles the rest."
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: 200,
					"data-tsd-source": "/src/routes/index.tsx:587:9",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/signup",
						className: "mt-10 inline-flex rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground shadow-xl shadow-primary/25 hover:opacity-90",
						"data-tsd-source": "/src/routes/index.tsx:588:11",
						children: "Chat with Vaanii"
					})
				})
			]
		})]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-border bg-card/40 py-12",
		"data-tsd-source": "/src/routes/index.tsx:596:10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center",
			"data-tsd-source": "/src/routes/index.tsx:597:7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-tsd-source": "/src/routes/index.tsx:598:9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						"data-tsd-source": "/src/routes/index.tsx:599:11",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: startalks_icon_default,
							alt: "",
							width: 28,
							height: 28,
							className: "h-7 w-7",
							"data-tsd-source": "/src/routes/index.tsx:600:13"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg",
							"data-tsd-source": "/src/routes/index.tsx:601:13",
							children: "AstroVaanii"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xs text-sm text-muted-foreground",
						"data-tsd-source": "/src/routes/index.tsx:603:11",
						children: "Your personal AI astrologer. Vedic wisdom, instant answers."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-8 text-sm text-muted-foreground",
					"data-tsd-source": "/src/routes/index.tsx:607:9",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#meet",
							className: "hover:text-foreground",
							"data-tsd-source": "/src/routes/index.tsx:608:11",
							children: "Meet Vaanii"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#daily",
							className: "hover:text-foreground",
							"data-tsd-source": "/src/routes/index.tsx:609:11",
							children: "Daily prediction"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#how",
							className: "hover:text-foreground",
							"data-tsd-source": "/src/routes/index.tsx:610:11",
							children: "How it works"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#faq",
							className: "hover:text-foreground",
							"data-tsd-source": "/src/routes/index.tsx:611:11",
							children: "FAQ"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs text-muted-foreground",
					"data-tsd-source": "/src/routes/index.tsx:613:9",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" AstroVaanii"
					]
				})
			]
		})
	});
}
function Index() {
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (JSON.parse(localStorage.getItem("userData") || "{}").email || auth.currentUser) navigate({ to: "/dashboard" });
	}, [navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { "data-tsd-source": "/src/routes/index.tsx:629:7" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative",
		"data-tsd-source": "/src/routes/index.tsx:630:7",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, { "data-tsd-source": "/src/routes/index.tsx:631:9" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, { "data-tsd-source": "/src/routes/index.tsx:632:9" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marquee, { "data-tsd-source": "/src/routes/index.tsx:633:9" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DailyPrediction, { "data-tsd-source": "/src/routes/index.tsx:634:9" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatIs, { "data-tsd-source": "/src/routes/index.tsx:635:9" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeetAI, { "data-tsd-source": "/src/routes/index.tsx:636:9" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowItWorks, { "data-tsd-source": "/src/routes/index.tsx:637:9" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compare, { "data-tsd-source": "/src/routes/index.tsx:638:9" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhyBetter, { "data-tsd-source": "/src/routes/index.tsx:639:9" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Languages, { "data-tsd-source": "/src/routes/index.tsx:640:9" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reviews, { "data-tsd-source": "/src/routes/index.tsx:641:9" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQ, { "data-tsd-source": "/src/routes/index.tsx:642:9" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CTA, { "data-tsd-source": "/src/routes/index.tsx:643:9" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, { "data-tsd-source": "/src/routes/index.tsx:644:9" })
		]
	})] });
}
//#endregion
export { Index as component };
