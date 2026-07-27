import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import bookingProcess from "../assets/projects/booking-process.jpeg";
import empPerformance from "../assets/projects/emp-performance-dashboard.jpeg";
import orderManagement from "../assets/projects/order-management-dashboard.jpeg";
import paymentProcess from "../assets/projects/payment-process.jpeg";
import salesMarketing from "../assets/projects/sales-marketing-dashboard.jpeg";
import transportManagement from "../assets/projects/transport-management-dashboard.jpeg";

const PROJECTS = [
  {
    image: orderManagement,
    tag: "Order Management",
    title: "Order Management Dashboard",
    desc: "Live view of total, pending, shipped and delivered orders, alongside sales analytics and top-selling products.",
  },
  {
    image: salesMarketing,
    tag: "Sales & CRM",
    title: "Sales & Marketing Dashboard",
    desc: "Full sales funnel from visitors to closed deals, with campaign performance and revenue growth tracking.",
  },
  {
    image: empPerformance,
    tag: "HR & MIS",
    title: "Employee Performance Dashboard",
    desc: "Real-time task completion, missed deadlines, KPI summaries, and a leaderboard of top-performing employees.",
  },
  {
    image: transportManagement,
    tag: "Logistics",
    title: "Logistics & Transport Dashboard",
    desc: "End-to-end shipment tracking — enquiry, quote, booking and live delivery status in a single flow.",
  },
  {
    image: bookingProcess,
    tag: "Booking System",
    title: "Event Booking System",
    desc: "A guided 4-step booking flow — select tickets, enter details, review, and pay securely with instant confirmation.",
  },
  {
    image: paymentProcess,
    tag: "E-Commerce",
    title: "Order & Payment Flow",
    desc: "Smooth checkout journey from product selection to secure payment, inventory checks, and order confirmation.",
  },
];

export default function Project() {
  return (
    <section id="project" className="scroll-mt-24 bg-ice-50 pt-10 pb-20 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-xl mx-auto"
        >
          <p className="text-xs font-semibold tracking-widest text-blue-500 uppercase">Our Work</p>
          <h2 className="font-display mt-2 text-3xl sm:text-4xl font-bold text-navy-900">Projects</h2>
          <p className="mt-3 text-navy-900/60">
            A glimpse of the dashboards and automation flows we've built for real businesses
          </p>
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.18, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="group rounded-2xl border border-navy-900/5 bg-white shadow-sm hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="relative overflow-hidden aspect-[4/3] bg-navy-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover object-top transition-all duration-500 group-hover:object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/0 to-navy-950/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute top-3 left-3 rounded-full bg-navy-950/80 backdrop-blur px-3 py-1 text-[10px] font-semibold text-white">
                  {project.tag}
                </span>
                <span className="absolute bottom-3 right-3 grid place-items-center h-9 w-9 rounded-full bg-white text-navy-900 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  <ArrowUpRight size={16} />
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-display text-base font-semibold text-navy-900">{project.title}</h3>
                <p className="mt-2 text-sm text-navy-900/60 leading-relaxed">{project.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-navy-900/60 mb-4">Have a similar idea in mind?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-transform hover:scale-[1.03]"
          >
            Start Your Project <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
