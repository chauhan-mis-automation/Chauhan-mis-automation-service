// // import { useState } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { Phone, Mail, MapPin, Send, PhoneCall, MessageCircle, Copy, Check } from "lucide-react";
// // import { CONTACT_INFO } from "../data/servicesData";

// // const WHATSAPP_MESSAGE = encodeURIComponent(
// //   "Hi Chauhan MIS Automation Services, I came across your website and I'm interested in learning more about your AI Automation & Custom Software solutions. Could we connect to discuss my requirements?"
// // );

// // const CONTACT_CARDS = [
// //   { icon: Phone, label: "Call Us", value: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone.replace(/\s/g, "")}` },
// //   { icon: MessageCircle, label: "WhatsApp", value: "Chat with us instantly", href: `https://wa.me/${CONTACT_INFO.whatsapp}?text=${WHATSAPP_MESSAGE}`, iconBg: "from-[#25D366] to-[#128C7E]" },
// //   { icon: Mail, label: "Email Us", value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
// //   { icon: MapPin, label: "Location", value: CONTACT_INFO.address, href: null },
// // ];

// // const initialForm = { name: "", phone: "", email: "", service: "AI Automation", message: "" };

// // export default function Contact() {
// //   const [form, setForm] = useState(initialForm);
// //   const [submitted, setSubmitted] = useState(false);
// //   const [toast, setToast] = useState("");

// //   const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     const subject = `New Enquiry from Website — ${form.service}`;
// //     const body =
// //       `You have a new enquiry from the Chauhan MIS Automation Services website:\n\n` +
// //       `Name: ${form.name}\n` +
// //       `Phone: ${form.phone}\n` +
// //       `Email: ${form.email}\n` +
// //       `Service Needed: ${form.service}\n\n` +
// //       `Message:\n${form.message}`;

// //     const mailtoUrl = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
// //     window.location.href = mailtoUrl;

// //     setSubmitted(true);
// //     setTimeout(() => {
// //       setSubmitted(false);
// //       setForm(initialForm);
// //     }, 4000);
// //   };

// //   const handleBookCall = async (e) => {
// //     // tel: works natively on mobile (opens dialer). On desktop, most browsers
// //     // do nothing unless a calling app is registered — so we also copy the
// //     // number to the clipboard as a reliable fallback everywhere.
// //     try {
// //       await navigator.clipboard.writeText(CONTACT_INFO.phone);
// //       setToast(`Number copied: ${CONTACT_INFO.phone}`);
// //       setTimeout(() => setToast(""), 3000);
// //     } catch {
// //       // clipboard not available — tel: link below still fires
// //     }
// //   };

// //   return (
// //     <section id="contact" className="scroll-mt-24 bg-ice-50 pt-10 pb-16 relative overflow-hidden">
// //       <div className="pointer-events-none absolute top-0 right-1/4 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
// //       <div className="pointer-events-none absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />

// //       {/* toast */}
// //       <AnimatePresence>
// //         {toast && (
// //           <motion.div
// //             initial={{ opacity: 0, y: -12 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             exit={{ opacity: 0, y: -12 }}
// //             className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-2 rounded-full bg-navy-950 text-white px-5 py-2.5 text-sm shadow-xl"
// //           >
// //             <Check size={15} className="text-teal-400" /> {toast}
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
// //         <motion.div
// //           initial={{ opacity: 0, y: 16 }}
// //           whileInView={{ opacity: 1, y: 0 }}
// //           viewport={{ once: true, amount: 0.5 }}
// //           transition={{ duration: 0.5 }}
// //           className="text-center max-w-xl mx-auto"
// //         >
// //           <p className="text-xs font-semibold tracking-widest text-blue-500 uppercase">Get In Touch</p>
// //           <h2 className="font-display mt-2 text-3xl sm:text-4xl font-bold text-navy-900">Contact Us</h2>
// //           <p className="mt-3 text-navy-900/60">
// //             Let&apos;s discuss how we can automate and grow your business.
// //           </p>
// //         </motion.div>

