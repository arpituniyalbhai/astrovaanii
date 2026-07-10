import { o as __toESM } from "../_runtime.mjs";
import { t as astrovaanii_logo_default } from "./astrovaanii-logo-BIjzg6F9.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useSearch, g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as onUserDoc, t as auth } from "./firebase-JHzvw2gu.mjs";
import { t as vaanii_persona_default } from "./vaanii-persona-CbI512xY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat-CCDU09nx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function VaaniiLoadingAnimation({ userName, userQuestion }) {
	const loadingPhrases = (0, import_react.useMemo)(() => {
		const phrases = [];
		if (userName) {
			phrases.push(`Reading ${userName}'s birth chart...`);
			phrases.push(`Analyzing ${userName}'s planetary alignment...`);
		} else {
			phrases.push("Reading your birth chart...");
			phrases.push("Analyzing planetary alignment...");
		}
		if (userQuestion) {
			const snippet = userQuestion.length > 40 ? userQuestion.slice(0, 40) + "..." : userQuestion;
			phrases.push(`Reviewing: "${snippet}"`);
		}
		phrases.push("Calculating Vimshottari dasha...");
		phrases.push("Examining house placements...");
		phrases.push("Consulting Vedic scriptures...");
		phrases.push("Interpreting nakshatra influences...");
		phrases.push("Preparing your personalized reading...");
		return phrases;
	}, [userName, userQuestion]);
	const [index, setIndex] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		setIndex(0);
		const timer = setInterval(() => {
			setIndex((prev) => (prev + 1) % loadingPhrases.length);
		}, 2500);
		return () => clearInterval(timer);
	}, [loadingPhrases]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center py-8 px-4 select-none",
		"data-tsd-source": "/src/components/VaaniiLoadingAnimation.tsx:46:5",
		children: [
			Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute w-1 h-1 rounded-full bg-gold/60 animate-[twinkle_3s_ease-in-out_infinite]",
				style: {
					left: `${35 + Math.sin(i * 1.2) * 25}%`,
					top: `${30 + Math.cos(i * .9) * 20}%`,
					animationDelay: `${i * .4}s`
				},
				"data-tsd-source": "/src/components/VaaniiLoadingAnimation.tsx:49:9"
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative w-48 h-48 mb-6",
				"data-tsd-source": "/src/components/VaaniiLoadingAnimation.tsx:61:7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 rounded-full border-2 border-gold/20 animate-[spin_10s_linear_infinite]",
						"data-tsd-source": "/src/components/VaaniiLoadingAnimation.tsx:63:9"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-1 rounded-full border border-dashed border-gold/15 animate-[spin_15s_linear_infinite_reverse]",
						"data-tsd-source": "/src/components/VaaniiLoadingAnimation.tsx:64:9"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-3 rounded-full border border-gold/10 animate-[spin_8s_linear_infinite]",
						"data-tsd-source": "/src/components/VaaniiLoadingAnimation.tsx:65:9"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-4 animate-[spin_20s_linear_infinite]",
						"data-tsd-source": "/src/components/VaaniiLoadingAnimation.tsx:68:9",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-full h-full border border-primary/25 rounded-lg relative overflow-hidden",
							"data-tsd-source": "/src/components/VaaniiLoadingAnimation.tsx:69:11",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-2 border border-accent/15 rounded",
									"data-tsd-source": "/src/components/VaaniiLoadingAnimation.tsx:70:13"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-4 border border-gold/10 rounded",
									"data-tsd-source": "/src/components/VaaniiLoadingAnimation.tsx:71:13"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent animate-[scan_2.5s_ease-in-out_infinite]",
									"data-tsd-source": "/src/components/VaaniiLoadingAnimation.tsx:74:13"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 flex items-center justify-center",
						"data-tsd-source": "/src/components/VaaniiLoadingAnimation.tsx:79:9",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							"data-tsd-source": "/src/components/VaaniiLoadingAnimation.tsx:80:11",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute -inset-3 rounded-full bg-primary/10 animate-ping",
									"data-tsd-source": "/src/components/VaaniiLoadingAnimation.tsx:81:13"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute -inset-2 rounded-full animate-[pulse-glow_2s_ease-in-out_infinite]",
									style: { background: "radial-gradient(circle, rgba(180,120,80,0.15) 0%, transparent 70%)" },
									"data-tsd-source": "/src/components/VaaniiLoadingAnimation.tsx:82:13"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-14 h-14 rounded-full overflow-hidden border-2 border-primary/40 relative z-10",
									"data-tsd-source": "/src/components/VaaniiLoadingAnimation.tsx:89:13",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: vaanii_persona_default,
										alt: "Vaanii",
										className: "w-full h-full object-cover",
										"data-tsd-source": "/src/components/VaaniiLoadingAnimation.tsx:90:15"
									})
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/50 animate-[spin_4s_linear_infinite]",
						style: { transformOrigin: "0 96px" },
						"data-tsd-source": "/src/components/VaaniiLoadingAnimation.tsx:100:9"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold/50 animate-[spin_6s_linear_infinite_reverse]",
						style: { transformOrigin: "0 -96px" },
						"data-tsd-source": "/src/components/VaaniiLoadingAnimation.tsx:104:9"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground text-center transition-opacity duration-500 min-h-[1.25rem]",
				"data-tsd-source": "/src/components/VaaniiLoadingAnimation.tsx:111:7",
				children: loadingPhrases[index]
			})
		]
	});
}
var STORAGE_KEY = "vaanii_conversations";
function ChatPage() {
	const navigate = useNavigate();
	const { question: initialQuestion } = useSearch({ from: "/chat" });
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [inputValue, setInputValue] = (0, import_react.useState)("");
	const [isTyping, setIsTyping] = (0, import_react.useState)(false);
	const [isSidebarOpen, setIsSidebarOpen] = (0, import_react.useState)(false);
	const messagesEndRef = (0, import_react.useRef)(null);
	const messagesContainerRef = (0, import_react.useRef)(null);
	const inputRef = (0, import_react.useRef)(null);
	const isSendingRef = (0, import_react.useRef)(false);
	(0, import_react.useRef)(true);
	const currentQuestionRef = (0, import_react.useRef)(initialQuestion);
	const typingStartRef = (0, import_react.useRef)(0);
	const MIN_LOADING_MS = 3e3;
	const setMinLoading = (show) => {
		if (show) {
			typingStartRef.current = Date.now();
			setIsTyping(true);
		} else {
			const elapsed = Date.now() - typingStartRef.current;
			const remaining = MIN_LOADING_MS - elapsed;
			if (remaining > 0) setTimeout(() => setIsTyping(false), remaining);
			else setIsTyping(false);
		}
	};
	const [conversations, setConversations] = (0, import_react.useState)([]);
	const [activeConversationId, setActiveConversationId] = (0, import_react.useState)(null);
	const messagesRef = (0, import_react.useRef)([]);
	messagesRef.current = messages;
	const [userName, setUserName] = (0, import_react.useState)(() => {
		if (typeof window !== "undefined") return JSON.parse(localStorage.getItem("userData") || "{}").name || "User";
		return "User";
	});
	const [questionsRemaining, setQuestionsRemaining] = (0, import_react.useState)(0);
	const userNameRef = (0, import_react.useRef)(userName);
	userNameRef.current = userName;
	(0, import_react.useEffect)(() => {
		const local = JSON.parse(localStorage.getItem("userData") || "{}");
		const email = auth.currentUser?.email || local.email;
		if (email) return onUserDoc(email, (data) => {
			if (data) {
				setUserName(data.name || "User");
				setQuestionsRemaining(data.questionsRemaining ?? 0);
			}
		});
		if (local.name) setUserName(local.name);
	}, []);
	const scrollToBottom = () => {
		if (messagesContainerRef.current) messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
		messagesEndRef.current?.scrollIntoView({
			block: "end",
			behavior: "instant"
		});
	};
	(0, import_react.useEffect)(() => {
		scrollToBottom();
	}, [messages, isTyping]);
	(0, import_react.useEffect)(() => {
		let initialHeight = window.innerHeight;
		const handleInputFocus = () => {
			scrollToBottom();
			let count = 0;
			const interval = setInterval(() => {
				scrollToBottom();
				count++;
				if (count > 10) clearInterval(interval);
			}, 100);
			setTimeout(() => clearInterval(interval), 1500);
		};
		const handleResize = () => {
			const currentHeight = window.innerHeight;
			if (currentHeight < initialHeight * .85) scrollToBottom();
			initialHeight = currentHeight;
		};
		inputRef.current?.addEventListener("focus", handleInputFocus);
		window.addEventListener("resize", handleResize);
		return () => {
			inputRef.current?.removeEventListener("focus", handleInputFocus);
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	const saveConversations = (convs) => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(convs));
	};
	(0, import_react.useEffect)(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) try {
			const convs = JSON.parse(stored);
			setConversations(convs);
		} catch {}
	}, []);
	(0, import_react.useEffect)(() => {
		if (messages.length === 0 || !activeConversationId) return;
		const title = messages[0].content.slice(0, 50) + (messages[0].content.length > 50 ? "..." : "");
		setConversations((prev) => {
			const exists = prev.find((c) => c.id === activeConversationId);
			let updated;
			if (exists) updated = prev.map((c) => c.id === activeConversationId ? {
				...c,
				messages,
				title,
				updatedAt: Date.now()
			} : c);
			else updated = [...prev, {
				id: activeConversationId,
				title,
				messages,
				updatedAt: Date.now()
			}];
			saveConversations(updated);
			return updated;
		});
	}, [messages, activeConversationId]);
	const startNewChat = () => {
		setMessages([]);
		setActiveConversationId(null);
		setIsSidebarOpen(false);
	};
	const switchConversation = (id) => {
		const conv = conversations.find((c) => c.id === id);
		if (conv) {
			setMessages(conv.messages);
			setActiveConversationId(id);
		}
		setIsSidebarOpen(false);
	};
	const deleteConversation = (id, e) => {
		e.stopPropagation();
		const updated = conversations.filter((c) => c.id !== id);
		setConversations(updated);
		saveConversations(updated);
		if (activeConversationId === id) {
			setMessages([]);
			setActiveConversationId(null);
		}
	};
	function stripMarkdown(text) {
		return text.replace(/#{1,6}\s/g, "").replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1").replace(/`{1,3}[^`]*`{1,3}/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/>\s/g, "").replace(/^\s*[-*+]\s/gm, "  - ").replace(/^\s*\d+\.\s/gm, "").replace(/```[\s\S]*?```/g, "").replace(/`([^`]+)`/g, "$1").replace(/\n{3,}/g, "\n\n").trim();
	}
	const streamToVaanii = async (content, history, onToken) => {
		const local = JSON.parse(localStorage.getItem("userData") || "{}");
		const chatMessages = [...history.slice(-10).map((m) => ({
			role: m.type === "user" ? "user" : "assistant",
			content: m.content
		})), {
			role: "user",
			content
		}];
		const userDetails = {};
		if (local.dob) userDetails.dob = local.dob;
		if (local.timeOfBirth) userDetails.timeOfBirth = local.timeOfBirth;
		if (local.location) userDetails.location = local.location;
		if (local.gender) userDetails.gender = local.gender;
		const email = auth.currentUser?.email || JSON.parse(localStorage.getItem("userData") || "{}").email;
		const res = await fetch("/api/chat", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				messages: chatMessages,
				chart: local.chart || void 0,
				userName: userNameRef.current,
				userDetails: Object.keys(userDetails).length ? userDetails : void 0,
				email
			})
		});
		if (res.status === 402) {
			const errData = await res.json().catch(() => ({}));
			throw new Error(errData.error === "NO_CREDITS" ? "NO_CREDITS" : `Stream error ${res.status}`);
		}
		if (!res.ok) throw new Error(`Stream error ${res.status}`);
		const reader = res.body.getReader();
		const decoder = new TextDecoder();
		let buffer = "";
		let full = "";
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			buffer += decoder.decode(value, { stream: true });
			const parts = buffer.split("\n\n");
			buffer = parts.pop() || "";
			for (const part of parts) {
				const lines = part.split("\n");
				for (const line of lines) {
					if (!line.startsWith("data: ")) continue;
					const data = line.slice(6).trim();
					if (data === "[DONE]") continue;
					try {
						const token = JSON.parse(data).choices?.[0]?.delta?.content;
						if (token) {
							full += token;
							onToken(full);
						}
					} catch {}
				}
			}
		}
	};
	(0, import_react.useEffect)(() => {
		if (!initialQuestion) return;
		if (isSendingRef.current) return;
		isSendingRef.current = true;
		currentQuestionRef.current = initialQuestion;
		const userMessage = {
			id: Date.now().toString(),
			type: "user",
			content: initialQuestion,
			timestamp: /* @__PURE__ */ new Date()
		};
		const convId = Date.now().toString();
		setActiveConversationId(convId);
		setMessages([userMessage]);
		setMinLoading(true);
		const botIdRef = { current: null };
		streamToVaanii(initialQuestion, [], (full) => {
			if (!botIdRef.current) {
				botIdRef.current = (Date.now() + 1).toString();
				setMinLoading(false);
				setMessages((prev) => [...prev, {
					id: botIdRef.current,
					type: "bot",
					content: stripMarkdown(full),
					timestamp: /* @__PURE__ */ new Date()
				}]);
			} else setMessages((prev) => prev.map((m) => m.id === botIdRef.current ? {
				...m,
				content: stripMarkdown(full)
			} : m));
		}).then(() => {
			isSendingRef.current = false;
		}).catch((err) => {
			console.error("Chat error:", err);
			isSendingRef.current = false;
			setMinLoading(false);
			const name = userNameRef.current;
			if (err.message === "NO_CREDITS") return;
			const errorMsg = `Thank you for your question, ${name}! I'm analyzing your birth chart to provide you with an accurate reading. This may take a moment...`;
			if (botIdRef.current) setMessages((prev) => prev.map((m) => m.id === botIdRef.current ? {
				...m,
				content: errorMsg
			} : m));
			else setMessages((prev) => [...prev, {
				id: (Date.now() + 1).toString(),
				type: "bot",
				content: errorMsg,
				timestamp: /* @__PURE__ */ new Date()
			}]);
		});
	}, [initialQuestion]);
	const handleSendMessage = () => {
		if (!inputValue.trim() || isSendingRef.current) return;
		if (questionsRemaining <= 0) return;
		isSendingRef.current = true;
		const convId = activeConversationId || Date.now().toString();
		if (!activeConversationId) setActiveConversationId(convId);
		const userMessage = {
			id: Date.now().toString(),
			type: "user",
			content: inputValue,
			timestamp: /* @__PURE__ */ new Date()
		};
		setMessages((prev) => [...prev, userMessage]);
		currentQuestionRef.current = inputValue;
		setInputValue("");
		const currentHistory = messages;
		const botIdRef = { current: null };
		setMinLoading(true);
		streamToVaanii(userMessage.content, currentHistory, (full) => {
			if (!botIdRef.current) {
				botIdRef.current = (Date.now() + 1).toString();
				setMinLoading(false);
				setMessages((prev) => [...prev, {
					id: botIdRef.current,
					type: "bot",
					content: stripMarkdown(full),
					timestamp: /* @__PURE__ */ new Date()
				}]);
			} else setMessages((prev) => prev.map((m) => m.id === botIdRef.current ? {
				...m,
				content: stripMarkdown(full)
			} : m));
		}).then(() => {
			isSendingRef.current = false;
		}).catch((err) => {
			console.error("Chat error:", err);
			setMinLoading(false);
			isSendingRef.current = false;
			const name = userNameRef.current;
			if (err.message === "NO_CREDITS") return;
			const errorMsg = `I'm sorry, ${name}. I'm having trouble connecting right now. Please try again.`;
			if (botIdRef.current) setMessages((prev) => prev.map((m) => m.id === botIdRef.current ? {
				...m,
				content: errorMsg
			} : m));
			else setMessages((prev) => [...prev, {
				id: (Date.now() + 1).toString(),
				type: "bot",
				content: errorMsg,
				timestamp: /* @__PURE__ */ new Date()
			}]);
		});
	};
	const handleKeyPress = (e) => {
		if (e.key === "Enter") handleSendMessage();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative h-[100dvh] overflow-hidden bg-background grain",
		"data-tsd-source": "/src/routes/chat.tsx:386:10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "orb h-[420px] w-[420px] bg-[color:var(--gold)] -left-32 -top-24",
				"data-tsd-source": "/src/routes/chat.tsx:387:7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "orb h-[360px] w-[360px] bg-[color:var(--clay)] -right-24 bottom-0 opacity-40",
				"data-tsd-source": "/src/routes/chat.tsx:388:7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex h-[100dvh]",
				"data-tsd-source": "/src/routes/chat.tsx:390:7",
				children: [
					isSidebarOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden",
						onClick: () => setIsSidebarOpen(false),
						"data-tsd-source": "/src/routes/chat.tsx:392:27"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: `fixed inset-y-0 left-0 z-50 w-64 transform border-r border-border bg-card/95 backdrop-blur-md transition-transform duration-300 md:hidden ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`,
						"data-tsd-source": "/src/routes/chat.tsx:395:11",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between px-6 py-4 border-b border-border",
								"data-tsd-source": "/src/routes/chat.tsx:396:13",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-display text-lg",
									"data-tsd-source": "/src/routes/chat.tsx:397:15",
									children: ["Astro", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary",
										"data-tsd-source": "/src/routes/chat.tsx:397:59",
										children: "Vaanii"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setIsSidebarOpen(false),
									className: "text-muted-foreground hover:text-foreground",
									"data-tsd-source": "/src/routes/chat.tsx:398:15",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										width: "24",
										height: "24",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2",
										"data-tsd-source": "/src/routes/chat.tsx:399:17",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: "M18 6L6 18M6 6l12 12",
											"data-tsd-source": "/src/routes/chat.tsx:400:19"
										})
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: startNewChat,
								className: "mx-4 mt-4 w-[calc(100%-32px)] flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium bg-primary text-primary-foreground",
								"data-tsd-source": "/src/routes/chat.tsx:405:13",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									width: "18",
									height: "18",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "2",
									"data-tsd-source": "/src/routes/chat.tsx:406:15",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M12 5v14M5 12h14",
										"data-tsd-source": "/src/routes/chat.tsx:407:17"
									})
								}), "New Chat"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
								className: "flex-1 overflow-y-auto px-4 py-4 space-y-1",
								"data-tsd-source": "/src/routes/chat.tsx:412:13",
								children: [conversations.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground px-3",
									"data-tsd-source": "/src/routes/chat.tsx:413:46",
									children: "No recent chats"
								}), [...conversations].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 20).map((conv) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${conv.id === activeConversationId ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-background/50 hover:text-foreground"}`,
									"data-tsd-source": "/src/routes/chat.tsx:414:102",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => switchConversation(conv.id),
										className: "flex items-center gap-3 flex-1 text-left truncate",
										"data-tsd-source": "/src/routes/chat.tsx:415:21",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											width: "16",
											height: "16",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2",
											className: "shrink-0",
											"data-tsd-source": "/src/routes/chat.tsx:416:23",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
												"data-tsd-source": "/src/routes/chat.tsx:417:25"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate",
											"data-tsd-source": "/src/routes/chat.tsx:419:23",
											children: conv.title
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: (e) => deleteConversation(conv.id, e),
										className: "shrink-0 text-muted-foreground hover:text-red-500 transition-colors",
										"aria-label": "Delete conversation",
										"data-tsd-source": "/src/routes/chat.tsx:421:21",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											width: "14",
											height: "14",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2",
											"data-tsd-source": "/src/routes/chat.tsx:422:23",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
												"data-tsd-source": "/src/routes/chat.tsx:423:25"
											})
										})
									})]
								}, conv.id))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "px-4 py-4 border-t border-border",
								"data-tsd-source": "/src/routes/chat.tsx:429:13",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										navigate({ to: "/" });
										setIsSidebarOpen(false);
									},
									className: "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-background/50 hover:text-foreground",
									"data-tsd-source": "/src/routes/chat.tsx:430:15",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
										width: "18",
										height: "18",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2",
										"data-tsd-source": "/src/routes/chat.tsx:436:17",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
												"data-tsd-source": "/src/routes/chat.tsx:437:19"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
												points: "16 17 21 12 16 7",
												"data-tsd-source": "/src/routes/chat.tsx:438:19"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
												x1: "21",
												y1: "12",
												x2: "9",
												y2: "12",
												"data-tsd-source": "/src/routes/chat.tsx:439:19"
											})
										]
									}), "Sign out"]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "hidden md:flex w-64 flex-col border-r border-border bg-card/60 backdrop-blur-md",
						"data-tsd-source": "/src/routes/chat.tsx:447:11",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 px-6 py-5 border-b border-border",
								"data-tsd-source": "/src/routes/chat.tsx:448:13",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: astrovaanii_logo_default,
									alt: "",
									width: 32,
									height: 32,
									className: "h-8 w-8",
									"data-tsd-source": "/src/routes/chat.tsx:449:15"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-display text-lg",
									"data-tsd-source": "/src/routes/chat.tsx:450:15",
									children: ["Astro", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary",
										"data-tsd-source": "/src/routes/chat.tsx:450:59",
										children: "Vaanii"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "px-4 py-4 border-b border-border",
								"data-tsd-source": "/src/routes/chat.tsx:453:13",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 px-3 py-2 rounded-xl bg-background/50",
									"data-tsd-source": "/src/routes/chat.tsx:454:15",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										"data-tsd-source": "/src/routes/chat.tsx:455:17",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: vaanii_persona_default,
											alt: "Vaanii",
											className: "h-10 w-10 rounded-full object-cover border-2 border-primary/20",
											"data-tsd-source": "/src/routes/chat.tsx:456:19"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-card bg-[color:var(--sage)]",
											"data-tsd-source": "/src/routes/chat.tsx:457:19",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "h-1.5 w-1.5 rounded-full bg-white",
												"data-tsd-source": "/src/routes/chat.tsx:458:21"
											})
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										"data-tsd-source": "/src/routes/chat.tsx:461:17",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm font-medium text-foreground truncate",
											"data-tsd-source": "/src/routes/chat.tsx:462:19",
											children: userName
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs text-muted-foreground",
											"data-tsd-source": "/src/routes/chat.tsx:463:19",
											children: "Online"
										})]
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: startNewChat,
								className: "mx-4 mt-2 flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium bg-primary text-primary-foreground",
								"data-tsd-source": "/src/routes/chat.tsx:468:13",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									width: "18",
									height: "18",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "2",
									"data-tsd-source": "/src/routes/chat.tsx:469:15",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
										d: "M12 5v14M5 12h14",
										"data-tsd-source": "/src/routes/chat.tsx:470:17"
									})
								}), "New Chat"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
								className: "flex-1 overflow-y-auto px-4 py-4 space-y-1",
								"data-tsd-source": "/src/routes/chat.tsx:475:13",
								children: [conversations.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground px-3",
									"data-tsd-source": "/src/routes/chat.tsx:476:46",
									children: "No recent chats"
								}), [...conversations].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 20).map((conv) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${conv.id === activeConversationId ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-background/50 hover:text-foreground"}`,
									"data-tsd-source": "/src/routes/chat.tsx:477:102",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => switchConversation(conv.id),
										className: "flex items-center gap-3 flex-1 text-left truncate",
										"data-tsd-source": "/src/routes/chat.tsx:478:21",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											width: "16",
											height: "16",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2",
											className: "shrink-0",
											"data-tsd-source": "/src/routes/chat.tsx:479:23",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
												"data-tsd-source": "/src/routes/chat.tsx:480:25"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate",
											"data-tsd-source": "/src/routes/chat.tsx:482:23",
											children: conv.title
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: (e) => deleteConversation(conv.id, e),
										className: "shrink-0 text-muted-foreground hover:text-red-500 transition-colors",
										"aria-label": "Delete conversation",
										"data-tsd-source": "/src/routes/chat.tsx:484:21",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
											width: "14",
											height: "14",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2",
											"data-tsd-source": "/src/routes/chat.tsx:485:23",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
												"data-tsd-source": "/src/routes/chat.tsx:486:25"
											})
										})
									})]
								}, conv.id))]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 flex flex-col min-h-0 overflow-hidden",
						"data-tsd-source": "/src/routes/chat.tsx:494:9",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: "flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-border bg-card/40 backdrop-blur-md relative z-10",
							"data-tsd-source": "/src/routes/chat.tsx:496:11",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 md:hidden",
									"data-tsd-source": "/src/routes/chat.tsx:497:13",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setIsSidebarOpen(true),
											className: "text-muted-foreground hover:text-foreground",
											"data-tsd-source": "/src/routes/chat.tsx:498:15",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
												width: "24",
												height: "24",
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "2",
												"data-tsd-source": "/src/routes/chat.tsx:499:17",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
													d: "M3 12h18M3 6h18M3 18h18",
													"data-tsd-source": "/src/routes/chat.tsx:500:19"
												})
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: astrovaanii_logo_default,
											alt: "",
											width: 28,
											height: 28,
											className: "h-7 w-7",
											"data-tsd-source": "/src/routes/chat.tsx:503:15"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-display text-base",
											"data-tsd-source": "/src/routes/chat.tsx:504:15",
											children: ["Astro", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-primary",
												"data-tsd-source": "/src/routes/chat.tsx:504:61",
												children: "Vaanii"
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "hidden md:block font-display text-xl text-foreground",
									"data-tsd-source": "/src/routes/chat.tsx:506:13",
									children: "Chat with Vaanii"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => navigate({ to: "/dashboard" }),
									className: "text-sm text-muted-foreground hover:text-foreground transition-colors",
									"data-tsd-source": "/src/routes/chat.tsx:507:13",
									children: "Back to Dashboard"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 flex flex-col px-4 py-4 md:px-6 overflow-hidden min-h-0",
							"data-tsd-source": "/src/routes/chat.tsx:515:11",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex-shrink-0 mb-4 flex justify-center md:justify-start",
									"data-tsd-source": "/src/routes/chat.tsx:517:13",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `rounded-full px-4 py-2 ${questionsRemaining <= 0 ? "bg-red-50 border border-red-200" : "bg-amber-50 border border-amber-200"}`,
										"data-tsd-source": "/src/routes/chat.tsx:518:15",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `text-sm font-medium ${questionsRemaining <= 0 ? "text-red-500" : "text-amber-600"}`,
											"data-tsd-source": "/src/routes/chat.tsx:519:17",
											children: questionsRemaining <= 0 ? "No credits left" : `${questionsRemaining} credit${questionsRemaining !== 1 ? "s" : ""} remaining`
										})
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									ref: messagesContainerRef,
									className: "flex-1 overflow-y-auto space-y-4 mb-4 px-2 min-h-0",
									style: { WebkitOverflowScrolling: "touch" },
									"data-tsd-source": "/src/routes/chat.tsx:526:13",
									children: [
										messages.map((message) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `flex gap-3 ${message.type === "user" ? "items-end justify-end" : "items-start justify-start"}`,
											"data-tsd-source": "/src/routes/chat.tsx:529:40",
											children: [message.type === "bot" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: "/assets/vaanii-persona-BJOqqX-O.jpg",
												alt: "Vaanii",
												className: "h-8 w-8 rounded-full object-cover border border-border shrink-0 self-start",
												"data-tsd-source": "/src/routes/chat.tsx:530:46"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: `max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 text-sm self-start ${message.type === "bot" ? "rounded-tl-sm bg-background/70 text-foreground" : "rounded-tr-sm bg-primary text-primary-foreground"}`,
												"data-tsd-source": "/src/routes/chat.tsx:531:19",
												children: message.content
											})]
										}, message.id)),
										isTyping && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-3 items-start",
											"data-tsd-source": "/src/routes/chat.tsx:536:28",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: "/assets/vaanii-persona-BJOqqX-O.jpg",
												alt: "Vaanii",
												className: "h-8 w-8 rounded-full object-cover border border-border shrink-0 self-start",
												"data-tsd-source": "/src/routes/chat.tsx:537:19"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "rounded-2xl rounded-tl-sm bg-background/70 px-4 py-2 text-sm text-muted-foreground self-start min-w-[240px]",
												"data-tsd-source": "/src/routes/chat.tsx:538:19",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VaaniiLoadingAnimation, {
													userName: userNameRef.current,
													userQuestion: currentQuestionRef.current,
													"data-tsd-source": "/src/routes/chat.tsx:539:21"
												})
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											ref: messagesEndRef,
											"data-tsd-source": "/src/routes/chat.tsx:543:15"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex-shrink-0 px-2",
									style: { paddingBottom: "env(safe-area-inset-bottom, 16px)" },
									"data-tsd-source": "/src/routes/chat.tsx:547:13",
									children: questionsRemaining <= 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl border border-border bg-card/80 p-5 text-center",
										"data-tsd-source": "/src/routes/chat.tsx:550:42",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-center gap-3 mb-3",
												"data-tsd-source": "/src/routes/chat.tsx:551:19",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: vaanii_persona_default,
													alt: "Vaanii",
													className: "h-10 w-10 rounded-full object-cover border-2 border-primary/20",
													"data-tsd-source": "/src/routes/chat.tsx:552:21"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-display text-base text-foreground",
													"data-tsd-source": "/src/routes/chat.tsx:553:21",
													children: "Vaanii"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-sm text-muted-foreground mb-3",
												"data-tsd-source": "/src/routes/chat.tsx:555:19",
												children: [
													"Namaste",
													userName !== "User" ? ` ${userName}` : "",
													"! You've used all your credits. To continue getting personalized Vedic readings, please purchase more credits."
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-center gap-3",
												"data-tsd-source": "/src/routes/chat.tsx:558:19",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: "/pricing",
													className: "rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity",
													"data-tsd-source": "/src/routes/chat.tsx:559:21",
													children: "Purchase Credits"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
													href: "/dashboard",
													className: "rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
													"data-tsd-source": "/src/routes/chat.tsx:562:21",
													children: "Go to Dashboard"
												})]
											})
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										"data-tsd-source": "/src/routes/chat.tsx:566:26",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1 relative",
											"data-tsd-source": "/src/routes/chat.tsx:567:19",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												ref: inputRef,
												type: "text",
												value: inputValue,
												onChange: (e) => setInputValue(e.target.value),
												onKeyPress: handleKeyPress,
												placeholder: "Ask Vaanii anything...",
												className: "w-full rounded-full border border-border bg-card/80 px-6 py-4 pr-12 text-base outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/10 transition-all shadow-lg shadow-primary/20",
												"data-tsd-source": "/src/routes/chat.tsx:568:21"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground",
												"data-tsd-source": "/src/routes/chat.tsx:569:21",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
													width: "20",
													height: "20",
													viewBox: "0 0 24 24",
													fill: "none",
													stroke: "currentColor",
													strokeWidth: "2",
													"data-tsd-source": "/src/routes/chat.tsx:570:23",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
														cx: "11",
														cy: "11",
														r: "8",
														"data-tsd-source": "/src/routes/chat.tsx:571:25"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
														d: "m21 21-4.35-4.35",
														"data-tsd-source": "/src/routes/chat.tsx:572:25"
													})]
												})
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: handleSendMessage,
											disabled: !inputValue.trim(),
											className: "rounded-full bg-primary px-6 py-4 text-base font-medium text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all",
											"data-tsd-source": "/src/routes/chat.tsx:576:19",
											children: "Send"
										})]
									})
								})
							]
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { ChatPage as component };
