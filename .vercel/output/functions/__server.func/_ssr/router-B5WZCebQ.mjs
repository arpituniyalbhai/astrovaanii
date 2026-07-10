import { o as __toESM } from "../_runtime.mjs";
import { t as faqs } from "./ai-astrology-website-free-SAezLrG3.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, j as redirect, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as initializeApp } from "../_libs/@firebase/app+[...].mjs";
import "../_libs/firebase.mjs";
import { a as updateDoc, c as increment, i as setDoc, o as doc, r as runTransaction, s as getFirestore, t as getDoc } from "../_libs/@firebase/firestore+[...].mjs";
import { t as faqs$1 } from "./free-kundli-CIysZriF.mjs";
import { t as faqs$2 } from "./routes-DcqvICF5.mjs";
import { t as faqs$3 } from "./what-is-ai-astrologer-D6NfqUSd.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import crypto from "crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/router-B5WZCebQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-slBGJrPr.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		"data-tsd-source": "/src/routes/__root.tsx:17:5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			"data-tsd-source": "/src/routes/__root.tsx:18:7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					"data-tsd-source": "/src/routes/__root.tsx:19:9",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					"data-tsd-source": "/src/routes/__root.tsx:20:9",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					"data-tsd-source": "/src/routes/__root.tsx:21:9",
					children: "The stars couldn't align this page. It may have moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					"data-tsd-source": "/src/routes/__root.tsx:24:9",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90",
						"data-tsd-source": "/src/routes/__root.tsx:25:11",
						children: "Return home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		"data-tsd-source": "/src/routes/__root.tsx:45:5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			"data-tsd-source": "/src/routes/__root.tsx:46:7",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold text-foreground",
					"data-tsd-source": "/src/routes/__root.tsx:47:9",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					"data-tsd-source": "/src/routes/__root.tsx:48:9",
					children: "Something drifted out of orbit. Try again or head home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					"data-tsd-source": "/src/routes/__root.tsx:51:9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90",
						"data-tsd-source": "/src/routes/__root.tsx:52:11",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "rounded-full border border-input bg-background px-5 py-2.5 text-sm font-medium hover:bg-accent",
						"data-tsd-source": "/src/routes/__root.tsx:58:11",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var orgSchema = {
	"@context": "https://schema.org",
	"@type": "Organization",
	name: "AstroVaanii",
	url: "https://astrovaanii.in/",
	description: "AstroVaanii is Vaanii, a personal AI astrologer trained on classical Vedic Jyotish — instant today & tomorrow predictions in 9 Indian languages, 24/7."
};
var webSiteSchema = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	name: "AstroVaanii",
	url: "https://astrovaanii.in/",
	description: "Chat with Vaanii, an AI astrologer trained on classical Parashara & Jaimini methods. Get today & tomorrow predictions in 9 Indian languages.",
	potentialAction: {
		"@type": "SearchAction",
		target: {
			"@type": "EntryPoint",
			urlTemplate: "https://astrovaanii.in/chat?question={search_term_string}"
		},
		"query-input": "required name=search_term_string"
	}
};
var Route$21 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content"
			},
			{ title: "AI Astrologer Free Chat - AstroVaanii" },
			{
				name: "description",
				content: "Meet Vaanii, your free AI astrologer. Explore accurate Vedic astrology, Kundli, birth chart, love, career, and daily predictions in 9 Indian languages."
			},
			{
				name: "author",
				content: "AstroVaanii"
			},
			{
				name: "theme-color",
				content: "#f2ead8"
			},
			{
				property: "og:title",
				content: "AI Astrologer Free Chat – AstroVaanii"
			},
			{
				property: "og:description",
				content: "Meet Vaanii, your free AI astrologer. Get accurate Vedic astrology, Kundli, birth chart analysis, love, career, and daily predictions in 9 languages."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: "https://astrovaanii.in/"
			},
			{
				property: "og:site_name",
				content: "AstroVaanii"
			},
			{
				property: "og:image",
				content: "/social-sharing.webp"
			},
			{
				property: "og:image:width",
				content: "1200"
			},
			{
				property: "og:image:height",
				content: "630"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "AI Astrologer Free Chat – AstroVaanii"
			},
			{
				name: "twitter:description",
				content: "Meet Vaanii, your free AI astrologer. Get accurate Vedic astrology, birth chart, and daily predictions in 9 Indian languages."
			},
			{
				name: "twitter:image",
				content: "/social-sharing.webp"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.png",
				type: "image/png"
			},
			{
				rel: "apple-touch-icon",
				href: "/favicon.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap"
			}
		],
		scripts: [
			{
				type: "application/ld+json",
				children: JSON.stringify(orgSchema)
			},
			{
				type: "application/ld+json",
				children: JSON.stringify(webSiteSchema)
			},
			{
				type: "text/style",
				children: `
          html, body {
            height: 100%;
            overflow: hidden;
            overscroll-behavior: none;
          }
        `
			},
			{
				src: "https://checkout.razorpay.com/v1/checkout.js",
				async: true
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		"data-tsd-source": "/src/routes/__root.tsx:163:5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", {
			"data-tsd-source": "/src/routes/__root.tsx:164:7",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, { "data-tsd-source": "/src/routes/__root.tsx:165:9" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			"data-tsd-source": "/src/routes/__root.tsx:167:7",
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, { "data-tsd-source": "/src/routes/__root.tsx:169:9" })]
		})]
	});
}
function RootComponent() {
	const { queryClient } = Route$21.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		"data-tsd-source": "/src/routes/__root.tsx:178:5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, { "data-tsd-source": "/src/routes/__root.tsx:179:7" })
	});
}
var $$splitComponentImporter$16 = () => import("./tools-D_jcykbD.mjs");
var Route$20 = createFileRoute("/tools")({
	head: () => ({
		meta: [
			{ title: "Free Vedic Astrology Tools - AstroVaanii" },
			{
				name: "description",
				content: "Explore free Vedic astrology tools including Kundli generator, birth chart calculator, and more. All tools use accurate Swiss Ephemeris calculations."
			},
			{
				property: "og:title",
				content: "Free Vedic Astrology Tools - AstroVaanii"
			},
			{
				property: "og:description",
				content: "Explore free Vedic astrology tools including Kundli generator, birth chart calculator, and more."
			},
			{
				property: "og:url",
				content: "https://astrovaanii.in/tools"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:image",
				content: "/social-sharing.webp"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [{
			rel: "canonical",
			href: "https://astrovaanii.in/tools"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./terms-and-conditions-C5QKeJZu.mjs");
var Route$19 = createFileRoute("/terms-and-conditions")({
	head: () => ({
		meta: [
			{ title: "Terms and Conditions — AstroVaanii" },
			{
				name: "description",
				content: "Terms and Conditions for using AstroVaanii — please read these rules governing your use of our website and services."
			},
			{
				property: "og:title",
				content: "Terms and Conditions — AstroVaanii"
			},
			{
				property: "og:description",
				content: "Terms and Conditions for using AstroVaanii — please read these rules governing your use of our website and services."
			},
			{
				property: "og:image",
				content: "/social-sharing.webp"
			},
			{
				property: "og:image:width",
				content: "1200"
			},
			{
				property: "og:image:height",
				content: "630"
			},
			{
				property: "og:url",
				content: "https://astrovaanii.in/terms-and-conditions"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "Terms and Conditions — AstroVaanii"
			},
			{
				name: "twitter:description",
				content: "Terms and Conditions for using AstroVaanii — please read these rules governing your use of our website and services."
			},
			{
				name: "twitter:image",
				content: "/social-sharing.webp"
			}
		],
		links: [{
			rel: "canonical",
			href: "https://astrovaanii.in/terms-and-conditions"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "WebPage",
				name: "Terms and Conditions — AstroVaanii",
				description: "Terms and Conditions for using AstroVaanii — please read these rules governing your use of our website and services.",
				url: "https://astrovaanii.in/terms-and-conditions"
			})
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./signup-Bd-DIRWe.mjs");
var Route$18 = createFileRoute("/signup")({
	head: () => ({ meta: [
		{ title: "Create your account — AstroVaanii" },
		{
			name: "description",
			content: "Sign up in three quick steps and start chatting with Vaanii, your personal AI astrologer."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./refund-policy-BTh2zaE3.mjs");
var Route$17 = createFileRoute("/refund-policy")({
	head: () => ({
		meta: [
			{ title: "Refund Policy — AstroVaanii" },
			{
				name: "description",
				content: "Refund and cancellation policy for AstroVaanii — understand our terms regarding purchases and subscriptions."
			},
			{
				property: "og:title",
				content: "Refund Policy — AstroVaanii"
			},
			{
				property: "og:description",
				content: "Refund and cancellation policy for AstroVaanii — understand our terms regarding purchases and subscriptions."
			},
			{
				property: "og:image",
				content: "/social-sharing.webp"
			},
			{
				property: "og:image:width",
				content: "1200"
			},
			{
				property: "og:image:height",
				content: "630"
			},
			{
				property: "og:url",
				content: "https://astrovaanii.in/refund-policy"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "Refund Policy — AstroVaanii"
			},
			{
				name: "twitter:description",
				content: "Refund and cancellation policy for AstroVaanii — understand our terms regarding purchases and subscriptions."
			},
			{
				name: "twitter:image",
				content: "/social-sharing.webp"
			}
		],
		links: [{
			rel: "canonical",
			href: "https://astrovaanii.in/refund-policy"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "WebPage",
				name: "Refund Policy — AstroVaanii",
				description: "Refund and cancellation policy for AstroVaanii — understand our terms regarding purchases and subscriptions.",
				url: "https://astrovaanii.in/refund-policy"
			})
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./privacy-policy-BmG7e5CM.mjs");
var Route$16 = createFileRoute("/privacy-policy")({
	head: () => ({
		meta: [
			{ title: "Privacy Policy — AstroVaanii" },
			{
				name: "description",
				content: "Privacy Policy for AstroVaanii — learn how we collect, use, and protect your personal data."
			},
			{
				property: "og:title",
				content: "Privacy Policy — AstroVaanii"
			},
			{
				property: "og:description",
				content: "Privacy Policy for AstroVaanii — learn how we collect, use, and protect your personal data."
			},
			{
				property: "og:image",
				content: "/social-sharing.webp"
			},
			{
				property: "og:image:width",
				content: "1200"
			},
			{
				property: "og:image:height",
				content: "630"
			},
			{
				property: "og:url",
				content: "https://astrovaanii.in/privacy-policy"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "Privacy Policy — AstroVaanii"
			},
			{
				name: "twitter:description",
				content: "Privacy Policy for AstroVaanii — learn how we collect, use, and protect your personal data."
			},
			{
				name: "twitter:image",
				content: "/social-sharing.webp"
			}
		],
		links: [{
			rel: "canonical",
			href: "https://astrovaanii.in/privacy-policy"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "WebPage",
				name: "Privacy Policy — AstroVaanii",
				description: "Privacy Policy for AstroVaanii — learn how we collect, use, and protect your personal data.",
				url: "https://astrovaanii.in/privacy-policy"
			})
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./pricing-BstHG2lq.mjs");
var Route$15 = createFileRoute("/pricing")({
	head: () => ({
		meta: [
			{ title: "Pricing Plans — AstroVaanii" },
			{
				name: "description",
				content: "Choose the perfect plan for your astrological journey with Vaanii AI."
			},
			{
				property: "og:title",
				content: "Pricing Plans — AstroVaanii"
			},
			{
				property: "og:description",
				content: "Choose the perfect plan for your astrological journey with Vaanii AI."
			},
			{
				property: "og:image",
				content: "/social-sharing.webp"
			},
			{
				property: "og:image:width",
				content: "1200"
			},
			{
				property: "og:image:height",
				content: "630"
			},
			{
				property: "og:url",
				content: "https://astrovaanii.in/pricing"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "Pricing Plans — AstroVaanii"
			},
			{
				name: "twitter:description",
				content: "Choose the perfect plan for your astrological journey with Vaanii AI."
			},
			{
				name: "twitter:image",
				content: "/social-sharing.webp"
			}
		],
		links: [{
			rel: "canonical",
			href: "https://astrovaanii.in/pricing"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./onboarding-DymsPdrB.mjs");
var Route$14 = createFileRoute("/onboarding")({
	head: () => ({ meta: [
		{ title: "Complete your profile — AstroVaanii" },
		{
			name: "description",
			content: "Share your birth details with Vaanii to get personalized astrology readings."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./my-chart-Dz8aSi7Y.mjs");
var Route$13 = createFileRoute("/my-chart")({
	head: () => ({ meta: [
		{ title: "My Chart — AstroVaanii" },
		{
			name: "description",
			content: "Your Vedic birth chart"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./free-kundli-BzoCa6N8.mjs");
var faqJsonLd$3 = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: faqs$1.map((f) => ({
		"@type": "Question",
		name: f.q,
		acceptedAnswer: {
			"@type": "Answer",
			text: f.a
		}
	}))
};
var toolJsonLd = {
	"@context": "https://schema.org",
	"@type": "WebApplication",
	name: "Free Kundli Generator",
	applicationCategory: "LifestyleApplication",
	operatingSystem: "Any",
	offers: {
		"@type": "Offer",
		price: "0",
		priceCurrency: "INR"
	},
	url: "https://astrovaanii.in/free-kundli"
};
var Route$12 = createFileRoute("/free-kundli")({
	head: () => ({
		meta: [
			{ title: "Free Kundli Generator by Date of Birth and Time - AstroVaanii" },
			{
				name: "description",
				content: "Generate your free Janam Kundli online instantly. Enter your date of birth, time, and birthplace for an accurate Vedic birth chart using Swiss Ephemeris calculations."
			},
			{
				property: "og:title",
				content: "Free Kundli Generator by Date of Birth and Time - AstroVaanii"
			},
			{
				property: "og:description",
				content: "Create your accurate Vedic Janam Kundli online in seconds. Enter your birth details for a complete North Indian style birth chart with planet positions and dasha."
			},
			{
				property: "og:url",
				content: "https://astrovaanii.in/free-kundli"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:image",
				content: "/social-sharing.webp"
			},
			{
				property: "og:image:width",
				content: "1200"
			},
			{
				property: "og:image:height",
				content: "630"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "Free Kundli Generator by Date of Birth and Time - AstroVaanii"
			},
			{
				name: "twitter:description",
				content: "Generate your free Janam Kundli online instantly with accurate Vedic astrology calculations."
			}
		],
		links: [{
			rel: "canonical",
			href: "https://astrovaanii.in/free-kundli"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify(faqJsonLd$3)
		}, {
			type: "application/ld+json",
			children: JSON.stringify(toolJsonLd)
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./disclaimer-D3xAiZNh.mjs");
var Route$11 = createFileRoute("/disclaimer")({
	head: () => ({
		meta: [
			{ title: "Disclaimer — AstroVaanii" },
			{
				name: "description",
				content: "Disclaimer for AstroVaanii — understand the limitations of our astrological readings and AI-powered insights."
			},
			{
				property: "og:title",
				content: "Disclaimer — AstroVaanii"
			},
			{
				property: "og:description",
				content: "Disclaimer for AstroVaanii — understand the limitations of our astrological readings and AI-powered insights."
			},
			{
				property: "og:image",
				content: "/social-sharing.webp"
			},
			{
				property: "og:image:width",
				content: "1200"
			},
			{
				property: "og:image:height",
				content: "630"
			},
			{
				property: "og:url",
				content: "https://astrovaanii.in/disclaimer"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "Disclaimer — AstroVaanii"
			},
			{
				name: "twitter:description",
				content: "Disclaimer for AstroVaanii — understand the limitations of our astrological readings and AI-powered insights."
			},
			{
				name: "twitter:image",
				content: "/social-sharing.webp"
			}
		],
		links: [{
			rel: "canonical",
			href: "https://astrovaanii.in/disclaimer"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "WebPage",
				name: "Disclaimer — AstroVaanii",
				description: "Disclaimer for AstroVaanii — understand the limitations of our astrological readings and AI-powered insights.",
				url: "https://astrovaanii.in/disclaimer"
			})
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./dashboard-Bbfe17RK.mjs");
var Route$10 = createFileRoute("/dashboard")({
	head: () => ({ meta: [{ title: "Dashboard — AstroVaanii" }, {
		name: "description",
		content: "Your personal AI astrologer dashboard. Get personalized readings and insights."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./chat-CCDU09nx.mjs");
var chatSearchSchema = objectType({ question: stringType().optional() });
var Route$9 = createFileRoute("/chat")({
	validateSearch: chatSearchSchema,
	head: () => ({ meta: [{ title: "Chat with Vaanii AI — AstroVaanii" }, {
		name: "description",
		content: "Chat with your personal AI astrologer for personalized readings."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var Route$8 = createFileRoute("/blog")({ beforeLoad: () => {
	throw redirect({ to: "/blogs" });
} });
var $$splitComponentImporter$4 = () => import("./ai-astrology-website-free-DbNmChUV.mjs");
var Route$7 = createFileRoute("/ai-astrology-website-free")({
	head: () => ({
		meta: [
			{ title: "Free AI Astrology Website — Get Instant Vedic Predictions" },
			{
				name: "description",
				content: "Use the best free AI astrology website for instant Vedic predictions. Get personalized readings on career, love, marriage, health, finance & more. No signup required."
			},
			{
				property: "og:image",
				content: "/free-ai-astrology-website.webp"
			},
			{
				property: "og:image:width",
				content: "1200"
			},
			{
				property: "og:image:height",
				content: "630"
			},
			{
				property: "og:title",
				content: "Free AI Astrology Website — Get Instant Vedic Predictions"
			},
			{
				property: "og:description",
				content: "Use the best free AI astrology website for instant Vedic predictions. Get personalized readings on career, love, marriage, health, finance & more."
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:image",
				content: "/free-ai-astrology-website.webp"
			},
			{
				name: "twitter:title",
				content: "Free AI Astrology Website — Get Instant Vedic Predictions"
			},
			{
				name: "twitter:description",
				content: "Use the best free AI astrology website for instant Vedic predictions. Get personalized readings on career, love, marriage, health, finance & more."
			}
		],
		links: [{
			rel: "canonical",
			href: "https://astrovaanii.in/ai-astrology-website-free"
		}, {
			rel: "preload",
			href: "/free-ai-astrology-website.webp",
			as: "image"
		}],
		scripts: [
			{
				type: "application/ld+json",
				children: JSON.stringify(faqJsonLd$2)
			},
			{
				type: "application/ld+json",
				children: JSON.stringify(articleJsonLd$1)
			},
			{
				type: "application/ld+json",
				children: JSON.stringify(breadcrumbJsonLd$1)
			}
		]
	}),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var faqJsonLd$2 = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: faqs.map((f) => ({
		"@type": "Question",
		name: f.q,
		acceptedAnswer: {
			"@type": "Answer",
			text: f.a.replace(/<[^>]*>/g, "")
		}
	}))
};
var articleJsonLd$1 = {
	"@context": "https://schema.org",
	"@type": "Article",
	headline: "Free AI Astrology Website — Get Instant Vedic Predictions Online",
	description: "Use the best free AI astrology website for instant Vedic predictions. Get personalized readings on career, love, marriage, health, finance & more. No signup required.",
	image: "https://astrovaanii.in/free-ai-astrology-website.webp",
	datePublished: "2026-07-10",
	dateModified: "2026-07-10",
	author: {
		"@type": "Organization",
		name: "AstroVaanii",
		url: "https://astrovaanii.in"
	},
	publisher: {
		"@type": "Organization",
		name: "AstroVaanii"
	}
};
var breadcrumbJsonLd$1 = {
	"@context": "https://schema.org",
	"@type": "BreadcrumbList",
	itemListElement: [{
		"@type": "ListItem",
		position: 1,
		name: "Home",
		item: "https://astrovaanii.in/"
	}, {
		"@type": "ListItem",
		position: 2,
		name: "Free AI Astrology Website",
		item: "https://astrovaanii.in/ai-astrology-website-free"
	}]
};
var $$splitComponentImporter$3 = () => import("./routes-CxbLmaKG.mjs");
var faqJsonLd$1 = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: faqs$2.map((f) => ({
		"@type": "Question",
		name: f.q,
		acceptedAnswer: {
			"@type": "Answer",
			text: f.a
		}
	}))
};
var Route$6 = createFileRoute("/")({
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	head: () => ({
		meta: [
			{ title: "AI Astrologer Free Chat - AstroVaanii" },
			{
				name: "description",
				content: "Meet Vaanii, your free AI astrologer. Explore accurate Vedic astrology, Kundli, birth chart, love, career, and daily predictions in 9 Indian languages."
			},
			{
				property: "og:title",
				content: "AI Astrologer Free Chat – AstroVaanii"
			},
			{
				property: "og:description",
				content: "Meet Vaanii, your free AI astrologer. Get accurate Vedic astrology, Kundli, birth chart analysis, love, career, and daily predictions in 9 languages."
			},
			{
				property: "og:url",
				content: "https://astrovaanii.in/"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:image",
				content: "/social-sharing.webp"
			},
			{
				property: "og:image:width",
				content: "1200"
			},
			{
				property: "og:image:height",
				content: "630"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "AI Astrologer Free Chat – AstroVaanii"
			},
			{
				name: "twitter:description",
				content: "Meet Vaanii, your free AI astrologer. Get accurate Vedic astrology, birth chart, and daily predictions in 9 Indian languages."
			},
			{
				name: "twitter:image",
				content: "/social-sharing.webp"
			}
		],
		links: [{
			rel: "canonical",
			href: "https://astrovaanii.in/"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify(faqJsonLd$1)
		}]
	})
});
var $$splitComponentImporter$2 = () => import("./tools-CYiKVgv_.mjs");
var Route$5 = createFileRoute("/tools/")({
	head: () => ({ meta: [
		{ title: "Free Astrology Tools - Janam Kundli Generator - AstroVaanii" },
		{
			name: "description",
			content: "Explore free Vedic astrology tools including Janam Kundli (birth chart) generator by date of birth and time. Accurate Swiss Ephemeris calculations."
		},
		{
			property: "og:title",
			content: "Free Astrology Tools - AstroVaanii"
		},
		{
			property: "og:description",
			content: "Free Vedic astrology tools - Generate your Janam Kundli instantly with accurate calculations."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./blogs-FTXuRYhO.mjs");
var Route$4 = createFileRoute("/blogs/")({
	head: () => ({
		meta: [
			{ title: "Blog — AstroVaanii" },
			{
				name: "description",
				content: "Read articles about AI astrology, birth chart reading, Vedic astrology, and how AI astrologers work at AstroVaanii."
			},
			{
				property: "og:image",
				content: "/what-is-ai-astrologer.webp"
			},
			{
				property: "og:image:width",
				content: "1200"
			},
			{
				property: "og:image:height",
				content: "630"
			},
			{
				property: "og:title",
				content: "Blog — AstroVaanii"
			},
			{
				property: "og:description",
				content: "Read articles about AI astrology, birth chart reading, Vedic astrology, and how AI astrologers work at AstroVaanii."
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:image",
				content: "/what-is-ai-astrologer.webp"
			},
			{
				name: "twitter:title",
				content: "Blog — AstroVaanii"
			},
			{
				name: "twitter:description",
				content: "Read articles about AI astrology, birth chart reading, Vedic astrology, and how AI astrologers work at AstroVaanii."
			}
		],
		links: [{
			rel: "canonical",
			href: "https://astrovaanii.in/blogs"
		}],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "BreadcrumbList",
				itemListElement: [{
					"@type": "ListItem",
					position: 1,
					name: "Home",
					item: "https://astrovaanii.in/"
				}, {
					"@type": "ListItem",
					position: 2,
					name: "Blog",
					item: "https://astrovaanii.in/blogs"
				}]
			})
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./what-is-ai-astrologer-eazrTDM7.mjs");
var Route$3 = createFileRoute("/blogs/what-is-ai-astrologer")({
	head: () => ({
		meta: [
			{ title: "What Is an AI Astrologer? How It Works" },
			{
				name: "description",
				content: "Learn what an AI astrologer is and how it reads your birth chart using AI. Discover how AI astrologers provide personalized astrology insights instantly."
			},
			{
				property: "og:image",
				content: "/what-is-ai-astrologer.webp"
			},
			{
				property: "og:image:width",
				content: "1200"
			},
			{
				property: "og:image:height",
				content: "630"
			},
			{
				property: "og:title",
				content: "What Is an AI Astrologer? How It Works"
			},
			{
				property: "og:description",
				content: "Learn what an AI astrologer is and how it reads your birth chart using AI. Discover how AI astrologers provide personalized astrology insights instantly."
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:image",
				content: "/what-is-ai-astrologer.webp"
			},
			{
				name: "twitter:title",
				content: "What Is an AI Astrologer? How It Works"
			},
			{
				name: "twitter:description",
				content: "Learn what an AI astrologer is and how it reads your birth chart using AI. Discover how AI astrologers provide personalized astrology insights instantly."
			}
		],
		links: [{
			rel: "canonical",
			href: "/blogs/what-is-ai-astrologer"
		}, {
			rel: "preload",
			href: "/what-is-ai-astrologer.webp",
			as: "image"
		}],
		scripts: [
			{
				type: "application/ld+json",
				children: JSON.stringify(faqJsonLd)
			},
			{
				type: "application/ld+json",
				children: JSON.stringify(articleJsonLd)
			},
			{
				type: "application/ld+json",
				children: JSON.stringify(breadcrumbJsonLd)
			}
		]
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
function stripHtml(html) {
	return html.replace(/<[^>]*>/g, "");
}
var faqJsonLd = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: faqs$3.map((f) => ({
		"@type": "Question",
		name: f.q,
		acceptedAnswer: {
			"@type": "Answer",
			text: stripHtml(f.a)
		}
	}))
};
var articleJsonLd = {
	"@context": "https://schema.org",
	"@type": "Article",
	headline: "What Is an AI Astrologer? How It Works",
	description: "Learn what an AI astrologer is and how it reads your birth chart using AI. Discover how AI astrologers provide personalized astrology insights instantly.",
	image: "https://astrovaanii.in/what-is-ai-astrologer.webp",
	datePublished: "2026-07-08",
	dateModified: "2026-07-08",
	author: {
		"@type": "Organization",
		name: "AstroVaanii",
		url: "https://astrovaanii.in"
	},
	publisher: {
		"@type": "Organization",
		name: "AstroVaanii"
	}
};
var breadcrumbJsonLd = {
	"@context": "https://schema.org",
	"@type": "BreadcrumbList",
	itemListElement: [
		{
			"@type": "ListItem",
			position: 1,
			name: "Home",
			item: "https://astrovaanii.in/"
		},
		{
			"@type": "ListItem",
			position: 2,
			name: "Blog",
			item: "https://astrovaanii.in/blogs"
		},
		{
			"@type": "ListItem",
			position: 3,
			name: "What Is an AI Astrologer?",
			item: "https://astrovaanii.in/blogs/what-is-ai-astrologer"
		}
	]
};
var RAZORPAY_KEY_SECRET$1 = process.env.RAZORPAY_KEY_SECRET;
function verifyRazorpayPayment(params) {
	if (!RAZORPAY_KEY_SECRET$1) throw new Error("Razorpay key secret not configured");
	const { orderId, paymentId, signature } = params;
	const isValid = crypto.createHmac("sha256", RAZORPAY_KEY_SECRET$1).update(`${orderId}|${paymentId}`).digest("hex") === signature;
	return {
		valid: isValid,
		error: isValid ? void 0 : "Invalid payment signature"
	};
}
var db$1 = getFirestore(initializeApp({
	apiKey: "AIzaSyCPEGp0ub5sUeRSHlcZuctNU9ieJmDwceo",
	authDomain: "astrovaanii-ai.firebaseapp.com",
	projectId: "astrovaanii-ai",
	storageBucket: "astrovaanii-ai.firebasestorage.app",
	messagingSenderId: "244796939843",
	appId: "1:244796939843:web:b7c143d15dea8fe7a47ef6",
	measurementId: "G-WM1T1W6YFJ"
}, "server"));
function emailToDocId$1(email) {
	return email.replace(/\./g, ",");
}
var PLAN_CREDITS = {
	Starter: 5,
	Pro: 10,
	Premium: 20
};
var VAANII_MESSAGES = {
	success: [
		"Your stars are aligning beautifully! I've added your credits and I'm ready to guide you on your cosmic journey.",
		"The universe has received your intention. Your credits are now active—let's explore what the stars have in store for you.",
		"Welcome to deeper insights, my friend. Your credits are added and I'm here to illuminate your path."
	],
	failed: [
		"The cosmic timing wasn't quite right this time. Don't worry—the stars will align when they're meant to. Try again whenever you feel ready.",
		"Sometimes the universe asks us to pause. Your payment didn't go through, but that's okay. I'm still here whenever you need guidance.",
		"The stars suggest a brief delay. Your payment couldn't be processed, but your journey continues. Feel free to try again."
	]
};
function getRandomMessage(type) {
	const messages = VAANII_MESSAGES[type];
	return messages[Math.floor(Math.random() * messages.length)];
}
var Route$2 = createFileRoute("/api/verify-payment")({ server: { handlers: { POST: async ({ request }) => {
	try {
		const { orderId, paymentId, signature, planName, email } = await request.json();
		if (!orderId || !paymentId || !signature || !planName || !email) return new Response(JSON.stringify({ error: "Missing required fields" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		if (!verifyRazorpayPayment({
			orderId,
			paymentId,
			signature
		}).valid) return new Response(JSON.stringify({
			success: false,
			error: "Invalid payment signature",
			vaaniiMessage: getRandomMessage("failed")
		}), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const creditsToAdd = PLAN_CREDITS[planName];
		if (!creditsToAdd) return new Response(JSON.stringify({ error: "Invalid plan name" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const userRef = doc(db$1, "Users", emailToDocId$1(email));
		const userSnap = await getDoc(userRef);
		if (!userSnap.exists()) return new Response(JSON.stringify({ error: "User not found" }), {
			status: 404,
			headers: { "Content-Type": "application/json" }
		});
		const currentCredits = userSnap.data().questionsRemaining || 0;
		await updateDoc(userRef, { questionsRemaining: increment(creditsToAdd) });
		await setDoc(doc(db$1, "Users", emailToDocId$1(email), "purchases", Date.now().toString()), {
			planName,
			amount: PLAN_CREDITS[planName],
			paymentId,
			orderId,
			purchasedAt: (/* @__PURE__ */ new Date()).toISOString(),
			creditsBefore: currentCredits,
			creditsAfter: currentCredits + creditsToAdd
		});
		return new Response(JSON.stringify({
			success: true,
			creditsAdded: creditsToAdd,
			totalCredits: currentCredits + creditsToAdd,
			vaaniiMessage: getRandomMessage("success")
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Payment verification error:", error);
		return new Response(JSON.stringify({
			success: false,
			error: "Payment verification failed",
			vaaniiMessage: getRandomMessage("failed")
		}), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
} } } });
var RAZORPAY_KEY_ID = process.env.RAZORPAY_LIVE_API;
var RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;
async function createRazorpayOrder(params) {
	if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) throw new Error("Razorpay credentials not configured");
	const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64");
	const response = await fetch("https://api.razorpay.com/v1/orders", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Basic ${auth}`
		},
		body: JSON.stringify({
			amount: params.amount,
			currency: params.currency || "INR",
			receipt: params.receipt,
			notes: params.notes || {}
		})
	});
	if (!response.ok) {
		const error = await response.text();
		throw new Error(`Razorpay order creation failed: ${error}`);
	}
	return response.json();
}
var Route$1 = createFileRoute("/api/create-order")({ server: { handlers: { POST: async ({ request }) => {
	try {
		const { planName, amount, email } = await request.json();
		if (!planName || !amount || !email) return new Response(JSON.stringify({ error: "Missing required fields" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const order = await createRazorpayOrder({
			amount: Math.round(amount * 100),
			currency: "INR",
			receipt: `${planName.slice(0, 8)}_${Date.now()}`.slice(0, 40),
			notes: {
				planName,
				email
			}
		});
		return new Response(JSON.stringify({
			orderId: order.id,
			amount: order.amount,
			currency: order.currency,
			keyId: process.env.RAZORPAY_LIVE_API
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Order creation error:", error);
		return new Response(JSON.stringify({ error: "Failed to create order" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
} } } });
var TOPIC_KEYWORDS = {
	marriage: [
		"marry",
		"marriage",
		"love",
		"relationship",
		"spouse",
		"partner",
		"commitment",
		"soulmate",
		"husband",
		"wife",
		"divorce",
		"wedding",
		"engagement",
		"match",
		"kundli milan",
		"relationship"
	],
	career: [
		"job",
		"career",
		"work",
		"business",
		"promotion",
		"salary",
		"boss",
		"profession",
		"employment",
		"success",
		"occupation",
		"interview",
		"startup",
		"transfer",
		"office"
	],
	money: [
		"money",
		"finance",
		"wealth",
		"rich",
		"income",
		"financial",
		"investment",
		"property",
		"luxury",
		"debt",
		"profit",
		"loss",
		"salary",
		"expensive",
		"loan"
	],
	education: [
		"study",
		"education",
		"college",
		"exam",
		"degree",
		"learning",
		"student",
		"skill",
		"university",
		"school",
		"course",
		"admission",
		"result",
		"competitive"
	],
	health: [
		"health",
		"disease",
		"illness",
		"hospital",
		"surgery",
		"fitness",
		"wellness",
		"medicine",
		"pain",
		"treatment",
		"doctor",
		"diet"
	],
	travel: [
		"travel",
		"foreign",
		"abroad",
		"trip",
		"journey",
		"relocate",
		"move",
		"immigration",
		"visa",
		"tour",
		"vacation",
		"settle"
	]
};
var TOPIC_PRIORITY = [
	"marriage",
	"career",
	"money",
	"health",
	"education",
	"travel"
];
function detectTopic(question) {
	if (!question) return "general";
	const q = question.toLowerCase();
	let bestTopic = "general";
	let bestScore = 0;
	for (const topic of TOPIC_PRIORITY) {
		const keywords = TOPIC_KEYWORDS[topic];
		let score = 0;
		for (const kw of keywords) if (q.includes(kw)) score++;
		if (score > bestScore) {
			bestScore = score;
			bestTopic = topic;
		}
	}
	return bestTopic;
}
var DEBILITY_SIGNS = {
	Sun: 6,
	Moon: 7,
	Mars: 3,
	Mercury: 11,
	Jupiter: 9,
	Venus: 5,
	Saturn: 0
};
var EXALTATION_SIGNS = {
	Sun: 0,
	Moon: 1,
	Mars: 9,
	Mercury: 5,
	Jupiter: 3,
	Venus: 11,
	Saturn: 6
};
var KENDRA = [
	1,
	4,
	7,
	10
];
var TRIKONA = [
	1,
	5,
	9
];
var DUSTHANA = [
	6,
	8,
	12
];
var ALL_PLANETS = [
	"Sun",
	"Moon",
	"Mars",
	"Mercury",
	"Jupiter",
	"Venus",
	"Saturn"
];
function getSignFromHouse(house, ascSign) {
	return (ascSign + house - 1) % 12;
}
function detectYogas(chart) {
	const yogas = [];
	const planets = chart.planets || {};
	const houseMap = chart.planetHouseMap || {};
	const ascSign = chart.ascendantSign ?? Math.floor((chart.ascendant ?? 0) / 30);
	const houseLords = chart.houseLords || {};
	const houseOccupants = chart.houseOccupants || {};
	const getHouse = (p) => {
		if (houseMap[p] !== void 0) return houseMap[p];
		return planets[p]?.house ?? 0;
	};
	const getSign = (p) => {
		return planets[p]?.sign ?? getSignFromHouse(getHouse(p), ascSign);
	};
	const moonHouse = getHouse("Moon");
	const jupHouse = getHouse("Jupiter");
	if (moonHouse && jupHouse) {
		const diff = Math.abs(moonHouse - jupHouse);
		if (diff === 0 || diff === 3 || diff === 6 || diff === 9) yogas.push({
			name: "Gaj Kesari Yoga",
			type: "positive",
			description: "Jupiter and Moon together create wisdom, fortune, and respect.",
			planets: ["Moon", "Jupiter"],
			confidence: 75
		});
	}
	const sunHouse = getHouse("Sun");
	const mercHouse = getHouse("Mercury");
	if (sunHouse && mercHouse && sunHouse === mercHouse) yogas.push({
		name: "Budh Aditya Yoga",
		type: "positive",
		description: "Sun and Mercury together strengthen intellect, communication, and leadership.",
		planets: ["Sun", "Mercury"],
		confidence: 80
	});
	for (const k of KENDRA) for (const t of TRIKONA) {
		const kLord = houseLords[k];
		const tLord = houseLords[t];
		if (!kLord || !tLord) continue;
		const kLordHouse = getHouse(kLord);
		const tLordHouse = getHouse(tLord);
		if (!kLordHouse || !tLordHouse) continue;
		if (KENDRA.includes(kLordHouse) || TRIKONA.includes(kLordHouse)) {
			if (KENDRA.includes(tLordHouse) || TRIKONA.includes(tLordHouse)) yogas.push({
				name: "Raj Yoga",
				type: "positive",
				description: `Lord of house ${k} (${kLord}) and lord of house ${t} (${tLord}) create powerful success yoga.`,
				planets: [kLord, tLord],
				confidence: 70
			});
		}
	}
	for (const p of ALL_PLANETS) {
		const sign = getSign(p);
		if (DEBILITY_SIGNS[p] === sign) {
			const owningLord = houseLords[sign + 1];
			if (owningLord) {
				const ownLordHouse = getHouse(owningLord);
				if (ownLordHouse && (KENDRA.includes(ownLordHouse) || TRIKONA.includes(ownLordHouse))) yogas.push({
					name: `Neecha Bhanga Raja Yoga (${p})`,
					type: "positive",
					description: `${p} is debilitated but its lord ${owningLord} is in a strong position, cancelling debility and turning it into strength.`,
					planets: [p, owningLord],
					confidence: 65
				});
			}
		}
	}
	for (const d of DUSTHANA) {
		const lord = houseLords[d];
		if (!lord) continue;
		if (getHouse(lord) === d) yogas.push({
			name: `Vipreet Raj Yoga (House ${d})`,
			type: "positive",
			description: `Lord of house ${d} (${lord}) sitting in its own house turns obstacles into opportunities.`,
			planets: [lord],
			confidence: 80
		});
	}
	for (const h of [2, 11]) {
		const lord = houseLords[h];
		if (!lord) continue;
		const lordHouse = getHouse(lord);
		if (lordHouse && (KENDRA.includes(lordHouse) || TRIKONA.includes(lordHouse))) yogas.push({
			name: `Dhana Yoga (House ${h})`,
			type: "positive",
			description: `Lord of wealth house ${h} (${lord}) in a powerful position indicating financial prosperity.`,
			planets: [lord],
			confidence: 72
		});
	}
	if (moonHouse) {
		const adjHouse1 = moonHouse === 1 ? 12 : moonHouse - 1;
		const adjHouse2 = moonHouse === 12 ? 1 : moonHouse + 1;
		const occ1 = houseOccupants[adjHouse1] || [];
		const occ2 = houseOccupants[adjHouse2] || [];
		if (occ1.length === 0 && occ2.length === 0) yogas.push({
			name: "Kemadruma Yoga",
			type: "challenge",
			description: "Moon has no planetary support on either side, which may create emotional sensitivity.",
			planets: ["Moon"],
			confidence: 60
		});
	}
	for (const p of ALL_PLANETS) {
		const sign = getSign(p);
		if (DEBILITY_SIGNS[p] === sign) yogas.push({
			name: `${p} Debility`,
			type: "challenge",
			description: `${p} is in its debility sign, which may weaken its significations.`,
			planets: [p],
			confidence: 70
		});
	}
	for (const p of ALL_PLANETS) {
		const sign = getSign(p);
		if (EXALTATION_SIGNS[p] === sign) yogas.push({
			name: `${p} Exaltation`,
			type: "positive",
			description: `${p} is exalted, giving exceptional strength to its significations.`,
			planets: [p],
			confidence: 85
		});
	}
	return yogas;
}
var TOPIC_PLANETS = {
	marriage: [
		"Venus",
		"Jupiter",
		"Moon",
		"Sun",
		"Saturn"
	],
	career: [
		"Saturn",
		"Sun",
		"Mercury",
		"Jupiter",
		"Mars"
	],
	money: [
		"Jupiter",
		"Venus",
		"Saturn",
		"Sun"
	],
	education: [
		"Mercury",
		"Jupiter",
		"Moon",
		"Sun"
	],
	health: [
		"Mars",
		"Saturn",
		"Sun",
		"Moon"
	],
	travel: [
		"Rahu",
		"Jupiter",
		"Saturn",
		"Moon"
	],
	general: [
		"Sun",
		"Moon",
		"Jupiter",
		"Mercury",
		"Venus"
	]
};
var TOPIC_HOUSES = {
	marriage: [
		7,
		5,
		1
	],
	career: [
		10,
		6,
		2
	],
	money: [
		2,
		11,
		5
	],
	education: [
		4,
		5,
		1
	],
	health: [
		6,
		8,
		1
	],
	travel: [
		12,
		3,
		9
	],
	general: [
		1,
		10,
		7,
		4
	]
};
var TOPIC_LABELS = {
	marriage: "Love & Relationships",
	career: "Career & Profession",
	money: "Finance & Wealth",
	education: "Education & Learning",
	health: "Health & Wellness",
	travel: "Travel & Foreign",
	general: "General Life"
};
function formatHouse(h) {
	return h === 1 ? "1st" : h === 2 ? "2nd" : h === 3 ? "3rd" : `${h}th`;
}
var MEANINGS = {
	Venus: {
		meaning: "Love, beauty, relationships",
		effect: "Attracts harmony and connection"
	},
	Jupiter: {
		meaning: "Wisdom, expansion, fortune",
		effect: "Brings growth and opportunity"
	},
	Saturn: {
		meaning: "Discipline, structure, patience",
		effect: "Delays but strengthens long-term"
	},
	Sun: {
		meaning: "Identity, authority, confidence",
		effect: "Builds leadership and recognition"
	},
	Moon: {
		meaning: "Emotions, mind, intuition",
		effect: "Shapes emotional responses"
	},
	Mercury: {
		meaning: "Communication, intellect, business",
		effect: "Enhances thinking and expression"
	},
	Mars: {
		meaning: "Energy, ambition, action",
		effect: "Drives initiative and competition"
	},
	Rahu: {
		meaning: "Obsession, foreign, innovation",
		effect: "Pushes toward unconventional paths"
	},
	Ketu: {
		meaning: "Detachment, spirituality, past",
		effect: "Creates introspection and release"
	}
};
function generateInterpretation(topic, pmap, houseLords) {
	const items = [];
	const topicPlanets = TOPIC_PLANETS[topic] || TOPIC_PLANETS.general;
	const topicHouses = TOPIC_HOUSES[topic] || TOPIC_HOUSES.general;
	for (const p of topicPlanets) {
		const house = pmap[p];
		if (!house) continue;
		const meaning = MEANINGS[p]?.meaning || "";
		const effect = MEANINGS[p]?.effect || "";
		const why = `${p} occupies house ${house} in your chart, which is ${topicHouses.includes(house) ? "directly connected to " + topic : house <= 1 ? "the " + formatHouse(house) + " house" : ""}. ${p} naturally represents ${meaning.toLowerCase()}.`;
		items.push({
			factor: p,
			house,
			meaning,
			effect,
			why: why.trim()
		});
	}
	for (const h of topicHouses) {
		const lord = houseLords[String(h)] || "";
		if (lord && !items.some((i) => i.factor === lord)) items.push({
			factor: `${formatHouse(h)} house lord (${lord})`,
			house: pmap[lord] || h,
			meaning: `Governs the ${formatHouse(h)} house area of life`,
			effect: lord,
			why: `The lord of the ${formatHouse(h)} house, ${lord}, is placed in house ${pmap[lord] || h}, which influences how ${topic} unfolds in your life.`
		});
	}
	return items;
}
function generatePrediction(topic, pmap, chart, md, interpretation) {
	const topicPlanets = TOPIC_PLANETS[topic] || TOPIC_PLANETS.general;
	const strongFactors = interpretation.filter((i) => topicPlanets.includes(i.factor) && (i.house === 7 || i.house === 10 || i.house === 1 || i.house === 5 || i.house === 11 || i.house === 2));
	const challenging = interpretation.filter((i) => [
		6,
		8,
		12
	].includes(i.house));
	let summary = "";
	const why = [];
	let action = "";
	if (topic === "marriage") {
		const venus = pmap["Venus"];
		const saturn = pmap["Saturn"];
		if (saturn === 7 || saturn === 1) {
			summary = "Marriage may come after a period of patience and personal growth. The chart supports a meaningful partnership rather than an early one.";
			why.push("Saturn in a relationship-connected house suggests maturity is needed before marriage.");
			action = "Focus on personal stability and emotional readiness rather than rushing into commitment.";
		} else if (venus && (venus === 7 || venus === 5)) {
			summary = "Relationships and romance are naturally supported. The chart indicates strong potential for a loving partnership.";
			why.push("Venus in a favorable house strengthens relationship prospects.");
			action = "Stay open to connections through social and creative spaces where you naturally shine.";
		} else {
			summary = "Relationships are a gradual building process in your chart. Steady emotional connection is more likely than instant romance.";
			action = "Invest in understanding your own emotional patterns before seeking a partner.";
		}
	} else if (topic === "career") {
		const saturn = pmap["Saturn"];
		pmap["Sun"];
		const tenthLord = chart.houseLords?.["10"] || "";
		const tenthLordHouse = pmap[tenthLord];
		if (saturn === 10 || saturn === 6) {
			summary = "Career grows through discipline and consistent effort. Your chart favors steady advancement over quick success.";
			why.push("Saturn in a career-oriented house rewards long-term commitment.");
			action = "Pick one skill to master deeply over the next few years rather than chasing multiple opportunities.";
		} else if (tenthLordHouse && [
			1,
			5,
			9,
			10
		].includes(tenthLordHouse)) {
			summary = "Professional success comes naturally when you follow your core strengths. Leadership roles suit you.";
			why.push(`The 10th house lord (${tenthLord}) is strongly placed, supporting career authority.`);
			action = "Identify what you do better than most and build a career around that specific strength.";
		} else {
			summary = "Your career path benefits from adaptability and learning. Multiple streams of work may suit you better than one fixed role.";
			action = "Focus on building transferable skills rather than tying yourself to a single job title.";
		}
	} else if (topic === "money") {
		const jupiter = pmap["Jupiter"];
		pmap[chart.houseLords?.["2"] || ""];
		if (jupiter && [2, 11].includes(jupiter)) {
			summary = "Financial growth is naturally supported. Wealth builds steadily through ethical means and wise decisions.";
			why.push("Jupiter in a wealth-related house favors financial expansion.");
			action = "Create a long-term savings and investment plan rather than seeking quick returns.";
		} else {
			summary = "Financial stability comes through discipline and consistent effort rather than windfalls.";
			action = "Track your expenses for one month and identify one area where you can consistently save.";
		}
	} else {
		summary = strongFactors.length > 0 ? `Your chart shows supportive patterns in ${topic}-related areas.` : `Your ${topic} journey has both supportive and challenging periods.`;
		action = "Focus on what you can control today and trust the natural timing of your chart.";
	}
	if (strongFactors.length > 0) why.push(`${strongFactors[0].factor} in a strong position supports positive outcomes.`);
	if (challenging.length > 0) why.push(`${challenging[0].factor} may create some initial friction, but this builds resilience.`);
	return {
		summary,
		why: why.slice(0, 3),
		action
	};
}
function generateBroadPrediction(topic, pmap) {
	if (topic === "career") {
		const sun = pmap["Sun"];
		const merc = pmap["Mercury"];
		const sat = pmap["Saturn"];
		const styleParts = [];
		if (merc && [
			3,
			6,
			10
		].includes(merc)) styleParts.push("Communication");
		if (sun && [
			5,
			10,
			1
		].includes(sun)) styleParts.push("Leadership");
		if (sat && [6, 10].includes(sat)) styleParts.push("Technology or Engineering");
		return {
			style: styleParts.length > 0 ? styleParts.join(", ") + "-oriented career" : "Service or skill-based career",
			strengths: [
				"long-term planning",
				"persistence",
				"analytical thinking"
			].slice(0, 3),
			avoid: ["high-risk speculation", "frequent job changes without planning"].slice(0, 2)
		};
	}
	if (topic === "marriage") {
		const ven = pmap["Venus"];
		pmap["Jupiter"];
		return {
			style: ven && [5, 7].includes(ven) ? "Warm and emotionally connected relationship" : "Gradual and mature partnership",
			strengths: [
				"emotional depth",
				"loyalty",
				"understanding"
			],
			avoid: ["rushing into commitment", "ignoring red flags"]
		};
	}
	if (topic === "money") return {
		style: "Steady wealth building through consistent effort",
		strengths: [
			"discipline",
			"patience",
			"practical thinking"
		],
		avoid: ["high-risk speculation", "impulse spending"]
	};
	return {
		style: "Balanced and thoughtful approach",
		strengths: [
			"self-awareness",
			"adaptability",
			"resilience"
		],
		avoid: ["overthinking decisions", "ignoring intuition"]
	};
}
function generateTiming(topic, chart) {
	const timeline = chart.fullAntardashaTimeline || [];
	const pmap = chart.planetHouseMap || {};
	const topicPlanets = TOPIC_PLANETS[topic] || TOPIC_PLANETS.general;
	const topicHouses = TOPIC_HOUSES[topic] || TOPIC_HOUSES.general;
	const now = /* @__PURE__ */ new Date();
	const results = [];
	for (const ad of timeline) {
		if (!ad.start || !ad.end) continue;
		if (new Date(ad.start) < now) continue;
		let score = 0;
		if (topicPlanets.includes(ad.planet || "")) score += 3;
		if (topicPlanets.includes(ad.mahadasha || "")) score += 1;
		const house = pmap[ad.planet || ""];
		if (house && topicHouses.includes(house)) score += 2;
		if (score >= 2) {
			results.push({
				period: `${ad.mahadasha} MD — ${ad.planet} AD`,
				start: ad.start,
				end: ad.end,
				note: score >= 4 ? "This period strongly activates this area of your chart." : "A moderately supportive period for this topic."
			});
			if (results.length >= 2) break;
		}
	}
	return results;
}
function generateReasoning(chart, topic, previousContext) {
	const topicLabel = TOPIC_LABELS[topic] || TOPIC_LABELS.general;
	const topicPlanets = TOPIC_PLANETS[topic] || TOPIC_PLANETS.general;
	const pmap = chart.planetHouseMap || {};
	const planets = chart.planets || {};
	const houseLords = chart.houseLords || {};
	const planetPositions = {};
	const facts = [];
	for (const p of topicPlanets) {
		const pd = planets[p];
		const house = pmap[p];
		if (!house && !pd) continue;
		const pos = {
			house: house ?? pd?.house ?? 0,
			sign: pd?.signName || ""
		};
		if (pd?.nakshatraName) pos.nakshatra = pd.nakshatraName;
		if (pd?.retrograde) pos.retrograde = true;
		planetPositions[p] = pos;
		facts.push(`${p} is in House ${pos.house}${pos.sign ? ` in ${pos.sign}` : ""}${pos.retrograde ? " (retrograde)" : ""}.`);
	}
	if (chart.ascendantSignName) facts.push(`Ascendant is in ${chart.ascendantSignName}.`);
	const md = chart.mahadasha;
	if (md?.planet) facts.push(`Current Mahadasha: ${md.planet}${md.start ? ` (${md.start} to ${md.end})` : ""}.`);
	const ad = chart.antardasha;
	if (ad?.planet) facts.push(`Current Antardasha: ${ad.planet}${ad.start ? ` (${ad.start} to ${ad.end})` : ""}.`);
	const interpretation = generateInterpretation(topic, pmap, houseLords);
	const prediction = generatePrediction(topic, pmap, chart, md, interpretation);
	const broadPrediction = generateBroadPrediction(topic, pmap);
	const timing = generateTiming(topic, chart);
	const relevantYogas = detectYogas(chart).filter((y) => y.planets.some((yp) => topicPlanets.includes(yp)) || y.type === "challenge").slice(0, 3).map((y) => ({
		name: y.name,
		type: y.type,
		description: y.description
	}));
	const already = previousContext ? previousContext.split(",").map((s) => s.trim()).filter(Boolean) : [];
	const memoryItems = [...facts.slice(0, 2).map((f) => f.split(" is")[0] || f.split(".")[0]), ...timing.slice(0, 1).map((t) => t.period)].filter(Boolean);
	const allDiscussed = [.../* @__PURE__ */ new Set([...already, ...memoryItems])];
	const scratchpad = [
		`Topic: ${topicLabel}`,
		``,
		`Prediction: ${prediction.summary}`,
		``,
		`Why:`,
		...prediction.why.slice(0, 2).map((w) => `- ${w}`),
		``,
		`Action: ${prediction.action}`,
		``,
		`Style: ${broadPrediction.style}`,
		`Strengths: ${broadPrediction.strengths.join(", ")}`,
		`Avoid: ${broadPrediction.avoid.join(", ")}`,
		``,
		relevantYogas.length ? `Yogas: ${relevantYogas.map((y) => y.name).join(", ")}` : "",
		timing.length ? `Timing: ${timing[0].period} (${timing[0].start} to ${timing[0].end})` : "",
		``,
		allDiscussed.length ? `Already discussed: ${allDiscussed.join(", ")}. Build on it.` : "",
		``,
		`Response: Answer → Why → Practical action. One paragraph. Max 90 words. Same language as user. Make it feel unique, not templated.`
	].join("\n");
	return {
		topic,
		topicLabel,
		planetPositions,
		facts,
		interpretation,
		prediction,
		broadPrediction,
		timing,
		yogas: relevantYogas,
		memoryNote: allDiscussed.join(", "),
		scratchpad
	};
}
var db = getFirestore(initializeApp({
	apiKey: "AIzaSyCPEGp0ub5sUeRSHlcZuctNU9ieJmDwceo",
	authDomain: "astrovaanii-ai.firebaseapp.com",
	projectId: "astrovaanii-ai",
	storageBucket: "astrovaanii-ai.firebasestorage.app",
	messagingSenderId: "244796939843",
	appId: "1:244796939843:web:b7c143d15dea8fe7a47ef6",
	measurementId: "G-WM1T1W6YFJ"
}, "server"));
function emailToDocId(email) {
	return email.replace(/\./g, ",");
}
var PLANET_NAMES = [
	"Sun",
	"Moon",
	"Mars",
	"Mercury",
	"Jupiter",
	"Venus",
	"Saturn",
	"Rahu",
	"Ketu"
];
function extractPreviousContext(messages) {
	const lastBot = messages.filter((m) => m.role === "assistant").slice(-2);
	if (!lastBot.length) return "";
	const mentioned = [];
	for (const reply of lastBot) {
		const c = reply.content || "";
		for (const p of PLANET_NAMES) if (c.includes(p)) mentioned.push(p);
		const years = c.match(/\b\d{4}\b/g);
		if (years) mentioned.push(...years.map((y) => `year:${y}`));
	}
	return [...new Set(mentioned)].join(",");
}
var SYSTEM_PROMPT = `You are Vaanii, a Vedic astrology assistant.

FACT RULE
Planet positions below are FACTS. Never change them. Never infer a different house. Never invent a placement. If Sun is given as House 5, you MUST say House 5.

WRITING RULES
- Every response must feel freshly written. Never use the same sentence structure in consecutive replies. Vary your opening naturally.
- Answer directly in the first sentence, then explain WHY using the chart, then give one practical action. Never skip the reasoning.
- End every answer with one practical suggestion the user can act on.
- Use a confident but grounded tone. Never sound like an astrology textbook. Write like an experienced astrologer speaking naturally to one person.
- Do not overuse astrology jargon. Keep explanations practical.
- Use the user's first name naturally at most once per response. Do not start every answer with the name. Never repeat it in consecutive replies.
- One paragraph, max 90 words. No bullet points. No repeated facts.
- If a topic was already discussed in a previous reply, do not repeat the same explanation — build on it with new insight.
- Never describe physical traits of people.
- Detect user's language from their last message. Reply in the same language.`;
async function handleStream(request) {
	const { messages, chart, userName, userDetails, email } = await request.json();
	if (!email) return new Response(JSON.stringify({ error: "Authentication required" }), {
		status: 401,
		headers: { "Content-Type": "application/json" }
	});
	const userRef = doc(db, "Users", emailToDocId(email));
	let questionsRemaining = 0;
	try {
		const result = await runTransaction(db, async (transaction) => {
			const snap = await transaction.get(userRef);
			if (!snap.exists()) throw new Error("USER_NOT_FOUND");
			const remaining = snap.data().questionsRemaining ?? 0;
			if (remaining <= 0) return {
				allowed: false,
				remaining: 0
			};
			transaction.update(userRef, { questionsRemaining: increment(-1) });
			return {
				allowed: true,
				remaining: remaining - 1
			};
		});
		questionsRemaining = result.remaining;
		if (!result.allowed) return new Response(JSON.stringify({
			error: "NO_CREDITS",
			remaining: 0,
			message: "You've run out of credits. Please purchase more to continue your readings with Vaanii."
		}), {
			status: 402,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		if ((err instanceof Error ? err.message : "Unknown error") === "USER_NOT_FOUND") return new Response(JSON.stringify({
			error: "USER_NOT_FOUND",
			message: "User profile not found. Please complete onboarding first."
		}), {
			status: 404,
			headers: { "Content-Type": "application/json" }
		});
		console.error("Credit deduction failed:", err);
		return new Response(JSON.stringify({
			error: "CREDIT_CHECK_FAILED",
			message: "Unable to verify credits. Please try again."
		}), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
	try {
		await setDoc(doc(db, "Users", emailToDocId(email), "questions", Date.now().toString()), {
			question: messages[messages.length - 1]?.content || "",
			askedAt: (/* @__PURE__ */ new Date()).toISOString(),
			creditsRemainingAfter: questionsRemaining
		});
	} catch {}
	const topic = detectTopic([...messages].reverse().find((m) => m.role === "user")?.content || "");
	const previousCtx = extractPreviousContext(messages);
	const reasoning = chart ? generateReasoning(chart, topic, previousCtx) : null;
	const systemMessages = [{
		role: "system",
		content: SYSTEM_PROMPT
	}];
	if (reasoning) {
		systemMessages.push({
			role: "system",
			content: `[Planet Positions]\n${JSON.stringify(reasoning.planetPositions, null, 2)}`
		});
		if (reasoning.facts.length > 0) systemMessages.push({
			role: "system",
			content: `[Facts]\n${reasoning.facts.join("\n")}`
		});
		if (reasoning.interpretation.length > 0) {
			const interpText = reasoning.interpretation.map((i) => `- ${i.factor} in house ${i.house}: ${i.meaning}. Effect: ${i.effect}. Why: ${i.why}`).join("\n");
			systemMessages.push({
				role: "system",
				content: `[Interpretation]\n${interpText}`
			});
		}
		systemMessages.push({
			role: "system",
			content: `[Prediction]\nSummary: ${reasoning.prediction.summary}\nWhy:\n${reasoning.prediction.why.map((w) => `- ${w}`).join("\n")}\nAction: ${reasoning.prediction.action}`
		});
		systemMessages.push({
			role: "system",
			content: `[Broad Profile]\nStyle: ${reasoning.broadPrediction.style}\nStrengths: ${reasoning.broadPrediction.strengths.join(", ")}\nAvoid: ${reasoning.broadPrediction.avoid.join(", ")}`
		});
		if (reasoning.timing.length > 0) {
			const t = reasoning.timing[0];
			systemMessages.push({
				role: "system",
				content: `[Timing]\nNext relevant period: ${t.period} (${t.start} to ${t.end})\n${t.note}`
			});
		}
		if (reasoning.yogas.length > 0) systemMessages.push({
			role: "system",
			content: `[Yogas]\n${reasoning.yogas.map((y) => `${y.name}: ${y.description}`).join("\n")}`
		});
		if (reasoning.memoryNote) systemMessages.push({
			role: "system",
			content: `[Already Discussed]\n${reasoning.memoryNote}\nDo not repeat these unless asked. Build on them.`
		});
	}
	systemMessages.push({
		role: "system",
		content: `Date: ${(/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
			year: "numeric",
			month: "long",
			day: "numeric"
		})}`
	});
	if (userName) systemMessages.push({
		role: "system",
		content: `User: ${userName}`
	});
	if (userDetails) {
		const lines = ["Details:"];
		if (userDetails.dob) lines.push(`DOB: ${userDetails.dob}`);
		if (userDetails.timeOfBirth) lines.push(`TOB: ${userDetails.timeOfBirth}`);
		if (userDetails.location) lines.push(`Location: ${userDetails.location}`);
		systemMessages.push({
			role: "system",
			content: lines.join("\n")
		});
	}
	const API_KEY = process.env.MISTRAL_API_KEY;
	const MODEL = "mistral-small-latest";
	const ENDPOINT = "https://api.mistral.ai/v1/chat/completions";
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 25e3);
	try {
		const mistralRes = await fetch(ENDPOINT, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${API_KEY}`
			},
			body: JSON.stringify({
				model: MODEL,
				messages: [...systemMessages, ...messages],
				temperature: .7,
				max_tokens: 150,
				safe_prompt: false,
				stream: true
			}),
			signal: controller.signal
		});
		clearTimeout(timeout);
		if (!mistralRes.ok) {
			const text = await mistralRes.text();
			try {
				await updateDoc(userRef, { questionsRemaining: increment(1) });
			} catch {}
			return new Response(text, { status: mistralRes.status });
		}
		const headers = {
			"Content-Type": "text/event-stream",
			"Cache-Control": "no-cache",
			Connection: "keep-alive",
			"X-Credits-Remaining": String(questionsRemaining)
		};
		return new Response(mistralRes.body, { headers });
	} catch (err) {
		clearTimeout(timeout);
		console.error("Mistral API error:", err);
		try {
			await updateDoc(userRef, { questionsRemaining: increment(1) });
		} catch {}
		return new Response(JSON.stringify({ error: "AI service unavailable. Please try again." }), {
			status: 503,
			headers: { "Content-Type": "application/json" }
		});
	}
}
var Route = createFileRoute("/api/chat")({ server: { handlers: { POST: async ({ request }) => handleStream(request) } } });
var ToolsRoute = Route$20.update({
	id: "/tools",
	path: "/tools",
	getParentRoute: () => Route$21
});
var TermsAndConditionsRoute = Route$19.update({
	id: "/terms-and-conditions",
	path: "/terms-and-conditions",
	getParentRoute: () => Route$21
});
var SignupRoute = Route$18.update({
	id: "/signup",
	path: "/signup",
	getParentRoute: () => Route$21
});
var RefundPolicyRoute = Route$17.update({
	id: "/refund-policy",
	path: "/refund-policy",
	getParentRoute: () => Route$21
});
var PrivacyPolicyRoute = Route$16.update({
	id: "/privacy-policy",
	path: "/privacy-policy",
	getParentRoute: () => Route$21
});
var PricingRoute = Route$15.update({
	id: "/pricing",
	path: "/pricing",
	getParentRoute: () => Route$21
});
var OnboardingRoute = Route$14.update({
	id: "/onboarding",
	path: "/onboarding",
	getParentRoute: () => Route$21
});
var MyChartRoute = Route$13.update({
	id: "/my-chart",
	path: "/my-chart",
	getParentRoute: () => Route$21
});
var FreeKundliRoute = Route$12.update({
	id: "/free-kundli",
	path: "/free-kundli",
	getParentRoute: () => Route$21
});
var DisclaimerRoute = Route$11.update({
	id: "/disclaimer",
	path: "/disclaimer",
	getParentRoute: () => Route$21
});
var DashboardRoute = Route$10.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$21
});
var ChatRoute = Route$9.update({
	id: "/chat",
	path: "/chat",
	getParentRoute: () => Route$21
});
var BlogRoute = Route$8.update({
	id: "/blog",
	path: "/blog",
	getParentRoute: () => Route$21
});
var AiAstrologyWebsiteFreeRoute = Route$7.update({
	id: "/ai-astrology-website-free",
	path: "/ai-astrology-website-free",
	getParentRoute: () => Route$21
});
var IndexRoute = Route$6.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$21
});
var ToolsIndexRoute = Route$5.update({
	id: "/",
	path: "/",
	getParentRoute: () => ToolsRoute
});
var BlogsIndexRoute = Route$4.update({
	id: "/blogs/",
	path: "/blogs/",
	getParentRoute: () => Route$21
});
var BlogsWhatIsAiAstrologerRoute = Route$3.update({
	id: "/blogs/what-is-ai-astrologer",
	path: "/blogs/what-is-ai-astrologer",
	getParentRoute: () => Route$21
});
var ApiVerifyPaymentRoute = Route$2.update({
	id: "/api/verify-payment",
	path: "/api/verify-payment",
	getParentRoute: () => Route$21
});
var ApiCreateOrderRoute = Route$1.update({
	id: "/api/create-order",
	path: "/api/create-order",
	getParentRoute: () => Route$21
});
var ApiChatRoute = Route.update({
	id: "/api/chat",
	path: "/api/chat",
	getParentRoute: () => Route$21
});
var ToolsRouteChildren = { ToolsIndexRoute };
var rootRouteChildren = {
	IndexRoute,
	AiAstrologyWebsiteFreeRoute,
	BlogRoute,
	ChatRoute,
	DashboardRoute,
	DisclaimerRoute,
	FreeKundliRoute,
	MyChartRoute,
	OnboardingRoute,
	PricingRoute,
	PrivacyPolicyRoute,
	RefundPolicyRoute,
	SignupRoute,
	TermsAndConditionsRoute,
	ToolsRoute: ToolsRoute._addFileChildren(ToolsRouteChildren),
	ApiChatRoute,
	ApiCreateOrderRoute,
	ApiVerifyPaymentRoute,
	BlogsWhatIsAiAstrologerRoute,
	BlogsIndexRoute
};
var routeTree = Route$21._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
