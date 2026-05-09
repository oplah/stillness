import { useRef, useState, useEffect, useCallback } from 'react';
import { illUrl } from './palettes';

// ── Audio helpers (Web Audio API, synthesised — no files needed) ─────────────
function getAudioCtx(ref) {
  if (!ref.current) ref.current = new (window.AudioContext || window.webkitAudioContext)();
  if (ref.current.state === 'suspended') ref.current.resume();
  return ref.current;
}
// Soft airy tick for hover
function playHover(ctx) {
  const g = ctx.createGain(), o = ctx.createOscillator();
  o.connect(g); g.connect(ctx.destination);
  o.type = 'sine'; o.frequency.value = 700;
  const t = ctx.currentTime;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(0.06, t + 0.006);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.045);
  o.start(t); o.stop(t + 0.05);
}
// Satisfying wooden-click for piece placement
function playSnap(ctx) {
  const t = ctx.currentTime;
  // Main tone: 420 Hz → 210 Hz
  const g1 = ctx.createGain(), o1 = ctx.createOscillator();
  o1.connect(g1); g1.connect(ctx.destination);
  o1.type = 'sine';
  o1.frequency.setValueAtTime(420, t);
  o1.frequency.exponentialRampToValueAtTime(210, t + 0.11);
  g1.gain.setValueAtTime(0.26, t);
  g1.gain.exponentialRampToValueAtTime(0.001, t + 0.13);
  o1.start(t); o1.stop(t + 0.13);
  // Harmonic overtone: 840 Hz, decays faster
  const g2 = ctx.createGain(), o2 = ctx.createOscillator();
  o2.connect(g2); g2.connect(ctx.destination);
  o2.type = 'sine'; o2.frequency.value = 840;
  g2.gain.setValueAtTime(0.09, t);
  g2.gain.exponentialRampToValueAtTime(0.001, t + 0.055);
  o2.start(t); o2.stop(t + 0.06);
}

const CW = 920, TAB = 0.26;
// Desktop layout constants
const CH_D = 520, BX_D = 260, BY_D = 60, IMG_D = 400;
const MOB = 0.65;       // scale threshold for mobile layout
const MARGIN_M = 20;    // mobile board side margin (canvas units)

// Returns the full layout for a given scale
function getLayout(scale) {
  if (scale >= MOB) return { bx: BX_D, by: BY_D, img: IMG_D, ch: CH_D, snap: 42 };
  const bx = MARGIN_M, by = MARGIN_M;
  const img = CW - MARGIN_M * 2;          // 880 — fills the canvas width
  const overhead = 130;                    // header + padding + hint + gaps (px)
  const ch = Math.max(
    img + by + 260,                        // minimum: board + decent tray
    Math.round((window.innerHeight - overhead) / scale),
  );
  return { bx, by, img, ch, snap: 68 };
}

function genTabs(cols, rows) {
  const h = Array.from({ length: rows },    () => Array.from({ length: cols - 1 }, () => Math.random() > .5 ? 1 : -1));
  const v = Array.from({ length: rows - 1 }, () => Array.from({ length: cols },     () => Math.random() > .5 ? 1 : -1));
  return Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => ({
      top:    r === 0        ? 0 : -v[r-1][c],
      right:  c === cols - 1 ? 0 :  h[r][c],
      bottom: r === rows - 1 ? 0 :  v[r][c],
      left:   c === 0        ? 0 : -h[r][c-1],
    }))
  );
}

