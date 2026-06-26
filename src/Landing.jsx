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
  const [vis, setVis] = useState([false, false, false, false, false]);

  useEffect(() => {
    let timers = [];
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const delays = [0, 140, 280, 420, 600];
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

        {/* Logo */}
        <h1
          className={`big-title fade-item${vis[0] ? ' vis' : ''}`}
          style={{ color: 'var(--landing-title)', fontFamily: "'Nunito', sans-serif", fontWeight: 900, letterSpacing: '-0.01em', marginBottom: '32px' }}
        >
          Cozy<em style={{ color: 'var(--landing-accent)', fontStyle: 'italic', fontWeight: 800 }}>puzzly</em>
        </h1>

        {/* Subtitle — below the logo */}
        <p
          className={`fade-item${vis[1] ? ' vis' : ''}`}
          style={{ fontSize: '18px', letterSpacing: '.02em', color: 'var(--landing-sub)', marginBottom: '32px', fontWeight: 700 }}
        >
          a cozy place for thoughtful puzzles and peaceful play
        </p>

        {/* Quote */}
        <p className={`tagline fade-item${vis[2] ? ' vis' : ''}`}>
          "{aff}"
        </p>

        {/* CTA */}
        <div className={`landing-cta fade-item${vis[3] ? ' vis' : ''}`}>
          <button
            className="btn btn-pill"
            onClick={onStart}
            style={{ letterSpacing: '.12em' }}
          >
            Begin a puzzle
          </button>
          <p className="sub-note" style={{ color: 'var(--landing-subnote)' }}>
            No accounts · No scores · Just presence
          </p>
        </div>

      </div>

      {/* Buy Me a Coffee — pinned to bottom of screen */}
      <div className={`bmc-bottom fade-item${vis[4] ? ' vis' : ''}`}>
        <a href="https://buymeacoffee.com/yourname" target="_blank" rel="noopener noreferrer" className="bmc-link">
          ☕ Buy me a coffee
        </a>
      </div>

    </div>
  );
}
