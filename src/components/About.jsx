import { motion } from "framer-motion";
import { Rocket, Target, Award } from "lucide-react";
import { COMPANY_WHY_CHOOSE, INDUSTRIES } from "../data/servicesData";

const STATS = [
  { value: "250+", label: "Projects Delivered" },
  { value: "70+", label: "Happy Clients" },
  { value: "5+", label: "Years of Experience" },
  { value: "99%", label: "Client Satisfaction" },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-navy-950 pt-10 pb-20 relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold tracking-widest text-teal-500 uppercase">About Us</p>
            <h2 className="font-display mt-2 text-3xl sm:text-4xl font-bold text-white">
              Automate. Optimize.{" "}
              <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                Grow.
              </span>
            </h2>
            <p className="mt-4 text-ice-200/75 leading-relaxed">
              Chauhan MIS Automation Services builds AI Agents, Custom ERP, CRM, Production
              Planning, Order Management, and Dispatch Management Systems — high-performance
              business software that automates complex workflows, eliminates repetitive tasks,
              and helps businesses improve efficiency, reduce operational costs, and scale with
              confidence.
            </p>
            <p className="mt-3 text-ice-200/75 leading-relaxed">
              Whether you&apos;re a startup, SME, or enterprise, our solutions are customized to
              match your business processes — not the other way around.
            </p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <p className="font-display text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-ice-200/60">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: mission/vision cards */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            {[
              { icon: Rocket, title: "Our Mission", desc: "To help every business — from startups to enterprises — automate operations and grow smarter with AI-ready technology." },
              { icon: Target, title: "Our Approach", desc: "We design software around your real workflows, not templates, so every solution fits the way you actually work." },
              { icon: Award, title: "Our Promise", desc: "Secure, scalable systems backed by a dedicated team and ongoing support long after launch." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                whileHover={{ x: 6 }}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <span className="grid place-items-center h-11 w-11 shrink-0 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 text-white">
                  <item.icon size={20} />
                </span>
                <div>
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-ice-200/65 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Why choose us */}
        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-xl mx-auto"
          >
            <p className="text-xs font-semibold tracking-widest text-teal-500 uppercase">Why Chauhan MIS</p>
            <h3 className="font-display mt-2 text-2xl sm:text-3xl font-bold text-white">Why Choose Us</h3>
          </motion.div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {COMPANY_WHY_CHOOSE.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: (i % 4) * 0.08 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:bg-white/[0.06] transition-colors"
              >
                <motion.span
                  animate={{ boxShadow: ["0 0 0px 0px rgba(20,184,166,0.4)", "0 0 14px 3px rgba(20,184,166,0.35)", "0 0 0px 0px rgba(20,184,166,0.4)"] }}
                  transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.2 }}
                  className="grid place-items-center h-11 w-11 rounded-xl bg-teal-500/10 text-teal-400"
                >
                  <item.icon size={20} />
                </motion.span>
                <p className="mt-4 text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-ice-200/60">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Industries marquee */}
        <div className="mt-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center text-xs font-semibold tracking-widest text-ice-200/40 uppercase mb-6"
          >
            Industries We Serve
          </motion.p>
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex gap-3 w-max animate-marquee">
              {[...INDUSTRIES, ...INDUSTRIES].map((industry, i) => (
                <span
                  key={`${industry}-${i}`}
                  className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-ice-200/70"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
