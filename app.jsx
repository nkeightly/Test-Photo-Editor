const { useState, useRef, useEffect } = React;

/* ─────────────────────────────────────────
   OUTPUT DIMENSIONS
───────────────────────────────────────── */
const LW = 1280, LH = 862;   // landscape
const PW = 1066, PH = 1600;  // portrait
const PS = 0.36;              // preview scale factor

/* ─────────────────────────────────────────
   FOOTER TEXT  (matching reference photos)
───────────────────────────────────────── */
const EMAIL_TXT = "christrebekahmystery@gmail.com";
const FB_TXT    = "christ rebekah mystery church";
const YT_TXT    = "christ rebekah mystery church";

/* ─────────────────────────────────────────
   ICON PATHS  — place these files in the
   same folder as index.html / app.jsx
   icons/email.png   → your Image 6
   icons/youtube.png → your Image 7
   icons/facebook.png→ your Image 8
───────────────────────────────────────── */
const ICON_EMAIL = "icons/email.png";
const ICON_YT    = "icons/youtube.png";
const ICON_FB    = "icons/facebook.png";
const LOGO_PATH  = "icons/logo.svg";   // generated below via JS

/* ─────────────────────────────────────────
   LOGO SVG (vector, crisp at any size)
───────────────────────────────────────── */
const LOGO_SVG = `<svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g1" cx="40%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#7ec8f0"/>
      <stop offset="50%" stop-color="#2e86c1"/>
      <stop offset="100%" stop-color="#1a5276"/>
    </radialGradient>
    <radialGradient id="g2" cx="50%" cy="80%" r="60%">
      <stop offset="0%" stop-color="#f39c12"/>
      <stop offset="50%" stop-color="#e74c3c"/>
      <stop offset="100%" stop-color="#922b21"/>
    </radialGradient>
    <radialGradient id="g3" cx="50%" cy="90%" r="50%">
      <stop offset="0%" stop-color="#fef9e7"/>
      <stop offset="40%" stop-color="#f9e74c"/>
      <stop offset="100%" stop-color="#f39c12"/>
    </radialGradient>
    <clipPath id="gc"><circle cx="100" cy="95" r="72"/></clipPath>
  </defs>
  <path d="M68,168 Q58,148 65,135 Q55,145 52,130 Q48,115 60,105 Q55,120 65,118 Q60,108 70,98 Q68,115 78,112 Q72,125 80,132 Q82,118 90,115 Q86,128 92,135 Q94,120 100,118 Q106,120 108,135 Q114,128 110,115 Q118,118 120,132 Q128,125 122,112 Q132,115 135,98 Q140,108 135,118 Q145,120 140,105 Q152,115 148,130 Q145,145 135,135 Q142,148 132,168 Z" fill="url(#g2)"/>
  <path d="M78,168 Q72,152 78,140 Q74,148 72,138 Q70,125 80,118 Q77,130 84,128 Q80,138 86,144 Q88,132 94,130 Q92,140 96,145 Q98,133 100,131 Q102,133 104,145 Q108,140 106,130 Q112,132 114,144 Q120,138 116,128 Q123,130 120,118 Q130,125 128,138 Q126,148 122,140 Q128,152 122,168 Z" fill="url(#g3)"/>
  <circle cx="100" cy="95" r="72" fill="url(#g1)"/>
  <g clip-path="url(#gc)" fill="none" stroke="#1a5276" stroke-width="0.8" opacity="0.5">
    <ellipse cx="100" cy="95" rx="72" ry="20"/>
    <ellipse cx="100" cy="95" rx="72" ry="42"/>
    <ellipse cx="100" cy="95" rx="72" ry="62"/>
    <line x1="100" y1="23" x2="100" y2="167"/>
    <ellipse cx="100" cy="95" rx="30" ry="72"/>
    <ellipse cx="100" cy="95" rx="55" ry="72"/>
  </g>
  <ellipse cx="82" cy="72" rx="18" ry="12" fill="white" opacity="0.18"/>
  <circle cx="100" cy="95" r="72" fill="none" stroke="#1a5276" stroke-width="1.5"/>
  <g transform="translate(38,42) rotate(-20)"><path d="M0,0 Q5,-6 12,-4 Q8,0 10,4 Q5,2 0,0Z" fill="white"/><path d="M0,0 Q-3,-5 2,-8 Q4,-4 0,0Z" fill="white"/><path d="M10,4 Q14,6 12,10 Q8,8 10,4Z" fill="white" opacity="0.85"/></g>
  <g transform="translate(148,38) rotate(15) scale(-1,1)"><path d="M0,0 Q5,-6 12,-4 Q8,0 10,4 Q5,2 0,0Z" fill="white"/><path d="M0,0 Q-3,-5 2,-8 Q4,-4 0,0Z" fill="white"/><path d="M10,4 Q14,6 12,10 Q8,8 10,4Z" fill="white" opacity="0.85"/></g>
  <g transform="translate(28,88) rotate(-10)"><path d="M0,0 Q5,-6 12,-4 Q8,0 10,4 Q5,2 0,0Z" fill="white"/><path d="M0,0 Q-3,-5 2,-8 Q4,-4 0,0Z" fill="white"/><path d="M10,4 Q14,6 12,10 Q8,8 10,4Z" fill="white" opacity="0.85"/></g>
  <g transform="translate(162,82) rotate(5) scale(-1,1)"><path d="M0,0 Q5,-6 12,-4 Q8,0 10,4 Q5,2 0,0Z" fill="white"/><path d="M0,0 Q-3,-5 2,-8 Q4,-4 0,0Z" fill="white"/><path d="M10,4 Q14,6 12,10 Q8,8 10,4Z" fill="white" opacity="0.85"/></g>
  <g transform="translate(55,52) rotate(-30) scale(0.85,0.85)"><path d="M0,0 Q5,-6 12,-4 Q8,0 10,4 Q5,2 0,0Z" fill="white"/><path d="M0,0 Q-3,-5 2,-8 Q4,-4 0,0Z" fill="white"/></g>
  <g transform="translate(138,50) rotate(25) scale(-0.85,0.85)"><path d="M0,0 Q5,-6 12,-4 Q8,0 10,4 Q5,2 0,0Z" fill="white"/><path d="M0,0 Q-3,-5 2,-8 Q4,-4 0,0Z" fill="white"/></g>
  <rect x="89" y="42" width="22" height="80" rx="3" fill="#c0392b"/>
  <rect x="70" y="70" width="60" height="22" rx="3" fill="#c0392b"/>
  <rect x="91" y="44" width="5"  height="76" rx="2" fill="#e74c3c" opacity="0.5"/>
  <rect x="72" y="72" width="56" height="5"  rx="2" fill="#e74c3c" opacity="0.5"/>
  <rect x="89" y="42" width="22" height="80" rx="3" fill="none" stroke="#922b21" stroke-width="1"/>
  <rect x="70" y="70" width="60" height="22" rx="3" fill="none" stroke="#922b21" stroke-width="1"/>
</svg>`;

