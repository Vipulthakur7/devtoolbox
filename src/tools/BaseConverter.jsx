import { useState } from 'react'
import { useCopy } from '../hooks/useCopy.js'

const BASES = [
  { label: 'Binary', base: 2, prefix: '0b', placeholder: '1010' },
  { label: 'Octal', base: 8, prefix: '0o', placeholder: '12' },
  { label: 'Decimal', base: 10, prefix: '', placeholder: '42' },
  { label: 'Hex', base: 16, prefix: '0x', placeholder: '2A' },
]

export default function BaseConverter() {
  const [value, setValue] = useState('')
  const [fromBase, setFromBase] = useState(10)
  const { copy } = useCopy()
  const [copiedKey, setCopiedKey] = useState('')

  const n = value.trim() ? parseInt(value.trim(), fromBase) : NaN
  const valid = !isNaN(n) && isFinite(n)

  const copyVal = (key, val) => { copy(val); setCopiedKey(key); setTimeout(() => setCopiedKey(''), 1500) }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex-1">
          <p className="section-label">Input value</p>
          <input
            className="tool-input"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={`Enter a ${BASES.find(b => b.base === fromBase)?.label.toLowerCase()} number...`}
          />
        </div>
        <div>
          <p className="section-label">From base</p>
          <div className="flex gap-1.5">
            {BASES.map(({ label, base }) => (
              <button key={base} onClick={() => setFromBase(base)}
                className={`badge cursor-pointer transition-all ${fromBase === base ? '!bg-lime-400/20 !text-lime-400 !border-lime-400/30' : ''}`}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {value && !valid && <div className="error-box">Invalid {BASES.find(b => b.base === fromBase)?.label.toLowerCase()} number</div>}

      <div className="space-y-2">
        {BASES.map(({ label, base, prefix }) => {
          const converted = valid ? n.toString(base).toUpperCase() : '—'
          const withPrefix = valid ? prefix + converted : '—'
          return (
            <div key={base} className={`flex items-center bg-base-950 border rounded-lg px-4 py-3 group transition-colors ${fromBase === base ? 'border-lime-400/30' : 'border-base-600'}`}>
              <span className="text-xs font-mono text-lime-400 w-20 shrink-0">{label} (base {base})</span>
              <span className="font-mono text-sm text-zinc-300 flex-1">{converted}</span>
              {valid && (
                <button className="copy-btn opacity-0 group-hover:opacity-100" onClick={() => copyVal(label, withPrefix)}>
                  {copiedKey === label ? '✓' : 'copy'}
                </button>
              )}
            </div>
          )
        })}
      </div>

      {valid && (
        <div className="bg-base-900 border border-base-700 rounded-lg p-4">
          <p className="section-label mb-3">Bit representation</p>
          <div className="font-mono text-xs text-zinc-400 break-all">
            {n.toString(2).padStart(Math.ceil(n.toString(2).length / 8) * 8, '0').split('').map((bit, i) => (
              <span key={i} className={bit === '1' ? 'text-lime-400' : 'text-zinc-700'}>
                {bit}{(i + 1) % 8 === 0 ? ' ' : ''}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
