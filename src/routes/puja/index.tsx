import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Sparkles,
  Flame,
  ShieldCheck,
  Search,
  Star,
  BookOpen,
  ChevronRight,
  Video,
  Award,
  Heart,
  CheckCircle2,
  Check,
} from "lucide-react";
import brandIcon from "@/assets/astrovaanii-logo.webp";
import akhandRamayanImg from "@/assets/puja/akhand_ramayan.jpg";
import guruPoojaImg from "@/assets/puja/guru_pooja.jpg";
import hanumanYagyaImg from "@/assets/puja/hanuman_yagya.jpg";
import rudrabhishekImg from "@/assets/puja/rudrabhishek.jpg";
import vedicPanditsImg from "@/assets/puja/vedic_pandits.jpg";
import garudPuranImg from "@/assets/puja/garud_puran.jpg";

// SVG Visual Artwork imports for all 19 Pujas
import ganeshPujaSvg from "@/assets/puja/ganesh_puja.svg";
import navgrahShantiSvg from "@/assets/puja/navgrah_shanti.svg";
import rudrabhishekSvg from "@/assets/puja/rudrabhishek.svg";
import shivParthivSvg from "@/assets/puja/shiv_parthiv.svg";
import satyanarayanSvg from "@/assets/puja/satyanarayan.svg";
import grihaPraveshSvg from "@/assets/puja/griha_pravesh.svg";
import vivahPujaSvg from "@/assets/puja/vivah_puja.svg";
import pitraDoshSvg from "@/assets/puja/pitra_dosh.svg";
import vastuPujaSvg from "@/assets/puja/vastu_puja.svg";
import laxmiPujaSvg from "@/assets/puja/laxmi_puja.svg";
import mahaMrityunjayaSvg from "@/assets/puja/maha_mrityunjaya.svg";
import kalsarpDoshSvg from "@/assets/puja/kalsarp_dosh.svg";
import sundarkandSvg from "@/assets/puja/sundarkand.svg";
import durgaSaptashatiSvg from "@/assets/puja/durga_saptashati.svg";
import vishnuPujaSvg from "@/assets/puja/vishnu_puja.svg";
import shrimadBhagwatSvg from "@/assets/puja/shrimad_bhagwat.svg";
import shivpuranSvg from "@/assets/puja/shivpuran.svg";
import ramKathaSvg from "@/assets/puja/ram_katha.svg";
import deviBhagwatSvg from "@/assets/puja/devi_bhagwat.svg";

