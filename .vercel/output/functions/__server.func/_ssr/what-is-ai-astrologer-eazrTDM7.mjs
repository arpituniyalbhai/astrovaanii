import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as faqs } from "./what-is-ai-astrologer-D6NfqUSd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/what-is-ai-astrologer-eazrTDM7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FaqItem({ q, a, isOpen, toggle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-b border-border last:border-b-0",
		"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:15:10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: toggle,
			className: "flex w-full items-center justify-between gap-4 px-6 py-5 text-left",
			"aria-expanded": isOpen,
			"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:16:7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-base font-medium text-foreground",
				"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:17:9",
				children: q
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-primary transition-transform ${isOpen ? "rotate-45" : ""}`,
				"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:18:9",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					viewBox: "0 0 24 24",
					className: "h-full w-full",
					"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:19:11",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M12 5v14M5 12h14",
						stroke: "currentColor",
						strokeWidth: "1.5",
						fill: "none",
						strokeLinecap: "round",
						"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:20:13"
					})
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `grid overflow-hidden transition-all duration-500 ${isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"}`,
			"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:24:7",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "min-h-0 px-6 text-sm leading-relaxed text-muted-foreground",
				dangerouslySetInnerHTML: { __html: a },
				"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:25:9"
			})
		})]
	});
}
function WhatIsAiAstrologerPage() {
	const [openFaq, setOpenFaq] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background",
		"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:33:10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-md",
				"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:34:7",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-6",
					"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:35:9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground",
						"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:36:11",
						children: "AstroVaanii"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/signup",
						className: "rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90",
						"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:39:11",
						children: "Try AI Astrologer — Free"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8",
				"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:44:7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						"aria-label": "Breadcrumb",
						className: "mb-8",
						"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:45:9",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
							className: "flex items-center gap-2 text-sm text-muted-foreground",
							"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:46:11",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:47:13",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/",
										className: "hover:text-foreground transition-colors",
										"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:48:15",
										children: "Home"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "text-muted-foreground/40",
									"aria-hidden": "true",
									"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:50:13",
									children: "/"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:51:13",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/blogs",
										className: "hover:text-foreground transition-colors",
										"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:52:15",
										children: "Blog"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "text-muted-foreground/40",
									"aria-hidden": "true",
									"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:54:13",
									children: "/"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "text-foreground font-medium",
									"aria-current": "page",
									"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:55:13",
									children: "What Is an AI Astrologer?"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:61:9",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 text-xs text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:62:11",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
										dateTime: "2026-07-08",
										"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:63:13",
										children: "July 8, 2026"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "h-1 w-1 rounded-full bg-border",
										"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:64:13"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:65:13",
										children: "8 min read"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-4 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:67:11",
								children: "What Is an AI Astrologer? A Simple Guide to How It Works"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/what-is-ai-astrologer.webp",
								alt: "What is an AI astrologer - illustration of AI astrology chart reading",
								width: 1200,
								height: 630,
								className: "mt-8 w-full rounded-3xl object-cover shadow-md",
								loading: "eager",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:70:11"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-8 text-lg leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:71:11",
								children: [
									"Astrology has been part of human life for thousands of years. People have always looked at the stars and planets to understand their personality, relationships, career, and future. Today, technology has changed the way people access astrology. Instead of waiting for an appointment or reading long books, many people now use an",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:76:13",
										children: "AI astrologer"
									}),
									" to get answers within seconds."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-lg leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:79:11",
								children: "But what is an AI astrologer? How does it actually work? Is it real? Can it read your birth chart correctly?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-lg leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:83:11",
								children: "In this guide, you will learn everything about AI astrologers in simple English."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-12",
						"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:88:9",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-semibold text-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:89:11",
								children: "What Is an AI Astrologer?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:92:11",
								children: [
									"An ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:93:16",
										children: "AI astrologer"
									}),
									" is a digital tool powered by artificial intelligence that analyzes your birth chart and provides personalized astrology insights."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:97:11",
								children: "It combines traditional astrology with modern technology. Instead of manually studying a birth chart, an AI astrologer can process thousands of astrological calculations in just a few seconds."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:102:11",
								children: "When you enter your birth details — such as your date of birth, birth time, and birth place — the AI astrologer creates your birth chart and studies different astrological factors. It then explains the results in easy-to-understand language."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:107:11",
								children: "The goal of an AI astrologer is to make astrology faster, easier, and available to everyone."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-12",
						"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:113:9",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-semibold text-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:114:11",
								children: "How Does an AI Astrologer Work?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:117:11",
								children: "Many people think an AI astrologer simply guesses the answers. That is not true."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:120:11",
								children: "A good AI astrologer system follows several steps before giving a prediction."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-8 font-display text-xl font-medium text-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:124:11",
								children: "Step 1. It collects your birth details"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:127:11",
								children: "The first step is collecting accurate birth information. Usually you need to enter:"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-2 list-disc space-y-1 pl-6 text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:130:11",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:131:13",
										children: "Date of birth"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:132:13",
										children: "Birth time"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:133:13",
										children: "Birth place"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:135:11",
								children: "These details are important because even a small change in birth time can change the birth chart."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-8 font-display text-xl font-medium text-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:140:11",
								children: "Step 2. It creates your birth chart"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:143:11",
								children: "Using astronomical calculations, the AI astrologer finds the exact positions of planets at the moment you were born. It creates your horoscope or birth chart based on those planetary positions."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-8 font-display text-xl font-medium text-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:149:11",
								children: "Step 3. It studies astrological combinations"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:152:11",
								children: "The AI astrologer examines many important factors, including:"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-2 list-disc space-y-1 pl-6 text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:155:11",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:156:13",
										children: "Planet positions"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:157:13",
										children: "Zodiac signs"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:158:13",
										children: "Houses"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:159:13",
										children: "Nakshatras"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:160:13",
										children: "Planetary aspects"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:161:13",
										children: "Dasha periods"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:162:13",
										children: "Yogas"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:164:11",
								children: "Instead of checking these one by one like a human, AI can analyze them almost instantly."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-8 font-display text-xl font-medium text-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:169:11",
								children: "Step 4. It explains everything in simple language"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:172:11",
								children: "Traditional astrology books often use difficult words. An AI astrologer converts complex astrological information into simple explanations that anyone can understand. Instead of reading technical astrology terms, you receive practical guidance about different areas of life."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-12",
						"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:180:9",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-semibold text-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:181:11",
								children: "Why Are AI Astrologers Becoming Popular?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:184:11",
								children: "AI astrologers have become popular because they save time and make astrology easier to access."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:188:11",
								children: "Here are some reasons why more people are using them."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-6 font-display text-xl font-medium text-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:192:11",
								children: "Instant results"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:195:11",
								children: "Instead of waiting for hours or days, you can receive your horoscope within seconds."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-6 font-display text-xl font-medium text-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:199:11",
								children: "Available anytime"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:202:11",
								children: "You can use an AI astrologer at any time of the day without booking an appointment."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-6 font-display text-xl font-medium text-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:206:11",
								children: "Easy to understand"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:209:11",
								children: "Many AI astrologer platforms explain complicated astrology in simple English."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-6 font-display text-xl font-medium text-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:213:11",
								children: "Personalized readings"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:216:11",
								children: "Every prediction is based on your own birth details instead of general zodiac sign predictions."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-6 font-display text-xl font-medium text-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:221:11",
								children: "Consistent analysis"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:224:11",
								children: "The same birth details always produce the same astrological calculations."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-12",
						"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:229:9",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-semibold text-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:230:11",
								children: "What Can an AI Astrologer Tell You?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:233:11",
								children: "An AI astrologer can provide insights into many parts of life."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:236:11",
								children: "Some common topics include:"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-muted-foreground sm:grid-cols-3",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:239:11",
								children: [
									"Career",
									"Love life",
									"Marriage",
									"Education",
									"Health",
									"Family",
									"Money",
									"Personality",
									"Strengths",
									"Weaknesses",
									"Daily horoscope",
									"Monthly horoscope",
									"Lucky colors",
									"Lucky numbers"
								].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "list-disc pl-4",
									"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:240:219",
									children: item
								}, item))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:244:11",
								children: "The information depends on the features offered by the AI astrologer platform."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-12",
						"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:249:9",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-semibold text-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:250:11",
								children: "Is an AI Astrologer Accurate?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:253:11",
								children: "The accuracy of an AI astrologer depends mainly on two things."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:256:11",
								children: "The first is the accuracy of your birth details. If your birth time or birth place is incorrect, the birth chart may also be incorrect."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:260:11",
								children: "The second is the quality of the AI astrologer system. A well-designed AI astrologer platform uses accurate astronomical calculations and follows proper astrological rules before generating predictions."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:265:11",
								children: "When both of these are correct, an AI astrologer can provide highly personalized astrology readings based on your birth chart."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-12",
						"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:271:9",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-semibold text-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:272:11",
								children: "AI Astrologer vs Traditional Astrologer"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:275:11",
								children: "Both an AI astrologer and a traditional astrologer study the same birth chart."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:278:11",
								children: "The biggest difference is how the information is analyzed and explained."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:281:11",
								children: "A traditional astrologer studies the chart manually using years of knowledge and experience. An AI astrologer performs the calculations automatically and explains the results almost instantly."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:286:11",
								children: "Many people choose an AI astrologer because it is fast, convenient, and available whenever they need guidance."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-12",
						"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:292:9",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-semibold text-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:293:11",
								children: "Who Should Use an AI Astrologer?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:296:11",
								children: "An AI astrologer is useful for anyone who wants to understand their birth chart in a simple way."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:300:11",
								children: "It can be helpful if you:"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-2 list-disc space-y-1 pl-6 text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:303:11",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:304:13",
										children: "Want instant astrology reports"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:305:13",
										children: "Want daily guidance"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:306:13",
										children: "Are new to astrology"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:307:13",
										children: "Prefer simple explanations"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:308:13",
										children: "Want to explore your horoscope from home"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:310:11",
								children: [
									"Since everything happens online, getting started is very easy.",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/",
										className: "text-primary underline underline-offset-4 hover:opacity-80",
										"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:312:13",
										children: "Try AstroVaanii's AI astrologer"
									}),
									" ",
									"and get your personalized reading in seconds."
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-12",
						"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:319:9",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-semibold text-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:320:11",
								children: "The Future of AI Astrologers"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:323:11",
								children: "Artificial intelligence is improving every year."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:326:11",
								children: "Future AI astrologer platforms may provide even more personalized insights, better explanations, faster calculations, and smarter conversations."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:330:11",
								children: "As technology continues to improve, AI astrologers will become more interactive and easier for everyone to use."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-12 rounded-3xl border border-border bg-card p-8",
						"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:336:9",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl font-semibold text-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:337:11",
								children: "Final Thoughts"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:340:11",
								children: "An AI astrologer combines traditional astrological knowledge with modern artificial intelligence to make astrology faster, simpler, and more accessible."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:344:11",
								children: "By analyzing your birth details and planetary positions, an AI astrologer can generate personalized insights about different areas of your life within seconds."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 leading-relaxed text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:348:11",
								children: "Whether you are curious about your personality, career, relationships, or future opportunities, an AI astrologer offers an easy way to explore your birth chart without needing advanced knowledge of astrology."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:353:11",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									className: "inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90",
									"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:354:13",
									children: "Chat with Vaanii — Your AI Astrologer"
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-16",
						"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:361:9",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl font-semibold text-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:362:11",
								children: "Frequently Asked Questions"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:365:11",
								children: "Everything you need to know about AI astrologers."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 divide-y divide-border rounded-3xl border border-border bg-card",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:368:11",
								children: faqs.map((faq, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaqItem, {
									q: faq.q,
									a: faq.a,
									isOpen: openFaq === i,
									toggle: () => setOpenFaq(openFaq === i ? null : i),
									"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:369:35"
								}, faq.q))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "mt-16 border-t border-border pt-12 text-center",
						"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:373:9",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-muted-foreground",
							"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:374:11",
							children: [
								"Ready to experience an AI astrologer yourself?",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									className: "text-primary underline underline-offset-4 hover:opacity-80",
									"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:376:13",
									children: "Chat with Vaanii"
								}),
								" ",
								"— it's free."
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border bg-card/40 py-12",
				"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:384:7",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-3xl px-4 sm:px-6 lg:px-8",
					"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:385:9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground",
						"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:386:11",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "hover:text-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:387:13",
								children: "Home"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/blogs",
								className: "hover:text-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:388:13",
								children: "Blog"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/privacy-policy",
								className: "hover:text-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:389:13",
								children: "Privacy Policy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/terms-and-conditions",
								className: "hover:text-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:390:13",
								children: "Terms & Conditions"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/refund-policy",
								className: "hover:text-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:391:13",
								children: "Refund Policy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/disclaimer",
								className: "hover:text-foreground",
								"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:392:13",
								children: "Disclaimer"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-center text-xs text-muted-foreground/60",
						"data-tsd-source": "/src/routes/blogs/what-is-ai-astrologer.tsx:394:11",
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
export { WhatIsAiAstrologerPage as component };
