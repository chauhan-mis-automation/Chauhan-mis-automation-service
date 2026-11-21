import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PenSquare, Save, X, Loader2, Lock, LogOut, Calendar, User, Tag, ArrowRight, Trash2, Pencil,
  Undo2, Redo2, Bold, Italic, Underline, Strikethrough, List, ListOrdered,
  Link2, ImagePlus, Quote, Minus, Eraser, Code2, AlignLeft, AlignCenter, AlignRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Google Sheet API                                                   */
/*  Apps Script ka Web App URL yahan paste karein (/exec se khatam)    */
/*  Code: google-apps-script/BlogScript.gs                             */
/* ------------------------------------------------------------------ */
const BLOG_API_URL = "https://script.google.com/macros/s/AKfycbzg1lFevoQkmfxYXS4Mtwx8gvTzcxSPPLiTjFPdSRdWeD8TrIpkTvs1PDEXMH57pC5iFw/exec";

const DEFAULT_AUTHOR = "Chauhan MIS Automation Services";
const MAX_KEYWORDS = 10;
const MAX_IMAGE_MB = 5;
const MAX_CONTENT_CHARS = 45000; // Google Sheet ek cell me ~50,000 characters tak leta hai
const PASSWORD_KEY = "chauhan_mis_blog_admin";

// Contact form ke "What do you need?" wale same options
const BLOG_CATEGORIES = [
  "Google Sheets & Apps Script Automation",
  "CRM & Lead Management",
  "AI Automation & AI Agents",
  "WhatsApp Automation & Bulk Messaging",
  "Custom Software / ERP / CRM",
  "Website Development",
];
const OTHER_CATEGORY = "__other__";

// Public: sirf Published blogs
async function fetchPublishedBlogs() {
  const res = await fetch(BLOG_API_URL);
  const data = await res.json();
  if (!data.ok) throw new Error(data.error || "Blogs load nahi ho paye");
  return data.blogs;
}

// Admin: password ke saath (list / save / delete / login)
async function adminRequest(body) {
  const res = await fetch(BLOG_API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" }, // CORS preflight se bachne ke liye
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!data.ok) throw new Error(data.error || "Request fail ho gayi");
  return data;
}