export const Route = createFileRoute("/puja/")({
  head: () => ({
    meta: [
      { title: "Online Puja Booking & Vedic Rituals — AstroVaanii" },
      {
        name: "description",
        content:
          "Book 19+ authentic Vedic Pujas: Ganesh Puja, Navgrah Shanti, Rudrabhishek, Satyanarayan, Griha Pravesh, Maha Mrityunjaya, Kalsarp Dosh & Ramayan Paath with live video streaming.",
      },
      { property: "og:title", content: "Online Puja Booking & Vedic Rituals — AstroVaanii" },
      {
        property: "og:description",
        content:
          "Book authentic Vedic Pujas performed by experienced Gurukul Acharyas. Live streaming & home delivery of Prasad.",
      },
      { property: "og:image", content: "/assets/puja/akhand_ramayan.jpg" },
      { property: "og:url", content: "https://astrovaanii.in/puja" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://astrovaanii.in/puja" }],
  }),
  component: PujaListingPage,
});

interface PujaItem {
  id: string;
  title: string;
  slug: string;
  category: "popular" | "special" | "dosh" | "katha" | "path";
  categoryLabel: string;
  discount: string;
  originalPrice: string;
  price: string;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  popular?: boolean;
}

const allPujas: PujaItem[] = [
  {
    id: "akhanda-ramayana",
    title: "Akhand Ramayan Paath Sri Ram Charit Manas",
    slug: "akhanda-ramayana",
    category: "path",
    categoryLabel: "OCCASIONAL PUJA, PATH & YAJNA",
    discount: "-45%",
    originalPrice: "₹21,000",
    price: "₹13,000",
    rating: 4.9,
    reviewsCount: 1420,
    image: akhandRamayanImg,
    description: "24-Hour continuous non-stop chanting of Sri Ramcharitmanas for divine peace, harmony & obstacle removal.",
    popular: true,
  },
  {
    id: "ganesh-puja",
    title: "Ganesh Puja (Vighnaharta Puja)",
    slug: "akhanda-ramayana",
    category: "popular",
    categoryLabel: "POPULAR PUJA, NEW BEGINNINGS",
    discount: "-36%",
    originalPrice: "₹5,500",
    price: "₹3,500",
    rating: 4.9,
    reviewsCount: 1890,
    image: ganeshPujaSvg,
    description: "Invoke Lord Ganesha for removing obstacles, wisdom, prosperity and smooth commencement of new ventures.",
    popular: true,
  },
  {
    id: "navgrah-shanti",
    title: "Navgrah Shanti Puja",
    slug: "akhanda-ramayana",
    category: "dosh",
    categoryLabel: "PLANETARY DOSH, GRAH SHANTI",
    discount: "-40%",
    originalPrice: "₹8,500",
    price: "₹5,100",
    rating: 4.8,
    reviewsCount: 1340,
    image: navgrahShantiSvg,
    description: "Pacifies all 9 planetary afflictions (Grah Dosh) to balance cosmic energies, career and family harmony.",
    popular: true,
  },
  {
    id: "rudrabhishek-puja",
    title: "Shravan Maas Rudrabhishek Puja",
    slug: "akhanda-ramayana",
    category: "popular",
    categoryLabel: "SHIVA PUJA, RITUAL",
    discount: "-39%",
    originalPrice: "₹51,000",
    price: "₹31,000",
    rating: 5.0,
    reviewsCount: 2150,
    image: rudrabhishekImg,
    description: "Sacred Shiva Rudrabhishek for immense positive energy, health, longevity, and planetary peace.",
    popular: true,
  },
  {
    id: "shiv-parthiv",
    title: "Shiv Parthiv Pujan",
    slug: "akhanda-ramayana",
    category: "popular",
    categoryLabel: "SHIVA PUJA, SPECIAL OCCASION",
    discount: "-35%",
    originalPrice: "₹7,000",
    price: "₹4,500",
    rating: 4.9,
    reviewsCount: 780,
    image: shivParthivSvg,
    description: "Custom creation of clay Shivlings for powerful daily Shiva worship, health and fulfillment of desires.",
  },
  {
    id: "satyanarayan",
    title: "Shree Satyanarayan Vrat Katha & Puja",
    slug: "akhanda-ramayana",
    category: "popular",
    categoryLabel: "FAMILY PUJA, VRAT KATHA",
    discount: "-38%",
    originalPrice: "₹5,000",
    price: "₹3,100",
    rating: 4.9,
    reviewsCount: 3120,
    image: satyanarayanSvg,
    description: "Traditional Lord Vishnu Vrat Katha for abundance, family unity, housewarming and monthly gratitude.",
    popular: true,
  },
  {
    id: "griha-pravesh",
    title: "Griha Pravesh & Vastu Shanti Puja",
    slug: "akhanda-ramayana",
    category: "special",
    categoryLabel: "SPECIAL OCCASION, HOUSEWARMING",
    discount: "-37%",
    originalPrice: "₹12,000",
    price: "₹7,500",
    rating: 5.0,
    reviewsCount: 1650,
    image: grihaPraveshSvg,
    description: "Purifies new home vibrations, appeases Vastu Purusha and invites Goddess Laxmi into your new home.",
    popular: true,
  },
  {
    id: "vivah-puja",
    title: "Vedic Vivah Puja (Wedding Rituals)",
    slug: "akhanda-ramayana",
    category: "special",
    categoryLabel: "SPECIAL OCCASION, WEDDING",
    discount: "-40%",
    originalPrice: "₹25,000",
    price: "₹15,000",
    rating: 5.0,
    reviewsCount: 940,
    image: vivahPujaSvg,
    description: "Complete authentic Vedic marriage ceremony rituals, Saptapadi, Kanyadaan and Agni Yajna.",
  },
  {
    id: "pitra-dosh",
    title: "Pitra Dosh Shanti Puja",
    slug: "akhanda-ramayana",
    category: "dosh",
    categoryLabel: "ANCESTRAL DOSH, SHANTI",
    discount: "-35%",
    originalPrice: "₹10,000",
    price: "₹6,500",
    rating: 4.8,
    reviewsCount: 1100,
    image: pitraDoshSvg,
    description: "Calms ancestral afflictions, resolves lineage obstacles, family disputes and child birth delays.",
  },
  {
    id: "vastu-puja",
    title: "Vastu Dosh Nivaaran Puja",
    slug: "akhanda-ramayana",
    category: "dosh",
    categoryLabel: "HOME & OFFICE DOSH",
    discount: "-38%",
    originalPrice: "₹9,000",
    price: "₹5,500",
    rating: 4.9,
    reviewsCount: 870,
    image: vastuPujaSvg,
    description: "Corrects directional energy flaws in home or commercial office space without structural demolition.",
  },
  {
    id: "laxmi-puja",
    title: "Maha Laxmi & Kuber Puja",
    slug: "akhanda-ramayana",
    category: "popular",
    categoryLabel: "WEALTH & PROSPERITY",
    discount: "-36%",
    originalPrice: "₹6,500",
    price: "₹4,100",
    rating: 4.9,
    reviewsCount: 2450,
    image: laxmiPujaSvg,
    description: "Attracts wealth, business growth, financial freedom and divine grace of Mata Laxmi and Lord Kuber.",
    popular: true,
  },
  {
    id: "maha-mrityunjaya",
    title: "Maha Mrityunjaya Jaap & Puja",
    slug: "akhanda-ramayana",
    category: "dosh",
    categoryLabel: "HEALTH & LONGEVITY",
    discount: "-38%",
    originalPrice: "₹18,000",
    price: "₹11,000",
    rating: 5.0,
    reviewsCount: 1780,
    image: mahaMrityunjayaSvg,
    description: "125,000 divine Vedic mantra japa for protection against critical illnesses, accidents and untimely fear.",
    popular: true,
  },
  {
    id: "kalsarp-dosh",
    title: "Kalsarp Dosh Nivaran Puja",
    slug: "akhanda-ramayana",
    category: "dosh",
    categoryLabel: "GRAH DOSH, RAHU-KETU",
    discount: "-35%",
    originalPrice: "₹11,000",
    price: "₹7,100",
    rating: 4.9,
    reviewsCount: 1490,
    image: kalsarpDoshSvg,
    description: "Removes severe Rahu-Ketu snake axis dosha, chronic career blockages and sudden setbacks.",
  },
  {
    id: "sundarkand",
    title: "Sundarkand Paath Online",
    slug: "akhanda-ramayana",
    category: "path",
    categoryLabel: "PATH & RECITATION",
    discount: "-40%",
    originalPrice: "₹7,500",
    price: "₹4,500",
    rating: 4.9,
    reviewsCount: 1980,
    image: sundarkandSvg,
    description: "Melodious Hanuman Sundarkand recital for extreme courage, victory over enemies and mental strength.",
    popular: true,
  },
  {
    id: "durga-saptashati",
    title: "Durga Saptashati Paath & Yajna",
    slug: "akhanda-ramayana",
    category: "path",
    categoryLabel: "DEVI PUJA, PATH",
    discount: "-31%",
    originalPrice: "₹16,000",
    price: "₹11,000",
    rating: 4.9,
    reviewsCount: 860,
    image: durgaSaptashatiSvg,
    description: "Complete 13 Adhyaya Durga Saptashati recitation for destroying negativity and receiving Shakti blessings.",
  },
  {
    id: "vishnu-puja",
    title: "Shree Vishnu Puja & Sahasranama",
    slug: "akhanda-ramayana",
    category: "popular",
    categoryLabel: "VISHNU PUJA",
    discount: "-36%",
    originalPrice: "₹6,000",
    price: "₹3,800",
    rating: 4.8,
    reviewsCount: 920,
    image: vishnuPujaSvg,
    description: "Recitation of Vishnu Sahasranama & Purusha Suktam for supreme peace, dharma and righteous success.",
  },
  {
    id: "shrimad-bhagwat",
    title: "Shrimad Bhagwat Katha Saptah",
    slug: "akhanda-ramayana",
    category: "katha",
    categoryLabel: "GRAND KATHA, 7 DAYS",
    discount: "-39%",
    originalPrice: "₹51,000",
    price: "₹31,000",
    rating: 5.0,
    reviewsCount: 640,
    image: shrimadBhagwatSvg,
    description: "7-Day divine Krishna Leela & Bhagwat Mahapuran katha by eminent Vyas Pith Acharyas for Moksha and joy.",
  },
  {
    id: "shivpuran",
    title: "Maha Shivpuran Katha Saptah",
    slug: "akhanda-ramayana",
    category: "katha",
    categoryLabel: "GRAND KATHA, 7 DAYS",
    discount: "-39%",
    originalPrice: "₹41,000",
    price: "₹25,000",
    rating: 4.9,
    reviewsCount: 510,
    image: shivpuranSvg,
    description: "7-Day sacred Shivpuran katha revealing Lord Shiva's divine glory, Panchakshari glory and liberation.",
  },
  {
    id: "ram-katha",
    title: "Shree Ram Katha Navah Parayan",
    slug: "akhanda-ramayana",
    category: "katha",
    categoryLabel: "GRAND KATHA, 9 DAYS",
    discount: "-37%",
    originalPrice: "₹45,000",
    price: "₹28,000",
    rating: 5.0,
    reviewsCount: 720,
    image: ramKathaSvg,
    description: "9-Day Ramcharitmanas Navah Parayan katha celebrating ideal life, Maryada and Ram Rajya in family.",
  },
  {
    id: "devi-bhagwat",
    title: "Shrimad Devi Bhagwat Katha",
    slug: "akhanda-ramayana",
    category: "katha",
    categoryLabel: "GRAND KATHA, 9 DAYS",
    discount: "-36%",
    originalPrice: "₹55,000",
    price: "₹35,000",
    rating: 5.0,
    reviewsCount: 480,
    image: deviBhagwatSvg,
    description: "9-Day Navratri Special Devi Bhagwat Mahapuran recital invoking the supreme cosmic Mother Goddess energy.",
  },
];

function PujaListingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPujas = allPujas.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "popular" && item.popular) ||
      (selectedCategory === "special" && item.category === "special") ||
      (selectedCategory === "dosh" && item.category === "dosh") ||
      (selectedCategory === "katha" && item.category === "katha") ||
      (selectedCategory === "path" && item.category === "path");

    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Navigation Header */}
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

            <Link to="/kundali-matching" className="hover:text-foreground transition-colors">
              Kundli Matching
            </Link>
            <Link to="/pricing" className="hover:text-foreground transition-colors">
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/puja/akhanda-ramayana"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 text-xs font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Akhand Ramayan
            </Link>
            <Link
              to="/chat"
              className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-xs sm:text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-95 transition-all"
            >
              Consult Astrologer
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8 space-y-14">
        {/* HERO SECTION WITH TITLE & DIVINE ARTWORK */}
        <section className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-amber-500/10 via-background to-orange-500/5 p-6 sm:p-10 lg:p-12 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 border border-amber-500/30 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                <Flame className="h-3.5 w-3.5 text-primary" />
                <span>100% Authentic Vedic Rituals</span>
              </div>

              <div className="space-y-3">
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-[1.15] tracking-tight">
                  Online Puja Booking & <br />
                  <span className="text-primary underline decoration-amber-500/40 underline-offset-8">
                    Sacred Vedic Rituals
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
                  Perform 20+ authentic pujas at holy Tirth Kshetras or at your home. Performed by Gurukul-trained Vedic Pandits with authentic mantras, live HD streaming, and energized Prasad delivered to your doorstep.
                </p>
              </div>

              {/* Key Trust Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-foreground bg-card/80 p-2.5 rounded-xl border border-border/60">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>5,000+ Verified Pandits</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-foreground bg-card/80 p-2.5 rounded-xl border border-border/60">
                  <Video className="h-4 w-4 text-primary shrink-0" />
                  <span>Live HD Video Sankalp</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-foreground bg-card/80 p-2.5 rounded-xl border border-border/60 col-span-2 sm:col-span-1">
                  <Award className="h-4 w-4 text-amber-500 shrink-0" />
                  <span>50,000+ Pujas Done</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/puja/akhanda-ramayana"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-lg hover:opacity-95 transition-all"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Book Akhand Ramayan (₹13,000)</span>
                </Link>

                <a
                  href="#all-pujas"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3.5 text-sm font-bold text-foreground hover:bg-accent transition-all"
                >
                  <span>Explore All 20 Pujas</span>
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Right Images Showcase Collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md">
                {/* Main Hero Card Image */}
                <div className="relative rounded-3xl overflow-hidden border-4 border-card shadow-2xl bg-muted group">
                  <img
                    src={akhandRamayanImg}
                    alt="Akhand Ramayan Sacred Ritual"
                    className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">
                      FEATURED PATH & RITUAL
                    </span>
                    <h3 className="font-display text-lg font-bold">
                      Akhand Ramayan Paath (Sri Ramcharitmanas)
                    </h3>
                    <p className="text-xs text-white/80 mt-0.5">
                      24-Hour Non-stop reciting by 3, 5 or 7 Pandits.
                    </p>
                  </div>
                </div>

                {/* Floating Thumbnail Card 1 */}
                <div className="absolute -bottom-6 -left-6 bg-card border border-border p-2.5 rounded-2xl shadow-xl flex items-center gap-3 w-52 sm:w-60 z-10 backdrop-blur-md">
                  <img
                    src={vedicPanditsImg}
                    alt="Vedic Pandits"
                    className="h-12 w-12 rounded-xl object-cover border border-amber-500/30"
                  />
                  <div>
                    <div className="text-xs font-bold text-foreground">Experienced Pandits</div>
                    <div className="text-[10px] text-muted-foreground">Authentic Vedic Mantras</div>
                  </div>
                </div>

                {/* Floating Badge 2 */}
                <div className="absolute -top-4 -right-4 bg-emerald-600 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 z-10">
                  <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
                  <span>4.9 / 5 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Acharya Aman Uniyal — Guidance Section */}
        <section className="rounded-2xl bg-gradient-to-r from-primary/5 via-background to-amber-500/5 border border-border/70 p-5 sm:p-7">
          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6">
            <div className="relative shrink-0">
              <img
                src="/amanuniyal.webp"
                alt="Acharya Aman Uniyal — Chief Vedic Astrologer"
                className="h-56 w-56 sm:h-48 sm:w-48 rounded-2xl object-cover border-2 border-primary/30 shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-card flex items-center justify-center">
                <Check className="h-3 w-3 text-white stroke-[3]" />
              </div>
            </div>
            <div className="text-center sm:text-left space-y-1.5">
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                GUIDED BY LEADING VEDIC ACHARYA
              </span>
              <h3 className="font-display text-base sm:text-lg font-extrabold text-foreground">
                All Puja Bookings are Under the Guidance of Acharya Aman Uniyal
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
                Every ritual performed through AstroVaanii is personally reviewed and blessed by Acharya Aman Uniyal,
                ensuring authentic Vedic procedures, correct mantra pronunciation, and pure spiritual intent. With years
                of dedicated service in Vedic astrology and ceremonial guidance, Acharya Ji brings unwavering devotion
                and scriptural precision to every puja booked on this platform.
              </p>
            </div>
          </div>
        </section>

        {/* 3 Circular Counter / Trust Cards */}
        <section className="py-4 border-y border-border/60">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Stat 1 */}
            <div className="flex flex-col items-center space-y-3 p-4 rounded-2xl bg-card/50 hover:bg-card transition-colors">
              <div className="relative h-28 w-28 rounded-full overflow-hidden border-4 border-amber-500/30 shadow-md">
                <img
                  src={vedicPanditsImg}
                  alt="5000+ Vedic Pandits"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-display text-2xl font-extrabold text-foreground">
                  5000+ Vedic Pandits
                </h4>
                <p className="text-xs font-medium text-muted-foreground mt-1">
                  Highly Experienced & Verified Vedic Experts
                </p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center space-y-3 p-4 rounded-2xl bg-card/50 hover:bg-card transition-colors">
              <div className="relative h-28 w-28 rounded-full overflow-hidden border-4 border-amber-500/30 shadow-md">
                <img
                  src={akhandRamayanImg}
                  alt="50,000+ Pujas Completed"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-display text-2xl font-extrabold text-foreground">
                  50,000+ Pujas Completed
                </h4>
                <p className="text-xs font-medium text-muted-foreground mt-1">
                  Trusted by 20,000+ Devotees Worldwide
                </p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center space-y-3 p-4 rounded-2xl bg-card/50 hover:bg-card transition-colors">
              <div className="relative h-28 w-28 rounded-full overflow-hidden border-4 border-amber-500/30 shadow-md">
                <img
                  src={hanumanYagyaImg}
                  alt="500+ Puja Services"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-display text-2xl font-extrabold text-foreground">
                  500+ Puja Services
                </h4>
                <p className="text-xs font-medium text-muted-foreground mt-1">
                  All Types of Authentic Vedic Rituals Available
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Search & Filter Header */}
        <section id="all-pujas" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                AUTHENTIC VEDIC RITUALS ({allPujas.length} PUJAS AVAILABLE)
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mt-1">
                Explore All Sacred Pujas
              </h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
                🙏 Experience divine blessings with powerful Vedic rituals performed by expert pandits. 🌸 Book your puja online easily and bring peace, prosperity, and positivity into your life.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search 20 Pujas (e.g. Ganesh, Laxmi, Katha)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-border bg-card pl-9 pr-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: "all", label: `All Pujas (${allPujas.length})` },
              { id: "popular", label: "Most Popular" },
              { id: "special", label: "Special Occasion" },
              { id: "dosh", label: "Dosh Nivaaran" },
              { id: "path", label: "Path & Recitation" },
              { id: "katha", label: "7/9 Day Katha Saptah" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  selectedCategory === tab.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-card border border-border text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* 20 Pujas Grid */}
        <section className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPujas.map((puja) => (
              <div
                key={puja.id}
                className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-card overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  {/* Visual Image Container */}
                  <div className="relative h-56 w-full overflow-hidden bg-muted flex items-center justify-center">
                    <img
                      src={puja.image}
                      alt={puja.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Discount Badge */}
                    <div className="absolute top-3 left-3 bg-emerald-600 text-white font-extrabold text-xs px-2.5 py-1 rounded-md shadow-md">
                      {puja.discount}
                    </div>

                    {/* Star Rating Badge */}
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white text-[11px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                      <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                      <span>{puja.rating}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                      {puja.categoryLabel}
                    </span>

                    <h3 className="font-display text-base font-bold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                      {puja.title}
                    </h3>

                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {puja.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer Price & Action */}
                <div className="p-5 pt-0 space-y-3">
                  <div className="flex items-baseline justify-between border-t border-border/50 pt-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs line-through text-muted-foreground">
                        {puja.originalPrice}
                      </span>
                      <span className="font-display text-lg font-extrabold text-primary">
                        {puja.price}
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      Verified
                    </span>
                  </div>

                  <Link
                    to="/puja/akhanda-ramayana"
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary hover:text-primary-foreground py-2.5 text-xs font-bold text-primary shadow-xs transition-all"
                  >
                    <span>Book Puja Now</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredPujas.length === 0 && (
            <div className="text-center py-16 space-y-4">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto" />
              <h3 className="text-lg font-bold">No Pujas found</h3>
              <p className="text-xs text-muted-foreground">
                Try searching for another ritual name or clear your category filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
              >
                Clear Search & Filters
              </button>
            </div>
          )}
        </section>

        {/* Why Choose AstroVaanii Pujas */}
        <section className="py-8 border-t border-border">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">
              OUR VEDIC GUARANTEE
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">
              Why Devotees Trust AstroVaanii
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Authentic Vedic tradition, certified Acharyas, transparent ritual process.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl border border-border bg-card space-y-3 text-center sm:text-left">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-bold">Certified Pandits</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                All rituals are performed strictly by Gurukul-educated Vedic Acharyas with 15+ years experience.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-card space-y-3 text-center sm:text-left">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <Video className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-bold">Live HD Video Streaming</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Watch your Puja live on HD Zoom/YouTube stream with personalized Sankalp taking your name and gotra.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-card space-y-3 text-center sm:text-left">
              <div className="h-10 w-10 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center">
                <Flame className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-bold">100% Pure Samagri</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We use authentic ingredients: pure cow ghee, organic herbs, Ganga jal, and Vedic flowers.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-card space-y-3 text-center sm:text-left">
              <div className="h-10 w-10 rounded-xl bg-yellow-500/10 text-yellow-700 flex items-center justify-center">
                <Heart className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-bold">Prasad Home Delivery</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Energized Prasad, holy bhasma, and Yantra delivered safely right to your doorstep anywhere in India.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-10 mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <img src={brandIcon} alt="AstroVaanii" className="h-6 w-6" />
            <span className="font-semibold text-foreground">AstroVaanii Puja Services</span>
            <span>© {new Date().getFullYear()} All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/disclaimer" className="hover:underline">Disclaimer</Link>
            <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:underline">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
