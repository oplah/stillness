const uid = () => Math.random().toString(36).slice(2, 7);

// ── Procedural palette generators ──────────────────────────────────────────
// Each call returns a fresh, unique set of harmonious colours for the theme.

const r = (min, max) => min + Math.random() * (max - min);
const hsl = (h, s, l) =>
  `hsl(${Math.round(((h % 360) + 360) % 360)},${Math.round(Math.min(88, Math.max(20, s)))}%,${Math.round(Math.min(88, Math.max(25, l)))}%)`;

// Nature: [sky1,sky2,sky3, terrace1,terrace2, rose1,rose2, tree1,tree2, accent]
function genNaturePal() {
  const skyMoods = [
    { h: r(200,240), s: r(38,58), l: r(72,82) }, // cool blue
    { h: r(250,290), s: r(28,48), l: r(75,85) }, // purple
    { h: r(20, 46),  s: r(55,70), l: r(75,85) }, // warm dawn
    { h: r(175,200), s: r(38,54), l: r(74,83) }, // teal
    { h: r(330,358), s: r(28,48), l: r(80,88) }, // rose
  ];
  const sky = skyMoods[Math.floor(Math.random() * skyMoods.length)];
  const terH = r(95, 155);
  const roseH = r(0, 35);
  const treeH = r(105, 152);
  const accH = sky.h + 150 + r(-25, 25);
  return [
    hsl(sky.h,        sky.s,        sky.l),
    hsl(sky.h + 12,   sky.s - 8,    sky.l - 6),
    hsl(sky.h - 8,    sky.s - 18,   sky.l + 7),
    hsl(terH,         r(38, 55),    r(50, 65)),
    hsl(terH + 12,    r(42, 58),    r(56, 70)),
    hsl(roseH,        r(48, 65),    r(62, 76)),
    hsl(roseH + 12,   r(42, 58),    r(68, 80)),
    hsl(treeH,        r(48, 65),    r(28, 42)),
    hsl(treeH + 10,   r(42, 58),    r(35, 50)),
    hsl(accH,         r(52, 68),    r(62, 75)),
  ];
}

// Animals: [sky1,sky2,sky3, water1,water2, crane, lotus, pad, tree, mist]
function genAnimalsPal() {
  const skyH = r(170, 290);
  const waterH = skyH + r(-15, 15);
  const lotusH = r(310, 370);
  const padH   = r(100, 155);
  const treeH  = r(95,  165);
  return [
    hsl(skyH,          r(30, 52), r(72, 84)),
    hsl(skyH + 14,     r(24, 44), r(68, 80)),
    hsl(skyH - 10,     r(14, 28), r(82, 92)),
    hsl(waterH,        r(35, 55), r(62, 76)),
    hsl(waterH + 12,   r(30, 50), r(55, 68)),
    hsl(0, 0, r(92, 98)),                         // crane — near-white
    hsl(lotusH % 360,  r(42, 58), r(70, 82)),
    hsl(padH,          r(38, 54), r(60, 72)),
    hsl(treeH,         r(35, 52), r(38, 55)),
    '#fff',
  ];
}

// Things/Architecture: [sky1,sky2,sky3, tw1a,tw1b, tw2a,tw2b, bridge, d1, d2]
function genThingsPal() {
  const skyH  = r(0, 360);
  const tw1H  = r(0, 360);
  const tw2H  = tw1H + r(100, 200);
  const bridH = r(25, 55);
  return [
    hsl(skyH,         r(22, 48), r(74, 86)),
    hsl(skyH + 16,    r(18, 38), r(70, 82)),
    hsl(skyH - 12,    r(12, 26), r(80, 90)),
    hsl(tw1H,         r(45, 62), r(55, 68)),
    hsl(tw1H + 14,    r(40, 58), r(48, 62)),
    hsl(tw2H,         r(45, 62), r(55, 68)),
    hsl(tw2H + 14,    r(40, 58), r(48, 62)),
    hsl(bridH,        r(28, 48), r(66, 78)),
    hsl(skyH + 120,   r(40, 58), r(62, 75)),
    hsl(skyH + 210,   r(35, 55), r(58, 72)),
  ];
}

const PAL_GENS = { nature: genNaturePal, animals: genAnimalsPal, things: genThingsPal };

