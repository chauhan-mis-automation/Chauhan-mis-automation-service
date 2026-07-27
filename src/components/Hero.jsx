import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Bot,
  Code2,
  Globe2,
  Table2,
} from "lucide-react";

const CHECKLIST = [
  "AI-Driven Automation",
  "End-to-End Development",
  "Custom Business Solutions",
  "Ongoing Support",
];

const STATS = [
  { value: "250+", label: "Projects Delivered" },
  { value: "70+", label: "Happy Clients" },
  { value: "3+", label: "Years of Experience" },
  { value: "99%", label: "Client Satisfaction" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

function FloatingBadge({ icon: Icon, title, subtitle, className, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className={`animate-float hidden lg:flex items-center gap-3 rounded-xl border border-white/10 bg-navy-900/90 backdrop-blur px-4 py-3 shadow-xl ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <span className="grid place-items-center h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 text-white">
        <Icon size={18} />
      </span>
      <div className="leading-tight">
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-xs text-ice-200/70">{subtitle}</p>
      </div>
    </motion.div>
  );
}

/* ---- mini animated visuals, one per service ---- */

function TypingDots() {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2].map((d) => (
        <motion.span
          key={d}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: d * 0.18 }}
          className="h-1.5 w-1.5 rounded-full bg-blue-400"
        />
      ))}
    </div>
  );
}

function MiniBars() {
  const bars = [40, 70, 55, 90];
  return (
    <div className="flex items-end justify-between gap-1.5 h-10 w-full">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          initial={{ height: 6 }}
          animate={{ height: [`${h * 0.4}%`, `${h}%`, `${h * 0.4}%`] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
          className="w-1/6 rounded-t bg-gradient-to-t from-violet-500 to-violet-300"
        />
      ))}
    </div>
  );
}

function MiniBrowser() {
  return (
    <div className="w-full rounded-md border border-white/10 bg-white/[0.03] overflow-hidden">
      <div className="flex items-center gap-1 border-b border-white/10 px-2 py-1">
        <span className="h-1.5 w-1.5 rounded-full bg-red-400/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400/70" />
        <span className="h-1.5 w-1.5 rounded-full bg-teal-400/70" />
      </div>
      <div className="p-2 space-y-1.5">
        <motion.div
          className="h-1.5 rounded bg-teal-400/40"
          animate={{ width: ["30%", "70%", "30%"] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        />
        <div className="h-1.5 w-4/5 rounded bg-white/10" />
        <div className="h-1.5 w-3/5 rounded bg-white/10" />
      </div>
    </div>
  );
}

function MiniGrid() {
  const cells = Array.from({ length: 9 });
  return (
    <div className="grid grid-cols-3 gap-1 w-full">
      {cells.map((_, i) => (
        <motion.span
          key={i}
          className="h-3 w-full rounded-[2px] border border-white/10 bg-white/[0.08]"
          animate={
            i === 1 || i === 4 || i === 7
              ? { backgroundColor: ["rgba(255,255,255,0.08)", "rgba(245,158,11,0.7)", "rgba(255,255,255,0.08)"] }
              : {}
          }
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
        />
      ))}
    </div>
  );
}

const MINI_PANELS = [
  { icon: Bot, label: "AI Automation", visual: "chat" },
  { icon: Code2, label: "Custom Software", visual: "bars" },
  { icon: Globe2, label: "Web Development", visual: "browser" },
  { icon: Table2, label: "Gsuite Automation", visual: "grid" },
];

function MiniPanel({ icon: Icon, label, visual, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: 0.2 + i * 0.1 }}
      className="rounded-xl border border-white/10 bg-white/[0.03] p-3 sm:p-4"
    >
      <div className="flex items-center gap-2">
        <span className="grid place-items-center h-7 w-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 text-white shrink-0">
          <Icon size={14} />
        </span>
        <p className="text-[11px] sm:text-xs font-semibold text-white truncate">{label}</p>
      </div>
      <div className="mt-3 min-h-[2.5rem] flex items-center">
        {visual === "chat" && (
          <div className="flex items-center gap-2 rounded-lg bg-white/[0.04] px-2.5 py-2 w-full">
            <TypingDots />
            <span className="text-[10px] text-ice-200/50">Agent replying…</span>
          </div>
        )}
        {visual === "bars" && <MiniBars />}
        {visual === "browser" && <MiniBrowser />}
        {visual === "grid" && <MiniGrid />}
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="scroll-mt-24 relative overflow-hidden bg-navy-950">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-40 right-0 h-[38rem] w-[38rem] rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -right-20 h-[26rem] w-[26rem] rounded-full bg-violet-500/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 pt-8 sm:pt-10 pb-14 grid lg:grid-cols-2 gap-10 items-start">
        {/* Left: copy */}
        <div>
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-xs font-medium text-teal-500"
          >
            AI-Powered. Future-Ready. Results-Driven.
          </motion.span>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="font-display mt-4 text-[2rem] leading-[1.15] sm:text-4xl sm:leading-[1.12] xl:text-[3.25rem] font-bold text-white"
          >
            Automate Your Business.
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
              Scale Smarter with AI Agents.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-4 max-w-lg text-[15px] leading-relaxed text-ice-200/80"
          >
            Chauhan MIS Automation Services builds AI Agents, Custom ERP, CRM,
            Production Planning, Order Management, and Dispatch Management
            Systems &mdash; high-performance business software that automates
            complex workflows, eliminates repetitive tasks, and helps
            businesses improve efficiency, reduce operational costs, and scale
            with confidence.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-6 flex flex-wrap gap-3 sm:gap-4"
          >
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-6 sm:px-7 py-3 sm:py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-transform hover:scale-[1.03]"
            >
              Explore Services <ArrowRight size={16} />
            </a>
            <a
              href="#project"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 sm:px-7 py-3 sm:py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
            >
              View Our Work
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 max-w-lg"
          >
            {CHECKLIST.map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <CheckCircle2 size={18} className="shrink-0 text-teal-500" />
                <p className="text-sm font-medium text-ice-50/90">{item}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: services mini-showcase */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none pt-9 pb-9 px-2 sm:px-4 lg:px-10"
        >
          {/* Panel card */}
          <div className="relative z-10 rounded-2xl border border-white/10 bg-navy-900/95 backdrop-blur shadow-2xl p-4 sm:p-5">
            <p className="text-sm font-semibold text-white mb-3">Everything We Automate</p>
            <div className="grid grid-cols-2 gap-3">
              {MINI_PANELS.map((panel, i) => (
                <MiniPanel key={panel.label} {...panel} i={i} />
              ))}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              {[
                { label: "Projects Delivered", value: "250+" },
                { label: "Client Satisfaction", value: "99%" },
              ].map((s) => (
                <div key={s.label} className="rounded-lg bg-white/[0.04] border border-white/10 px-3 py-2.5">
                  <p className="text-sm font-semibold text-white">{s.value}</p>
                  <p className="text-[10px] text-ice-200/50">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Floating badges — sit in the padding gutter around the card */}
          <FloatingBadge icon={Bot} title="AI Automation" subtitle="Smart Workflows" className="absolute z-20 top-0 left-0" delay={0} />
          <FloatingBadge icon={Code2} title="Custom Software" subtitle="Tailored Solutions" className="absolute z-20 top-0 right-0" delay={0.4} />
          <FloatingBadge icon={Globe2} title="Web Development" subtitle="Modern & Responsive" className="absolute z-20 bottom-0 left-0" delay={0.8} />
          <FloatingBadge icon={Table2} title="Gsuite Automation" subtitle="Sheets & Workflows" className="absolute z-20 bottom-0 right-0" delay={1.2} />
        </motion.div>
      </div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="relative border-t border-white/5 bg-ice-50"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <p className="font-display text-2xl sm:text-3xl font-bold text-navy-900">{stat.value}</p>
              <p className="text-xs sm:text-sm text-navy-900/60">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
