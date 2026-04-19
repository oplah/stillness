const BIRDS = [
  { top: '14%', dur: '40s', delay: '0s',  color: '#b0a0cc', s: 22 },
  { top: '9%',  dur: '52s', delay: '11s', color: '#9ab0c0', s: 17 },
  { top: '24%', dur: '36s', delay: '21s', color: '#b8a4be', s: 20 },
  { top: '7%',  dur: '58s', delay: '6s',  color: '#a0b0c8', s: 15 },
  { top: '30%', dur: '44s', delay: '30s', color: '#a8bca8', s: 24 },
  { top: '19%', dur: '33s', delay: '42s', color: '#b4accc', s: 18 },
  { top: '12%', dur: '48s', delay: '16s', color: '#a8b4c4', s: 16 },
];

const LEAVES = [
  { x: '22%', y: '65%', size: 18, color: '#a8b898', delay: '0s',  dur: '8s'  },
  { x: '68%', y: '58%', size: 14, color: '#c0a8c0', delay: '3s',  dur: '10s' },
  { x: '44%', y: '72%', size: 16, color: '#b0c0a8', delay: '6s',  dur: '9s'  },
];

export default function LandingBg() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.5 }}>
        <defs>
          <linearGradient id="bgmist" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="100%" stopColor="#fff" stopOpacity=".55" />
          </linearGradient>
        </defs>
        {/* far misty peaks */}
        <polygon points="0,680 180,430 360,680" fill="#c0b4d8" opacity=".22" />
        <polygon points="250,700 500,400 750,700" fill="#b4c4d4" opacity=".18" />
        <polygon points="620,690 900,420 1180,690" fill="#bab0d0" opacity=".2" />
        <polygon points="1050,700 1280,460 1440,700" fill="#b0b8cc" opacity=".17" />
        {/* mid layer terraces */}
        <rect x="0"   y="705" width="520" height="24" rx="4" fill="#a8b8a0" opacity=".2" />
        <rect x="80"  y="682" width="400" height="24" rx="4" fill="#b0bca8" opacity=".16" />
        <rect x="140" y="658" width="320" height="24" rx="4" fill="#a8b8a0" opacity=".14" />
        <rect x="880" y="710" width="560" height="24" rx="4" fill="#c0b0b8" opacity=".18" />
        <rect x="940" y="686" width="440" height="24" rx="4" fill="#c8b8bc" opacity=".14" />
        {/* geometric trees left */}
        <g opacity=".18">
          <rect x="128" y="630" width="9" height="72" fill="#7a8c70" />
          <ellipse cx="132" cy="624" rx="24" ry="32" fill="#8a9c80" />
          <ellipse cx="132" cy="604" rx="16" ry="22" fill="#96a88c" />
          <rect x="260" y="648" width="7" height="58" fill="#7a8c70" />
          <ellipse cx="263" cy="643" rx="18" ry="25" fill="#8a9c80" />
          <rect x="52"  y="654" width="6" height="52" fill="#7a8c70" />
          <ellipse cx="55"  cy="649" rx="14" ry="20" fill="#8a9c80" />
        </g>
        {/* geometric trees right */}
        <g opacity=".16">
          <rect x="1280" y="640" width="8" height="66" fill="#8a8c7a" />
          <ellipse cx="1284" cy="635" rx="20" ry="28" fill="#9a9c8a" />
          <rect x="1360" y="650" width="7" height="56" fill="#8a8c7a" />
          <ellipse cx="1363" cy="646" rx="16" ry="22" fill="#9a9c8a" />
        </g>
        {/* lotus details */}
        <g opacity=".2">
          <ellipse cx="380"  cy="726" rx="30" ry="10" fill="#8aaa8a" />
          <ellipse cx="380"  cy="720" rx="8"  ry="12" fill="#f0c0cc" />
          <ellipse cx="370"  cy="723" rx="7"  ry="10" fill="#f4ccd4" />
          <ellipse cx="390"  cy="723" rx="7"  ry="10" fill="#f4ccd4" />
          <ellipse cx="1080" cy="730" rx="28" ry="9"  fill="#8aaa8a" />
          <ellipse cx="1080" cy="724" rx="7"  ry="11" fill="#f0c0cc" />
        </g>
        {/* misty ground */}
        <ellipse cx="720" cy="760" rx="700" ry="70" fill="white" opacity=".22" />
        <rect width="1440" height="900" fill="url(#bgmist)" opacity=".3" />
        {/* floating diamonds */}
        <rect x="80"   y="200" width="14" height="14" fill="#c0b0d8" opacity=".28" transform="rotate(45,87,207)" />
        <rect x="1340" y="280" width="12" height="12" fill="#b0c0d0" opacity=".24" transform="rotate(45,1346,286)" />
        <rect x="440"  y="150" width="10" height="10" fill="#d0b8c0" opacity=".22" transform="rotate(45,445,155)" />
        <rect x="980"  y="170" width="11" height="11" fill="#b8c8d8" opacity=".2"  transform="rotate(45,985,175)" />
      </svg>

      {BIRDS.map((b, i) => (
        <div key={i} style={{
          position: 'absolute', top: b.top, left: 0,
          animation: `landBird ${b.dur} ${b.delay} linear infinite`,
        }}>
          <svg width={b.s} height={b.s * 0.5} viewBox="0 0 28 14">
            <path d="M0 7 Q7 2 14 5 Q21 2 28 7" stroke={b.color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      ))}

      {LEAVES.map((l, i) => (
        <div key={i} style={{
          position: 'absolute', left: l.x, top: l.y,
          animation: `leafDrift ${l.dur} ${l.delay} ease-in-out infinite`,
          opacity: 0.28,
        }}>
          <svg width={l.size} height={l.size} viewBox="0 0 20 20">
            <ellipse cx="10" cy="10" rx="5" ry="9" fill={l.color} transform="rotate(-30,10,10)" />
          </svg>
        </div>
      ))}
    </div>
  );
}
