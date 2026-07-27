import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";

function Connector({ delay = 0, vertical = false }) {
  return (
    <div
      className={`relative shrink-0 ${
        vertical ? "h-10 w-1 sm:h-1 sm:w-14 sm:self-center" : "h-1 w-10 sm:w-14 self-center"
      }`}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/25 via-violet-500/40 to-teal-500/25" />
      <motion.span
        className="absolute h-2.5 w-2.5 rounded-full bg-teal-400"
        style={{
          boxShadow: "0 0 10px 3px rgba(20,184,166,0.7)",
          top: vertical ? undefined : "50%",
          left: vertical ? "50%" : undefined,
          translateX: vertical ? "-50%" : 0,
          translateY: vertical ? 0 : "-50%",
        }}
        animate={
          vertical
            ? { top: ["0%", "92%"] }
            : { left: ["0%", "92%"] }
        }
        transition={{ duration: 1.1, repeat: Infinity, ease: "linear", delay }}
      />
    </div>
  );
}

function FlowNode({ icon: Icon, n, title, desc, glow, big, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, delay: i * 0.05 }}
      className="flex flex-col items-center text-center shrink-0 w-[150px] sm:w-[170px]"
    >
      <motion.div
        animate={{ boxShadow: [`0 0 0px 0px ${glow}`, `0 0 18px 5px ${glow}`, `0 0 0px 0px ${glow}`] }}
        transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.15 }}
        className={`relative grid place-items-center rounded-2xl border border-white/10 bg-navy-900 ${
          big ? "h-16 w-16" : "h-14 w-14"
        }`}
      >
        {n != null && (
          <span className="absolute -top-2 -right-2 grid place-items-center h-5 w-5 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-white text-[10px] font-bold">
            {n}
          </span>
        )}
        <Icon size={big ? 26 : 22} className="text-teal-400" />
      </motion.div>
      <p className="mt-3 text-sm font-semibold text-white">{title}</p>
      {desc && <p className="mt-1 text-xs leading-relaxed text-ice-200/60">{desc}</p>}
    </motion.div>
  );
}

export default function ProcessFlow({ steps }) {
  const scrollerRef = useRef(null);
  const pausedRef = useRef(false);
  const dirRef = useRef(1);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let raf;

    const tick = () => {
      if (!pausedRef.current) {
        const max = el.scrollWidth - el.clientWidth;
        if (max > 0) {
          el.scrollLeft += dirRef.current * 0.6;
          if (el.scrollLeft >= max - 1) dirRef.current = -1;
          if (el.scrollLeft <= 1) dirRef.current = 1;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const pause = () => (pausedRef.current = true);
  const resume = () => (pausedRef.current = false);

  return (
    <div className="relative rounded-2xl bg-navy-950 p-6 sm:p-8 overflow-hidden">
      <div className="pointer-events-none absolute -top-16 left-1/3 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 right-1/4 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />

      <div
        ref={scrollerRef}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
        className="relative overflow-x-auto no-scrollbar pb-2"
      >
        <div className="flex items-center min-w-max px-2 py-2">
          <FlowNode icon={Bot} title="AI Agent" desc="Works 24/7" glow="rgba(37,99,235,0.6)" big i={0} />
          {steps.map((step, i) => (
            <div key={step.n} className="flex items-center">
              <Connector delay={i * 0.15} />
              <FlowNode
                icon={step.icon}
                n={step.n}
                title={step.title}
                glow="rgba(20,184,166,0.55)"
                i={i + 1}
              />
            </div>
          ))}
          <Connector delay={steps.length * 0.15} />
          <FlowNode icon={Sparkles} title="Business Growth" desc="Real results" glow="rgba(124,58,237,0.65)" big i={steps.length + 1} />
        </div>
      </div>
      <p className="relative mt-4 text-center text-[11px] text-ice-200/40">
        Auto-playing — hover to pause
      </p>
    </div>
  );
}