// ── SVG generators ──────────────────────────────────────────────────────────

export const makeNature = (p, id) => {
  const [s1,s2,s3,t1,t2,r1,r2,tr1,tr2,acc] = p;
  return `<svg viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${s1}"/><stop offset="55%" stop-color="${s2}"/><stop offset="100%" stop-color="${s3}"/></linearGradient>
<linearGradient id="ms${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fff" stop-opacity="0"/><stop offset="100%" stop-color="#fff" stop-opacity=".52"/></linearGradient>
</defs>
<rect width="480" height="480" fill="url(#sk${id})"/>
<polygon points="0,320 72,200 144,320" fill="${s1}" opacity=".45"/>
<polygon points="100,330 220,178 340,330" fill="${s2}" opacity=".38"/>
<polygon points="280,318 400,208 480,318" fill="${s1}" opacity=".42"/>
<rect x="60" y="310" width="360" height="22" rx="2" fill="${t1}"/>
<rect x="80" y="288" width="320" height="22" rx="2" fill="${t2}"/>
<rect x="108" y="266" width="264" height="22" rx="2" fill="${t1}" opacity=".9"/>
<rect x="132" y="244" width="216" height="22" rx="2" fill="${t2}" opacity=".85"/>
<rect x="156" y="222" width="168" height="22" rx="2" fill="${t1}" opacity=".8"/>
<rect x="60" y="310" width="22" height="110" fill="${t2}" opacity=".8"/>
<rect x="80" y="288" width="22" height="44" fill="${t1}" opacity=".8"/>
<rect x="398" y="310" width="22" height="110" fill="${t2}" opacity=".8"/>
<rect x="378" y="288" width="22" height="44" fill="${t1}" opacity=".8"/>
<rect x="40" y="374" width="400" height="26" rx="2" fill="${r1}"/>
<rect x="22" y="374" width="20" height="80" fill="${r2}"/>
<rect x="438" y="374" width="20" height="80" fill="${r2}"/>
<rect x="0" y="400" width="480" height="80" fill="${r1}"/>
<rect x="226" y="200" width="14" height="44" fill="#7a6c5a"/>
<ellipse cx="233" cy="196" rx="32" ry="22" fill="${tr1}"/>
<ellipse cx="233" cy="177" rx="23" ry="16" fill="${tr2}"/>
<ellipse cx="233" cy="161" rx="14" ry="11" fill="${tr2}" opacity=".9"/>
<path d="M204 380 Q216 360 220 340 Q226 310 233 225" stroke="#f0e0d0" stroke-width="3" stroke-dasharray="6 5" fill="none" opacity=".6"/>
<g opacity=".55">
<rect x="50" y="188" width="13" height="13" fill="${acc}" transform="rotate(45,56,194)"/>
<rect x="384" y="228" width="11" height="11" fill="${acc}" transform="rotate(45,389,233)"/>
<rect x="148" y="136" width="9" height="9" fill="${acc}" transform="rotate(45,152,140)"/>
<rect x="310" y="152" width="8" height="8" fill="${acc}" transform="rotate(45,314,156)"/>
</g>
<ellipse cx="80" cy="270" rx="70" ry="18" fill="white" opacity=".28"/>
<ellipse cx="400" cy="306" rx="75" ry="16" fill="white" opacity=".22"/>
<ellipse cx="240" cy="372" rx="130" ry="22" fill="white" opacity=".18"/>
<rect width="480" height="480" fill="url(#ms${id})" opacity=".32"/>
</svg>`;
};