// //         <div className="mt-14 grid lg:grid-cols-5 gap-8">
// //           {/* Contact info */}
// //           <motion.div
// //             initial={{ opacity: 0, x: -20 }}
// //             whileInView={{ opacity: 1, x: 0 }}
// //             viewport={{ once: true, amount: 0.3 }}
// //             transition={{ duration: 0.55 }}
// //             className="lg:col-span-2 space-y-4"
// //           >
// //             {CONTACT_CARDS.map((card, i) => (
// //               <motion.a
// //                 key={card.label}
// //                 href={card.href || undefined}
// //                 target={card.href?.startsWith("http") ? "_blank" : undefined}
// //                 rel={card.href?.startsWith("http") ? "noopener noreferrer" : undefined}
// //                 whileHover={{ x: 6 }}
// //                 initial={{ opacity: 0, y: 14 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 viewport={{ once: true }}
// //                 transition={{ duration: 0.4, delay: i * 0.1 }}
// //                 className="flex items-center gap-4 rounded-2xl border border-navy-900/5 bg-white p-5 shadow-sm hover:shadow-lg transition-shadow"
// //               >
// //                 <span className={`grid place-items-center h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br ${card.iconBg || "from-blue-500 to-violet-500"} text-white`}>
// //                   <card.icon size={20} />
// //                 </span>
// //                 <div>
// //                   <p className="text-xs text-navy-900/50">{card.label}</p>
// //                   <p className="text-sm font-semibold text-navy-900">{card.value}</p>
// //                 </div>
// //               </motion.a>
// //             ))}

// //             {/* CTA banner */}
// //             <motion.div
// //               initial={{ opacity: 0, y: 14 }}
// //               whileInView={{ opacity: 1, y: 0 }}
// //               viewport={{ once: true }}
// //               transition={{ duration: 0.5, delay: 0.3 }}
// //               className="relative overflow-hidden rounded-2xl bg-navy-950 p-6"
// //             >
// //               <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-teal-500/20 blur-2xl" />
// //               <p className="font-display text-lg font-bold text-white">
// //                 Let AI Agents Run Your Business
// //               </p>
// //               <p className="mt-1.5 text-sm text-ice-200/70">
// //                 End-to-end automation for every department and industry.
// //               </p>
// //               <div className="mt-4 flex flex-wrap gap-3">
// //                 <a
// //                   href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
// //                   onClick={handleBookCall}
// //                   className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
// //                 >
// //                   <PhoneCall size={15} /> Book a Call
// //                 </a>
// //                 <a
// //                   href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${WHATSAPP_MESSAGE}`}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
// //                 >
// //                   <MessageCircle size={15} /> WhatsApp Us
// //                 </a>
// //               </div>
// //               <p className="mt-3 flex items-center gap-1.5 text-[11px] text-ice-200/40">
// //                 <Copy size={11} /> Tap "Book a Call" to dial on mobile, or copy the number on desktop.
// //               </p>
// //             </motion.div>
// //           </motion.div>

