import animal1Svg       from './svgs/animals/Animal-1.svg?raw';
import animal2Svg       from './svgs/animals/Animal-2.svg?raw';
import animal3Svg       from './svgs/animals/Animal-3.svg?raw';
import animal4Svg       from './svgs/animals/Animal-4.svg?raw';
import animal5Svg       from './svgs/animals/Animal-5.svg?raw';
import architecture1Svg from './svgs/architecture/Architecture-1.svg?raw';
import architecture2Svg from './svgs/architecture/Architecture-2.svg?raw';
import architecture3Svg from './svgs/architecture/Architecture-3.svg?raw';
import architecture4Svg from './svgs/architecture/Architecture-4.svg?raw';
import nature1Svg       from './svgs/nature/Nature-1.svg?raw';
import nature2Svg       from './svgs/nature/Nature-2.svg?raw';
import nature3Svg       from './svgs/nature/Nature-3.svg?raw';

const uid = () => Math.random().toString(36).slice(2, 7);

const r = (min, max) => min + Math.random() * (max - min);
const hsl = (h, s, l) =>
  `hsl(${Math.round(((h % 360) + 360) % 360)},${Math.round(Math.min(88, Math.max(20, s)))}%,${Math.round(Math.min(88, Math.max(25, l)))}%)`;

