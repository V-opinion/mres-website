iimport { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Zap,
  Shield,
  Globe,
  ArrowRight,
  Star,
  CheckCircle2,
  Menu,
  X,
  Download,
  Play,
  Users,
  Scale,
  Vote,
  BookOpen,
  Landmark,
} from "lucide-react";
import relaxEvent from "../assets/aigc/images/relax-event.webp";
import fredBlad from "../assets/aigc/images/fred-blad.png";
import PoliticalContent from "./components/PoliticalContent";
import GuestPosts from "./components/GuestPosts";
import HealthBlogPosts from "./components/HealthBlogPosts";
import AIMagneticBacklinks from "./components/AIMagneticBacklinks";
import SocialBar from "./components/SocialBar";
import CallToAction from "./components/CallToAction";

// ─── Animation Variants ──────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Custom Hook: Use Animated Counter ───────────────────────────
function useCounter(end: number, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!startOnView || !isInView || hasStarted.current) return;
    hasStarted.current = true;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, end, duration, startOnView]);

  return { count, ref };
}

// ─── Navbar ──────────────────────────────────────────────────────
function Navbar({ onNavigate }: { onNavigate: (page: "pulse" | "political" | "guestposts" | "healthblog" | "aimagnetic") => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Fred", href: "#fred" },
    { label: "Demokrati", href: "#demokrati" },
    { label: "Hållbar Utveckling", href: "#hallbar" },
    { label: "MRES", href: "#multireligion" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass py-3 shadow-lg shadow-black/20"
          : "bg-[#0a0a1a]/80 backdrop-blur-md py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3">
            <Vote className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <span
            className="text-xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Demokratidebatt
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[var(--color-text-secondary)] hover:text-white text-sm font-medium transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-primary)] group-hover:w-full transition-all duration-300 rounded-full" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-5 ml-6">
          <button
            onClick={() => onNavigate("aimagnetic")}
            className="text-[var(--color-text-secondary)] hover:text-white text-sm font-medium transition-colors duration-300"
          >
            Backlinks
          </button>
          <button
            onClick={() => onNavigate("healthblog")}
            className="text-[var(--color-text-secondary)] hover:text-white text-sm font-medium transition-colors duration-300"
          >
            Hälsa
          </button>
          <button
            onClick={() => onNavigate("guestposts")}
            className="text-[var(--color-text-secondary)] hover:text-white text-sm font-medium transition-colors duration-300"
          >
            Guest Posts
          </button>
          <button
            onClick={() => onNavigate("political")}
            className="text-[var(--color-text-secondary)] hover:text-white text-sm font-medium transition-colors duration-300"
          >
            Demokrati
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-[var(--color-text-secondary)] hover:text-white transition-colors"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[var(--color-text-secondary)] hover:text-white text-sm font-medium py-2 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { setMobileOpen(false); onNavigate("aimagnetic"); }}
                className="text-[var(--color-text-secondary)] hover:text-white text-sm font-medium py-2 text-left transition-colors"
              >
                Backlinks
              </button>
              <button
                onClick={() => { setMobileOpen(false); onNavigate("healthblog"); }}
                className="text-[var(--color-text-secondary)] hover:text-white text-sm font-medium py-2 text-left transition-colors"
              >
                Hälsa
              </button>
              <button
                onClick={() => { setMobileOpen(false); onNavigate("guestposts"); }}
                className="text-[var(--color-text-secondary)] hover:text-white text-sm font-medium py-2 text-left transition-colors"
              >
                Guest Posts
              </button>
              <button
                onClick={() => { setMobileOpen(false); onNavigate("political"); }}
                className="text-[var(--color-text-secondary)] hover:text-white text-sm font-medium py-2 text-left transition-colors"
              >
                Demokrati
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── Hero Section ────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden gradient-mesh">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[var(--color-primary)] rounded-full opacity-[0.07] blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[var(--color-accent)] rounded-full opacity-[0.07] blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-accent-warm)] rounded-full opacity-[0.04] blur-[150px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-16 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-3xl mx-auto text-center"
        >
          <motion.div variants={fadeUp} className="mb-6">
            <span className="badge glass-light text-[var(--color-accent)] border border-[var(--color-accent)]/20">
              <Sparkles className="w-3.5 h-3.5" />
              Demokratidebatt{' '}&{' '}Fred
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Demokratidebatt
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-[var(--color-text-secondary)] text-lg sm:text-xl leading-relaxed max-w-lg mx-auto mb-8"
          >
            Främjar demokrati, fred och hållbar utveckling genom multireligionvalsystem.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center mb-10">
            <a href="#fred" className="btn-primary">
              <Shield className="w-5 h-5" />
              Utforska Fred
            </a>
            <a href="#multireligion" className="btn-store">
              <Landmark className="w-5 h-5" />
              MRES
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-6 flex-wrap justify-center">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" />
              <span className="text-sm text-[var(--color-text-secondary)]">
                78 år lång konflikt
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
              <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" />
              Fredskoncept
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
