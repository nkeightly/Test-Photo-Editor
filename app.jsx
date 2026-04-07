const { useState, useRef, useEffect } = React;

const EMAIL = "christrebekahmystery@gmail.com";
const FB    = "christ rebekah mystery church";
const YT    = "christ rebekah mystery church";
const STEPS = ["Upload", "Edit & Enhance", "Preview & Export"];

/* ── Logo SVG string ── */
const LOGO_SVG = `<svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="globeGrad" cx="40%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#7ec8f0"/>
      <stop offset="50%" stop-color="#2e86c1"/>
      <stop offset="100%" stop-color="#1a5276"/>
    </radialGradient>
    <radialGradient id="flameOuter" cx="50%" cy="80%" r="60%">
      <stop offset="0%" stop-color="#f39c12"/>
      <stop offset="50%" stop-color="#e74c3c"/>
      <stop offset="100%" stop-color="#922b21"/>
    </radialGradient>
    <radialGradient id="flameInner" cx="50%" cy="90%" r="50%">
      <stop offset="0%" stop-color="#fef9e7"/>
      <stop offset="40%" stop-color="#f9e74c"/>
      <stop offset="100%" stop-color="#f39c12"/>
    </radialGradient>
    <clipPath id="globeClip"><circle cx="100" cy="95" r="72"/></clipPath>
  </defs>
  <path d="M68,168 Q58,148 65,135 Q55,145 52,130 Q48,115 60,105 Q55,120 65,118 Q60,108 70,98 Q68,115 78,112 Q72,125 80,132 Q82,118 90,115 Q86,128 92,135 Q94,120 100,118 Q106,120 108,135 Q114,128 110,115 Q118,118 120,132 Q128,125 122,112 Q132,115 135,98 Q140,108 135,118 Q145,120 140,105 Q152,115 148,130 Q145,145 135,135 Q142,148 132,168 Z" fill="url(#flameOuter)"/>
  <path d="M78,168 Q72,152 78,140 Q74,148 72,138 Q70,125 80,118 Q77,130 84,128 Q80,138 86,144 Q88,132 94,130 Q92,140 96,145 Q98,133 100,131 Q102,133 104,145 Q108,140 106,130 Q112,132 114,144 Q120,138 116,128 Q123,130 120,118 Q130,125 128,138 Q126,148 122,140 Q128,152 122,168 Z" fill="url(#flameInner)"/>
  <circle cx="100" cy="95" r="72" fill="url(#globeGrad)"/>
  <g clip-path="url(#globeClip)" fill="none" stroke="#1a5276" stroke-width="0.8" opacity="0.5">
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
  <rect x="91" y="44" width="5" height="76" rx="2" fill="#e74c3c" opacity="0.5"/>
  <rect x="72" y="72" width="56" height="5" rx="2" fill="#e74c3c" opacity="0.5"/>
  <rect x="89" y="42" width="22" height="80" rx="3" fill="none" stroke="#922b21" stroke-width="1"/>
  <rect x="70" y="70" width="60" height="22" rx="3" fill="none" stroke="#922b21" stroke-width="1"/>
</svg>`;

