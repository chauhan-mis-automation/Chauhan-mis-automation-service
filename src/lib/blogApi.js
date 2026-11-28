/* ------------------------------------------------------------------ */
/*  Blog ka Google Sheet API + shared helpers                          */
/*  Blog section (Blog.jsx) aur blog page (BlogPost.jsx) dono yahi     */
/*  use karte hain.                                                    */
/*  Apps Script code: google-apps-script/BlogScript.gs                 */
/* ------------------------------------------------------------------ */
export const BLOG_API_URL = "https://script.google.com/macros/s/AKfycbzg1lFevoQkmfxYXS4Mtwx8gvTzcxSPPLiTjFPdSRdWeD8TrIpkTvs1PDEXMH57pC5iFw/exec";

// Ek baar load hue blogs yaad rakho, taaki har page par dobara load na ho
let publishedCache = null;

export function clearBlogCache() {
  publishedCache = null;
}

// Sirf Published blogs (website par sabko dikhte hain)
export async function fetchPublishedBlogs({ force = false } = {}) {
  if (!force && publishedCache) return publishedCache;
  const res = await fetch(BLOG_API_URL);
  const data = await res.json();
  if (!data.ok) throw new Error(data.error || "Could not load blogs");
  publishedCache = data.blogs;
  return data.blogs;
}

// Saare blogs, Drafts bhi
export async function fetchAllBlogs() {
  const res = await fetch(`${BLOG_API_URL}?all=1`);
  const data = await res.json();
  if (!data.ok) throw new Error(data.error || "Could not load blogs");
  return data.blogs;
}

// Blog save (naya ya edit) / delete
export const saveBlogRequest = (blog) => postAction({ action: "save", blog });
export const deleteBlogRequest = (id) => postAction({ action: "delete", id });

async function postAction(body) {
  const res = await fetch(BLOG_API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" }, // CORS preflight se bachne ke liye
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!data.ok) throw new Error(data.error || "Request failed");
  return data;
}

export const slugify = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export const parseKeywords = (text = "") =>
  text.split(",").map((k) => k.trim()).filter(Boolean);

// Scripts, event handlers aur javascript: links hata kar hi HTML dikhao
export function sanitizeHtml(html = "") {
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
  // Content ki images bhi bina referrer ke load hon (Google images block na hon)
  doc.querySelectorAll("img").forEach((img) => img.setAttribute("referrerpolicy", "no-referrer"));
  return doc.body.innerHTML;
}

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

// Blog ka URL: /blog/<slug>
export const blogUrl = (blog) => `/blog/${blog.slug || slugify(blog.title)}`;