function jigsawPath(pw, ph, { top, right, bottom, left }) {
  const tx = pw * TAB, ty = ph * TAB, nx = pw * 0.17, ny = ph * 0.17;
  const mx = pw / 2, my = ph / 2;
  let d = 'M 0 0 ';
  if (top !== 0) {
    const h = -top * ty;
    d += `L ${mx-nx} 0 C ${mx-nx} ${h*.5} ${mx-nx*.5} ${h} ${mx} ${h} C ${mx+nx*.5} ${h} ${mx+nx} ${h*.5} ${mx+nx} 0 `;
  }
  d += `L ${pw} 0 `;
  if (right !== 0) {
    const h = right * tx;
    d += `L ${pw} ${my-ny} C ${pw+h*.5} ${my-ny} ${pw+h} ${my-ny*.5} ${pw+h} ${my} C ${pw+h} ${my+ny*.5} ${pw+h*.5} ${my+ny} ${pw} ${my+ny} `;
  }
  d += `L ${pw} ${ph} `;
  if (bottom !== 0) {
    const h = bottom * ty;
    d += `L ${mx+nx} ${ph} C ${mx+nx} ${ph+h*.5} ${mx+nx*.5} ${ph+h} ${mx} ${ph+h} C ${mx-nx*.5} ${ph+h} ${mx-nx} ${ph+h*.5} ${mx-nx} ${ph} `;
  }
  d += `L 0 ${ph} `;
  if (left !== 0) {
    const h = -left * tx;
    d += `L 0 ${my+ny} C ${h*.5} ${my+ny} ${h} ${my+ny*.5} ${h} ${my} C ${h} ${my-ny*.5} ${h*.5} ${my-ny} 0 ${my-ny} `;
  }
  d += 'L 0 0 Z';
  return d;
}

function scatter(bx, by, bw, bh, cw, ch, pw, ph) {
  const m = 10;
  const zones = [
    { x: m,       y: m,       w: bx - m*2,            h: ch - m*2 },
    { x: bx+bw+m, y: m,       w: cw - bx - bw - m*2,  h: ch - m*2 },
    { x: bx,      y: by+bh+m, w: bw,                  h: ch - by - bh - m*2 },
    { x: bx,      y: m,       w: bw,                  h: by - m*2 },
  ].filter(z => z.w > pw + 10 && z.h > ph + 10);
  if (!zones.length) return { x: m + Math.random() * (cw - pw - m*2), y: m + Math.random() * (ch - ph - m*2) };
  const z = zones[Math.floor(Math.random() * zones.length)];
  return { x: z.x + Math.random() * (z.w - pw), y: z.y + Math.random() * (z.h - ph) };
}

function scatterMobile(pw, ph, bx, by, img, ch) {
  const m = 16;
  const trayY = by + img + 34;
  return {
    x: m + Math.random() * (CW - pw - m * 2),
    y: trayY + Math.random() * Math.max(10, ch - trayY - ph - m),
  };
}

function initPieces(cols, rows, layout) {
  const { bx, by, img, ch } = layout;
  const tabs = genTabs(cols, rows);
  const pw = img / cols, ph = img / rows;
  const mobile = img > IMG_D;
  const ps = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const s = jigsawPath(pw, ph, tabs[r][c]);
      const pos = mobile
        ? scatterMobile(pw, ph, bx, by, img, ch)
        : scatter(bx, by, img, img, CW, ch, pw, ph);
      ps.push({ id: r*cols+c, col: c, row: r, x: pos.x, y: pos.y, pw, ph, tabs: tabs[r][c], ps: s, p2: new Path2D(s), placed: false });
    }
  }
  for (let i = ps.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ps[i], ps[j]] = [ps[j], ps[i]];
  }
  return ps;
}