/* ── Hooks ── */
function useSvgImage(svgStr) {
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

/* ── Image processing ── */
function applySharpening(canvas, strength) {
  const ctx = canvas.getContext("2d");
  const w = canvas.width, h = canvas.height;
  const src = ctx.getImageData(0, 0, w, h);
  const dst = ctx.createImageData(w, h);
  const d = src.data, o = dst.data, k = strength;
  const kern = [0,-k,0, -k,1+4*k,-k, 0,-k,0];
  for (let y = 1; y < h-1; y++) {
    for (let x = 1; x < w-1; x++) {
      const idx = (y*w+x)*4;
      for (let c = 0; c < 3; c++) {
        const v =
          kern[0]*d[((y-1)*w+(x-1))*4+c] + kern[1]*d[((y-1)*w+x)*4+c] + kern[2]*d[((y-1)*w+(x+1))*4+c] +
          kern[3]*d[(y*w+(x-1))*4+c]      + kern[4]*d[(y*w+x)*4+c]     + kern[5]*d[(y*w+(x+1))*4+c] +
          kern[6]*d[((y+1)*w+(x-1))*4+c]  + kern[7]*d[((y+1)*w+x)*4+c] + kern[8]*d[((y+1)*w+(x+1))*4+c];
        o[idx+c] = Math.min(255, Math.max(0, v));
      }
      o[idx+3] = d[idx+3];
    }
  }
  ctx.putImageData(dst, 0, 0);
}

function applyClarity(canvas, strength) {
  const ctx = canvas.getContext("2d");
  const w = canvas.width, h = canvas.height;
  const src = ctx.getImageData(0, 0, w, h);
  const d = src.data;
  for (let i = 0; i < d.length; i += 4) {
    const lum   = 0.299*d[i] + 0.587*d[i+1] + 0.114*d[i+2];
    const boost = (lum - 128) * strength * 0.4;
    d[i]   = Math.min(255, Math.max(0, d[i]   + boost));
    d[i+1] = Math.min(255, Math.max(0, d[i+1] + boost));
    d[i+2] = Math.min(255, Math.max(0, d[i+2] + boost));
  }
  ctx.putImageData(src, 0, 0);
}

function drawTemplate(canvas, photoImg, logoImg, opts) {
  const { brightness, contrast, showLogo, showFooter, caption, enhanceMode, sharpenStr, clarityStr } = opts;
  const ctx = canvas.getContext("2d");
  const w = canvas.width, h = canvas.height;

  ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
  ctx.drawImage(photoImg, 0, 0, w, h);
  ctx.filter = "none";

  if (enhanceMode === "sharpen" && sharpenStr > 0) applySharpening(canvas, sharpenStr * 0.8);
  if (enhanceMode === "clarity" && clarityStr > 0) applyClarity(canvas, clarityStr);
  if (enhanceMode === "both") {
    if (sharpenStr > 0) applySharpening(canvas, sharpenStr * 0.5);
    if (clarityStr > 0) applyClarity(canvas, clarityStr * 0.7);
  }

  if (showFooter) {
    const fh = Math.max(32, h * 0.09);
    ctx.fillStyle = "rgba(10,10,10,0.90)";
    ctx.fillRect(0, h - fh, w, fh);
    const fs   = Math.max(10, fh * 0.28);
    const dotR = fh * 0.18;
    ctx.font = `${fs}px sans-serif`;
    const items = [
      { color: "#cccccc", label: EMAIL },
      { color: "#4267B2", label: FB },
      { color: "#FF0000", label: YT },
    ];
    items.forEach((item, i) => {
      const cx = (w / 3) * i + (w / 3) * 0.06;
      const cy = h - fh / 2;
      ctx.fillStyle = item.color;
      ctx.beginPath();
      ctx.arc(cx + dotR, cy, dotR, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#cccccc";
      ctx.fillText(item.label, cx + dotR * 2 + 5, cy + fs * 0.35);
    });
  }

  if (showLogo && logoImg) {
    const r = Math.max(30, w * 0.065);
    ctx.drawImage(logoImg, 10, 10, r * 2, r * 2);
  }

  if (caption.trim()) {
    const fs = Math.max(13, w * 0.025);
    ctx.font = `${fs}px sans-serif`;
    const tw = ctx.measureText(caption).width;
    const py = showFooter ? h * 0.88 : h * 0.92;
    ctx.fillStyle = "rgba(0,0,0,0.62)";
    ctx.beginPath();
    ctx.roundRect((w - tw) / 2 - 10, py - fs - 3, tw + 20, fs + 12, 5);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText(caption, w / 2, py);
    ctx.textAlign = "left";
  }
}

/* ── PreviewCanvas ── */
function PreviewCanvas({ photoImg, logoImg, orientation, brightness, contrast, showLogo, showFooter, caption, enhanceMode, sharpenStr, clarityStr }) {
  const ref = useRef();
  const isL = orientation === "landscape";
  const w   = isL ? 480 : 270;
  const h   = isL ? 270 : 480;

  useEffect(() => {
    if (!ref.current) return;
    const c = ref.current;
    c.width = w; c.height = h;
    if (!photoImg) {
      const ctx = c.getContext("2d");
      ctx.fillStyle = "#1a1a1a"; ctx.fillRect(0, 0, w, h);
      if (logoImg && showLogo) ctx.drawImage(logoImg, 10, 10, 60, 66);
      if (showFooter) {
        ctx.fillStyle = "rgba(10,10,10,0.9)"; ctx.fillRect(0, h - 30, w, 30);
      }
      ctx.fillStyle = "#666"; ctx.font = "14px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("Upload a photo to preview", w / 2, h / 2);
      ctx.textAlign = "left";
      return;
    }
    drawTemplate(c, photoImg, logoImg, { brightness, contrast, showLogo, showFooter, caption, enhanceMode, sharpenStr, clarityStr });
  }, [photoImg, logoImg, w, h, brightness, contrast, showLogo, showFooter, caption, enhanceMode, sharpenStr, clarityStr]);

  return (
    <canvas
      ref={ref}
      style={{ width: w, height: h, borderRadius: 8, border: "0.5px solid rgba(0,0,0,0.25)", display: "block" }}
    />
  );
}

/* ── Main App ── */
function App() {
  const [step,        setStep]        = useState(0);
  const [orientation, setOrientation] = useState("landscape");
  const [photoImg,    setPhotoImg]    = useState(null);
  const [brightness,  setBrightness]  = useState(100);
  const [contrast,    setContrast]    = useState(105);
  const [showLogo,    setShowLogo]    = useState(true);
  const [showFooter,  setShowFooter]  = useState(true);
  const [caption,     setCaption]     = useState("");
  const [dragOver,    setDragOver]    = useState(false);
  const [enhanceMode, setEnhanceMode] = useState("sharpen");
  const [sharpenStr,  setSharpenStr]  = useState(0.5);
  const [clarityStr,  setClarityStr]  = useState(0.5);
  const [exporting,   setExporting]   = useState(null);
  const fileRef  = useRef();
  const logoImg  = useSvgImage(LOGO_SVG);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { setPhotoImg(img); setStep(1); };
    img.src = url;
  };

  const exportImage = (fmt, orient) => {
    if (!photoImg) return;
    const key = `${fmt}-${orient}`;
    setExporting(key);
    const isL = orient === "landscape";
    const c   = document.createElement("canvas");
    c.width   = isL ? 1920 : 1080;
    c.height  = isL ? 1080 : 1920;
    drawTemplate(c, photoImg, logoImg, { brightness, contrast, showLogo, showFooter, caption, enhanceMode, sharpenStr, clarityStr });
    const mime = fmt === "jpg" ? "image/jpeg" : "image/png";
    c.toBlob(blob => {
      const a  = document.createElement("a");
      a.href   = URL.createObjectURL(blob);
      a.download = `crmc-${orient}.${fmt}`;
      a.click();
      setExporting(null);
    }, mime, fmt === "jpg" ? 0.95 : 1);
  };

  const ENHANCE_MODES = [
    { id: "sharpen", label: "Sharpening",           desc: "Edge crispness — best for faces & detail" },
    { id: "clarity", label: "Clarity",               desc: "Local contrast lift — studio depth & texture" },
    { id: "both",    label: "Sharpening + Clarity",  desc: "Combined — max crispness, natural result" },
  ];

  const canAdvance = (i) => i <= (photoImg ? 2 : 0);

  return (
    <div className="app-wrapper">
      {/* Header */}
      <div className="app-header">
        {logoImg && <img src={logoImg.src} alt="CRMC Logo"/>}
        <div>
          <p className="sub">Christ Rebekah Mystery Church</p>
          <h2>Photo template editor</h2>
        </div>
      </div>

      {/* Tabs */}
      <div className="tab-bar">
        {STEPS.map((s, i) => (
          <button
            key={s}
            className={`tab-btn${step === i ? " active" : ""}`}
            onClick={() => canAdvance(i) && setStep(i)}
            style={{ color: step === i ? "var(--text-primary)" : "var(--text-secondary)", cursor: canAdvance(i) ? "pointer" : "default" }}
          >
            {i < step && <span style={{ color: "#2a9d5c", fontSize: 13 }}>✓</span>}
            {s}
          </button>
        ))}
      </div>

      {/* ── Step 0: Upload ── */}
      {step === 0 && (
        <div>
          <div
            className={`upload-zone${dragOver ? " drag-over" : ""}`}
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
            onClick={() => fileRef.current.click()}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-secondary)" }}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            <p style={{ fontWeight: 500, fontSize: 15 }}>Drop your photo here</p>
            <p className="label-sm">or click to browse — JPG, PNG, WEBP</p>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])}/>
          </div>

          <p className="heading-sm">Orientation</p>
          <div className="row" style={{ marginBottom: "2rem" }}>
            {["landscape", "portrait"].map(o => (
              <button key={o} className={`orientation-btn${orientation === o ? " active" : ""}`} onClick={() => setOrientation(o)}>
                {o === "landscape" ? "Landscape (16:9)" : "Portrait (9:16)"}
              </button>
            ))}
          </div>

          <p className="label-sm" style={{ marginBottom: 10 }}>Template preview</p>
          <div style={{ display: "flex", justifyContent: "center", padding: "1rem", background: "var(--bg-secondary)", borderRadius: 12 }}>
            <PreviewCanvas photoImg={null} logoImg={logoImg} orientation={orientation} brightness={100} contrast={100} showLogo showFooter caption="" enhanceMode="none" sharpenStr={0} clarityStr={0}/>
          </div>
        </div>
      )}

      {/* ── Step 1: Edit ── */}
      {step === 1 && (
        <div className="edit-layout">
          <div className="edit-controls">
            <p className="heading-sm">Adjustments</p>

            {[["Brightness", brightness, setBrightness, 50, 150], ["Contrast", contrast, setContrast, 50, 150]].map(([lbl, val, set, mn, mx]) => (
              <div key={lbl} style={{ marginBottom: "1rem" }}>
                <div className="row-between" style={{ marginBottom: 5 }}>
                  <span className="label-sm">{lbl}</span>
                  <span className="val-sm">{val}%</span>
                </div>
                <input type="range" min={mn} max={mx} step="1" value={val} onChange={e => set(+e.target.value)}/>
              </div>
            ))}

            <hr className="section-divider"/>
            <p className="heading-sm" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
              Quality enhancement
            </p>
            {ENHANCE_MODES.map(m => (
              <div key={m.id} className={`enhance-card${enhanceMode === m.id ? " selected" : ""}`} onClick={() => setEnhanceMode(m.id)}>
                <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: enhanceMode === m.id ? 500 : 400 }}>{m.label}</p>
                <p style={{ margin: 0, fontSize: 11, color: "var(--text-secondary)" }}>{m.desc}</p>
              </div>
            ))}
            {(enhanceMode === "sharpen" || enhanceMode === "both") && (
              <div style={{ marginTop: "0.75rem" }}>
                <div className="row-between" style={{ marginBottom: 4 }}>
                  <span className="label-xs">Sharpen strength</span>
                  <span className="val-xs">{Math.round(sharpenStr * 100)}%</span>
                </div>
                <input type="range" min="0" max="1" step="0.05" value={sharpenStr} onChange={e => setSharpenStr(+e.target.value)}/>
              </div>
            )}
            {(enhanceMode === "clarity" || enhanceMode === "both") && (
              <div style={{ marginTop: "0.75rem" }}>
                <div className="row-between" style={{ marginBottom: 4 }}>
                  <span className="label-xs">Clarity strength</span>
                  <span className="val-xs">{Math.round(clarityStr * 100)}%</span>
                </div>
                <input type="range" min="0" max="1" step="0.05" value={clarityStr} onChange={e => setClarityStr(+e.target.value)}/>
              </div>
            )}

            <hr className="section-divider"/>
            <p className="heading-sm">Overlays</p>
            <label className="check-row"><input type="checkbox" checked={showLogo}   onChange={e => setShowLogo(e.target.checked)}/>   Show logo</label>
            <label className="check-row"><input type="checkbox" checked={showFooter} onChange={e => setShowFooter(e.target.checked)}/> Show footer bar</label>
            <input type="text" value={caption} onChange={e => setCaption(e.target.value)} placeholder="Caption (optional)" style={{ marginTop: 8 }}/>

            <div className="row" style={{ marginTop: "1.5rem" }}>
              <button style={{ fontSize: 13, padding: "7px 12px" }} onClick={() => { setBrightness(100); setContrast(105); setSharpenStr(0.5); setClarityStr(0.5); }}>Reset</button>
              <button style={{ fontSize: 13, padding: "7px 16px", fontWeight: 500 }} onClick={() => setStep(2)}>Preview →</button>
            </div>
          </div>

          <div className="edit-preview">
            <div className="row">
              {["landscape", "portrait"].map(o => (
                <button key={o} className={`orientation-btn${orientation === o ? " active" : ""}`} style={{ fontSize: 12, padding: "5px 13px" }} onClick={() => setOrientation(o)}>
                  {o === "landscape" ? "Landscape" : "Portrait"}
                </button>
              ))}
            </div>
            <PreviewCanvas photoImg={photoImg} logoImg={logoImg} orientation={orientation} brightness={brightness} contrast={contrast} showLogo={showLogo} showFooter={showFooter} caption={caption} enhanceMode={enhanceMode} sharpenStr={sharpenStr} clarityStr={clarityStr}/>
            <p className="muted-note">Live preview — exports at full resolution</p>
          </div>
        </div>
      )}

      {/* ── Step 2: Export ── */}
      {step === 2 && (
        <div>
          <p className="label-sm" style={{ marginBottom: "1.25rem" }}>Both orientations — exported at 1920×1080 / 1080×1920</p>
          <div className="preview-layout">
            {["landscape", "portrait"].map(o => (
              <div key={o} style={{ textAlign: "center" }}>
                <p className="label-sm" style={{ marginBottom: 8, textTransform: "capitalize" }}>{o}</p>
                <PreviewCanvas photoImg={photoImg} logoImg={logoImg} orientation={o} brightness={brightness} contrast={contrast} showLogo={showLogo} showFooter={showFooter} caption={caption} enhanceMode={enhanceMode} sharpenStr={sharpenStr} clarityStr={clarityStr}/>
              </div>
            ))}
          </div>

          <div className="summary-box">
            <p className="heading-sm">Settings summary</p>
            <div className="row" style={{ flexWrap: "wrap", gap: "1rem" }}>
              {[
                ["Brightness", `${brightness}%`],
                ["Contrast",   `${contrast}%`],
                ["Enhancement", ENHANCE_MODES.find(m => m.id === enhanceMode)?.label],
                ...(enhanceMode === "sharpen" || enhanceMode === "both" ? [["Sharpen", `${Math.round(sharpenStr*100)}%`]] : []),
                ...(enhanceMode === "clarity" || enhanceMode === "both" ? [["Clarity",  `${Math.round(clarityStr*100)}%`]]  : []),
              ].map(([k, v]) => (
                <span key={k} className="label-sm">{k}: <strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>{v}</strong></span>
              ))}
            </div>
          </div>

          <p className="heading-sm" style={{ marginBottom: 10 }}>Download</p>
          <div className="download-grid">
            {[
              { fmt: "jpg", orient: "landscape", label: "JPG — Landscape" },
              { fmt: "png", orient: "landscape", label: "PNG — Landscape" },
              { fmt: "jpg", orient: "portrait",  label: "JPG — Portrait"  },
              { fmt: "png", orient: "portrait",  label: "PNG — Portrait"  },
            ].map(({ fmt, orient, label }) => (
              <button key={label} className="download-btn" onClick={() => exportImage(fmt, orient)} disabled={!!exporting}>
                {exporting === `${fmt}-${orient}` ? "Exporting…" : label}
              </button>
            ))}
          </div>

          <button style={{ fontSize: 13, padding: "8px 16px" }} onClick={() => setStep(1)}>← Back to edit</button>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
