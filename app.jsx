const { useState, useRef, useEffect } = React;

/* ── Output dimensions ── */
const LW = 1280, LH = 862;
const PW = 1066, PH = 1600;
const PS = 0.36;

/* ── Footer text (exact match to reference) ── */
const EMAIL_TXT = "christrebekahmystery@gmail.com";
const FB_TXT    = "christ rebekah mystery church";
const YT_TXT    = "christ rebekah mystery church";

/* ── Asset paths (place files in images/ folder) ──
   images/logo.png      → your logo image
   images/email.jpg     → email icon    (Image 6)
   images/facebook.jpg  → Facebook icon (Image 8)
   images/youtube.jpg   → YouTube icon  (Image 7)
*/
const PATH_LOGO  = "images/logo.png";
const PATH_EMAIL = "images/email.jpg";
const PATH_FB    = "images/facebook.jpg";
const PATH_YT    = "images/youtube.jpg";

/* ─────────────────────────────────────────────────
   FLAT WHITE ICON SVG PATHS
   Drawn as pure white fill, no background.
   These are rendered onto the canvas footer bar.
───────────────────────────────────────────────── */

/* Envelope — outline style matching reference */
const ICON_EMAIL_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path fill="white" d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>
</svg>`;

/* Facebook f — solid white, no circle background */
const ICON_FB_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path fill="white" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3H13v6.8c4.56-.93 8-4.96 8-9.8z"/>
</svg>`;

