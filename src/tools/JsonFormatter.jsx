import { useState } from 'react'
import { useCopy } from '../hooks/useCopy.js'

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [indent, setIndent] = useState(2)
  const { copy, copied } = useCopy()

  const format = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, indent))
      setError('')
    } catch (e) {
      setError(e.message)
      setOutput('')
    }
  }

  const minify = () => {
    try {
      setOutput(JSON.stringify(JSON.parse(input)))
      setError('')
    } catch (e) {
      setError(e.message)
    }
  }

  const sortKeys = () => {
    try {
      const sort = (obj) => {
        if (Array.isArray(obj)) return obj.map(sort)
        if (obj !== null && typeof obj === 'object') {
          return Object.keys(obj).sort().reduce((acc, k) => { acc[k] = sort(obj[k]); return acc }, {})
        }
        return obj
      }
      setOutput(JSON.stringify(sort(JSON.parse(input)), null, indent))
      setError('')
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="section-label">Input JSON</span>
          </div>
          <textarea
            className="tool-textarea h-72"
            placeholder='{"key": "value"}'
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="section-label">Output</span>
            {output && <button className="copy-btn" onClick={() => copy(output)}>{copied ? '✓ copied' : 'copy'}</button>}
          </div>
          {error ? <div className="error-box">{error}</div> : (
            <div className="output-box h-72 overflow-auto">{output}</div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <button className="btn-primary" onClick={format}>Format</button>
        <button className="btn-secondary" onClick={minify}>Minify</button>
        <button className="btn-secondary" onClick={sortKeys}>Sort Keys</button>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs text-zinc-500 font-mono">Indent:</span>
          {[2, 4, '\t'].map(n => (
            <button
              key={n}
              onClick={() => setIndent(n)}
              className={`badge cursor-pointer transition-colors ${indent === n ? '!bg-lime-400/20 !text-lime-400 !border-lime-400/30' : ''}`}
            >{n === '\t' ? 'tab' : `${n}sp`}</button>
          ))}
        </div>
      </div>
    </div>
  )
}
