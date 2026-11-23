import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import bookingProcess from "../assets/projects/booking-process.jpeg";
import empPerformance from "../assets/projects/emp-performance-dashboard.jpeg";
import orderManagement from "../assets/projects/order-management-dashboard.png";
import paymentProcess from "../assets/projects/payment-process.jpeg";
import salesMarketing from "../assets/projects/lead-management-crm.jpeg";
import transportManagement from "../assets/projects/transport-management-dashboard.jpeg";
import whatsappDashboard from "../assets/projects/whatsapp-crm-dashboard.jpeg";
import whatsappFlow from "../assets/projects/whatsapp-automation-flow.jpeg";

const PROJECTS = [
  {
    images: [whatsappDashboard, whatsappFlow],
    tag: "WhatsApp Automation",
    title: "WhatsApp Bulk Automation",
    desc: "Bulk campaigns, a shared inbox and no-code chatbot flows on the official WhatsApp API — with delivery, read and reply tracking.",
    highlights: ["Bulk campaigns & templates", "No-code chatbot flows", "Shared team inbox", "Delivery & read reports"],
    featured: true,
  },
  {
    image: orderManagement,
    tag: "Order Management",
    title: "Order Management Dashboard",
    desc: "Live view of total, pending, shipped and delivered orders, alongside sales analytics and top-selling products.",
  },
  {
    image: salesMarketing,
    light: true,
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

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, x: -60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

// object-top normally; on hover show the full image, centred so no empty band appears below it
const IMG_CLASS =
  "h-full w-full object-cover object-top transition-all duration-500 group-hover:object-contain group-hover:object-center";

function ProjectImages({ images, title }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (images.length < 2 || paused) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % images.length), 3500);
    return () => clearInterval(timer);
  }, [images.length, paused]);

  if (images.length < 2) {
    return <img src={images[0]} alt={title} className={IMG_CLASS} />;
  }

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={index}
          src={images[index]}
          alt={`${title} – screen ${index + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className={`absolute inset-0 ${IMG_CLASS}`}
        />
      </AnimatePresence>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 rounded-full bg-navy-950/60 backdrop-blur px-2 py-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show screen ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-5 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function ImageFrame({ project, className }) {
  return (
    <div className={`relative overflow-hidden ${project.light || project.featured ? "bg-white" : "bg-navy-950"} ${className}`}>
      <ProjectImages images={project.images ?? [project.image]} title={project.title} />
      <span className="z-10 absolute top-3 left-3 rounded-full bg-navy-950/80 backdrop-blur px-3 py-1 text-[10px] font-semibold text-white">
        {project.tag}
      </span>
    </div>
  );
}

function FeaturedCard({ project }) {
  return (
    <motion.div
      {...fadeIn()}
      className="group sm:col-span-2 lg:col-span-3 grid lg:grid-cols-5 rounded-2xl border border-navy-900/5 bg-white shadow-sm hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
    >
      <ImageFrame project={project} className="lg:col-span-3 aspect-[11/5] lg:aspect-auto lg:min-h-[320px] border-b lg:border-b-0 lg:border-r border-navy-900/5" />
      <div className="lg:col-span-2 p-6 lg:p-8 flex flex-col justify-center">
        <span className="self-start rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
          New Project
        </span>
        <h3 className="font-display mt-3 text-xl sm:text-2xl font-semibold text-navy-900">{project.title}</h3>
        <p className="mt-3 text-sm text-navy-900/60 leading-relaxed">{project.desc}</p>
        <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-navy-900/80">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
              {h}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, i }) {
  return (
    <motion.div
      {...fadeIn((i % 3) * 0.18)}
      whileHover={{ y: -8 }}
      className="group rounded-2xl border border-navy-900/5 bg-white shadow-sm hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
    >
      <div className="relative">
        <ImageFrame project={project} className="aspect-[4/3]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/40 via-navy-950/0 to-navy-950/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="z-10 absolute bottom-3 right-3 grid place-items-center h-9 w-9 rounded-full bg-white text-navy-900 shadow opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <ArrowUpRight size={16} />
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-base font-semibold text-navy-900">{project.title}</h3>
        <p className="mt-2 text-sm text-navy-900/60 leading-relaxed">{project.desc}</p>
      </div>
    </motion.div>
  );
}

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
          {PROJECTS.filter((p) => p.featured).map((project) => (
            <FeaturedCard key={project.title} project={project} />
          ))}
          {PROJECTS.filter((p) => !p.featured).map((project, i) => (
            <ProjectCard key={project.title} project={project} i={i} />
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
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-transform hover:scale-[1.03]"
          >
            Start Your Project <ArrowUpRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}