/* ─────────────────────────────────────────
   HOOKS
───────────────────────────────────────── */
function useSvgImg(svgStr) {
  const [img, setImg] = useState(null);
  useEffect(() => {
    const blob = new Blob([svgStr], { type: "image/svg+xml" });
    const url  = URL.createObjectURL(blob);
    const i    = new Image();
    i.onload   = () => { setImg(i); URL.revokeObjectURL(url); };
    i.src      = url;
  }, []);
  return img;
}

function useImg(src) {
  const [img, setImg] = useState(null);
  useEffect(() => {
    if (!src) return;
    const i = new Image();
    i.onload = () => setImg(i);
    i.onerror = () => console.warn("Could not load icon:", src);
    i.src = src;
  }, [src]);
  return img;
}

/* ─────────────────────────────────────────
   IMAGE PROCESSING
───────────────────────────────────────── */
function doSharpen(canvas, s) {
  const ctx = canvas.getContext("2d");
  const w = canvas.width, h = canvas.height;
  const src = ctx.getImageData(0,0,w,h), dst = ctx.createImageData(w,h);
  const d = src.data, o = dst.data;
  const k = [0,-s,0, -s,1+4*s,-s, 0,-s,0];
  for (let y=1; y<h-1; y++) {
    for (let x=1; x<w-1; x++) {
      const i = (y*w+x)*4;
      for (let c=0; c<3; c++) {
        o[i+c] = Math.min(255, Math.max(0,
          k[0]*d[((y-1)*w+x-1)*4+c] + k[1]*d[((y-1)*w+x)*4+c] + k[2]*d[((y-1)*w+x+1)*4+c] +
          k[3]*d[(y*w+x-1)*4+c]     + k[4]*d[(y*w+x)*4+c]     + k[5]*d[(y*w+x+1)*4+c] +
          k[6]*d[((y+1)*w+x-1)*4+c] + k[7]*d[((y+1)*w+x)*4+c] + k[8]*d[((y+1)*w+x+1)*4+c]
        ));
      }
      o[i+3] = d[i+3];
    }
  }
  ctx.putImageData(dst, 0, 0);
}

