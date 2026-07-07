import { o as __toESM } from "../_runtime.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as signInWithGoogle, o as signUpWithEmail, r as getUserDoc, s as vaanii_persona_default } from "./vaanii-persona-D2kfjqvC.mjs";
import { t as startalks_icon_default } from "./startalks-icon-Ch-3XBzc.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as getChart } from "./chart-server-BTD1lk8f.mjs";
import { t as Reveal } from "./Reveal-CznoT_Wi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/signup-DyM77g5U.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SignupPage() {
	const navigate = useNavigate();
	const [showIntro, setShowIntro] = (0, import_react.useState)(false);
	const [googleLoading, setGoogleLoading] = (0, import_react.useState)(false);
	const [emailLoading, setEmailLoading] = (0, import_react.useState)(false);
	const [authError, setAuthError] = (0, import_react.useState)("");
	const routeAfterAuth = async (user) => {
		const email = user.email || "";
		const base = {
			email,
			uid: user.uid
		};
		const existing = email ? await getUserDoc(email) : null;
		if (existing) {
			const stored = {
				...base,
				...existing
			};
			if (existing.dob && existing.timeOfBirth && existing.latitude != null && existing.longitude != null) {
				const [y, m, d] = existing.dob.split("-").map(Number);
				const [h, min] = existing.timeOfBirth.split(":").map(Number);
				const result = await getChart({ data: {
					year: y,
					month: m,
					day: d,
					hour: h || 12,
					minute: min || 0,
					latitude: existing.latitude,
					longitude: existing.longitude,
					timezoneOffset: existing.timezoneOffset
				} });
				if (result.success) stored.chart = result.chart;
				else console.error("Chart recalculation failed:", result.error);
			}
			localStorage.setItem("userData", JSON.stringify(stored));
			navigate({ to: "/dashboard" });
		} else {
			localStorage.setItem("userData", JSON.stringify(base));
			navigate({ to: "/onboarding" });
		}
	};
	const handleGoogleSignIn = async () => {
		setGoogleLoading(true);
		setAuthError("");
		try {
			const user = await signInWithGoogle();
			await routeAfterAuth(user);
		} catch (error) {
			console.error("Google sign-in error:", error);
			setAuthError("Google sign-in failed. Please try again.");
			setGoogleLoading(false);
		}
	};
	const handleEmailSignUp = async (e) => {
		e.preventDefault();
		setAuthError("");
		const form = e.currentTarget;
		const email = form.querySelector("input[type=\"email\"]")?.value;
		const password = form.querySelector("input[type=\"password\"]")?.value;
		if (!email || !password) return;
		setEmailLoading(true);
		try {
			const user = await signUpWithEmail(email, password);
			await routeAfterAuth(user);
		} catch (error) {
			console.error("Email sign-up error:", error);
			setAuthError(error?.message || "Sign-up failed. Please try again.");
			setEmailLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		const t = setTimeout(() => setShowIntro(true), 350);
		return () => clearTimeout(t);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative min-h-screen overflow-hidden bg-background grain",
		"data-tsd-source": "/src/routes/signup.tsx:91:10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "orb h-[420px] w-[420px] bg-[color:var(--gold)] -left-32 -top-24",
				"data-tsd-source": "/src/routes/signup.tsx:92:7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "orb h-[360px] w-[360px] bg-[color:var(--clay)] -right-24 bottom-0 opacity-40",
				"data-tsd-source": "/src/routes/signup.tsx:93:7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative z-10 mx-auto flex h-16 max-w-6xl items-center justify-between px-6",
				"data-tsd-source": "/src/routes/signup.tsx:95:7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2",
					"data-tsd-source": "/src/routes/signup.tsx:96:9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: startalks_icon_default,
						alt: "",
						width: 32,
						height: 32,
						className: "h-8 w-8",
						"data-tsd-source": "/src/routes/signup.tsx:97:11"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-display text-lg",
						"data-tsd-source": "/src/routes/signup.tsx:98:11",
						children: ["Astro", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							"data-tsd-source": "/src/routes/signup.tsx:98:55",
							children: "Vaanii"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-sm text-muted-foreground hover:text-foreground",
					"data-tsd-source": "/src/routes/signup.tsx:100:9",
					children: "← Back home"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 pt-0 pb-6 md:grid-cols-[1.05fr_1fr] md:py-16",
				"data-tsd-source": "/src/routes/signup.tsx:103:7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					"data-tsd-source": "/src/routes/signup.tsx:105:9",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden md:block",
						"data-tsd-source": "/src/routes/signup.tsx:106:11",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground",
								"data-tsd-source": "/src/routes/signup.tsx:107:13",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "h-1.5 w-1.5 rounded-full bg-[color:var(--sage)]",
									"data-tsd-source": "/src/routes/signup.tsx:108:15"
								}), " Vaanii is online"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-6 font-display text-4xl leading-[1.05] tracking-tight md:text-5xl",
								"data-tsd-source": "/src/routes/signup.tsx:110:13",
								children: [
									"Begin your journey with ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
										className: "not-italic text-primary",
										"data-tsd-source": "/src/routes/signup.tsx:111:39",
										children: "Vaanii"
									}),
									"."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-md text-muted-foreground",
								"data-tsd-source": "/src/routes/signup.tsx:113:13",
								children: "Three quick steps — create your account, share your birth details, and start chatting. Your data stays private, encrypted, and yours."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-8 space-y-4 text-sm",
								"data-tsd-source": "/src/routes/signup.tsx:117:13",
								children: [
									["Private by default", "End-to-end encrypted birth data. Never sold, never shared."],
									["24/7 conversations", "Ask anything, anytime — in nine Indian languages."],
									["Classical Vedic accuracy", "Parashara & Jaimini calculations, human-reviewed."]
								].map(([t, d]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-3",
									"data-tsd-source": "/src/routes/signup.tsx:118:279",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 h-2 w-2 rounded-full bg-primary",
										"data-tsd-source": "/src/routes/signup.tsx:119:19"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-tsd-source": "/src/routes/signup.tsx:120:19",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-medium text-foreground",
											"data-tsd-source": "/src/routes/signup.tsx:121:21",
											children: t
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-muted-foreground",
											"data-tsd-source": "/src/routes/signup.tsx:122:21",
											children: d
										})]
									})]
								}, t))
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: 100,
					"data-tsd-source": "/src/routes/signup.tsx:130:9",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto w-full max-w-md rounded-3xl border border-border bg-card/80 p-8 shadow-xl backdrop-blur-md md:p-10",
						"data-tsd-source": "/src/routes/signup.tsx:131:11",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl text-primary",
								"data-tsd-source": "/src/routes/signup.tsx:132:13",
								children: "Create your account"
							}),
							authError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-full bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-600 text-center",
								"data-tsd-source": "/src/routes/signup.tsx:134:27",
								children: authError
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								className: "mt-7 space-y-3",
								onSubmit: handleEmailSignUp,
								"data-tsd-source": "/src/routes/signup.tsx:137:13",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center gap-3 rounded-full border border-border bg-background/70 px-4 py-3 focus-within:border-primary/60",
										"data-tsd-source": "/src/routes/signup.tsx:138:15",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
											width: "18",
											height: "18",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "1.6",
											className: "text-muted-foreground",
											"data-tsd-source": "/src/routes/signup.tsx:139:17",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
												x: "3",
												y: "5",
												width: "18",
												height: "14",
												rx: "3",
												"data-tsd-source": "/src/routes/signup.tsx:140:19"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "m3 7 9 6 9-6",
												"data-tsd-source": "/src/routes/signup.tsx:140:69"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "email",
											placeholder: "Email",
											className: "w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground",
											"data-tsd-source": "/src/routes/signup.tsx:142:17"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex items-center gap-3 rounded-full border border-border bg-background/70 px-4 py-3 focus-within:border-primary/60",
										"data-tsd-source": "/src/routes/signup.tsx:144:15",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
											width: "18",
											height: "18",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "1.6",
											className: "text-muted-foreground",
											"data-tsd-source": "/src/routes/signup.tsx:145:17",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
												x: "4",
												y: "10",
												width: "16",
												height: "10",
												rx: "2",
												"data-tsd-source": "/src/routes/signup.tsx:146:19"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M8 10V7a4 4 0 0 1 8 0v3",
												"data-tsd-source": "/src/routes/signup.tsx:146:70"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "password",
											placeholder: "Password",
											className: "w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground",
											"data-tsd-source": "/src/routes/signup.tsx:148:17"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										disabled: emailLoading,
										className: "mt-2 w-full rounded-full bg-primary py-3.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 disabled:opacity-50",
										"data-tsd-source": "/src/routes/signup.tsx:151:15",
										children: emailLoading ? "Creating account..." : "Create account"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground",
								"data-tsd-source": "/src/routes/signup.tsx:156:13",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-px flex-1 bg-border",
										"data-tsd-source": "/src/routes/signup.tsx:157:15"
									}),
									" or ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-px flex-1 bg-border",
										"data-tsd-source": "/src/routes/signup.tsx:157:60"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2.5",
								"data-tsd-source": "/src/routes/signup.tsx:160:13",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: handleGoogleSignIn,
										disabled: googleLoading,
										className: "flex w-full items-center justify-center gap-3 rounded-full border border-border bg-background py-3 text-sm font-medium hover:bg-card disabled:opacity-50",
										"data-tsd-source": "/src/routes/signup.tsx:161:15",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleMark, { "data-tsd-source": "/src/routes/signup.tsx:162:17" }),
											" ",
											googleLoading ? "Signing in..." : "Continue with Google"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "flex w-full items-center justify-center gap-3 rounded-full bg-foreground py-3 text-sm font-medium text-background hover:opacity-90",
										"data-tsd-source": "/src/routes/signup.tsx:164:15",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppleMark, { "data-tsd-source": "/src/routes/signup.tsx:165:17" }), " Continue with Apple"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "flex w-full items-center justify-center gap-3 rounded-full border border-border bg-[color:var(--sage)]/15 py-3 text-sm font-medium hover:bg-[color:var(--sage)]/25",
										"data-tsd-source": "/src/routes/signup.tsx:167:15",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuestMark, { "data-tsd-source": "/src/routes/signup.tsx:168:17" }), " Continue as guest"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-6 text-center text-sm text-muted-foreground",
								"data-tsd-source": "/src/routes/signup.tsx:172:13",
								children: ["Already have an account? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									className: "font-medium text-primary hover:underline",
									href: "#",
									"data-tsd-source": "/src/routes/signup.tsx:173:40",
									children: "Log in"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-center text-[11px] text-muted-foreground",
								"data-tsd-source": "/src/routes/signup.tsx:175:13",
								children: "By continuing you agree to our Terms & Privacy. Your birth data is encrypted."
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `fixed inset-0 z-50 flex items-end justify-center px-4 pb-6 transition-opacity duration-500 md:items-center md:pb-0 ${showIntro ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`,
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": "vaanii-intro-title",
				"data-tsd-source": "/src/routes/signup.tsx:183:7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `absolute inset-0 bg-background/60 backdrop-blur-sm transition-opacity ${showIntro ? "opacity-100" : "opacity-0"}`,
					onClick: () => setShowIntro(false),
					"data-tsd-source": "/src/routes/signup.tsx:184:9"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card shadow-2xl transition-all duration-500 ${showIntro ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`,
					"data-tsd-source": "/src/routes/signup.tsx:185:9",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative bg-gradient-to-br from-[color:var(--gold)]/25 via-card to-[color:var(--clay)]/20 px-6 pt-7 pb-5",
							"data-tsd-source": "/src/routes/signup.tsx:186:11",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4",
								"data-tsd-source": "/src/routes/signup.tsx:187:13",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									"data-tsd-source": "/src/routes/signup.tsx:188:15",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute inset-0 -m-1 rounded-full bg-primary/25 blur-md",
											"data-tsd-source": "/src/routes/signup.tsx:189:17"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: vaanii_persona_default,
											alt: "Vaanii, AI astrologer",
											className: "relative h-16 w-16 rounded-full border-2 border-background object-cover shadow-lg",
											"data-tsd-source": "/src/routes/signup.tsx:190:17"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-card bg-[color:var(--sage)]",
											"data-tsd-source": "/src/routes/signup.tsx:191:17",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "h-1.5 w-1.5 rounded-full bg-white",
												"data-tsd-source": "/src/routes/signup.tsx:192:19"
											})
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-tsd-source": "/src/routes/signup.tsx:195:15",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[11px] uppercase tracking-widest text-primary",
											"data-tsd-source": "/src/routes/signup.tsx:196:17",
											children: "Vaanii AI"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											id: "vaanii-intro-title",
											className: "font-display text-xl",
											"data-tsd-source": "/src/routes/signup.tsx:197:17",
											children: "A quick hello 🙏"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs text-muted-foreground",
											"data-tsd-source": "/src/routes/signup.tsx:198:17",
											children: "Online now · replies instantly"
										})
									]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 px-6 py-5 text-sm leading-relaxed",
							"data-tsd-source": "/src/routes/signup.tsx:203:11",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "rounded-2xl rounded-tl-sm bg-background/70 px-4 py-3 text-foreground",
									"data-tsd-source": "/src/routes/signup.tsx:204:13",
									children: [
										"Hey, I'm ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-primary",
											"data-tsd-source": "/src/routes/signup.tsx:205:24",
											children: "Vaanii AI"
										}),
										" — your personal AI astrologer."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "rounded-2xl rounded-tl-sm bg-background/70 px-4 py-3 text-foreground",
									"data-tsd-source": "/src/routes/signup.tsx:207:13",
									children: [
										"You're just ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											"data-tsd-source": "/src/routes/signup.tsx:208:27",
											children: "three quick steps"
										}),
										" away from starting your journey with me."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "rounded-2xl rounded-tl-sm bg-background/70 px-4 py-3 text-foreground",
									"data-tsd-source": "/src/routes/signup.tsx:210:13",
									children: "I'm here to make every interaction feel personal and meaningful from the very beginning."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "rounded-2xl rounded-tl-sm bg-background/70 px-4 py-3 text-foreground",
									"data-tsd-source": "/src/routes/signup.tsx:213:13",
									children: "Create your account to continue — your information stays private, secure and protected with us."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "rounded-2xl rounded-tl-sm bg-background/70 px-4 py-3 font-medium text-foreground",
									"data-tsd-source": "/src/routes/signup.tsx:216:13",
									children: "Let's get started ✨"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-3 border-t border-border px-6 py-4",
							"data-tsd-source": "/src/routes/signup.tsx:221:11",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowIntro(false),
								className: "flex-1 rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90",
								"data-tsd-source": "/src/routes/signup.tsx:222:13",
								children: "Continue to sign up"
							})
						})
					]
				})]
			})
		]
	});
}
function GoogleMark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 48 48",
		"data-tsd-source": "/src/routes/signup.tsx:231:10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#EA4335",
				d: "M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.4 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6C12.4 13.5 17.7 9.5 24 9.5z",
				"data-tsd-source": "/src/routes/signup.tsx:232:7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#4285F4",
				d: "M46.5 24.5c0-1.6-.2-3.2-.5-4.7H24v9h12.7c-.5 2.8-2.1 5.2-4.5 6.8l7 5.4c4.1-3.8 6.9-9.4 6.9-16z",
				"data-tsd-source": "/src/routes/signup.tsx:233:7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#FBBC05",
				d: "M10.4 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.9-4.7l-7.8-6A24 24 0 0 0 0 24c0 3.9.9 7.6 2.6 10.9l7.8-6.2z",
				"data-tsd-source": "/src/routes/signup.tsx:234:7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#34A853",
				d: "M24 48c6.2 0 11.5-2.1 15.3-5.6l-7-5.4c-2 1.4-4.6 2.2-8.3 2.2-6.3 0-11.6-4-13.6-9.6l-7.8 6.1C6.5 42.6 14.6 48 24 48z",
				"data-tsd-source": "/src/routes/signup.tsx:235:7"
			})
		]
	});
}
function AppleMark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		width: "14",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "currentColor",
		"data-tsd-source": "/src/routes/signup.tsx:239:10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.7-3-2-3.7-2-1.6-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.1 2.5-1.8 3.1-.5 7.7 1.2 10.2.9 1.2 1.9 2.6 3.2 2.5 1.3 0 1.8-.8 3.3-.8s2 .8 3.3.8c1.4 0 2.3-1.2 3.1-2.5.7-.9 1.2-1.9 1.6-3-.1 0-3-1.1-3-3.8zM13.7 4.6c.7-.8 1.1-2 1-3.1-1 0-2.2.6-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.4z",
			"data-tsd-source": "/src/routes/signup.tsx:240:7"
		})
	});
}
function GuestMark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.8",
		"data-tsd-source": "/src/routes/signup.tsx:244:10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "8",
			r: "4",
			"data-tsd-source": "/src/routes/signup.tsx:245:7"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6",
			"data-tsd-source": "/src/routes/signup.tsx:245:38"
		})]
	});
}
//#endregion
export { SignupPage as component };
