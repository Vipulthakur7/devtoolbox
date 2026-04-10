import { useState } from 'react'
import { useCopy } from '../hooks/useCopy.js'

const toWords = (s) => s.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[_\-\.]+/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase().split(' ')

const converters = [
  { label: 'camelCase', fn: s => { const w = toWords(s); return w[0] + w.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('') } },
  { label: 'PascalCase', fn: s => toWords(s).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('') },
  { label: 'snake_case', fn: s => toWords(s).join('_') },
  { label: 'SCREAMING_SNAKE', fn: s => toWords(s).join('_').toUpperCase() },
  { label: 'kebab-case', fn: s => toWords(s).join('-') },
  { label: 'SCREAMING-KEBAB', fn: s => toWords(s).join('-').toUpperCase() },
  { label: 'dot.case', fn: s => toWords(s).join('.') },
  { label: 'Title Case', fn: s => toWords(s).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') },
  { label: 'UPPERCASE', fn: s => s.toUpperCase() },
  { label: 'lowercase', fn: s => s.toLowerCase() },
  { label: 'Sentence case', fn: s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() },
  { label: 'aLtErNaTiNg', fn: s => s.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('') },
]

export default function CaseConverter() {
  const [input, setInput] = useState('hello world example')
  const { copy } = useCopy()
  const [copiedKey, setCopiedKey] = useState('')

  const copyVal = (key, val) => { copy(val); setCopiedKey(key); setTimeout(() => setCopiedKey(''), 1500) }

  return (
    <div className="space-y-4">
      <div>
        <p className="section-label">Input text</p>
        <input className="tool-input" value={input} onChange={e => setInput(e.target.value)} placeholder="Type or paste text..." />
      </div>
      <div className="space-y-1.5">
        {converters.map(({ label, fn }) => {
          const result = input ? fn(input) : ''
          return (
            <div key={label} className="flex items-center bg-base-950 border border-base-600 rounded-lg px-4 py-2.5 group">
              <span className="text-xs font-mono text-lime-400 w-36 shrink-0">{label}</span>
              <span className="font-mono text-sm text-zinc-300 flex-1 truncate">{result}</span>
              {result && (
                <button className="copy-btn opacity-0 group-hover:opacity-100" onClick={() => copyVal(label, result)}>
                  {copiedKey === label ? '✓' : 'copy'}
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
