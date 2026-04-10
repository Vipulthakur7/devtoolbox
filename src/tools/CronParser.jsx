import { useState } from 'react'

const FIELDS = ['minute', 'hour', 'day of month', 'month', 'day of week']
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

const PRESETS = [
  { label: 'Every minute', value: '* * * * *' },
  { label: 'Every hour', value: '0 * * * *' },
  { label: 'Every day at midnight', value: '0 0 * * *' },
  { label: 'Every day at noon', value: '0 12 * * *' },
  { label: 'Every Monday 9am', value: '0 9 * * 1' },
  { label: 'Every weekday 8am', value: '0 8 * * 1-5' },
  { label: 'Every Sunday midnight', value: '0 0 * * 0' },
  { label: 'First of month midnight', value: '0 0 1 * *' },
  { label: 'Every 15 minutes', value: '*/15 * * * *' },
  { label: 'Every 6 hours', value: '0 */6 * * *' },
]

const parseField = (val, min, max, names) => {
  if (val === '*') return `every ${FIELDS[0] || 'unit'}`
  if (val.startsWith('*/')) {
    const step = val.slice(2)
    return `every ${step} units`
  }
  if (val.includes('-')) {
    const [a, b] = val.split('-')
    const na = names ? names[+a] : a
    const nb = names ? names[+b] : b
    return `${na} through ${nb}`
  }
  if (val.includes(',')) {
    return val.split(',').map(v => names ? names[+v] ?? v : v).join(', ')
  }
  return names ? names[+val] ?? val : val
}

const humanize = (expr) => {
  const parts = expr.trim().split(/\s+/)
  if (parts.length !== 5) return null

  const [min, hr, dom, mo, dow] = parts

  const minuteStr = min === '*' ? 'every minute' : min.startsWith('*/') ? `every ${min.slice(2)} minutes` : `at minute ${min}`
  const hourStr = hr === '*' ? 'every hour' : hr.startsWith('*/') ? `every ${hr.slice(2)} hours` : `at ${hr}:00`
  const domStr = dom === '*' ? '' : dom === '1' ? 'on the 1st of the month' : `on day ${dom} of the month`
  const moStr = mo === '*' ? '' : `in ${mo.split(',').map(m => MONTHS[+m - 1] ?? m).join(', ')}`
  const dowStr = dow === '*' ? '' : `on ${dow.split(',').map(d => DAYS[+d] ?? d).join(', ')}`

  const parts2 = [minuteStr, hourStr !== 'every hour' ? hourStr : '', domStr, moStr, dowStr].filter(Boolean)
  return parts2.join(', ')
}

export default function CronParser() {
  const [expr, setExpr] = useState('0 9 * * 1-5')

  const parts = expr.trim().split(/\s+/)
  const valid = parts.length === 5
  const human = valid ? humanize(expr) : null

  const nextRuns = () => {
    if (!valid) return []
    const [min, hr] = parts
    const results = []
    const d = new Date()
    d.setSeconds(0, 0)
    for (let i = 0; i < 200 && results.length < 5; i++) {
      d.setMinutes(d.getMinutes() + 1)
      const m = d.getMinutes(), h = d.getHours(), day = d.getDay()
      const matchMin = min === '*' || (min.startsWith('*/') ? m % +min.slice(2) === 0 : +min === m)
      const matchHr = hr === '*' || (hr.startsWith('*/') ? h % +hr.slice(2) === 0 : +hr === h)
      if (matchMin && matchHr) results.push(new Date(d))
    }
    return results
  }

  const runs = nextRuns()

  return (
    <div className="space-y-5">
      <div>
        <p className="section-label">Cron expression</p>
        <div className="flex gap-2">
          <input className="tool-input font-mono text-lg flex-1" value={expr} onChange={e => setExpr(e.target.value)} placeholder="* * * * *" />
        </div>
        <div className="flex gap-4 mt-2">
          {FIELDS.map((f, i) => (
            <div key={f} className="text-center flex-1">
              <div className="text-xs font-mono text-lime-400">{parts[i] || '-'}</div>
              <div className="text-xs text-zinc-700">{f}</div>
            </div>
          ))}
        </div>
      </div>

      {human && (
        <div className="bg-lime-400/10 border border-lime-400/20 rounded-lg px-4 py-3">
          <p className="text-xs font-mono text-zinc-500 mb-1">Human readable</p>
          <p className="text-sm text-lime-300 font-sans capitalize">{human}</p>
        </div>
      )}

      {!valid && expr && <div className="error-box">A cron expression needs exactly 5 fields</div>}

      <div>
        <p className="section-label">Quick presets</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map(({ label, value }) => (
            <button key={value} onClick={() => setExpr(value)}
              className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-all ${expr === value ? 'bg-lime-400/20 text-lime-400 border-lime-400/30' : 'bg-base-800 border-base-600 text-zinc-400 hover:border-zinc-500'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {runs.length > 0 && (
        <div>
          <p className="section-label">Next {runs.length} runs (approx.)</p>
          <div className="space-y-1">
            {runs.map((d, i) => (
              <div key={i} className="flex items-center gap-3 text-sm font-mono px-4 py-2 bg-base-950 border border-base-700 rounded-lg">
                <span className="text-zinc-600 w-4">{i + 1}</span>
                <span className="text-zinc-300">{d.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
