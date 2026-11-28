import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar, User, FolderOpen, Search, Clock, ArrowLeft, ArrowRight, Loader2, Tag, MessageCircle,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { CONTACT_INFO } from "../data/servicesData";
import {
  fetchAllBlogs,
  slugify, parseKeywords, sanitizeHtml, formatDate, blogUrl,
} from "../lib/blogApi";
import BlogImage from "./BlogImage";

const SITE_NAME = "Chauhan MIS Automation Services";

// <meta name="..."> ya <meta property="..."> set karo (SEO / WhatsApp share preview)
function setMeta(attr, key, value) {
  if (!value) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

export default function BlogPost() {
  const { slug } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  // Blogs load karo (drafts bhi, taaki draft ka preview link chale)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const list = await fetchAllBlogs();
        if (!cancelled) setBlogs(list);
      } catch (err) {
        console.error(err);
        if (!cancelled) setError("Could not load this blog. Please try again later.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const blog = blogs.find((b) => (b.slug || slugify(b.title)) === slug);

  // Naya blog khule to page upar se shuru ho
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  // SEO: title, meta description, keywords, share preview
  useEffect(() => {
    if (!blog) return;
    const prevTitle = document.title;
    const descMeta = document.head.querySelector('meta[name="description"]');
    const prevDesc = descMeta?.getAttribute("content");

    const title = blog.seoTitle || `${blog.title} | ${SITE_NAME}`;
    const desc = blog.metaDescription || blog.shortDescription;
    document.title = title;
    setMeta("name", "description", desc);
    setMeta("name", "keywords", blog.keywords);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:image", blog.image);
    setMeta("property", "og:url", window.location.href);
    setMeta("property", "og:type", "article");

    return () => {
      document.title = prevTitle;
      if (descMeta && prevDesc != null) descMeta.setAttribute("content", prevDesc);
    };
  }, [blog]);

  const safeContent = useMemo(() => (blog ? sanitizeHtml(blog.content) : ""), [blog]);

  // Sidebar: search results ya recent blogs (current wala chhod kar)
  const published = blogs.filter((b) => b.status === "Published");
  const q = query.trim().toLowerCase();
  const sidebarBlogs = (q
    ? published.filter((b) =>
        [b.title, b.shortDescription, b.category, b.keywords].join(" ").toLowerCase().includes(q)
      )
    : published.filter((b) => b.id !== blog?.id)
  ).slice(0, q ? 10 : 5);

  const categories = [...new Set(published.map((b) => b.category))];

  const whatsappText = encodeURIComponent(
    `Hi ${SITE_NAME}, I read your blog "${blog?.title || ""}" and want to know more.`
  );

  return (
    <>
      <Navbar />
      <main className="bg-ice-50 min-h-[60vh] pt-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          {/* Breadcrumb */}
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-navy-900/50 mb-6">
            <Link to="/" className="hover:text-blue-500">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-blue-500">Blog</Link>
            {blog && (
              <>
                <span>/</span>
                <span className="text-navy-900/70 line-clamp-1">{blog.title}</span>
              </>
            )}
          </nav>

          {loading ? (
            <p className="py-32 flex items-center justify-center gap-2 text-sm text-navy-900/40">
              <Loader2 size={18} className="animate-spin" /> Loading blog...
            </p>
          ) : error ? (
            <p className="py-32 text-center text-sm text-red-500">{error}</p>
          ) : !blog ? (
            <div className="py-24 text-center">
              <h1 className="font-display text-2xl font-bold text-navy-900">Blog not found</h1>
              <p className="mt-2 text-sm text-navy-900/50">This blog may have been removed, or the link is incorrect.</p>
              <Link
                to="/blog"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white"
              >
                <ArrowLeft size={15} /> View All Blogs
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              {/* ---------------- Main article ---------------- */}
              <motion.article
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="lg:col-span-2 rounded-3xl border border-navy-900/5 bg-white p-6 sm:p-10 shadow-sm"
              >
                {blog.status === "Draft" && (
                  <p className="mb-4 rounded-lg bg-amber-100 px-4 py-2 text-xs font-semibold text-amber-800">
                    This blog is a draft. It is not listed on the website yet.
                  </p>
                )}

                <Link
                  to={`/blog/category/${slugify(blog.category)}`}
                  className="inline-block rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-500 hover:bg-blue-500/15"
                >
                  {blog.category}
                </Link>

                <h1 className="font-display mt-5 text-3xl sm:text-4xl lg:text-[2.75rem] lg:leading-tight font-bold text-navy-900">
                  {blog.title}
                </h1>

                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-navy-900/55">
                  <span className="flex items-center gap-1.5"><User size={15} /> {blog.author}</span>
                  <span className="flex items-center gap-1.5"><Calendar size={15} /> {formatDate(blog.createdAt)}</span>
                  <span className="flex items-center gap-1.5"><FolderOpen size={15} /> {blog.category}</span>
                </div>

                {blog.image && (
                  <BlogImage
                    src={blog.image}
                    alt={blog.title}
                    className="mt-8 w-full rounded-2xl object-cover shadow-sm"
                  />
                )}

                <div
                  className="blog-content blog-article mt-8 text-navy-900/80"
                  dangerouslySetInnerHTML={{ __html: safeContent }}
                />

                {blog.keywords && (
                  <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-navy-900/10 pt-6">
                    <Tag size={14} className="text-navy-900/40" />
                    {parseKeywords(blog.keywords).map((k) => (
                      <span key={k} className="rounded-full border border-navy-900/10 bg-ice-50 px-3 py-1 text-xs text-navy-900/60">
                        {k}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <div className="relative mt-10 overflow-hidden rounded-2xl bg-navy-950 p-6 sm:p-8">
                  <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-violet-500/25 blur-3xl" />
                  <p className="font-display text-xl font-bold text-white">Need automation for your business?</p>
                  <p className="mt-1.5 text-sm text-ice-200/70">Talk to us for a free consultation.</p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white"
                    >
                      Contact Us <ArrowRight size={15} />
                    </Link>
                    <a
                      href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${whatsappText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] px-5 py-2.5 text-sm font-semibold text-white"
                    >
                      <MessageCircle size={15} /> WhatsApp Us
                    </a>
                  </div>
                </div>

                <Link
                  to="/blog"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-500 hover:gap-3 transition-all"
                >
                  <ArrowLeft size={15} /> Back to all blogs
                </Link>
              </motion.article>

              {/* ---------------- Sidebar ---------------- */}
              <aside className="space-y-6 lg:sticky lg:top-28">
                {/* Search */}
                <div className="rounded-3xl border border-navy-900/5 bg-white p-6 shadow-sm">
                  <h2 className="flex items-center gap-2 font-display text-xl font-bold text-navy-900">
                    <Search size={20} className="text-blue-500" /> Search Blogs
                  </h2>
                  <div className="mt-4 border-t border-navy-900/10 pt-4">
                    <div className="flex overflow-hidden rounded-xl border border-navy-900/10 focus-within:border-blue-500">
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search blogs..."
                        className="w-full bg-white px-4 py-3 text-sm text-navy-900 outline-none"
                      />
                      <span className="grid w-12 shrink-0 place-items-center bg-gradient-to-br from-blue-500 to-violet-500 text-white">
                        <Search size={17} />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recent / search results */}
                <div className="rounded-3xl border border-navy-900/5 bg-white p-6 shadow-sm">
                  <h2 className="flex items-center gap-2 font-display text-xl font-bold text-navy-900">
                    <Clock size={20} className="text-blue-500" /> {q ? "Search Results" : "Recent Blogs"}
                  </h2>
                  <div className="mt-4 border-t border-navy-900/10">
                    {sidebarBlogs.length === 0 ? (
                      <p className="pt-4 text-sm text-navy-900/40">
                        {q ? "No blogs found." : "No other blogs yet."}
                      </p>
                    ) : (
                      sidebarBlogs.map((b) => (
                        <Link
                          key={b.id}
                          to={blogUrl(b)}
                          onClick={() => setQuery("")}
                          className="group flex gap-3 border-b border-navy-900/5 py-4 last:border-0"
                        >
                          <span className="h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-blue-500/15 to-violet-500/15">
                            {b.image && <BlogImage src={b.image} alt="" loading="lazy" className="h-full w-full object-cover" />}
                          </span>
                          <span>
                            <span className="text-sm font-semibold leading-snug text-navy-900 line-clamp-3 group-hover:text-blue-500 transition-colors">
                              {b.title}
                            </span>
                            <span className="mt-1.5 flex items-center gap-1.5 text-xs text-navy-900/45">
                              <Calendar size={12} /> {formatDate(b.createdAt)}
                            </span>
                          </span>
                        </Link>
                      ))
                    )}
                  </div>
                </div>

                {/* Categories */}
                {categories.length > 0 && (
                  <div className="rounded-3xl border border-navy-900/5 bg-white p-6 shadow-sm">
                    <h2 className="flex items-center gap-2 font-display text-xl font-bold text-navy-900">
                      <FolderOpen size={20} className="text-blue-500" /> Categories
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-2 border-t border-navy-900/10 pt-4">
                      {categories.map((c) => (
                        <Link
                          key={c}
                          to={`/blog/category/${slugify(c)}`}
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                            c === blog.category
                              ? "bg-navy-950 text-white"
                              : "border border-navy-900/10 bg-ice-50 text-navy-900/60 hover:text-blue-500"
                          }`}
                        >
                          {c}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}