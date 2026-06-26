import { useEffect, useRef } from 'react';

import n4  from './svgs/nature/Nature-4.svg?url';
import n5  from './svgs/nature/Nature-5.svg?url';
import n6  from './svgs/nature/Nature-6.svg?url';
import a6  from './svgs/animals/Animal-6.svg?url';
import a7  from './svgs/animals/Animal-7.svg?url';
import a8  from './svgs/animals/Animal-8.svg?url';
import ar5 from './svgs/architecture/Architecture-5.svg?url';
import ar6 from './svgs/architecture/Architecture-6.svg?url';

// [src, xVw (% from center), yVh (% from center), rotateDeg, depth (0=far 1=near), sizePx]
// Cards are placed in the corners/edges, leaving the central content area clear
const CARDS = [
  [n4,  -44, -24,  -9, 0.90, 218],  // top-left, near
  [a6,   40, -26,   7, 0.50, 180],  // top-right, far
  [ar5, -46,  12, -13, 0.64, 192],  // left-mid
  [a7,   42,  10,   8, 0.82, 202],  // right-mid, near
  [n5,  -30, -44,   5, 0.42, 162],  // top-center-left, far (above content)
  [ar6,  28, -44,  -6, 0.72, 175],  // top-center-right (above content)
  [a8,  -32,  40, -10, 0.56, 170],  // bottom-left
  [n6,   30,  40,  11, 0.88, 200],  // bottom-right, near
];

export default function LandingBg() {
  const refs = useRef([]);

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
        const px = (curr.x - 0.5) * depth * 60;
        const py = (curr.y - 0.5) * depth * 60;
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
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {CARDS.map(([src, xVw, yVh, rot, depth, size], i) => {
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
              borderRadius: 22,
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
