import { useEffect, useRef, useState } from 'react';

import n1  from './svgs/nature/Nature-1.svg?url';
import n2  from './svgs/nature/Nature-2.svg?url';
import n3  from './svgs/nature/Nature-3.svg?url';
import n4  from './svgs/nature/Nature-4.svg?url';
import n5  from './svgs/nature/Nature-5.svg?url';
import n6  from './svgs/nature/Nature-6.svg?url';
import a1  from './svgs/animals/Animal-1.svg?url';
import a2  from './svgs/animals/Animal-2.svg?url';
import a3  from './svgs/animals/Animal-3.svg?url';
import a4  from './svgs/animals/Animal-4.svg?url';
import a5  from './svgs/animals/Animal-5.svg?url';
import a6  from './svgs/animals/Animal-6.svg?url';
import a7  from './svgs/animals/Animal-7.svg?url';
import a8  from './svgs/animals/Animal-8.svg?url';
import ar2 from './svgs/architecture/Architecture-2.svg?url';
import ar4 from './svgs/architecture/Architecture-4.svg?url';
import ar5 from './svgs/architecture/Architecture-5.svg?url';
import ar6 from './svgs/architecture/Architecture-6.svg?url';
import ar7 from './svgs/architecture/Architecture-7.svg?url';
import ar8 from './svgs/architecture/Architecture-8.svg?url';
import n7  from './svgs/nature/Nature-7.svg?url';
import n8  from './svgs/nature/Nature-8.svg?url';
import n9  from './svgs/nature/Nature-9.svg?url';
import a9  from './svgs/animals/Animal-9.svg?url';
import a10 from './svgs/animals/Animal-10.svg?url';
import a11 from './svgs/animals/Animal-11.svg?url';

// [src, xVw, yVh, rotateDeg, depth, desktopSize, tabletSize, mobileSize]
// null = hidden at that breakpoint
const CARDS = [
  [n4,   -44, -28,  -9, 0.90, 210, 140, 120],  // top-left corner — all
  [a6,    42, -28,   7, 0.50, 178, 130, 110],  // top-right corner — all
  [ar5,  -32,  10, -13, 0.64, 188, null, null], // left-mid — desktop only
  [a7,    32,  10,   8, 0.82, 198, null, null], // right-mid — desktop only
  [n5,   -28, -46,   5, 0.42, 158, 130, 100],  // top-center-left — all (fills mobile top gap)
  [ar6,   26, -46,  -6, 0.72, 170, 130, 100],  // top-center-right — all (fills mobile top gap)
  [a8,   -44,  40, -10, 0.56, 166, 130, 118],  // bottom-left corner — all
  [n6,    42,  40,  11, 0.88, 196, 140, 128],  // bottom-right corner — all
  [ar2,  -36, -36,  11, 0.75, 186, null, null], // upper-left zone — desktop only
  [ar4,   36, -36,  -7, 0.35, 152, null, null], // upper-right zone — desktop only
  [a2,   -32,  28, -14, 0.82, 194, null, null], // left lower — desktop only
  [a4,    36, -42,  12, 0.44, 158, null, null], // top-right high — desktop only
  [n1,   -14,  46,   7, 0.60, 170, 130, null], // bottom center-left — desktop+tablet
  [n3,    16,  46,  -9, 0.50, 162, 130, null], // bottom center-right — desktop+tablet
  // desktop top-center fill (red box gap above logo)
  [a5,   -10, -40,   6, 0.65, 162, null, null], // top center-left — desktop only
  [n2,     8, -40,  -8, 0.48, 148, null, null], // top center-right — desktop only
  // mobile bottom fill (red box gap between CTA and bottom cards)
  [a1,   -18,  30,   8, 0.72, null, null, 108], // mobile bottom center-left
  [a3,    14,  30,  -7, 0.55, null, null, 102], // mobile bottom center-right
  // new illustrations — desktop only
  [n7,   -50,   2,  10, 0.45, 168, null, null],
  [n8,    48,  20,  -8, 0.60, 172, null, null],
  [n9,   -18,  54,   5, 0.55, 158, null, null],
  [a9,    20,  54,  -6, 0.68, 164, null, null],
  [a10,  -48, -14,  12, 0.38, 150, null, null],
  [a11,   46, -14,  -9, 0.72, 174, null, null],
  [ar7,  -40,  52,   8, 0.50, 160, null, null],
  [ar8,   38,  52, -11, 0.42, 154, null, null],
];

export default function LandingBg() {
  const refs = useRef([]);
  const [bp, setBp] = useState(() => {
    const w = window.innerWidth;
    return w < 600 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop';
  });

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setBp(w < 600 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop');
    };
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

    const travel = bp === 'mobile' ? 20 : bp === 'tablet' ? 35 : 60;

    let rafId;
    const tick = () => {
      curr.x += (target.x - curr.x) * 0.05;
      curr.y += (target.y - curr.y) * 0.05;

      refs.current.forEach((el, i) => {
        if (!el) return;
        const [,,,rot, depth] = CARDS[i];
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
  }, [bp]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {CARDS.map(([src, xVw, yVh, rot, depth, desktopSize, tabletSize, mobileSize], i) => {
        const size = bp === 'mobile' ? mobileSize : bp === 'tablet' ? tabletSize : desktopSize;
        if (size === null) return null;

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
