import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.jpeg";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Project", href: "#project" },
  { label: "Contact Us", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy-950/95 backdrop-blur border-b border-white/5">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 h-24">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 shrink-0">
          <img src={logo} alt="Chauhan MIS Automation Services" className="h-16 lg:h-[4.5rem] w-auto" />
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-9 font-display text-sm text-ice-50/90">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="relative py-2 transition-colors hover:text-teal-500 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-teal-500 after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-transform hover:scale-[1.03]"
        >
          Get a Free Consultation
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-ice-50"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy-950 border-t border-white/5 px-6 py-6">
          <ul className="flex flex-col gap-5 font-display text-ice-50/90">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white"
          >
            Get a Free Consultation
          </a>
        </div>
      )}
    </header>
  );
}
