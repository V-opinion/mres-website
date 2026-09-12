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
  ArrowRight,
  Landmark,
  Scale,
  Calendar,
  Clock,
  User,
  Tag,
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

/* ─── Blog Post Card ──────────────────────────────────────────── */
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  author: string;
  date: string;
  readTime: string;
  tag: string;
  tagColor: string;
}

function BlogPostCard({
  post,
  onReadMore,
}: {
  post: BlogPost;
  onReadMore: (post: BlogPost) => void;
}) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -4 }}
      className="glass rounded-2xl overflow-hidden transition-all duration-300 hover:bg-[var(--color-bg-card-hover)] cursor-pointer group"
      onClick={() => onReadMore(post)}
    >
      <div className="p-6 sm:p-7">
        <div className="flex items-center gap-3 mb-4">
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{
              backgroundColor: `${post.tagColor}15`,
              color: post.tagColor,
            }}
          >
            {post.tag}
          </span>
          <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        </div>

        <h3
          className="text-lg sm:text-xl font-bold mb-3 group-hover:text-[var(--color-accent)] transition-colors"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {post.title}
        </h3>

        <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
            <User className="w-3.5 h-3.5" />
            <span>{post.author}</span>
            <span>·</span>
            <Calendar className="w-3.5 h-3.5" />
            <span>{post.date}</span>
          </div>
          <span className="text-[var(--color-accent)] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
            Läs mer
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Full Blog Post View ─────────────────────────────────────── */
function FullBlogPost({
  post,
  onBack,
}: {
  post: BlogPost;
  onBack: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-white transition-colors text-sm font-medium mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Tillbaka till alla inlägg
      </button>

      <article className="glass rounded-2xl p-6 sm:p-10">
        <div className="flex items-center gap-3 mb-6">
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{
              backgroundColor: `${post.tagColor}15`,
              color: post.tagColor,
            }}
          >
            {post.tag}
          </span>
          <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        </div>

        <h1
          className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-6 leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {post.title}
        </h1>

        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/[0.06]">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center text-white text-sm font-bold">
            {post.author
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p className="text-sm font-semibold">{post.author}</p>
            <p className="text-xs text-[var(--color-text-muted)]">
              {post.date}
            </p>
          </div>
        </div>

        <div className="space-y-5 text-[var(--color-text-secondary)] text-[15px] leading-[1.85]">
          {post.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-white/[0.06]">
          <a
            href="https://multireligionvalsystem.eu.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[var(--color-accent)] hover:text-white text-sm font-medium transition-colors"
          >
            Läs mer på Multireligionvalsystem
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </article>
    </motion.div>
  );
}

/* ─── Blog Data ───────────────────────────────────────────────── */
const blogPosts: BlogPost[] = [
  {
    id: "stodrostning-ungdomar",
    title: "Stödröstning: Hur partier kan snuva unga politiker på deras mandat",
    excerpt:
      "Stödröstning är ett politiskt fenomen som kan ha allvarliga konsekvenser för unga politiker och politiker med invandrarbakgrund. Här analyserar vi hur detta påverkar demokratin i Sverige.",
    content: [
      "Stödröstning är ett politiskt fenomen som innebär att ett parti ger sina röster till ett annat parti för att hjälpa dem att nå över en spärr. Detta kan ha negativa effekter, särskilt för unga politiker och politiker med invandrarbakgrund.",
      "När M:s valbereding nominerade unga politiker och de med invandrarbakgrund hade M 19 % av väljarstödet. Men sedan har det visat sig att Kristersson bara får 16 %. Vilka är det som ingår i de cirka 3 % som Kristersson offrat för att rädda L?",
      "Placerade M:s valberedning dem sist på sina valsedlar så att de aldrig skulle bli valda? Detta är en fråga som varje ung politiker bör ställa sig. Stödröstningens negativa effekter kan drabba mest politiker med invandrarbakgrund.",
      "Du skall vara på din vakt och bevaka vilka mandat ditt parti får i form av stödröster från ett annat parti eller tvärtom — t.ex. M och SD stödröstar så att L når över spärren. Detta påverkar direkt vilka unga politiker som får chansen att representera dig i riksdagen.",
      "Den styrande fick sin makt av folket istället för Gud och att folket hade rätt att byta ut misshagliga härskare. Denna grundläggande demokratisk princip hotas när stödröstning används för att manipulera mandatfördelningen.",
    ],
    author: "Demokratidebatt",
    date: "11 sep 2026",
    readTime: "5 min läsning",
    tag: "Demokrati",
    tagColor: "#6C5CE7",
  },
  {
    id: "kyrkovalsreformen",
    title: "Kyrkovalsreformen: Nyckeln till demokrati i religion och jämställdhet",
    excerpt:
      "De nordiska ländernas protestantiska trossamfund har infört demokrati genom kyrkovalet. Nu är det dags att擴er dessa värdefulla principer till alla trossamfund.",
    content: [
      "De protestantiska trossamfunden i de nordiska länderna har infört demokrati i sina trossamfund genom kyrkovalet. Detta är en historisk prestation som visar att demokrati kan blomstra även inom religiösa samfund.",
      "Kyrkovalet gör det möjligt för en kvinna att bli ärkebiskop — ett steg mot full jämställdhet. Detta är inte bara en symbolisk förändring utan en fundamental omvändning av maktstrukturen inom kyrkan.",
      "Ungdomar som fyllt 16 år får rösträtt i kyrkovalet så att de får praktisera demokrati två år innan det allmänna valet eller EU-valet. Detta ger ungdomar en unik möjlighet att utveckla sitt demokratiska medvetande tidigt.",
      "De religiösa som normalt inte deltar i allmänna eller EU-valet men deltar i kyrkovalet uppmuntras att även rösta i andra val. Genom detta kan vi öka det demokratiska deltagandet i hela samhället.",
      "Målet med kyrkovalsreformen är att扩建ra dessa tre mycket viktiga positiva grundor till alla trossamfund — Judendom, Islam, Buddhismen, Hinduism samt andra kristna som katoliker och ortodoxa. Genom att göra detta kan vi åstadkomma en fullbordad separation mellan stat och kyrka samt mellan religion och politik.",
    ],
    author: "Kyrkovalsreformen",
    date: "10 sep 2026",
    readTime: "6 min läsning",
    tag: "Kyrkoval",
    tagColor: "#00CEC9",
  },
  {
    id: "fredskoncept",
    title: "Fredskonceptet: Hur demokrati kan lösa konflikter utan krig",
    excerpt:
      "Fred kan inte uppnås med vanlig politik, förhandlingar eller krig — utan genom en avancerad konfliktlösningsmodell som bygger på demokratisk utveckling.",
    content: [
      "Genom denna demokratiutveckling kan vi nämligen åstadkomma fred — något som är omöjligt att uppnå med vanlig politik, förhandlingar, Nobels fredsprisutdelningar, FN, EU eller genom krig.",
      "The religious parties in the Riksdag and the EU Parliament oppose completing the incomplete separation between state and church and between religion and politics, which in turn means that the 78-year-old conflict between Israel and Palestine remains unresolved.",
      "Detta konfliktövergång och avancerade konfliktlösningsmodell innebär en övergång från kyrkovalet till ett Multireligionvalsystem i de nordiska länder som redan tillämpar kyrkovalet. I övriga länder införs direkt Multireligionvalsystem.",
      "Målet är att den 78 år långa konflikten mellan Israel och Palestina på det sättet förhindras från att den olösta konflikten överförs till nästa generation. Detta bidrar i sin tur till att klimatmålen följs även av stater, bland annat i Mellanöstern.",
      "Fredskonceptet bygger på insikten att politiska lösningar och militär makt aldrig kan skapa varaktig fred. Istället måste vi bygga demokratiska strukturer som gör det möjligt för alla parter att delta i beslutsfattandet.",
      "En stabil demokrati minskar flyktingtrycket. Kristerssons och Anderssons politik är en av orsakerna till att folk flyr från sina hemländer. Genom att lösa konflikter kan biståndet fokuseras på utveckling istället för akut krishantering.",
    ],
    author: "Fredskoncept",
    date: "9 sep 2026",
    readTime: "5 min läsning",
    tag: "Fred",
    tagColor: "#FD79A8",
  },
  {
    id: "separation-kyrka-stat",
    title: "Separation mellan stat och kyrka: Den ofullbordade uppgiften",
    excerpt:
      "Religiösa partier i riksdagen och EU-parlamentet motarbetar att fullborda den ofullbordade separationen mellan stat och kyrka samt mellan religion och politik.",
    content: [
      "All detta och de religiösa partierna i riksdagen och EU-parlamentet motarbetar att fullborda den ofullbordade separationen mellan stat och kyrka samt mellan religion och politik, vilket i sin tur gör att den 78 år långa konflikten mellan Israel och Palestina förblir olöst.",
      "The religious parties in the Riksdag and the EU Parliament oppose completing the incomplete separation between state and church and between religion and politics, which in turn means that the 78-year-old conflict between Israel and Palestine remains unresolved.",
      "Att Liberalismen dök upp som en följd av tre revolutioner: John Locke den engelska 1688 — \"den styrande fick sin makt av folket istället för Gud och att folket hade rätt att byta ut misshagliga härskare\" — den amerikanska 1776 och den franska revolutionen 1776.",
      "Denna grundläggande demokratisk princip — att makt kommer från folket, inte från Gud — måste tillämpas konsekvent i alla delar av samhället, inklusive inom religiösa samfund.",
      "Genom Multireligionvalsystem kan vi skapa en ram där alla religioner kan utöva sin demokrati på ett sätt som respekterar både religiösa övertygelser och demokratiska principer.",
      "Den styrande fick sin makt av folket istället för Gud och att folket hade rätt att byta ut misshagliga härskare. Denna sanning måste vara grunden för all politik i Sverige och i hela världen.",
    ],
    author: "Stat & Kyrka",
    date: "8 sep 2026",
    readTime: "4 min läsning",
    tag: "Politik",
    tagColor: "#FBBF24",
  },
  {
    id: "multireligionvalsystem",
    title: "Multireligionvalsystem: Framtidens demokratiska modell",
    excerpt:
      "Multireligionvalsystemet erbjuder en unik möjlighet att föra samman demokrati och religion på ett sätt som främjar fred och förståelse mellan olika trosuppfattningar.",
    content: [
      "Multireligionvalsystem är en övergång från kyrkovalet till ett system som inkluderar alla religioner. Detta innebär en fundamental förändring av hur vi förstår relationen mellan demokrati och religion.",
      "De fyra pelarna i Multireligionvalsystemet är: demokrati i religion, jämställdhet, ungas rösträtt och inkludering av alla religiösa i alla val. Dessa pelarar grundläggande för att skapa en rättvis och inkluderande demokrati.",
      "Genom att tillåta alla trossamfund — Judendom, Islam, Buddhismen, Hinduism, katoliker, ortodoxa och andra kristna — att delta i ett gemensamt valsystem kan vi bygga brot mellan olika kulturer och övertygelser.",
      "Fred kan inte uppnås utan att alla parter känner sig inkluderade i det demokratiska systemet. Multireligionvalsystemet ger alla en röst och en plats vid bordet.",
      "Engagera dig nu! Besök multireligionvalsystem.eu.org för att lära dig mer om hur du kan bidra till en bättre framtid för alla. Tillsammans kan vi skapa en värld där demokrati och religion arbetar tillsammans för fred.",
    ],
    author: "Multireligionvalsystem",
    date: "7 sep 2026",
    readTime: "5 min läsning",
    tag: "Multireligion",
    tagColor: "#A78BFA",
  },
];

/* ─── Main Component ──────────────────────────────────────────── */
export default function GuestPosts({
  onBack,
  onNavigate,
}: {
  onBack: () => void;
  onNavigate: (page: "pulse" | "political" | "guestposts" | "healthblog" | "aimagnetic") => void;
}) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

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
            Hem
          </button>
          <span
            className="text-sm font-semibold text-[var(--color-text-muted)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Guest Posts
          </span>
        </div>
      </motion.header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 pt-24 pb-20">
        <AnimatePresence mode="wait">
          {selectedPost ? (
            <FullBlogPost
              key={selectedPost.id}
              post={selectedPost}
              onBack={() => setSelectedPost(null)}
            />
          ) : (
            <motion.div
              key="list"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {/* Hero area */}
              <div className="mb-12 sm:mb-16">
                <motion.div variants={fadeUp} className="mb-6">
                  <span className="badge glass-light text-[var(--color-accent)] border border-[var(--color-accent)]/20 inline-flex">
                    <BookOpen className="w-3.5 h-3.5" />
                    Guest Posts
                  </span>
                </motion.div>

                <motion.h1
                  variants={fadeUp}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Inlägg om{" "}
                  <span className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-primary-light)] bg-clip-text text-transparent">
                    demokrati & fred
                  </span>
                </motion.h1>

                <motion.p
                  variants={fadeUp}
                  className="text-[var(--color-text-secondary)] text-lg leading-relaxed max-w-2xl"
                >
                  Djupgående analyser och perspektiv på demokrati, stödröstning,
                  kyrkovalsreformen och vägen mot fred.
                </motion.p>
              </div>

              {/* Blog posts grid */}
              <div className="grid sm:grid-cols-2 gap-5">
                {blogPosts.map((post) => (
                  <BlogPostCard
                    key={post.id}
                    post={post}
                    onReadMore={setSelectedPost}
                  />
                ))}
              </div>

              {/* Internal Links */}
              <div className="mt-10 glass rounded-2xl p-6 sm:p-8 border border-[var(--color-accent)]/10">
                <h3
                  className="text-lg font-bold mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Relaterat innehåll
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => onNavigate("political")}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors text-left group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/15 flex items-center justify-center text-[var(--color-accent)]">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold group-hover:text-[var(--color-accent)] transition-colors">
                        Politiskt innehåll
                      </p>
                      <p className="text-xs text-[var(--color-text-muted)]">
                        Stödröstning &amp; demokrati
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={() => onNavigate("healthblog")}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors text-left group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/15 flex items-center justify-center text-[var(--color-accent)]">
                      <Heart className="w-5 h-5" />
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
                      <Link2 className="w-5 h-5" />
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
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
