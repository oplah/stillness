// Star glow positions (in 1024x576 illustration space) [cx, cy, delayS, durS]
const STAR_GLOWS = [
  [352, 160, 0,   3.8],
  [437, 173, 1.2, 4.3],
  [484, 153, 0.5, 3.5],
  [630, 163, 2.0, 4.7],
];

// Water shimmer glints [cx, cy, rx, ry, delayS, durS]
const WATER_GLINTS = [
  [200, 462, 58, 4, 0.4, 4.2],
  [460, 448, 52, 3, 1.9, 3.8],
  [680, 458, 64, 4, 0.8, 4.6],
  [870, 468, 48, 3, 2.6, 3.9],
];

// Duck position — ripples suggest movement in water
const DX = 462, DY = 458;

export default function LandingBg() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Base illustration */}
      <img
        src="/wallpaper.svg"
        alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
      />

      {/* Animated overlay — same coordinate space as the illustration */}
      <svg viewBox="0 0 1024 576" preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>

        {/* Twinkling star glows */}
        {STAR_GLOWS.map(([x, y, delay, dur], i) => (
          <circle key={i} cx={x} cy={y} r={6} fill="#f5e760">
            <animate attributeName="opacity" values="0;0.72;0.1;0.8;0"
              dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite"/>
            <animate attributeName="r" values="4;9;5;10;4"
              dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite"/>
          </circle>
        ))}

        {/* Water shimmer glints */}
        {WATER_GLINTS.map(([x, y, rx, ry, delay, dur], i) => (
          <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} stroke="none">
            <animate attributeName="fill"
              values="rgba(255,255,255,0);rgba(255,255,255,0.2);rgba(255,255,255,0)"
              dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite"/>
          </ellipse>
        ))}

        {/* Expanding ripples around duck — suggests floating movement */}
        {[0, 1.6, 3.2].map((delay, i) => (
          <ellipse key={i} cx={DX} cy={DY} fill="none"
            stroke="rgba(139,194,176,0.55)" strokeWidth="1.2">
            <animate attributeName="rx" values="12;90" dur="4.5s" begin={`${delay}s`} repeatCount="indefinite"
              calcMode="spline" keySplines="0.2 0.1 0.8 0.9"/>
            <animate attributeName="ry" values="4;22" dur="4.5s" begin={`${delay}s`} repeatCount="indefinite"
              calcMode="spline" keySplines="0.2 0.1 0.8 0.9"/>
            <animate attributeName="opacity" values="0.55;0" dur="4.5s" begin={`${delay}s`} repeatCount="indefinite"/>
          </ellipse>
        ))}

        {/* Gentle waves at water surface */}
        <path fill="none" stroke="rgba(255,255,255,0.11)" strokeWidth="1.5">
          <animate attributeName="d"
            values="M 0 432 Q 256 424 512 432 Q 768 440 1024 432;
                    M 0 432 Q 256 440 512 432 Q 768 424 1024 432;
                    M 0 432 Q 256 424 512 432 Q 768 440 1024 432"
            dur="8s" repeatCount="indefinite"/>
        </path>
        <path fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1">
          <animate attributeName="d"
            values="M 0 452 Q 256 445 512 452 Q 768 459 1024 452;
                    M 0 452 Q 256 459 512 452 Q 768 445 1024 452;
                    M 0 452 Q 256 445 512 452 Q 768 459 1024 452"
            dur="6s" begin="1.5s" repeatCount="indefinite"/>
        </path>

      </svg>
    </div>
  );
}
