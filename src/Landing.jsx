import { useState, useEffect } from 'react';
import LandingBg from './LandingBg';

const AFFS = [
  "This moment is enough.",
  "Breath by breath, piece by piece.",
  "Stillness is not the absence of motion — it is the presence of peace.",
  "You don't have to rush. The image will reveal itself.",
  "Rest your mind. Let your hands lead.",
  "Each piece is a small act of patience.",
  "There is nowhere you need to be but here.",
];

export default function Landing({ onStart }) {
  const [aff] = useState(() => AFFS[Math.floor(Math.random() * AFFS.length)]);
  const [vis, setVis] = useState([false, false, false, false]);

  useEffect(() => {
    let timers = [];
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const delays = [0, 140, 280, 420];
      timers = delays.map((d, i) =>
        setTimeout(() => setVis(v => { const n = [...v]; n[i] = true; return n; }), d)
      );
    }));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="screen" style={{ flexDirection: 'column' }}>
      <LandingBg />
      <div className="landing-content">
        <div className={`eyebrow fade-item${vis[0] ? ' vis' : ''}`}>A mindful puzzle experience</div>
        <h1 className={`big-title fade-item${vis[1] ? ' vis' : ''}`}>Still<em>ness</em></h1>
        <p className={`tagline fade-item${vis[2] ? ' vis' : ''}`}>"{aff}"</p>
        <div className={`landing-cta fade-item${vis[3] ? ' vis' : ''}`}>
          <button className="btn btn-pill" onClick={onStart}>Begin a puzzle</button>
          <p className="sub-note">No accounts · No scores · Just presence</p>
        </div>
      </div>
    </div>
  );
}
