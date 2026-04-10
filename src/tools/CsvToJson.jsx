import { useState } from 'react'
import { useCopy } from '../hooks/useCopy.js'

const SAMPLE = `name,age,city
Alice,30,Delhi
Bob,25,Mumbai
Carol,35,Bangalore`

export default function CsvToJson() {
  const [input, setInput] = useState(SAMPLE)
  const [delimiter, setDelimiter] = useState(',')
  const [indent, setIndent] = useState(2)
  const [error, setError] = useState('')
  const { copy, copied } = useCopy()

  const convert = () => {
    try {
      const lines = input.trim().split('\n').filter(Boolean)
      if (!lines.length) return ''
      const headers = lines[0].split(delimiter).map(h => h.trim().replace(/^"|"$/g, ''))
      const data = lines.slice(1).map(line => {
        const vals = line.split(delimiter).map(v => v.trim().replace(/^"|"$/g, ''))
        return headers.reduce((obj, h, i) => {
          const v = vals[i] ?? ''
          obj[h] = isNaN(v) || v === '' ? v : Number(v)
          return obj
        }, {})
      })
      setError('')
      return JSON.stringify(data, null, indent)
    } catch (e) {
      setError(e.message)
      return ''
    }
  }

  const output = convert()

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="section-label mb-0">Delimiter:</span>
          {[',', ';', '\t', '|'].map(d => (
            <button key={d} onClick={() => setDelimiter(d)}
              className={`badge cursor-pointer ${delimiter === d ? '!bg-lime-400/20 !text-lime-400 !border-lime-400/30' : ''}`}>
              {d === '\t' ? 'TAB' : d}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <span className="section-label mb-0">Indent:</span>
          {[2, 4].map(n => (
            <button key={n} onClick={() => setIndent(n)}
              className={`badge cursor-pointer ${indent === n ? '!bg-lime-400/20 !text-lime-400 !border-lime-400/30' : ''}`}>
              {n}sp
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="section-label">CSV input</p>
          <textarea className="tool-textarea h-64" value={input} onChange={e => setInput(e.target.value)} />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <p className="section-label">JSON output</p>
            {output && <button className="copy-btn" onClick={() => copy(output)}>{copied ? '✓ copied' : 'copy'}</button>}
          </div>
          {error ? <div className="error-box">{error}</div> : (
            <div className="output-box h-64 overflow-auto">{output}</div>
          )}
        </div>
      </div>
    </div>
  )
}