export const makeAnimals = (p, id) => {
  const [s1,s2,s3,w1,w2,crane,lotus,pad,tree] = p;
  return `<svg viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${s1}"/><stop offset="50%" stop-color="${s2}"/><stop offset="100%" stop-color="${s3}"/></linearGradient>
<linearGradient id="wt${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${w1}"/><stop offset="100%" stop-color="${w2}"/></linearGradient>
<linearGradient id="ms${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fff" stop-opacity="0"/><stop offset="100%" stop-color="#fff" stop-opacity=".5"/></linearGradient>
</defs>
<rect width="480" height="480" fill="url(#sk${id})"/>
<rect x="0" y="295" width="480" height="185" fill="url(#wt${id})" opacity=".8"/>
<rect x="0" y="290" width="480" height="8" fill="${w2}" opacity=".5"/>
<line x1="0" y1="316" x2="480" y2="316" stroke="white" stroke-width="1.2" opacity=".35"/>
<line x1="0" y1="340" x2="480" y2="340" stroke="white" stroke-width="1" opacity=".24"/>
<line x1="0" y1="365" x2="480" y2="365" stroke="white" stroke-width="1" opacity=".17"/>
<g opacity=".32" fill="${tree}">
<rect x="28" y="235" width="7" height="58"/><ellipse cx="31" cy="230" rx="17" ry="22"/>
<rect x="60" y="244" width="6" height="48"/><ellipse cx="63" cy="240" rx="12" ry="16"/>
<rect x="400" y="238" width="7" height="55"/><ellipse cx="403" cy="233" rx="16" ry="20"/>
<rect x="432" y="246" width="6" height="46"/><ellipse cx="435" cy="242" rx="11" ry="15"/>
</g>
<rect x="198" y="280" width="84" height="14" rx="7" fill="#c0b0a0"/>
<ellipse cx="110" cy="316" rx="38" ry="13" fill="${pad}" opacity=".78"/>
<ellipse cx="348" cy="330" rx="30" ry="11" fill="${pad}" opacity=".7"/>
<ellipse cx="228" cy="360" rx="44" ry="14" fill="${pad}" opacity=".72"/>
<ellipse cx="72" cy="380" rx="24" ry="9" fill="${pad}" opacity=".6"/>
<g transform="translate(110,310)">
<ellipse cx="0" cy="-10" rx="9" ry="13" fill="${lotus}" opacity=".9"/>
<ellipse cx="8" cy="-5" rx="8" ry="11" fill="${lotus}" opacity=".82"/>
<ellipse cx="-8" cy="-5" rx="8" ry="11" fill="${lotus}" opacity=".82"/>
<ellipse cx="0" cy="-12" rx="5" ry="8" fill="${lotus}" opacity=".95"/>
<ellipse cx="0" cy="-8" rx="3" ry="3" fill="#f0d080" opacity=".8"/>
</g>
<g transform="translate(240,195)">
<ellipse cx="0" cy="0" rx="20" ry="34" fill="${crane}" transform="rotate(-8)"/>
<polygon points="0,-32 7,-68 -3,-70 -7,-32" fill="${crane}"/>
<ellipse cx="3" cy="-74" rx="9" ry="8" fill="${crane}"/>
<ellipse cx="3" cy="-82" rx="5" ry="4" fill="#d44848"/>
<line x1="3" y1="-70" x2="20" y2="-74" stroke="#d4a040" stroke-width="4" stroke-linecap="round"/>
<polygon points="-20,-5 -68,18 -55,-8 -20,-22" fill="${crane}" opacity=".95"/>
<polygon points="20,-5 64,22 52,-6 20,-22" fill="${crane}" opacity=".9"/>
<polygon points="-55,-8 -68,18 -50,16 -46,-4" fill="#282838" opacity=".75"/>
<polygon points="52,-6 64,22 48,20 44,-2" fill="#282838" opacity=".65"/>
<rect x="-4" y="32" width="5" height="64" fill="#c0a060" rx="2"/>
<rect x="1" y="32" width="4" height="64" fill="#c8a868" rx="2"/>
</g>
<g transform="translate(240,296) scale(1,-0.32)" opacity=".18">
<ellipse cx="0" cy="0" rx="20" ry="34" fill="${w2}"/>
<polygon points="-20,-5 -68,18 -55,-8 -20,-22" fill="${w2}"/>
<polygon points="20,-5 64,22 52,-6 20,-22" fill="${w2}"/>
</g>
<ellipse cx="60" cy="294" rx="88" ry="16" fill="white" opacity=".44"/>
<ellipse cx="410" cy="300" rx="85" ry="18" fill="white" opacity=".38"/>
<rect width="480" height="480" fill="url(#ms${id})" opacity=".26"/>
</svg>`;
};

