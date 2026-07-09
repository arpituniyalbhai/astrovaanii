import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import brandIcon from "@/assets/astrovaanii-logo.webp";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing Plans — AstroVaanii" },
      {
        name: "description",
        content: "Choose the perfect plan for your astrological journey with Vaanii AI.",
      },
      { property: "og:title", content: "Pricing Plans — AstroVaanii" },
      {
        property: "og:description",
        content: "Choose the perfect plan for your astrological journey with Vaanii AI.",
      },
      { property: "og:image", content: "/social-sharing.webp" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:url", content: "https://astrovaanii.in/pricing" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Pricing Plans — AstroVaanii" },
      {
        name: "twitter:description",
        content: "Choose the perfect plan for your astrological journey with Vaanii AI.",
      },
      { name: "twitter:image", content: "/social-sharing.webp" },
    ],
    links: [{ rel: "canonical", href: "https://astrovaanii.in/pricing" }],
  }),
  component: PricingPage,
});

const plans = [
  {
    name: "Starter",
    price: 79,
    priceDisplay: "₹79",
    features: [
      "5 AI chat questions",
      "Daily today & tomorrow predictions",
      "Full birth chart casting",
      "Career & life area insights",
      "9 Indian language support",
    ],
    description: "For a first conversation",
  },
  {
    name: "Pro",
    price: 139,
    priceDisplay: "₹139",
    features: [
      "10 AI chat questions",
      "Advanced chart & dasha analysis",
      "Love compatibility (Kundli Milan)",
      "Dosha detection & remedies",
      "Priority response speed",
      "9 Indian language support",
    ],
    popular: true,
    description: "For regular guidance",
  },
  {
    name: "Premium",
    price: 249,
    priceDisplay: "₹249",
    features: [
      "20 AI chat questions",
      "Detailed transit & muhurta analysis",
      "Personalized remedy suggestions",
      "Live consultation-style sessions",
      "Priority support",
      "Divisional chart (D1–D60) insights",
      "9 Indian language support",
    ],
    description: "For serious Jyotish students",
  },
];

function PricingPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);
  const [paymentMessage, setPaymentMessage] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("userData") || "{}");
    setUserName(local.name || "");
    setIsLoggedIn(!!(local.email || auth.currentUser));
  }, []);

  const handlePurchase = async (planName: string, price: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const local = JSON.parse(localStorage.getItem("userData") || "{}");
    const email = auth.currentUser?.email || local.email;

    if (!email) {
      alert("Please log in to purchase a plan");
      navigate({ to: "/signup" });
      return;
    }

    setLoading(planName);
    setPaymentMessage(null);

    try {
      // Check if Razorpay is loaded
      if (!window.Razorpay) {
        throw new Error("Razorpay script not loaded. Please refresh the page.");
      }

      // Create order
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planName, amount: price, email }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(orderData.error || "Failed to create order");
      }

      // Open Razorpay checkout
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "AstroVaanii",
        image: "/favicon.png",
        description: `${planName} Plan`,
        order_id: orderData.orderId,
        handler: async (response: any) => {
          setLoading(planName);
          
          // Verify payment
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              planName,
              email,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            setPaymentMessage({
              type: "success",
              message: verifyData.vaaniiMessage || "Payment successful! Credits added to your account.",
            });
          } else {
            setPaymentMessage({
              type: "error",
              message: verifyData.vaaniiMessage || "Payment verification failed.",
            });
          }
          setLoading(null);
        },
        prefill: {
          name: local.name || "",
          email: email,
        },
        theme: {
          color: "#E8B4B8",
        },
        modal: {
          ondismiss: () => {
            setLoading(null);
            setPaymentMessage({
              type: "error",
              message: "The cosmic timing wasn't quite right this time. Don't worry—the stars will align when they're meant to. Try again whenever you feel ready.",
            });
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Purchase error:", error);
      setPaymentMessage({
        type: "error",
        message: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <main className="min-h-screen bg-background grain">
      <div className="orb h-[420px] w-[420px] bg-[color:var(--gold)] -left-32 -top-24 fixed" />
      <div className="orb h-[360px] w-[360px] bg-[color:var(--clay)] -right-24 bottom-0 opacity-40 fixed" />

      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/50">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-2">
            <img src={brandIcon} alt="" width={28} height={28} className="h-7 w-7" />
            <span className="font-display text-lg">Astro<span className="text-primary">Vaanii</span></span>
          </Link>
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                <span className="hidden sm:block text-sm text-muted-foreground">Welcome, {userName}</span>
                <Link
                  to="/dashboard"
                  className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <Link
                to="/signup"
                className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90"
              >
                Start Chat — It's Free
              </Link>
            )}
          </div>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl text-primary mb-4">Choose Your Plan</h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Unlock deeper insights with our premium plans
          </p>
        </div>

        {paymentMessage && (
          <div className={`max-w-lg mx-auto mb-8 p-4 rounded-xl text-center ${
            paymentMessage.type === "success" 
              ? "bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-400" 
              : "bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-400"
          }`}>
            <p className="text-sm">{paymentMessage.message}</p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl border border-border bg-card/80 p-6 shadow-xl backdrop-blur-md ${
                plan.popular ? "border-primary/50 ring-2 ring-primary/20" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground">
                  Most Popular
                </div>
              )}
              <h3 className="font-display text-xl text-foreground mb-1">{plan.name}</h3>
              <p className="text-xs text-muted-foreground mb-3">{plan.description}</p>
              <div className="text-3xl font-bold text-primary mb-4">{plan.priceDisplay}</div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[color:var(--sage)] shrink-0">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={(e) => handlePurchase(plan.name, plan.price, e)}
                disabled={loading === plan.name}
                className={`w-full rounded-full py-3 text-sm font-medium transition-all ${
                  plan.popular
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90"
                    : "border border-border bg-background/70 hover:bg-card"
                } ${loading === plan.name ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {loading === plan.name ? "Processing..." : "Purchase"}
              </button>
            </div>
          ))}
        </div>

        {/* Detailed content section */}
        <section className="mt-20 max-w-4xl mx-auto space-y-10">
          <div className="text-center">
            <h2 className="font-display text-3xl md:text-4xl text-foreground">How Vaanii Credits Work</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Every plan gives you a set number of AI chat questions. Each question you ask Vaanii
              consumes one credit — whether it's a daily horoscope, a career reading, a Kundli Milan
              analysis, or a follow-up about your dasha period. Your credits never expire as long as
              your plan is active, and you can upgrade anytime. Unused credits from a lower plan
              carry forward when you upgrade.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-sm">
            <div className="rounded-2xl border border-border bg-card/50 p-6">
              <h3 className="font-display text-lg text-foreground">Starter — ₹79</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                Perfect if you're curious about AI astrology and want to try Vaanii for a few
                specific questions. Get your birth chart cast, ask about today or tomorrow, and
                explore career insights — all with classical Parashara accuracy. Ideal for a first
                conversation or checking a single life area.
              </p>
            </div>
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 ring-1 ring-primary/20">
              <h3 className="font-display text-lg text-foreground">Pro — ₹139 <span className="text-xs text-primary font-medium">Most chosen</span></h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                The sweet spot for regular seekers. With 10 questions, you can dive into love
                compatibility, dasha predictions, and advanced chart analysis across multiple
                sessions. Priority response means Vaanii answers faster. This plan suits anyone
                who wants ongoing guidance — career timing, marriage windows, and remedy checks.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card/50 p-6">
              <h3 className="font-display text-lg text-foreground">Premium — ₹249</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                For serious students of Jyotish and those who consult Vaanii regularly. 20 questions
                cover everything — detailed transit analysis, personalized remedies, live
                consultation-style sessions, and priority support. You get the full Vedic toolkit:
                dashas, yogas, doshas, divisional charts, and muhurta checks. Designed for users who
                treat Vaanii as their primary astrologer.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card/70 p-8 backdrop-blur-sm">
            <h3 className="font-display text-2xl text-foreground">Why pay for astrology when AI is free elsewhere?</h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Most free astrology apps give you generic sun-sign horoscopes — the same reading
              for everyone born in the same month. AstroVaanii is different. Every answer is based
              on your exact birth chart: your planetary positions, your active dasha periods, your
              unique yogas and doshas. The AI is trained on classical Parashara and Jaimini texts,
              not generic internet content. Your chart stays in context across every question, and
              our practising Jyotishis audit conversations weekly. You're not paying for a chatbot
              — you're paying for rigorous Vedic astrology, available 24/7, in your language.
            </p>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              All plans include access across 9 Indian languages, end-to-end encrypted birth data,
              and the ability to switch devices without losing your chat history. Start with any
              plan and upgrade when you need more. If you're ever unsure, our team is happy to
              help at{" "}
              <a href="mailto:hello@astrovaanii.ai" className="text-primary underline underline-offset-4">
                hello@astrovaanii.ai
              </a>.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}
