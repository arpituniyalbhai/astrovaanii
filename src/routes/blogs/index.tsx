import { createFileRoute, Link } from "@tanstack/react-router";

const blogPosts = [
  {
    slug: "what-is-ai-astrologer",
    title: "What Is an AI Astrologer? A Simple Guide to How It Works",
    description:
      "Learn what an AI astrologer is, how it reads your birth chart, and why it's becoming the most popular way to get personalized astrology insights instantly.",
    date: "July 8, 2026",
    readTime: "8 min read",
    image: "/what-is-ai-astrologer.webp",
    imageAlt: "What is an AI astrologer - illustration of AI astrology chart reading",
  },
];

export const Route = createFileRoute("/blogs/")({
  head: () => ({
    meta: [
      { title: "Blog — AstroVaanii" },
      {
        name: "description",
        content:
          "Read articles about AI astrology, birth chart reading, Vedic astrology, and how AI astrologers work at AstroVaanii.",
      },
      { property: "og:image", content: "/what-is-ai-astrologer.webp" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:title", content: "Blog — AstroVaanii" },
      {
        property: "og:description",
        content:
          "Read articles about AI astrology, birth chart reading, Vedic astrology, and how AI astrologers work at AstroVaanii.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/what-is-ai-astrologer.webp" },
      { name: "twitter:title", content: "Blog — AstroVaanii" },
      {
        name: "twitter:description",
        content:
          "Read articles about AI astrology, birth chart reading, Vedic astrology, and how AI astrologers work at AstroVaanii.",
      },
    ],
    links: [{ rel: "canonical", href: "/blogs" }],
  }),
  component: BlogsPage,
});

function BlogsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          &larr; Back to Home
        </Link>

        <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          Blog
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Articles about AI astrology, birth charts, and Vedic wisdom.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col rounded-3xl border border-border bg-card transition-shadow hover:shadow-md overflow-hidden"
            >
              <Link to="/blogs/$slug" params={{ slug: post.slug }} className="block overflow-hidden">
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  width={1200}
                  height={630}
                  className="aspect-[1200/630] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <time dateTime={post.date}>{post.date}</time>
                  <span className="h-1 w-1 rounded-full bg-border" />
                  <span>{post.readTime}</span>
                </div>
                <h2 className="mt-3 font-display text-xl font-medium text-foreground group-hover:text-primary transition-colors">
                  <Link to="/blogs/$slug" params={{ slug: post.slug }}>
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 flex-1 leading-relaxed text-muted-foreground text-sm">
                  {post.description}
                </p>
                <Link
                  to="/blogs/$slug"
                  params={{ slug: post.slug }}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Read more &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      <footer className="border-t border-border bg-card/40 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <Link to="/privacy-policy" className="hover:text-foreground">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-foreground">Terms &amp; Conditions</Link>
            <Link to="/refund-policy" className="hover:text-foreground">Refund Policy</Link>
            <Link to="/disclaimer" className="hover:text-foreground">Disclaimer</Link>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground/60">&copy; {new Date().getFullYear()} AstroVaanii</p>
        </div>
      </footer>
    </main>
  );
}
