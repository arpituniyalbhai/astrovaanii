import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Sparkles,
  Flame,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Star,
  Users,
  ChevronRight,
  PhoneCall,
  Calendar,
  Heart,
  Video,
  Home,
  Check,
  HelpCircle,
  X,
  CreditCard,
  Phone,
  MessageSquare,
  Award,
} from "lucide-react";
import brandIcon from "@/assets/astrovaanii-logo.webp";
import akhandRamayanImg from "@/assets/puja/akhand_ramayan.jpg";
import vedicPanditsImg from "@/assets/puja/vedic_pandits.jpg";
import { auth } from "@/lib/firebase";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const Route = createFileRoute("/puja/akhanda-ramayana")({
  head: () => ({
    meta: [
      { title: "Akhand Ramayan Paath Online Booking | AstroVaanii" },
      {
        name: "description",
        content:
          "Book authentic 24-Hour Akhand Ramayan Paath (Sri Ramcharitmanas) performed by experienced Vedic Pandits. 3 Pandit (₹13,000), 5 Pandit (₹20,000) & 7 Pandit (₹40,000) packages available online & at home.",
      },
      { property: "og:title", content: "Akhand Ramayan Paath Online Booking | AstroVaanii" },
      {
        property: "og:description",
        content:
          "Book 24-Hour Akhand Ramayan Paath online. Choose 3 Pandits (₹13,000), 5 Pandits (₹20,000) or 7 Pandits (₹40,000). Live streaming & home delivery of Prasad.",
      },
      { property: "og:image", content: "/assets/puja/akhand_ramayan.jpg" },
      { property: "og:url", content: "https://astrovaanii.in/puja/akhanda-ramayana" },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Akhand Ramayan Paath Online Booking | AstroVaanii",
      },
      {
        name: "twitter:description",
        content:
          "Book 24-Hour Akhand Ramayan Paath online with 3, 5 or 7 Pandits. Live HD streaming and Prasad delivery included.",
      },
      { name: "twitter:image", content: "/assets/puja/akhand_ramayan.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://astrovaanii.in/puja/akhanda-ramayana" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://astrovaanii.in/" },
            {
              "@type": "ListItem",
              position: 2,
              name: "Puja Services",
              item: "https://astrovaanii.in/puja",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Akhand Ramayan Paath Online Booking",
              item: "https://astrovaanii.in/puja/akhanda-ramayana",
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Akhand Ramayan Paath Online Booking",
          description:
            "24-Hour uninterrupted recitation of Sri Ramcharitmanas by experienced Vedic Pandits. Available with 3, 5 or 7 Pandits online or at home.",
          image: "https://astrovaanii.in/assets/puja/akhand_ramayan.jpg",
          brand: { "@type": "Brand", name: "AstroVaanii" },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "1420",
            bestRating: 5,
          },
          offers: [
            {
              "@type": "Offer",
              name: "3 Pandits Package",
              price: "13000",
              priceCurrency: "INR",
              priceValidUntil: "2027-12-31",
              availability: "https://schema.org/InStock",
            },
            {
              "@type": "Offer",
              name: "5 Pandits Package",
              price: "20000",
              priceCurrency: "INR",
              priceValidUntil: "2027-12-31",
              availability: "https://schema.org/InStock",
            },
            {
              "@type": "Offer",
              name: "7 Pandits Package",
              price: "40000",
              priceCurrency: "INR",
              priceValidUntil: "2027-12-31",
              availability: "https://schema.org/InStock",
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is included in the 3, 5, and 7 Pandit packages?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "The packages vary by the number of Acharyas performing the 24-hour recitation. The 3 Pandit package includes core continuous recitation, Hawan and Prasad. The 5 and 7 Pandit packages feature musical chanting, grand Hawan, specialized Aarti, and premium Ram Yantra gifts.",
              },
            },
            {
              "@type": "Question",
              name: "Can I perform Akhand Ramayan Paath online if I am abroad?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Over 40% of devotees join online from the US, UK, UAE, and Canada. We take your Sankalp live on HD video call with your name, birth details, and gotra, and send Prasad to your address.",
              },
            },
            {
              "@type": "Question",
              name: "How many hours does the Ramayan Paath take?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "It is an uninterrupted 24-hour non-stop recital covering all 7 Kandas from Balkand to Uttarkand without break.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: AkhandaRamayanaPage,
});

type PujaMode = "online" | "offline";
type PackageType = "3_pandit" | "5_pandit" | "7_pandit";

interface PackageDetails {
  id: PackageType;
  pandits: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: string;
  badge?: string;
  features: string[];
  recommendedFor: string;
}

const packages: Record<PackageType, PackageDetails> = {
  "3_pandit": {
    id: "3_pandit",
    pandits: 3,
    name: "3 Pandits Package",
    price: 13000,
    originalPrice: 18000,
    discount: "-27%",
    features: [
      "3 Experienced Vedic Pandits",
      "24-Hour Continuous Non-Stop Path",
      "Complete 7 Kandas Recitation",
      "Kalash Sthapana & Ganesha Pujan",
      "Hawan & Aarti Included",
      "Live HD Streaming on Zoom/YouTube",
      "Holy Prasad Delivery to Home",
    ],
    recommendedFor: "Ideal for personal home peace, birthdays & small family ceremonies.",
  },
  "5_pandit": {
    id: "5_pandit",
    pandits: 5,
    name: "5 Pandits Package",
    price: 20000,
    originalPrice: 28000,
    discount: "-28%",
    badge: "MOST POPULAR",
    features: [
      "5 Senior Vedic Acharyas",
      "24-Hour Non-Stop Melodious Chanting",
      "Complete Sri Ramcharitmanas Path",
      "Special Sundarkand & Hawan Rituals",
      "Grand Aarti with Shankhnaad",
      "Dedicated Live HD Stream link for relatives",
      "Premium Prasad Box & Energized Ram Yantra",
    ],
    recommendedFor: "Recommended for Griha Pravesh, anniversaries & big family blessings.",
  },
  "7_pandit": {
    id: "7_pandit",
    pandits: 7,
    name: "7 Pandits Package",
    price: 40000,
    originalPrice: 55000,
    discount: "-27%",
    badge: "GRAND RITUAL",
    features: [
      "7 Scholar Pandits (Ved-Pathi Acharyas)",
      "24-Hour Majestic Akhand Path with musical Baaja & Harmonium",
      "Full Ramcharitmanas + Hanuman Chalisa 108 Path",
      "Maha Yajna / Hawan with 108 Samagri offerings",
      "Special Sringar of Ram Lalla Idol",
      "VIP Priority Live HD Video Link",
      "Special Silver Ram Lalla Coin & Deluxe Prasad Box",
    ],
    recommendedFor: "Ultimate package for business success, major life wins & community welfare.",
  },
};

const benefitsList = [
  {
    title: "Cosmic Peace & Energy Purification",
    description: "Reciting Sri Ramcharitmanas continuously for 24 hours destroys negative vibrations, stress, and anxiety from your house.",
    icon: Flame,
  },
  {
    title: "Vastu & Planetary Dosh Relief",
    description: "Invokes the divine protective shield of Lord Ram and Hanuman Ji to neutralize severe Grah Dosh and Vastu imbalances.",
    icon: ShieldCheck,
  },
  {
    title: "Family Harmony & Prosperity",
    description: "Strengthens marital bonds, promotes health of children, and opens doors to unexpected financial prosperity.",
    icon: Heart,
  },
  {
    title: "Removal of Deep Obstacles",
    description: "Grants victory over chronic legal disputes, court cases, enemy troubles, and career stagnation.",
    icon: Sparkles,
  },
];

const timelineSteps = [
  { step: "01", title: "Kalash Sthapana & Ganesha Pujan", detail: "Invoking Lord Ganesha and planetary deities for unobstructed completion." },
  { step: "02", title: "Sankalp with Name & Gotra", detail: "Formal Vedic declaration taking your exact family details and wishes." },
  { step: "03", title: "24-Hour Continuous Ramayan Recitation", detail: "Melodious 7 Kandas (Balkand to Uttarkand) chanted by turn by Pandits." },
  { step: "04", title: "Maha Hawan & Ahuti", detail: "Sacred fire ceremony with pure ghee, herbs and mantra offerings." },
  { step: "05", title: "Aarti & Prasad Dispatch", detail: "Final Shankhnaad Aarti followed by packing energized Prasad for you." },
];

function AkhandaRamayanaPage() {
  const [selectedMode, setSelectedMode] = useState<PujaMode>("online");
  const [selectedPackage, setSelectedPackage] = useState<PackageType>("3_pandit");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentSuccessMessage, setPaymentSuccessMessage] = useState<string | null>(null);
  const [paymentErrorMessage, setPaymentErrorMessage] = useState<string | null>(null);
  const [callbackRequested, setCallbackRequested] = useState(false);

  // Form input inside modal
  const [name, setName] = useState("");
  const [gotra, setGotra] = useState("");
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("userData") || "{}");
    if (local.name && !name) setName(local.name);
    if (local.email && !email) setEmail(local.email);
    if (auth.currentUser?.email && !email) setEmail(auth.currentUser.email);
  }, []);

  const activePkg = packages[selectedPackage];

  // Initiate Razorpay Payment using /api/create-order
  const handleRazorpayPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPaymentErrorMessage(null);
    setPaymentSuccessMessage(null);

    const userEmail = email || auth.currentUser?.email || "devotee@astrovaanii.in";

    try {
      if (!window.Razorpay) {
        throw new Error("Razorpay payment gateway script not loaded. Please refresh the page.");
      }

      // Call API to create order
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planName: `Akhand Ramayan Paath (${activePkg.name}) - ${selectedMode.toUpperCase()}`,
          amount: activePkg.price,
          email: userEmail,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(orderData.error || "Failed to create payment order");
      }

      // Configure Razorpay Options
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "AstroVaanii Puja Services",
        image: brandIcon,
        description: `Booking for ${activePkg.name} - Akhand Ramayan`,
        order_id: orderData.orderId,
        handler: async (response: any) => {
          setLoading(true);
          try {
            // Verify payment
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                planName: `Akhand Ramayan Paath (${activePkg.name})`,
                email: userEmail,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              setPaymentSuccessMessage(
                `Jay Shree Ram! Payment of ₹${activePkg.price.toLocaleString("en-IN")} received successfully. Order ID: ${response.razorpay_payment_id}. Our Head Acharya will contact you on ${phone || "your phone"} for Sankalp.`
              );
            } else {
              setPaymentErrorMessage(verifyData.vaaniiMessage || "Payment verification failed. Please contact support.");
            }
          } catch (err) {
            console.error("Verification error:", err);
            setPaymentErrorMessage("Payment verification encountered an issue. Our team will verify and confirm manually.");
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: name || "Devotee",
          email: userEmail,
          contact: phone || "",
        },
        theme: {
          color: "#d97706",
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error("Razorpay Error:", err);
      setPaymentErrorMessage(err.message || "Unable to launch payment gateway. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCallbackRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setCallbackRequested(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/60">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <img src={brandIcon} alt="AstroVaanii" width={32} height={32} className="h-8 w-8" />
            <span className="font-display text-xl font-bold tracking-tight">
              Astro<span className="text-primary">Vaanii</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/puja" className="text-primary font-semibold flex items-center gap-1">
              <Flame className="h-4 w-4 text-primary animate-pulse" />
              Puja Services
            </Link>
            <Link to="/free-kundli" className="hover:text-foreground transition-colors">
              Free Kundli
            </Link>
            <Link to="/pricing" className="hover:text-foreground transition-colors">
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground hover:bg-accent transition-all"
            >
              <PhoneCall className="h-3.5 w-3.5 text-primary" />
              <span>Talk to Acharya</span>
            </button>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="border-b border-border/50 bg-card/30 py-3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-xs text-muted-foreground flex items-center gap-2 flex-wrap">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/puja" className="hover:text-foreground">Puja Services</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-semibold">Akhand Ramayan Paath</span>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8 space-y-12">
        {/* Shopping Section: Image Gallery & Product Configurator */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Product Media */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-3xl overflow-hidden border-2 border-border shadow-2xl bg-muted">
              <img
                src={akhandRamayanImg}
                alt="Akhand Ramayan Paath Sri Ramcharitmanas"
                className="w-full h-[400px] sm:h-[480px] object-cover"
              />
              <div className="absolute top-4 left-4 bg-emerald-600 text-white font-extrabold text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" />
                <span>SAVE UP TO 28%</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-md text-white p-4 rounded-2xl border border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-400" />
                  <span>Duration: <strong>24 Hours Non-Stop</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>Guaranteed Sankalp</span>
                </div>
              </div>
            </div>

            {/* Pandits Image Preview */}
            <div className="p-4 rounded-2xl border border-border/80 bg-card flex items-center gap-4">
              <img
                src={vedicPanditsImg}
                alt="Vedic Pandits"
                loading="lazy"
                className="h-16 w-16 rounded-xl object-cover border border-amber-500/30"
              />
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-foreground">
                  Gurukul Certified Vedic Pandits
                </h4>
                <p className="text-[11px] text-muted-foreground">
                  Specialized in Sri Ramcharitmanas recital with perfect Vedic accent & swardaan.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Shopping Configurator & Details */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-500/10 rounded-full mb-3">
                SPECIAL OCCASION & PATH
              </span>
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground leading-tight">
                Akhand Ramayan Paath Online Booking — Sri Ram Charit Manas
              </h1>

              {/* Ratings & Devotees Count */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center text-amber-400 text-sm">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold">4.9 / 5</span>
                <span className="text-xs text-muted-foreground">(1,420+ Devotees Rated)</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Recitation of all 7 Kandas (Balkand to Uttarkand) of Sri Ramcharitmanas uninterrupted for 24 continuous hours. Brings divine blessings of Bhagwan Shri Ram, Mata Sita & Sri Hanuman Ji.
            </p>

            {/* 1. Select Puja Mode */}
            <div className="space-y-3 border-t border-border/60 pt-5">
              <label className="text-xs font-bold text-foreground flex items-center justify-between">
                <span>1. SELECT PUJA MODE</span>
                <span className="text-[11px] font-normal text-muted-foreground">Online Live Stream or At Home</span>
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedMode("online")}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                    selectedMode === "online"
                      ? "border-primary bg-primary/10 shadow-sm"
                      : "border-border bg-card hover:bg-accent"
                  }`}
                >
                  <div className={`p-2 rounded-xl shrink-0 ${selectedMode === "online" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                    <Video className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold flex items-center gap-1">
                      <span>Online (Virtual)</span>
                      {selectedMode === "online" && <Check className="h-3.5 w-3.5 text-primary" />}
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Live Streamed from Sacred Mandir with Sankalp taking your details.
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMode("offline")}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                    selectedMode === "offline"
                      ? "border-primary bg-primary/10 shadow-sm"
                      : "border-border bg-card hover:bg-accent"
                  }`}
                >
                  <div className={`p-2 rounded-xl shrink-0 ${selectedMode === "offline" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                    <Home className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold flex items-center gap-1">
                      <span>Offline (At Home)</span>
                      {selectedMode === "offline" && <Check className="h-3.5 w-3.5 text-primary" />}
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Vedic Pandits visit your home/venue with full ritual samagri.
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* 2. Select Pandit Package */}
            <div className="space-y-3 border-t border-border/60 pt-5">
              <label className="text-xs font-bold text-foreground flex items-center justify-between">
                <span>2. SELECT PUJA PACKAGE (PANDIT COUNT)</span>
                <span className="text-[11px] font-semibold text-primary">Mandatory Selection</span>
              </label>

              <div className="space-y-3">
                {(Object.keys(packages) as PackageType[]).map((pkgKey) => {
                  const pkg = packages[pkgKey];
                  const isSelected = selectedPackage === pkgKey;

                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={`relative cursor-pointer p-4 rounded-2xl border transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-md"
                          : "border-border bg-card hover:border-muted-foreground/40"
                      }`}
                    >
                      {pkg.badge && (
                        <span className="absolute -top-2.5 right-4 bg-primary text-primary-foreground font-extrabold text-[10px] px-2.5 py-0.5 rounded-full shadow">
                          {pkg.badge}
                        </span>
                      )}

                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                              isSelected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/40"
                            }`}
                          >
                            {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                          </div>
                          <div>
                            <h4 className="font-display text-base font-bold text-foreground">
                              {pkg.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">{pkg.recommendedFor}</p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-[11px] line-through text-muted-foreground">
                            ₹{pkg.originalPrice.toLocaleString("en-IN")}
                          </div>
                          <div className="font-display text-xl font-extrabold text-primary">
                            ₹{pkg.price.toLocaleString("en-IN")}
                          </div>
                        </div>
                      </div>

                      {/* Package Features List */}
                      {isSelected && (
                        <div className="mt-4 pt-3 border-t border-border/50 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-foreground animate-fadeIn">
                          {pkg.features.map((feat, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-muted-foreground">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Price Summary & Clean Continue Button */}
            <div className="rounded-3xl border-2 border-primary/30 bg-card p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <div>
                  <span className="text-xs text-muted-foreground block font-medium">Total Booking Amount</span>
                  <div className="font-display text-3xl font-extrabold text-primary mt-0.5">
                    ₹{activePkg.price.toLocaleString("en-IN")}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-3 py-1 rounded-full">
                    {activePkg.discount} DISCOUNT APPLIED
                  </span>
                  <p className="text-[10px] text-muted-foreground mt-1.5">Includes all Samagri & Dakshina</p>
                </div>
              </div>

              {/* Clean Continue Button as requested */}
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-primary py-4 text-base font-extrabold text-primary-foreground shadow-lg hover:opacity-95 transition-all group"
              >
                <span>Continue to Book Puja</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-6 text-[11px] text-muted-foreground pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> 100% Authentic Vedic Rituals
                </span>
                <span className="flex items-center gap-1">
                  <Award className="h-3.5 w-3.5 text-amber-500" /> Instant Acharya Guidance
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="space-y-6 pt-6 border-t border-border">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              DIVINE BLESSINGS
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">
              Benefits of Akhand Ramayan Paath
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Why this 24-hour uninterrupted recitation is revered as the most powerful Vedic ritual for householders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefitsList.map((benefit, idx) => {
              const IconComp = benefit.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-border bg-card space-y-3 hover:shadow-md transition-all"
                >
                  <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Timeline Workflow */}
        <section className="rounded-3xl bg-card border border-border p-6 sm:p-10 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              RITUAL PROCESS
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">
              How Akhand Ramayan Paath is Conducted Online
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {timelineSteps.map((item, idx) => (
              <div key={idx} className="relative p-5 rounded-2xl bg-background border border-border/80 space-y-2">
                <span className="text-2xl font-extrabold text-primary/30 font-display">
                  {item.step}
                </span>
                <h4 className="font-display text-sm font-bold leading-tight">
                  {item.title}
                </h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              DEVOTEE TESTIMONIALS
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              What Devotees Say About Akhand Ramayan Paath
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Thousands of families have experienced divine blessings through our sacred service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Priya Sharma",
                location: "Mumbai, India",
                rating: 5,
                text: "We booked the 5 Pandit package for our parents 50th anniversary. The live streaming was seamless and the pandits were extremely knowledgeable. The Prasad arrived within 3 days. Truly a blessed experience.",
              },
              {
                name: "Rajesh Patel",
                location: "London, United Kingdom",
                rating: 5,
                text: "Being away from India, I was worried about organizing Akhand Ramayan Paath for my fathers shraddha. AstroVaanii made it so simple. The Sankalp was taken with my details and I could watch the entire 24 hour ceremony live from my home in London.",
              },
              {
                name: "Anita Krishnan",
                location: "Dubai, UAE",
                rating: 5,
                text: "The 7 Pandit grand package was worth every rupee. The Harmonium and musical chanting created such a divine atmosphere even through the screen. We received the Silver Ram Lalla coin and it has brought so much positivity to our home.",
              },
            ].map((review, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-border bg-card space-y-3 hover:shadow-md transition-all"
              >
                <div className="flex items-center text-amber-400 text-sm gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed italic">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="border-t border-border/50 pt-2">
                  <p className="text-xs font-bold text-foreground">{review.name}</p>
                  <p className="text-[10px] text-muted-foreground">{review.location}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comprehensive Article Section */}
        <section className="space-y-6 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-none border-t border-border/60 pt-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              COMPLETE GUIDE TO AKHAND RAMAYAN PAATH
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              The Complete Guide to Akhand Ramayan Paath Online Booking
            </h2>
          </div>

          <h3 className="font-display text-xl font-bold text-foreground">
            The Scriptural Origin of Sri Ramcharitmanas
          </h3>
          <p>
            The Sri Ramcharitmanas, composed by the revered poet saint Goswami Tulsidas in the 16th century, stands as one of the most profound and beloved spiritual texts in the Hindu tradition. Written in Awadhi language, this epic poem narrates the life and divine leelas of Lord Sri Ram, the seventh avatar of Lord Vishnu. Unlike the Sanskrit Valmiki Ramayana which dates back thousands of years, the Ramcharitmanas was created specifically to make the story of Lord Ram accessible to common people in their everyday language.
          </p>
          <p>
            Tulsidas began composing this monumental work in 1574 CE in Ayodhya, the birthplace of Lord Ram. The text is divided into seven Kandas or books, each representing a distinct phase in Lord Ram journey. These are the Balkand, Ayodhyakand, Aranyakand, Kishkindhakand, Sundarkand, Yuddhakand, and Uttarkand. Together they form a complete spiritual narrative that guides the reader from worldly concerns to ultimate liberation.
          </p>
          <p>
            What makes the Ramcharitmanas unique is not just its literary brilliance but its profound spiritual power. Traditional belief holds that reciting or even listening to the Ramcharitmanas with devotion can purify the mind, remove obstacles, and bring divine grace into ones life. This is why the Akhand Ramayan Paath, or continuous 24-hour recitation, is considered one of the most powerful Vedic rituals for householders seeking comprehensive blessings.
          </p>

          <h3 className="font-display text-xl font-bold text-foreground">
            What is Akhand Ramayan Paath and Why is it Performed
          </h3>
          <p>
            Akhand Ramayan Paath is the uninterrupted, non-stop recitation of the entire Sri Ramcharitmanas from beginning to end. The word Akhand means unbroken or continuous, and this ritual involves a team of trained Vedic pandits who take turns chanting the sacred verses in a melodious rhythmic pattern over a full 24-hour period.
          </p>
          <p>
            The ritual is typically performed to invoke the protective and benevolent energies of Lord Ram, Mata Sita, and Hanuman Ji. It is believed that when the complete Ramcharitmanas is recited without interruption, the spiritual vibrations generated are incredibly powerful. These vibrations cleanse the environment of negative energies, create a protective shield around the household, and attract divine blessings for health, wealth, and harmony.
          </p>
          <p>
            Many families choose to perform Akhand Ramayan Paath during major life events such as weddings, housewarmings, birthdays, anniversaries, or during times of difficulty when they seek divine intervention. The ritual is also commonly performed during the holy month of Shravan, during Navratri, or on auspicious days like Ram Navami.
          </p>

          <h3 className="font-display text-xl font-bold text-foreground">
            The Spiritual Significance of the Seven Kandas
          </h3>
          <p>
            Each of the seven Kandas of the Ramcharitmanas carries its own unique spiritual significance and energy. Understanding these can help devotees connect more deeply with the ritual.
          </p>
          <p>
            The Balkand describes the childhood of Lord Ram, his birth in Ayodhya, and his early adventures including the breaking of Shiva bow and his marriage to Mata Sita. Reciting this section invokes the energy of new beginnings, innocence, and divine purpose.
          </p>
          <p>
            The Ayodhyakand deals with the coronation preparations and Lord Ram exile to the forest. This section teaches us about duty, sacrifice, and the importance of honoring ones word even in the face of personal loss.
          </p>
          <p>
            The Aranyakand covers Lord Ram life in the forest and the abduction of Mata Sita by Ravana. It represents the challenges and tests that come in life and the importance of remaining steadfast in ones dharma.
          </p>
          <p>
            The Kishkindhakand narrates Lord Ram meeting with Hanuman and Sugriva and the formation of the divine alliance that would eventually defeat Ravana. This section symbolizes the power of friendship, devotion, and strategic action.
          </p>
          <p>
            The Sundarkand is perhaps the most beloved section, describing Hanuman journey to Lanka, his meeting with Mata Sita, and his burning of Lanka. This Kanda is often recited separately for its immense protective and problem solving powers.
          </p>
          <p>
            The Yuddhakand covers the great war between Lord Ram army and Ravana forces, culminating in Ravana defeat and the rescue of Mata Sita. It represents the ultimate triumph of good over evil and the importance of righteous action.
          </p>
          <p>
            The Uttarkand describes Lord Ram return to Ayodhya, his coronation as king, and the subsequent events including the birth of his sons Luv and Kush. It concludes with the deeper philosophical teachings of the text.
          </p>

          <h3 className="font-display text-xl font-bold text-foreground">
            The Process of Booking Akhand Ramayan Paath Online
          </h3>
          <p>
            Booking Akhand Ramayan Paath online through AstroVaanii is designed to be simple and transparent. The first step is selecting the appropriate package based on the number of pandits you wish to engage. The 3 Pandit package is ideal for small family ceremonies and personal home peace. The 5 Pandit package is recommended for larger gatherings such as Griha Pravesh or family reunions. The 7 Pandit grand package is the most comprehensive option, suitable for major life achievements, business success ceremonies, or community welfare events.
          </p>
          <p>
            Once you have selected your package, you provide your Sankalp details including your full name, gotra or family lineage, birth details, and the specific intention or wish for which the ceremony is being performed. This information is crucial because the pandit recites these details aloud during the opening rituals, ensuring that the spiritual benefits are directed specifically to you and your family.
          </p>
          <p>
            After the Sankalp details are confirmed, our team consults the traditional Panchang to determine the most auspicious date and time for your ceremony. This Muhurat selection is important because performing the ritual during favorable planetary alignments maximizes its positive effects.
          </p>
          <p>
            On the scheduled day, the pandits begin the ceremony with Kalash Sthapana and Ganesha Pujan to invoke Lord Ganesha blessings for obstacle free completion. The Sankalp is then taken with your details, followed by the commencement of the 24-hour continuous recitation. Throughout the day and night, the pandits take turns maintaining the uninterrupted flow of chanting.
          </p>
          <p>
            For devotees who choose the online mode, a secure HD live streaming link is provided so you can watch and participate from anywhere in the world. Those who opt for the offline mode receive the pandits at their home or chosen venue with all ritual materials included.
          </p>
          <p>
            The ceremony concludes with a grand Hawan or sacred fire ceremony, followed by Aarti and the distribution of Prasad. The energized Prasad, along with any special items included in your package such as the Ram Yantra or Silver Ram Lalla coin, is then carefully packed and dispatched to your address.
          </p>

          <h3 className="font-display text-xl font-bold text-foreground">
            The Benefits of Akhand Ramayan Paath
          </h3>
          <p>
            The benefits of performing Akhand Ramayan Paath are extensive and touch every aspect of human life. On the spiritual level, the continuous recitation creates powerful positive vibrations that cleanse the environment of negative energies and entities. The home or venue where the ceremony is performed becomes purified and charged with divine presence.
          </p>
          <p>
            For those facing persistent obstacles in career, business, or personal relationships, the ritual is known to remove hidden blockages and open new pathways for success. Many devotees report significant improvements in their financial situation, resolution of legal disputes, and healing of family conflicts after performing this ceremony.
          </p>
          <p>
            On the health front, the powerful mantras and chants generate healing vibrations that can support recovery from chronic illnesses and promote overall wellbeing. The ritual is particularly recommended for those facing prolonged health challenges or caring for aging parents.
          </p>
          <p>
            The ceremony also strengthens family bonds and brings harmony to relationships. When family members gather to participate in or witness the recitation, the shared spiritual experience creates a deep sense of unity and mutual understanding. The blessings of Lord Ram, Mata Sita, and Hanuman Ji are believed to protect the family from future difficulties and ensure their continued prosperity.
          </p>

          <h3 className="font-display text-xl font-bold text-foreground">
            How to Prepare for Akhand Ramayan Paath at Home
          </h3>
          <p>
            If you have chosen the offline mode where pandits visit your home, there are several steps you can take to prepare your space for the ceremony. Choose a clean, well ventilated room or outdoor space that can accommodate the pandits and the ritual materials. The area should be kept clean and free from clutter.
          </p>
          <p>
            Arrange for a raised platform or altar where the sacred fire or Hawan Kund can be placed. Keep the space decorated with fresh flowers, mango leaves, and rangoli to create a welcoming atmosphere for the divine energies. It is also traditional to keep a picture or idol of Lord Ram, Mata Sita, and Hanuman Ji on the altar.
          </p>
          <p>
            For online participants, create a quiet space in your home where you can sit comfortably and focus on the live stream. Light a lamp or diya in front of your screen, keep some fresh flowers nearby, and maintain a meditative mindset throughout the ceremony. Even though you are participating remotely, your sincere intention and focus ensure that you receive the full spiritual benefits of the ritual.
          </p>

          <h3 className="font-display text-xl font-bold text-foreground">
            Why AstroVaanii is the Trusted Choice for Akhand Ramayan Paath
          </h3>
          <p>
            AstroVaanii has earned the trust of thousands of families across India and the global diaspora by maintaining the highest standards of authenticity and transparency in every ritual. Our pandits are not merely ritual performers but are deeply learned scholars who have spent years studying the Vedas and scriptures in traditional Gurukuls. They bring not just technical expertise but genuine devotion and spiritual energy to every ceremony they conduct.
          </p>
          <p>
            Every element used in our rituals, from the pure cow ghee for the Hawan to the organic herbs and fresh flowers, is sourced with care to ensure complete ritual purity. We believe that the quality of offerings directly impacts the spiritual efficacy of the ceremony, which is why we never compromise on the materials we use.
          </p>
          <p>
            Our live streaming technology allows devotees anywhere in the world to participate in real time. The HD video feed is accompanied by clear audio so you can hear every mantra and chant with perfect clarity. We also provide recordings of the ceremony for those who wish to revisit the experience.
          </p>
          <p>
            Perhaps most importantly, we maintain complete transparency in our pricing and process. There are no hidden charges, no unexpected fees, and no compromises on the quality of service. From the moment you book your Akhand Ramayan Paath to the moment you receive your Prasad, our team is available to guide you through every step.
          </p>

          <h3 className="font-display text-xl font-bold text-foreground">
            Which Package is Right for You
          </h3>
          <p>
            Choosing the right package depends on your specific needs and intentions. The 3 Pandit package is perfect for individuals or small families seeking personal peace, healing, and obstacle removal. It is also an excellent choice for those who are booking the ceremony for the first time.
          </p>
          <p>
            The 5 Pandit package is our most popular option and is recommended for families celebrating major milestones such as housewarmings, weddings, or anniversaries. The additional pandits create a more powerful and melodious recitation, and the included special Sundarkand and Hawan rituals add to the ceremonies spiritual depth.
          </p>
          <p>
            The 7 Pandit grand package is the ultimate choice for those seeking the most comprehensive and powerful ceremony possible. With musical instruments, a grand Yajna, and premium gifts including a Silver Ram Lalla coin, this package is ideal for business owners seeking success, community leaders performing ceremonies for collective welfare, or families celebrating once in a lifetime events.
          </p>

          <h3 className="font-display text-xl font-bold text-foreground">
            Frequently Asked Questions About Akhand Ramayan Paath Online Booking
          </h3>
          <p>
            Many devotees have questions about how online puja booking works, especially those who are new to the concept. The most common question is whether an online ceremony is as effective as one performed in person. The answer is a definitive yes because in Vedic philosophy, it is the Sankalp or intention that carries the spiritual power. When the pandit chants your name and gotra during the ceremony, the blessings are directed to you regardless of your physical location.
          </p>
          <p>
            Another frequently asked question is about the duration. The Akhand Ramayan Paath is exactly 24 hours from start to finish. The pandits work in shifts to ensure that the recitation continues without any break whatsoever. This continuous flow of sacred sound is what gives the ritual its name and its power.
          </p>
          <p>
            Devotees also often ask about receiving Prasad when booking online. AstroVaanii ships the energized Prasad, including holy ash, kumkum, sacred thread, and special items from the package, to your home address. International shipping to countries like the United States, Canada, the United Kingdom, Australia, and the UAE typically takes 7 to 10 business days.
          </p>

          <h3 className="font-display text-xl font-bold text-foreground">
            Book Your Akhand Ramayan Paath Today
          </h3>
          <p>
            The opportunity to bring the divine blessings of Lord Ram, Mata Sita, and Hanuman Ji into your life is just a few clicks away. Whether you are facing challenges that seem insurmountable, celebrating a joyful occasion, or simply seeking to deepen your spiritual practice, Akhand Ramayan Paath offers a powerful pathway to transformation.
          </p>
          <p>
            With AstroVaanii, you can be confident that your ceremony will be performed with absolute authenticity, devotion, and respect for Vedic traditions. Our team of experienced pandits, our commitment to quality, and our dedication to customer service ensure that every devotee who books with us has a truly blessed experience.
          </p>
          <p>
            Choose your package, provide your Sankalp details, and let the sacred verses of the Ramcharitmanas transform your home and your life. The divine blessings of Lord Ram are waiting for you.
          </p>
        </section>

        {/* FAQs */}
        <section className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-display text-2xl font-bold">Akhand Ramayan Paath Online Booking FAQs</h2>
            <p className="text-xs text-muted-foreground">Everything you need to know about booking and performing this sacred ritual.</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What is included in the 3, 5, and 7 Pandit packages?",
                a: "The packages vary by the number of Acharyas performing the 24-hour recitation. The 3 Pandit package includes core continuous recitation, Hawan and Prasad. The 5 and 7 Pandit packages feature musical chanting, grand Hawan, specialized Aarti, and premium Ram Yantra gifts.",
              },
              {
                q: "Can I perform Akhand Ramayan Paath online if I am abroad?",
                a: "Yes. Over 40 percent of our devotees join online from the US, UK, UAE, and Canada. We take your Sankalp live on HD video call with your name, birth details, and gotra, and send Prasad to your address.",
              },
              {
                q: "How many hours does the Ramayan Paath take?",
                a: "It is an uninterrupted 24-hour non-stop recital covering all 7 Kandas from Balkand to Uttarkand without break.",
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-2xl border border-border bg-card p-5 open:ring-1 open:ring-primary/20 transition-all"
              >
                <summary className="flex items-start justify-between gap-3 cursor-pointer list-none">
                  <h3 className="font-display text-sm font-bold text-foreground flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-primary shrink-0" />
                    <span>{faq.q}</span>
                  </h3>
                  <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground group-open:rotate-90 transition-transform mt-0.5" />
                </summary>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed border-t border-border/50 pt-3 pl-6">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>

      {/* POP-UP BOOKING & EXECUTIVE CONSULTATION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-3xl bg-card border-2 border-primary/30 p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            {/* Close Button */}
            <button
              onClick={() => {
                setIsModalOpen(false);
                setPaymentSuccessMessage(null);
                setPaymentErrorMessage(null);
                setCallbackRequested(false);
              }}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-accent transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Executive Call Notice Header with Image */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-background to-orange-500/10 border border-amber-500/30 flex items-center gap-4">
              <img
                src={vedicPanditsImg}
                alt="AstroVaanii Senior Puja Executive"
                loading="lazy"
                className="h-20 w-20 rounded-2xl object-cover border-2 border-amber-500 shadow-md shrink-0"
              />
              <div className="space-y-1">
                <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-700 dark:text-amber-300 rounded-full">
                  OFFICIAL PUJA EXECUTIVE
                </span>
                <h3 className="font-display text-base font-extrabold text-foreground leading-snug">
                  Our Senior Executive & Acharya Will Call You
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Our dedicated team executive will personally call you to confirm your Sankalp details (Name, Gotra, Date & Venue) and answer all your questions.
                </p>
              </div>
            </div>

            {/* Modal Body / Statuses */}
            {paymentSuccessMessage ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto" />
                <h3 className="font-display text-xl font-bold">Puja Booking Confirmed!</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{paymentSuccessMessage}</p>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl bg-emerald-600 text-white font-bold text-xs px-6 py-2.5 shadow"
                >
                  Done
                </button>
              </div>
            ) : callbackRequested ? (
              <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-3">
                <PhoneCall className="h-12 w-12 text-amber-500 mx-auto" />
                <h3 className="font-display text-xl font-bold">Callback Request Received</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Thank you! Our senior Puja executive will call you within 15 minutes on <strong>{phone || "your contact number"}</strong> to assist with your Akhand Ramayan booking.
                </p>
                <button
                  onClick={() => setCallbackRequested(false)}
                  className="text-xs font-semibold text-primary underline"
                >
                  Back to Instant Payment Options
                </button>
              </div>
            ) : (
              <form onSubmit={handleRazorpayPayment} className="space-y-4">
                {paymentErrorMessage && (
                  <div className="p-3 rounded-xl bg-destructive/10 text-destructive text-xs font-medium border border-destructive/20">
                    {paymentErrorMessage}
                  </div>
                )}

                {/* Package Selected Info */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-accent/50 text-xs">
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase font-bold">SELECTED PACKAGE</span>
                    <span className="font-bold text-foreground">{activePkg.name} ({selectedMode.toUpperCase()})</span>
                  </div>
                  <div className="font-display text-lg font-extrabold text-primary">
                    ₹{activePkg.price.toLocaleString("en-IN")}
                  </div>
                </div>

                {/* Devotee Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      Devotee Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs focus:ring-2 focus:ring-primary/40 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      Gotra (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kashyap"
                      value={gotra}
                      onChange={(e) => setGotra(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs focus:ring-2 focus:ring-primary/40 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs focus:ring-2 focus:ring-primary/40 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs focus:ring-2 focus:ring-primary/40 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Primary Action 1: Razorpay Instant Payment */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-lg hover:opacity-95 transition-all disabled:opacity-50"
                >
                  <CreditCard className="h-4 w-4" />
                  <span>{loading ? "Opening Gateway..." : `Pay & Book Instantly via Razorpay (₹${activePkg.price.toLocaleString("en-IN")})`}</span>
                </button>

                {/* Secondary Action 2: Request Executive Callback */}
                <button
                  type="button"
                  onClick={handleCallbackRequest}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-border bg-background py-3 text-xs font-bold text-foreground hover:bg-accent transition-all"
                >
                  <PhoneCall className="h-3.5 w-3.5 text-primary" />
                  <span>Request Instant Call from Executive</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-10 mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <img src={brandIcon} alt="AstroVaanii" className="h-6 w-6" />
            <span className="font-semibold text-foreground">AstroVaanii Puja Services</span>
            <span>© {new Date().getFullYear()} All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/puja" className="hover:underline">All Pujas</Link>
            <Link to="/disclaimer" className="hover:underline">Disclaimer</Link>
            <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
