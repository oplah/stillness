import { useRef, useState, useEffect, useCallback } from 'react';
import { illUrl } from './palettes';

const IMG = 400, TAB = 0.26, CW = 920, CH = 520, BX = 260, BY = 60, SNAP = 38;

function genTabs(cols, rows) {
  const h = Array.from({ length: rows },    () => Array.from({ length: cols - 1 }, () => Math.random() > .5 ? 1 : -1));
  const v = Array.from({ length: rows - 1 }, () => Array.from({ length: cols },     () => Math.random() > .5 ? 1 : -1));
  return Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => ({
      top:    r === 0         ? 0 : -v[r-1][c],
      right:  c === cols - 1  ? 0 :  h[r][c],
      bottom: r === rows - 1  ? 0 :  v[r][c],
      left:   c === 0         ? 0 : -h[r][c-1],
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
    { x: m,       y: m,       w: bx - m*2,             h: ch - m*2 },
    { x: bx+bw+m, y: m,       w: cw - bx - bw - m*2,   h: ch - m*2 },
    { x: bx,      y: by+bh+m, w: bw,                   h: ch - by - bh - m*2 },
    { x: bx,      y: m,       w: bw,                   h: by - m*2 },
  ].filter(z => z.w > pw + 10 && z.h > ph + 10);
  if (!zones.length) return { x: m + Math.random() * (cw - pw - m*2), y: m + Math.random() * (ch - ph - m*2) };
  const z = zones[Math.floor(Math.random() * zones.length)];
  return { x: z.x + Math.random() * (z.w - pw), y: z.y + Math.random() * (z.h - ph) };
}

function initPieces(cols, rows) {
  const tabs = genTabs(cols, rows);
  const pw = IMG / cols, ph = IMG / rows;
  const ps = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const s = jigsawPath(pw, ph, tabs[r][c]);
      const { x, y } = scatter(BX, BY, IMG, IMG, CW, CH, pw, ph);
      ps.push({ id: r*cols+c, col: c, row: r, x, y, pw, ph, tabs: tabs[r][c], ps: s, p2: new Path2D(s), placed: false });
    }
  }
  for (let i = ps.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ps[i], ps[j]] = [ps[j], ps[i]];
  }
  return ps;
}

export default function PuzzleCanvas({ svgStr, cols, rows, onComplete }) {
  const cvs = useRef(null), imgR = useRef(null), pcs = useRef([]), drag = useRef(null), rafR = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [placed, setPlaced] = useState(0);
  const total = cols * rows;

  useEffect(() => {
    const im = new Image();
    im.onload = () => { imgR.current = im; pcs.current = initPieces(cols, rows); setLoaded(true); setPlaced(0); };
    im.src = illUrl(svgStr);
  }, [svgStr, cols, rows]);

  const draw = useCallback(() => {
    const el = cvs.current; if (!el || !imgR.current) return;
    const ctx = el.getContext('2d');
    const pw = IMG / cols, ph = IMG / rows;
    ctx.clearRect(0, 0, CW, CH);
    ctx.fillStyle = '#eae4db'; ctx.fillRect(0, 0, CW, CH);

    ctx.fillStyle = 'rgba(150,130,190,.1)';
    for (let x = 22; x < CW; x += 28) for (let y = 22; y < CH; y += 28) {
      ctx.beginPath(); ctx.arc(x, y, 1.1, 0, Math.PI * 2); ctx.fill();
    }

    ctx.save(); ctx.globalAlpha = .1; ctx.drawImage(imgR.current, BX, BY, IMG, IMG); ctx.restore();
    ctx.save(); ctx.strokeStyle = 'rgba(140,120,190,.22)'; ctx.lineWidth = 1;
    for (let r = 0; r <= rows; r++) { ctx.beginPath(); ctx.moveTo(BX, BY + r*ph); ctx.lineTo(BX + IMG, BY + r*ph); ctx.stroke(); }
    for (let c = 0; c <= cols; c++) { ctx.beginPath(); ctx.moveTo(BX + c*pw, BY); ctx.lineTo(BX + c*pw, BY + IMG); ctx.stroke(); }
    ctx.restore();
    ctx.strokeStyle = 'rgba(140,120,190,.38)'; ctx.lineWidth = 1.5; ctx.strokeRect(BX, BY, IMG, IMG);

    const didx = drag.current?.idx;
    const dp = (p, sh) => {
      if (!imgR.current) return;
      ctx.save();
      if (sh) { ctx.shadowColor = 'rgba(50,40,90,.22)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 6; }
      ctx.translate(p.x, p.y); ctx.clip(p.p2);
      ctx.drawImage(imgR.current, -p.col * p.pw, -p.row * p.ph, IMG, IMG);
      ctx.strokeStyle = p.placed ? 'rgba(255,255,255,.8)' : 'rgba(255,255,255,.45)'; ctx.lineWidth = 1.5; ctx.stroke(p.p2);
      ctx.restore();
    };
    pcs.current.filter(p => p.placed).forEach(p => dp(p));
    pcs.current.filter((p, i) => !p.placed && i !== didx).forEach(p => dp(p));
    if (didx != null) dp(pcs.current[didx], true);
  }, [cols, rows]);

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
    return { mx: src.clientX - r.left, my: src.clientY - r.top };
  };

  const onDown = (e) => {
    e.preventDefault();
    const { mx, my } = xy(e);
    const i = hit(mx, my); if (i < 0) return;
    drag.current = { idx: i, ox: mx - pcs.current[i].x, oy: my - pcs.current[i].y };
    cvs.current.classList.add('drag');
  };
  const onMove = (e) => {
    e.preventDefault();
    if (!drag.current) return;
    const { mx, my } = xy(e);
    const p = pcs.current[drag.current.idx];
    p.x = mx - drag.current.ox; p.y = my - drag.current.oy;
  };
  const onUp = () => {
    if (!drag.current) return;
    const p = pcs.current[drag.current.idx];
    const tx = BX + p.col * p.pw, ty = BY + p.row * p.ph;
    if (Math.hypot(p.x - tx, p.y - ty) < SNAP) {
      p.x = tx; p.y = ty; p.placed = true;
      const n = pcs.current.filter(q => q.placed).length;
      setPlaced(n);
      if (n === total) setTimeout(onComplete, 800);
    }
    drag.current = null; cvs.current?.classList.remove('drag');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <div className="cvs-wrap" style={{ position: 'relative' }}>
        <canvas ref={cvs} width={CW} height={CH}
          onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
          onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp} />
        {!loaded && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eae4db' }}>
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
