import { useState, useEffect } from 'react'
import { useCopy } from '../hooks/useCopy.js'

export default function TimestampConverter() {
  const [unix, setUnix] = useState('')
  const [now, setNow] = useState(Date.now())
  const { copy } = useCopy()
  const [copiedKey, setCopiedKey] = useState('')

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const ts = unix ? Number(unix) : null
  const ms = ts && ts < 1e12 ? ts * 1000 : ts
  const d = ms ? new Date(ms) : null
  const valid = d && !isNaN(d)

  const copyVal = (key, val) => { copy(val); setCopiedKey(key); setTimeout(() => setCopiedKey(''), 1500) }

  const rows = valid ? [
    { label: 'UTC', value: d.toUTCString() },
    { label: 'ISO 8601', value: d.toISOString() },
    { label: 'Local', value: d.toLocaleString() },
    { label: 'Date', value: d.toLocaleDateString() },
    { label: 'Time', value: d.toLocaleTimeString() },
    { label: 'Relative', value: (() => {
        const diff = Math.round((Date.now() - ms) / 1000)
        if (Math.abs(diff) < 60) return `${diff > 0 ? diff + 's ago' : 'in ' + Math.abs(diff) + 's'}`
        const m = Math.round(diff / 60)
        if (Math.abs(m) < 60) return `${m > 0 ? m + ' min ago' : 'in ' + Math.abs(m) + ' min'}`
        const h = Math.round(m / 60)
        if (Math.abs(h) < 24) return `${h > 0 ? h + 'h ago' : 'in ' + Math.abs(h) + 'h'}`
        const day = Math.round(h / 24)
        return `${day > 0 ? day + ' days ago' : 'in ' + Math.abs(day) + ' days'}`
      })()
    },
  ] : []

  return (
    <div className="space-y-4">
      <div className="bg-base-900 border border-base-700 rounded-lg px-4 py-3 flex items-center justify-between">
        <span className="text-xs font-mono text-zinc-500">Current Unix timestamp</span>
        <div className="flex items-center gap-3">
          <span className="font-mono text-lime-400 text-sm tabular-nums">{Math.floor(now / 1000)}</span>
          <button className="copy-btn" onClick={() => copyVal('now', Math.floor(now / 1000).toString())}>
            {copiedKey === 'now' ? '✓' : 'copy'}
          </button>
        </div>
      </div>

      <div>
        <p className="section-label">Unix timestamp to convert</p>
        <div className="flex gap-2">
          <input
            className="tool-input flex-1"
            placeholder="e.g. 1714492800 or 1714492800000"
            value={unix}
            onChange={e => setUnix(e.target.value)}
          />
          <button className="btn-secondary" onClick={() => setUnix(Math.floor(now / 1000).toString())}>
            Now
          </button>
        </div>
      </div>

      {ts && !valid && <div className="error-box">Invalid timestamp</div>}

      {valid && (
        <div className="space-y-1.5">
          {rows.map(({ label, value }) => (
            <div key={label} className="flex items-center bg-base-950 border border-base-600 rounded-lg px-4 py-2.5 group">
              <span className="text-xs font-mono text-lime-400 w-24 shrink-0">{label}</span>
              <span className="font-mono text-sm text-zinc-300 flex-1">{value}</span>
              <button className="copy-btn opacity-0 group-hover:opacity-100" onClick={() => copyVal(label, value)}>
                {copiedKey === label ? '✓' : 'copy'}
              </button>
            </div>
          ))}
        </div>
      )}

      <div>
        <p className="section-label mt-2">Date → Unix timestamp</p>
        <input
          type="datetime-local"
          className="tool-input"
          onChange={e => {
            if (e.target.value) setUnix(Math.floor(new Date(e.target.value).getTime() / 1000).toString())
          }}
        />
      </div>
    </div>
  )
}
