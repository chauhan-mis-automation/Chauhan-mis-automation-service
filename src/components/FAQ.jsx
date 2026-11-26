import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Phone, Mail, MessageCircle } from "lucide-react";
import { CONTACT_INFO } from "../data/servicesData";

/* ------------------------------------------------------------------ */
/*  FAQs — naya sawaal jodna ho to bas is list me add karein           */
/* ------------------------------------------------------------------ */
const FAQS = [
  {
    q: "What services does Chauhan MIS Automation Services offer?",
    a: "Chauhan MIS Automation Services provides AI automation, custom software development, ERP and CRM systems, web development, Google Workspace automation, WhatsApp automation, lead management, and real-time MIS dashboards.",
  },
  {
    q: "Does Chauhan MIS develop custom ERP and CRM software?",
    a: "Yes. We develop fully customized ERP and CRM solutions based on your business requirements. Our systems help manage operations, sales, inventory, customer relationships, production, orders, and reporting.",
  },
  {
    q: "What are AI automation services, and how can they help my business?",
    a: "AI automation uses artificial intelligence to automate repetitive tasks, manage customer inquiries, handle workflows, and improve business processes. It helps reduce manual work, save time, minimize errors, and increase productivity.",
  },
  {
    q: "Can Chauhan MIS develop AI chatbots and WhatsApp automation?",
    a: "Yes. We develop AI-powered chatbots, WhatsApp automation, and intelligent communication systems to handle customer inquiries, manage leads, send automated messages, and improve customer engagement.",
  },
  {
    q: "Does Chauhan MIS provide website and e-commerce development services?",
    a: "Yes. We develop responsive business websites, web applications, WordPress websites, Shopify stores, and customized e-commerce solutions designed to improve your online presence and business growth.",
  },
  {
    q: "Can you automate our existing business processes?",
    a: "Absolutely. We analyze your existing business workflows and develop automation solutions that connect different departments, reduce repetitive tasks, streamline operations, and improve overall efficiency.",
  },
  {
    q: "Which industries can benefit from Chauhan MIS solutions?",
    a: "Our solutions are suitable for manufacturing, pharmaceuticals, healthcare, retail, wholesale, logistics, e-commerce, education, real estate, FMCG, textile, food processing, finance, and many other industries.",
  },
  {
    q: "Can I get real-time MIS dashboards and business reports?",
    a: "Yes. We develop customized MIS dashboards that provide real-time insights into sales, inventory, production, employee performance, orders, dispatch, and other important business operations.",
  },
  {
    q: "Does Chauhan MIS provide ongoing technical support and maintenance?",
    a: "Yes. We provide ongoing technical support, software maintenance, updates, troubleshooting, and optimization to help ensure your business systems continue running smoothly.",
  },
  {
    q: "How can I get started with Chauhan MIS Automation Services?",
    a: `Getting started is easy. Contact us through our website, call us at ${CONTACT_INFO.phone}, or email us at ${CONTACT_INFO.email}. Share your business requirements, and our team will discuss a suitable automation or software solution for your needs.`,
  },
];

// Google search me FAQ dikhane ke liye structured data (FAQPage schema)
function useFaqSchema() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "faq-schema";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
    document.getElementById("faq-schema")?.remove();
    document.head.appendChild(script);
    return () => script.remove();
  }, []);
}

function FaqItem({ item, index, open, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: Math.min(index, 5) * 0.04 }}
      className={`rounded-2xl border bg-white transition-all duration-300 ${
        open ? "border-blue-500/30 shadow-lg shadow-blue-500/10" : "border-navy-900/10 hover:border-blue-500/25"
      }`}
    >
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`faq-answer-${index}`}
          className="flex w-full items-center gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left"
        >
          <span
            className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-xs font-bold transition-colors ${
              open ? "bg-gradient-to-br from-blue-500 to-violet-500 text-white" : "bg-ice-50 text-navy-900/50"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className={`flex-1 text-sm sm:text-base font-semibold transition-colors ${open ? "text-blue-500" : "text-navy-900"}`}>
            {item.q}
          </span>
          <span
            className={`grid h-7 w-7 shrink-0 place-items-center rounded-full transition-all duration-300 ${
              open ? "bg-blue-500 text-white rotate-180" : "bg-ice-50 text-navy-900/60"
            }`}
          >
            {open ? <Minus size={14} /> : <Plus size={14} />}
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-answer-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 sm:px-6 sm:pb-6 sm:pl-[4.5rem] text-sm leading-relaxed text-navy-900/65">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0); // pehla sawaal khula rahe
  useFaqSchema();

  return (
    <section id="faq" className="scroll-mt-24 bg-white pt-16 pb-20 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-24 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-10 lg:gap-16 items-start">
        {/* Left: heading + help box */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="lg:sticky lg:top-28"
        >
          <p className="text-xs font-semibold tracking-widest text-blue-500 uppercase">FAQs</p>
          <h2 className="font-display mt-2 text-3xl sm:text-4xl font-bold text-navy-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-navy-900/60">
            Answers to common questions about our AI automation, software, ERP/CRM and website services.
          </p>

          <div className="relative mt-8 overflow-hidden rounded-2xl bg-navy-950 p-6">
            <div className="pointer-events-none absolute -top-10 -right-10 h-36 w-36 rounded-full bg-violet-500/30 blur-3xl" />
            <p className="font-display text-lg font-semibold text-white">Still have questions?</p>
            <p className="mt-1 text-sm text-ice-200/65">Our team is happy to help you.</p>
            <div className="mt-5 space-y-3 text-sm">
              <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-ice-200/80 hover:text-teal-400">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10"><Phone size={14} /></span>
                {CONTACT_INFO.phone}
              </a>
              <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-3 text-ice-200/80 hover:text-teal-400">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10"><Mail size={14} /></span>
                {CONTACT_INFO.email}
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25"
              >
                Contact Us
              </Link>
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] px-5 py-2.5 text-sm font-semibold text-white"
              >
                <MessageCircle size={15} /> WhatsApp
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right: accordion */}
        <div className="space-y-3">
          {FAQS.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}