// //           {/* Form */}
// //           <motion.form
// //             onSubmit={handleSubmit}
// //             initial={{ opacity: 0, x: 20 }}
// //             whileInView={{ opacity: 1, x: 0 }}
// //             viewport={{ once: true, amount: 0.3 }}
// //             transition={{ duration: 0.55, delay: 0.1 }}
// //             className="lg:col-span-3 rounded-2xl border border-navy-900/5 bg-white p-6 sm:p-8 shadow-sm"
// //           >
// //             <div className="grid sm:grid-cols-2 gap-5">
// //               <div>
// //                 <label className="text-xs font-medium text-navy-900/60">Full Name</label>
// //                 <input
// //                   required
// //                   type="text"
// //                   value={form.name}
// //                   onChange={update("name")}
// //                   placeholder="Your name"
// //                   className="mt-1.5 w-full rounded-lg border border-navy-900/10 bg-ice-50 px-4 py-2.5 text-sm text-navy-900 outline-none transition-colors focus:border-blue-500"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="text-xs font-medium text-navy-900/60">Phone Number</label>
// //                 <input
// //                   required
// //                   type="tel"
// //                   value={form.phone}
// //                   onChange={update("phone")}
// //                   placeholder="+91 00000 00000"
// //                   className="mt-1.5 w-full rounded-lg border border-navy-900/10 bg-ice-50 px-4 py-2.5 text-sm text-navy-900 outline-none transition-colors focus:border-blue-500"
// //                 />
// //               </div>
// //               <div className="sm:col-span-2">
// //                 <label className="text-xs font-medium text-navy-900/60">Email Address</label>
// //                 <input
// //                   required
// //                   type="email"
// //                   value={form.email}
// //                   onChange={update("email")}
// //                   placeholder="you@company.com"
// //                   className="mt-1.5 w-full rounded-lg border border-navy-900/10 bg-ice-50 px-4 py-2.5 text-sm text-navy-900 outline-none transition-colors focus:border-blue-500"
// //                 />
// //               </div>
// //               <div className="sm:col-span-2">
// //                 <label className="text-xs font-medium text-navy-900/60">What do you need?</label>
// //                 <select
// //                   value={form.service}
// //                   onChange={update("service")}
// //                   className="mt-1.5 w-full rounded-lg border border-navy-900/10 bg-ice-50 px-4 py-2.5 text-sm text-navy-900 outline-none transition-colors focus:border-blue-500"
// //                 >
// //                   <option>AI Automation</option>
// //                   <option>Custom Software / ERP / CRM</option>
// //                   <option>Website Development</option>
// //                   <option>Something Else</option>
// //                 </select>
// //               </div>
// //               <div className="sm:col-span-2">
// //                 <label className="text-xs font-medium text-navy-900/60">Message</label>
// //                 <textarea
// //                   required
// //                   rows={4}
// //                   value={form.message}
// //                   onChange={update("message")}
// //                   placeholder="Tell us about your project..."
// //                   className="mt-1.5 w-full rounded-lg border border-navy-900/10 bg-ice-50 px-4 py-2.5 text-sm text-navy-900 outline-none transition-colors focus:border-blue-500 resize-none"
// //                 />
// //               </div>
// //             </div>

// //             <motion.button
// //               whileHover={{ scale: 1.02 }}
// //               whileTap={{ scale: 0.98 }}
// //               type="submit"
// //               className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25"
// //             >
// //               {submitted ? "Opening Your Email App..." : "Send Message"}
// //               {!submitted && <Send size={15} />}
// //             </motion.button>
// //             <p className="mt-3 text-[11px] text-navy-900/40">
// //               This opens your email app with everything pre-filled — just hit send from there.
// //             </p>
// //           </motion.form>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }


// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Phone, Mail, MapPin, Send, PhoneCall, MessageCircle, Copy, Check } from "lucide-react";
// import { CONTACT_INFO } from "../data/servicesData";

// const WHATSAPP_MESSAGE = encodeURIComponent(
//   "Hi Chauhan MIS Automation Services, I came across your website and I'm interested in learning more about your AI Automation & Custom Software solutions. Could we connect to discuss my requirements?"
// );

// const CONTACT_CARDS = [
//   { icon: Phone, label: "Call Us", value: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone.replace(/\s/g, "")}` },
//   { icon: MessageCircle, label: "WhatsApp", value: "Chat with us instantly", href: `https://wa.me/${CONTACT_INFO.whatsapp}?text=${WHATSAPP_MESSAGE}`, iconBg: "from-[#25D366] to-[#128C7E]" },
//   { icon: Mail, label: "Email Us", value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
//   { icon: MapPin, label: "Location", value: CONTACT_INFO.address, href: null },
// ];

// const initialForm = { name: "", phone: "", email: "", service: "AI Automation & AI Agents", message: "" };

