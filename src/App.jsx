import { useState, useEffect } from 'react';
import Landing from './Landing';
import Setup from './Setup';
import PuzzleCanvas from './PuzzleCanvas';
import Complete from './Complete';
import { genIll } from './palettes';

const DIFF = { easy: [4, 4], medium: [5, 5], hard: [6, 6] };
const THEME_LABELS = { nature: 'Nature', animals: 'Animals', things: 'Architecture' };

export default function App() {
  const [screen, setScreen] = useState(() => localStorage.getItem('stn_screen') || 'landing');
  const [theme, setTheme] = useState(() => localStorage.getItem('stn_theme') || 'nature');
  const [diff, setDiff] = useState(() => localStorage.getItem('stn_diff') || 'medium');
  const [curSvg, setCurSvg] = useState(null);
  const [complete, setComplete] = useState(false);
  const [uiTheme, setUiTheme] = useState(() => localStorage.getItem('stn_ui') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', uiTheme);
  }, [uiTheme]);

  const toggleUi = () => {
    const next = uiTheme === 'light' ? 'dark' : 'light';
    setUiTheme(next);
    localStorage.setItem('stn_ui', next);
  };

  const go = (s) => { setScreen(s); setComplete(false); localStorage.setItem('stn_screen', s); };

  const begin = (t, d) => {
    const svg = genIll(t);
    setTheme(t); setDiff(d); setCurSvg(svg);
    localStorage.setItem('stn_theme', t);
    localStorage.setItem('stn_diff', d);
    go('puzzle');
  };

  const restart = () => {
    setCurSvg(genIll(theme));
    setComplete(false);
    go('puzzle');
  };

  const [cols, rows] = DIFF[diff] || [5, 5];

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {screen === 'landing' && <Landing onStart={() => go('setup')} />}
      {screen === 'setup'   && <Setup onBegin={begin} onBack={() => go('landing')} uiTheme={uiTheme} onToggleUi={toggleUi} />}
      {screen === 'puzzle'  && (
        <div className="screen" style={{ flexDirection: 'column', gap: 0, justifyContent: 'flex-start', paddingTop: 12 }}>
          <div className="puz-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
              <button className="btn btn-ghost" onClick={() => go('setup')}>← <span className="btn-label">Change</span></button>
              <span className="puz-title">{THEME_LABELS[theme]}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <button className="btn btn-ghost" onClick={restart} style={{ fontSize: 12 }}>↻ <span className="btn-label">New variation</span></button>
              <button className="theme-toggle" onClick={toggleUi}>
                {uiTheme === 'light' ? '☽' : '☀'} <span className="toggle-label">{uiTheme === 'light' ? 'Dark' : 'Light'}</span>
              </button>
            </div>
          </div>
          {curSvg && (
            <PuzzleCanvas
              key={curSvg.slice(0, 40)}
              svgStr={curSvg}
              cols={cols}
              rows={rows}
              uiTheme={uiTheme}
              onComplete={() => setComplete(true)}
            />
          )}
          {complete && (
            <Complete svgStr={curSvg} onRestart={restart} onNew={() => go('setup')} />
          )}
        </div>
      )}
    </div>
  );
}
