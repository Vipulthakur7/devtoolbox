import { useState, useEffect } from 'react'
import CryptoJS from 'crypto-js'
import { useCopy } from '../hooks/useCopy.js'

const ALGOS = ['MD5', 'SHA1', 'SHA256', 'SHA512', 'SHA3']

export default function HashGenerator() {
  const [input, setInput] = useState('')
  const [hashes, setHashes] = useState({})
  const [hmacKey, setHmacKey] = useState('')
  const [useHmac, setUseHmac] = useState(false)
  const { copy, copied } = useCopy()
  const [copiedKey, setCopiedKey] = useState('')

  useEffect(() => {
    if (!input) { setHashes({}); return }
    const result = {}
    ALGOS.forEach(algo => {
      try {
        result[algo] = useHmac && hmacKey
          ? CryptoJS['Hmac' + algo](input, hmacKey).toString()
          : CryptoJS[algo](input).toString()
      } catch {
        result[algo] = '—'
      }
    })
    setHashes(result)
  }, [input, hmacKey, useHmac])

  const copyHash = (algo, val) => {
    copy(val)
    setCopiedKey(algo)
    setTimeout(() => setCopiedKey(''), 1500)
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="section-label">Input string</p>
        <textarea
          className="tool-textarea h-28"
          placeholder="Enter text to hash..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer">
          <input type="checkbox" checked={useHmac} onChange={e => setUseHmac(e.target.checked)} className="accent-lime-400" />
          HMAC mode
        </label>
        {useHmac && (
          <input
            className="tool-input flex-1"
            placeholder="HMAC secret key..."
            value={hmacKey}
            onChange={e => setHmacKey(e.target.value)}
          />
        )}
      </div>

      <div className="space-y-2">
        {ALGOS.map(algo => (
          <div key={algo} className="bg-base-950 border border-base-600 rounded-lg px-4 py-3 flex items-center gap-4 group">
            <span className="text-xs font-mono text-lime-400 w-16 shrink-0">{algo}</span>
            <span className="font-mono text-xs text-zinc-400 flex-1 truncate break-all">
              {hashes[algo] || <span className="text-zinc-700">—</span>}
            </span>
            {hashes[algo] && (
              <button
                className="copy-btn opacity-0 group-hover:opacity-100 shrink-0"
                onClick={() => copyHash(algo, hashes[algo])}
              >{copiedKey === algo ? '✓' : 'copy'}</button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
