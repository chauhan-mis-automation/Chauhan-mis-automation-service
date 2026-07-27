import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Check, ArrowRight, Cpu } from "lucide-react";
import { AI_PROCESS_STEPS, AI_WHAT_YOU_GET, TECH_STACKS } from "../data/servicesData";
import ProcessFlow from "./ProcessFlow";

export default function ServiceModal({ service, onClose }) {
  useEffect(() => {
    if (!service) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [service, onClose]);

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-navy-950/80 backdrop-blur-sm px-4 py-8 sm:py-14"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className={`relative bg-gradient-to-br ${service.accent} px-7 sm:px-10 pt-9 pb-14 text-white overflow-hidden`}>
              <div className="pointer-events-none absolute -top-10 -right-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-5 right-5 grid place-items-center h-9 w-9 rounded-full bg-white/15 hover:bg-white/25 transition-colors"
              >
                <X size={18} />
              </button>
              <span className="grid place-items-center h-14 w-14 rounded-2xl bg-white/15">
                <service.icon size={28} />
              </span>
              <h2 className="font-display mt-4 text-2xl sm:text-3xl font-bold">{service.fullTitle}</h2>
              <p className="mt-2 max-w-xl text-sm text-white/85">{service.description}</p>
            </div>

            {/* Body */}
            <div className="px-7 sm:px-10 py-8 -mt-8 space-y-10">
              {/* Why choose */}
              <div className="relative rounded-2xl bg-ice-50 border border-navy-900/5 p-6 shadow-sm">
                <p className="text-xs font-semibold tracking-widest text-navy-900/50 uppercase mb-4">
                  Why Choose Us
                </p>
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                  {service.whyChoose.map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.04 }}
                      className="flex items-center gap-2.5"
                    >
                      <Check size={16} className={`shrink-0 ${service.checkColor}`} />
                      <p className="text-sm text-navy-900/80">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* AI process flow */}
              {service.showProcess && (
                <div>
                  <p className="text-xs font-semibold tracking-widest text-navy-900/50 uppercase mb-1">
                    How It Works
                  </p>
                  <h3 className="font-display text-xl font-bold text-navy-900 mb-6">
                    How Our AI Agent Works
                  </h3>
                  <ProcessFlow steps={AI_PROCESS_STEPS} />

                  {/* What you get */}
                  <div className="mt-6 rounded-2xl bg-navy-950 p-6">
                    <p className="text-xs font-semibold tracking-widest text-teal-500 uppercase mb-4">
                      What You Get
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {AI_WHAT_YOU_GET.map((item, i) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.35, delay: i * 0.06 }}
                          className="flex items-start gap-2.5"
                        >
                          <item.icon size={16} className="mt-0.5 shrink-0 text-teal-500" />
                          <div>
                            <p className="text-sm font-semibold text-white">{item.title}</p>
                            <p className="text-xs text-ice-200/60">{item.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tech stack */}
              {service.showTechStack && (
                <div>
                  <p className="text-xs font-semibold tracking-widest text-navy-900/50 uppercase mb-1">
                    Development Tools & Technologies
                  </p>
                  <h3 className="font-display text-xl font-bold text-navy-900 mb-6">
                    The Right Technology for Your Business
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {TECH_STACKS.map((stack, i) => (
                      <motion.div
                        key={stack.name}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        whileHover={{ y: -4 }}
                        className="rounded-xl border border-navy-900/5 bg-white p-4 shadow-sm hover:shadow-lg transition-shadow"
                      >
                        <Cpu size={18} className="text-violet-500" />
                        <p className="mt-2 text-sm font-semibold text-navy-900 leading-snug">{stack.name}</p>
                        <span className="mt-1 inline-block text-[11px] font-medium text-violet-500">{stack.tag}</span>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {stack.benefits.map((b) => (
                            <span key={b} className="rounded-full bg-ice-200/60 px-2.5 py-1 text-[10px] font-medium text-navy-900/70">
                              {b}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-services */}
              <div>
                <p className="text-xs font-semibold tracking-widest text-navy-900/50 uppercase mb-1">
                  What's Included
                </p>
                <h3 className="font-display text-xl font-bold text-navy-900 mb-6">
                  Everything Under {service.title}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.subServices.map((sub, i) => (
                    <motion.div
                      key={sub.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}
                      whileHover={{ y: -3 }}
                      className="rounded-xl border border-navy-900/5 bg-white p-4 shadow-sm hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start gap-3">
                        <span className={`grid place-items-center h-9 w-9 shrink-0 rounded-lg ${service.iconBg}`}>
                          <sub.icon size={17} />
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-navy-900">{sub.title}</p>
                          <p className="mt-1 text-xs leading-relaxed text-navy-900/60">{sub.desc}</p>
                        </div>
                      </div>
                      {sub.features && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {sub.features.map((f) => (
                            <span key={f} className="rounded-full bg-ice-50 border border-navy-900/5 px-2.5 py-1 text-[10px] font-medium text-navy-900/70">
                              {f}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Business value (optional, per-service) */}
              {service.businessValue && (
                <div className="rounded-2xl bg-navy-950 p-6">
                  <p className="text-xs font-semibold tracking-widest text-amber-400 uppercase mb-4">
                    Business Value We Deliver
                  </p>
                  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                    {service.businessValue.map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: i * 0.04 }}
                        className="flex items-center gap-2.5"
                      >
                        <Check size={16} className="shrink-0 text-teal-400" />
                        <p className="text-sm text-ice-200/80">{item}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Industries (optional, per-service) */}
              {service.industries && (
                <div>
                  <p className="text-xs font-semibold tracking-widest text-navy-900/50 uppercase mb-3">
                    Industries We Serve
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.industries.map((ind) => (
                      <span key={ind} className="rounded-full bg-ice-50 border border-navy-900/5 px-3 py-1.5 text-xs font-medium text-navy-900/70">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <a
                href="#contact"
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-transform hover:scale-[1.03]"
              >
                Get a Free Consultation <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