// // Paste your deployed Google Apps Script Web App URL here (ends in /exec)
// const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbxReGnjGOmwe18Fsc4LDjkvQf9XCsxSrZsZ-iPhae4d3UTfTV1ZDmTjV8wypsj6PPyY/exec";

// export default function Contact() {
//   const [form, setForm] = useState(initialForm);
//   const [submitted, setSubmitted] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [toast, setToast] = useState("");

//   const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);

//     // 1. Save the enquiry to the Google Sheet (fire-and-forget-safe with try/catch)
//     try {
//       await fetch(GOOGLE_SHEET_URL, {
//         method: "POST",
//         mode: "no-cors", // Apps Script doesn't return CORS headers; no-cors lets the request go through
//         headers: { "Content-Type": "text/plain" }, // avoids a CORS preflight
//         body: JSON.stringify({
//           name: form.name,
//           phone: form.phone,
//           email: form.email,
//           service: form.service,
//           message: form.message,
//         }),
//       });
//     } catch (err) {
//       // Even if this fails, we still let the user proceed with the mailto fallback below
//       console.error("Failed to save enquiry to Google Sheet:", err);
//     }

//     setSaving(false);
//     setSubmitted(true);
//     setTimeout(() => {
//       setSubmitted(false);
//       setForm(initialForm);
//     }, 4000);
//   };

//   const handleBookCall = async (e) => {
//     // tel: works natively on mobile (opens dialer). On desktop, most browsers
//     // do nothing unless a calling app is registered — so we also copy the
//     // number to the clipboard as a reliable fallback everywhere.
//     try {
//       await navigator.clipboard.writeText(CONTACT_INFO.phone);
//       setToast(`Number copied: ${CONTACT_INFO.phone}`);
//       setTimeout(() => setToast(""), 3000);
//     } catch {
//       // clipboard not available — tel: link below still fires
//     }
//   };

//   return (
//     <section id="contact" className="scroll-mt-24 bg-ice-50 pt-10 pb-16 relative overflow-hidden">
//       <div className="pointer-events-none absolute top-0 right-1/4 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
//       <div className="pointer-events-none absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />

//       {/* toast */}
//       <AnimatePresence>
//         {toast && (
//           <motion.div
//             initial={{ opacity: 0, y: -12 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -12 }}
//             className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-2 rounded-full bg-navy-950 text-white px-5 py-2.5 text-sm shadow-xl"
//           >
//             <Check size={15} className="text-teal-400" /> {toast}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.5 }}
//           transition={{ duration: 0.5 }}
//           className="text-center max-w-xl mx-auto"
//         >
//           <p className="text-xs font-semibold tracking-widest text-blue-500 uppercase">Get In Touch</p>
//           <h2 className="font-display mt-2 text-3xl sm:text-4xl font-bold text-navy-900">Contact Us</h2>
//           <p className="mt-3 text-navy-900/60">
//             Let&apos;s discuss how we can automate and grow your business.
//           </p>
//         </motion.div>

//         <div className="mt-14 grid lg:grid-cols-5 gap-8">
//           {/* Contact info */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true, amount: 0.3 }}
//             transition={{ duration: 0.55 }}
//             className="lg:col-span-2 space-y-4"
//           >
//             {CONTACT_CARDS.map((card, i) => (
//               <motion.a
//                 key={card.label}
//                 href={card.href || undefined}
//                 target={card.href?.startsWith("http") ? "_blank" : undefined}
//                 rel={card.href?.startsWith("http") ? "noopener noreferrer" : undefined}
//                 whileHover={{ x: 6 }}
//                 initial={{ opacity: 0, y: 14 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.4, delay: i * 0.1 }}
//                 className="flex items-center gap-4 rounded-2xl border border-navy-900/5 bg-white p-5 shadow-sm hover:shadow-lg transition-shadow"
//               >
//                 <span className={`grid place-items-center h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br ${card.iconBg || "from-blue-500 to-violet-500"} text-white`}>
//                   <card.icon size={20} />
//                 </span>
//                 <div>
//                   <p className="text-xs text-navy-900/50">{card.label}</p>
//                   <p className="text-sm font-semibold text-navy-900">{card.value}</p>
//                 </div>
//               </motion.a>
//             ))}

