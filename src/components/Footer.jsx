import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, ArrowUpRight } from "lucide-react";
import logo from "../assets/logo.jpeg";
import { CONTACT_INFO, SERVICES } from "../data/servicesData";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "Project", href: "#project" },
  { label: "Contact Us", href: "#contact" },
];

const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi Chauhan MIS Automation Services, I came across your website and I'm interested in learning more about your AI Automation & Custom Software solutions. Could we connect to discuss my requirements?"
);

export default function Footer() {
  return (
    <footer className="relative bg-navy-950 border-t border-white/5 overflow-hidden">
      <div className="pointer-events-none absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <img src={logo} alt="Chauhan MIS Automation Services" className="h-12 w-auto" />
            <p className="mt-4 text-sm leading-relaxed text-ice-200/60 max-w-xs">
              We build AI Agents, Custom ERP, CRM, and high-performance business software
              that automates workflows and helps businesses scale with confidence.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[
                { icon: Phone, href: `tel:${CONTACT_INFO.phone.replace(/\s/g, "")}` },
                { icon: MessageCircle, href: `https://wa.me/${CONTACT_INFO.whatsapp}?text=${WHATSAPP_MESSAGE}` },
                { icon: Mail, href: `mailto:${CONTACT_INFO.email}` },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.08 }}
                  className="grid place-items-center h-10 w-10 rounded-full border border-white/10 bg-white/[0.04] text-ice-200/70 transition-colors hover:text-white hover:border-teal-500/50 hover:bg-teal-500/10"
                >
                  <s.icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-sm font-semibold text-white">Quick Links</p>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-ice-200/60 transition-colors hover:text-teal-400"
                  >
                    <span className="relative">
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-teal-400 transition-all duration-300 group-hover:w-full" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-sm font-semibold text-white">Our Services</p>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="group inline-flex items-center gap-1.5 text-sm text-ice-200/60 transition-colors hover:text-teal-400"
                  >
                    <span className="relative">
                      {s.title}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-teal-400 transition-all duration-300 group-hover:w-full" />
                    </span>
                    <ArrowUpRight size={12} className="opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm font-semibold text-white">Get In Touch</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`} className="flex items-start gap-2.5 text-sm text-ice-200/60 hover:text-white transition-colors">
                  <Phone size={15} className="mt-0.5 text-teal-500" /> {CONTACT_INFO.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-start gap-2.5 text-sm text-ice-200/60 hover:text-white transition-colors">
                  <Mail size={15} className="mt-0.5 text-teal-500" /> {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-ice-200/60">
                <MapPin size={15} className="mt-0.5 text-teal-500" /> {CONTACT_INFO.address}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ice-200/40">
            © {new Date().getFullYear()} Chauhan MIS Automation Services. All rights reserved.
          </p>
          <p className="text-xs text-ice-200/40">
            Automate &middot; Optimize &middot; Grow 🚀
          </p>
        </div>
      </div>
    </footer>
  );
}
