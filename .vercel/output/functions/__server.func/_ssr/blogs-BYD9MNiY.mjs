import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blogs-BYD9MNiY.js
var import_jsx_runtime = require_jsx_runtime();
var blogPosts = [{
	slug: "what-is-ai-astrologer",
	title: "What Is an AI Astrologer? A Simple Guide to How It Works",
	description: "Learn what an AI astrologer is, how it reads your birth chart, and why it's becoming the most popular way to get personalized astrology insights instantly.",
	date: "July 8, 2026",
	readTime: "8 min read",
	image: "/what-is-ai-astrologer.webp",
	imageAlt: "What is an AI astrologer - illustration of AI astrology chart reading"
}];
function BlogsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mb-8 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground",
					children: "← Back to Home"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl",
					children: "Blog"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-lg text-muted-foreground",
					children: "Articles about AI astrology, birth charts, and Vedic wisdom."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3",
					children: blogPosts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "group flex flex-col rounded-3xl border border-border bg-card transition-shadow hover:shadow-md overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/blogs/$slug",
							params: { slug: post.slug },
							className: "block overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: post.image,
								alt: post.imageAlt,
								width: 1200,
								height: 630,
								className: "aspect-[1200/630] w-full object-cover transition-transform duration-500 group-hover:scale-105",
								loading: "lazy"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-1 flex-col p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
											dateTime: post.date,
											children: post.date
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1 w-1 rounded-full bg-border" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: post.readTime })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-3 font-display text-xl font-medium text-foreground group-hover:text-primary transition-colors",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/blogs/$slug",
										params: { slug: post.slug },
										children: post.title
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 flex-1 leading-relaxed text-muted-foreground text-sm",
									children: post.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/blogs/$slug",
									params: { slug: post.slug },
									className: "mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline",
									children: "Read more →"
								})
							]
						})]
					}, post.slug))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
			className: "border-t border-border bg-card/40 py-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-4xl px-4 sm:px-6 lg:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "hover:text-foreground",
							children: "Home"
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
export { BlogsPage as component };