//             {/* CTA banner */}
//             <motion.div
//               initial={{ opacity: 0, y: 14 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//               className="relative overflow-hidden rounded-2xl bg-navy-950 p-6"
//             >
//               <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-teal-500/20 blur-2xl" />
//               <p className="font-display text-lg font-bold text-white">
//                 Let AI Agents Run Your Business
//               </p>
//               <p className="mt-1.5 text-sm text-ice-200/70">
//                 End-to-end automation for every department and industry.
//               </p>
//               <div className="mt-4 flex flex-wrap gap-3">
//                 <a
//                   href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
//                   onClick={handleBookCall}
//                   className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
//                 >
//                   <PhoneCall size={15} /> Book a Call
//                 </a>
//                 <a
//                   href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${WHATSAPP_MESSAGE}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
//                 >
//                   <MessageCircle size={15} /> WhatsApp Us
//                 </a>
//               </div>
//               <p className="mt-3 flex items-center gap-1.5 text-[11px] text-ice-200/40">
//                 <Copy size={11} /> Tap "Book a Call" to dial on mobile, or copy the number on desktop.
//               </p>
//             </motion.div>
//           </motion.div>

//           {/* Form */}
//           <motion.form
//             onSubmit={handleSubmit}
//             initial={{ opacity: 0, x: 20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true, amount: 0.3 }}
//             transition={{ duration: 0.55, delay: 0.1 }}
//             className="lg:col-span-3 rounded-2xl border border-navy-900/5 bg-white p-6 sm:p-8 shadow-sm"
//           >
//             <div className="grid sm:grid-cols-2 gap-5">
//               <div>
//                 <label className="text-xs font-medium text-navy-900/60">Full Name</label>
//                 <input
//                   required
//                   type="text"
//                   value={form.name}
//                   onChange={update("name")}
//                   placeholder="Your name"
//                   className="mt-1.5 w-full rounded-lg border border-navy-900/10 bg-ice-50 px-4 py-2.5 text-sm text-navy-900 outline-none transition-colors focus:border-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="text-xs font-medium text-navy-900/60">Phone Number</label>
//                 <input
//                   required
//                   type="tel"
//                   value={form.phone}
//                   onChange={update("phone")}
//                   placeholder="+91 00000 00000"
//                   className="mt-1.5 w-full rounded-lg border border-navy-900/10 bg-ice-50 px-4 py-2.5 text-sm text-navy-900 outline-none transition-colors focus:border-blue-500"
//                 />
//               </div>
//               <div className="sm:col-span-2">
//                 <label className="text-xs font-medium text-navy-900/60">Email Address</label>
//                 <input
//                   required
//                   type="email"
//                   value={form.email}
//                   onChange={update("email")}
//                   placeholder="you@company.com"
//                   className="mt-1.5 w-full rounded-lg border border-navy-900/10 bg-ice-50 px-4 py-2.5 text-sm text-navy-900 outline-none transition-colors focus:border-blue-500"
//                 />
//               </div>
//               <div className="sm:col-span-2">
//                 <label className="text-xs font-medium text-navy-900/60">What do you need?</label>
//                 <select
//                   value={form.service}
//                   onChange={update("service")}
//                   className="mt-1.5 w-full rounded-lg border border-navy-900/10 bg-ice-50 px-4 py-2.5 text-sm text-navy-900 outline-none transition-colors focus:border-blue-500"
//                 >
//                   <option>Google Sheets & Apps Script Automation</option>
//                   <option>CRM & Lead Management</option>
//                   <option>AI Automation & AI Agents</option>
//                   <option>WhatsApp Automation & Bulk Messaging</option>
//                   <option>Custom Software / ERP / CRM</option>
//                   <option>Website Development</option>
//                   <option>Something Else</option>
//                 </select>
//               </div>
//               <div className="sm:col-span-2">
//                 <label className="text-xs font-medium text-navy-900/60">Message</label>
//                 <textarea
//                   required
//                   rows={4}
//                   value={form.message}
//                   onChange={update("message")}
//                   placeholder="Tell us about your project..."
//                   className="mt-1.5 w-full rounded-lg border border-navy-900/10 bg-ice-50 px-4 py-2.5 text-sm text-navy-900 outline-none transition-colors focus:border-blue-500 resize-none"
//                 />
//               </div>
//             </div>

