import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, CheckCircle2 } from "lucide-react";
import { CONTACT_INFO } from "../data/servicesData";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ThankYou() {
  useEffect(() => {
    // Fire Meta Pixel "Lead" conversion event when this page loads
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Lead");
    }
  }, []);

  return (
    <div className="min-h-screen bg-ice-50 flex items-center justify-center px-4 sm:px-6 py-10 sm:py-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-lg w-full text-center bg-white rounded-3xl border border-navy-900/10 shadow-xl px-6 py-10 sm:px-8 sm:py-14 relative"
      >
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 200, damping: 14 }}
          className="mx-auto mb-6 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/25"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.35, ease: "easeOut" }}
          >
            <CheckCircle2 size={32} className="text-white sm:w-10 sm:h-10" strokeWidth={2.2} />
          </motion.div>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.h1
            variants={item}
            className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy-950 mb-3 sm:mb-4"
          >
            Thank You!
          </motion.h1>

          <motion.p variants={item} className="text-navy-900/70 text-sm sm:text-base md:text-lg mb-1 px-2">
            Your enquiry has been successfully submitted.
          </motion.p>
          <motion.p variants={item} className="text-navy-900/70 text-sm sm:text-base md:text-lg mb-6 sm:mb-8">
            Our team will contact you shortly.
          </motion.p>

          <motion.div
            variants={item}
            className="mb-6 sm:mb-8"
          >
            <p className="text-navy-900/50 text-xs sm:text-sm mb-2">
              For urgent queries, call us at
            </p>
            <a
              href={`tel:${(CONTACT_INFO.phone || "+91 88601 45117").replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full bg-teal-50 border border-teal-500/20 px-4 py-2 text-teal-700 font-semibold text-sm sm:text-base hover:bg-teal-100 transition-colors"
            >
              <Phone size={16} className="text-teal-600 shrink-0" />
              {CONTACT_INFO.phone || "+91 88601 45117"}
            </a>
          </motion.div>

          <motion.div variants={item} className="pt-5 sm:pt-6 border-t border-navy-900/10">
            <p className="text-navy-900/40 text-[11px] uppercase tracking-wide mb-1">
              From
            </p>
            <p className="font-display font-bold text-navy-950 mb-6 sm:mb-8 text-sm sm:text-base">
              Chauhan MIS Automation Service
            </p>

            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold px-6 py-3 text-sm hover:opacity-90 transition"
            >
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}