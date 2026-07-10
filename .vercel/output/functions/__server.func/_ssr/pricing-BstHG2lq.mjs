import { o as __toESM } from "../_runtime.mjs";
import { t as astrovaanii_logo_default } from "./astrovaanii-logo-BIjzg6F9.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as auth } from "./firebase-JHzvw2gu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pricing-BstHG2lq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var plans = [
	{
		name: "Starter",
		price: 79,
		priceDisplay: "₹79",
		features: [
			"5 AI chat questions",
			"Daily today & tomorrow predictions",
			"Full birth chart casting",
			"Career & life area insights",
			"9 Indian language support"
		],
		description: "For a first conversation"
	},
	{
		name: "Pro",
		price: 139,
		priceDisplay: "₹139",
		features: [
			"10 AI chat questions",
			"Advanced chart & dasha analysis",
			"Love compatibility (Kundli Milan)",
			"Dosha detection & remedies",
			"Priority response speed",
			"9 Indian language support"
		],
		popular: true,
		description: "For regular guidance"
	},
	{
		name: "Premium",
		price: 249,
		priceDisplay: "₹249",
		features: [
			"20 AI chat questions",
			"Detailed transit & muhurta analysis",
			"Personalized remedy suggestions",
			"Live consultation-style sessions",
			"Priority support",
			"Divisional chart (D1–D60) insights",
			"9 Indian language support"
		],
		description: "For serious Jyotish students"
	}
];
function PricingPage() {
	const navigate = useNavigate();
	const [userName, setUserName] = (0, import_react.useState)("");
	const [isLoggedIn, setIsLoggedIn] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(null);
	const [paymentMessage, setPaymentMessage] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const local = JSON.parse(localStorage.getItem("userData") || "{}");
		setUserName(local.name || "");
		setIsLoggedIn(!!(local.email || auth.currentUser));
	}, []);
	const handlePurchase = async (planName, price, e) => {
		e.preventDefault();
		e.stopPropagation();
		const local = JSON.parse(localStorage.getItem("userData") || "{}");
		const email = auth.currentUser?.email || local.email;
		if (!email) {
			alert("Please log in to purchase a plan");
			navigate({ to: "/signup" });
			return;
		}
		setLoading(planName);
		setPaymentMessage(null);
		try {
			if (!window.Razorpay) throw new Error("Razorpay script not loaded. Please refresh the page.");
			const orderRes = await fetch("/api/create-order", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					planName,
					amount: price,
					email
				})
			});
			const orderData = await orderRes.json();
			if (!orderRes.ok) throw new Error(orderData.error || "Failed to create order");
			const options = {
				key: orderData.keyId,
				amount: orderData.amount,
				currency: orderData.currency,
				name: "AstroVaanii",
				image: "/favicon.png",
				description: `${planName} Plan`,
				order_id: orderData.orderId,
				handler: async (response) => {
					setLoading(planName);
					const verifyData = await (await fetch("/api/verify-payment", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							orderId: response.razorpay_order_id,
							paymentId: response.razorpay_payment_id,
							signature: response.razorpay_signature,
							planName,
							email
						})
					})).json();
					if (verifyData.success) setPaymentMessage({
						type: "success",
						message: verifyData.vaaniiMessage || "Payment successful! Credits added to your account."
					});
					else setPaymentMessage({
						type: "error",
						message: verifyData.vaaniiMessage || "Payment verification failed."
					});
					setLoading(null);
				},
				prefill: {
					name: local.name || "",
					email
				},
				theme: { color: "#E8B4B8" },
				modal: { ondismiss: () => {
					setLoading(null);
					setPaymentMessage({
						type: "error",
						message: "The cosmic timing wasn't quite right this time. Don't worry—the stars will align when they're meant to. Try again whenever you feel ready."
					});
				} }
			};
			new window.Razorpay(options).open();
		} catch (error) {
			console.error("Purchase error:", error);
			setPaymentMessage({
				type: "error",
				message: error instanceof Error ? error.message : "Something went wrong. Please try again."
			});
		} finally {
			setLoading(null);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background grain",
		"data-tsd-source": "/src/routes/pricing.tsx:150:10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "orb h-[420px] w-[420px] bg-[color:var(--gold)] -left-32 -top-24 fixed",
				"data-tsd-source": "/src/routes/pricing.tsx:151:7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "orb h-[360px] w-[360px] bg-[color:var(--clay)] -right-24 bottom-0 opacity-40 fixed",
				"data-tsd-source": "/src/routes/pricing.tsx:152:7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/50",
				"data-tsd-source": "/src/routes/pricing.tsx:154:7",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-6",
					"data-tsd-source": "/src/routes/pricing.tsx:155:9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: isLoggedIn ? "/dashboard" : "/",
						className: "flex items-center gap-2",
						"data-tsd-source": "/src/routes/pricing.tsx:156:11",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: astrovaanii_logo_default,
							alt: "",
							width: 28,
							height: 28,
							className: "h-7 w-7",
							"data-tsd-source": "/src/routes/pricing.tsx:157:13"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-display text-lg",
							"data-tsd-source": "/src/routes/pricing.tsx:158:13",
							children: ["Astro", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary",
								"data-tsd-source": "/src/routes/pricing.tsx:158:57",
								children: "Vaanii"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-3",
						"data-tsd-source": "/src/routes/pricing.tsx:160:11",
						children: isLoggedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "hidden sm:block text-sm text-muted-foreground",
							"data-tsd-source": "/src/routes/pricing.tsx:162:17",
							children: ["Welcome, ", userName]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard",
							className: "rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90",
							"data-tsd-source": "/src/routes/pricing.tsx:163:17",
							children: "Dashboard"
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/signup",
							className: "rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90",
							"data-tsd-source": "/src/routes/pricing.tsx:166:21",
							children: "Start Chat — It's Free"
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative z-10 mx-auto max-w-6xl px-6 py-16",
				"data-tsd-source": "/src/routes/pricing.tsx:173:7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center mb-12",
						"data-tsd-source": "/src/routes/pricing.tsx:174:9",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl md:text-5xl text-primary mb-4",
							"data-tsd-source": "/src/routes/pricing.tsx:175:11",
							children: "Choose Your Plan"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground text-lg max-w-lg mx-auto",
							"data-tsd-source": "/src/routes/pricing.tsx:176:11",
							children: "Unlock deeper insights with our premium plans"
						})]
					}),
					paymentMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `max-w-lg mx-auto mb-8 p-4 rounded-xl text-center ${paymentMessage.type === "success" ? "bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-400" : "bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-400"}`,
						"data-tsd-source": "/src/routes/pricing.tsx:181:28",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							"data-tsd-source": "/src/routes/pricing.tsx:182:13",
							children: paymentMessage.message
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid md:grid-cols-3 gap-6 max-w-5xl mx-auto",
						"data-tsd-source": "/src/routes/pricing.tsx:185:9",
						children: plans.map((plan) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `relative rounded-3xl border border-border bg-card/80 p-6 shadow-xl backdrop-blur-md ${plan.popular ? "border-primary/50 ring-2 ring-primary/20" : ""}`,
							"data-tsd-source": "/src/routes/pricing.tsx:186:30",
							children: [
								plan.popular && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground",
									"data-tsd-source": "/src/routes/pricing.tsx:187:32",
									children: "Most Popular"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-xl text-foreground mb-1",
									"data-tsd-source": "/src/routes/pricing.tsx:190:15",
									children: plan.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mb-3",
									"data-tsd-source": "/src/routes/pricing.tsx:191:15",
									children: plan.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-3xl font-bold text-primary mb-4",
									"data-tsd-source": "/src/routes/pricing.tsx:192:15",
									children: plan.priceDisplay
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-2 mb-6",
									"data-tsd-source": "/src/routes/pricing.tsx:193:15",
									children: plan.features.map((feature) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-2 text-sm text-muted-foreground",
										"data-tsd-source": "/src/routes/pricing.tsx:194:47",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											width: "16",
											height: "16",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2",
											className: "text-[color:var(--sage)] shrink-0",
											"data-tsd-source": "/src/routes/pricing.tsx:195:21",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
												points: "20 6 9 17 4 12",
												"data-tsd-source": "/src/routes/pricing.tsx:196:23"
											})
										}), feature]
									}, feature))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: (e) => handlePurchase(plan.name, plan.price, e),
									disabled: loading === plan.name,
									className: `w-full rounded-full py-3 text-sm font-medium transition-all ${plan.popular ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90" : "border border-border bg-background/70 hover:bg-card"} ${loading === plan.name ? "opacity-50 cursor-not-allowed" : ""}`,
									"data-tsd-source": "/src/routes/pricing.tsx:201:15",
									children: loading === plan.name ? "Processing..." : "Purchase"
								})
							]
						}, plan.name))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-20 max-w-4xl mx-auto space-y-10",
						"data-tsd-source": "/src/routes/pricing.tsx:208:9",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center",
								"data-tsd-source": "/src/routes/pricing.tsx:209:11",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-3xl md:text-4xl text-foreground",
									"data-tsd-source": "/src/routes/pricing.tsx:210:13",
									children: "How Vaanii Credits Work"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed",
									"data-tsd-source": "/src/routes/pricing.tsx:211:13",
									children: "Every plan gives you a set number of AI chat questions. Each question you ask Vaanii consumes one credit — whether it's a daily horoscope, a career reading, a Kundli Milan analysis, or a follow-up about your dasha period. Your credits never expire as long as your plan is active, and you can upgrade anytime. Unused credits from a lower plan carry forward when you upgrade."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid md:grid-cols-3 gap-8 text-sm",
								"data-tsd-source": "/src/routes/pricing.tsx:220:11",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl border border-border bg-card/50 p-6",
										"data-tsd-source": "/src/routes/pricing.tsx:221:13",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-lg text-foreground",
											"data-tsd-source": "/src/routes/pricing.tsx:222:15",
											children: "Starter — ₹79"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-muted-foreground leading-relaxed",
											"data-tsd-source": "/src/routes/pricing.tsx:223:15",
											children: "Perfect if you're curious about AI astrology and want to try Vaanii for a few specific questions. Get your birth chart cast, ask about today or tomorrow, and explore career insights — all with classical Parashara accuracy. Ideal for a first conversation or checking a single life area."
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl border border-primary/30 bg-primary/5 p-6 ring-1 ring-primary/20",
										"data-tsd-source": "/src/routes/pricing.tsx:230:13",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
											className: "font-display text-lg text-foreground",
											"data-tsd-source": "/src/routes/pricing.tsx:231:15",
											children: ["Pro — ₹139 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-primary font-medium",
												"data-tsd-source": "/src/routes/pricing.tsx:231:79",
												children: "Most chosen"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-muted-foreground leading-relaxed",
											"data-tsd-source": "/src/routes/pricing.tsx:232:15",
											children: "The sweet spot for regular seekers. With 10 questions, you can dive into love compatibility, dasha predictions, and advanced chart analysis across multiple sessions. Priority response means Vaanii answers faster. This plan suits anyone who wants ongoing guidance — career timing, marriage windows, and remedy checks."
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl border border-border bg-card/50 p-6",
										"data-tsd-source": "/src/routes/pricing.tsx:239:13",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-lg text-foreground",
											"data-tsd-source": "/src/routes/pricing.tsx:240:15",
											children: "Premium — ₹249"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-muted-foreground leading-relaxed",
											"data-tsd-source": "/src/routes/pricing.tsx:241:15",
											children: "For serious students of Jyotish and those who consult Vaanii regularly. 20 questions cover everything — detailed transit analysis, personalized remedies, live consultation-style sessions, and priority support. You get the full Vedic toolkit: dashas, yogas, doshas, divisional charts, and muhurta checks. Designed for users who treat Vaanii as their primary astrologer."
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl border border-border bg-card/70 p-8 backdrop-blur-sm",
								"data-tsd-source": "/src/routes/pricing.tsx:251:11",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-2xl text-foreground",
										"data-tsd-source": "/src/routes/pricing.tsx:252:13",
										children: "Why pay for astrology when AI is free elsewhere?"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-muted-foreground leading-relaxed",
										"data-tsd-source": "/src/routes/pricing.tsx:253:13",
										children: "Most free astrology apps give you generic sun-sign horoscopes — the same reading for everyone born in the same month. AstroVaanii is different. Every answer is based on your exact birth chart: your planetary positions, your active dasha periods, your unique yogas and doshas. The AI is trained on classical Parashara and Jaimini texts, not generic internet content. Your chart stays in context across every question, and our practising Jyotishis audit conversations weekly. You're not paying for a chatbot — you're paying for rigorous Vedic astrology, available 24/7, in your language."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-3 text-muted-foreground leading-relaxed",
										"data-tsd-source": "/src/routes/pricing.tsx:262:13",
										children: [
											"All plans include access across 9 Indian languages, end-to-end encrypted birth data, and the ability to switch devices without losing your chat history. Start with any plan and upgrade when you need more. If you're ever unsure, our team is happy to help at",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: "mailto:hello@astrovaanii.ai",
												className: "text-primary underline underline-offset-4",
												"data-tsd-source": "/src/routes/pricing.tsx:267:15",
												children: "hello@astrovaanii.ai"
											}),
											"."
										]
									})
								]
							})
						]
					})
				]
			})
		]
	});
}
//#endregion
export { PricingPage as component };
