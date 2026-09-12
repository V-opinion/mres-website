import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Shield,
  AlertTriangle,
  Users,
  BookOpen,
  Vote,
  ExternalLink,
  ArrowLeft,
  Landmark,
  Scale,
  CheckCircle,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

/* ─── Accordion Section ───────────────────────────────────────── */
function AccordionSection({
  icon,
  title,
  children,
  defaultOpen = false,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="glass rounded-2xl overflow-hidden mb-4 transition-all duration-300 hover:bg-[var(--color-bg-card-hover)]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-6 sm:p-7 text-left group"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent)]/20 flex items-center justify-center flex-shrink-0 text-[var(--color-primary-light)] group-hover:text-[var(--color-accent)] transition-colors">
          {icon}
        </div>
        <h3
          className="text-lg sm:text-xl font-semibold flex-1"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h3>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-[var(--color-text-muted)]"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 sm:px-7 pb-7 text-[var(--color-text-secondary)] text-[15px] leading-[1.85] space-y-5">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Highlight Quote ─────────────────────────────────────────── */
function HighlightQuote({ text }: { text: string }) {
  return (
    <div className="relative pl-5 border-l-2 border-[var(--color-accent)]/50 py-2">
      <p
        className="text-[var(--color-text-primary)] text-base sm:text-lg italic leading-relaxed"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {text}
      </p>
    </div>
  );
}

/* ─── Info Card ───────────────────────────────────────────────── */
function InfoCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/[0.03] rounded-xl p-4 sm:p-5 border border-white/[0.04]">
      <span className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-wider mb-2 block">
        {label}
      </span>
      <div className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}

