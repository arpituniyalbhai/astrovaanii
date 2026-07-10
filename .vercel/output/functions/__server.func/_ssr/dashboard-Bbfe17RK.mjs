import { o as __toESM } from "../_runtime.mjs";
import { t as astrovaanii_logo_default } from "./astrovaanii-logo-BIjzg6F9.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as onUserDoc, r as getUserDoc, t as auth } from "./firebase-JHzvw2gu.mjs";
import { t as vaanii_persona_default } from "./vaanii-persona-CbI512xY.mjs";
import { t as getChart } from "./chart-server-BTD1lk8f.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-Bbfe17RK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var suggestedQuestions = [
	"What is my today's horoscope?",
	"When will I get a job?",
	"What are my lucky numbers today?",
	"How is my love life this month?",
	"What does my birth chart say about my career?",
	"When will I find my soulmate?"
];
function DashboardPage() {
	const navigate = useNavigate();
	const [inputValue, setInputValue] = (0, import_react.useState)("");
	const [activeTab, setActiveTab] = (0, import_react.useState)("chat");
	const [isSidebarOpen, setIsSidebarOpen] = (0, import_react.useState)(false);
	const [showWelcomePopup, setShowWelcomePopup] = (0, import_react.useState)(false);
	const [showComingSoonPopup, setShowComingSoonPopup] = (0, import_react.useState)(false);
	const [showSettings, setShowSettings] = (0, import_react.useState)(false);
	const [userName, setUserName] = (0, import_react.useState)(() => {
		if (typeof window !== "undefined") return JSON.parse(localStorage.getItem("userData") || "{}").name || "User";
		return "User";
	});
	const [questionsRemaining, setQuestionsRemaining] = (0, import_react.useState)(0);
	const [todayDate, setTodayDate] = (0, import_react.useState)("");
	const [userEmail, setUserEmail] = (0, import_react.useState)(() => {
		if (typeof window !== "undefined") return JSON.parse(localStorage.getItem("userData") || "{}").email || "";
		return "";
	});
	(0, import_react.useEffect)(() => {
		const today = /* @__PURE__ */ new Date();
		setTodayDate(today.toLocaleDateString("en-IN", {
			day: "numeric",
			month: "long",
			year: "numeric"
		}));
		if (localStorage.getItem("lastDailyPopupDate") !== today.toDateString()) setShowWelcomePopup(true);
	}, []);
	const handlePopupClose = () => {
		setShowWelcomePopup(false);
		localStorage.setItem("lastDailyPopupDate", (/* @__PURE__ */ new Date()).toDateString());
	};
	const handleDailyPredictionClick = () => {
		handlePopupClose();
		navigate({
			to: "/chat",
			search: { question: "Hey vaani tell my today predictions" }
		});
	};
	(0, import_react.useEffect)(() => {
		const local = JSON.parse(localStorage.getItem("userData") || "{}");
		const email = auth.currentUser?.email || local.email;
		if (email) {
			setUserEmail(email);
			const unsub = onUserDoc(email, (data) => {
				if (data) {
					setUserName(data.name || "User");
					setQuestionsRemaining(data.questionsRemaining ?? 0);
				}
			});
			if (!local.chart && local.latitude == null) getUserDoc(email).then((doc) => {
				if (doc?.dob && doc?.timeOfBirth && doc.latitude != null && doc.longitude != null) {
					const stored = {
						...local,
						...doc
					};
					const [y, m, d] = doc.dob.split("-").map(Number);
					const [h, min] = doc.timeOfBirth.split(":").map(Number);
					getChart({ data: {
						year: y,
						month: m,
						day: d,
						hour: h || 12,
						minute: min || 0,
						latitude: doc.latitude,
						longitude: doc.longitude,
						timezoneOffset: doc.timezoneOffset
					} }).then((result) => {
						if (result.success) {
							stored.chart = result.chart;
							localStorage.setItem("userData", JSON.stringify(stored));
						}
					});
				}
			});
			return unsub;
		}
		if (local.name) setUserName(local.name);
	}, []);
	const handleSendMessage = () => {
		if (!inputValue.trim()) return;
		navigate({
			to: "/chat",
			search: { question: inputValue }
		});
		setInputValue("");
	};
	const handleKeyPress = (e) => {
		if (e.key === "Enter") handleSendMessage();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative min-h-screen overflow-hidden bg-background grain",
		"data-tsd-source": "/src/routes/dashboard.tsx:122:10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "orb h-[420px] w-[420px] bg-[color:var(--gold)] -left-32 -top-24",
				"data-tsd-source": "/src/routes/dashboard.tsx:123:7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "orb h-[360px] w-[360px] bg-[color:var(--clay)] -right-24 bottom-0 opacity-40",
				"data-tsd-source": "/src/routes/dashboard.tsx:124:7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex h-screen",
				"data-tsd-source": "/src/routes/dashboard.tsx:126:7",
				children: [
					isSidebarOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden",
						onClick: () => setIsSidebarOpen(false),
						"data-tsd-source": "/src/routes/dashboard.tsx:128:27"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: `fixed inset-y-0 left-0 z-50 w-64 transform border-r border-border bg-card/95 backdrop-blur-md transition-transform duration-300 md:hidden ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`,
						"data-tsd-source": "/src/routes/dashboard.tsx:131:9",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between px-6 py-4 border-b border-border",
								"data-tsd-source": "/src/routes/dashboard.tsx:132:11",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-display text-lg",
									"data-tsd-source": "/src/routes/dashboard.tsx:133:13",
									children: ["Astro", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary",
										"data-tsd-source": "/src/routes/dashboard.tsx:133:57",
										children: "Vaanii"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setIsSidebarOpen(false),
									className: "text-muted-foreground hover:text-foreground",
									"data-tsd-source": "/src/routes/dashboard.tsx:134:13",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										width: "24",
										height: "24",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2",
										"data-tsd-source": "/src/routes/dashboard.tsx:135:15",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: "M18 6L6 18M6 6l12 12",
											"data-tsd-source": "/src/routes/dashboard.tsx:136:17"
										})
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
								className: "flex-1 px-4 py-6 space-y-1",
								"data-tsd-source": "/src/routes/dashboard.tsx:140:11",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => {
											setActiveTab("chat");
											setIsSidebarOpen(false);
										},
										className: `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === "chat" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-background/50 hover:text-foreground"}`,
										"data-tsd-source": "/src/routes/dashboard.tsx:141:13",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											width: "18",
											height: "18",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2",
											"data-tsd-source": "/src/routes/dashboard.tsx:145:15",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
												"data-tsd-source": "/src/routes/dashboard.tsx:146:17"
											})
										}), "Chat"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => {
											navigate({ to: "/pricing" });
											setIsSidebarOpen(false);
										},
										className: "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-background/50 hover:text-foreground",
										"data-tsd-source": "/src/routes/dashboard.tsx:150:13",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											width: "18",
											height: "18",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2",
											"data-tsd-source": "/src/routes/dashboard.tsx:156:15",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
												"data-tsd-source": "/src/routes/dashboard.tsx:157:17"
											})
										}), "Pricing"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => {
											navigate({ to: "/my-chart" });
											setIsSidebarOpen(false);
										},
										className: "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-background/50 hover:text-foreground",
										"data-tsd-source": "/src/routes/dashboard.tsx:161:13",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
											width: "18",
											height: "18",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2",
											"data-tsd-source": "/src/routes/dashboard.tsx:167:15",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
												x: "3",
												y: "3",
												width: "18",
												height: "18",
												rx: "2",
												"data-tsd-source": "/src/routes/dashboard.tsx:168:17"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M3 12h18M12 3v18M12 12l-4 4M12 12l4 4M12 12l-4-4M12 12l4-4",
												"data-tsd-source": "/src/routes/dashboard.tsx:169:17"
											})]
										}), "My Chart"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => {
											setActiveTab("more");
											setIsSidebarOpen(false);
										},
										className: `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === "more" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-background/50 hover:text-foreground"}`,
										"data-tsd-source": "/src/routes/dashboard.tsx:173:13",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
											width: "18",
											height: "18",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2",
											"data-tsd-source": "/src/routes/dashboard.tsx:177:15",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: "12",
													cy: "12",
													r: "1",
													"data-tsd-source": "/src/routes/dashboard.tsx:178:17"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: "12",
													cy: "5",
													r: "1",
													"data-tsd-source": "/src/routes/dashboard.tsx:179:17"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: "12",
													cy: "19",
													r: "1",
													"data-tsd-source": "/src/routes/dashboard.tsx:180:17"
												})
											]
										}), "More"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "px-4 py-4 border-t border-border",
								"data-tsd-source": "/src/routes/dashboard.tsx:185:11",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										navigate({ to: "/" });
										setIsSidebarOpen(false);
									},
									className: "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-background/50 hover:text-foreground",
									"data-tsd-source": "/src/routes/dashboard.tsx:186:13",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
										width: "18",
										height: "18",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2",
										"data-tsd-source": "/src/routes/dashboard.tsx:192:15",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
												"data-tsd-source": "/src/routes/dashboard.tsx:193:17"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
												points: "16 17 21 12 16 7",
												"data-tsd-source": "/src/routes/dashboard.tsx:194:17"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
												x1: "21",
												y1: "12",
												x2: "9",
												y2: "12",
												"data-tsd-source": "/src/routes/dashboard.tsx:195:17"
											})
										]
									}), "Sign out"]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "hidden md:flex w-64 flex-col border-r border-border bg-card/60 backdrop-blur-md",
						"data-tsd-source": "/src/routes/dashboard.tsx:203:9",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 px-6 py-5 border-b border-border",
								"data-tsd-source": "/src/routes/dashboard.tsx:205:11",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: astrovaanii_logo_default,
									alt: "",
									width: 32,
									height: 32,
									className: "h-8 w-8",
									"data-tsd-source": "/src/routes/dashboard.tsx:206:13"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-display text-lg",
									"data-tsd-source": "/src/routes/dashboard.tsx:207:13",
									children: ["Astro", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary",
										"data-tsd-source": "/src/routes/dashboard.tsx:207:57",
										children: "Vaanii"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "px-4 py-4 border-b border-border",
								"data-tsd-source": "/src/routes/dashboard.tsx:211:11",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 px-3 py-2 rounded-xl bg-background/50",
									"data-tsd-source": "/src/routes/dashboard.tsx:212:13",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										"data-tsd-source": "/src/routes/dashboard.tsx:213:15",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: vaanii_persona_default,
											alt: "Vaanii",
											className: "h-10 w-10 rounded-full object-cover border-2 border-primary/20",
											"data-tsd-source": "/src/routes/dashboard.tsx:214:17"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-card bg-[color:var(--sage)]",
											"data-tsd-source": "/src/routes/dashboard.tsx:215:17",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "h-1.5 w-1.5 rounded-full bg-white",
												"data-tsd-source": "/src/routes/dashboard.tsx:216:19"
											})
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										"data-tsd-source": "/src/routes/dashboard.tsx:219:15",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm font-medium text-foreground truncate",
											"data-tsd-source": "/src/routes/dashboard.tsx:220:17",
											children: userName
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs text-muted-foreground",
											"data-tsd-source": "/src/routes/dashboard.tsx:221:17",
											children: "Online"
										})]
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
								className: "flex-1 px-4 py-6 space-y-1",
								"data-tsd-source": "/src/routes/dashboard.tsx:227:11",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setActiveTab("chat"),
										className: `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === "chat" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-background/50 hover:text-foreground"}`,
										"data-tsd-source": "/src/routes/dashboard.tsx:228:13",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											width: "18",
											height: "18",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2",
											"data-tsd-source": "/src/routes/dashboard.tsx:229:15",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
												"data-tsd-source": "/src/routes/dashboard.tsx:230:17"
											})
										}), "Chat"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => navigate({ to: "/pricing" }),
										className: "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-background/50 hover:text-foreground",
										"data-tsd-source": "/src/routes/dashboard.tsx:234:13",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											width: "18",
											height: "18",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2",
											"data-tsd-source": "/src/routes/dashboard.tsx:237:15",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
												"data-tsd-source": "/src/routes/dashboard.tsx:238:17"
											})
										}), "Pricing"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => navigate({ to: "/my-chart" }),
										className: "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-background/50 hover:text-foreground",
										"data-tsd-source": "/src/routes/dashboard.tsx:242:13",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
											width: "18",
											height: "18",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2",
											"data-tsd-source": "/src/routes/dashboard.tsx:245:15",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
												x: "3",
												y: "3",
												width: "18",
												height: "18",
												rx: "2",
												"data-tsd-source": "/src/routes/dashboard.tsx:246:17"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M3 12h18M12 3v18M12 12l-4 4M12 12l4 4M12 12l-4-4M12 12l4-4",
												"data-tsd-source": "/src/routes/dashboard.tsx:247:17"
											})]
										}), "My Chart"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setActiveTab("more"),
										className: `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === "more" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-background/50 hover:text-foreground"}`,
										"data-tsd-source": "/src/routes/dashboard.tsx:251:13",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
											width: "18",
											height: "18",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2",
											"data-tsd-source": "/src/routes/dashboard.tsx:252:15",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: "12",
													cy: "12",
													r: "1",
													"data-tsd-source": "/src/routes/dashboard.tsx:253:17"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: "12",
													cy: "5",
													r: "1",
													"data-tsd-source": "/src/routes/dashboard.tsx:254:17"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: "12",
													cy: "19",
													r: "1",
													"data-tsd-source": "/src/routes/dashboard.tsx:255:17"
												})
											]
										}), "More"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "px-4 py-4 border-t border-border",
								"data-tsd-source": "/src/routes/dashboard.tsx:262:11",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 px-3 py-2 rounded-xl bg-background/50",
									"data-tsd-source": "/src/routes/dashboard.tsx:263:13",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										"data-tsd-source": "/src/routes/dashboard.tsx:264:15",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: vaanii_persona_default,
											alt: "Vaanii",
											className: "h-10 w-10 rounded-full object-cover border-2 border-primary/20",
											"data-tsd-source": "/src/routes/dashboard.tsx:265:17"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-card bg-[color:var(--sage)]",
											"data-tsd-source": "/src/routes/dashboard.tsx:266:17",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "h-1.5 w-1.5 rounded-full bg-white",
												"data-tsd-source": "/src/routes/dashboard.tsx:267:19"
											})
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										"data-tsd-source": "/src/routes/dashboard.tsx:270:15",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm font-medium text-foreground truncate",
											"data-tsd-source": "/src/routes/dashboard.tsx:271:17",
											children: "Vaanii AI"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs text-muted-foreground",
											"data-tsd-source": "/src/routes/dashboard.tsx:272:17",
											children: "Online"
										})]
									})]
								})
							})
						]
					}),
					showWelcomePopup && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "fixed top-20 right-4 z-50 w-80",
						"data-tsd-source": "/src/routes/dashboard.tsx:279:30",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative rounded-2xl border border-border bg-card shadow-lg overflow-hidden",
							"data-tsd-source": "/src/routes/dashboard.tsx:280:13",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handlePopupClose,
								"aria-label": "Close",
								className: "absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground hover:text-foreground z-10",
								"data-tsd-source": "/src/routes/dashboard.tsx:281:15",
								children: "×"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3 p-4",
								"data-tsd-source": "/src/routes/dashboard.tsx:284:15",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative shrink-0",
									"data-tsd-source": "/src/routes/dashboard.tsx:285:17",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute inset-0 -m-1 rounded-full bg-primary/25 blur-md",
											"data-tsd-source": "/src/routes/dashboard.tsx:286:19"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: "/assets/vaanii-persona-BJOqqX-O.jpg",
											alt: "Vaanii, AI astrologer",
											className: "relative h-12 w-12 rounded-full border-2 border-background object-cover shadow-lg",
											"data-tsd-source": "/src/routes/dashboard.tsx:287:19"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-card bg-[color:var(--sage)]",
											"data-tsd-source": "/src/routes/dashboard.tsx:288:19",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "h-1.5 w-1.5 rounded-full bg-white",
												"data-tsd-source": "/src/routes/dashboard.tsx:289:21"
											})
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									"data-tsd-source": "/src/routes/dashboard.tsx:292:17",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] uppercase tracking-widest text-primary mb-1",
											"data-tsd-source": "/src/routes/dashboard.tsx:293:19",
											children: "Vaanii AI"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-display text-base text-foreground mb-1",
											"data-tsd-source": "/src/routes/dashboard.tsx:294:19"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted-foreground leading-relaxed mb-2",
											"data-tsd-source": "/src/routes/dashboard.tsx:295:19",
											children: [
												"Hey ",
												userName,
												"! Your ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-medium text-primary",
													"data-tsd-source": "/src/routes/dashboard.tsx:296:42",
													children: todayDate
												}),
												" prediction are ready."
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: handleDailyPredictionClick,
											className: "text-xs text-primary hover:underline font-medium",
											"data-tsd-source": "/src/routes/dashboard.tsx:298:19",
											children: "Click here to see your today prediction"
										})
									]
								})]
							})]
						})
					}),
					showComingSoonPopup && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
						"data-tsd-source": "/src/routes/dashboard.tsx:307:33",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative w-80 rounded-2xl border border-border bg-card shadow-lg overflow-hidden",
							"data-tsd-source": "/src/routes/dashboard.tsx:308:13",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowComingSoonPopup(false),
								"aria-label": "Close",
								className: "absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground hover:text-foreground z-10",
								"data-tsd-source": "/src/routes/dashboard.tsx:309:15",
								children: "×"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center gap-3 p-6 text-center",
								"data-tsd-source": "/src/routes/dashboard.tsx:312:15",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-4xl",
										"data-tsd-source": "/src/routes/dashboard.tsx:313:17",
										children: "📅"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase tracking-widest text-primary",
										"data-tsd-source": "/src/routes/dashboard.tsx:314:17",
										children: "Coming Soon"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-xl text-foreground",
										"data-tsd-source": "/src/routes/dashboard.tsx:315:17",
										children: "Calendar Feature"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										"data-tsd-source": "/src/routes/dashboard.tsx:316:17",
										children: "Track important astrological dates, transits, and events. Stay tuned for this exciting feature!"
									})
								]
							})]
						})
					}),
					showSettings && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
						"data-tsd-source": "/src/routes/dashboard.tsx:324:26",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative w-full max-w-md rounded-2xl border border-border bg-card shadow-lg overflow-hidden",
							"data-tsd-source": "/src/routes/dashboard.tsx:325:13",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowSettings(false),
								"aria-label": "Close",
								className: "absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground hover:text-foreground z-10",
								"data-tsd-source": "/src/routes/dashboard.tsx:326:15",
								children: "×"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-6",
								"data-tsd-source": "/src/routes/dashboard.tsx:329:15",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-2xl text-foreground mb-6",
									"data-tsd-source": "/src/routes/dashboard.tsx:330:17",
									children: "Settings"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									"data-tsd-source": "/src/routes/dashboard.tsx:331:17",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-4 rounded-xl border border-border bg-background/50",
											"data-tsd-source": "/src/routes/dashboard.tsx:332:19",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-sm text-muted-foreground mb-1",
												"data-tsd-source": "/src/routes/dashboard.tsx:333:21",
												children: "Name"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-medium text-foreground",
												"data-tsd-source": "/src/routes/dashboard.tsx:334:21",
												children: userName
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-4 rounded-xl border border-border bg-background/50",
											"data-tsd-source": "/src/routes/dashboard.tsx:336:19",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-sm text-muted-foreground mb-1",
												"data-tsd-source": "/src/routes/dashboard.tsx:337:21",
												children: "Email"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-medium text-foreground",
												"data-tsd-source": "/src/routes/dashboard.tsx:338:21",
												children: userEmail
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-4 rounded-xl border border-border bg-background/50",
											"data-tsd-source": "/src/routes/dashboard.tsx:340:19",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-sm text-muted-foreground mb-1",
												"data-tsd-source": "/src/routes/dashboard.tsx:341:21",
												children: "Questions Remaining"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-medium text-primary text-xl",
												"data-tsd-source": "/src/routes/dashboard.tsx:342:21",
												children: questionsRemaining
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-4 rounded-xl border border-border bg-background/50",
											"data-tsd-source": "/src/routes/dashboard.tsx:344:19",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-sm text-muted-foreground mb-1",
												"data-tsd-source": "/src/routes/dashboard.tsx:345:21",
												children: "Current Plan"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-medium text-foreground",
												"data-tsd-source": "/src/routes/dashboard.tsx:346:21",
												children: "Free Plan"
											})]
										})
									]
								})]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 flex flex-col",
						"data-tsd-source": "/src/routes/dashboard.tsx:354:9",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: "flex items-center justify-between px-6 py-4 border-b border-border bg-card/40 backdrop-blur-md",
							"data-tsd-source": "/src/routes/dashboard.tsx:356:11",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 md:hidden",
									"data-tsd-source": "/src/routes/dashboard.tsx:357:13",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setIsSidebarOpen(true),
											className: "text-muted-foreground hover:text-foreground",
											"data-tsd-source": "/src/routes/dashboard.tsx:358:15",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
												width: "24",
												height: "24",
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "2",
												"data-tsd-source": "/src/routes/dashboard.tsx:359:17",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
													d: "M3 12h18M3 6h18M3 18h18",
													"data-tsd-source": "/src/routes/dashboard.tsx:360:19"
												})
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: astrovaanii_logo_default,
											alt: "",
											width: 28,
											height: 28,
											className: "h-7 w-7",
											"data-tsd-source": "/src/routes/dashboard.tsx:363:15"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-display text-base",
											"data-tsd-source": "/src/routes/dashboard.tsx:364:15",
											children: ["Astro", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-primary",
												"data-tsd-source": "/src/routes/dashboard.tsx:364:61",
												children: "Vaanii"
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "hidden md:block font-display text-xl text-foreground",
									"data-tsd-source": "/src/routes/dashboard.tsx:366:13",
									children: activeTab === "chat" ? "Chat with Vaanii" : "More Options"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => navigate({ to: "/" }),
									className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
									"data-tsd-source": "/src/routes/dashboard.tsx:369:13",
									children: "Sign out"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 flex flex-col items-center justify-center px-6 py-8",
							"data-tsd-source": "/src/routes/dashboard.tsx:377:11",
							children: [activeTab === "chat" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-full max-w-2xl",
								"data-tsd-source": "/src/routes/dashboard.tsx:378:38",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-center mb-8",
										"data-tsd-source": "/src/routes/dashboard.tsx:380:17",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative inline-block mb-4",
											"data-tsd-source": "/src/routes/dashboard.tsx:381:19",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "absolute inset-0 -m-2 rounded-full bg-primary/25 blur-xl",
												"data-tsd-source": "/src/routes/dashboard.tsx:382:21"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: "/assets/vaanii-persona-BJOqqX-O.jpg",
												alt: "Vaanii, AI astrologer",
												className: "relative h-20 w-20 rounded-full border-4 border-background object-cover shadow-2xl",
												"data-tsd-source": "/src/routes/dashboard.tsx:383:21"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
											className: "font-display text-3xl text-primary mb-2",
											"data-tsd-source": "/src/routes/dashboard.tsx:385:19",
											children: [
												"Welcome ",
												userName,
												" - Ask Your Question"
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										"data-tsd-source": "/src/routes/dashboard.tsx:389:17",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mb-2 flex justify-center",
											"data-tsd-source": "/src/routes/dashboard.tsx:390:19",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "rounded-full bg-red-50 border border-red-200 px-4 py-2",
												"data-tsd-source": "/src/routes/dashboard.tsx:391:21",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-sm font-medium text-red-500",
													"data-tsd-source": "/src/routes/dashboard.tsx:392:23",
													children: [
														questionsRemaining,
														" question",
														questionsRemaining !== 1 ? "s" : "",
														" remaining"
													]
												})
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											"data-tsd-source": "/src/routes/dashboard.tsx:395:19",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: inputValue,
												onChange: (e) => setInputValue(e.target.value),
												onKeyPress: handleKeyPress,
												placeholder: "Ask Vaanii anything...",
												className: "w-full rounded-2xl border border-border bg-card/80 px-6 py-4 pr-24 text-base outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all shadow-lg shadow-primary/20",
												"data-tsd-source": "/src/routes/dashboard.tsx:396:21"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: handleSendMessage,
												disabled: !inputValue.trim(),
												className: "absolute right-2 top-1/2 -translate-y-1/2 rounded-xl bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all",
												"data-tsd-source": "/src/routes/dashboard.tsx:397:21",
												children: "Send"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-6",
										"data-tsd-source": "/src/routes/dashboard.tsx:404:17",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground mb-3 text-center",
											"data-tsd-source": "/src/routes/dashboard.tsx:405:19",
											children: "Try asking:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid grid-cols-2 gap-2",
											"data-tsd-source": "/src/routes/dashboard.tsx:406:19",
											children: suggestedQuestions.map((question, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setInputValue(question),
												className: "rounded-full border border-border bg-background/70 px-4 py-2 text-sm text-muted-foreground hover:bg-card hover:border-primary/40 hover:text-foreground transition-all",
												"data-tsd-source": "/src/routes/dashboard.tsx:407:66",
												children: question
											}, index))
										})]
									})
								]
							}), activeTab === "more" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-full max-w-md",
								"data-tsd-source": "/src/routes/dashboard.tsx:414:38",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center mb-8",
									"data-tsd-source": "/src/routes/dashboard.tsx:415:17",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-display text-3xl text-primary mb-2",
										"data-tsd-source": "/src/routes/dashboard.tsx:416:19",
										children: "More Options"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground",
										"data-tsd-source": "/src/routes/dashboard.tsx:417:19",
										children: "Additional features and settings"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									"data-tsd-source": "/src/routes/dashboard.tsx:419:17",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => navigate({ to: "/my-chart" }),
											className: "w-full flex items-center gap-4 p-4 rounded-2xl border border-border bg-card/80 hover:bg-card transition-all",
											"data-tsd-source": "/src/routes/dashboard.tsx:420:19",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-2xl",
													"data-tsd-source": "/src/routes/dashboard.tsx:423:21",
													children: "📊"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-left flex-1",
													"data-tsd-source": "/src/routes/dashboard.tsx:424:21",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "font-medium text-foreground",
														"data-tsd-source": "/src/routes/dashboard.tsx:425:23",
														children: "View Birth Chart"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-sm text-muted-foreground",
														"data-tsd-source": "/src/routes/dashboard.tsx:426:23",
														children: "See your detailed astrological chart"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
													width: "16",
													height: "16",
													viewBox: "0 0 24 24",
													fill: "none",
													stroke: "currentColor",
													strokeWidth: "2",
													className: "text-muted-foreground",
													"data-tsd-source": "/src/routes/dashboard.tsx:428:21",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
														points: "9 18 15 12 9 6",
														"data-tsd-source": "/src/routes/dashboard.tsx:429:23"
													})
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => setShowComingSoonPopup(true),
											className: "w-full flex items-center gap-4 p-4 rounded-2xl border border-border bg-card/80 hover:bg-card transition-all",
											"data-tsd-source": "/src/routes/dashboard.tsx:433:19",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-2xl",
													"data-tsd-source": "/src/routes/dashboard.tsx:434:21",
													children: "📅"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-left flex-1",
													"data-tsd-source": "/src/routes/dashboard.tsx:435:21",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "font-medium text-foreground",
														"data-tsd-source": "/src/routes/dashboard.tsx:436:23",
														children: "Calendar"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-sm text-muted-foreground",
														"data-tsd-source": "/src/routes/dashboard.tsx:437:23",
														children: "View important astrological dates"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
													width: "16",
													height: "16",
													viewBox: "0 0 24 24",
													fill: "none",
													stroke: "currentColor",
													strokeWidth: "2",
													className: "text-muted-foreground",
													"data-tsd-source": "/src/routes/dashboard.tsx:439:21",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
														points: "9 18 15 12 9 6",
														"data-tsd-source": "/src/routes/dashboard.tsx:440:23"
													})
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => setShowSettings(true),
											className: "w-full flex items-center gap-4 p-4 rounded-2xl border border-border bg-card/80 hover:bg-card transition-all",
											"data-tsd-source": "/src/routes/dashboard.tsx:444:19",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-2xl",
													"data-tsd-source": "/src/routes/dashboard.tsx:445:21",
													children: "⚙️"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-left flex-1",
													"data-tsd-source": "/src/routes/dashboard.tsx:446:21",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "font-medium text-foreground",
														"data-tsd-source": "/src/routes/dashboard.tsx:447:23",
														children: "Settings"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-sm text-muted-foreground",
														"data-tsd-source": "/src/routes/dashboard.tsx:448:23",
														children: "Account and app settings"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
													width: "16",
													height: "16",
													viewBox: "0 0 24 24",
													fill: "none",
													stroke: "currentColor",
													strokeWidth: "2",
													className: "text-muted-foreground",
													"data-tsd-source": "/src/routes/dashboard.tsx:450:21",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
														points: "9 18 15 12 9 6",
														"data-tsd-source": "/src/routes/dashboard.tsx:451:23"
													})
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => window.location.href = "mailto:hi@astrovaanii.in",
											className: "w-full flex items-center gap-4 p-4 rounded-2xl border border-border bg-card/80 hover:bg-card transition-all",
											"data-tsd-source": "/src/routes/dashboard.tsx:455:19",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-2xl",
													"data-tsd-source": "/src/routes/dashboard.tsx:456:21",
													children: "❓"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-left flex-1",
													"data-tsd-source": "/src/routes/dashboard.tsx:457:21",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "font-medium text-foreground",
														"data-tsd-source": "/src/routes/dashboard.tsx:458:23",
														children: "Help & Support"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-sm text-muted-foreground",
														"data-tsd-source": "/src/routes/dashboard.tsx:459:23",
														children: "hi@astrovaanii.in"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
													width: "16",
													height: "16",
													viewBox: "0 0 24 24",
													fill: "none",
													stroke: "currentColor",
													strokeWidth: "2",
													className: "text-muted-foreground",
													"data-tsd-source": "/src/routes/dashboard.tsx:461:21",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
														points: "9 18 15 12 9 6",
														"data-tsd-source": "/src/routes/dashboard.tsx:462:23"
													})
												})
											]
										})
									]
								})]
							})]
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { DashboardPage as component };
