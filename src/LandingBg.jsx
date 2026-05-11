// Deterministic star positions: [x, y, size, color, delayS, durS]
const STARS = [
  [188, 72,  13, '#d4b870', 0,   3.8],
  [435, 44,  9,  '#f0daa0', 1.2, 4.2],
  [698, 24,  15, '#d4b870', 0.4, 3.5],
  [978, 51,  10, '#f0daa0', 2.1, 4.8],
  [1240,35,  12, '#d4b870', 1.7, 3.2],
  [314, 132, 8,  '#f0daa0', 2.8, 5.1],
  [558, 158, 8,  '#d4b870', 0.9, 4.0],
  [850, 126, 9,  '#f0daa0', 3.3, 3.7],
  [1100,155, 8,  '#d4b870', 1.5, 4.5],
  [1356,96,  10, '#f0daa0', 2.4, 3.9],
  [140, 192, 7,  '#d4b870', 4.0, 5.5],
  [1300,215, 7,  '#f0daa0', 3.8, 4.7],
];

// Shimmer glints on the water surface: [x, y, rx, ry, delayS, durS]
const GLINTS = [
  [175,  548, 92, 6,  0,   3.8],
  [475,  568, 72, 5,  1.2, 4.2],
  [955,  552, 80, 5,  2.0, 4.5],
  [1255, 542, 68, 5,  1.4, 3.8],
  [340,  618, 62, 4,  2.8, 5.0],
  [1010, 625, 68, 4,  3.5, 4.3],
];

// Crown-style lotus — all petals emerge upward from a single base point.
// Each petal is a pointed teardrop path rotated to its angle.
// path = wide-based teardrop pointing straight up from origin
const PETAL_CONFIGS = [
  // [angleDeg, pathW, pathH, fill, opacity]  — symmetric pairs + centre
  [ 80, 10, 30, '#bf7898', 0.80], [-80, 10, 30, '#bf7898', 0.80],
  [ 56, 11, 36, '#d090aa', 0.86], [-56, 11, 36, '#d090aa', 0.86],
  [ 30, 12, 43, '#dda8bc', 0.90], [-30, 12, 43, '#dda8bc', 0.90],
  [  0, 13, 48, '#eabccc', 0.94],
];
function Lotus() {
  return (
    <>
      {PETAL_CONFIGS.map(([angle, w, h, fill, op], i) => {
        const d = `M 0,5 C -${w},-2 -${w*.85},-${h*.55} 0,-${h} C ${w*.85},-${h*.55} ${w},-2 0,5 Z`;
        return (
          <path key={i} d={d} fill={fill} opacity={op}
            transform={`rotate(${angle})`} />
        );
      })}
    </>
  );
}

export default function LandingBg() {
  const LX = 720, LY = 660; // lotus moved lower so it sits below the CTA

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="ldSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#1e0828"/>
            <stop offset="20%"  stopColor="#5a2258"/>
            <stop offset="50%"  stopColor="#9a5074"/>
            <stop offset="78%"  stopColor="#c78898"/>
            <stop offset="100%" stopColor="#deb4bc"/>
          </linearGradient>
          <linearGradient id="ldWater" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#deb4bc" stopOpacity="0"/>
            <stop offset="14%"  stopColor="#eac4cc" stopOpacity="0.82"/>
            <stop offset="100%" stopColor="#f6e0e6" stopOpacity="0.97"/>
          </linearGradient>
        </defs>

        {/* ── Sky ── */}
        <rect width="1440" height="900" fill="url(#ldSky)"/>

        {/* ── Twinkling diamond stars ── */}
        {STARS.map(([x, y, s, c, delay, dur], i) => (
          <g key={i} transform={`translate(${x},${y}) rotate(45)`}>
            <rect x={-s/2} y={-s/2} width={s} height={s} fill={c} opacity="0.08">
              <animate attributeName="opacity"
                values="0.08;0.88;0.08"
                dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite"/>
            </rect>
          </g>
        ))}

        {/* ── Left mountains (back → front) ── */}
        <polygon points="0,492 128,322 295,492"    fill="#4c2250" opacity="0.95"/>
        <polygon points="75,492 262,365 448,492"   fill="#3c1842" opacity="0.98"/>
        <polygon points="-15,492 38,442 132,492"   fill="#2e1034" opacity="1"/>

        {/* ── Right mountains ── */}
        <polygon points="1440,492 1312,322 1145,492" fill="#4c2250" opacity="0.95"/>
        <polygon points="1365,492 1178,365 992,492"  fill="#3c1842" opacity="0.98"/>
        <polygon points="1455,492 1402,442 1308,492" fill="#2e1034" opacity="1"/>

        {/* ── Water surface ── */}
        <rect x="0" y="478" width="1440" height="422" fill="url(#ldWater)"/>

        {/* ── Gentle wave lines at the horizon ── */}
        <path fill="none" stroke="rgba(255,232,240,0.14)" strokeWidth="1.5">
          <animate attributeName="d"
            values="M 0 505 Q 360 494 720 505 Q 1080 516 1440 505;
                    M 0 505 Q 360 516 720 505 Q 1080 494 1440 505;
                    M 0 505 Q 360 494 720 505 Q 1080 516 1440 505"
            dur="7s" repeatCount="indefinite"/>
        </path>
        <path fill="none" stroke="rgba(255,232,240,0.09)" strokeWidth="1">
          <animate attributeName="d"
            values="M 0 524 Q 360 514 720 524 Q 1080 534 1440 524;
                    M 0 524 Q 360 534 720 524 Q 1080 514 1440 524;
                    M 0 524 Q 360 514 720 524 Q 1080 534 1440 524"
            dur="9s" begin="1.5s" repeatCount="indefinite"/>
        </path>

        {/* ── Shimmer glints on water ── */}
        {GLINTS.map(([x, y, rx, ry, delay, dur], i) => (
          <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry}
            fill="rgba(255,238,244,0)" stroke="none">
            <animate attributeName="fill"
              values="rgba(255,238,244,0);rgba(255,238,244,0.22);rgba(255,238,244,0)"
              dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite"/>
          </ellipse>
        ))}

        {/* ── Expanding pond ripples (staggered, loop continuously) ── */}
        {[0, 1.67, 3.33].map((delay, i) => (
          <ellipse key={i} cx={LX} cy={LY + 18}
            fill="none" stroke="rgba(198,152,170,0.65)" strokeWidth="1.3">
            <animate attributeName="rx" values="18;340"
              dur="5s" begin={`${delay}s`} repeatCount="indefinite"
              calcMode="spline" keySplines="0.25 0.1 0.75 0.9"/>
            <animate attributeName="ry" values="5;68"
              dur="5s" begin={`${delay}s`} repeatCount="indefinite"
              calcMode="spline" keySplines="0.25 0.1 0.75 0.9"/>
            <animate attributeName="opacity" values="0.65;0"
              dur="5s" begin={`${delay}s`} repeatCount="indefinite"/>
          </ellipse>
        ))}

        {/* ── Lotus (crown style) ── */}
        <g transform={`translate(${LX},${LY})`}>
          <Lotus />
        </g>

      </svg>
    </div>
  );
}
