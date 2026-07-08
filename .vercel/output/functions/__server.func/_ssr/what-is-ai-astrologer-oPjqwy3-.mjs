import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as faqs } from "./what-is-ai-astrologer-D6NfqUSd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/what-is-ai-astrologer-oPjqwy3-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FaqItem({ q, a, isOpen, toggle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-b border-border last:border-b-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: toggle,
			className: "flex w-full items-center justify-between gap-4 px-6 py-5 text-left",
			"aria-expanded": isOpen,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-base font-medium text-foreground",
				children: q
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-primary transition-transform ${isOpen ? "rotate-45" : ""}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					viewBox: "0 0 24 24",
					className: "h-full w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M12 5v14M5 12h14",
						stroke: "currentColor",
						strokeWidth: "1.5",
						fill: "none",
						strokeLinecap: "round"
					})
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `grid overflow-hidden transition-all duration-500 ${isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "min-h-0 px-6 text-sm leading-relaxed text-muted-foreground",
				dangerouslySetInnerHTML: { __html: a }
			})
		})]
	});
}
function WhatIsAiAstrologerPage() {
	const [openFaq, setOpenFaq] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					"aria-label": "Breadcrumb",
					className: "mb-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "flex items-center gap-2 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "hover:text-foreground transition-colors",
								children: "Home"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "text-muted-foreground/40",
								"aria-hidden": "true",
								children: "/"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/blogs",
								className: "hover:text-foreground transition-colors",
								children: "Blog"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "text-muted-foreground/40",
								"aria-hidden": "true",
								children: "/"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "text-foreground font-medium",
								"aria-current": "page",
								children: "What Is an AI Astrologer?"
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
								dateTime: "2026-07-08",
								children: "July 8, 2026"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1 w-1 rounded-full bg-border" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "8 min read" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl",
						children: "What Is an AI Astrologer? A Simple Guide to How It Works"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/what-is-ai-astrologer.webp",
						alt: "What is an AI astrologer - illustration of AI astrology chart reading",
						width: 1200,
						height: 630,
						className: "mt-8 w-full rounded-3xl object-cover shadow-md",
						loading: "eager"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-8 text-lg leading-relaxed text-muted-foreground",
						children: [
							"Astrology has been part of human life for thousands of years. People have always looked at the stars and planets to understand their personality, relationships, career, and future. Today, technology has changed the way people access astrology. Instead of waiting for an appointment or reading long books, many people now use an",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-foreground",
								children: "AI astrologer"
							}),
							" to get answers within seconds."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-lg leading-relaxed text-muted-foreground",
						children: "But what is an AI astrologer? How does it actually work? Is it real? Can it read your birth chart correctly?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-lg leading-relaxed text-muted-foreground",
						children: "In this guide, you will learn everything about AI astrologers in simple English."
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-semibold text-foreground",
							children: "What Is an AI Astrologer?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 leading-relaxed text-muted-foreground",
							children: [
								"An ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-foreground",
									children: "AI astrologer"
								}),
								" is a digital tool powered by artificial intelligence that analyzes your birth chart and provides personalized astrology insights."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 leading-relaxed text-muted-foreground",
							children: "It combines traditional astrology with modern technology. Instead of manually studying a birth chart, an AI astrologer can process thousands of astrological calculations in just a few seconds."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 leading-relaxed text-muted-foreground",
							children: "When you enter your birth details — such as your date of birth, birth time, and birth place — the AI astrologer creates your birth chart and studies different astrological factors. It then explains the results in easy-to-understand language."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 leading-relaxed text-muted-foreground",
							children: "The goal of an AI astrologer is to make astrology faster, easier, and available to everyone."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-semibold text-foreground",
							children: "How Does an AI Astrologer Work?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 leading-relaxed text-muted-foreground",
							children: "Many people think an AI astrologer simply guesses the answers. That is not true."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 leading-relaxed text-muted-foreground",
							children: "A good AI astrologer system follows several steps before giving a prediction."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-8 font-display text-xl font-medium text-foreground",
							children: "Step 1. It collects your birth details"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 leading-relaxed text-muted-foreground",
							children: "The first step is collecting accurate birth information. Usually you need to enter:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-2 list-disc space-y-1 pl-6 text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Date of birth" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Birth time" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Birth place" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 leading-relaxed text-muted-foreground",
							children: "These details are important because even a small change in birth time can change the birth chart."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-8 font-display text-xl font-medium text-foreground",
							children: "Step 2. It creates your birth chart"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 leading-relaxed text-muted-foreground",
							children: "Using astronomical calculations, the AI astrologer finds the exact positions of planets at the moment you were born. It creates your horoscope or birth chart based on those planetary positions."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-8 font-display text-xl font-medium text-foreground",
							children: "Step 3. It studies astrological combinations"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 leading-relaxed text-muted-foreground",
							children: "The AI astrologer examines many important factors, including:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-2 list-disc space-y-1 pl-6 text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Planet positions" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Zodiac signs" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Houses" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Nakshatras" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Planetary aspects" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Dasha periods" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Yogas" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 leading-relaxed text-muted-foreground",
							children: "Instead of checking these one by one like a human, AI can analyze them almost instantly."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-8 font-display text-xl font-medium text-foreground",
							children: "Step 4. It explains everything in simple language"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 leading-relaxed text-muted-foreground",
							children: "Traditional astrology books often use difficult words. An AI astrologer converts complex astrological information into simple explanations that anyone can understand. Instead of reading technical astrology terms, you receive practical guidance about different areas of life."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-semibold text-foreground",
							children: "Why Are AI Astrologers Becoming Popular?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 leading-relaxed text-muted-foreground",
							children: "AI astrologers have become popular because they save time and make astrology easier to access."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 leading-relaxed text-muted-foreground",
							children: "Here are some reasons why more people are using them."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-6 font-display text-xl font-medium text-foreground",
							children: "Instant results"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 leading-relaxed text-muted-foreground",
							children: "Instead of waiting for hours or days, you can receive your horoscope within seconds."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-6 font-display text-xl font-medium text-foreground",
							children: "Available anytime"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 leading-relaxed text-muted-foreground",
							children: "You can use an AI astrologer at any time of the day without booking an appointment."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-6 font-display text-xl font-medium text-foreground",
							children: "Easy to understand"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 leading-relaxed text-muted-foreground",
							children: "Many AI astrologer platforms explain complicated astrology in simple English."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-6 font-display text-xl font-medium text-foreground",
							children: "Personalized readings"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 leading-relaxed text-muted-foreground",
							children: "Every prediction is based on your own birth details instead of general zodiac sign predictions."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-6 font-display text-xl font-medium text-foreground",
							children: "Consistent analysis"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 leading-relaxed text-muted-foreground",
							children: "The same birth details always produce the same astrological calculations."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-semibold text-foreground",
							children: "What Can an AI Astrologer Tell You?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 leading-relaxed text-muted-foreground",
							children: "An AI astrologer can provide insights into many parts of life."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 leading-relaxed text-muted-foreground",
							children: "Some common topics include:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-muted-foreground sm:grid-cols-3",
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
								children: item
							}, item))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 leading-relaxed text-muted-foreground",
							children: "The information depends on the features offered by the AI astrologer platform."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-semibold text-foreground",
							children: "Is an AI Astrologer Accurate?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 leading-relaxed text-muted-foreground",
							children: "The accuracy of an AI astrologer depends mainly on two things."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 leading-relaxed text-muted-foreground",
							children: "The first is the accuracy of your birth details. If your birth time or birth place is incorrect, the birth chart may also be incorrect."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 leading-relaxed text-muted-foreground",
							children: "The second is the quality of the AI astrologer system. A well-designed AI astrologer platform uses accurate astronomical calculations and follows proper astrological rules before generating predictions."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 leading-relaxed text-muted-foreground",
							children: "When both of these are correct, an AI astrologer can provide highly personalized astrology readings based on your birth chart."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-semibold text-foreground",
							children: "AI Astrologer vs Traditional Astrologer"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 leading-relaxed text-muted-foreground",
							children: "Both an AI astrologer and a traditional astrologer study the same birth chart."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 leading-relaxed text-muted-foreground",
							children: "The biggest difference is how the information is analyzed and explained."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 leading-relaxed text-muted-foreground",
							children: "A traditional astrologer studies the chart manually using years of knowledge and experience. An AI astrologer performs the calculations automatically and explains the results almost instantly."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 leading-relaxed text-muted-foreground",
							children: "Many people choose an AI astrologer because it is fast, convenient, and available whenever they need guidance."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-semibold text-foreground",
							children: "Who Should Use an AI Astrologer?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 leading-relaxed text-muted-foreground",
							children: "An AI astrologer is useful for anyone who wants to understand their birth chart in a simple way."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 leading-relaxed text-muted-foreground",
							children: "It can be helpful if you:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-2 list-disc space-y-1 pl-6 text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Want instant astrology reports" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Want daily guidance" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Are new to astrology" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Prefer simple explanations" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Want to explore your horoscope from home" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 leading-relaxed text-muted-foreground",
							children: [
								"Since everything happens online, getting started is very easy.",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									className: "text-primary underline underline-offset-4 hover:opacity-80",
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
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-semibold text-foreground",
							children: "The Future of AI Astrologers"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 leading-relaxed text-muted-foreground",
							children: "Artificial intelligence is improving every year."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 leading-relaxed text-muted-foreground",
							children: "Future AI astrologer platforms may provide even more personalized insights, better explanations, faster calculations, and smarter conversations."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 leading-relaxed text-muted-foreground",
							children: "As technology continues to improve, AI astrologers will become more interactive and easier for everyone to use."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-12 rounded-3xl border border-border bg-card p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-semibold text-foreground",
							children: "Final Thoughts"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 leading-relaxed text-muted-foreground",
							children: "An AI astrologer combines traditional astrological knowledge with modern artificial intelligence to make astrology faster, simpler, and more accessible."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 leading-relaxed text-muted-foreground",
							children: "By analyzing your birth details and planetary positions, an AI astrologer can generate personalized insights about different areas of your life within seconds."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 leading-relaxed text-muted-foreground",
							children: "Whether you are curious about your personality, career, relationships, or future opportunities, an AI astrologer offers an easy way to explore your birth chart without needing advanced knowledge of astrology."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90",
								children: "Chat with Vaanii — Your AI Astrologer"
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl font-semibold text-foreground",
							children: "Frequently Asked Questions"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Everything you need to know about AI astrologers."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 divide-y divide-border rounded-3xl border border-border bg-card",
							children: faqs.map((faq, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaqItem, {
								q: faq.q,
								a: faq.a,
								isOpen: openFaq === i,
								toggle: () => setOpenFaq(openFaq === i ? null : i)
							}, faq.q))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mt-16 border-t border-border pt-12 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted-foreground",
						children: [
							"Ready to experience an AI astrologer yourself?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "text-primary underline underline-offset-4 hover:opacity-80",
								children: "Chat with Vaanii"
							}),
							" ",
							"— it's free."
						]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
			className: "border-t border-border bg-card/40 py-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-3xl px-4 sm:px-6 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "hover:text-foreground",
							children: "Home"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/blogs",
							className: "hover:text-foreground",
							children: "Blog"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/privacy-policy",
							className: "hover:text-foreground",
							children: "Privacy Policy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/terms-and-conditions",
							className: "hover:text-foreground",
							children: "Terms & Conditions"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/refund-policy",
							className: "hover:text-foreground",
							children: "Refund Policy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/disclaimer",
							className: "hover:text-foreground",
							children: "Disclaimer"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-center text-xs text-muted-foreground/60",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" AstroVaanii"
					]
				})]
			})
		})]
	});
}
//#endregion
export { WhatIsAiAstrologerPage as component };
