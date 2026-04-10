import { useState, useRef } from 'react'

const SAMPLE = `<!doctype html>
<html>
<head>
<style>
  body { font-family: sans-serif; padding: 2rem; background: #f8fafc; }
  h1 { color: #0f172a; }
  .card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  button { background: #6366f1; color: white; border: none; padding: 0.5rem 1.5rem; border-radius: 8px; cursor: pointer; }
  button:hover { background: #4f46e5; }
</style>
</head>
<body>
  <h1>Hello, DevToolbox!</h1>
  <div class="card">
    <p>Edit this HTML in the editor and see it rendered live.</p>
    <button onclick="this.textContent='Clicked!'">Click me</button>
  </div>
</body>
</html>`

export default function HtmlPreview() {
  const [code, setCode] = useState(SAMPLE)
  const [view, setView] = useState('split')

  const srcDoc = code

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {['split', 'edit', 'preview'].map(v => (
          <button key={v} onClick={() => setView(v)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${view === v ? 'bg-lime-400 text-base-950 border-lime-400' : 'btn-secondary'}`}>
            {v}
          </button>
        ))}
      </div>

      <div className={`grid gap-4 ${view === 'split' ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {(view === 'edit' || view === 'split') && (
          <div>
            <p className="section-label">HTML / CSS / JS</p>
            <textarea
              className="tool-textarea h-[520px]"
              value={code}
              onChange={e => setCode(e.target.value)}
              spellCheck={false}
            />
          </div>
        )}
        {(view === 'preview' || view === 'split') && (
          <div>
            <p className="section-label">Live preview</p>
            <iframe
              srcDoc={srcDoc}
              sandbox="allow-scripts"
              className="w-full h-[520px] rounded-lg border border-base-600 bg-white"
              title="HTML Preview"
            />
          </div>
        )}
      </div>
    </div>
  )
}
