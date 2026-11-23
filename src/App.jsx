// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import Services from "./components/Services";
// import About from "./components/About";
// import Project from "./components/Project";
// import Contact from "./components/Contact";
// import Footer from "./components/Footer";

// export default function App() {
//   return (
//     <div className="min-h-screen bg-ice-50">
//       <Navbar />
//       <Hero />
//       <Services />
//       <About />
//       <Project />
//       <Contact />
//       <Footer />
//     </div>
//   );
// }


import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Project from "./components/Project";
import Contact from "./components/Contact";
import Blog from "./components/Blog";
import BlogPost from "./components/BlogPost";
import Footer from "./components/Footer";
import ThankYou from "./components/ThankYou";

// URL ka pehla hissa -> homepage ka section id
// /services -> #services, /blog -> #blog, / -> #home
const SECTION_IDS = ["home", "services", "about", "project", "contact", "blog"];

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Purane links (chauhanmis.com/#blog) ko naye URL (/blog) par bhejo
    const hash = location.hash.replace("#", "");
    if (hash && SECTION_IDS.includes(hash)) {
      navigate(hash === "home" ? "/" : `/${hash}`, { replace: true });
      return;
    }

    // Service popup khulne/band hone par page scroll mat karo
    if (location.state?.noScroll) return;

    const first = location.pathname.split("/").filter(Boolean)[0] || "home";
    const id = SECTION_IDS.includes(first) ? first : "home";

    // Page render hone ke baad section tak scroll karo
    const t = setTimeout(() => {
      if (id === "home") window.scrollTo({ top: 0, behavior: "smooth" });
      else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 80);
    return () => clearTimeout(t);
  }, [location.key]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Project />
      <Contact />
      <Blog />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-ice-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<HomePage />} />
          <Route path="/services/:serviceId" element={<HomePage />} />
          <Route path="/about" element={<HomePage />} />
          <Route path="/project" element={<HomePage />} />
          <Route path="/contact" element={<HomePage />} />
          <Route path="/blog" element={<HomePage />} />
          <Route path="/blog/category/:categorySlug" element={<HomePage />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