function doClarity(canvas, s) {
  const ctx = canvas.getContext("2d");
  const src = ctx.getImageData(0, 0, canvas.width, canvas.height), d = src.data;
  for (let i=0; i<d.length; i+=4) {
    const b = (0.299*d[i] + 0.587*d[i+1] + 0.114*d[i+2] - 128) * s * 0.4;
    d[i]   = Math.min(255, Math.max(0, d[i]+b));
    d[i+1] = Math.min(255, Math.max(0, d[i+1]+b));
    d[i+2] = Math.min(255, Math.max(0, d[i+2]+b));
  }
  ctx.putImageData(src, 0, 0);
}

/* ─────────────────────────────────────────
   CORE RENDER — draws photo + overlays
   onto any canvas (preview or export)
───────────────────────────────────────── */
function renderFrame(canvas, photo, logo, emailImg, fbImg, ytImg, opts, crop) {
  const { brightness, contrast, showLogo, showFooter, caption, enhanceMode, sharpenStr, clarityStr } = opts;
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;

  /* Photo with crop/zoom */
  const { ox, oy, zoom } = crop;
  const sw = photo.naturalWidth / zoom;
  const sh = photo.naturalHeight / zoom;
  const sx = Math.max(0, Math.min(photo.naturalWidth  - sw, ox * photo.naturalWidth  / zoom));
  const sy = Math.max(0, Math.min(photo.naturalHeight - sh, oy * photo.naturalHeight / zoom));
  ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
  ctx.drawImage(photo, sx, sy, sw, sh, 0, 0, W, H);
  ctx.filter = "none";

  /* Enhancements */
  if (enhanceMode === "sharpen" && sharpenStr > 0) doSharpen(canvas, sharpenStr * 0.8);
  if (enhanceMode === "clarity" && clarityStr > 0) doClarity(canvas, clarityStr);
  if (enhanceMode === "both") {
    if (sharpenStr > 0) doSharpen(canvas, sharpenStr * 0.5);
    if (clarityStr > 0) doClarity(canvas, clarityStr * 0.7);
  }

  /* ── FOOTER BAR ── */
  if (showFooter) {
    const fh   = Math.round(H * 0.108);   // footer height
    const fy   = H - fh;                   // footer top
    const iconH = Math.round(fh * 0.62);   // icon height
    const iconY = fy + Math.round((fh - iconH) / 2);
    const fs    = Math.max(11, Math.round(fh * 0.30));
    const seg   = W / 3;

    /* dark bar */
    ctx.fillStyle = "rgba(0,0,0,0.90)";
    ctx.fillRect(0, fy, W, fh);

    /* subtle top border */
    ctx.fillStyle = "rgba(255,255,255,0.10)";
    ctx.fillRect(0, fy, W, 1);

    const items = [
      { icon: emailImg, label: EMAIL_TXT },
      { icon: fbImg,    label: FB_TXT    },
      { icon: ytImg,    label: YT_TXT    },
    ];

    items.forEach(({ icon, label }, idx) => {
      const segX  = seg * idx;
      const iconX = segX + seg * 0.06;
      const textX = iconX + iconH + Math.round(W * 0.008);
      const textY = fy + fh * 0.5 + fs * 0.38;

      /* icon */
      if (icon) ctx.drawImage(icon, iconX, iconY, iconH, iconH);

      /* label */
      ctx.font      = `500 ${fs}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
      ctx.fillStyle = "#ffffff";
      ctx.fillText(label, textX, textY);

      /* vertical divider */
      if (idx < 2) {
        ctx.fillStyle = "rgba(255,255,255,0.15)";
        ctx.fillRect(seg * (idx + 1) - 1, fy + fh * 0.14, 1, fh * 0.72);
      }
    });
  }

  /* ── LOGO — top-left ── */
  if (showLogo && logo) {
    const lh = Math.round(H * 0.108);
    const lw = Math.round(lh * (200 / 220));
    ctx.drawImage(logo, 14, 14, lw, lh);
  }

  /* ── CAPTION ── */
  if (caption.trim()) {
    const fs  = Math.round(W * 0.021);
    ctx.font  = `${fs}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
    const tw  = ctx.measureText(caption).width;
    const pad = fs * 0.55;
    const py  = showFooter ? H * 0.864 : H * 0.93;
    ctx.fillStyle = "rgba(0,0,0,0.66)";
    ctx.beginPath();
    ctx.roundRect((W - tw) / 2 - pad, py - fs - pad * 0.4, tw + pad * 2, fs + pad * 1.2, 5);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(caption, W / 2, py);
    ctx.textAlign = "left";
  }
}

/* ─────────────────────────────────────────
   CROP CANVAS  (drag to pan)
───────────────────────────────────────── */
function CropCanvas({ photo, crop, setCrop, orientation }) {
  const ref  = useRef();
  const drag = useRef(false);
  const ds   = useRef({});
  const cw   = Math.round((orientation === "landscape" ? LW : PW) * PS);
  const ch   = Math.round((orientation === "landscape" ? LH : PH) * PS);

  useEffect(() => {
    if (!ref.current || !photo) return;
    const c = ref.current; c.width = cw; c.height = ch;
    const ctx = c.getContext("2d");
    const { ox, oy, zoom } = crop;
    const sw = photo.naturalWidth / zoom, sh = photo.naturalHeight / zoom;
    const sx = Math.max(0, Math.min(photo.naturalWidth  - sw, ox * photo.naturalWidth  / zoom));
    const sy = Math.max(0, Math.min(photo.naturalHeight - sh, oy * photo.naturalHeight / zoom));
    ctx.drawImage(photo, sx, sy, sw, sh, 0, 0, cw, ch);
    /* rule-of-thirds grid */
    ctx.strokeStyle = "rgba(255,255,255,0.28)";
    ctx.lineWidth   = 0.6;
    ctx.setLineDash([4, 4]);
    for (let i=1; i<3; i++) {
      ctx.beginPath(); ctx.moveTo(cw*i/3, 0); ctx.lineTo(cw*i/3, ch); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, ch*i/3); ctx.lineTo(cw, ch*i/3); ctx.stroke();
    }
    ctx.setLineDash([]);
  }, [photo, crop, cw, ch]);

  const getXY = (e) => {
    const r = ref.current.getBoundingClientRect();
    if (e.touches) return { x: e.touches[0].clientX - r.left, y: e.touches[0].clientY - r.top };
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const onStart = (e) => {
    drag.current = true;
    const { x, y } = getXY(e);
    ds.current = { x, y, ox: crop.ox, oy: crop.oy };
  };
  const onMove = (e) => {
    if (!drag.current) return;
    e.preventDefault();
    const { x, y } = getXY(e);
    const dx = (x - ds.current.x) / cw;
    const dy = (y - ds.current.y) / ch;
    setCrop(c => ({
      ...c,
      ox: Math.max(0, Math.min(c.zoom - 1, ds.current.ox - dx * (c.zoom - 1))),
      oy: Math.max(0, Math.min(c.zoom - 1, ds.current.oy - dy * (c.zoom - 1))),
    }));
  };
  const onEnd = () => { drag.current = false; };

  return (
    <canvas
      ref={ref}
      style={{ width: cw, height: ch, display: "block", borderRadius: 7, cursor: "grab", border: "0.5px solid rgba(255,255,255,0.14)", touchAction: "none" }}
      onMouseDown={onStart} onMouseMove={onMove} onMouseUp={onEnd} onMouseLeave={onEnd}
      onTouchStart={onStart} onTouchMove={onMove} onTouchEnd={onEnd}
    />
  );
}

/* ─────────────────────────────────────────
   PREVIEW CANVAS  (full template overlay)
───────────────────────────────────────── */
function Preview({ photo, logo, emailImg, fbImg, ytImg, orientation, opts, crop }) {
  const ref = useRef();
  const cw  = Math.round((orientation === "landscape" ? LW : PW) * PS);
  const ch  = Math.round((orientation === "landscape" ? LH : PH) * PS);

  useEffect(() => {
    if (!ref.current) return;
    const c = ref.current; c.width = cw; c.height = ch;
    if (!photo) {
      const ctx = c.getContext("2d");
      ctx.fillStyle = "#111"; ctx.fillRect(0, 0, cw, ch);
      if (logo && opts.showLogo) {
        const lh = Math.round(ch * 0.108);
        ctx.drawImage(logo, 8, 8, Math.round(lh * (200/220)), lh);
      }
      if (opts.showFooter) {
        const fh = Math.round(ch * 0.108);
        ctx.fillStyle = "rgba(0,0,0,0.88)"; ctx.fillRect(0, ch - fh, cw, fh);
      }
      ctx.fillStyle = "#555"; ctx.font = "13px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("Upload a photo to preview", cw/2, ch/2);
      ctx.textAlign = "left";
      return;
    }
    renderFrame(c, photo, logo, emailImg, fbImg, ytImg, opts, crop);
  }, [photo, logo, emailImg, fbImg, ytImg, cw, ch, opts, crop]);

  return (
    <canvas
      ref={ref}
      style={{ width: cw, height: ch, display: "block", borderRadius: 8, border: "0.5px solid rgba(0,0,0,0.18)" }}
    />
  );
}

/* ─────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────── */
const EMODES = [
  { id: "sharpen", t: "Sharpening",           s: "Edge crispness — best for faces & detail" },
  { id: "clarity", t: "Clarity",               s: "Studio depth — local contrast lift" },
  { id: "both",    t: "Sharpening + Clarity",  s: "Max crispness, fully natural result" },
];
const STEPS = ["Upload", "Crop & Edit", "Preview & Export"];

/* ─────────────────────────────────────────
   MAIN APP
───────────────────────────────────────── */
function App() {
  const [step,  setStep]  = useState(0);
  const [ori,   setOri]   = useState("landscape");
  const [photo, setPhoto] = useState(null);
  const [crop,  setCrop]  = useState({ ox: 0, oy: 0, zoom: 1 });
  const [bri,   setBri]   = useState(100);
  const [con,   setCon]   = useState(105);
  const [sLogo, setSLogo] = useState(true);
  const [sFoot, setSFoot] = useState(true);
  const [cap,   setCap]   = useState("");
  const [emode, setEmode] = useState("sharpen");
  const [sStr,  setSStr]  = useState(0.5);
  const [cStr,  setCStr]  = useState(0.5);
  const [expo,  setExpo]  = useState(null);
  const [dragZ, setDragZ] = useState(false);
  const fRef = useRef();

  const logo     = useSvgImg(LOGO_SVG);
  const emailImg = useImg(ICON_EMAIL);
  const fbImg    = useImg(ICON_FB);
  const ytImg    = useImg(ICON_YT);

  const opts = { brightness: bri, contrast: con, showLogo: sLogo, showFooter: sFoot, caption: cap, enhanceMode: emode, sharpenStr: sStr, clarityStr: cStr };

  const loadPhoto = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { setPhoto(img); setCrop({ ox: 0, oy: 0, zoom: 1 }); setStep(1); };
    img.src = url;
  };

  const doExport = (fmt, orient) => {
    if (!photo) return;
    const key = `${fmt}-${orient}`; setExpo(key);
    const c   = document.createElement("canvas");
    c.width   = orient === "landscape" ? LW : PW;
    c.height  = orient === "landscape" ? LH : PH;
    renderFrame(c, photo, logo, emailImg, fbImg, ytImg, opts, crop);
    c.toBlob(blob => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `crmc-${orient}.${fmt}`;
      a.click();
      setExpo(null);
    }, fmt === "jpg" ? "image/jpeg" : "image/png", fmt === "jpg" ? 0.95 : 1);
  };

  const canGo = (i) => i <= (photo ? 2 : 0);

  return (
    <div className="wrap">

      {/* ── Header ── */}
      <div className="app-hdr">
        {logo && <img src={logo.src} alt="CRMC logo" />}
        <div>
          <p className="sub">Christ Rebekah Mystery Church</p>
          <h2>Photo template editor</h2>
        </div>
      </div>

      {/* ── Tab bar ── */}
      <div className="tab-bar">
        {STEPS.map((s, i) => (
          <button key={s}
            className={`tab${step === i ? " on" : ""}`}
            onClick={() => canGo(i) && setStep(i)}
            style={{ color: step === i ? "var(--tx)" : "var(--tx2)", cursor: canGo(i) ? "pointer" : "default" }}>
            {i < step && <span style={{ color: "#2a9d5c" }}>✓</span>}
            {s}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════
          STEP 0 — Upload
      ══════════════════════════════════════ */}
      {step === 0 && (
        <div>
          {/* Drop zone */}
          <div
            className={`upload-zone${dragZ ? " over" : ""}`}
            onDragOver={e => { e.preventDefault(); setDragZ(true); }}
            onDragLeave={() => setDragZ(false)}
            onDrop={e => { e.preventDefault(); setDragZ(false); loadPhoto(e.dataTransfer.files[0]); }}
            onClick={() => fRef.current.click()}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--tx2)" }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            <p style={{ fontWeight: 500, fontSize: 15 }}>Drop your photo here</p>
            <p className="smc">or click to browse — JPG, PNG, WEBP</p>
            <input ref={fRef} type="file" accept="image/*" style={{ display: "none" }} onChange={e => loadPhoto(e.target.files[0])} />
          </div>

          {/* Orientation */}
          <p className="head">Orientation</p>
          <div className="row" style={{ gap: 10, marginBottom: "1.75rem" }}>
            {["landscape", "portrait"].map(o => (
              <button key={o} className={`ori-btn${ori === o ? " on" : ""}`} onClick={() => setOri(o)}>
                {o === "landscape" ? `Landscape (${LW}×${LH})` : `Portrait (${PW}×${PH})`}
              </button>
            ))}
          </div>

          {/* Footer preview strip — shows the real icons */}
          <p className="head">Footer bar preview</p>
          <div className="foot-prev">
            {[
              { img: emailImg, src: ICON_EMAIL, label: EMAIL_TXT },
              { img: fbImg,    src: ICON_FB,    label: FB_TXT    },
              { img: ytImg,    src: ICON_YT,    label: YT_TXT    },
            ].map(({ img, src, label }, i) => (
              <div key={i} className="foot-item">
                <img src={src} alt="" onError={e => e.target.style.display="none"} />
                <span>{label}</span>
              </div>
            ))}
          </div>

          {/* Template preview */}
          <p className="smc" style={{ marginBottom: 10 }}>Template preview (no photo yet)</p>
          <div style={{ display: "flex", justifyContent: "center", padding: "1rem", background: "var(--bg2)", borderRadius: 12 }}>
            <Preview photo={null} logo={logo} emailImg={emailImg} fbImg={fbImg} ytImg={ytImg} orientation={ori} opts={opts} crop={crop} />
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          STEP 1 — Crop & Edit
      ══════════════════════════════════════ */}
      {step === 1 && (
        <div className="edit-wrap">

          {/* Controls */}
          <div className="edit-ctrl">

            <p className="head">Orientation</p>
            <div className="row" style={{ gap: 8, marginBottom: "1rem" }}>
              {["landscape", "portrait"].map(o => (
                <button key={o} className={`ori-btn${ori === o ? " on" : ""}`} style={{ fontSize: 12, padding: "5px 12px" }} onClick={() => setOri(o)}>
                  {o === "landscape" ? "Landscape" : "Portrait"}
                </button>
              ))}
            </div>

            <p className="head">Crop & zoom</p>
            <p className="note" style={{ marginBottom: 7 }}>Drag the preview canvas to pan. Use the zoom slider to fill the frame.</p>
            <div className="rowb" style={{ marginBottom: 4 }}>
              <span className="smc">Zoom</span>
              <span className="smb">{crop.zoom.toFixed(2)}×</span>
            </div>
            <input type="range" min="1" max="3" step="0.01" value={crop.zoom}
              onChange={e => setCrop(c => ({ ...c, zoom: +e.target.value }))} />
            <div className="row" style={{ marginTop: 8, marginBottom: "1.1rem" }}>
              <button className="sm" style={{ padding: "5px 12px" }}
                onClick={() => setCrop({ ox: 0, oy: 0, zoom: 1 })}>Reset crop</button>
            </div>

            <hr className="div" />
            <p className="head">Adjustments</p>
            {[["Brightness", bri, setBri, 50, 150], ["Contrast", con, setCon, 50, 150]].map(([l, v, s, mn, mx]) => (
              <div key={l} style={{ marginBottom: "0.9rem" }}>
                <div className="rowb" style={{ marginBottom: 4 }}>
                  <span className="smc">{l}</span><span className="smb">{v}%</span>
                </div>
                <input type="range" min={mn} max={mx} step="1" value={v} onChange={e => s(+e.target.value)} />
              </div>
            ))}

            <hr className="div" />
            <p className="head">Quality enhancement</p>
            {EMODES.map(m => (
              <div key={m.id} className={`ecard${emode === m.id ? " on" : ""}`} onClick={() => setEmode(m.id)}>
                <p className="et" style={{ fontWeight: emode === m.id ? 500 : 400 }}>{m.t}</p>
                <p className="es">{m.s}</p>
              </div>
            ))}
            {(emode === "sharpen" || emode === "both") && (
              <div style={{ marginTop: 8 }}>
                <div className="rowb" style={{ marginBottom: 4 }}>
                  <span className="smc">Sharpen</span><span className="smb">{Math.round(sStr * 100)}%</span>
                </div>
                <input type="range" min="0" max="1" step="0.05" value={sStr} onChange={e => setSStr(+e.target.value)} />
              </div>
            )}
            {(emode === "clarity" || emode === "both") && (
              <div style={{ marginTop: 8 }}>
                <div className="rowb" style={{ marginBottom: 4 }}>
                  <span className="smc">Clarity</span><span className="smb">{Math.round(cStr * 100)}%</span>
                </div>
                <input type="range" min="0" max="1" step="0.05" value={cStr} onChange={e => setCStr(+e.target.value)} />
              </div>
            )}

            <hr className="div" />
            <p className="head">Overlays</p>
            <label className="chk"><input type="checkbox" checked={sLogo} onChange={e => setSLogo(e.target.checked)} /> Show logo (top left)</label>
            <label className="chk"><input type="checkbox" checked={sFoot} onChange={e => setSFoot(e.target.checked)} /> Show footer bar</label>
            <input type="text" value={cap} onChange={e => setCap(e.target.value)} placeholder="Caption (optional)" style={{ marginTop: 8 }} />

            <div className="row" style={{ marginTop: "1.35rem" }}>
              <button className="sm" style={{ padding: "7px 12px" }}
                onClick={() => { setBri(100); setCon(105); setSStr(0.5); setCStr(0.5); setCrop({ ox: 0, oy: 0, zoom: 1 }); }}>
                Reset all
              </button>
              <button className="sm" style={{ padding: "7px 16px", fontWeight: 500 }} onClick={() => setStep(2)}>
                Preview →
              </button>
            </div>
          </div>

          {/* Crop canvas */}
          <div className="edit-canvas">
            <div style={{ background: "#0d0d0d", borderRadius: 10, padding: 10 }}>
              <CropCanvas photo={photo} crop={crop} setCrop={setCrop} orientation={ori} />
            </div>
            <p className="note" style={{ textAlign: "center" }}>Drag to pan · Zoom slider to fill frame</p>
            <p className="note" style={{ textAlign: "center", marginTop: 2 }}>
              Output: {ori === "landscape" ? `${LW}×${LH}` : `${PW}×${PH}`} px
            </p>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          STEP 2 — Preview & Export
      ══════════════════════════════════════ */}
      {step === 2 && (
        <div>
          <p className="smc" style={{ marginBottom: "1.25rem" }}>
            Final previews — exports at full resolution with all overlays applied
          </p>

          <div className="prev-wrap">
            {["landscape", "portrait"].map(o => (
              <div key={o} style={{ textAlign: "center" }}>
                <p className="smc" style={{ marginBottom: 8, textTransform: "capitalize" }}>
                  {o} — {o === "landscape" ? `${LW}×${LH}` : `${PW}×${PH}`}
                </p>
                <Preview photo={photo} logo={logo} emailImg={emailImg} fbImg={fbImg} ytImg={ytImg}
                  orientation={o} opts={opts} crop={crop} />
              </div>
            ))}
          </div>

          <div className="summary">
            <p className="head">Applied settings</p>
            <div className="row" style={{ flexWrap: "wrap", gap: "1rem" }}>
              {[
                ["Brightness", `${bri}%`],
                ["Contrast",   `${con}%`],
                ["Zoom",       `${crop.zoom.toFixed(2)}×`],
                ["Enhancement", EMODES.find(m => m.id === emode)?.t],
                ...(emode === "sharpen" || emode === "both" ? [["Sharpen", `${Math.round(sStr*100)}%`]] : []),
                ...(emode === "clarity" || emode === "both" ? [["Clarity",  `${Math.round(cStr*100)}%`]] : []),
              ].map(([k, v]) => (
                <span key={k} className="smc">
                  {k}: <strong style={{ color: "var(--tx)", fontWeight: 500 }}>{v}</strong>
                </span>
              ))}
            </div>
          </div>

          <p className="head" style={{ marginBottom: 10 }}>Download — full resolution</p>
          <div className="dl-grid">
            {[
              { fmt: "jpg", o: "landscape", lbl: `JPG  Landscape  ${LW}×${LH}` },
              { fmt: "png", o: "landscape", lbl: `PNG  Landscape  ${LW}×${LH}` },
              { fmt: "jpg", o: "portrait",  lbl: `JPG  Portrait   ${PW}×${PH}` },
              { fmt: "png", o: "portrait",  lbl: `PNG  Portrait   ${PW}×${PH}` },
            ].map(({ fmt, o, lbl }) => (
              <button key={lbl} className="dl-btn"
                onClick={() => doExport(fmt, o)} disabled={!!expo}>
                {expo === `${fmt}-${o}` ? "Exporting…" : lbl}
              </button>
            ))}
          </div>

          <button className="sm" style={{ padding: "8px 16px" }} onClick={() => setStep(1)}>← Back to edit</button>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
