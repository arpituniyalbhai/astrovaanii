import { o as __toESM } from "../_runtime.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as createUserDoc, t as auth } from "./firebase-JHzvw2gu.mjs";
import { t as vaanii_persona_default } from "./vaanii-persona-CbI512xY.mjs";
import { t as startalks_icon_default } from "./startalks-icon-Ch-3XBzc.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as getChart } from "./chart-server-BTD1lk8f.mjs";
import { t as Reveal } from "./Reveal-CznoT_Wi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-DqRsFawc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OnboardingPage() {
	const navigate = useNavigate();
	const [currentStep, setCurrentStep] = (0, import_react.useState)("name");
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [userData, setUserData] = (0, import_react.useState)({
		name: "",
		dob: "",
		timeOfBirth: "",
		location: "",
		latitude: null,
		longitude: null,
		gender: ""
	});
	const [inputValue, setInputValue] = (0, import_react.useState)("");
	const [isTyping, setIsTyping] = (0, import_react.useState)(false);
	const [showDatePicker, setShowDatePicker] = (0, import_react.useState)(false);
	const [selectedDate, setSelectedDate] = (0, import_react.useState)("");
	const [showTimePicker, setShowTimePicker] = (0, import_react.useState)(false);
	const [selectedTime, setSelectedTime] = (0, import_react.useState)("");
	const [locationSuggestions, setLocationSuggestions] = (0, import_react.useState)([]);
	const [showSuggestions, setShowSuggestions] = (0, import_react.useState)(false);
	const messagesEndRef = (0, import_react.useRef)(null);
	const hasInitialized = (0, import_react.useRef)(false);
	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};
	(0, import_react.useEffect)(() => {
		scrollToBottom();
	}, [messages, isTyping]);
	(0, import_react.useEffect)(() => {
		if (!(auth.currentUser?.email || JSON.parse(localStorage.getItem("userData") || "{}").email)) {
			navigate({ to: "/signup" });
			return;
		}
	}, [navigate]);
	(0, import_react.useEffect)(() => {
		if (hasInitialized.current) return;
		hasInitialized.current = true;
		setMessages([{
			id: "1",
			type: "bot",
			content: "Namaste! 🙏 I'm Vaanii, your personal AI astrologer. Let's get to know you better to provide accurate readings.",
			timestamp: /* @__PURE__ */ new Date()
		}]);
		setTimeout(() => {
			addBotMessage("First, what should I call you? Please share your name.");
		}, 1500);
	}, []);
	const addBotMessage = (content) => {
		setIsTyping(true);
		setTimeout(() => {
			setIsTyping(false);
			const newMessage = {
				id: Date.now().toString(),
				type: "bot",
				content,
				timestamp: /* @__PURE__ */ new Date()
			};
			setMessages((prev) => [...prev, newMessage]);
		}, 1e3);
	};
	const addUserMessage = (content) => {
		const newMessage = {
			id: Date.now().toString(),
			type: "user",
			content,
			timestamp: /* @__PURE__ */ new Date()
		};
		setMessages((prev) => [...prev, newMessage]);
	};
	const handleNameSubmit = () => {
		if (!inputValue.trim()) return;
		addUserMessage(inputValue);
		setUserData((prev) => ({
			...prev,
			name: inputValue
		}));
		setInputValue("");
		setCurrentStep("dob");
		setTimeout(() => {
			addBotMessage(`Nice to meet you, ${inputValue}! 🌟 Now, I need your exact date of birth to calculate your birth chart.`);
			setTimeout(() => {
				setShowDatePicker(true);
			}, 1500);
		}, 500);
	};
	const handleDobSubmit = (date) => {
		addUserMessage(date);
		setUserData((prev) => ({
			...prev,
			dob: date
		}));
		setShowDatePicker(false);
		setCurrentStep("time");
		setTimeout(() => {
			addBotMessage("Great! What time were you born? This helps me calculate your planetary positions more accurately.");
			setTimeout(() => {
				setShowTimePicker(true);
			}, 1500);
		}, 500);
	};
	const handleTimeSubmit = (time) => {
		addUserMessage(time);
		setUserData((prev) => ({
			...prev,
			timeOfBirth: time
		}));
		setShowTimePicker(false);
		setCurrentStep("location");
		setTimeout(() => {
			addBotMessage("Perfect! Now, where were you born? Please share your city or place of birth.");
		}, 500);
	};
	const handleLocationSubmit = async (selectedLocation) => {
		const location = selectedLocation?.formatted || inputValue;
		if (!location.trim()) return;
		addUserMessage(location);
		setInputValue("");
		setShowSuggestions(false);
		setLocationSuggestions([]);
		setIsTyping(true);
		try {
			const data = await (await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=e6856ce2163d420dbae7d5adb0a104ec&limit=1`)).json();
			if (data.results && data.results.length > 0) {
				const { lat, lng } = data.results[0].geometry;
				const tzOffsetSec = data.results[0].annotations?.timezone?.offset_sec;
				setUserData((prev) => ({
					...prev,
					location,
					latitude: lat,
					longitude: lng,
					timezoneOffset: tzOffsetSec != null ? tzOffsetSec / 3600 : void 0
				}));
				setIsTyping(false);
				addBotMessage(`Got it! ${location} recorded. Now, what's your gender?`);
				setCurrentStep("gender");
			} else {
				setIsTyping(false);
				addBotMessage("I couldn't find that location. Could you please try with a more specific city name?");
				setCurrentStep("location");
			}
		} catch (error) {
			setIsTyping(false);
			addBotMessage("There was an error finding your location. Please try again.");
			setCurrentStep("location");
		}
	};
	const fetchLocationSuggestions = async (query) => {
		if (!query.trim() || currentStep !== "location") {
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
		} catch (error) {
			setLocationSuggestions([]);
			setShowSuggestions(false);
		}
	};
	(0, import_react.useEffect)(() => {
		const debounceTimer = setTimeout(() => {
			if (currentStep === "location") fetchLocationSuggestions(inputValue);
		}, 300);
		return () => clearTimeout(debounceTimer);
	}, [inputValue, currentStep]);
	const handleGenderSubmit = (gender) => {
		addUserMessage(gender);
		setUserData((prev) => ({
			...prev,
			gender
		}));
		setCurrentStep("complete");
		setTimeout(() => {
			addBotMessage("Wonderful! ✨ I have all the information I need. Your birth chart is being prepared...");
			setTimeout(() => {
				addBotMessage("You're all set! Your profile is complete. Let's begin your astrological journey!");
			}, 2e3);
		}, 500);
	};
	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			if (currentStep === "name") handleNameSubmit();
			else if (currentStep === "location") handleLocationSubmit();
		}
	};
	const handleComplete = async () => {
		const email = auth.currentUser?.email || JSON.parse(localStorage.getItem("userData") || "{}").email;
		if (email) try {
			await createUserDoc(email, {
				...userData,
				questionsRemaining: 1,
				createdAt: (/* @__PURE__ */ new Date()).toISOString(),
				updatedAt: (/* @__PURE__ */ new Date()).toISOString()
			});
		} catch (error) {
			console.error("Failed to save user data to Firestore:", error);
		}
		const stored = {
			...userData,
			email,
			questionsRemaining: 1
		};
		localStorage.setItem("userData", JSON.stringify(stored));
		if (userData.latitude != null && userData.longitude != null && userData.dob && userData.timeOfBirth) {
			const [y, m, d] = userData.dob.split("-").map(Number);
			const [h, min] = userData.timeOfBirth.split(":").map(Number);
			const result = await getChart({ data: {
				year: y,
				month: m,
				day: d,
				hour: h || 12,
				minute: min || 0,
				latitude: userData.latitude,
				longitude: userData.longitude,
				timezoneOffset: userData.timezoneOffset
			} });
			if (result.success) {
				const chartData = result.chart;
				const updated = {
					...stored,
					email,
					chart: chartData
				};
				localStorage.setItem("userData", JSON.stringify(updated));
			} else console.error("Chart calculation failed:", result.error);
		}
		navigate({ to: "/dashboard" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative min-h-screen overflow-hidden bg-background grain",
		"data-tsd-source": "/src/routes/onboarding.tsx:288:10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "orb h-[420px] w-[420px] bg-[color:var(--gold)] -left-32 -top-24",
				"data-tsd-source": "/src/routes/onboarding.tsx:289:7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "orb h-[360px] w-[360px] bg-[color:var(--clay)] -right-24 bottom-0 opacity-40",
				"data-tsd-source": "/src/routes/onboarding.tsx:290:7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative z-10 mx-auto flex h-16 max-w-6xl items-center justify-between px-6",
				"data-tsd-source": "/src/routes/onboarding.tsx:292:7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					"data-tsd-source": "/src/routes/onboarding.tsx:293:9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: startalks_icon_default,
						alt: "",
						width: 32,
						height: 32,
						className: "h-8 w-8",
						"data-tsd-source": "/src/routes/onboarding.tsx:294:11"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-display text-lg",
						"data-tsd-source": "/src/routes/onboarding.tsx:295:11",
						children: ["Astro", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							"data-tsd-source": "/src/routes/onboarding.tsx:295:55",
							children: "Vaanii"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					"data-tsd-source": "/src/routes/onboarding.tsx:297:9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-2 w-2 rounded-full bg-[color:var(--sage)] animate-pulse",
						"data-tsd-source": "/src/routes/onboarding.tsx:298:11"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted-foreground",
						"data-tsd-source": "/src/routes/onboarding.tsx:299:11",
						children: "Step 2 of 3"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "relative z-10 mx-auto max-w-2xl px-6 py-10",
				"data-tsd-source": "/src/routes/onboarding.tsx:303:7",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					"data-tsd-source": "/src/routes/onboarding.tsx:304:9",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto w-full rounded-3xl border border-border bg-card/80 shadow-xl backdrop-blur-md overflow-hidden",
						"data-tsd-source": "/src/routes/onboarding.tsx:305:11",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4 border-b border-border bg-gradient-to-r from-[color:var(--gold)]/10 via-card to-[color:var(--clay)]/10 px-6 py-4",
								"data-tsd-source": "/src/routes/onboarding.tsx:307:13",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									"data-tsd-source": "/src/routes/onboarding.tsx:308:15",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute inset-0 -m-1 rounded-full bg-primary/25 blur-md",
											"data-tsd-source": "/src/routes/onboarding.tsx:309:17"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: vaanii_persona_default,
											alt: "Vaanii, AI astrologer",
											className: "relative h-12 w-12 rounded-full border-2 border-background object-cover shadow-lg",
											"data-tsd-source": "/src/routes/onboarding.tsx:310:17"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-card bg-[color:var(--sage)]",
											"data-tsd-source": "/src/routes/onboarding.tsx:311:17",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "h-1.5 w-1.5 rounded-full bg-white",
												"data-tsd-source": "/src/routes/onboarding.tsx:312:19"
											})
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									"data-tsd-source": "/src/routes/onboarding.tsx:315:15",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-display text-lg text-primary",
										"data-tsd-source": "/src/routes/onboarding.tsx:316:17",
										children: "Vaanii AI"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground",
										"data-tsd-source": "/src/routes/onboarding.tsx:317:17",
										children: "Online · Personalizing your experience"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "h-[500px] overflow-y-auto p-6 space-y-4",
								"data-tsd-source": "/src/routes/onboarding.tsx:322:13",
								children: [
									messages.map((message) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `flex ${message.type === "user" ? "justify-end" : "justify-start"}`,
										"data-tsd-source": "/src/routes/onboarding.tsx:323:40",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `max-w-[80%] rounded-2xl px-4 py-3 text-sm ${message.type === "bot" ? "rounded-tl-sm bg-background/70 text-foreground" : "rounded-tr-sm bg-primary text-primary-foreground"}`,
											"data-tsd-source": "/src/routes/onboarding.tsx:324:19",
											children: message.content
										})
									}, message.id)),
									isTyping && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex justify-start",
										"data-tsd-source": "/src/routes/onboarding.tsx:329:28",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "rounded-2xl rounded-tl-sm bg-background/70 px-4 py-3 text-sm text-muted-foreground",
											"data-tsd-source": "/src/routes/onboarding.tsx:330:19",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-1",
												"data-tsd-source": "/src/routes/onboarding.tsx:331:21",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "h-2 w-2 animate-bounce rounded-full bg-primary/60",
														"data-tsd-source": "/src/routes/onboarding.tsx:332:23"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "h-2 w-2 animate-bounce rounded-full bg-primary/60 delay-100",
														"data-tsd-source": "/src/routes/onboarding.tsx:333:23"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "h-2 w-2 animate-bounce rounded-full bg-primary/60 delay-200",
														"data-tsd-source": "/src/routes/onboarding.tsx:334:23"
													})
												]
											})
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										ref: messagesEndRef,
										"data-tsd-source": "/src/routes/onboarding.tsx:339:15"
									})
								]
							}),
							showDatePicker && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t border-border bg-background/50 px-6 py-4",
								"data-tsd-source": "/src/routes/onboarding.tsx:343:32",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-sm font-medium text-foreground mb-2",
									"data-tsd-source": "/src/routes/onboarding.tsx:344:17",
									children: "Select your date of birth"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									"data-tsd-source": "/src/routes/onboarding.tsx:347:17",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "date",
										value: selectedDate,
										max: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
										className: "flex-1 rounded-full border border-border bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary/60",
										onChange: (e) => setSelectedDate(e.target.value),
										"data-tsd-source": "/src/routes/onboarding.tsx:348:19"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleDobSubmit(selectedDate),
										disabled: !selectedDate,
										className: "rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed",
										"data-tsd-source": "/src/routes/onboarding.tsx:349:19",
										children: "Continue"
									})]
								})]
							}),
							showTimePicker && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t border-border bg-background/50 px-6 py-4",
								"data-tsd-source": "/src/routes/onboarding.tsx:356:32",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-sm font-medium text-foreground mb-2",
									"data-tsd-source": "/src/routes/onboarding.tsx:357:17",
									children: "Select your time of birth"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									"data-tsd-source": "/src/routes/onboarding.tsx:360:17",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "time",
										value: selectedTime,
										className: "flex-1 rounded-full border border-border bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary/60",
										onChange: (e) => setSelectedTime(e.target.value),
										"data-tsd-source": "/src/routes/onboarding.tsx:361:19"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleTimeSubmit(selectedTime),
										disabled: !selectedTime,
										className: "rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed",
										"data-tsd-source": "/src/routes/onboarding.tsx:362:19",
										children: "Continue"
									})]
								})]
							}),
							currentStep === "gender" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "border-t border-border bg-background/50 px-6 py-4",
								"data-tsd-source": "/src/routes/onboarding.tsx:369:42",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-3 gap-2",
									"data-tsd-source": "/src/routes/onboarding.tsx:370:17",
									children: [
										"Male",
										"Female",
										"Other"
									].map((gender) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleGenderSubmit(gender),
										className: "rounded-full border border-border bg-background/70 px-4 py-3 text-sm font-medium hover:bg-card hover:border-primary/60 transition-colors",
										"data-tsd-source": "/src/routes/onboarding.tsx:371:62",
										children: gender
									}, gender))
								})
							}),
							(currentStep === "name" || currentStep === "location") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t border-border bg-background/50 px-6 py-4 relative",
								"data-tsd-source": "/src/routes/onboarding.tsx:378:72",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									"data-tsd-source": "/src/routes/onboarding.tsx:379:17",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: inputValue,
										onChange: (e) => setInputValue(e.target.value),
										onKeyPress: handleKeyPress,
										onFocus: () => currentStep === "location" && inputValue && setShowSuggestions(true),
										onBlur: () => setTimeout(() => setShowSuggestions(false), 200),
										placeholder: currentStep === "name" ? "Enter your name..." : "Enter your city or place of birth...",
										className: "flex-1 rounded-full border border-border bg-background/70 px-4 py-3 text-sm outline-none focus:border-primary/60",
										"data-tsd-source": "/src/routes/onboarding.tsx:380:19"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											if (currentStep === "name") handleNameSubmit();
											else if (currentStep === "location") handleLocationSubmit();
										},
										disabled: !inputValue.trim(),
										className: "rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed",
										"data-tsd-source": "/src/routes/onboarding.tsx:381:19",
										children: "Send"
									})]
								}), showSuggestions && locationSuggestions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute bottom-full left-6 right-6 mb-2 rounded-2xl border border-border bg-card shadow-xl max-h-60 overflow-y-auto z-10",
									"data-tsd-source": "/src/routes/onboarding.tsx:389:71",
									children: locationSuggestions.map((suggestion, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => {
											setInputValue(suggestion.formatted);
											handleLocationSubmit(suggestion);
										},
										className: "w-full px-4 py-3 text-left text-sm hover:bg-background/50 transition-colors border-b border-border last:border-b-0",
										"data-tsd-source": "/src/routes/onboarding.tsx:390:69",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-medium text-foreground",
											"data-tsd-source": "/src/routes/onboarding.tsx:394:25",
											children: suggestion.formatted
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-xs text-muted-foreground mt-1",
											"data-tsd-source": "/src/routes/onboarding.tsx:395:25",
											children: [
												"📍 ",
												suggestion.geometry.lat.toFixed(4),
												"°, ",
												suggestion.geometry.lng.toFixed(4),
												"°"
											]
										})]
									}, index))
								})]
							}),
							currentStep === "complete" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "border-t border-border bg-background/50 px-6 py-4",
								"data-tsd-source": "/src/routes/onboarding.tsx:403:44",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: handleComplete,
									className: "w-full rounded-full bg-primary py-3.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90",
									"data-tsd-source": "/src/routes/onboarding.tsx:404:17",
									children: "Complete & Continue"
								})
							})
						]
					})
				})
			})
		]
	});
}
//#endregion
export { OnboardingPage as component };