/* ─── Main Component ──────────────────────────────────────────── */
export default function PoliticalContent({
  onBack,
  onNavigate,
}: {
  onBack: () => void;
  onNavigate: (page: "pulse" | "political" | "guestposts" | "healthblog" | "aimagnetic") => void;
}) {
  return (
    <div className="min-h-screen gradient-mesh">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 glass py-3 shadow-lg shadow-black/20"
      >
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-white transition-colors text-sm font-medium group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Tillbaka
          </button>
          <span
            className="text-sm font-semibold text-[var(--color-text-muted)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Demokrati &amp; Stödröstning
          </span>
        </div>
      </motion.header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 pt-24 pb-20">
        {/* Hero area */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-12 sm:mb-16"
        >
          <motion.div variants={fadeUp} className="mb-6">
            <span className="badge glass-light text-[var(--color-accent-warm)] border border-[var(--color-accent-warm)]/20 inline-flex">
              <AlertTriangle className="w-3.5 h-3.5" />
              Politisk Debatt
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Ditt riksdagspartis stödröstning kan drabba dig som ung
            politiker — därför skall du sätta stopp för det
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-[var(--color-text-secondary)] text-lg leading-relaxed max-w-2xl"
          >
            Stödröstningens negativa effekter som kan drabba mest politiker
            med invandrarbakgrund. Hur står det till med demokratin och
            jämställdheten i ditt riksdagsparti?
          </motion.p>
        </motion.div>

        {/* Key questions banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="glass rounded-2xl p-6 sm:p-8 mb-10 border border-[var(--color-accent)]/10"
        >
          <h2
            className="text-xl sm:text-2xl font-bold mb-4 text-[var(--color-text-primary)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Grundläggande Frågor
          </h2>
          <ul className="space-y-3">
            {[
              "Är det en gammal företeelse att riksdagspartierna snuvar ungdomarna och politiker med invandrarbakgrund på deras mandat?",
              "Du skall vara på din vakt och bevaka vilka mandat ditt parti får i form av stödröster från ett annat parti eller tvärtom — t.ex. M och SD stödröstar så att L når över spärren.",
              "Hur står det till med demokratin och jämställdheten i ditt parti?",
            ].map((q, i) => (
              <li key={i} className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5" />
                <span className="text-[var(--color-text-secondary)] leading-relaxed">
                  {q}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Accordion sections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {/* Section 1: Stödröstning */}
          <AccordionSection
            icon={<Vote className="w-5 h-5" />}
            title="Stödröstning &amp; Ungdomars Mandat"
            defaultOpen={true}
          >
            <p>
              Stödröstning är ett politiskt fenomen som innebär att ett
              parti ger sina röster till ett annat parti för att hjälpa dem
              att nå över en spärr. Detta kan ha negativa effekter, särskilt
              för unga politiker och politiker med invandrarbakgrund.
            </p>
            <p>
              Att Liberalismen dök upp som en följd av tre revolutioner:
              John Locke den engelska 1688 — &quot;den styrande fick sin makt av
              folket istället för Gud och att folket hade rätt att byta ut
              misshagliga härskare&quot; — den amerikanska 1776 och den franska
              revolutionen 1776 till Mohamsson, som skall räddas av SD.
            </p>
            <HighlightQuote text="Den styrande fick sin makt av folket istället för Gud och att folket hade rätt att byta ut misshagliga härskare." />

            <InfoCard label="Läs mer">
              <a
                href="https://asyl-och-flyktingpolitik.multireligionvalsystem.eu.org/ditt-riksdags-parti/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent)] hover:underline inline-flex items-center gap-1"
              >
                Multireligionvalsystem — Ditt riksdagsparti
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </InfoCard>
          </AccordionSection>

          {/* Section 2: M, SD, L */}
          <AccordionSection
            icon={<Users className="w-5 h-5" />}
            title="M, SD &amp; L — Stödröstningens Konsekvenser"
          >
            <p>
              Att M ligger på 16 % tolkas som om att Kristersson
              stödröstade, d.v.s. skänkte 2 % till L. I dessa 2 % kan ingå
              unga politiker och politiker med invandrarbakgrund.
            </p>
            <p>
              Kristersson omfamnades av SD och L omfamnade SD samtidigt som
              M. Andersson leder den opposition som hon själv har kvävt.
              Denna svenska politiska efterblivenhet tillsammans med
              kyrkovalet som dessa partier deltar i samtidigt som de
              exkluderar andra politiker tillhörande andra trossamfund än
              protestantiska och som ger stöd till Israel och Israels
              folkmord på palestinier i Gaza.
            </p>
            <HighlightQuote text="Den styrande fick sin makt av folket istället för Gud och att folket hade rätt att byta ut misshagliga härskare." />
            <p>
              Kristersson gick in i kaklet för att rädda L. SD:s fälla har
              lett till att SD blivit större än M.
            </p>
          </AccordionSection>

          {/* Section 3: Leijonborg & C */}
          <AccordionSection
            icon={<BookOpen className="w-5 h-5" />}
            title="Leijonborg, C &amp; Ungas Framtid"
          >
            <p>
              Vad sänder den 77-årige fd partiledare Lars Leijonborg för
              signal till unga politiker som har kämpat inom L för att även de
              skall kunna bli riksdagsledamöter på samma sätt som när
              Leijonborg var ung för mer än 50 år sedan?
            </p>
            <HighlightQuote text="Den styrande fick sin makt av folket istället för Gud och att folket hade rätt att byta ut misshagliga härskare." />

            <p>
              Vad sänder C för signaler till de politiker som har kämpat
              inom Centerpartiet för att bli riksdagsledamöter på samma sätt
              som Birgitta Olsson när hon var ung och medlem i L men som
              plötsligt bytte parti till C och därmed fick samma roll som
              Elisabeth Thand Ringqvist.
            </p>
            <HighlightQuote text="Den styrande fick sin makt av folket istället för Gud och att folket hade rätt att byta ut misshagliga härskare." />
          </AccordionSection>

          {/* Section 4: M's nomineringar */}
          <AccordionSection
            icon={<Shield className="w-5 h-5" />}
            title="M:s Valberedning &amp; Offrade Mandat"
          >
            <p>
              När M:s valbereding nominerade unga politiker och de med
              invandrarbakgrund hade M 19 % av väljarstödet. Men sedan har
              det visat sig att Kristersson bara får 16 %.
            </p>
            <p>
              Vilka är det som ingår i de cirka 3 % som Kristersson offrat
              för att rädda L? Placerade M:s valberedning dem sist på sina
              valsedlar så att de aldrig skulle bli valda?
            </p>
            <p>
              S och M som i sin tur lurade V, MP och C att överge
              neutraliteten och alliansfriheten till förmån för
              militäralliansen NATO och DCA-avtalet utan en föregående
              folkomröstning. Detta samtidigt som varken S eller C vill ha V
              i regeringen efter valet. Då återstår bara ett nyval.
            </p>
          </AccordionSection>

          {/* Section 5: Utrikespolitik & Nazism */}
          <AccordionSection
            icon={<AlertTriangle className="w-5 h-5" />}
            title="Utrikespolitik &amp; Demokratiska Hot"
          >
            <p>
              Kristersson och Andersson som inte klarar av den svenska
              utrikespolitiken och som tillåtit att SD sitter i
              Kristerssons regeringskansli har bidragit till utvecklingen i
              Tyskland och nazistisk härjning.
            </p>
            <p>
              Ett land som Tyskland som har startat två världskrig genom två
              demokratiska val och valet av Hitler — detta demokratiska mönster
              ser likadant ut nu i Sverige och detta kan bidra till att
              nazisterna startar ett tredje världskrig. Därför är vare sig
              Kristersson eller Andersson lämpliga att styra landet.
            </p>
          </AccordionSection>

          {/* Section 6: Religion & Stat */}
          <AccordionSection
            icon={<BookOpen className="w-5 h-5" />}
            title="Religion, Stat &amp; Fredskoncept"
          >
            <p>
              All detta och de religiösa partierna i riksdagen och
              EU-parlamentet motarbetar att fullborda den ofullbordade
              separationen mellan stat och kyrka samt mellan religion och
              politik, vilket i sin tur gör att den 78 år långa konflikten
              mellan Israel och Palestina förblir olöst.
            </p>
            <p>
              The religious parties in the Riksdag and the EU Parliament
              oppose completing the incomplete separation between state and
              church and between religion and politics, which in turn means
              that the 78-year-old conflict between Israel and Palestine
              remains unresolved.
            </p>
            <p>
              Kristerssons och Anderssons politik är en av orsakerna till att
              folk flyr från sina hemländer.
            </p>
            <HighlightQuote text="Den styrande fick sin makt av folket istället för Gud och att folket hade rätt att byta ut misshagliga härskare." />

            <InfoCard label="Fred &amp; Konfliktlösningsmodell">
              <a
                href="https://multireligionvalsystem.eu.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent)] hover:underline inline-flex items-center gap-1"
              >
                Multireligionvalsystem — FRED
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="text-[var(--color-text-muted)] block mt-2">
                Unikt fredskoncept och unikt konfliktlösningskoncept som kan
                lösa den 78 år långa konflikten mellan Israel och Palestina.
                Engagera dig nu!
              </span>
            </InfoCard>

            <InfoCard label="FRC — Valet">
              <a
                href="https://frc.multireligionvalsystem.eu.org/valet-till-frc/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent)] hover:underline inline-flex items-center gap-1"
              >
                Valet till FRC
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </InfoCard>
          </AccordionSection>

          {/* Section 7: Kyrkovalsreformen & Multireligionvalsystem */}
          <AccordionSection
            icon={<Landmark className="w-5 h-5" />}
            title="Kyrkovalsreformen &amp; Multireligionvalsystem"
          >
            <p>
              Att åstadkomma en fullbordad separation mellan stat och kyrka
              samt mellan religion och politik. Målet med kyrkovalsreformen är
              att upprätthålla de tre mycket viktiga positiva grunder som
              kyrkovalet har infört:
            </p>

            {/* Four pillars */}
            <div className="grid sm:grid-cols-2 gap-4 my-6">
              {[
                {
                  num: "1",
                  title: "Demokrati i religion",
                  text: "De protestantiska trossamfunden i de nordiska länderna har infört demokrati i sina trossamfund genom kyrkovalet.",
                },
                {
                  num: "2",
                  title: "Jämställdhet",
                  text: "Kyrkovalet gör det möjligt för en kvinna att bli ärkebiskop.",
                },
                {
                  num: "3",
                  title: "Ungas rösträtt",
                  text: "Ungdomar som fyllt 16 år får rösträtt i kyrkovalet så att de får praktisera demokrati två år innan det allmänna valet eller EU-valet.",
                },
                {
                  num: "4",
                  title: "Religiösa delta i alla val",
                  text: "De religiösa som normalt inte deltar i allmänna eller EU-valet men deltar i kyrkovalet uppmuntras att även rösta i andra val.",
                },
              ].map((pillar) => (
                <div
                  key={pillar.num}
                  className="glass rounded-xl p-5 border border-white/[0.04] hover:bg-[var(--color-bg-card-hover)] transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)]/15 flex items-center justify-center text-[var(--color-accent)] text-sm font-bold">
                      {pillar.num}
                    </div>
                    <h4
                      className="text-sm font-semibold text-[var(--color-text-primary)]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {pillar.title}
                    </h4>
                  </div>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                    {pillar.text}
                  </p>
                </div>
              ))}
            </div>

            <p>
              Genom denna demokratiutveckling kan vi nämligen åstadkomma
              fred — något som är omöjligt att uppnå med vanlig politik,
              förhandlingar, Nobels fredsprisutdelningar, FN, EU eller genom
              krig.
            </p>

            <HighlightQuote text="Detta konfliktövergång och avancerade konfliktlösningsmodell innebär en övergång från kyrkovalet till ett Multireligionvalsystem i de nordiska länder som redan tillämpar kyrkovalet." />

            <p>
              I övriga länder införs direkt Multireligionvalsystem. Målet är
              att den 78 år långa konflikten mellan Israel och Palestina på
              det sättet förhindras från att den olösta konflikten överförs
              till nästa generation. Detta bidrar i sin tur till att
              klimatmålen följs även av stater, bland annat i Mellanöstern.
            </p>

            <div className="space-y-2 mt-4">
              <InfoCard label="Fredskoncept">
                <a
                  href="https://multireligionvalsystem.eu.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-accent)] hover:underline inline-flex items-center gap-1"
                >
                  Multireligionvalsystem — FRED
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </InfoCard>
              <InfoCard label="FRC — Valet">
                <a
                  href="https://frc.multireligionvalsystem.eu.org/valet-till-frc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-accent)] hover:underline inline-flex items-center gap-1"
                >
                  Valet till FRC
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </InfoCard>
            </div>
          </AccordionSection>

          {/* Section 8: Slutord */}
          <div className="glass rounded-2xl p-6 sm:p-8 mb-4 border border-[var(--color-primary)]/15">
            <h2
              className="text-xl sm:text-2xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Slutord
            </h2>
            <div className="space-y-5 text-[var(--color-text-secondary)] text-[15px] leading-[1.85]">
              <p>
                Ditt riksdagspartis stödröstning kan drabba dig som ung
                politiker — därför skall du sätta stopp för det. Stödröstningens
                negativa effekter kan drabba mest politiker med
                invandrarbakgrund.
              </p>
              <p>
                Hur står det till med demokratin och jämställdheten i ditt
                parti?
              </p>
              <HighlightQuote text="Den styrande fick sin makt av folket istället för Gud och att folket hade rätt att byta ut misshagliga härskare." />

              <div className="space-y-2">
                <InfoCard label="Läs vidare">
                  <a
                    href="https://asyl-och-flyktingpolitik.multireligionvalsystem.eu.org/ditt-riksdags-parti/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-accent)] hover:underline inline-flex items-center gap-1"
                  >
                    Multireligionvalsystem — Ditt riksdagsparti
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </InfoCard>
                <InfoCard label="FRED">
                  <a
                    href="https://multireligionvalsystem.eu.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-accent)] hover:underline inline-flex items-center gap-1"
                  >
                    Multireligionvalsystem — Unikt fredskoncept
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </InfoCard>
                <InfoCard label="FRC">
                  <a
                    href="https://frc.multireligionvalsystem.eu.org/valet-till-frc/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-accent)] hover:underline inline-flex items-center gap-1"
                  >
                    Valet till FRC
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </InfoCard>
              </div>
            </div>
          </div>

          {/* Internal Links */}
          <div className="glass rounded-2xl p-6 sm:p-8 border border-[var(--color-accent)]/10">
            <h3
              className="text-lg font-bold mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Relaterat innehåll
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <button
                onClick={() => onNavigate("guestposts")}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors text-left group"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/15 flex items-center justify-center text-[var(--color-accent)]">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold group-hover:text-[var(--color-accent)] transition-colors">
                    Guest Posts
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Djupgående analyser
                  </p>
                </div>
              </button>
              <button
                onClick={() => onNavigate("healthblog")}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors text-left group"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/15 flex items-center justify-center text-[var(--color-accent)]">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold group-hover:text-[var(--color-accent)] transition-colors">
                    Hälsa &amp; Demokrati
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Koppling till folkhälsa
                  </p>
                </div>
              </button>
              <button
                onClick={() => onNavigate("aimagnetic")}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors text-left group"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/15 flex items-center justify-center text-[var(--color-accent)]">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold group-hover:text-[var(--color-accent)] transition-colors">
                    AI-Magnetic Backlinks
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Forskningsartiklar
                  </p>
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