const getSavedPassword = () => {
  try { return sessionStorage.getItem(PASSWORD_KEY) || ""; } catch { return ""; }
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const parseKeywords = (text) =>
  text.split(",").map((k) => k.trim()).filter(Boolean);

// Strip scripts, event handlers and javascript: links before rendering HTML
function sanitizeHtml(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  doc.querySelectorAll("script, style, iframe, object, embed, form").forEach((el) => el.remove());
  doc.querySelectorAll("*").forEach((el) => {
    [...el.attributes].forEach((attr) => {
      const name = attr.name.toLowerCase();
      const value = attr.value.trim().toLowerCase();
      if (name.startsWith("on")) el.removeAttribute(attr.name);
      if ((name === "href" || name === "src") && value.startsWith("javascript:")) el.removeAttribute(attr.name);
    });
  });
  return doc.body.innerHTML;
}

// Resize image so it doesn't fill up storage (max 1200px wide, JPEG)
function compressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, 1200 / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

const initialForm = {
  title: "",
  image: "",
  category: "",
  author: DEFAULT_AUTHOR,
  shortDescription: "",
  content: "",
  seoTitle: "",
  metaDescription: "",
  keywords: "",
  status: "Draft",
};

/* ------------------------------------------------------------------ */
/*  Shared input styles (same as Contact form)                         */
/* ------------------------------------------------------------------ */
const labelCls = "text-xs font-semibold text-navy-900/80";
const inputCls =
  "mt-1.5 w-full rounded-lg border border-navy-900/10 bg-ice-50 px-4 py-2.5 text-sm text-navy-900 outline-none transition-colors focus:border-blue-500";
const hintCls = "mt-1 text-[11px] text-navy-900/45";

/* ------------------------------------------------------------------ */
/*  Rich text editor (no extra package needed)                         */
/* ------------------------------------------------------------------ */
function RichTextEditor({ value, onChange }) {
  const ref = useRef(null);
  const [codeView, setCodeView] = useState(false);

  // Keep editor DOM in sync when value changes from outside (reset / edit)
  useEffect(() => {
    if (!codeView && ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value;
    }
  }, [value, codeView]);

  const exec = (cmd, arg = null) => {
    ref.current?.focus();
    document.execCommand(cmd, false, arg);
    onChange(ref.current?.innerHTML || "");
  };

  const addLink = () => {
    const url = prompt("Link URL daalein (https://...)");
    if (url) exec("createLink", url);
  };

  const addImage = () => {
    const url = prompt("Image URL daalein (https://...)");
    if (url) exec("insertImage", url);
  };

  const tools = [
    { icon: Undo2, title: "Undo", run: () => exec("undo") },
    { icon: Redo2, title: "Redo", run: () => exec("redo") },
    "sep",
    { icon: Bold, title: "Bold", run: () => exec("bold") },
    { icon: Italic, title: "Italic", run: () => exec("italic") },
    { icon: Underline, title: "Underline", run: () => exec("underline") },
    { icon: Strikethrough, title: "Strikethrough", run: () => exec("strikeThrough") },
    "sep",
    { icon: AlignLeft, title: "Align left", run: () => exec("justifyLeft") },
    { icon: AlignCenter, title: "Align center", run: () => exec("justifyCenter") },
    { icon: AlignRight, title: "Align right", run: () => exec("justifyRight") },
    "sep",
    { icon: List, title: "Bullet list", run: () => exec("insertUnorderedList") },
    { icon: ListOrdered, title: "Numbered list", run: () => exec("insertOrderedList") },
    { icon: Link2, title: "Insert link", run: addLink },
    { icon: ImagePlus, title: "Insert image (URL)", run: addImage },
    { icon: Quote, title: "Quote", run: () => exec("formatBlock", "blockquote") },
    { icon: Minus, title: "Horizontal line", run: () => exec("insertHorizontalRule") },
    { icon: Eraser, title: "Clear formatting", run: () => exec("removeFormat") },
  ];

  return (
    <div className="mt-1.5 rounded-lg border border-navy-900/10 bg-white overflow-hidden focus-within:border-blue-500 transition-colors">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-navy-900/10 bg-ice-50 px-2 py-1.5">
        <select
          disabled={codeView}
          defaultValue=""
          onChange={(e) => {
            exec("formatBlock", e.target.value);
            e.target.value = "";
          }}
          className="mr-1 rounded border border-navy-900/10 bg-white px-2 py-1 text-xs text-navy-900 outline-none"
        >
          <option value="" disabled>Formats</option>
          <option value="p">Paragraph</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
        </select>
        {tools.map((t, i) =>
          t === "sep" ? (
            <span key={i} className="mx-1 h-4 w-px bg-navy-900/10" />
          ) : (
            <button
              key={t.title}
              type="button"
              title={t.title}
              disabled={codeView}
              onMouseDown={(e) => e.preventDefault()} // keep text selection
              onClick={t.run}
              className="grid place-items-center h-7 w-7 rounded text-navy-900/70 hover:bg-white hover:text-blue-500 disabled:opacity-30"
            >
              <t.icon size={14} />
            </button>
          )
        )}
        <button
          type="button"
          title="HTML code view"
          onClick={() => setCodeView((v) => !v)}
          className={`ml-auto grid place-items-center h-7 w-7 rounded ${codeView ? "bg-blue-500 text-white" : "text-navy-900/70 hover:bg-white hover:text-blue-500"}`}
        >
          <Code2 size={14} />
        </button>
      </div>

      {codeView ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full min-h-[320px] p-4 font-mono text-xs text-navy-900 outline-none resize-y"
        />
      ) : (
        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => onChange(e.currentTarget.innerHTML)}
          className="blog-content min-h-[320px] max-h-[600px] overflow-y-auto p-4 text-sm text-navy-900 outline-none"
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Blog form                                                          */
/* ------------------------------------------------------------------ */
function BlogForm({ initial, existingCategories, onSave, onCancel, saving }) {
  const [form, setForm] = useState(initial || initialForm);
  // Dropdown ke options: fixed list + pehle use hui custom categories
  const categoryOptions = [...new Set([...BLOG_CATEGORIES, ...existingCategories])];
  const [categoryChoice, setCategoryChoice] = useState(
    !form.category ? "" : categoryOptions.includes(form.category) ? form.category : OTHER_CATEGORY
  );

  const handleCategoryChoice = (e) => {
    const value = e.target.value;
    setCategoryChoice(value);
    setForm((f) => ({ ...f, category: value === OTHER_CATEGORY ? "" : value }));
  };
  const [imageError, setImageError] = useState("");
  const [formError, setFormError] = useState("");

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const slug = slugify(form.title);
  const categorySlug = slugify(form.category);
  const keywordList = parseKeywords(form.keywords);

  const handleImage = async (e) => {
    const file = e.target.files?.[0];
    setImageError("");
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setImageError("Sirf JPG, PNG ya WEBP image chalegi.");
      e.target.value = "";
      return;
    }
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      setImageError(`Image ${MAX_IMAGE_MB} MB se chhoti honi chahiye.`);
      e.target.value = "";
      return;
    }
    try {
      const dataUrl = await compressImage(file);
      setForm((f) => ({ ...f, image: dataUrl }));
    } catch {
      setImageError("Image load nahi ho payi, dusri image try karein.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    const plainContent = form.content.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
    if (!plainContent) {
      setFormError("Blog content khali nahi ho sakta.");
      return;
    }
    if (form.content.length > MAX_CONTENT_CHARS) {
      setFormError("Blog content bahut lamba hai. Content me paste ki hui images hata kar 'Insert image (URL)' use karein.");
      return;
    }
    if (keywordList.length > MAX_KEYWORDS) {
      setFormError(`Maximum ${MAX_KEYWORDS} SEO keywords allowed hain.`);
      return;
    }
    onSave({ ...form, slug, categorySlug, content: sanitizeHtml(form.content) });
  };

  const seoLen = form.seoTitle.length;
  const metaLen = form.metaDescription.length;

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.35 }}
      className="mx-auto mt-10 max-w-3xl rounded-2xl border border-navy-900/5 bg-white p-6 sm:p-8 shadow-sm space-y-5"
    >
      {/* Title */}
      <div>
        <label className={labelCls}>Blog Title *</label>
        <input required value={form.title} onChange={update("title")} placeholder="Enter English blog title" className={inputCls} />
        <p className={hintCls}>Blog title English me enter karein.</p>
      </div>

      {/* Slug */}
      <div>
        <label className={labelCls}>SEO Friendly Blog Slug</label>
        <div className="mt-1.5 rounded-lg border border-navy-900/10 bg-ice-200/50 px-4 py-2.5 text-sm text-navy-900/60">
          {slug || "Slug title se automatically generate hoga."}
        </div>
      </div>

      {/* Image */}
      <div>
        <label className={labelCls}>Featured Image</label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleImage}
          className="mt-1.5 w-full rounded-lg border border-navy-900/10 bg-ice-50 text-sm text-navy-900/70 file:mr-3 file:border-0 file:border-r file:border-navy-900/10 file:bg-white file:px-4 file:py-2.5 file:text-sm file:text-navy-900"
        />
        <p className={hintCls}>JPG, PNG or WEBP. Maximum {MAX_IMAGE_MB} MB.</p>
        {imageError && <p className="mt-1 text-xs text-red-500">{imageError}</p>}
        {form.image && (
          <div className="mt-3 relative inline-block">
            <img src={form.image} alt="Preview" className="h-32 rounded-lg object-cover" />
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, image: "" }))}
              className="absolute -top-2 -right-2 grid place-items-center h-6 w-6 rounded-full bg-navy-950 text-white"
              aria-label="Remove image"
            >
              <X size={12} />
            </button>
          </div>
        )}
      </div>

      {/* Category */}
      <div>
        <label className={labelCls}>Blog Category *</label>
        <select required value={categoryChoice} onChange={handleCategoryChoice} className={inputCls}>
          <option value="" disabled>Select category</option>
          {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
          <option value={OTHER_CATEGORY}>Other (nayi category likhein)</option>
        </select>
        {categoryChoice === OTHER_CATEGORY && (
          <input
            required
            autoFocus
            value={form.category}
            onChange={update("category")}
            placeholder="Nayi category ka naam likhein, jaise: MIS Reports"
            className={inputCls}
          />
        )}
        <p className={hintCls}>
          List se category chunein. Nayi category chahiye to "Other" chunein. Nayi category agle blog me list me apne aap aa jayegi.
        </p>
        <div className="mt-2 rounded-lg border border-navy-900/10 bg-ice-200/50 px-4 py-2.5 text-xs text-navy-900/60">
          <p className="font-semibold">Category URL Preview:</p>
          <p>/blog/category/{categorySlug}</p>
        </div>
      </div>

      {/* Author */}
      <div className="sm:w-1/2">
        <label className={labelCls}>Author</label>
        <input value={form.author} onChange={update("author")} className={inputCls} />
      </div>

      {/* Short description */}
      <div>
        <label className={labelCls}>Short Description *</label>
        <textarea
          required
          rows={3}
          value={form.shortDescription}
          onChange={update("shortDescription")}
          placeholder="Write a short description of your blog..."
          className={`${inputCls} resize-y`}
        />
      </div>

      {/* Content */}
      <div>
        <label className={labelCls}>Blog Content *</label>
        <RichTextEditor value={form.content} onChange={(html) => setForm((f) => ({ ...f, content: html }))} />
        <p className={hintCls}>Add headings, images, links, lists and formatted content.</p>
      </div>

      {/* SEO */}
      <div className="border-t border-navy-900/10 pt-5">
        <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-navy-900">
          <span className="grid place-items-center h-6 w-6 rounded-md bg-gradient-to-br from-blue-500 to-violet-500 text-[11px] font-bold text-white">G</span>
          SEO Settings
        </h3>
      </div>

      <div>
        <label className={labelCls}>SEO Title</label>
        <input value={form.seoTitle} onChange={update("seoTitle")} placeholder="SEO optimized title" className={inputCls} />
        <p className={hintCls}>
          Recommended: 50–60 characters.{" "}
          <span className={seoLen > 60 ? "text-red-500" : seoLen >= 50 ? "text-teal-500" : ""}>{seoLen}/60</span>
        </p>
      </div>

      <div>
        <label className={labelCls}>Meta Description</label>
        <textarea
          rows={2}
          value={form.metaDescription}
          onChange={update("metaDescription")}
          placeholder="Write SEO meta description..."
          className={`${inputCls} resize-y`}
        />
        <p className={hintCls}>
          Recommended: 140–160 characters.{" "}
          <span className={metaLen > 160 ? "text-red-500" : metaLen >= 140 ? "text-teal-500" : ""}>{metaLen}/160</span>
        </p>
      </div>

      <div>
        <label className={labelCls}>SEO Keywords</label>
        <input
          value={form.keywords}
          onChange={update("keywords")}
          placeholder="AI Automation, CRM Software, MIS Reports..."
          className={inputCls}
        />
        <p className={hintCls}>
          Maximum <b>{MAX_KEYWORDS} keywords</b>. Separate using commas.{" "}
          <b className={keywordList.length > MAX_KEYWORDS ? "text-red-500" : ""}>{keywordList.length}/{MAX_KEYWORDS}</b>
        </p>
      </div>

      <div>
        <label className={labelCls}>Blog Status</label>
        <select value={form.status} onChange={update("status")} className={inputCls}>
          <option>Draft</option>
          <option>Published</option>
        </select>
        <p className={hintCls}>Sirf "Published" blogs website par sabko dikhenge.</p>
      </div>

      {formError && <p className="text-sm text-red-500">{formError}</p>}

      <div className="flex flex-wrap gap-3 pt-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 disabled:opacity-70"
        >
          {saving ? <><Loader2 size={15} className="animate-spin" /> Saving...</> : <><Save size={15} /> Save Blog</>}
        </motion.button>
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-navy-900/70 px-6 py-3 text-sm font-semibold text-white hover:bg-navy-900"
        >
          Cancel
        </button>
      </div>
    </motion.form>
  );
}

