import { useState } from 'react';
import { genIll } from './palettes';

const THEME_LABELS = { nature: 'Nature', animals: 'Animals', things: 'Architecture' };
const DLABELS = { easy: 'Gentle · 16 pieces', medium: 'Calm · 25 pieces', hard: 'Serene · 36 pieces' };

export default function Setup({ onBegin, onBack, uiTheme, onToggleUi }) {
  const [theme, setTheme] = useState('nature');
  const [diff, setDiff] = useState('medium');
  const [prev] = useState(() => ({
    nature:  genIll('nature',  'np'),
    animals: genIll('animals', 'ap'),
    things:  genIll('things',  'tp'),
  }));

  return (
    <div className="screen">
      <div style={{ position: 'absolute', top: 18, right: 24 }}>
        <button className="theme-toggle" onClick={onToggleUi}>
          {uiTheme === 'light' ? '☽ Dark' : '☀ Light'}
        </button>
      </div>
      <div className="setup-content">
        <span className="setup-label">Choose your scene</span>
        <div className="theme-grid">
          {['nature', 'animals', 'things'].map(t => (
            <div key={t} className={`theme-card${theme === t ? ' sel' : ''}`} onClick={() => setTheme(t)}>
              <div dangerouslySetInnerHTML={{ __html: prev[t] }} style={{ lineHeight: 0 }} />
              <div className="tc-label">{THEME_LABELS[t]}</div>
            </div>
          ))}
        </div>
        <span className="setup-label">Choose your pace</span>
        <div className="diff-row">
          {['easy', 'medium', 'hard'].map(d => (
            <button key={d} className={`diff-btn${diff === d ? ' sel' : ''}`} onClick={() => setDiff(d)}>
              {DLABELS[d]}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <button className="btn btn-pill out" onClick={onBack}>← Back</button>
          <button className="btn btn-pill" onClick={() => onBegin(theme, diff)}>Begin</button>
        </div>
      </div>
    </div>
  );
}
