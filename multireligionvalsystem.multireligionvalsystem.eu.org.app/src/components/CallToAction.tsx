import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="relative py-16 sm:py-20"
    >
      <div className="max-w-3xl mx-auto px-6">
        <div className="glass rounded-3xl p-8 sm:p-12 text-center border border-[var(--color-accent)]/15 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[var(--color-accent)] opacity-[0.08] blur-[100px] rounded-full" />
          </div>

          <div className="relative z-10">
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Vad tycker du?
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg sm:text-xl leading-relaxed mb-8 max-w-xl mx-auto">
              Hur lösa den 78 år långa konflikten mellan Israel och Palestina?
            </p>
            <a
              href="https://asyl-och-flyktingpolitik.multireligionvalsystem.eu.org/Call-to-Action/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-8 py-4"
            >
              👉 Engagera dig nu! 🤑
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
