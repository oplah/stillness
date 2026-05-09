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

// Lotus helper — ellipse petals arranged radially
function Petals({ count, dist, rx, ry, offset = 0, colors }) {
  return Array.from({ length: count }, (_, i) => {
    const angle = i * (360 / count) + offset;
    const rad   = angle * Math.PI / 180;
    const cx    = Math.sin(rad) * dist;
    const cy    = -Math.cos(rad) * dist;
    return (
      <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry}
        fill={colors[i % colors.length]}
        transform={`rotate(${angle},${cx},${cy})`}
        opacity={0.9} />
    );
  });
}

export default function LandingBg() {
  const LX = 720, LY = 548; // lotus centre

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
            <stop offset="16%"  stopColor="#eac4cc" stopOpacity="0.82"/>
            <stop offset="100%" stopColor="#f6e0e6" stopOpacity="0.97"/>
          </linearGradient>
        </defs>

        {/* ── Sky ── */}
        <rect width="1440" height="900" fill="url(#ldSky)"/>

        {/* ── Twinkling diamond stars (SMIL animate, no CSS needed) ── */}
        {STARS.map(([x, y, s, c, delay, dur], i) => (
          <g key={i} transform={`translate(${x},${y}) rotate(45)`}>
            <rect x={-s/2} y={-s/2} width={s} height={s} fill={c} opacity="0.08">
              <animate attributeName="opacity"
                values="0.08;0.88;0.08"
                dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite"/>
            </rect>
          </g>
        ))}

        {/* ── Left mountains (back → front, lighter → darker) ── */}
        <polygon points="0,492 128,322 295,492"    fill="#4c2250" opacity="0.95"/>
        <polygon points="75,492 262,365 448,492"   fill="#3c1842" opacity="0.98"/>
        <polygon points="-15,492 38,442 132,492"   fill="#2e1034" opacity="1"/>

        {/* ── Right mountains (mirrored) ── */}
        <polygon points="1440,492 1312,322 1145,492" fill="#4c2250" opacity="0.95"/>
        <polygon points="1365,492 1178,365 992,492"  fill="#3c1842" opacity="0.98"/>
        <polygon points="1455,492 1402,442 1308,492" fill="#2e1034" opacity="1"/>

        {/* ── Water surface ── */}
        <rect x="0" y="478" width="1440" height="422" fill="url(#ldWater)"/>

        {/* ── Ripples ── */}
        <ellipse cx={LX} cy={LY+22} rx={108} ry={22}
          fill="none" stroke="rgba(198,152,170,0.55)" strokeWidth="1.5"/>
        <ellipse cx={LX} cy={LY+22} rx={180} ry={37}
          fill="none" stroke="rgba(198,152,170,0.38)" strokeWidth="1.2"/>
        <ellipse cx={LX} cy={LY+22} rx={270} ry={56}
          fill="none" stroke="rgba(198,152,170,0.22)" strokeWidth="1"/>

        {/* ── Lotus ── */}
        <g transform={`translate(${LX},${LY})`}>
          {/* Outer ring — 8 petals */}
          <Petals count={8} dist={34} rx={11} ry={21}
            colors={['#e8b8c2','#d898b0']} />
          {/* Inner ring — 6 petals, offset 22.5° */}
          <Petals count={6} dist={17} rx={7} ry={14} offset={22.5}
            colors={['#ecc8d4']} />
          {/* Centre */}
          <circle r={11} fill="#e8c838" opacity={0.92}/>
          <circle r={6.5} fill="#f8dc44" opacity={0.88}/>
        </g>

      </svg>
    </div>
  );
}
