import { useState } from 'react'
import { useCopy } from '../hooks/useCopy.js'

const encode = (str) => str.replace(/[&<>"'`=\/]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;','`':'&#96;','=':'&#61;','/':'&#47;'}[s]))
const decode = (str) => {
  const el = document.createElement('textarea')
  el.innerHTML = str
  return el.value
}

export default function HtmlEntities() {
  const [input, setInput] = useState('')
  const [mode, setMode] = useState('encode')
  const { copy, copied } = useCopy()

  const output = input ? (mode === 'encode' ? encode(input) : decode(input)) : ''

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {['encode', 'decode'].map(m => (
          <button key={m} onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-lg text-sm font-mono border transition-all ${mode === m ? 'bg-lime-400 text-base-950 border-lime-400' : 'btn-secondary'}`}>
            {m}
          </button>
        ))}
      </div>
      <div>
        <p className="section-label">{mode === 'encode' ? 'Raw HTML input' : 'Encoded input'}</p>
        <textarea className="tool-textarea h-36" placeholder={mode === 'encode' ? '<p>Hello "world" & <friends></p>' : '&lt;p&gt;Hello &quot;world&quot;&lt;/p&gt;'}
          value={input} onChange={e => setInput(e.target.value)} />
      </div>
      <div>
        <div className="flex justify-between mb-2">
          <p className="section-label">{mode === 'encode' ? 'Encoded output' : 'Decoded output'}</p>
          {output && <button className="copy-btn" onClick={() => copy(output)}>{copied ? '✓ copied' : 'copy'}</button>}
        </div>
        <div className="output-box">{output || <span className="text-zinc-700">Output will appear here...</span>}</div>
      </div>

      <div className="bg-base-900 border border-base-700 rounded-lg p-4">
        <p className="section-label mb-3">Common entities</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[['&amp;','&'],['&lt;','<'],['&gt;','>'],['&quot;','"'],['&apos;',"'"],['&nbsp;',' '],['&copy;','©'],['&reg;','®'],['&trade;','™']].map(([entity, char]) => (
            <div key={entity} className="flex items-center justify-between bg-base-850 rounded px-3 py-2 text-xs font-mono">
              <span className="text-lime-400">{entity}</span>
              <span className="text-zinc-500">→ {char}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
