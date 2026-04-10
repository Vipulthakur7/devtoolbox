import { useState, useCallback } from 'react'
import { useCopy } from '../hooks/useCopy.js'

const CHARS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  digits: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  ambiguous: 'O0Il1',
}

const getStrength = (password) => {
  let score = 0
  if (password.length >= 12) score++
  if (password.length >= 16) score++
  if (/[A-Z]/.test(password)) score++
  if (/[a-z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  if (score <= 2) return { label: 'Weak', color: 'text-red-400', bars: 1 }
  if (score <= 4) return { label: 'Fair', color: 'text-amber-400', bars: 2 }
  if (score <= 5) return { label: 'Strong', color: 'text-lime-400', bars: 3 }
  return { label: 'Very strong', color: 'text-lime-400', bars: 4 }
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [options, setOptions] = useState({ upper: true, lower: true, digits: true, symbols: true, noAmbiguous: false })
  const [count, setCount] = useState(5)
  const [passwords, setPasswords] = useState([])
  const { copy } = useCopy()
  const [copiedKey, setCopiedKey] = useState('')

  const generate = useCallback(() => {
    let charset = ''
    if (options.upper) charset += CHARS.upper
    if (options.lower) charset += CHARS.lower
    if (options.digits) charset += CHARS.digits
    if (options.symbols) charset += CHARS.symbols
    if (options.noAmbiguous) charset = charset.split('').filter(c => !CHARS.ambiguous.includes(c)).join('')
    if (!charset) return

    const arr = new Uint32Array(length * count)
    crypto.getRandomValues(arr)
    const list = Array.from({ length: count }, (_, i) =>
      Array.from({ length }, (_, j) => charset[arr[i * length + j] % charset.length]).join('')
    )
    setPasswords(list)
  }, [length, options, count])

  const copyPw = (key, val) => { copy(val); setCopiedKey(key); setTimeout(() => setCopiedKey(''), 1500) }

  return (
    <div className="space-y-5">
      <div>
        <div className="flex justify-between mb-2">
          <p className="section-label">Length: {length}</p>
        </div>
        <input type="range" min="4" max="128" value={length} onChange={e => setLength(+e.target.value)} className="w-full accent-lime-400" />
        <div className="flex justify-between text-xs font-mono text-zinc-700 mt-1">
          <span>4</span><span>32</span><span>64</span><span>128</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {[
          ['upper', 'A–Z uppercase'],
          ['lower', 'a–z lowercase'],
          ['digits', '0–9 digits'],
          ['symbols', '!@# symbols'],
          ['noAmbiguous', 'No ambiguous (0, O, I, l)'],
        ].map(([key, label]) => (
          <label key={key} className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer">
            <input type="checkbox" checked={options[key]}
              onChange={e => setOptions(o => ({ ...o, [key]: e.target.checked }))} className="accent-lime-400" />
            {label}
          </label>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="section-label mb-0">Count:</span>
          <input type="number" min="1" max="20" value={count} onChange={e => setCount(Math.min(20, Math.max(1, +e.target.value)))}
            className="tool-input w-16 text-center" />
        </div>
        <button className="btn-primary" onClick={generate}>Generate</button>
      </div>

      {passwords.length > 0 && (
        <div className="space-y-2">
          {passwords.map((pw, i) => {
            const strength = getStrength(pw)
            return (
              <div key={i} className="bg-base-950 border border-base-600 rounded-lg px-4 py-3 flex items-center gap-3 group">
                <span className="font-mono text-sm text-zinc-300 flex-1 break-all">{pw}</span>
                <span className={`text-xs font-mono shrink-0 ${strength.color}`}>{strength.label}</span>
                <button className="copy-btn opacity-0 group-hover:opacity-100 shrink-0"
                  onClick={() => copyPw(i, pw)}>{copiedKey === i ? '✓' : 'copy'}</button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
