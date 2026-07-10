import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blogs-FTXuRYhO.js
var import_jsx_runtime = require_jsx_runtime();
var blogPosts = [{
	slug: "what-is-ai-astrologer",
	title: "What Is an AI Astrologer? A Simple Guide to How It Works",
	description: "Learn what an AI astrologer is, how it reads your birth chart, and why it's becoming the most popular way to get personalized astrology insights instantly.",
	date: "July 8, 2026",
	readTime: "8 min read",
	image: "/what-is-ai-astrologer.webp",
	imageAlt: "What is an AI astrologer - illustration of AI astrology chart reading"
}, {
	slug: "ai-astrology-website-free",
	title: "Free AI Astrology Website — Get Instant Vedic Predictions Online",
	description: "Use the best free AI astrology website for instant Vedic predictions. Get personalized readings on career, love, marriage, health, finance & more. No signup required.",
	date: "July 10, 2026",
	readTime: "12 min read",
	image: "/free-ai-astrology-website.webp",
	imageAlt: "Free AI astrology website - Get instant Vedic predictions online",
	to: "/ai-astrology-website-free"
}];
function BlogsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background",
		"data-tsd-source": "/src/routes/blogs/index.tsx:21:10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8",
			"data-tsd-source": "/src/routes/blogs/index.tsx:22:7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mb-8 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground",
					"data-tsd-source": "/src/routes/blogs/index.tsx:23:9",
					children: "← Back to Home"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl",
					"data-tsd-source": "/src/routes/blogs/index.tsx:27:9",
					children: "Blog"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-lg text-muted-foreground",
					"data-tsd-source": "/src/routes/blogs/index.tsx:30:9",
					children: "Articles about AI astrology, birth charts, and Vedic wisdom."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3",
					"data-tsd-source": "/src/routes/blogs/index.tsx:34:9",
					children: blogPosts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "group flex flex-col rounded-3xl border border-border bg-card transition-shadow hover:shadow-md overflow-hidden",
						"data-tsd-source": "/src/routes/blogs/index.tsx:35:34",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: post.to ?? "/blogs/$slug",
							params: post.to ? void 0 : { slug: post.slug },
							className: "block overflow-hidden",
							"data-tsd-source": "/src/routes/blogs/index.tsx:36:15",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: post.image,
								alt: post.imageAlt,
								width: 1200,
								height: 630,
								className: "aspect-[1200/630] w-full object-cover transition-transform duration-500 group-hover:scale-105",
								loading: "lazy",
								"data-tsd-source": "/src/routes/blogs/index.tsx:39:17"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-1 flex-col p-6",
							"data-tsd-source": "/src/routes/blogs/index.tsx:41:15",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 text-xs text-muted-foreground",
									"data-tsd-source": "/src/routes/blogs/index.tsx:42:17",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
											dateTime: post.date,
											"data-tsd-source": "/src/routes/blogs/index.tsx:43:19",
											children: post.date
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "h-1 w-1 rounded-full bg-border",
											"data-tsd-source": "/src/routes/blogs/index.tsx:44:19"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											"data-tsd-source": "/src/routes/blogs/index.tsx:45:19",
											children: post.readTime
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-3 font-display text-xl font-medium text-foreground group-hover:text-primary transition-colors",
									"data-tsd-source": "/src/routes/blogs/index.tsx:47:17",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: post.to ?? "/blogs/$slug",
										params: post.to ? void 0 : { slug: post.slug },
										"data-tsd-source": "/src/routes/blogs/index.tsx:48:19",
										children: post.title
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 flex-1 leading-relaxed text-muted-foreground text-sm",
									"data-tsd-source": "/src/routes/blogs/index.tsx:54:17",
									children: post.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: post.to ?? "/blogs/$slug",
									params: post.to ? void 0 : { slug: post.slug },
									className: "mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline",
									"data-tsd-source": "/src/routes/blogs/index.tsx:57:17",
									children: "Read more →"
								})
							]
						})]
					}, post.slug))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
			className: "border-t border-border bg-card/40 py-12",
			"data-tsd-source": "/src/routes/blogs/index.tsx:67:7",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-4xl px-4 sm:px-6 lg:px-8",
				"data-tsd-source": "/src/routes/blogs/index.tsx:68:9",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground",
					"data-tsd-source": "/src/routes/blogs/index.tsx:69:11",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "hover:text-foreground",
							"data-tsd-source": "/src/routes/blogs/index.tsx:70:13",
							children: "Home"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/privacy-policy",
							className: "hover:text-foreground",
							"data-tsd-source": "/src/routes/blogs/index.tsx:73:13",
							children: "Privacy Policy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/terms-and-conditions",
							className: "hover:text-foreground",
							"data-tsd-source": "/src/routes/blogs/index.tsx:76:13",
							children: "Terms & Conditions"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/refund-policy",
							className: "hover:text-foreground",
							"data-tsd-source": "/src/routes/blogs/index.tsx:79:13",
							children: "Refund Policy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/disclaimer",
							className: "hover:text-foreground",
							"data-tsd-source": "/src/routes/blogs/index.tsx:82:13",
							children: "Disclaimer"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-center text-xs text-muted-foreground/60",
					"data-tsd-source": "/src/routes/blogs/index.tsx:86:11",
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
export { BlogsPage as component };
