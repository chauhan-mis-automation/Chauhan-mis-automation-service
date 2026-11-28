import { useState } from "react";

// Drive image ka ID nikalo: https://lh3.googleusercontent.com/d/<ID>
const driveId = (url = "") => url.match(/googleusercontent\.com\/d\/([\w-]+)/)?.[1];

/*
 * Blog images (Google Drive) ke liye <img>
 * - referrerPolicy="no-referrer": Google kabhi-kabhi localhost/dusri sites se aayi
 *   request block kar deta hai, referrer na bhejne se image load ho jati hai.
 * - Agar phir bhi load na ho, to Drive ke thumbnail link se dobara try karo.
 */
export default function BlogImage({ src, alt = "", ...props }) {
  const [current, setCurrent] = useState(src);
  const [triedFallback, setTriedFallback] = useState(false);

  // src badle (dusra blog) to state reset karo
  const [lastSrc, setLastSrc] = useState(src);
  if (src !== lastSrc) {
    setLastSrc(src);
    setCurrent(src);
    setTriedFallback(false);
  }

  const handleError = () => {
    const id = driveId(current);
    if (!triedFallback && id) {
      setTriedFallback(true);
      setCurrent(`https://drive.google.com/thumbnail?id=${id}&sz=w1600`);
    }
  };

  return <img src={current} alt={alt} referrerPolicy="no-referrer" onError={handleError} {...props} />;
}