export const makeThings = (p, id) => {
  const [s1,s2,s3,tw1a,tw1b,tw2a,tw2b,br,d1,d2] = p;
  return `<svg viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${s1}"/><stop offset="60%" stop-color="${s2}"/><stop offset="100%" stop-color="${s3}"/></linearGradient>
<linearGradient id="t1${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="${tw1a}"/><stop offset="100%" stop-color="${tw1b}"/></linearGradient>
<linearGradient id="t2${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="${tw2a}"/><stop offset="100%" stop-color="${tw2b}"/></linearGradient>
<linearGradient id="ms${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fff" stop-opacity="0"/><stop offset="100%" stop-color="#fff" stop-opacity=".45"/></linearGradient>
</defs>
<rect width="480" height="480" fill="url(#sk${id})"/>
<ellipse cx="240" cy="440" rx="200" ry="52" fill="${s2}" opacity=".28"/>
<ellipse cx="90" cy="430" rx="58" ry="36" fill="${tw2b}" opacity=".4"/>
<ellipse cx="392" cy="436" rx="50" ry="32" fill="${tw2a}" opacity=".35"/>
<ellipse cx="240" cy="456" rx="38" ry="24" fill="${tw2b}" opacity=".3"/>
<rect x="72" y="175" width="66" height="248" fill="url(#t1${id})"/>
<polygon points="72,175 138,175 124,152 86,152" fill="${tw1b}"/>
<rect x="90" y="214" width="22" height="32" rx="0 0 11 11" fill="#6a5848" opacity=".85"/>
<g opacity=".36" stroke="${tw1a}" stroke-width="6" fill="none">
<rect x="80" y="310" width="46" height="46"/>
<line x1="80" y1="333" x2="126" y2="333"/><line x1="103" y1="310" x2="103" y2="356"/>
</g>
<g fill="${tw1b}" opacity=".65">
<rect x="50" y="360" width="22" height="9"/><rect x="55" y="351" width="20" height="9"/>
<rect x="60" y="342" width="18" height="9"/><rect x="65" y="333" width="16" height="9"/>
</g>
<path d="M72 408 Q105 375 138 408" fill="none" stroke="${tw1a}" stroke-width="14" stroke-linecap="round"/>
<rect x="342" y="195" width="66" height="228" fill="url(#t2${id})"/>
<polygon points="342,195 408,195 396,172 354,172" fill="${tw2b}"/>
<rect x="360" y="234" width="26" height="38" rx="0 0 13 13" fill="#507860" opacity=".85"/>
<g opacity=".34" stroke="${tw2a}" stroke-width="5.5" fill="none">
<rect x="350" y="318" width="48" height="48"/>
<line x1="350" y1="342" x2="398" y2="342"/><line x1="374" y1="318" x2="374" y2="366"/>
</g>
<path d="M342 412 Q375 380 408 412" fill="none" stroke="${tw2a}" stroke-width="14" stroke-linecap="round"/>
<rect x="138" y="275" width="204" height="20" rx="2" fill="${br}"/>
<path d="M138 275 Q240 232 342 275" fill="none" stroke="${br}" stroke-width="11" opacity=".7"/>
<rect x="174" y="295" width="12" height="44" rx="2" fill="${br}" opacity=".8"/>
<rect x="294" y="295" width="12" height="44" rx="2" fill="${br}" opacity=".8"/>
<rect x="185" y="352" width="110" height="16" rx="2" fill="${br}"/>
<g transform="translate(240,268)">
<ellipse cx="0" cy="-15" rx="6" ry="6" fill="#f4ede8"/>
<rect x="-5" y="-9" width="10" height="14" rx="2" fill="#f0e8e0"/>
</g>
<rect x="196" y="145" width="15" height="15" fill="${d1}" transform="rotate(45,203,152)" opacity=".65"/>
<rect x="400" y="178" width="11" height="11" fill="${d2}" transform="rotate(45,405,183)" opacity=".55"/>
<rect x="58" y="148" width="10" height="10" fill="${d1}" transform="rotate(45,63,153)" opacity=".48"/>
<ellipse cx="240" cy="440" rx="240" ry="38" fill="white" opacity=".22"/>
<rect width="480" height="480" fill="url(#ms${id})" opacity=".28"/>
</svg>`;
};

const GENS = { nature: makeNature, animals: makeAnimals, things: makeThings };

export function genIll(theme, id) {
  id = id || uid();
  const p = PAL_GENS[theme]();
  return GENS[theme](p, id);
}

export function illUrl(svgStr) {
  return `data:image/svg+xml,${encodeURIComponent(svgStr)}`;
}
