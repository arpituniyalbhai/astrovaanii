import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The stars couldn't align this page. It may have moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something drifted out of orbit. Try again or head home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Try again
          </button>
          <a href="/" className="rounded-full border border-input bg-background px-5 py-2.5 text-sm font-medium hover:bg-accent">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AstroVaanii",
  url: "https://astrovaanii.in/",
  description:
    "AstroVaanii is Vaanii, a personal AI astrologer trained on classical Vedic Jyotish — instant today & tomorrow predictions in 9 Indian languages, 24/7.",
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AstroVaanii",
  url: "https://astrovaanii.in/",
  description:
    "Chat with Vaanii, an AI astrologer trained on classical Parashara & Jaimini methods. Get today & tomorrow predictions in 9 Indian languages.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://astrovaanii.in/chat?question={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content" },
      { title: "AI Astrologer Free Chat - AstroVaanii" },
      {
        name: "description",
        content:
          "Meet Vaanii, your free AI astrologer. Explore accurate Vedic astrology, Kundli, birth chart, love, career, and daily predictions in 9 Indian languages.",
      },
      { name: "author", content: "AstroVaanii" },
      { name: "theme-color", content: "#f2ead8" },
      { property: "og:title", content: "AI Astrologer Free Chat – AstroVaanii" },
      {
        property: "og:description",
        content: "Meet Vaanii, your free AI astrologer. Get accurate Vedic astrology, Kundli, birth chart analysis, love, career, and daily predictions in 9 languages.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://astrovaanii.in/" },
      { property: "og:site_name", content: "AstroVaanii" },
      { property: "og:image", content: "/social-sharing.webp" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "AI Astrologer Free Chat – AstroVaanii" },
      {
        name: "twitter:description",
        content: "Meet Vaanii, your free AI astrologer. Get accurate Vedic astrology, birth chart, and daily predictions in 9 Indian languages.",
      },
      { name: "twitter:image", content: "/social-sharing.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap",
      },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(orgSchema) },
      { type: "application/ld+json", children: JSON.stringify(webSiteSchema) },
      {
        type: "text/style",
        children: `
          html, body {
            height: 100%;
            overflow: hidden;
            overscroll-behavior: none;
          }
        `,
      },
      {
        src: "https://checkout.razorpay.com/v1/checkout.js",
        async: true,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
