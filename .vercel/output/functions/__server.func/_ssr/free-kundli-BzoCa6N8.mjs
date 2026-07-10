import { o as __toESM } from "../_runtime.mjs";
import { t as astrovaanii_logo_default } from "./astrovaanii-logo-BIjzg6F9.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as getChart } from "./chart-server-BTD1lk8f.mjs";
import { t as faqs } from "./free-kundli-CIysZriF.mjs";
import { t as Reveal } from "./Reveal-CznoT_Wi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/free-kundli-BzoCa6N8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SIGN_GLYPHS = {
	Aries: "♈",
	Taurus: "♉",
	Gemini: "♊",
	Cancer: "♋",
	Leo: "♌",
	Virgo: "♍",
	Libra: "♎",
	Scorpio: "♏",
	Sagittarius: "♐",
	Capricorn: "♑",
	Aquarius: "♒",
	Pisces: "♓"
};
var PLANET_SYMBOLS = {
	Sun: "☉",
	Moon: "☽",
	Mars: "♂",
	Mercury: "☿",
	Jupiter: "♃",
	Venus: "♀",
	Saturn: "♄",
	Rahu: "☊",
	Ketu: "☋"
};
var PLANET_COLORS = {
	Sun: "text-amber-600",
	Moon: "text-slate-400",
	Mars: "text-red-500",
	Mercury: "text-green-600",
	Jupiter: "text-amber-500",
	Venus: "text-pink-400",
	Saturn: "text-indigo-500",
	Rahu: "text-purple-500",
	Ketu: "text-purple-400"
};
function FreeKundliPage() {
	const [step, setStep] = (0, import_react.useState)("form");
	const [name, setName] = (0, import_react.useState)("");
	const [dob, setDob] = (0, import_react.useState)("");
	const [time, setTime] = (0, import_react.useState)("");
	const [location, setLocation] = (0, import_react.useState)("");
	const [latitude, setLatitude] = (0, import_react.useState)(null);
	const [longitude, setLongitude] = (0, import_react.useState)(null);
	const [timezoneOffset, setTimezoneOffset] = (0, import_react.useState)();
	const [gender, setGender] = (0, import_react.useState)("");
	const [locationSuggestions, setLocationSuggestions] = (0, import_react.useState)([]);
	const [showSuggestions, setShowSuggestions] = (0, import_react.useState)(false);
	const [chart, setChart] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const resultRef = (0, import_react.useRef)(null);
	const fetchLocationSuggestions = async (query) => {
		if (!query.trim()) {
			setLocationSuggestions([]);
			setShowSuggestions(false);
			return;
		}
		try {
			const data = await (await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=e6856ce2163d420dbae7d5adb0a104ec&limit=5`)).json();
			if (data.results && data.results.length > 0) {
				setLocationSuggestions(data.results);
				setShowSuggestions(true);
			} else {
				setLocationSuggestions([]);
				setShowSuggestions(false);
			}
		} catch {
			setLocationSuggestions([]);
			setShowSuggestions(false);
		}
	};
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => fetchLocationSuggestions(location), 300);
		return () => clearTimeout(timer);
	}, [location]);
	const selectSuggestion = (s) => {
		setLocation(s.formatted);
		setLatitude(s.geometry.lat);
		setLongitude(s.geometry.lng);
		const tz = s.annotations?.timezone?.offset_sec;
		setTimezoneOffset(tz != null ? tz / 3600 : void 0);
		setShowSuggestions(false);
		setLocationSuggestions([]);
	};
	const handleLocationBlur = async () => {
		setTimeout(() => setShowSuggestions(false), 200);
		if (location && latitude === null) try {
			const data = await (await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=e6856ce2163d420dbae7d5adb0a104ec&limit=1`)).json();
			if (data.results && data.results.length > 0) {
				const { lat, lng } = data.results[0].geometry;
				const tz = data.results[0].annotations?.timezone?.offset_sec;
				setLatitude(lat);
				setLongitude(lng);
				setTimezoneOffset(tz != null ? tz / 3600 : void 0);
			}
		} catch {}
	};
	const handleGenerate = async () => {
		if (!name || !dob || !time || !location || !gender) {
			setError("Please fill in all fields.");
			return;
		}
		if (latitude === null || longitude === null) {
			setError("Please select a valid location from the suggestions.");
			return;
		}
		setError("");
		setStep("loading");
		const [y, m, d] = dob.split("-").map(Number);
		const [h, min] = time.split(":").map(Number);
		const result = await getChart({ data: {
			year: y,
			month: m,
			day: d,
			hour: h || 12,
			minute: min || 0,
			latitude,
			longitude,
			timezoneOffset
		} });
		if (result.success) {
			setChart(result.chart);
			setStep("result");
			setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
		} else {
			setError("Failed to generate chart. Please try again.");
			setStep("form");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative min-h-screen bg-background grain",
		"data-tsd-source": "/src/routes/free-kundli.tsx:147:10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "orb h-[420px] w-[420px] bg-[color:var(--gold)] -left-32 -top-24",
				"data-tsd-source": "/src/routes/free-kundli.tsx:148:7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "orb h-[360px] w-[360px] bg-[color:var(--clay)] -right-24 bottom-0 opacity-40",
				"data-tsd-source": "/src/routes/free-kundli.tsx:149:7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative z-10 mx-auto flex h-16 max-w-6xl items-center justify-between px-6",
				"data-tsd-source": "/src/routes/free-kundli.tsx:151:7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "/",
					className: "flex items-center gap-2",
					"data-tsd-source": "/src/routes/free-kundli.tsx:152:9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: astrovaanii_logo_default,
						alt: "",
						width: 32,
						height: 32,
						className: "h-8 w-8",
						"data-tsd-source": "/src/routes/free-kundli.tsx:153:11"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-display text-lg",
						"data-tsd-source": "/src/routes/free-kundli.tsx:154:11",
						children: ["Astro", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							"data-tsd-source": "/src/routes/free-kundli.tsx:154:55",
							children: "Vaanii"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/signup",
					className: "rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90",
					"data-tsd-source": "/src/routes/free-kundli.tsx:156:9",
					children: "Try Free AI - Astrologer"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative z-10 mx-auto max-w-4xl px-6 py-12",
				"data-tsd-source": "/src/routes/free-kundli.tsx:159:7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						"data-tsd-source": "/src/routes/free-kundli.tsx:160:9",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center",
							"data-tsd-source": "/src/routes/free-kundli.tsx:161:11",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "font-display text-4xl md:text-5xl text-foreground",
								"data-tsd-source": "/src/routes/free-kundli.tsx:162:13",
								children: [
									"Free Kundli Generator",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", { "data-tsd-source": "/src/routes/free-kundli.tsx:163:36" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary",
										"data-tsd-source": "/src/routes/free-kundli.tsx:164:15",
										children: "by Date of Birth and Time"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-lg text-muted-foreground max-w-2xl mx-auto",
								"data-tsd-source": "/src/routes/free-kundli.tsx:166:13",
								children: "Create Your Accurate Vedic Kundli Online in Seconds"
							})]
						})
					}),
					step === "form" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: 100,
						"data-tsd-source": "/src/routes/free-kundli.tsx:172:29",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 rounded-3xl border border-border bg-card/80 shadow-xl backdrop-blur-md p-8 max-w-lg mx-auto",
							"data-tsd-source": "/src/routes/free-kundli.tsx:173:13",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-5",
								"data-tsd-source": "/src/routes/free-kundli.tsx:174:15",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-tsd-source": "/src/routes/free-kundli.tsx:175:17",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-sm font-medium text-foreground mb-1.5",
											"data-tsd-source": "/src/routes/free-kundli.tsx:176:19",
											children: "Your Name"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											value: name,
											onChange: (e) => setName(e.target.value),
											placeholder: "Enter your name",
											className: "w-full rounded-full border border-border bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary/60",
											"data-tsd-source": "/src/routes/free-kundli.tsx:177:19"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-tsd-source": "/src/routes/free-kundli.tsx:180:17",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-sm font-medium text-foreground mb-1.5",
											"data-tsd-source": "/src/routes/free-kundli.tsx:181:19",
											children: "Date of Birth"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "date",
											value: dob,
											max: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
											onChange: (e) => setDob(e.target.value),
											className: "w-full rounded-full border border-border bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary/60",
											"data-tsd-source": "/src/routes/free-kundli.tsx:182:19"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-tsd-source": "/src/routes/free-kundli.tsx:185:17",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-sm font-medium text-foreground mb-1.5",
											"data-tsd-source": "/src/routes/free-kundli.tsx:186:19",
											children: "Time of Birth"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "time",
											value: time,
											onChange: (e) => setTime(e.target.value),
											className: "w-full rounded-full border border-border bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary/60",
											"data-tsd-source": "/src/routes/free-kundli.tsx:187:19"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										"data-tsd-source": "/src/routes/free-kundli.tsx:190:17",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block text-sm font-medium text-foreground mb-1.5",
												"data-tsd-source": "/src/routes/free-kundli.tsx:191:19",
												children: "Birthplace"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: location,
												onChange: (e) => {
													setLocation(e.target.value);
													setLatitude(null);
													setLongitude(null);
													setTimezoneOffset(void 0);
												},
												onFocus: () => location && setShowSuggestions(true),
												onBlur: handleLocationBlur,
												placeholder: "Enter your city or place of birth",
												className: "w-full rounded-full border border-border bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary/60",
												"data-tsd-source": "/src/routes/free-kundli.tsx:192:19"
											}),
											showSuggestions && locationSuggestions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "absolute bottom-full left-0 right-0 mb-2 rounded-2xl border border-border bg-card shadow-xl max-h-60 overflow-y-auto z-20",
												"data-tsd-source": "/src/routes/free-kundli.tsx:198:73",
												children: locationSuggestions.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													onMouseDown: () => selectSuggestion(s),
													className: "w-full px-4 py-3 text-left text-sm hover:bg-background/50 transition-colors border-b border-border last:border-b-0",
													"data-tsd-source": "/src/routes/free-kundli.tsx:199:58",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "font-medium text-foreground",
														"data-tsd-source": "/src/routes/free-kundli.tsx:200:27",
														children: s.formatted
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-xs text-muted-foreground mt-1",
														"data-tsd-source": "/src/routes/free-kundli.tsx:201:27",
														children: [
															s.geometry.lat.toFixed(4),
															"°, ",
															s.geometry.lng.toFixed(4),
															"°"
														]
													})]
												}, i))
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										"data-tsd-source": "/src/routes/free-kundli.tsx:208:17",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-sm font-medium text-foreground mb-1.5",
											"data-tsd-source": "/src/routes/free-kundli.tsx:209:19",
											children: "Gender"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid grid-cols-3 gap-2",
											"data-tsd-source": "/src/routes/free-kundli.tsx:210:19",
											children: [
												"Male",
												"Female",
												"Other"
											].map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setGender(g),
												className: `rounded-full border px-4 py-3 text-sm font-medium transition-colors ${gender === g ? "bg-primary text-primary-foreground border-primary" : "border-border bg-background/70 hover:bg-card hover:border-primary/60"}`,
												"data-tsd-source": "/src/routes/free-kundli.tsx:211:59",
												children: g
											}, g))
										})]
									}),
									error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-red-500",
										"data-tsd-source": "/src/routes/free-kundli.tsx:217:27",
										children: error
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: handleGenerate,
										className: "w-full rounded-full bg-primary py-3.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90",
										"data-tsd-source": "/src/routes/free-kundli.tsx:219:17",
										children: "Generate Your Kundli"
									})
								]
							})
						})
					}),
					step === "loading" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center justify-center py-20",
						"data-tsd-source": "/src/routes/free-kundli.tsx:226:32",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-12 w-12 animate-spin rounded-full border-4 border-primary/30 border-t-primary",
							"data-tsd-source": "/src/routes/free-kundli.tsx:227:13"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-muted-foreground",
							"data-tsd-source": "/src/routes/free-kundli.tsx:228:13",
							children: "Calculating your birth chart using Swiss Ephemeris..."
						})]
					}),
					step === "result" && chart && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						ref: resultRef,
						className: "mt-10 space-y-10",
						"data-tsd-source": "/src/routes/free-kundli.tsx:231:40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
								"data-tsd-source": "/src/routes/free-kundli.tsx:232:13",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-3xl border border-border bg-card/80 shadow-xl backdrop-blur-md p-6 md:p-8",
									"data-tsd-source": "/src/routes/free-kundli.tsx:233:15",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
											className: "font-display text-2xl text-primary text-center mb-6",
											"data-tsd-source": "/src/routes/free-kundli.tsx:234:17",
											children: [name, "'s Janam Kundli"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-center text-sm text-muted-foreground mb-8",
											"data-tsd-source": "/src/routes/free-kundli.tsx:237:17",
											children: "Lahiri Ayanamsa · Whole Sign Houses · Swiss Ephemeris"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex justify-center",
											"data-tsd-source": "/src/routes/free-kundli.tsx:241:17",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NorthIndianChart, {
												chart,
												"data-tsd-source": "/src/routes/free-kundli.tsx:242:19"
											})
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
								delay: 80,
								"data-tsd-source": "/src/routes/free-kundli.tsx:247:13",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartSummaryCard, {
									chart,
									userName: name,
									"data-tsd-source": "/src/routes/free-kundli.tsx:248:15"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
								delay: 120,
								"data-tsd-source": "/src/routes/free-kundli.tsx:251:13",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanetPositionsCard, {
									planets: chart.planets,
									"data-tsd-source": "/src/routes/free-kundli.tsx:252:15"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
								delay: 160,
								"data-tsd-source": "/src/routes/free-kundli.tsx:255:13",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseOccupantsCard, {
									occupants: chart.houseOccupants,
									signNames: chart.houseSignNames,
									lords: chart.houseLords,
									"data-tsd-source": "/src/routes/free-kundli.tsx:256:15"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
								delay: 200,
								"data-tsd-source": "/src/routes/free-kundli.tsx:259:13",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashaCard, {
									dasha: chart.vimshottari,
									mahadasha: chart.mahadasha,
									antardasha: chart.antardasha,
									"data-tsd-source": "/src/routes/free-kundli.tsx:260:15"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-center",
								"data-tsd-source": "/src/routes/free-kundli.tsx:263:13",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										setStep("form");
										setChart(null);
										setName("");
										setDob("");
										setTime("");
										setLocation("");
										setGender("");
										setLatitude(null);
										setLongitude(null);
										setTimezoneOffset(void 0);
									},
									className: "rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90",
									"data-tsd-source": "/src/routes/free-kundli.tsx:264:15",
									children: "Generate Another Kundli"
								})
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeoContent, { "data-tsd-source": "/src/routes/free-kundli.tsx:282:7" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border bg-card/40 py-12 mt-20",
				"data-tsd-source": "/src/routes/free-kundli.tsx:284:7",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col gap-6 px-6 text-center text-sm text-muted-foreground",
					"data-tsd-source": "/src/routes/free-kundli.tsx:285:9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-center gap-2",
						"data-tsd-source": "/src/routes/free-kundli.tsx:286:11",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: astrovaanii_logo_default,
							alt: "",
							width: 24,
							height: 24,
							className: "h-6 w-6",
							"data-tsd-source": "/src/routes/free-kundli.tsx:287:13"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg",
							"data-tsd-source": "/src/routes/free-kundli.tsx:288:13",
							children: "AstroVaanii"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						"data-tsd-source": "/src/routes/free-kundli.tsx:290:11",
						children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" AstroVaanii. All rights reserved."
						]
					})]
				})
			})
		]
	});
}
function NorthIndianChart({ chart }) {
	const planetsInHouse = (h) => {
		const list = [];
		for (const [name, pd] of Object.entries(chart.planets)) if (pd.house === h) list.push(name);
		return list;
	};
	const houseLabelPos = {
		1: {
			x: 50,
			y: 23
		},
		2: {
			x: 25,
			y: 8
		},
		12: {
			x: 75,
			y: 8
		},
		3: {
			x: 8,
			y: 25
		},
		11: {
			x: 92,
			y: 25
		},
		4: {
			x: 22,
			y: 50
		},
		10: {
			x: 78,
			y: 50
		},
		5: {
			x: 8,
			y: 75
		},
		9: {
			x: 92,
			y: 75
		},
		6: {
			x: 25,
			y: 92
		},
		8: {
			x: 75,
			y: 92
		},
		7: {
			x: 50,
			y: 77
		}
	};
	const renderHouseContent = (houseNum) => {
		const signName = chart.houseSignNames[houseNum];
		const glyph = SIGN_GLYPHS[signName] || "";
		const planets = planetsInHouse(houseNum);
		const pos = houseLabelPos[houseNum];
		const isKendra = [
			1,
			4,
			7,
			10
		].includes(houseNum);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute flex flex-col items-center justify-center text-center pointer-events-none",
			style: {
				left: `${pos.x}%`,
				top: `${pos.y}%`,
				transform: "translate(-50%, -50%)",
				width: isKendra ? "26%" : "20%"
			},
			"data-tsd-source": "/src/routes/free-kundli.tsx:366:12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `flex items-center gap-1 ${houseNum === 1 ? "text-primary" : "text-foreground"}`,
					"data-tsd-source": "/src/routes/free-kundli.tsx:372:9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs md:text-sm leading-none",
						"data-tsd-source": "/src/routes/free-kundli.tsx:373:11",
						children: glyph
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[9px] md:text-[11px] font-medium leading-none",
						"data-tsd-source": "/src/routes/free-kundli.tsx:374:11",
						children: signName
					})]
				}),
				planets.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 flex flex-wrap justify-center gap-x-1 gap-y-0.5",
					"data-tsd-source": "/src/routes/free-kundli.tsx:376:32",
					children: planets.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `text-[10px] md:text-xs font-semibold ${PLANET_COLORS[p] || ""}`,
						title: p,
						"data-tsd-source": "/src/routes/free-kundli.tsx:377:31",
						children: PLANET_SYMBOLS[p] || p.substring(0, 2)
					}, p))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-[8px] text-muted-foreground/50 leading-none mt-0.5",
					"data-tsd-source": "/src/routes/free-kundli.tsx:381:9",
					children: ["H", houseNum]
				})
			]
		}, houseNum);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative mx-auto w-full max-w-[420px] aspect-square",
		"data-tsd-source": "/src/routes/free-kundli.tsx:386:10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 400 400",
			className: "absolute inset-0 h-full w-full",
			"data-tsd-source": "/src/routes/free-kundli.tsx:387:7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "1",
					y: "1",
					width: "398",
					height: "398",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "2",
					className: "text-border",
					"data-tsd-source": "/src/routes/free-kundli.tsx:388:9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					points: "200,0 300,100 200,200 100,100",
					fill: "currentColor",
					className: "text-primary/10",
					"data-tsd-source": "/src/routes/free-kundli.tsx:389:9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "0",
					y1: "0",
					x2: "400",
					y2: "400",
					stroke: "currentColor",
					strokeWidth: "1.5",
					className: "text-border",
					"data-tsd-source": "/src/routes/free-kundli.tsx:390:9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "400",
					y1: "0",
					x2: "0",
					y2: "400",
					stroke: "currentColor",
					strokeWidth: "1.5",
					className: "text-border",
					"data-tsd-source": "/src/routes/free-kundli.tsx:391:9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "200",
					y1: "0",
					x2: "400",
					y2: "200",
					stroke: "currentColor",
					strokeWidth: "1.5",
					className: "text-border",
					"data-tsd-source": "/src/routes/free-kundli.tsx:392:9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "400",
					y1: "200",
					x2: "200",
					y2: "400",
					stroke: "currentColor",
					strokeWidth: "1.5",
					className: "text-border",
					"data-tsd-source": "/src/routes/free-kundli.tsx:393:9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "200",
					y1: "400",
					x2: "0",
					y2: "200",
					stroke: "currentColor",
					strokeWidth: "1.5",
					className: "text-border",
					"data-tsd-source": "/src/routes/free-kundli.tsx:394:9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "0",
					y1: "200",
					x2: "200",
					y2: "0",
					stroke: "currentColor",
					strokeWidth: "1.5",
					className: "text-border",
					"data-tsd-source": "/src/routes/free-kundli.tsx:395:9"
				})
			]
		}), [
			1,
			2,
			3,
			4,
			5,
			6,
			7,
			8,
			9,
			10,
			11,
			12
		].map(renderHouseContent)]
	});
}
function ChartSummaryCard({ chart, userName }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl border border-border bg-card/80 backdrop-blur-md p-6 md:p-8",
		"data-tsd-source": "/src/routes/free-kundli.tsx:408:10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl text-primary mb-4",
			"data-tsd-source": "/src/routes/free-kundli.tsx:409:7",
			children: "Chart Summary"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm",
			"data-tsd-source": "/src/routes/free-kundli.tsx:410:7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryRow, {
					label: "Name",
					value: userName,
					"data-tsd-source": "/src/routes/free-kundli.tsx:411:9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryRow, {
					label: "Ascendant (Lagna)",
					value: `${chart.ascendantSignName} ${chart.ascendantDegree.toFixed(2)}°`,
					"data-tsd-source": "/src/routes/free-kundli.tsx:412:9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryRow, {
					label: "Moon Sign",
					value: `${chart.planets["Moon"]?.signName || "-"} ${(chart.planets["Moon"]?.degree || 0).toFixed(2)}°`,
					"data-tsd-source": "/src/routes/free-kundli.tsx:413:9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryRow, {
					label: "Moon Nakshatra",
					value: `${chart.nakshatraName} ${chart.pada} Pada`,
					"data-tsd-source": "/src/routes/free-kundli.tsx:414:9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryRow, {
					label: "Nakshatra Lord",
					value: chart.nakshatraLord,
					"data-tsd-source": "/src/routes/free-kundli.tsx:415:9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryRow, {
					label: "Current Mahadasha",
					value: `${chart.mahadasha.planet} (${chart.mahadasha.start} - ${chart.mahadasha.end})`,
					"data-tsd-source": "/src/routes/free-kundli.tsx:416:9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryRow, {
					label: "Current Antardasha",
					value: `${chart.antardasha.planet} (${chart.antardasha.start} - ${chart.antardasha.end})`,
					"data-tsd-source": "/src/routes/free-kundli.tsx:417:9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryRow, {
					label: "Ayanamsa",
					value: chart.ayanamsa,
					"data-tsd-source": "/src/routes/free-kundli.tsx:418:9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryRow, {
					label: "House System",
					value: chart.houseSystem,
					"data-tsd-source": "/src/routes/free-kundli.tsx:419:9"
				})
			]
		})]
	});
}
function SummaryRow({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border/60 bg-background/50 p-3",
		"data-tsd-source": "/src/routes/free-kundli.tsx:430:10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs text-muted-foreground mb-1",
			"data-tsd-source": "/src/routes/free-kundli.tsx:431:7",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "font-medium text-foreground",
			"data-tsd-source": "/src/routes/free-kundli.tsx:432:7",
			children: value
		})]
	});
}
function PlanetPositionsCard({ planets }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl border border-border bg-card/80 backdrop-blur-md p-6 md:p-8",
		"data-tsd-source": "/src/routes/free-kundli.tsx:440:10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl text-primary mb-4",
			"data-tsd-source": "/src/routes/free-kundli.tsx:441:7",
			children: "Planet Positions"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			"data-tsd-source": "/src/routes/free-kundli.tsx:442:7",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				"data-tsd-source": "/src/routes/free-kundli.tsx:443:9",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					"data-tsd-source": "/src/routes/free-kundli.tsx:444:11",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border/60",
						"data-tsd-source": "/src/routes/free-kundli.tsx:445:13",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-left py-2 px-3 text-muted-foreground font-medium",
								"data-tsd-source": "/src/routes/free-kundli.tsx:446:15",
								children: "Planet"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-left py-2 px-3 text-muted-foreground font-medium",
								"data-tsd-source": "/src/routes/free-kundli.tsx:447:15",
								children: "Sign"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-left py-2 px-3 text-muted-foreground font-medium",
								"data-tsd-source": "/src/routes/free-kundli.tsx:448:15",
								children: "Degree"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-left py-2 px-3 text-muted-foreground font-medium",
								"data-tsd-source": "/src/routes/free-kundli.tsx:449:15",
								children: "House"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-left py-2 px-3 text-muted-foreground font-medium",
								"data-tsd-source": "/src/routes/free-kundli.tsx:450:15",
								children: "Nakshatra"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-left py-2 px-3 text-muted-foreground font-medium",
								"data-tsd-source": "/src/routes/free-kundli.tsx:451:15",
								children: "Pada"
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
					"data-tsd-source": "/src/routes/free-kundli.tsx:454:11",
					children: Object.entries(planets).map(([name, p], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: i % 2 === 0 ? "bg-background/30" : "",
						"data-tsd-source": "/src/routes/free-kundli.tsx:455:60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 px-3 font-medium",
								"data-tsd-source": "/src/routes/free-kundli.tsx:456:17",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: PLANET_COLORS[name] || "",
									"data-tsd-source": "/src/routes/free-kundli.tsx:457:19",
									children: [
										PLANET_SYMBOLS[name] || "",
										" ",
										name
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-2 px-3",
								"data-tsd-source": "/src/routes/free-kundli.tsx:461:17",
								children: [
									p.signName,
									" ",
									SIGN_GLYPHS[p.signName] || ""
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "py-2 px-3",
								"data-tsd-source": "/src/routes/free-kundli.tsx:462:17",
								children: [p.degree.toFixed(2), "°"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 px-3",
								"data-tsd-source": "/src/routes/free-kundli.tsx:463:17",
								children: p.house
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 px-3",
								"data-tsd-source": "/src/routes/free-kundli.tsx:464:17",
								children: p.nakshatraName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2 px-3",
								"data-tsd-source": "/src/routes/free-kundli.tsx:465:17",
								children: p.pada
							})
						]
					}, name))
				})]
			})
		})]
	});
}
function HouseOccupantsCard({ occupants, signNames, lords }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl border border-border bg-card/80 backdrop-blur-md p-6 md:p-8",
		"data-tsd-source": "/src/routes/free-kundli.tsx:481:10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl text-primary mb-4",
			"data-tsd-source": "/src/routes/free-kundli.tsx:482:7",
			children: "House Details"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-sm",
			"data-tsd-source": "/src/routes/free-kundli.tsx:483:7",
			children: Array.from({ length: 12 }, (_, i) => i + 1).map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border/60 bg-background/50 p-3",
				"data-tsd-source": "/src/routes/free-kundli.tsx:486:36",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-medium text-foreground",
						"data-tsd-source": "/src/routes/free-kundli.tsx:487:13",
						children: [
							"House ",
							h,
							" ",
							SIGN_GLYPHS[signNames[h]] || ""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-muted-foreground",
						"data-tsd-source": "/src/routes/free-kundli.tsx:490:13",
						children: [
							signNames[h],
							" · Lord ",
							lords[h]
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1.5 text-xs",
						"data-tsd-source": "/src/routes/free-kundli.tsx:491:13",
						children: occupants[h]?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex flex-wrap gap-1",
							"data-tsd-source": "/src/routes/free-kundli.tsx:492:39",
							children: occupants[h].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `${PLANET_COLORS[p] || ""}`,
								"data-tsd-source": "/src/routes/free-kundli.tsx:493:42",
								children: [
									PLANET_SYMBOLS[p] || "",
									" ",
									p
								]
							}, p))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground/50",
							"data-tsd-source": "/src/routes/free-kundli.tsx:496:27",
							children: "—"
						})
					})
				]
			}, h))
		})]
	});
}
function DashaCard({ dasha, mahadasha, antardasha }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl border border-border bg-card/80 backdrop-blur-md p-6 md:p-8",
		"data-tsd-source": "/src/routes/free-kundli.tsx:525:10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl text-primary mb-4",
				"data-tsd-source": "/src/routes/free-kundli.tsx:526:7",
				children: "Vimshottari Dasha"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6",
				"data-tsd-source": "/src/routes/free-kundli.tsx:528:7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border/60 bg-background/50 p-4",
					"data-tsd-source": "/src/routes/free-kundli.tsx:529:9",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground mb-1",
							"data-tsd-source": "/src/routes/free-kundli.tsx:530:11",
							children: "Current Mahadasha"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-lg text-primary",
							"data-tsd-source": "/src/routes/free-kundli.tsx:531:11",
							children: mahadasha.planet
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground mt-1",
							"data-tsd-source": "/src/routes/free-kundli.tsx:532:11",
							children: [
								mahadasha.start,
								" - ",
								mahadasha.end
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border/60 bg-background/50 p-4",
					"data-tsd-source": "/src/routes/free-kundli.tsx:534:9",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground mb-1",
							"data-tsd-source": "/src/routes/free-kundli.tsx:535:11",
							children: "Current Antardasha"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-lg text-primary",
							"data-tsd-source": "/src/routes/free-kundli.tsx:536:11",
							children: antardasha.planet
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground mt-1",
							"data-tsd-source": "/src/routes/free-kundli.tsx:537:11",
							children: [
								antardasha.start,
								" - ",
								antardasha.end
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				"data-tsd-source": "/src/routes/free-kundli.tsx:541:7",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					"data-tsd-source": "/src/routes/free-kundli.tsx:542:9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						"data-tsd-source": "/src/routes/free-kundli.tsx:543:11",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border/60",
							"data-tsd-source": "/src/routes/free-kundli.tsx:544:13",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-2 px-3 text-muted-foreground font-medium",
									"data-tsd-source": "/src/routes/free-kundli.tsx:545:15",
									children: "Planet"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-2 px-3 text-muted-foreground font-medium",
									"data-tsd-source": "/src/routes/free-kundli.tsx:546:15",
									children: "Years"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-2 px-3 text-muted-foreground font-medium",
									"data-tsd-source": "/src/routes/free-kundli.tsx:547:15",
									children: "Start"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left py-2 px-3 text-muted-foreground font-medium",
									"data-tsd-source": "/src/routes/free-kundli.tsx:548:15",
									children: "End"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						"data-tsd-source": "/src/routes/free-kundli.tsx:551:11",
						children: dasha.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: i % 2 === 0 ? "bg-background/30" : "",
							"data-tsd-source": "/src/routes/free-kundli.tsx:552:34",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 px-3 font-medium",
									"data-tsd-source": "/src/routes/free-kundli.tsx:553:17",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: PLANET_COLORS[d.planet] || "",
										"data-tsd-source": "/src/routes/free-kundli.tsx:554:19",
										children: [
											PLANET_SYMBOLS[d.planet] || "",
											" ",
											d.planet
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 px-3",
									"data-tsd-source": "/src/routes/free-kundli.tsx:556:17",
									children: d.years.toFixed(2)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 px-3",
									"data-tsd-source": "/src/routes/free-kundli.tsx:557:17",
									children: d.start
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-2 px-3",
									"data-tsd-source": "/src/routes/free-kundli.tsx:558:17",
									children: d.end
								})
							]
						}, i))
					})]
				})
			})
		]
	});
}
var seoContent = [
	{
		title: "What Is a Kundli?",
		content: "A Kundli, also known as Janam Kundli or Birth Chart, is a horoscope prepared according to the exact date, time, and place of birth. At the moment you are born, every planet occupies a unique position in the sky. These planetary positions are recorded inside the Kundli. Vedic astrology studies these placements to understand different areas of your life. Your Kundli contains twelve houses, twelve zodiac signs, and nine major planets. Every house represents a different part of life. Some houses are connected with career, while others represent marriage, family, education, wealth, spirituality, health, and relationships. Since every person's birth details are different, every Kundli is unique."
	},
	{
		title: "Why Date of Birth and Birth Time Matter",
		content: "Many people think that entering only their date of birth is enough. While the date is important, your birth time plays an equally important role. The Ascendant, also called Lagna, changes approximately every two hours. A small difference in birth time can completely change your rising sign, house placements, planetary strengths, and future predictions. Birth place is also important because planetary calculations depend on your geographical location and local time zone. Providing accurate birth details allows the Kundli to be calculated correctly. The more accurate your birth information is, the more reliable your horoscope becomes."
	},
	{
		title: "How Our Free Kundli Generator Works",
		content: "Our tool follows the traditional principles of Vedic astrology while making the entire process simple for everyone. You only need to enter a few details: your name, date of birth, exact birth time, and birthplace. After submitting these details, the calculator determines the planetary positions for your birth moment and prepares your Janam Kundli instantly. The process takes only a few seconds, and you receive a complete birth chart that can be used for further horoscope analysis. Everything is done automatically, so you do not need any astrology knowledge to generate your Kundli."
	},
	{
		title: "What Information You Can Find in Your Kundli",
		content: "Your birth chart contains much more than your zodiac sign. The first thing you will notice is your Ascendant or Lagna. This represents your personality, physical appearance, natural behavior, and overall life direction. The planetary placements show how different energies influence your life. For example, the Moon reflects your emotions and mental nature. The Sun represents confidence and leadership. Jupiter is connected with wisdom, growth, education, and good fortune. Venus influences relationships, beauty, and creativity. Saturn teaches responsibility, patience, and discipline. Each planet affects different houses depending on its placement. The twelve houses together reveal important areas of life such as education, career, marriage, children, wealth, health, travel, property, spirituality, and long term goals."
	},
	{
		title: "Benefits of Using an Online Kundli Generator",
		content: "Creating your Kundli online saves both time and effort. You no longer need to perform complex calculations manually or understand astronomical mathematics. Our free tool gives you instant access to your birth chart from anywhere in the world. It is available throughout the day, works on mobile as well as desktop devices, and provides results within seconds. Many people generate their Kundli before making important life decisions such as choosing a career, planning higher education, starting a business, buying property, or considering marriage. An online Kundli also makes it easier to revisit your horoscope whenever you want without carrying printed charts or documents."
	},
	{
		title: "Is an Online Kundli Accurate?",
		content: "This is one of the most common questions people ask. The answer depends on the quality of the calculations and the accuracy of the birth details you provide. Our Kundli generator performs astronomical calculations based on traditional Vedic astrology methods. When your birth date, birth time, and birthplace are entered correctly, the generated Kundli accurately represents the planetary positions at your birth. It is important to understand that the Kundli itself is a calculation. Predictions come from interpreting those calculations. For this reason, accurate planetary positions always form the foundation of reliable horoscope analysis."
	},
	{
		title: "Who Can Use This Kundli Generator?",
		content: "This tool is suitable for everyone. Students often use it to understand education and career possibilities. Working professionals use it to learn about career growth and future opportunities. Business owners explore financial trends and long term planning. People planning marriage frequently generate their Kundli before horoscope matching. Parents also create Kundlis for their children to understand personality traits and future guidance. Even if you are simply curious about astrology, generating your Janam Kundli is an excellent first step toward understanding how Vedic astrology works."
	},
	{
		title: "How to Read Your Kundli",
		content: "Generating your Kundli is only the beginning. The next step is understanding what the chart says about you. The first thing to check is your Lagna or Ascendant. This is the foundation of your birth chart because it influences every house and many life events. Your Lagna reflects your personality, confidence, approach to life, and the way others see you. After that, look at the position of the Moon. In Vedic astrology, the Moon is considered one of the most important planets because it represents your mind, emotions, habits, and inner nature. A strong Moon often indicates emotional stability, while a weaker Moon may suggest that managing emotions requires extra attention."
	},
	{
		title: "Understanding the Twelve Houses",
		content: "Every Kundli contains twelve houses, and each house governs a different area of life. The first house represents personality, appearance, health, and overall life direction. The second house is connected with family, speech, savings, and wealth. The third house relates to courage, communication, younger siblings, and skills. The fourth house represents home, mother, comfort, happiness, and property. The fifth house is associated with education, creativity, intelligence, romance, and children. The sixth house relates to work, competition, health, and daily responsibilities. The seventh house focuses on marriage, partnerships, and business relationships. The eighth house represents transformation, hidden matters, inheritance, and research. The ninth house is connected with luck, higher education, spirituality, teachers, and long distance travel. The tenth house represents career, profession, achievements, and public reputation. The eleventh house governs income, friendships, social circles, and future goals. The twelfth house relates to expenses, foreign travel, spiritual growth, meditation, and inner peace."
	},
	{
		title: "How a Kundli Helps in Daily Life",
		content: "Many people think astrology is only about predicting the future, but a Kundli is much more than that. It helps you understand your natural strengths and areas where you may need improvement. Instead of making decisions based only on emotions, you gain another perspective about your life. Students often use their Kundli to understand learning patterns and career possibilities. Professionals use it to understand job changes, promotions, and business opportunities. Couples use it before marriage to understand compatibility and long term relationships. A Kundli should not replace your own decisions. It should be used as a guide that helps you understand yourself better."
	},
	{
		title: "Common Mistakes While Creating a Kundli",
		content: "The biggest mistake people make is entering an incorrect birth time. Even a difference of a few minutes can change the Ascendant and house placements. This may affect the overall interpretation of the birth chart. Another common mistake is selecting the wrong birthplace. Since planetary calculations depend on geographical location, always choose the correct city where you were born. Some people accidentally enter their current location instead of their birth location. Always remember that a Kundli is created using your birthplace, not where you live today. Before generating your horoscope, carefully check every detail to make sure your birth date, birth time, and birthplace are correct."
	},
	{
		title: "Why Choose Our Free Kundli Generator",
		content: "Our goal is to make Vedic astrology simple and accessible for everyone. The tool is designed to generate your Kundli quickly without requiring any technical knowledge. You do not need to understand astrology before using it. The interface is easy to use on both mobile phones and desktop devices. Your birth chart is generated within seconds after entering your details. Whether you are creating your first Kundli or checking your horoscope again after many years, the process remains simple and convenient. If you want to explore astrology further, your Kundli becomes the starting point for understanding planetary periods, personality, relationships, career, marriage, health, and many other aspects of life."
	}
];
function SeoContent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative z-10 mx-auto max-w-4xl px-6 py-16 space-y-12",
		"data-tsd-source": "/src/routes/free-kundli.tsx:603:10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-10",
			"data-tsd-source": "/src/routes/free-kundli.tsx:604:7",
			children: seoContent.map((section, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: i * 40,
				"data-tsd-source": "/src/routes/free-kundli.tsx:605:41",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					"data-tsd-source": "/src/routes/free-kundli.tsx:606:13",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-primary mb-3",
						"data-tsd-source": "/src/routes/free-kundli.tsx:607:15",
						children: section.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground leading-relaxed",
						"data-tsd-source": "/src/routes/free-kundli.tsx:608:15",
						children: section.content
					})]
				})
			}, i))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
			"data-tsd-source": "/src/routes/free-kundli.tsx:613:7",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-border bg-card/80 backdrop-blur-md p-6 md:p-8 mt-12",
				"data-tsd-source": "/src/routes/free-kundli.tsx:614:9",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl text-primary mb-6",
					"data-tsd-source": "/src/routes/free-kundli.tsx:615:11",
					children: "Frequently Asked Questions"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					"data-tsd-source": "/src/routes/free-kundli.tsx:616:11",
					children: faqs.map((faq, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
						className: "group rounded-2xl border border-border/60 bg-background/50 p-4 open:shadow-sm",
						"data-tsd-source": "/src/routes/free-kundli.tsx:617:35",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
							className: "cursor-pointer font-medium text-foreground list-none flex items-center justify-between",
							"data-tsd-source": "/src/routes/free-kundli.tsx:618:17",
							children: [faq.q, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary transition-transform group-open:rotate-45",
								"data-tsd-source": "/src/routes/free-kundli.tsx:620:19",
								children: "+"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground leading-relaxed",
							"data-tsd-source": "/src/routes/free-kundli.tsx:622:17",
							children: faq.a
						})]
					}, i))
				})]
			})
		})]
	});
}
//#endregion
export { FreeKundliPage as component };