/* YouTube play button — solid white */
const ICON_YT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path fill="white" d="M21.58 7.19a2.76 2.76 0 0 0-1.94-1.95C18.0 5 12 5 12 5s-6 0-7.64.24a2.76 2.76 0 0 0-1.94 1.95A28.9 28.9 0 0 0 2 12a28.9 28.9 0 0 0 .42 4.81 2.76 2.76 0 0 0 1.94 1.95C6 19 12 19 12 19s6 0 7.64-.24a2.76 2.76 0 0 0 1.94-1.95A28.9 28.9 0 0 0 22 12a28.9 28.9 0 0 0-.42-4.81zM10 15V9l5.2 3-5.2 3z"/>
</svg>`;

/* ── Load any image URL → HTMLImageElement ── */
function useImg(src) {
  const [img, setImg] = useState(null);
  useEffect(() => {
    if (!src) return;
    const i = new Image();
    i.onload  = () => setImg(i);
    i.onerror = () => console.warn("Could not load:", src);
    i.src = src;
  }, [src]);
  return img;
}

/* ── Load SVG string → HTMLImageElement ── */
function useSvgImg(svgStr) {
  const [img, setImg] = useState(null);
  useEffect(() => {
    const blob = new Blob([svgStr], { type: "image/svg+xml" });
    const url  = URL.createObjectURL(blob);
    const i    = new Image();
    i.onload   = () => { setImg(i); URL.revokeObjectURL(url); };
    i.src      = url;
  }, [svgStr]);
  return img;
}

/* ── Sharpening kernel ── */
function doSharpen(canvas, s) {
  const ctx = canvas.getContext("2d");
  const w = canvas.width, h = canvas.height;
  const src = ctx.getImageData(0,0,w,h), dst = ctx.createImageData(w,h);
  const d = src.data, o = dst.data;
  const k = [0,-s,0, -s,1+4*s,-s, 0,-s,0];
  for (let y=1; y<h-1; y++) for (let x=1; x<w-1; x++) {
    const i = (y*w+x)*4;
    for (let c=0; c<3; c++) {
      o[i+c] = Math.min(255,Math.max(0,
        k[0]*d[((y-1)*w+x-1)*4+c]+k[1]*d[((y-1)*w+x)*4+c]+k[2]*d[((y-1)*w+x+1)*4+c]+
        k[3]*d[(y*w+x-1)*4+c]    +k[4]*d[(y*w+x)*4+c]    +k[5]*d[(y*w+x+1)*4+c]+
        k[6]*d[((y+1)*w+x-1)*4+c]+k[7]*d[((y+1)*w+x)*4+c]+k[8]*d[((y+1)*w+x+1)*4+c]));
    }
    o[i+3] = d[i+3];
  }
  ctx.putImageData(dst,0,0);
}

/* ── Clarity (local contrast boost) ── */
function doClarity(canvas, s) {
  const ctx = canvas.getContext("2d");
  const src = ctx.getImageData(0,0,canvas.width,canvas.height), d = src.data;
  for (let i=0; i<d.length; i+=4) {
    const b = (0.299*d[i]+0.587*d[i+1]+0.114*d[i+2]-128)*s*0.4;
    d[i]  =Math.min(255,Math.max(0,d[i]+b));
    d[i+1]=Math.min(255,Math.max(0,d[i+1]+b));
    d[i+2]=Math.min(255,Math.max(0,d[i+2]+b));
  }
  ctx.putImageData(src,0,0);
}

/* ─────────────────────────────────────────────────
   CORE RENDER
   Draws everything onto a canvas.
   iconEmail / iconFb / iconYt are the flat-white
   SVG images (HTMLImageElement) — same size,
   vertically centred with the text in each segment.
───────────────────────────────────────────────── */
function renderFrame(canvas, photo, logo, iconEmail, iconFb, iconYt, opts, crop) {
  const { brightness, contrast, showLogo, showFooter, caption,
          enhanceMode, sharpenStr, clarityStr } = opts;
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;

  /* ── Photo with crop / zoom ── */
  const { ox, oy, zoom } = crop;
  const sw = photo.naturalWidth  / zoom;
  const sh = photo.naturalHeight / zoom;
  const sx = Math.max(0, Math.min(photo.naturalWidth  - sw, ox * photo.naturalWidth  / zoom));
  const sy = Math.max(0, Math.min(photo.naturalHeight - sh, oy * photo.naturalHeight / zoom));
  ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
  ctx.drawImage(photo, sx, sy, sw, sh, 0, 0, W, H);
  ctx.filter = "none";

  /* ── Enhancements ── */
  if (enhanceMode === "sharpen" && sharpenStr > 0) doSharpen(canvas, sharpenStr * 0.8);
  if (enhanceMode === "clarity" && clarityStr > 0) doClarity(canvas, clarityStr);
  if (enhanceMode === "both") {
    if (sharpenStr > 0) doSharpen(canvas, sharpenStr * 0.5);
    if (clarityStr > 0) doClarity(canvas, clarityStr * 0.7);
  }

  /* ── FOOTER BAR ──────────────────────────────────
     Layout (matches reference photo exactly):
     • Pure black bar, full width
     • Three equal segments separated by faint dividers
     • Each segment: [icon]  [text]
       – icon: uniform square, flat white, no bg
       – text: white, vertically centred with icon
       – consistent left margin and icon-to-text gap
  ─────────────────────────────────────────────── */
  if (showFooter) {
    const FH    = Math.round(H * 0.108);   // footer height
    const FY    = H - FH;                  // footer top Y
    const ICON  = Math.round(FH * 0.52);   // icon size (uniform square)
    const GAP   = Math.round(W * 0.010);   // gap between icon and text
    const LPAD  = Math.round(W * 0.022);   // left padding inside each segment
    const SEG   = W / 3;
    const FS    = Math.max(12, Math.round(FH * 0.30)); // font size

    /* solid black bar */
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, FY, W, FH);

    const items = [
      { icon: iconEmail, label: EMAIL_TXT },
      { icon: iconFb,    label: FB_TXT    },
      { icon: iconYt,    label: YT_TXT    },
    ];

    items.forEach(({ icon, label }, idx) => {
      const segX  = SEG * idx;                        // segment left edge
      const iconX = segX + LPAD;                      // icon left
      const iconY = FY + Math.round((FH - ICON) / 2); // icon vertically centred
      const textX = iconX + ICON + GAP;               // text left (right of icon + gap)
      const textY = FY + Math.round(FH / 2) + Math.round(FS * 0.36); // text baseline vertically centred

      /* flat white icon — drawn at uniform ICON×ICON size */
      if (icon) ctx.drawImage(icon, iconX, iconY, ICON, ICON);

      /* white label */
      ctx.font      = `400 ${FS}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
      ctx.fillStyle = "#ffffff";
      ctx.textBaseline = "alphabetic";
      ctx.fillText(label, textX, textY);

      /* faint vertical divider between segments */
      if (idx < 2) {
        ctx.fillStyle = "rgba(255,255,255,0.18)";
        ctx.fillRect(Math.round(SEG * (idx + 1)) - 1, FY + Math.round(FH * 0.18), 1, Math.round(FH * 0.64));
      }
    });
  }

  /* ── LOGO — top-left ── */
  if (showLogo && logo) {
    const LH_  = Math.round(H * 0.108);
    const LW_  = Math.round(LH_ * (logo.naturalWidth / logo.naturalHeight));
    ctx.drawImage(logo, 14, 14, LW_, LH_);
  }

  /* ── CAPTION ── */
  if (caption.trim()) {
    const FS2 = Math.round(W * 0.021);
    ctx.font  = `${FS2}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
    const TW  = ctx.measureText(caption).width;
    const PAD = FS2 * 0.55;
    const PY  = showFooter ? H * 0.864 : H * 0.93;
    ctx.fillStyle = "rgba(0,0,0,0.66)";
    ctx.beginPath();
    ctx.roundRect((W - TW) / 2 - PAD, PY - FS2 - PAD * 0.4, TW + PAD * 2, FS2 + PAD * 1.2, 5);
    ctx.fill();
    ctx.fillStyle    = "#ffffff";
    ctx.textAlign    = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillText(caption, W / 2, PY);
    ctx.textAlign = "left";
  }
}

/* ── Crop canvas (drag to pan + rule-of-thirds grid) ── */
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
    const sw = photo.naturalWidth/zoom,  sh = photo.naturalHeight/zoom;
    const sx = Math.max(0,Math.min(photo.naturalWidth -sw,ox*photo.naturalWidth /zoom));
    const sy = Math.max(0,Math.min(photo.naturalHeight-sh,oy*photo.naturalHeight/zoom));
    ctx.drawImage(photo, sx, sy, sw, sh, 0, 0, cw, ch);
    ctx.strokeStyle = "rgba(255,255,255,0.3)"; ctx.lineWidth = 0.6; ctx.setLineDash([4,4]);
    for (let i=1; i<3; i++) {
      ctx.beginPath(); ctx.moveTo(cw*i/3,0); ctx.lineTo(cw*i/3,ch); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0,ch*i/3); ctx.lineTo(cw,ch*i/3); ctx.stroke();
    }
    ctx.setLineDash([]);
  }, [photo, crop, cw, ch]);

  const getXY = e => {
    const r = ref.current.getBoundingClientRect();
    return e.touches
      ? { x: e.touches[0].clientX - r.left, y: e.touches[0].clientY - r.top }
      : { x: e.clientX - r.left,             y: e.clientY - r.top };
  };
  const onStart = e => { drag.current=true; const{x,y}=getXY(e); ds.current={x,y,ox:crop.ox,oy:crop.oy}; };
  const onMove  = e => {
    if (!drag.current) return; e.preventDefault();
    const {x,y}=getXY(e);
    const dx=(x-ds.current.x)/cw, dy=(y-ds.current.y)/ch;
    setCrop(c=>({...c,
      ox:Math.max(0,Math.min(c.zoom-1, ds.current.ox-dx*(c.zoom-1))),
      oy:Math.max(0,Math.min(c.zoom-1, ds.current.oy-dy*(c.zoom-1))),
    }));
  };
  const onEnd = () => { drag.current=false; };

  return (
    <canvas ref={ref}
      style={{width:cw,height:ch,display:"block",borderRadius:7,cursor:"grab",
              border:"0.5px solid rgba(255,255,255,0.14)",touchAction:"none"}}
      onMouseDown={onStart} onMouseMove={onMove} onMouseUp={onEnd} onMouseLeave={onEnd}
      onTouchStart={onStart} onTouchMove={onMove} onTouchEnd={onEnd}/>
  );
}

/* ── Preview canvas ── */
function Preview({ photo, logo, iconEmail, iconFb, iconYt, orientation, opts, crop }) {
  const ref = useRef();
  const cw  = Math.round((orientation === "landscape" ? LW : PW) * PS);
  const ch  = Math.round((orientation === "landscape" ? LH : PH) * PS);

  useEffect(() => {
    if (!ref.current) return;
    const c = ref.current; c.width=cw; c.height=ch;
    if (!photo) {
      const ctx = c.getContext("2d");
      ctx.fillStyle="#111"; ctx.fillRect(0,0,cw,ch);
      if (logo && opts.showLogo) {
        const lh=Math.round(ch*0.108), lw=Math.round(lh*(logo.naturalWidth/logo.naturalHeight));
        ctx.drawImage(logo,8,8,lw,lh);
      }
      if (opts.showFooter) {
        ctx.fillStyle="#000"; ctx.fillRect(0,ch-Math.round(ch*0.108),cw,Math.round(ch*0.108));
      }
      ctx.fillStyle="#555"; ctx.font="13px sans-serif";
      ctx.textAlign="center"; ctx.fillText("Upload a photo to preview",cw/2,ch/2); ctx.textAlign="left";
      return;
    }
    renderFrame(c, photo, logo, iconEmail, iconFb, iconYt, opts, crop);
  }, [photo,logo,iconEmail,iconFb,iconYt,cw,ch,opts,crop]);

  return <canvas ref={ref} style={{width:cw,height:ch,display:"block",borderRadius:8,border:"0.5px solid rgba(0,0,0,0.18)"}}/>;
}

/* ── Flat white icon SVG for the UI footer strip ── */
const IconEmail = () => (
  <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/>
  </svg>
);
const IconFb = () => (
  <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3H13v6.8c4.56-.93 8-4.96 8-9.8z"/>
  </svg>
);
const IconYt = () => (
  <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.58 7.19a2.76 2.76 0 0 0-1.94-1.95C18 5 12 5 12 5s-6 0-7.64.24a2.76 2.76 0 0 0-1.94 1.95A28.9 28.9 0 0 0 2 12a28.9 28.9 0 0 0 .42 4.81 2.76 2.76 0 0 0 1.94 1.95C6 19 12 19 12 19s6 0 7.64-.24a2.76 2.76 0 0 0 1.94-1.95A28.9 28.9 0 0 0 22 12a28.9 28.9 0 0 0-.42-4.81zM10 15V9l5.2 3-5.2 3z"/>
  </svg>
);

const EMODES = [
  { id:"sharpen", t:"Sharpening",           s:"Edge crispness — best for faces & detail" },
  { id:"clarity", t:"Clarity",               s:"Studio depth — local contrast lift" },
  { id:"both",    t:"Sharpening + Clarity",  s:"Max crispness, fully natural result" },
];
const STEPS = ["Upload", "Crop & Edit", "Preview & Export"];

/* ══════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════ */
function App() {
  const [step,  setStep]  = useState(0);
  const [ori,   setOri]   = useState("landscape");
  const [photo, setPhoto] = useState(null);
  const [crop,  setCrop]  = useState({ ox:0, oy:0, zoom:1 });
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

  /* Load real image assets */
  const logo      = useImg(PATH_LOGO);

  /* Flat-white SVG icon images for canvas rendering */
  const iconEmail = useSvgImg(ICON_EMAIL_SVG);
  const iconFb    = useSvgImg(ICON_FB_SVG);
  const iconYt    = useSvgImg(ICON_YT_SVG);

  const opts = { brightness:bri, contrast:con, showLogo:sLogo, showFooter:sFoot,
                 caption:cap, enhanceMode:emode, sharpenStr:sStr, clarityStr:cStr };

  const loadPhoto = file => {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { setPhoto(img); setCrop({ox:0,oy:0,zoom:1}); setStep(1); };
    img.src = url;
  };

  const doExport = (fmt, orient) => {
    if (!photo) return;
    const key=`${fmt}-${orient}`; setExpo(key);
    const c = document.createElement("canvas");
    c.width  = orient==="landscape" ? LW : PW;
    c.height = orient==="landscape" ? LH : PH;
    renderFrame(c, photo, logo, iconEmail, iconFb, iconYt, opts, crop);
    c.toBlob(blob => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `crmc-${orient}.${fmt}`;
      a.click(); setExpo(null);
    }, fmt==="jpg"?"image/jpeg":"image/png", fmt==="jpg"?0.95:1);
  };

  const canGo = i => i <= (photo ? 2 : 0);

  return (
    <div className="wrap">

      {/* Header */}
      <div className="app-hdr">
        {logo && <img src={PATH_LOGO} alt="CRMC logo"/>}
        <div>
          <p className="sub">Christ Rebekah Mystery Church</p>
          <h2>Photo template editor</h2>
        </div>
      </div>

      {/* Tabs */}
      <div className="tab-bar">
        {STEPS.map((s,i) => (
          <button key={s} className={`tab${step===i?" on":""}`}
            onClick={() => canGo(i) && setStep(i)}
            style={{color:step===i?"var(--tx)":"var(--tx2)", cursor:canGo(i)?"pointer":"default"}}>
            {i < step && <span style={{color:"#2a9d5c"}}>✓</span>}{s}
          </button>
        ))}
      </div>

      {/* ══ STEP 0 — Upload ══ */}
      {step===0 && (
        <div>
          <div className={`upload-zone${dragZ?" over":""}`}
            onDragOver={e=>{e.preventDefault();setDragZ(true);}}
            onDragLeave={()=>setDragZ(false)}
            onDrop={e=>{e.preventDefault();setDragZ(false);loadPhoto(e.dataTransfer.files[0]);}}
            onClick={()=>fRef.current.click()}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{color:"var(--tx2)"}}>
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            <p style={{fontWeight:500,fontSize:15}}>Drop your photo here</p>
            <p className="smc">or click to browse — JPG, PNG, WEBP</p>
            <input ref={fRef} type="file" accept="image/*" style={{display:"none"}}
              onChange={e=>loadPhoto(e.target.files[0])}/>
          </div>

          <p className="head">Orientation</p>
          <div className="row" style={{gap:10,marginBottom:"1.75rem"}}>
            {["landscape","portrait"].map(o => (
              <button key={o} className={`ori-btn${ori===o?" on":""}`} onClick={()=>setOri(o)}>
                {o==="landscape"?`Landscape (${LW}×${LH})`:`Portrait (${PW}×${PH})`}
              </button>
            ))}
          </div>

          {/* Footer preview strip — flat white icons, black bar */}
          <p className="head">Footer bar</p>
          <div className="foot-prev">
            {[
              { Icon: IconEmail, label: EMAIL_TXT },
              { Icon: IconFb,    label: FB_TXT    },
              { Icon: IconYt,    label: YT_TXT    },
            ].map(({Icon,label},i) => (
              <div key={i} className="foot-item">
                <Icon/>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <p className="smc" style={{marginBottom:10}}>Template preview (no photo yet)</p>
          <div style={{display:"flex",justifyContent:"center",padding:"1rem",background:"var(--bg2)",borderRadius:12}}>
            <Preview photo={null} logo={logo} iconEmail={iconEmail} iconFb={iconFb} iconYt={iconYt}
              orientation={ori} opts={opts} crop={crop}/>
          </div>
        </div>
      )}

      {/* ══ STEP 1 — Crop & Edit ══ */}
      {step===1 && (
        <div className="edit-wrap">
          <div className="edit-ctrl">

            <p className="head">Orientation</p>
            <div className="row" style={{gap:8,marginBottom:"1rem"}}>
              {["landscape","portrait"].map(o => (
                <button key={o} className={`ori-btn${ori===o?" on":""}`}
                  style={{fontSize:12,padding:"5px 12px"}} onClick={()=>setOri(o)}>
                  {o==="landscape"?"Landscape":"Portrait"}
                </button>
              ))}
            </div>

            <p className="head">Crop & zoom</p>
            <p className="note" style={{marginBottom:7}}>Drag the preview to pan. Zoom to fill frame.</p>
            <div className="rowb" style={{marginBottom:4}}>
              <span className="smc">Zoom</span>
              <span className="smb">{crop.zoom.toFixed(2)}×</span>
            </div>
            <input type="range" min="1" max="3" step="0.01" value={crop.zoom}
              onChange={e=>setCrop(c=>({...c,zoom:+e.target.value}))}/>
            <div className="row" style={{marginTop:8,marginBottom:"1.1rem"}}>
              <button className="sm" style={{padding:"5px 12px"}}
                onClick={()=>setCrop({ox:0,oy:0,zoom:1})}>Reset crop</button>
            </div>

            <hr className="div"/>
            <p className="head">Adjustments</p>
            {[["Brightness",bri,setBri,50,150],["Contrast",con,setCon,50,150]].map(([l,v,s,mn,mx])=>(
              <div key={l} style={{marginBottom:"0.9rem"}}>
                <div className="rowb" style={{marginBottom:4}}>
                  <span className="smc">{l}</span><span className="smb">{v}%</span>
                </div>
                <input type="range" min={mn} max={mx} step="1" value={v} onChange={e=>s(+e.target.value)}/>
              </div>
            ))}

            <hr className="div"/>
            <p className="head">Quality enhancement</p>
            {EMODES.map(m => (
              <div key={m.id} className={`ecard${emode===m.id?" on":""}`} onClick={()=>setEmode(m.id)}>
                <p className="et" style={{fontWeight:emode===m.id?500:400}}>{m.t}</p>
                <p className="es">{m.s}</p>
              </div>
            ))}
            {(emode==="sharpen"||emode==="both") && (
              <div style={{marginTop:8}}>
                <div className="rowb" style={{marginBottom:4}}>
                  <span className="smc">Sharpen strength</span>
                  <span className="smb">{Math.round(sStr*100)}%</span>
                </div>
                <input type="range" min="0" max="1" step="0.05" value={sStr}
                  onChange={e=>setSStr(+e.target.value)}/>
              </div>
            )}
            {(emode==="clarity"||emode==="both") && (
              <div style={{marginTop:8}}>
                <div className="rowb" style={{marginBottom:4}}>
                  <span className="smc">Clarity strength</span>
                  <span className="smb">{Math.round(cStr*100)}%</span>
                </div>
                <input type="range" min="0" max="1" step="0.05" value={cStr}
                  onChange={e=>setCStr(+e.target.value)}/>
              </div>
            )}

            <hr className="div"/>
            <p className="head">Overlays</p>
            <label className="chk">
              <input type="checkbox" checked={sLogo} onChange={e=>setSLogo(e.target.checked)}/>
              Show logo (top left)
            </label>
            <label className="chk">
              <input type="checkbox" checked={sFoot} onChange={e=>setSFoot(e.target.checked)}/>
              Show footer bar
            </label>
            <input type="text" value={cap} onChange={e=>setCap(e.target.value)}
              placeholder="Caption (optional)" style={{marginTop:8}}/>

            <div className="row" style={{marginTop:"1.35rem"}}>
              <button className="sm" style={{padding:"7px 12px"}}
                onClick={()=>{setBri(100);setCon(105);setSStr(0.5);setCStr(0.5);setCrop({ox:0,oy:0,zoom:1});}}>
                Reset all
              </button>
              <button className="sm" style={{padding:"7px 16px",fontWeight:500}} onClick={()=>setStep(2)}>
                Preview →
              </button>
            </div>
          </div>

          <div className="edit-canvas">
            <div style={{background:"#0d0d0d",borderRadius:10,padding:10}}>
              <CropCanvas photo={photo} crop={crop} setCrop={setCrop} orientation={ori}/>
            </div>
            <p className="note" style={{textAlign:"center"}}>Drag to pan · Zoom slider to fill frame</p>
            <p className="note" style={{textAlign:"center",marginTop:2}}>
              Output: {ori==="landscape"?`${LW}×${LH}`:`${PW}×${PH}`} px
            </p>
          </div>
        </div>
      )}

      {/* ══ STEP 2 — Preview & Export ══ */}
      {step===2 && (
        <div>
          <p className="smc" style={{marginBottom:"1.25rem"}}>
            Final previews — full resolution with all overlays applied
          </p>
          <div className="prev-wrap">
            {["landscape","portrait"].map(o => (
              <div key={o} style={{textAlign:"center"}}>
                <p className="smc" style={{marginBottom:8,textTransform:"capitalize"}}>
                  {o} — {o==="landscape"?`${LW}×${LH}`:`${PW}×${PH}`}
                </p>
                <Preview photo={photo} logo={logo} iconEmail={iconEmail} iconFb={iconFb} iconYt={iconYt}
                  orientation={o} opts={opts} crop={crop}/>
              </div>
            ))}
          </div>

          <div className="summary">
            <p className="head">Applied settings</p>
            <div className="row" style={{flexWrap:"wrap",gap:"1rem"}}>
              {[
                ["Brightness",`${bri}%`],
                ["Contrast",`${con}%`],
                ["Zoom",`${crop.zoom.toFixed(2)}×`],
                ["Enhancement", EMODES.find(m=>m.id===emode)?.t],
                ...(emode==="sharpen"||emode==="both"?[["Sharpen",`${Math.round(sStr*100)}%`]]:[]),
                ...(emode==="clarity" ||emode==="both"?[["Clarity", `${Math.round(cStr*100)}%`]]:[]),
              ].map(([k,v]) => (
                <span key={k} className="smc">
                  {k}: <strong style={{color:"var(--tx)",fontWeight:500}}>{v}</strong>
                </span>
              ))}
            </div>
          </div>

          <p className="head" style={{marginBottom:10}}>Download — full resolution</p>
          <div className="dl-grid">
            {[
              {fmt:"jpg",o:"landscape",lbl:`JPG  Landscape  ${LW}×${LH}`},
              {fmt:"png",o:"landscape",lbl:`PNG  Landscape  ${LW}×${LH}`},
              {fmt:"jpg",o:"portrait", lbl:`JPG  Portrait   ${PW}×${PH}`},
              {fmt:"png",o:"portrait", lbl:`PNG  Portrait   ${PW}×${PH}`},
            ].map(({fmt,o,lbl}) => (
              <button key={lbl} className="dl-btn" onClick={()=>doExport(fmt,o)} disabled={!!expo}>
                {expo===`${fmt}-${o}`?"Exporting…":lbl}
              </button>
            ))}
          </div>
          <button className="sm" style={{padding:"8px 16px"}} onClick={()=>setStep(1)}>← Back to edit</button>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);