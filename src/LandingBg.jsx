const BIRDS = [
  { top: '12%', dur: '42s', delay: '0s',  s: 22 },
  { top: '7%',  dur: '54s', delay: '11s', s: 17 },
  { top: '22%', dur: '37s', delay: '23s', s: 20 },
  { top: '6%',  dur: '60s', delay: '6s',  s: 15 },
  { top: '28%', dur: '46s', delay: '32s', s: 24 },
  { top: '17%', dur: '34s', delay: '44s', s: 18 },
  { top: '10%', dur: '50s', delay: '18s', s: 16 },
];

const LEAVES = [
  { x: '22%', y: '62%', size: 18, color: 'rgba(255,200,230,0.5)', delay: '0s',  dur: '8s'  },
  { x: '68%', y: '55%', size: 14, color: 'rgba(200,180,255,0.5)', delay: '3s',  dur: '10s' },
  { x: '44%', y: '70%', size: 16, color: 'rgba(180,220,255,0.45)', delay: '6s', dur: '9s'  },
];

// Stars at deterministic positions
const STARS = [
  [72,28],[210,55],[380,18],[540,42],[720,12],[890,35],[1050,22],[1230,48],[1380,15],
  [140,80],[450,68],[680,88],[900,60],[1160,75],[1340,85],[300,30],[820,18],[1000,44],
];

export default function LandingBg() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="bgsky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#140c38"/>
            <stop offset="30%"  stopColor="#2e1470"/>
            <stop offset="62%"  stopColor="#a03878"/>
            <stop offset="100%" stopColor="#e8804a"/>
          </linearGradient>
          <radialGradient id="bgglow" cx="50%" cy="68%" r="40%">
            <stop offset="0%"   stopColor="#f0904a" stopOpacity=".45"/>
            <stop offset="100%" stopColor="#2e1470" stopOpacity="0"/>
          </radialGradient>
          <linearGradient id="bgfog" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#0a0820" stopOpacity="0"/>
            <stop offset="100%" stopColor="#0a0820" stopOpacity=".75"/>
          </linearGradient>
        </defs>

        {/* Sky */}
        <rect width="1440" height="900" fill="url(#bgsky)"/>
        <rect width="1440" height="900" fill="url(#bgglow)"/>

        {/* Stars */}
        {STARS.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.5 : 1} fill="white" opacity={0.25 + (i % 4) * 0.1}/>
        ))}

        {/* Far mountains — dark purple zigzag */}
        <polygon
          points="0,540 80,430 160,540 240,408 320,540 420,395 520,540 620,415 720,385 820,415 920,540 1020,400 1120,540 1220,410 1320,540 1440,420 1440,900 0,900"
          fill="#200e58"/>

        {/* Mid mountains */}
        <polygon
          points="0,620 140,500 280,620 420,475 560,620 700,468 840,620 980,478 1120,620 1280,490 1440,610 1440,900 0,900"
          fill="#180a40"/>

        {/* Stepped terraces */}
        <rect x="0"   y="655" width="1440" height="28" rx="3" fill="#1a2c5a" opacity=".9"/>
        <rect x="80"  y="632" width="1280" height="24" rx="3" fill="#1c3468" opacity=".85"/>
        <rect x="220" y="610" width="1000" height="22" rx="3" fill="#1a2c60" opacity=".8"/>
        <rect x="360" y="590" width="720"  height="20" rx="3" fill="#182870" opacity=".75"/>

        {/* Foreground dark base */}
        <rect x="0" y="683" width="1440" height="217" fill="#0a0820"/>

        {/* Reflection shimmer lines */}
        <line x1="0" y1="726" x2="1440" y2="726" stroke="#5030a0" strokeWidth="1.2" opacity=".35"/>
        <line x1="0" y1="758" x2="1440" y2="758" stroke="#5030a0" strokeWidth="1"   opacity=".25"/>
        <line x1="0" y1="792" x2="1440" y2="792" stroke="#5030a0" strokeWidth="1"   opacity=".15"/>

        {/* Floating diamonds */}
        <rect x="700"  y="275" width="22" height="22" fill="#f0c860" opacity=".55" transform="rotate(45,711,286)"/>
        <rect x="195"  y="315" width="14" height="14" fill="#d8a8f0" opacity=".5"  transform="rotate(45,202,322)"/>
        <rect x="1205" y="295" width="13" height="13" fill="#f0b870" opacity=".45" transform="rotate(45,1211,301)"/>
        <rect x="490"  y="198" width="10" height="10" fill="#a8c8f0" opacity=".42" transform="rotate(45,495,203)"/>
        <rect x="960"  y="245" width="10" height="10" fill="#f0a0c0" opacity=".4"  transform="rotate(45,965,250)"/>
        <rect x="340"  y="160" width="8"  height="8"  fill="#c0e0f0" opacity=".35" transform="rotate(45,344,164)"/>
        <rect x="1080" y="180" width="8"  height="8"  fill="#e0c0f0" opacity=".32" transform="rotate(45,1084,184)"/>

        {/* Bottom fog overlay */}
        <rect width="1440" height="900" fill="url(#bgfog)"/>
      </svg>

      {/* Animated birds — white */}
      {BIRDS.map((b, i) => (
        <div key={i} style={{
          position: 'absolute', top: b.top, left: 0,
          animation: `landBird ${b.dur} ${b.delay} linear infinite`,
        }}>
          <svg width={b.s} height={b.s * 0.5} viewBox="0 0 28 14">
            <path d="M0 7 Q7 2 14 5 Q21 2 28 7" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
      ))}

      {/* Drifting leaf shapes */}
      {LEAVES.map((l, i) => (
        <div key={i} style={{
          position: 'absolute', left: l.x, top: l.y,
          animation: `leafDrift ${l.dur} ${l.delay} ease-in-out infinite`,
        }}>
          <svg width={l.size} height={l.size} viewBox="0 0 20 20">
            <ellipse cx="10" cy="10" rx="5" ry="9" fill={l.color} transform="rotate(-30,10,10)"/>
          </svg>
        </div>
      ))}
    </div>
  );
}
