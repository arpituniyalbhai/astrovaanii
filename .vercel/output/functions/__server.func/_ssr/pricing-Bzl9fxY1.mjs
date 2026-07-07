import { o as __toESM } from "../_runtime.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as auth } from "./firebase-JHzvw2gu.mjs";
import { t as startalks_icon_default } from "./startalks-icon-Ch-3XBzc.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pricing-Bzl9fxY1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var plans = [
	{
		name: "Starter",
		price: 79,
		priceDisplay: "₹79",
		features: [
			"5 AI chat questions",
			"Daily predictions",
			"Basic birth chart",
			"Career insights"
		]
	},
	{
		name: "Pro",
		price: 139,
		priceDisplay: "₹139",
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
		price: 249,
		priceDisplay: "₹249",
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
	const [loading, setLoading] = (0, import_react.useState)(null);
	const [paymentMessage, setPaymentMessage] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const local = JSON.parse(localStorage.getItem("userData") || "{}");
		setUserName(local.name || "User");
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
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "orb h-[420px] w-[420px] bg-[color:var(--gold)] -left-32 -top-24 fixed" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "orb h-[360px] w-[360px] bg-[color:var(--clay)] -right-24 bottom-0 opacity-40 fixed" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
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
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "hidden sm:block text-sm text-muted-foreground",
							children: ["Welcome, ", userName]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard",
							className: "rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90",
							children: "Back to Dashboard"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative z-10 mx-auto max-w-6xl px-6 py-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center mb-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl md:text-5xl text-primary mb-4",
							children: "Choose Your Plan"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground text-lg max-w-lg mx-auto",
							children: "Unlock deeper insights with our premium plans"
						})]
					}),
					paymentMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `max-w-lg mx-auto mb-8 p-4 rounded-xl text-center ${paymentMessage.type === "success" ? "bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-400" : "bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-400"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: paymentMessage.message
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid md:grid-cols-3 gap-6 max-w-5xl mx-auto",
						children: plans.map((plan) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `relative rounded-3xl border border-border bg-card/80 p-6 shadow-xl backdrop-blur-md ${plan.popular ? "border-primary/50 ring-2 ring-primary/20" : ""}`,
							children: [
								plan.popular && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground",
									children: "Most Popular"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-xl text-foreground mb-2",
									children: plan.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-3xl font-bold text-primary mb-4",
									children: plan.priceDisplay
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-2 mb-6",
									children: plan.features.map((feature) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-2 text-sm text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											width: "16",
											height: "16",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2",
											className: "text-[color:var(--sage)] shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "20 6 9 17 4 12" })
										}), feature]
									}, feature))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: (e) => handlePurchase(plan.name, plan.price, e),
									disabled: loading === plan.name,
									className: `w-full rounded-full py-3 text-sm font-medium transition-all ${plan.popular ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90" : "border border-border bg-background/70 hover:bg-card"} ${loading === plan.name ? "opacity-50 cursor-not-allowed" : ""}`,
									children: loading === plan.name ? "Processing..." : "Purchase"
								})
							]
						}, plan.name))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center mt-12",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: [
								"All plans include access to Vaanii AI Pro",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Questions?",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "mailto:hello@astrovaanii.ai",
									className: "text-primary underline underline-offset-4",
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
