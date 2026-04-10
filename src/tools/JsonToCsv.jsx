import { useState } from 'react'
import { useCopy } from '../hooks/useCopy.js'

const SAMPLE = `[
  {"name": "Alice", "age": 30, "city": "Delhi"},
  {"name": "Bob", "age": 25, "city": "Mumbai"},
  {"name": "Carol", "age": 35, "city": "Bangalore"}
]`

export default function JsonToCsv() {
  const [input, setInput] = useState(SAMPLE)
  const [delimiter, setDelimiter] = useState(',')
  const [error, setError] = useState('')
  const { copy, copied } = useCopy()

  const convert = () => {
    try {
      const data = JSON.parse(input)
      if (!Array.isArray(data)) throw new Error('Input must be a JSON array')
      if (data.length === 0) return ''
      const keys = [...new Set(data.flatMap(Object.keys))]
      const escape = (v) => {
        const s = v == null ? '' : String(v)
        return s.includes(delimiter) || s.includes('"') || s.includes('\n')
          ? `"${s.replace(/"/g, '""')}"` : s
      }
      const rows = [keys.join(delimiter), ...data.map(row => keys.map(k => escape(row[k])).join(delimiter))]
      setError('')
      return rows.join('\n')
    } catch (e) {
      setError(e.message)
      return ''
    }
  }

  const output = convert()

  const downloadCsv = () => {
    const blob = new Blob([output], { type: 'text/csv' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'data.csv'
    a.click()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="section-label mb-0">Delimiter:</span>
        {[',', ';', '\t', '|'].map(d => (
          <button key={d} onClick={() => setDelimiter(d)}
            className={`badge cursor-pointer ${delimiter === d ? '!bg-lime-400/20 !text-lime-400 !border-lime-400/30' : ''}`}>
            {d === '\t' ? 'TAB' : d}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="section-label">JSON Array input</p>
          <textarea className="tool-textarea h-64" value={input} onChange={e => setInput(e.target.value)} />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <p className="section-label">CSV output</p>
            <div className="flex gap-2">
              {output && <><button className="copy-btn" onClick={() => copy(output)}>{copied ? '✓' : 'copy'}</button>
              <button className="copy-btn" onClick={downloadCsv}>download</button></>}
            </div>
          </div>
          {error ? <div className="error-box">{error}</div> : (
            <div className="output-box h-64 overflow-auto">{output}</div>
          )}
        </div>
      </div>
    </div>
  )
}