/* ------------------------------------------------------------------ */
/*  Full blog view (modal)                                             */
/* ------------------------------------------------------------------ */
function BlogReader({ blog, onClose }) {
  // Basic on-page SEO while a blog is open
  useEffect(() => {
    const prevTitle = document.title;
    document.title = blog.seoTitle || blog.title;
    const meta = document.querySelector('meta[name="description"]');
    const prevMeta = meta?.getAttribute("content");
    if (meta && blog.metaDescription) meta.setAttribute("content", blog.metaDescription);
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.title = prevTitle;
      if (meta && prevMeta != null) meta.setAttribute("content", prevMeta);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [blog, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[150] bg-navy-950/70 backdrop-blur-sm overflow-y-auto px-4 py-10"
    >
      <motion.article
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative mx-auto max-w-3xl rounded-2xl bg-white shadow-2xl overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 grid place-items-center h-9 w-9 rounded-full bg-white/90 text-navy-900 shadow"
          aria-label="Close"
        >
          <X size={18} />
        </button>
        {blog.image && <img src={blog.image} alt={blog.title} className="w-full max-h-96 object-cover" />}
        <div className="p-6 sm:p-10">
          <span className="text-xs font-semibold tracking-widest text-blue-500 uppercase">{blog.category}</span>
          <h1 className="font-display mt-2 text-2xl sm:text-3xl font-bold text-navy-900">{blog.title}</h1>
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-navy-900/50">
            <span className="flex items-center gap-1.5"><User size={13} /> {blog.author}</span>
            <span className="flex items-center gap-1.5"><Calendar size={13} /> {formatDate(blog.createdAt)}</span>
          </div>
          <div
            className="blog-content mt-6 text-navy-900/80 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(blog.content) }}
          />
          {blog.keywords && (
            <div className="mt-8 flex flex-wrap gap-2 border-t border-navy-900/10 pt-5">
              {parseKeywords(blog.keywords).map((k) => (
                <span key={k} className="rounded-full bg-ice-50 border border-navy-900/10 px-3 py-1 text-xs text-navy-900/60">#{k}</span>
              ))}
            </div>
          )}
        </div>
      </motion.article>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Blog section                                                  */
/* ------------------------------------------------------------------ */
export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null); // blog being edited
  const [reading, setReading] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showDrafts, setShowDrafts] = useState(false);
  const [toast, setToast] = useState("");

  const [password, setPassword] = useState(getSavedPassword);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [checking, setChecking] = useState(false);
  const isAdmin = !!password;

  const flash = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  };

  // Sheet se blogs load karo (admin ko drafts bhi milenge)
  const loadBlogs = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const list = isAdmin
        ? (await adminRequest({ action: "list", password })).blogs
        : await fetchPublishedBlogs();
      setBlogs(list);
    } catch (err) {
      console.error(err);
      setLoadError("Blogs load nahi ho paye. Thodi der baad try karein.");
    } finally {
      setLoading(false);
    }
  }, [isAdmin, password]);

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  const categories = useMemo(() => [...new Set(blogs.map((b) => b.category))], [blogs]);

  const visibleBlogs = blogs
    .filter((b) => showDrafts || b.status === "Published")
    .filter((b) => activeCategory === "All" || b.category === activeCategory);

  const draftCount = blogs.filter((b) => b.status === "Draft").length;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setChecking(true);
    try {
      await adminRequest({ action: "login", password: passwordInput });
      try { sessionStorage.setItem(PASSWORD_KEY, passwordInput); } catch { /* ignore */ }
      setPassword(passwordInput);
      setPasswordInput("");
      setShowLogin(false);
      setShowForm(true); // login hote hi form khol do
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setChecking(false);
    }
  };

  // Button sabko dikhta hai — login nahi hai to pehle password poochho
  const handleWriteClick = () => {
    if (isAdmin) setShowForm(true);
    else {
      setLoginError("");
      setShowLogin(true);
    }
  };

  const handleLogout = () => {
    try { sessionStorage.removeItem(PASSWORD_KEY); } catch { /* ignore */ }
    setPassword("");
    setShowForm(false);
    setEditing(null);
  };

  const handleSave = async (data) => {
    setSaving(true);
    try {
      const payload = editing ? { ...data, id: editing.id } : data;
      await adminRequest({ action: "save", password, blog: payload });
      flash(data.status === "Published" ? "Blog publish ho gaya! Ab sabko dikhega." : "Blog draft me save ho gaya.");
      if (data.status === "Draft") setShowDrafts(true);
      setShowForm(false);
      setEditing(null);
      await loadBlogs();
      setTimeout(() => document.getElementById("blog-list")?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch (err) {
      flash("Save nahi hua: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Kya aap ye blog delete karna chahte hain?")) return;
    try {
      await adminRequest({ action: "delete", password, id });
      setBlogs((list) => list.filter((b) => b.id !== id));
      flash("Blog delete ho gaya.");
    } catch (err) {
      flash("Delete nahi hua: " + err.message);
    }
  };

  const startEdit = (blog) => {
    setEditing(blog);
    setShowForm(true);
    setTimeout(() => document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const closeReader = useCallback(() => setReading(null), []);

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
  };

  return (
    <section id="blog" className="scroll-mt-24 bg-white pt-16 pb-20 relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/4 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] rounded-full bg-navy-950 text-white px-5 py-2.5 text-sm shadow-xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-xl mx-auto"
        >
          <p className="text-xs font-semibold tracking-widest text-blue-500 uppercase">Insights & Updates</p>
          <h2 className="font-display mt-2 text-3xl sm:text-4xl font-bold text-navy-900">Our Blog</h2>
          <p className="mt-3 text-navy-900/60">
            Tips, guides and case studies on AI automation, MIS and business software.
          </p>
          {!isAdmin && showLogin && (
            <form onSubmit={handleLogin} className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-900/40" />
                <input
                  type="password"
                  required
                  autoFocus
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Admin password"
                  className="rounded-full border border-navy-900/10 bg-ice-50 py-2.5 pl-9 pr-4 text-sm outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                disabled={checking}
                className="inline-flex items-center gap-2 rounded-full bg-navy-950 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-70"
              >
                {checking && <Loader2 size={14} className="animate-spin" />} Login
              </button>
              <button
                type="button"
                onClick={() => setShowLogin(false)}
                className="rounded-full px-4 py-2.5 text-sm text-navy-900/50 hover:text-navy-900"
              >
                Cancel
              </button>
              {loginError && <p className="w-full text-xs text-red-500">{loginError}</p>}
            </form>
          )}
          {isAdmin && (
            <button
              onClick={handleLogout}
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-navy-900/50 hover:text-red-500"
            >
              <LogOut size={12} /> Admin logout
            </button>
          )}
          {!showForm && !(showLogin && !isAdmin) && (
            <button
              onClick={handleWriteClick}
              className="mt-4 ml-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-transform hover:scale-[1.03]"
            >
              <PenSquare size={15} /> Write New Blog
            </button>
          )}
        </motion.div>

        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <BlogForm
              key={editing?.id || "new"}
              initial={editing}
              existingCategories={categories}
              onSave={handleSave}
              onCancel={closeForm}
              saving={saving}
            />
          )}
        </AnimatePresence>

        {/* List */}
        <div id="blog-list" className="scroll-mt-28 mt-14">
          {blogs.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2">
              {["All", ...categories].map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                    activeCategory === c
                      ? "bg-navy-950 text-white"
                      : "bg-ice-50 border border-navy-900/10 text-navy-900/60 hover:text-blue-500"
                  }`}
                >
                  {c}
                </button>
              ))}
              {draftCount > 0 && (
                <label className="ml-2 flex items-center gap-1.5 text-xs text-navy-900/60 cursor-pointer">
                  <input type="checkbox" checked={showDrafts} onChange={(e) => setShowDrafts(e.target.checked)} />
                  Show drafts ({draftCount})
                </label>
              )}
            </div>
          )}

          {loading ? (
            <p className="mt-10 flex items-center justify-center gap-2 text-sm text-navy-900/40">
              <Loader2 size={16} className="animate-spin" /> Blogs load ho rahe hain...
            </p>
          ) : loadError ? (
            <p className="mt-10 text-center text-sm text-red-500">{loadError}</p>
          ) : visibleBlogs.length === 0 ? (
            <p className="mt-10 text-center text-sm text-navy-900/40">
              {blogs.length === 0 ? "Jald hi naye blogs aa rahe hain." : "Is filter me koi blog nahi mila."}
            </p>
          ) : (
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleBlogs.map((blog, i) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                  className="group flex flex-col rounded-2xl border border-navy-900/5 bg-ice-50 overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-[16/9] bg-gradient-to-br from-blue-500/15 to-violet-500/15">
                    {blog.image ? (
                      <img src={blog.image} alt={blog.title} loading="lazy" className="h-full w-full object-cover" />
                    ) : (
                      <div className="grid h-full place-items-center font-display text-3xl font-bold text-navy-900/15">
                        {blog.category}
                      </div>
                    )}
                    {blog.status === "Draft" && (
                      <span className="absolute top-3 left-3 rounded-full bg-amber-400 px-3 py-1 text-[10px] font-bold uppercase text-navy-950">
                        Draft
                      </span>
                    )}
                    {isAdmin && <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => startEdit(blog)} title="Edit" className="grid place-items-center h-8 w-8 rounded-full bg-white/90 text-navy-900 shadow hover:text-blue-500">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => handleDelete(blog.id)} title="Delete" className="grid place-items-center h-8 w-8 rounded-full bg-white/90 text-navy-900 shadow hover:text-red-500">
                        <Trash2 size={14} />
                      </button>
                    </div>}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-blue-500 uppercase">
                      <Tag size={11} /> {blog.category}
                    </span>
                    <h3 className="font-display mt-2 text-lg font-bold text-navy-900 line-clamp-2">{blog.title}</h3>
                    <p className="mt-2 text-sm text-navy-900/60 line-clamp-3">{blog.shortDescription}</p>
                    <div className="mt-auto pt-4 flex items-center justify-between text-xs text-navy-900/45">
                      <span className="flex items-center gap-1.5"><Calendar size={12} /> {formatDate(blog.createdAt)}</span>
                      <button
                        onClick={() => setReading(blog)}
                        className="inline-flex items-center gap-1 font-semibold text-blue-500 hover:gap-2 transition-all"
                      >
                        Read More <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {reading && <BlogReader blog={reading} onClose={closeReader} />}
      </AnimatePresence>
    </section>
  );
}