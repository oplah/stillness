export default function Complete({ svgStr, onRestart, onNew }) {
  return (
    <div className="complete-ov">
      <div className="comp-title">You found <em>stillness.</em></div>
      <div className="comp-ill">
        <div dangerouslySetInnerHTML={{ __html: svgStr }} style={{ width: 280, lineHeight: 0 }} />
      </div>
      <p style={{ color: 'var(--muted)', fontFamily: 'Cormorant Garamond, serif', fontSize: 18, fontStyle: 'italic', marginBottom: 30, textAlign: 'center', maxWidth: 360 }}>
        Every piece in its place. Just like you.
      </p>
      <div style={{ display: 'flex', gap: 16 }}>
        <button className="btn btn-pill out" onClick={onNew}>New scene</button>
        <button className="btn btn-pill" onClick={onRestart}>Reassemble</button>
      </div>
    </div>
  );
}
