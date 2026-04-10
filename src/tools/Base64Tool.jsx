import { useState } from 'react'
import { useCopy } from '../hooks/useCopy.js'

export default function Base64Tool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [mode, setMode] = useState('encode')
  const { copy, copied } = useCopy()

  const process = (val, m) => {
    const v = val ?? input
    const md = m ?? mode
    setError('')
    try {
      if (md === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(v))))
      } else {
        setOutput(decodeURIComponent(escape(atob(v.trim()))))
      }
    } catch (e) {
      setError('Invalid input for ' + md)
      setOutput('')
    }
  }

  const handleInput = (v) => {
    setInput(v)
    process(v, mode)
  }

  const setModeAndProcess = (m) => {
    setMode(m)
    process(input, m)
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {['encode', 'decode'].map(m => (
          <button
            key={m}
            onClick={() => setModeAndProcess(m)}
            className={`px-4 py-2 rounded-lg text-sm font-mono border transition-all ${
              mode === m ? 'bg-lime-400 text-base-950 border-lime-400' : 'btn-secondary'
            }`}
          >{m}</button>
        ))}
      </div>

      <div>
        <p className="section-label">{mode === 'encode' ? 'Plain text input' : 'Base64 input'}</p>
        <textarea
          className="tool-textarea h-36"
          placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
          value={input}
          onChange={e => handleInput(e.target.value)}
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="section-label">{mode === 'encode' ? 'Base64 output' : 'Decoded output'}</p>
          {output && <button className="copy-btn" onClick={() => copy(output)}>{copied ? '✓ copied' : 'copy'}</button>}
        </div>
        {error ? <div className="error-box">{error}</div> : (
          <div className="output-box min-h-[80px] break-all">{output}</div>
        )}
      </div>
    </div>
  )
}
