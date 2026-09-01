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
    <div className="min-h-screen bg-ice-50 flex items-center justify-center px-6 py-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-lg w-full text-center bg-white rounded-3xl border border-navy-900/10 shadow-xl px-8 py-14 relative"
      >
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 200, damping: 14 }}
          className="mx-auto mb-6 w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/25"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.35, ease: "easeOut" }}
          >
            <CheckCircle2 size={40} className="text-white" strokeWidth={2.2} />
          </motion.div>
        </motion.div>

        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.h1
            variants={item}
            className="font-display text-3xl md:text-4xl font-extrabold text-navy-950 mb-4"
          >
            Thank You!
          </motion.h1>

          <motion.p variants={item} className="text-navy-900/70 text-base md:text-lg mb-1">
            Your enquiry has been successfully submitted.
          </motion.p>
          <motion.p variants={item} className="text-navy-900/70 text-base md:text-lg mb-8">
            Our team will contact you shortly.
          </motion.p>

          <motion.div
            variants={item}
            className="flex items-center justify-center gap-2 text-navy-950 font-semibold mb-10"
          >
            <Phone size={18} className="text-teal-500" />
            <span>For urgent queries, call us at </span>
            <a
              href={`tel:${(CONTACT_INFO.phone || "+91 88601 45117").replace(/\s/g, "")}`}
              className="text-teal-600 hover:underline"
            >
              {CONTACT_INFO.phone || "+91 88601 45117"}
            </a>
          </motion.div>

          <motion.p variants={item} className="font-display font-bold text-navy-950 mb-8">
            Chauhan MIS Automation Service
          </motion.p>

          <motion.div variants={item}>
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