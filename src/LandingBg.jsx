import { useEffect, useRef, useState } from 'react';

import n4  from './svgs/nature/Nature-4.svg?url';
import n5  from './svgs/nature/Nature-5.svg?url';
import n6  from './svgs/nature/Nature-6.svg?url';
import a6  from './svgs/animals/Animal-6.svg?url';
import a7  from './svgs/animals/Animal-7.svg?url';
import a8  from './svgs/animals/Animal-8.svg?url';
import ar5 from './svgs/architecture/Architecture-5.svg?url';
import ar6 from './svgs/architecture/Architecture-6.svg?url';

// [src, xVw, yVh, rotateDeg, depth (0=far 1=near), desktopSize, mobileSize | null (hidden on mobile)]
// xVw/yVh = % offset from center. Cards stay in corners/edges to keep text area clear.
const CARDS = [
  [n4,   -44, -28,  -9, 0.90, 210, 130],  // top-left corner — shown on mobile
  [a6,    42, -28,   7, 0.50, 178,  null],  // top-right, far — desktop only
  [ar5,  -48,  14, -13, 0.64, 188,  null],  // left-mid — desktop only
  [a7,    46,  12,   8, 0.82, 198, 130],  // right-mid — shown on mobile
  [n5,   -28, -46,   5, 0.42, 158,  null],  // top-center-left — desktop only
  [ar6,   26, -46,  -6, 0.72, 170,  null],  // top-center-right — desktop only
  [a8,   -44,  40, -10, 0.56, 166, 118],  // bottom-left corner — shown on mobile
  [n6,    42,  40,  11, 0.88, 196, 128],  // bottom-right corner — shown on mobile
];

export default function LandingBg() {
  const refs = useRef([]);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 600);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const target = { x: 0.5, y: 0.5 };
    const curr   = { x: 0.5, y: 0.5 };

    const onMove = (e) => {
      target.x = e.clientX / window.innerWidth;
      target.y = e.clientY / window.innerHeight;
    };

    let rafId;
    const tick = () => {
      curr.x += (target.x - curr.x) * 0.05;
      curr.y += (target.y - curr.y) * 0.05;

      refs.current.forEach((el, i) => {
        if (!el) return;
        const [,,,rot, depth] = CARDS[i];
        const travel = isMobile ? 30 : 60;
        const px = (curr.x - 0.5) * depth * travel;
        const py = (curr.y - 0.5) * depth * travel;
        const scale = 0.80 + depth * 0.20;
        el.style.transform = `translate(calc(-50% + ${px.toFixed(2)}px), calc(-50% + ${py.toFixed(2)}px)) rotate(${rot}deg) scale(${scale})`;
      });

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {CARDS.map(([src, xVw, yVh, rot, depth, desktopSize, mobileSize], i) => {
        const hidden = isMobile && mobileSize === null;
        if (hidden) return null;

        const size    = isMobile ? mobileSize : desktopSize;
        const blur    = Math.max(0, (0.88 - depth) * 4.5);
        const opacity = 0.60 + depth * 0.40;
        const scale   = 0.80 + depth * 0.20;
        const shadow  = `0 ${Math.round(6 + depth * 20)}px ${Math.round(20 + depth * 40)}px rgba(60,50,100,${(0.05 + depth * 0.11).toFixed(2)})`;

        return (
          <div
            key={i}
            ref={el => (refs.current[i] = el)}
            style={{
              position: 'absolute',
              left: `calc(50% + ${xVw}vw)`,
              top:  `calc(50% + ${yVh}vh)`,
              width: size, height: size,
              borderRadius: 18,
              overflow: 'hidden',
              zIndex: Math.round(depth * 9),
              boxShadow: shadow,
              filter: blur > 0 ? `blur(${blur.toFixed(1)}px)` : 'none',
              opacity,
              transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${scale})`,
              willChange: 'transform',
            }}
          >
            <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        );
      })}
    </div>
  );
}