export default function PuzzleCanvas({ svgStr, cols, rows, onComplete, uiTheme, soundEnabled }) {
  const cvs = useRef(null), imgR = useRef(null), pcs = useRef([]), drag = useRef(null), rafR = useRef(null);
  const audioCtxRef = useRef(null);
  const hoverIdxRef = useRef(-1);   // last piece index under cursor (for hover sound)
  const [loaded, setLoaded] = useState(false);
  const [placed, setPlaced] = useState(0);
  const [scale, setScale] = useState(1);
  const scaleRef = useRef(1);
  const prevImgRef = useRef(null);  // track layout.img to detect desktop↔mobile switch
  const total = cols * rows;

  const layout = getLayout(scale);
  // Always-fresh ref so draw/onUp closures never go stale
  const layoutRef = useRef(layout);
  layoutRef.current = layout;

  useEffect(() => {
    const update = () => {
      const s = Math.min(1, window.innerWidth / CW);
      scaleRef.current = s;
      setScale(s);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Load image → init pieces with layout computed at load time
  useEffect(() => {
    const im = new Image();
    im.onload = () => {
      const L = getLayout(scaleRef.current);
      imgR.current = im;
      prevImgRef.current = L.img;
      pcs.current = initPieces(cols, rows, L);
      setLoaded(true);
      setPlaced(0);
    };
    im.src = illUrl(svgStr);
  }, [svgStr, cols, rows]);

  // Re-scatter if the layout switches between mobile and desktop
  useEffect(() => {
    if (!loaded) return;
    if (prevImgRef.current === layout.img) return;
    prevImgRef.current = layout.img;
    pcs.current = initPieces(cols, rows, layout);
  }, [layout.img, loaded, cols, rows]); // eslint-disable-line react-hooks/exhaustive-deps

  const draw = useCallback(() => {
    const el = cvs.current; if (!el || !imgR.current) return;
    const ctx = el.getContext('2d');
    const L = layoutRef.current;
    const pw = L.img / cols, ph = L.img / rows;
    const dark = uiTheme === 'dark';
    const effectiveCh = el.height;
    const mob = L.img > IMG_D;

    ctx.clearRect(0, 0, CW, effectiveCh);
    ctx.fillStyle = dark ? '#12102a' : '#eae4db';
    ctx.fillRect(0, 0, CW, effectiveCh);

    // Dot grid
    ctx.fillStyle = dark ? 'rgba(150,130,190,.12)' : 'rgba(150,130,190,.1)';
    for (let x = 22; x < CW; x += 28) for (let y = 22; y < effectiveCh; y += 28) {
      ctx.beginPath(); ctx.arc(x, y, 1.1, 0, Math.PI * 2); ctx.fill();
    }

    // Ghost board image + grid lines
    ctx.save(); ctx.globalAlpha = .1; ctx.drawImage(imgR.current, L.bx, L.by, L.img, L.img); ctx.restore();
    ctx.save(); ctx.strokeStyle = 'rgba(140,120,190,.22)'; ctx.lineWidth = 1;
    for (let r = 0; r <= rows; r++) { ctx.beginPath(); ctx.moveTo(L.bx, L.by + r*ph); ctx.lineTo(L.bx + L.img, L.by + r*ph); ctx.stroke(); }
    for (let c = 0; c <= cols; c++) { ctx.beginPath(); ctx.moveTo(L.bx + c*pw, L.by); ctx.lineTo(L.bx + c*pw, L.by + L.img); ctx.stroke(); }
    ctx.restore();
    ctx.strokeStyle = 'rgba(140,120,190,.38)'; ctx.lineWidth = 1.5; ctx.strokeRect(L.bx, L.by, L.img, L.img);

    // Mobile tray divider
    if (mob) {
      ctx.save();
      ctx.strokeStyle = dark ? 'rgba(200,180,255,.14)' : 'rgba(140,120,190,.18)';
      ctx.lineWidth = 1; ctx.setLineDash([4, 10]);
      ctx.beginPath();
      ctx.moveTo(40, L.by + L.img + 18);
      ctx.lineTo(CW - 40, L.by + L.img + 18);
      ctx.stroke();
      ctx.setLineDash([]); ctx.restore();
    }

    // Draw pieces
    const didx = drag.current?.idx;
    const dp = (p, sh) => {
      if (!imgR.current) return;
      ctx.save();
      if (sh) { ctx.shadowColor = 'rgba(50,40,90,.22)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 6; }
      ctx.translate(p.x, p.y); ctx.clip(p.p2);
      ctx.drawImage(imgR.current, -p.col * p.pw, -p.row * p.ph, L.img, L.img);
      ctx.strokeStyle = p.placed ? 'rgba(255,255,255,.8)' : 'rgba(255,255,255,.45)'; ctx.lineWidth = 1.5; ctx.stroke(p.p2);
      ctx.restore();
    };
    pcs.current.filter(p => p.placed).forEach(p => dp(p));
    pcs.current.filter((p, i) => !p.placed && i !== didx).forEach(p => dp(p));
    if (didx != null) dp(pcs.current[didx], true);
  }, [cols, rows, uiTheme]);

  useEffect(() => {
    if (!loaded) return;
    const loop = () => { draw(); rafR.current = requestAnimationFrame(loop); };
    rafR.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafR.current);
  }, [loaded, draw]);

  const hit = (mx, my) => {
    const ctx = cvs.current?.getContext('2d'); if (!ctx) return -1;
    for (let i = pcs.current.length - 1; i >= 0; i--) {
      const p = pcs.current[i]; if (p.placed) continue;
      ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
      const ok = ctx.isPointInPath(p.p2, mx - p.x, my - p.y);
      ctx.restore(); if (ok) return i;
    }
    return -1;
  };

  const xy = (e) => {
    const r = cvs.current.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return {
      mx: (src.clientX - r.left) * (cvs.current.width  / r.width),
      my: (src.clientY - r.top)  * (cvs.current.height / r.height),
    };
  };

  const onDown = (e) => {
    e.preventDefault();
    const { mx, my } = xy(e);
    const i = hit(mx, my); if (i < 0) return;
    drag.current = { idx: i, ox: mx - pcs.current[i].x, oy: my - pcs.current[i].y };
    cvs.current.classList.add('drag');
    // Touch pickup sound (replaces hover which doesn't exist on touch)
    if (soundEnabled && e.touches) {
      try { playHover(getAudioCtx(audioCtxRef)); } catch (_) {}
    }
  };
  const onMove = (e) => {
    e.preventDefault();
    const { mx, my } = xy(e);
    // Hover sound on desktop (fires when cursor enters a new unplaced piece)
    if (!drag.current && soundEnabled && !e.touches) {
      const i = hit(mx, my);
      if (i !== hoverIdxRef.current) {
        hoverIdxRef.current = i;
        if (i >= 0) { try { playHover(getAudioCtx(audioCtxRef)); } catch (_) {} }
      }
    }
    if (!drag.current) return;
    const p = pcs.current[drag.current.idx];
    p.x = mx - drag.current.ox; p.y = my - drag.current.oy;
  };
  const onUp = () => {
    if (!drag.current) return;
    const p = pcs.current[drag.current.idx];
    const L = layoutRef.current;
    const tx = L.bx + p.col * p.pw, ty = L.by + p.row * p.ph;
    if (Math.hypot(p.x - tx, p.y - ty) < L.snap) {
      p.x = tx; p.y = ty; p.placed = true;
      // Snap sound + haptic
      if (soundEnabled) { try { playSnap(getAudioCtx(audioCtxRef)); } catch (_) {} }
      if (navigator.vibrate) navigator.vibrate(14);
      const n = pcs.current.filter(q => q.placed).length;
      setPlaced(n);
      if (n === total) setTimeout(onComplete, 800);
    }
    drag.current = null; cvs.current?.classList.remove('drag');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: '100%' }}>
      <div className="cvs-wrap" style={{ position: 'relative', width: CW * scale, height: layout.ch * scale, flexShrink: 0 }}>
        <canvas ref={cvs} width={CW} height={layout.ch}
          style={{ transform: `scale(${scale})`, transformOrigin: 'top left', display: 'block' }}
          onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
          onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp} />
        {!loaded && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: uiTheme === 'dark' ? '#12102a' : '#eae4db' }}>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, color: 'var(--muted)', fontStyle: 'italic' }}>
              Preparing your puzzle…
            </span>
          </div>
        )}
      </div>
      <div className="hint">
        {placed < total
          ? `Drag pieces onto the glowing board · ${placed} of ${total} placed`
          : '✦ A moment of stillness, complete'}
      </div>
    </div>
  );
}