// Nature: [sky1,sky2,sky3, terrace1,terrace2, rose1,rose2, tree1,tree2, accent]
function genNaturePal() {
  const skyMoods = [
    { h: r(200,240), s: r(38,58), l: r(72,82) },
    { h: r(250,290), s: r(28,48), l: r(75,85) },
    { h: r(20, 46),  s: r(55,70), l: r(75,85) },
    { h: r(175,200), s: r(38,54), l: r(74,83) },
    { h: r(330,358), s: r(28,48), l: r(80,88) },
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
    hsl(0, 0, r(92, 98)),
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

export const makeNatureHills = (p, id) => {
  const [s1,s2,s3,t1,t2,r1,r2,tr1,tr2,acc] = p;
  return `<svg viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${s1}"/><stop offset="55%" stop-color="${s2}"/><stop offset="100%" stop-color="${s3}"/></linearGradient>
<linearGradient id="ms${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fff" stop-opacity="0"/><stop offset="100%" stop-color="#fff" stop-opacity=".45"/></linearGradient>
</defs>
<rect width="480" height="480" fill="url(#sk${id})"/>
<circle cx="340" cy="96" r="46" fill="${s3}" opacity=".9"/>
<circle cx="364" cy="84" r="40" fill="${s1}"/>
<path d="M0,330 Q60,260 120,290 Q180,320 240,270 Q300,220 360,250 Q420,280 480,230 L480,480 L0,480Z" fill="${t1}"/>
<path d="M0,360 Q80,310 160,340 Q240,370 320,320 Q400,270 480,310 L480,480 L0,480Z" fill="${t2}"/>
<path d="M0,400 Q120,370 240,390 Q360,410 480,375 L480,480 L0,480Z" fill="${r1}"/>
<g fill="${tr1}">
<polygon points="48,338 64,306 80,338"/><polygon points="62,317 76,284 90,317"/><polygon points="70,296 86,260 102,296"/>
<polygon points="140,302 156,268 172,302"/><polygon points="152,282 168,246 184,282"/>
<polygon points="270,272 286,238 302,272"/><polygon points="282,253 298,218 314,253"/><polygon points="290,234 308,197 326,234"/>
<polygon points="390,288 406,255 422,288"/><polygon points="400,268 418,234 436,268"/>
</g>
<g fill="${tr2}" opacity=".7">
<polygon points="46,340 58,318 70,340"/><polygon points="268,274 278,254 288,274"/><polygon points="388,291 398,271 408,291"/>
</g>
<ellipse cx="100" cy="368" rx="80" ry="12" fill="white" opacity=".22"/>
<ellipse cx="380" cy="360" rx="65" ry="11" fill="white" opacity=".18"/>
<g opacity=".52">
<rect x="80" y="184" width="12" height="12" fill="${acc}" transform="rotate(45,86,190)"/>
<rect x="250" y="152" width="10" height="10" fill="${acc}" transform="rotate(45,255,157)"/>
<rect x="410" y="168" width="9" height="9" fill="${acc}" transform="rotate(45,414,172)"/>
<rect x="176" y="128" width="8" height="8" fill="${acc}" transform="rotate(45,180,132)"/>
</g>
<rect width="480" height="480" fill="url(#ms${id})" opacity=".26"/>
</svg>`;
};

export const makeNaturePagoda = (p, id) => {
  const [s1,s2,s3,t1,t2,r1,r2,tr1,tr2,acc] = p;
  return `<svg viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${s1}"/><stop offset="60%" stop-color="${s2}"/><stop offset="100%" stop-color="${s3}"/></linearGradient>
<linearGradient id="cl${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${t1}"/><stop offset="100%" stop-color="${t2}"/></linearGradient>
<linearGradient id="ms${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fff" stop-opacity="0"/><stop offset="100%" stop-color="#fff" stop-opacity=".42"/></linearGradient>
</defs>
<rect width="480" height="480" fill="url(#sk${id})"/>
<g fill="${tr1}" opacity=".45">
<rect x="28" y="220" width="7" height="180"/><ellipse cx="31" cy="215" rx="18" ry="24"/>
<rect x="60" y="235" width="6" height="165"/><ellipse cx="63" cy="231" rx="13" ry="18"/>
<rect x="88" y="228" width="7" height="172"/><ellipse cx="91" cy="223" rx="16" ry="21"/>
</g>
<polygon points="258,178 344,178 362,362 240,362" fill="url(#cl${id})"/>
<polygon points="240,362 362,362 382,424 218,424" fill="${t2}"/>
<rect x="218" y="422" width="164" height="58" fill="${r1}"/>
<rect x="198" y="382" width="204" height="14" rx="2" fill="${r2}"/>
<g opacity=".6" stroke="white" stroke-width="1.5" fill="none">
<line x1="236" y1="210" x2="236" y2="362"/><line x1="241" y1="210" x2="241" y2="362"/><line x1="246" y1="218" x2="246" y2="362"/>
</g>
<ellipse cx="238" cy="406" rx="46" ry="18" fill="${s2}" opacity=".55"/>
<rect x="274" y="134" width="44" height="44" fill="${tr2}"/>
<polygon points="268,134 324,134 310,108 282,108" fill="${tr1}"/>
<polygon points="264,138 328,138 314,126 278,126" fill="${tr2}" opacity=".65"/>
<rect x="278" y="98" width="36" height="36" fill="${tr1}"/>
<polygon points="272,98 320,98 308,74 284,74" fill="${tr2}"/>
<polygon points="268,102 324,102 312,90 280,90" fill="${tr1}" opacity=".65"/>
<rect x="282" y="66" width="28" height="32" fill="${tr2}"/>
<polygon points="276,66 318,66 308,44 284,44" fill="${tr1}"/>
<rect x="293" y="40" width="6" height="28" fill="${acc}"/>
<rect x="258" y="298" width="5" height="64" fill="${tr2}" opacity=".65"/>
<rect x="268" y="298" width="5" height="64" fill="${tr1}" opacity=".75"/>
<rect x="320" y="298" width="5" height="64" fill="${tr2}" opacity=".65"/>
<rect x="330" y="298" width="5" height="64" fill="${tr1}" opacity=".75"/>
<g opacity=".55">
<rect x="164" y="148" width="12" height="12" fill="${acc}" transform="rotate(45,170,154)"/>
<rect x="358" y="166" width="10" height="10" fill="${acc}" transform="rotate(45,363,171)"/>
<rect x="108" y="170" width="9" height="9" fill="${acc}" transform="rotate(45,112,174)"/>
</g>
<rect width="480" height="480" fill="url(#ms${id})" opacity=".24"/>
</svg>`;
};

export const makeNatureZen = (p, id) => {
  const [s1,s2,s3,t1,t2,r1,r2,tr1,tr2,acc] = p;
  return `<svg viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${s1}"/><stop offset="100%" stop-color="${s2}"/></linearGradient>
<linearGradient id="gr${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${r1}"/><stop offset="100%" stop-color="${r2}"/></linearGradient>
<linearGradient id="ms${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fff" stop-opacity="0"/><stop offset="100%" stop-color="#fff" stop-opacity=".4"/></linearGradient>
</defs>
<rect width="480" height="480" fill="url(#sk${id})"/>
<rect x="0" y="258" width="480" height="222" fill="url(#gr${id})"/>
<rect x="20" y="246" width="440" height="16" rx="3" fill="${t1}" opacity=".55"/>
<g stroke="${t2}" stroke-width="1.2" fill="none" opacity=".45">
<path d="M0,278 Q240,268 480,278"/>
<path d="M0,292 Q240,282 480,292"/>
<path d="M0,306 Q240,296 480,306"/>
<path d="M0,320 Q240,310 480,320"/>
<path d="M0,334 Q110,348 190,334 Q260,320 480,334"/>
<path d="M0,348 Q110,362 190,348 Q260,334 480,348"/>
<path d="M0,362 Q110,376 190,362 Q260,348 480,362"/>
<path d="M0,376 Q350,392 410,376 Q445,366 480,376"/>
<path d="M0,390 Q350,406 410,390 Q445,380 480,390"/>
<path d="M0,404 Q350,420 410,404 Q445,394 480,404"/>
<path d="M0,418 Q240,430 480,418"/>
<path d="M0,432 Q240,444 480,432"/>
</g>
<ellipse cx="198" cy="332" rx="31" ry="19" fill="${t1}" opacity=".8"/>
<ellipse cx="214" cy="324" rx="19" ry="13" fill="${t2}" opacity=".75"/>
<ellipse cx="194" cy="322" rx="15" ry="11" fill="${t1}" opacity=".85"/>
<ellipse cx="372" cy="358" rx="23" ry="15" fill="${t2}" opacity=".75"/>
<ellipse cx="360" cy="352" rx="14" ry="10" fill="${t1}" opacity=".8"/>
<ellipse cx="98" cy="374" rx="17" ry="11" fill="${t1}" opacity=".68"/>
<rect x="298" y="196" width="8" height="70" rx="4" fill="${tr2}" opacity=".8"/>
<rect x="290" y="190" width="8" height="54" rx="4" fill="${tr1}" opacity=".7" transform="rotate(-18,294,217)"/>
<rect x="306" y="186" width="6" height="46" rx="3" fill="${tr2}" opacity=".65" transform="rotate(12,309,209)"/>
<ellipse cx="296" cy="188" rx="24" ry="17" fill="${tr1}" opacity=".8"/>
<ellipse cx="290" cy="174" rx="18" ry="14" fill="${tr2}" opacity=".75"/>
<ellipse cx="306" cy="176" rx="15" ry="12" fill="${tr1}" opacity=".7"/>
<ellipse cx="294" cy="162" rx="11" ry="9" fill="${tr2}" opacity=".62"/>
<rect x="68" y="104" width="3" height="94" rx="2" fill="${tr1}" opacity=".5"/>
<path d="M71 136 Q95 124 116 131" stroke="${tr1}" stroke-width="2.5" fill="none" opacity=".55"/>
<path d="M71 154 Q48 144 36 150" stroke="${tr2}" stroke-width="2" fill="none" opacity=".5"/>
<path d="M71 170 Q97 165 110 172" stroke="${tr1}" stroke-width="2" fill="none" opacity=".45"/>
<rect x="132" y="228" width="216" height="30" rx="4" fill="${t2}" opacity=".48"/>
<rect x="148" y="210" width="184" height="22" rx="3" fill="${t1}" opacity=".42"/>
<g opacity=".55">
<rect x="66" y="84" width="10" height="10" fill="${acc}" transform="rotate(45,71,89)"/>
<rect x="382" y="166" width="9" height="9" fill="${acc}" transform="rotate(45,386,170)"/>
<rect x="422" y="238" width="8" height="8" fill="${acc}" transform="rotate(45,426,242)"/>
</g>
<rect width="480" height="480" fill="url(#ms${id})" opacity=".22"/>
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

export const makeAnimalsDeer = (p, id) => {
  const [s1,s2,s3,w1,w2,crane,lotus,pad,tree] = p;
  return `<svg viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${s1}"/><stop offset="60%" stop-color="${s2}"/><stop offset="100%" stop-color="${s3}"/></linearGradient>
<linearGradient id="ms${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fff" stop-opacity="0"/><stop offset="100%" stop-color="#fff" stop-opacity=".52"/></linearGradient>
</defs>
<rect width="480" height="480" fill="url(#sk${id})"/>
<g opacity=".35" fill="${tree}">
<rect x="24" y="140" width="14" height="340"/><rect x="68" y="160" width="10" height="320"/>
<rect x="108" y="130" width="16" height="350"/><rect x="360" y="120" width="16" height="360"/>
<rect x="402" y="150" width="12" height="330"/><rect x="438" y="140" width="14" height="340"/>
</g>
<g opacity=".18" fill="${tree}">
<rect x="46" y="170" width="8" height="310"/><rect x="88" y="145" width="9" height="335"/>
<rect x="382" y="135" width="10" height="345"/><rect x="422" y="160" width="8" height="320"/>
</g>
<ellipse cx="240" cy="420" rx="200" ry="40" fill="white" opacity=".52"/>
<ellipse cx="240" cy="375" rx="165" ry="28" fill="white" opacity=".32"/>
<ellipse cx="240" cy="340" rx="120" ry="20" fill="white" opacity=".2"/>
<g transform="translate(240,265)">
<polygon points="0,-58 -32,-18 -26,42 0,54 26,42 32,-18" fill="${crane}"/>
<polygon points="-26,42 0,54 -9,92 -21,92" fill="${crane}" opacity=".92"/>
<polygon points="26,42 0,54 9,92 21,92" fill="${crane}" opacity=".92"/>
<polygon points="-9,92 -21,92 -18,118 -6,118" fill="${crane}" opacity=".82"/>
<polygon points="9,92 21,92 18,118 6,118" fill="${crane}" opacity=".82"/>
<polygon points="0,-58 -13,-80 -5,-60" fill="${crane}"/>
<polygon points="0,-58 13,-80 5,-60" fill="${crane}"/>
<circle cx="0" cy="-78" r="14" fill="${crane}"/>
<circle cx="-5" cy="-82" r="4" fill="#2a2040"/>
<path d="M-13,-80 Q-28,-100 -20,-120 M-13,-80 Q-32,-92 -18,-112" stroke="${crane}" stroke-width="3" fill="none" stroke-linecap="round"/>
<path d="M13,-80 Q28,-100 20,-120 M13,-80 Q32,-92 18,-112" stroke="${crane}" stroke-width="3" fill="none" stroke-linecap="round"/>
</g>
<g opacity=".55">
<rect x="140" y="134" width="10" height="10" fill="${lotus}" transform="rotate(45,145,139)"/>
<rect x="320" y="150" width="9" height="9" fill="${lotus}" transform="rotate(45,324,154)"/>
<rect x="76" y="178" width="8" height="8" fill="${lotus}" transform="rotate(45,80,182)"/>
</g>
<rect width="480" height="480" fill="url(#ms${id})" opacity=".3"/>
</svg>`;
};

export const makeAnimalsKoi = (p, id) => {
  const [s1,s2,s3,w1,w2,crane,lotus,pad,tree] = p;
  return `<svg viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg">
<defs>
<radialGradient id="sk${id}" cx="50%" cy="50%" r="65%"><stop offset="0%" stop-color="${w1}"/><stop offset="100%" stop-color="${w2}"/></radialGradient>
<linearGradient id="ms${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fff" stop-opacity="0"/><stop offset="100%" stop-color="#fff" stop-opacity=".35"/></linearGradient>
</defs>
<rect width="480" height="480" fill="url(#sk${id})"/>
<g stroke="white" stroke-width="1" fill="none" opacity=".2">
<line x1="0" y1="80" x2="480" y2="80"/><line x1="0" y1="176" x2="480" y2="176"/>
<line x1="0" y1="294" x2="480" y2="294"/><line x1="0" y1="400" x2="480" y2="400"/>
<line x1="80" y1="0" x2="80" y2="480"/><line x1="240" y1="0" x2="240" y2="480"/><line x1="400" y1="0" x2="400" y2="480"/>
</g>
<circle cx="118" cy="148" r="50" fill="${pad}" opacity=".78"/>
<path d="M118,98 L118,148" stroke="${s1}" stroke-width="1.5" fill="none" opacity=".5"/>
<circle cx="340" cy="318" r="42" fill="${pad}" opacity=".72"/>
<path d="M340,276 L340,318" stroke="${s1}" stroke-width="1.5" fill="none" opacity=".45"/>
<circle cx="196" cy="344" r="32" fill="${pad}" opacity=".68"/>
<circle cx="382" cy="118" r="28" fill="${pad}" opacity=".62"/>
<g transform="translate(186,222) rotate(-38)">
<ellipse cx="0" cy="0" rx="36" ry="14" fill="${crane}"/>
<polygon points="36,0 52,-8 52,8" fill="${crane}" opacity=".88"/>
<ellipse cx="-22" cy="0" rx="15" ry="8" fill="${lotus}" opacity=".75"/>
</g>
<g transform="translate(292,152) rotate(52)">
<ellipse cx="0" cy="0" rx="32" ry="13" fill="${lotus}"/>
<polygon points="32,0 48,-7 48,7" fill="${lotus}" opacity=".88"/>
<ellipse cx="-19" cy="0" rx="13" ry="7" fill="${crane}" opacity=".65"/>
</g>
<g transform="translate(374,382) rotate(-22)">
<ellipse cx="0" cy="0" rx="30" ry="12" fill="${crane}" opacity=".82"/>
<polygon points="30,0 44,-6 44,6" fill="${crane}" opacity=".75"/>
</g>
<g opacity=".55" fill="none" stroke="white">
<circle cx="186" cy="222" r="24" stroke-width="1.2"/><circle cx="186" cy="222" r="38" stroke-width=".7" opacity=".5"/>
<circle cx="292" cy="152" r="20" stroke-width="1.2"/><circle cx="292" cy="152" r="32" stroke-width=".7" opacity=".5"/>
</g>
<g transform="translate(118,138)">
<ellipse cx="0" cy="-10" rx="9" ry="12" fill="${lotus}" opacity=".85"/>
<ellipse cx="8" cy="-5" rx="8" ry="10" fill="${lotus}" opacity=".78"/>
<ellipse cx="-8" cy="-5" rx="8" ry="10" fill="${lotus}" opacity=".78"/>
<circle cx="0" cy="-12" r="5" fill="#f0d080" opacity=".8"/>
</g>
<rect width="480" height="480" fill="url(#ms${id})" opacity=".22"/>
</svg>`;
};

export const makeAnimalsOwl = (p, id) => {
  const [s1,s2,s3,w1,w2,crane,lotus,pad,tree] = p;
  return `<svg viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${s1}"/><stop offset="55%" stop-color="${s2}"/><stop offset="100%" stop-color="${s3}"/></linearGradient>
<radialGradient id="mn${id}" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#fff" stop-opacity=".95"/><stop offset="70%" stop-color="#f8f0e0" stop-opacity=".9"/><stop offset="100%" stop-color="#e8d8c0" stop-opacity=".7"/></radialGradient>
<linearGradient id="ms${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fff" stop-opacity="0"/><stop offset="100%" stop-color="#fff" stop-opacity=".4"/></linearGradient>
</defs>
<rect width="480" height="480" fill="url(#sk${id})"/>
<circle cx="282" cy="158" r="90" fill="url(#mn${id})"/>
<circle cx="282" cy="158" r="90" fill="none" stroke="${s3}" stroke-width="2" opacity=".28"/>
<circle cx="282" cy="158" r="104" fill="none" stroke="${s3}" stroke-width="5" opacity=".22"/>
<g opacity=".22" fill="${tree}">
<rect x="18" y="198" width="10" height="282"/><rect x="68" y="238" width="7" height="242"/>
<rect x="440" y="178" width="11" height="302"/><rect x="402" y="218" width="8" height="262"/>
</g>
<rect x="98" y="298" width="284" height="14" rx="7" fill="${tree}"/>
<path d="M76,298 Q98,291 120,298" stroke="${tree}" stroke-width="10" fill="none" stroke-linecap="round"/>
<path d="M360,298 Q382,291 404,298" stroke="${tree}" stroke-width="10" fill="none" stroke-linecap="round"/>
<g transform="translate(240,262)">
<ellipse cx="0" cy="10" rx="40" ry="48" fill="${crane}"/>
<polygon points="-40,10 -54,-14 -30,-20 -28,10" fill="${crane}" opacity=".88"/>
<polygon points="40,10 54,-14 30,-20 28,10" fill="${crane}" opacity=".88"/>
<circle cx="0" cy="-28" r="30" fill="${crane}"/>
<polygon points="-11,-56 -20,-44 -4,-40" fill="${crane}"/>
<polygon points="11,-56 20,-44 4,-40" fill="${crane}"/>
<circle cx="-11" cy="-30" r="10" fill="white" opacity=".95"/>
<circle cx="11" cy="-30" r="10" fill="white" opacity=".95"/>
<circle cx="-11" cy="-30" r="6" fill="${pad}"/>
<circle cx="11" cy="-30" r="6" fill="${pad}"/>
<circle cx="-10" cy="-31" r="3" fill="#1a1628"/>
<circle cx="10" cy="-31" r="3" fill="#1a1628"/>
<polygon points="-5,-20 5,-20 0,-13" fill="${lotus}" opacity=".8"/>
<g stroke="${tree}" stroke-width="2.5" fill="none" opacity=".55">
<line x1="-40" y1="36" x2="-30" y2="58"/><line x1="-30" y1="58" x2="-22" y2="58"/>
<line x1="-40" y1="36" x2="-50" y2="58"/><line x1="-50" y1="58" x2="-58" y2="58"/>
<line x1="40" y1="36" x2="30" y2="58"/><line x1="30" y1="58" x2="22" y2="58"/>
<line x1="40" y1="36" x2="50" y2="58"/><line x1="50" y1="58" x2="58" y2="58"/>
</g>
</g>
<g opacity=".5">
<rect x="88" y="138" width="10" height="10" fill="${lotus}" transform="rotate(45,93,143)"/>
<rect x="376" y="122" width="9" height="9" fill="${lotus}" transform="rotate(45,380,126)"/>
<rect x="50" y="200" width="8" height="8" fill="${crane}" transform="rotate(45,54,204)" opacity=".65"/>
</g>
<rect width="480" height="480" fill="url(#ms${id})" opacity=".24"/>
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

export const makeThingsLighthouse = (p, id) => {
  const [s1,s2,s3,tw1a,tw1b,tw2a,tw2b,br,d1,d2] = p;
  return `<svg viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${s1}"/><stop offset="60%" stop-color="${s2}"/><stop offset="100%" stop-color="${s3}"/></linearGradient>
<linearGradient id="wt${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${tw2a}" stop-opacity=".72"/><stop offset="100%" stop-color="${tw2b}" stop-opacity=".9"/></linearGradient>
<linearGradient id="lh${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="${tw1a}"/><stop offset="100%" stop-color="${tw1b}"/></linearGradient>
<linearGradient id="ms${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fff" stop-opacity="0"/><stop offset="100%" stop-color="#fff" stop-opacity=".4"/></linearGradient>
</defs>
<rect width="480" height="480" fill="url(#sk${id})"/>
<rect x="0" y="338" width="480" height="142" fill="url(#wt${id})"/>
<line x1="0" y1="356" x2="480" y2="356" stroke="white" stroke-width="1.2" opacity=".28"/>
<line x1="0" y1="380" x2="480" y2="380" stroke="white" stroke-width="1" opacity=".2"/>
<line x1="0" y1="406" x2="480" y2="406" stroke="white" stroke-width="1" opacity=".13"/>
<polygon points="178,368 200,338 242,326 282,338 302,368 262,378 218,378" fill="${br}"/>
<polygon points="148,420 360,420 302,368 178,368" fill="${tw1b}" opacity=".45"/>
<rect x="216" y="272" width="48" height="68" rx="2" fill="url(#lh${id})"/>
<rect x="212" y="268" width="56" height="10" rx="1" fill="${tw1b}"/>
<rect x="216" y="300" width="48" height="5" rx="1" fill="${tw1b}" opacity=".45"/>
<rect x="216" y="325" width="48" height="5" rx="1" fill="${tw1b}" opacity=".45"/>
<rect x="220" y="158" width="40" height="114" rx="1" fill="url(#lh${id})"/>
<rect x="216" y="154" width="48" height="10" rx="1" fill="${tw1b}"/>
<rect x="216" y="196" width="48" height="5" rx="1" fill="${tw1b}" opacity=".4"/>
<rect x="216" y="226" width="48" height="5" rx="1" fill="${tw1b}" opacity=".4"/>
<rect x="222" y="126" width="36" height="34" rx="2" fill="${tw2a}"/>
<rect x="218" y="122" width="44" height="8" rx="1" fill="${tw2b}"/>
<polygon points="214,122 266,122 240,100" fill="${tw2b}"/>
<circle cx="240" cy="114" r="16" fill="${d1}" opacity=".88"/>
<circle cx="240" cy="114" r="10" fill="white" opacity=".9"/>
<polygon points="240,98 145,246 124,236" fill="${d1}" opacity=".14"/>
<polygon points="240,98 335,246 356,236" fill="${d1}" opacity=".12"/>
<rect x="236" y="92" width="8" height="12" rx="2" fill="${tw2b}"/>
<g stroke="${tw2a}" stroke-width="1.5" fill="none" opacity=".3">
<path d="M158,380 Q200,373 242,380 Q282,387 322,380"/>
</g>
<g opacity=".52">
<rect x="128" y="186" width="11" height="11" fill="${d2}" transform="rotate(45,133,191)"/>
<rect x="352" y="168" width="10" height="10" fill="${d1}" transform="rotate(45,357,173)"/>
<rect x="66" y="252" width="9" height="9" fill="${d2}" transform="rotate(45,70,256)"/>
<rect x="394" y="226" width="9" height="9" fill="${d1}" transform="rotate(45,398,230)"/>
</g>
<rect width="480" height="480" fill="url(#ms${id})" opacity=".24"/>
</svg>`;
};

export const makeThingsFloating = (p, id) => {
  const [s1,s2,s3,tw1a,tw1b,tw2a,tw2b,br,d1,d2] = p;
  return `<svg viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${s1}"/><stop offset="60%" stop-color="${s2}"/><stop offset="100%" stop-color="${s3}"/></linearGradient>
<linearGradient id="is${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${tw1a}"/><stop offset="100%" stop-color="${tw1b}"/></linearGradient>
<linearGradient id="ms${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fff" stop-opacity="0"/><stop offset="100%" stop-color="#fff" stop-opacity=".42"/></linearGradient>
</defs>
<rect width="480" height="480" fill="url(#sk${id})"/>
<ellipse cx="78" cy="118" rx="72" ry="22" fill="white" opacity=".2"/>
<ellipse cx="56" cy="120" rx="52" ry="16" fill="white" opacity=".14"/>
<ellipse cx="402" cy="78" rx="66" ry="18" fill="white" opacity=".17"/>
<ellipse cx="422" cy="80" rx="48" ry="14" fill="white" opacity=".12"/>
<ellipse cx="196" cy="48" rx="82" ry="20" fill="white" opacity=".14"/>
<ellipse cx="382" cy="322" rx="52" ry="13" fill="${tw2a}" opacity=".58"/>
<polygon points="342,322 382,296 422,322 412,384 352,384" fill="url(#is${id})" opacity=".68"/>
<ellipse cx="382" cy="384" rx="42" ry="11" fill="${tw2b}" opacity=".52"/>
<ellipse cx="240" cy="428" rx="132" ry="22" fill="${tw1b}" opacity=".32"/>
<polygon points="102,318 180,278 240,266 300,278 378,318 338,432 142,432" fill="url(#is${id})"/>
<ellipse cx="240" cy="318" rx="126" ry="30" fill="${tw1a}"/>
<ellipse cx="240" cy="316" rx="112" ry="24" fill="${tw2a}" opacity=".45"/>
<rect x="188" y="246" width="26" height="72" rx="2" fill="${tw2a}"/>
<rect x="266" y="246" width="26" height="72" rx="2" fill="${tw2b}"/>
<path d="M188,246 Q240,202 292,246" fill="none" stroke="${br}" stroke-width="18"/>
<path d="M188,246 Q240,202 292,246" fill="none" stroke="${s1}" stroke-width="9" opacity=".38"/>
<rect x="180" y="240" width="120" height="14" rx="2" fill="${br}"/>
<rect x="184" y="232" width="112" height="10" rx="2" fill="${tw2b}" opacity=".58"/>
<rect x="184" y="240" width="34" height="8" rx="1" fill="${tw2b}" opacity=".65"/>
<rect x="262" y="240" width="34" height="8" rx="1" fill="${tw2a}" opacity=".65"/>
<rect x="214" y="172" width="52" height="36" fill="${tw2a}" opacity=".48"/>
<rect x="218" y="176" width="44" height="28" rx="2" fill="${tw2b}" opacity=".55"/>
<rect x="224" y="181" width="14" height="20" rx="7" fill="${s1}" opacity=".48"/>
<rect x="242" y="181" width="14" height="20" rx="7" fill="${s1}" opacity=".48"/>
<g stroke="${tw1b}" stroke-width="2" fill="none" opacity=".38" stroke-linecap="round">
<path d="M158,432 Q153,458 160,472"/><path d="M194,432 Q191,462 186,477"/>
<path d="M240,434 Q240,464 242,478"/><path d="M286,432 Q289,460 294,474"/>
<path d="M322,432 Q326,456 320,470"/>
</g>
<g opacity=".5">
<rect x="160" y="194" width="12" height="12" fill="${d1}" transform="rotate(45,166,200)"/>
<rect x="302" y="186" width="11" height="11" fill="${d2}" transform="rotate(45,307,191)"/>
<rect x="240" y="166" width="10" height="10" fill="${d1}" transform="rotate(45,245,171)"/>
<rect x="88" y="268" width="9" height="9" fill="${d2}" transform="rotate(45,92,272)"/>
<rect x="382" y="258" width="9" height="9" fill="${d1}" transform="rotate(45,386,262)"/>
</g>
<ellipse cx="240" cy="318" rx="180" ry="20" fill="white" opacity=".18"/>
<rect width="480" height="480" fill="url(#ms${id})" opacity=".26"/>
</svg>`;
};

export const makeThingsAqueduct = (p, id) => {
  const [s1,s2,s3,tw1a,tw1b,tw2a,tw2b,br,d1,d2] = p;
  return `<svg viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${s1}"/><stop offset="58%" stop-color="${s2}"/><stop offset="100%" stop-color="${s3}"/></linearGradient>
<linearGradient id="wt${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${tw2a}" stop-opacity=".68"/><stop offset="100%" stop-color="${tw2b}" stop-opacity=".9"/></linearGradient>
<linearGradient id="ms${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fff" stop-opacity="0"/><stop offset="100%" stop-color="#fff" stop-opacity=".4"/></linearGradient>
</defs>
<rect width="480" height="480" fill="url(#sk${id})"/>
<rect x="0" y="356" width="480" height="124" fill="url(#wt${id})"/>
<line x1="0" y1="374" x2="480" y2="374" stroke="white" stroke-width="1.2" opacity=".28"/>
<line x1="0" y1="396" x2="480" y2="396" stroke="white" stroke-width="1" opacity=".2"/>
<line x1="0" y1="418" x2="480" y2="418" stroke="white" stroke-width="1" opacity=".13"/>
<rect x="24" y="178" width="432" height="178" fill="${tw1a}"/>
<path d="M60,356 L60,250 A48,48 0 0 0 156,250 L156,356 Z" fill="url(#sk${id})"/>
<path d="M192,356 L192,250 A48,48 0 0 0 288,250 L288,356 Z" fill="url(#sk${id})"/>
<path d="M324,356 L324,250 A48,48 0 0 0 420,250 L420,356 Z" fill="url(#sk${id})"/>
<rect x="24" y="170" width="432" height="16" rx="2" fill="${tw1b}"/>
<rect x="24" y="162" width="432" height="12" rx="2" fill="${br}" opacity=".72"/>
<rect x="24" y="178" width="8" height="178" fill="${tw1b}" opacity=".32"/>
<rect x="52" y="178" width="6" height="178" fill="white" opacity=".09"/>
<rect x="156" y="178" width="8" height="178" fill="${tw1b}" opacity=".32"/>
<rect x="184" y="178" width="6" height="178" fill="white" opacity=".09"/>
<rect x="288" y="178" width="8" height="178" fill="${tw1b}" opacity=".32"/>
<rect x="316" y="178" width="6" height="178" fill="white" opacity=".09"/>
<rect x="420" y="178" width="8" height="178" fill="${tw1b}" opacity=".32"/>
<rect x="18" y="160" width="48" height="14" rx="2" fill="${br}" opacity=".78"/>
<rect x="150" y="160" width="48" height="14" rx="2" fill="${br}" opacity=".78"/>
<rect x="282" y="160" width="48" height="14" rx="2" fill="${br}" opacity=".78"/>
<rect x="414" y="160" width="48" height="14" rx="2" fill="${br}" opacity=".78"/>
<circle cx="108" cy="250" r="5" fill="${br}" opacity=".62"/>
<circle cx="240" cy="250" r="5" fill="${br}" opacity=".62"/>
<circle cx="372" cy="250" r="5" fill="${br}" opacity=".62"/>
<g stroke="${tw2a}" stroke-width="1.5" fill="none" opacity=".32">
<path d="M80,382 Q108,376 136,382"/>
<path d="M212,388 Q240,382 268,388"/>
<path d="M344,384 Q372,378 400,384"/>
</g>
<g opacity=".52">
<rect x="90" y="106" width="12" height="12" fill="${d1}" transform="rotate(45,96,112)"/>
<rect x="228" y="116" width="10" height="10" fill="${d2}" transform="rotate(45,233,121)"/>
<rect x="368" y="106" width="11" height="11" fill="${d1}" transform="rotate(45,373,111)"/>
<rect x="50" y="136" width="9" height="9" fill="${d2}" transform="rotate(45,54,140)"/>
<rect x="418" y="128" width="9" height="9" fill="${d1}" transform="rotate(45,422,132)"/>
</g>
<ellipse cx="240" cy="366" rx="200" ry="18" fill="white" opacity=".2"/>
<rect width="480" height="480" fill="url(#ms${id})" opacity=".24"/>
</svg>`;
};

const VARIANTS = {
  nature: [
    makeNature, makeNatureHills, makeNaturePagoda, makeNatureZen,
    () => nature1Svg, () => nature2Svg, () => nature3Svg,
  ],
  animals: [
    makeAnimals, makeAnimalsDeer, makeAnimalsKoi, makeAnimalsOwl,
    () => animal1Svg, () => animal2Svg, () => animal3Svg, () => animal4Svg, () => animal5Svg,
  ],
  things: [
    makeThings, makeThingsLighthouse, makeThingsFloating, makeThingsAqueduct,
    () => architecture1Svg, () => architecture2Svg, () => architecture3Svg, () => architecture4Svg,
  ],
};

// Preview uses only the first 4 programmatic variants (no uploaded SVGs),
// so thumbnails are always colourful and render without CSS-class issues.
export function genPreview(theme) {
  const p = PAL_GENS[theme]();
  const id = uid();
  const vars = VARIANTS[theme].slice(0, 4);
  return vars[Math.floor(Math.random() * vars.length)](p, id);
}

export function genIll(theme, id) {
  id = id || uid();
  const p = PAL_GENS[theme]();
  const variants = VARIANTS[theme];
  const fn = variants[Math.floor(Math.random() * variants.length)];
  return fn(p, id);
}

function inlineStyles(svgStr) {
  const styleMatch = svgStr.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  if (!styleMatch) return svgStr;
  const rules = {};
  const ruleRegex = /\.(\w+)\s*\{[^}]*fill:\s*([^;}\s]+)/g;
  let m;
  while ((m = ruleRegex.exec(styleMatch[1])) !== null) {
    rules[m[1]] = m[2].trim();
  }
  if (!Object.keys(rules).length) return svgStr;
  return svgStr.replace(/class="([^"]+)"/g, (match, classStr) => {
    for (const cls of classStr.trim().split(/\s+/)) {
      if (rules[cls]) return `fill="${rules[cls]}"`;
    }
    return match;
  });
}

export function illUrl(svgStr) {
  return `data:image/svg+xml,${encodeURIComponent(inlineStyles(svgStr))}`;
}

// Normalise an SVG string for use as a responsive inline thumbnail.
// Ensures viewBox is present (built from width/height if needed) and
// replaces fixed pixel dimensions with 100% so CSS can scale it.
export function thumbnailSvg(svgStr) {
  let s = svgStr;
  if (!/\bviewBox\s*=/i.test(s)) {
    const wm = s.match(/\bwidth="([\d.]+)"/);
    const hm = s.match(/\bheight="([\d.]+)"/);
    if (wm && hm) s = s.replace(/<svg\b/, `<svg viewBox="0 0 ${wm[1]} ${hm[1]}"`);
  }
  s = s.replace(/(<svg\b[^>]*)\bwidth="[^"]*"/, '$1width="100%"');
  s = s.replace(/(<svg\b[^>]*)\bheight="[^"]*"/, '$1height="100%"');
  return s;
}

// Fixed, consistent preview SVGs for the selection screen (one per theme).
export function previewSvg(theme) {
  const map = { nature: nature1Svg, animals: animal1Svg, things: architecture1Svg };
  return thumbnailSvg(map[theme] || '');
}