//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               type="submit"
//               className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25"
//             >
//               {saving ? "Sending..." : submitted ? "Message Sent!" : "Send Message"}
//               {!saving && !submitted && <Send size={15} />}
//             </motion.button>
//             <p className="mt-3 text-[11px] text-navy-900/40">
//               {submitted
//                 ? "Thanks! We've received your enquiry and will get back to you shortly."
//                 : "We usually respond within a few hours."}
//             </p>
//           </motion.form>
//         </div>
//       </div>
//     </section>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Send, PhoneCall, MessageCircle, Copy, Check } from "lucide-react";
import { CONTACT_INFO } from "../data/servicesData";

const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi Chauhan MIS Automation Services, I came across your website and I'm interested in learning more about your AI Automation & Custom Software solutions. Could we connect to discuss my requirements?"
);

const CONTACT_CARDS = [
  { icon: Phone, label: "Call Us", value: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone.replace(/\s/g, "")}` },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat with us instantly", href: `https://wa.me/${CONTACT_INFO.whatsapp}?text=${WHATSAPP_MESSAGE}`, iconBg: "from-[#25D366] to-[#128C7E]" },
  { icon: Mail, label: "Email Us", value: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
  { icon: MapPin, label: "Location", value: CONTACT_INFO.address, href: null },
];

const initialForm = { name: "", phone: "", email: "", service: "AI Automation & AI Agents", message: "" };

// Paste your deployed Google Apps Script Web App URL here (ends in /exec)
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbxReGnjGOmwe18Fsc4LDjkvQf9XCsxSrZsZ-iPhae4d3UTfTV1ZDmTjV8wypsj6PPyY/exec";

export default function Contact() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const [toast, setToast] = useState("");

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(false);

    try {
      // Save the enquiry to the Google Sheet
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors", // Apps Script doesn't return CORS headers; no-cors lets the request go through
        headers: { "Content-Type": "text/plain" }, // avoids a CORS preflight
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          service: form.service,
          message: form.message,
        }),
      });

      // Only redirect to the Thank You page on a successful submission —
      // this keeps ad conversion tracking accurate (no redirect on failed/blocked requests)
      setSaving(false);
      setSubmitted(true);
      setForm(initialForm);
      navigate("/thank-you");
    } catch (err) {
      console.error("Failed to save enquiry to Google Sheet:", err);
      setSaving(false);
      setError(true);
    }
  };

  const handleBookCall = async (e) => {
    // tel: works natively on mobile (opens dialer). On desktop, most browsers
    // do nothing unless a calling app is registered — so we also copy the
    // number to the clipboard as a reliable fallback everywhere.
    try {
      await navigator.clipboard.writeText(CONTACT_INFO.phone);
      setToast(`Number copied: ${CONTACT_INFO.phone}`);
      setTimeout(() => setToast(""), 3000);
    } catch {
      // clipboard not available — tel: link below still fires
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 bg-ice-50 pt-10 pb-16 relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 right-1/4 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />

      {/* toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-2 rounded-full bg-navy-950 text-white px-5 py-2.5 text-sm shadow-xl"
          >
            <Check size={15} className="text-teal-400" /> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-xl mx-auto"
        >
          <p className="text-xs font-semibold tracking-widest text-blue-500 uppercase">Get In Touch</p>
          <h2 className="font-display mt-2 text-3xl sm:text-4xl font-bold text-navy-900">Contact Us</h2>
          <p className="mt-3 text-navy-900/60">
            Let&apos;s discuss how we can automate and grow your business.
          </p>
        </motion.div>

        <div className="mt-14 grid lg:grid-cols-5 gap-8">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-2 space-y-4"
          >
            {CONTACT_CARDS.map((card, i) => (
              <motion.a
                key={card.label}
                href={card.href || undefined}
                target={card.href?.startsWith("http") ? "_blank" : undefined}
                rel={card.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                whileHover={{ x: 6 }}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-4 rounded-2xl border border-navy-900/5 bg-white p-5 shadow-sm hover:shadow-lg transition-shadow"
              >
                <span className={`grid place-items-center h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br ${card.iconBg || "from-blue-500 to-violet-500"} text-white`}>
                  <card.icon size={20} />
                </span>
                <div>
                  <p className="text-xs text-navy-900/50">{card.label}</p>
                  <p className="text-sm font-semibold text-navy-900">{card.value}</p>
                </div>
              </motion.a>
            ))}

            {/* CTA banner */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative overflow-hidden rounded-2xl bg-navy-950 p-6"
            >
              <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-teal-500/20 blur-2xl" />
              <p className="font-display text-lg font-bold text-white">
                Let AI Agents Run Your Business
              </p>
              <p className="mt-1.5 text-sm text-ice-200/70">
                End-to-end automation for every department and industry.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                  onClick={handleBookCall}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
                >
                  <PhoneCall size={15} /> Book a Call
                </a>
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${WHATSAPP_MESSAGE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
                >
                  <MessageCircle size={15} /> WhatsApp Us
                </a>
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-[11px] text-ice-200/40">
                <Copy size={11} /> Tap "Book a Call" to dial on mobile, or copy the number on desktop.
              </p>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-3 rounded-2xl border border-navy-900/5 bg-white p-6 sm:p-8 shadow-sm"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-medium text-navy-900/60">Full Name</label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Your name"
                  className="mt-1.5 w-full rounded-lg border border-navy-900/10 bg-ice-50 px-4 py-2.5 text-sm text-navy-900 outline-none transition-colors focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-navy-900/60">Phone Number</label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  placeholder="+91 00000 00000"
                  className="mt-1.5 w-full rounded-lg border border-navy-900/10 bg-ice-50 px-4 py-2.5 text-sm text-navy-900 outline-none transition-colors focus:border-blue-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-navy-900/60">Email Address</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@company.com"
                  className="mt-1.5 w-full rounded-lg border border-navy-900/10 bg-ice-50 px-4 py-2.5 text-sm text-navy-900 outline-none transition-colors focus:border-blue-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-navy-900/60">What do you need?</label>
                <select
                  value={form.service}
                  onChange={update("service")}
                  className="mt-1.5 w-full rounded-lg border border-navy-900/10 bg-ice-50 px-4 py-2.5 text-sm text-navy-900 outline-none transition-colors focus:border-blue-500"
                >
                  <option>Google Sheets & Apps Script Automation</option>
                  <option>CRM & Lead Management</option>
                  <option>AI Automation & AI Agents</option>
                  <option>WhatsApp Automation & Bulk Messaging</option>
                  <option>Custom Software / ERP / CRM</option>
                  <option>Website Development</option>
                  <option>Something Else</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-navy-900/60">Message</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Tell us about your project..."
                  className="mt-1.5 w-full rounded-lg border border-navy-900/10 bg-ice-50 px-4 py-2.5 text-sm text-navy-900 outline-none transition-colors focus:border-blue-500 resize-none"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={saving}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 disabled:opacity-70"
            >
              {saving ? "Sending..." : "Send Message"}
              {!saving && <Send size={15} />}
            </motion.button>
            <p className="mt-3 text-[11px] text-navy-900/40">
              {error
                ? "Something went wrong. Please check your internet connection and try again."
                : "We usually respond within a few hours."}
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}