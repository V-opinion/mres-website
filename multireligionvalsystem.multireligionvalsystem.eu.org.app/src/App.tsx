import { useState, useEffect, useRef } from "react";
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
import PoliticalContent from "./components/PoliticalContent";
import GuestPosts from "./components/GuestPosts";
import HealthBlogPosts from "./components/HealthBlogPosts";
import AIMagneticBacklinks from "./components/AIMagneticBacklinks";

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
    { label: "Multireligionvalsystem", href: "#multireligion" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass py-3 shadow-lg shadow-black/20"
          : "bg-transparent py-5"
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
        <div className="hidden md:flex items-center gap-8">
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
        <div className="hidden md:flex items-center gap-3">
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
              Demokrati &amp; Fred
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
              Multireligionvalsystem
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
}

// ─── Stats Bar (removed) ──────────────────────────────────────────

// ─── Fred Section ─────────────────────────────────────────────
function FredSection() {
  const pillars = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Konfliktlösning",
      description:
        "Unikt fredskoncept som kan lösa den 78 år långa konflikten mellan Israel och Palestina genom demokratisk utveckling.",
      color: "var(--color-primary)",
      gradient: "from-[#6C5CE7]/20 to-[#6C5CE7]/5",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Fred",
      description:
        "Fred kan inte uppnås med vanlig politik, förhandlingar eller krig — utan genom en avancerad konfliktlösningsmodell.",
      color: "var(--color-accent)",
      gradient: "from-[#00CEC9]/20 to-[#00CEC9]/5",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Fredskoncept",
      description:
        "Ett konfliktövergång som innebär en övergång från kyrkovalet till ett Multireligionvalsystem i de nordiska länderna.",
      color: "var(--color-accent-warm)",
      gradient: "from-[#FD79A8]/20 to-[#FD79A8]/5",
    },
  ];

  return (
    <section id="fred" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.span
            variants={fadeUp}
            className="badge glass-light text-[var(--color-accent)] mb-4 inline-flex"
          >
            <Shield className="w-3.5 h-3.5" />
            Fred & Konfliktlösning
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            På väg mot <span className="text-[var(--color-text-muted)]">en global fred</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto"
          >
            Genom demokratisk utveckling kan vi åstadkomma fred — ett alternativ till traditionell politik och militär makt.
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group relative glass rounded-2xl p-7 sm:p-8 transition-all duration-500 hover:bg-[var(--color-bg-card-hover)] cursor-default"
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${pillar.color}15 0%, transparent 60%)`,
                }}
              />
              <div className="relative z-10">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center mb-5`}
                  style={{ color: pillar.color }}
                >
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: "var(--font-display)" }}>
                  {pillar.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mt-16 glass rounded-2xl p-8 sm:p-10 text-center"
        >
          <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed max-w-2xl mx-auto italic" style={{ fontFamily: "var(--font-display)" }}>
            "Genom denna demokratiutveckling kan vi nämligen åstadkomma fred — något som är omöjligt att uppnå med vanlig politik, förhandlingar, Nobels fredsprisutdelningar, FN, EU eller genom krig."
          </p>
          <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed max-w-2xl mx-auto mt-4">
            The religious parties in the Riksdag and the EU Parliament oppose
            completing the incomplete separation between state and church and
            between religion and politics, which in turn means that the
            78-year-old conflict between Israel and Palestine remains unresolved.
          </p>
          <a
            href="https://multireligionvalsystem.eu.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-[var(--color-accent)] hover:text-white text-sm font-medium transition-colors"
          >
            Utforska fredskonceptet
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Demokrati Section ────────────────────────────────────────
function DemokratiSection() {
  const items = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Demokrati i religion",
      description:
        "De protestantiska trossamfunden i de nordiska länderna har infört demokrati i sina trossamfund genom kyrkovalet.",
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Jämställdhet",
      description:
        "Kyrkovalet gör det möjligt för en kvinna att bli ärkebiskop — ett steg mot full jämställdhet.",
    },
    {
      icon: <Vote className="w-6 h-6" />,
      title: "Ungas rösträtt",
      description:
        "Ungdomar som fyllt 16 år får rösträtt i kyrkovalet så att de får praktisera demokrati två år innan det allmänna valet.",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Religiösa delta i alla val",
      description:
        "De religiösa som normalt inte deltar i allmänna eller EU-valet men deltar i kyrkovalet uppmuntras att även rösta i andra val.",
    },
  ];

  return (
    <section id="demokrati" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--color-primary)] opacity-[0.04] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeUp}
            className="badge glass-light text-[var(--color-primary-light)] mb-4 inline-flex"
          >
            <Landmark className="w-3.5 h-3.5" />
            Demokratisk Utveckling
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Stärk <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary-light)] bg-clip-text text-transparent">demokratin</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-[var(--color-text-secondary)] text-lg max-w-xl mx-auto"
          >
            Hur står det till med demokratin och jämställdheten i ditt parti?
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-7 transition-all duration-300 hover:bg-[var(--color-bg-card-hover)]"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent)]/20 flex items-center justify-center flex-shrink-0 text-[var(--color-primary-light)]">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "var(--font-display)" }}>
                    {item.title}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mt-12 glass rounded-2xl p-8 sm:p-10 border border-[var(--color-accent)]/10"
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Stödröstningens effekter
          </h3>
          <p className="text-[var(--color-text-secondary)] text-[15px] leading-[1.85]">
            Stödröstning är ett politiskt fenomen som innebär att ett parti ger sina röster till ett annat parti för att hjälpa dem att nå över en spärr. Detta kan ha negativa effekter, särskilt för unga politiker och politiker med invandrarbakgrund.
          </p>
          <a
            href="https://asyl-och-flyktingpolitik.multireligionvalsystem.eu.org/ditt-riksdags-parti/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-[var(--color-accent)] hover:text-white text-sm font-medium transition-colors"
          >
            Läs mer om ditt riksdagsparti
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Hållbar Utveckling Section ──────────────────────────────
function HallbarSection() {
  const goals = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Klimatmål",
      description:
        "Klimatmålen följs även av stater, bland annat i Mellanöstern, genom konfliktlösning och demokratisk utveckling.",
      color: "#34D399",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Minska flyktingströmmen",
      description:
        "Kristerssons och Anderssons politik är en av orsakerna till att folk flyr från sina hemländer. En stabil demokrati minskar flyktingtrycket.",
      color: "#FBBF24",
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Bistånd och utveckling",
      description:
        "Genom att lösa konflikter kan biståndet fokuseras på utveckling istället för akut krishantering.",
      color: "#A78BFA",
    },
  ];

  return (
    <section id="hallbar" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.span
            variants={fadeUp}
            className="badge glass-light text-[var(--color-accent-warm)] mb-4 inline-flex"
          >
            <Globe className="w-3.5 h-3.5" />
            Hållbar Utveckling
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            En hållbar <span className="text-[var(--color-text-muted)]">framtid för alla</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto"
          >
            Genom fred och demokratisk utveckling kan klimatmålen nås och flyktingströmmen minskas.
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {goals.map((goal, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group glass rounded-2xl p-7 sm:p-8 transition-all duration-300 hover:bg-[var(--color-bg-card-hover)]"
            >
              <div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mb-5"
                style={{ color: goal.color }}
              >
                {goal.icon}
              </div>
              <h3 className="text-lg font-semibold mb-3" style={{ fontFamily: "var(--font-display)" }}>
                {goal.title}
              </h3>
              <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                {goal.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Multireligionvalsystem Section ──────────────────────────
function MultireligionSection() {
  return (
    <section id="multireligion" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-primary)] opacity-[0.06] blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="relative glass rounded-3xl p-10 sm:p-16 text-center overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />

          <motion.div variants={fadeUp} className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center mx-auto mb-8">
              <Landmark className="w-8 h-8 text-white" strokeWidth={2} />
            </div>

            <motion.span
              className="badge glass-light text-[var(--color-primary-light)] mb-6 inline-flex"
            >
              <Vote className="w-3.5 h-3.5" />
              Kyrkovalsreformen
            </motion.span>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Multireligionvalsystem
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg max-w-xl mx-auto mb-10">
              En övergång från kyrkovalet till ett Multireligionvalsystem i de nordiska länder som redan tillämpar kyrkovalet.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                { num: "1", title: "Demokrati", text: "Demokrati i religion genom kyrkovalet." },
                { num: "2", title: "Jämställdhet", text: "Kvinnor kan bli ärkebiskop." },
                { num: "3", title: "Ungas rösträtt", text: "16-åringar röstar i kyrkovalet." },
                { num: "4", title: "Inkludering", text: "Religiösa delta i alla val." },
              ].map((p) => (
                <div key={p.num} className="glass rounded-xl p-5 border border-white/[0.04] hover:bg-[var(--color-bg-card-hover)] transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)]/15 flex items-center justify-center text-[var(--color-accent)] text-sm font-bold mb-3">
                    {p.num}
                  </div>
                  <h4 className="text-sm font-semibold mb-1" style={{ fontFamily: "var(--font-display)" }}>
                    {p.title}
                  </h4>
                  <p className="text-[var(--color-text-secondary)] text-xs leading-relaxed">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://multireligionvalsystem.eu.org"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <Globe className="w-5 h-5" />
                Utforska Multireligionvalsystem
              </a>
              <a
                href="https://frc.multireligionvalsystem.eu.org/valet-till-frc/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-store"
              >
                <Vote className="w-5 h-5" />
                Valet till FRC
              </a>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-[var(--color-text-muted)] mt-10">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" />
                Fred
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" />
                Demokrati
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" />
                Hållbar Utveckling
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────
function Footer() {
  const footerLinks = [
    {
      title: "Innehåll",
      links: ["Fred", "Demokrati", "Hållbar Utveckling", "Multireligionvalsystem"],
    },
    {
      title: "Resurser",
      links: ["Guest Posts", "Political Content", "FRC"],
    },
    {
      title: "Extern",
      links: ["Multireligionvalsystem", "Asylpolitik"],
    },
  ];

  return (
    <footer className="border-t border-white/[0.04] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center transition-transform group-hover:scale-110">
                <Vote className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span
                className="text-lg font-bold tracking-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Demokratidebatt
              </span>
            </a>
            <p className="text-[var(--color-text-muted)] text-sm leading-relaxed max-w-xs">
              Främjar demokrati, fred och hållbar utveckling genom multireligionvalsystem.
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold mb-4 text-[var(--color-text-secondary)]">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[var(--color-text-muted)] hover:text-white transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="section-divider mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--color-text-muted)]">
            © 2026 Pulse. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {/* Twitter / X */}
            <a
              href="#"
              className="w-9 h-9 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center text-[var(--color-text-muted)] hover:text-white transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="#"
              className="w-9 h-9 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center text-[var(--color-text-muted)] hover:text-white transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="#"
              className="w-9 h-9 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center text-[var(--color-text-muted)] hover:text-white transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App Root ────────────────────────────────────────────────────
function App() {
  const [currentPage, setCurrentPage] = useState<"pulse" | "political" | "guestposts" | "healthblog" | "aimagnetic">("pulse");

  if (currentPage === "political") {
    return <PoliticalContent onBack={() => setCurrentPage("pulse")} onNavigate={setCurrentPage} />;
  }

  if (currentPage === "guestposts") {
    return <GuestPosts onBack={() => setCurrentPage("pulse")} onNavigate={setCurrentPage} />;
  }

  if (currentPage === "healthblog") {
    return <HealthBlogPosts onBack={() => setCurrentPage("pulse")} onNavigate={setCurrentPage} />;
  }

  if (currentPage === "aimagnetic") {
    return <AIMagneticBacklinks onBack={() => setCurrentPage("pulse")} onNavigate={setCurrentPage} />;
  }

  return (
    <div className="min-h-screen relative">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navbar onNavigate={setCurrentPage} />

      {/* Main content */}
      <main>
        <Hero />
        <div className="section-divider" />
        <FredSection />
        <div className="section-divider" />
        <DemokratiSection />
        <div className="section-divider" />
        <HallbarSection />
        <div className="section-divider" />
        <MultireligionSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
