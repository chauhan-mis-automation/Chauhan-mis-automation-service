import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { SERVICES } from "../data/servicesData";
import ServiceModal from "./ServiceModal";

export default function Services() {
  const [active, setActive] = useState(null);

  return (
    <section id="services" className="scroll-mt-24 bg-ice-50 pt-10 pb-20 relative overflow-hidden">
      {/* decorative background blobs */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-xl mx-auto"
        >
          <p className="text-xs font-semibold tracking-widest text-blue-500 uppercase">What We Do</p>
          <h2 className="font-display mt-2 text-3xl sm:text-4xl font-bold text-navy-900">Our Services</h2>
          <p className="mt-3 text-navy-900/60">End-to-end digital solutions to transform your business</p>
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, i) => (
            <motion.button
              key={service.id}
              type="button"
              onClick={() => setActive(service)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative text-left rounded-2xl border border-navy-900/5 bg-white p-6 pt-6 sm:pt-9 shadow-sm transition-shadow duration-300 hover:shadow-xl ${service.shadowClass} overflow-visible cursor-pointer flex flex-col`}
            >
              {/* faint background number */}
              <span className="pointer-events-none absolute top-2 right-4 font-display text-5xl font-black text-navy-900/[0.03] select-none">
                0{i + 1}
              </span>

              {/* highlight pills — in-flow on mobile (never clipped), floating above the card on larger screens */}
              <div className="sm:absolute sm:-top-4 sm:left-5 sm:right-5 flex flex-wrap gap-1.5 mb-3 sm:mb-0 z-10">
                {service.highlights.slice(0, 2).map((h, hi) => (
                  <motion.span
                    key={h}
                    initial={{ opacity: 0, y: -6 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 + 0.2 + hi * 0.08 }}
                    className={`animate-float rounded-full bg-gradient-to-r ${service.accent} px-2.5 py-1 text-[10px] font-semibold text-white shadow-md`}
                    style={{ animationDelay: `${hi * 0.6}s` }}
                  >
                    {h}
                  </motion.span>
                ))}
              </div>

              {/* top accent bar that grows in on hover */}
              <span
                className={`absolute top-0 left-0 h-1 w-0 bg-gradient-to-r ${service.accent} transition-all duration-500 group-hover:w-full`}
              />
              {/* soft glow blob revealed on hover */}
              <span
                className={`pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br ${service.accent} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20`}
              />

              <motion.span
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
                className={`relative grid place-items-center h-11 w-11 rounded-xl ${service.iconBg} transition-transform duration-300 group-hover:scale-110`}
              >
                <service.icon size={20} />
              </motion.span>

              <h3 className="relative mt-4 font-display text-base font-semibold text-navy-900">{service.title}</h3>
              <p className="relative mt-2 text-sm text-navy-900/60 leading-relaxed">{service.tagline}</p>

              <ul className="relative mt-4 space-y-2">
                {service.points.map((point) => (
                  <li key={point} className="flex items-center gap-2 text-xs text-navy-900/80">
                    <Check size={13} className="shrink-0 text-teal-500" />
                    {point}
                  </li>
                ))}
              </ul>

              <span className="relative mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue-500 transition-all group-hover:gap-2">
                <Sparkles size={13} /> View Full Details <ArrowRight size={14} />
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <ServiceModal service={active} onClose={() => setActive(null)} />
    </section>
  );
}
