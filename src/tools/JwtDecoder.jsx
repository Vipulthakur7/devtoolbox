import { useState } from 'react'
import { useCopy } from '../hooks/useCopy.js'

const decodeJWT = (token) => {
  const parts = token.trim().split('.')
  if (parts.length !== 3) throw new Error('JWT must have 3 parts separated by dots')
  const decode = (str) => {
    const pad = str.length % 4
    const padded = pad ? str + '='.repeat(4 - pad) : str
    return JSON.parse(atob(padded.replace(/-/g, '+').replace(/_/g, '/')))
  }
  return {
    header: decode(parts[0]),
    payload: decode(parts[1]),
    signature: parts[2],
  }
}

export default function JwtDecoder() {
  const [token, setToken] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const { copy, copied } = useCopy()

  const decode = () => {
    try {
      setResult(decodeJWT(token))
      setError('')
    } catch (e) {
      setError(e.message)
      setResult(null)
    }
  }

  const getExpiry = (payload) => {
    if (!payload.exp) return null
    const d = new Date(payload.exp * 1000)
    const expired = d < new Date()
    return { date: d.toLocaleString(), expired }
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="section-label">JWT Token</p>
        <textarea
          className="tool-textarea h-24"
          placeholder="Paste your JWT token here..."
          value={token}
          onChange={e => setToken(e.target.value)}
        />
      </div>
      <button className="btn-primary" onClick={decode}>Decode</button>

      {error && <div className="error-box">{error}</div>}

      {result && (
        <div className="space-y-4">
          {result.payload.exp && (() => {
            const exp = getExpiry(result.payload)
            return (
              <div className={`px-4 py-2.5 rounded-lg border text-sm font-mono ${
                exp.expired ? 'bg-red-950/30 border-red-800/40 text-red-400' : 'bg-lime-400/10 border-lime-400/20 text-lime-400'
              }`}>
                {exp.expired ? '⚠ Expired' : '✓ Valid'} · Expires {exp.date}
              </div>
            )
          })()}

          {[['Header', result.header], ['Payload', result.payload]].map(([label, data]) => (
            <div key={label}>
              <div className="flex justify-between mb-2">
                <p className="section-label">{label}</p>
                <button className="copy-btn" onClick={() => copy(JSON.stringify(data, null, 2))}>copy</button>
              </div>
              <div className="output-box">{JSON.stringify(data, null, 2)}</div>
            </div>
          ))}

          <div>
            <p className="section-label">Signature</p>
            <div className="output-box break-all text-zinc-500">{result.signature}</div>
          </div>
        </div>
      )}
    </div>
  )
}
