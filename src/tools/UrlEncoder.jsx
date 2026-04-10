import { useState } from 'react'
import { useCopy } from '../hooks/useCopy.js'

export default function UrlEncoder() {
  const [input, setInput] = useState('')
  const { copy, copied } = useCopy()
  const encoded = (() => { try { return encodeURIComponent(input) } catch { return '' } })()
  const decoded = (() => { try { return decodeURIComponent(input) } catch { return 'Invalid URL encoding' } })()

  return (
    <div className="space-y-4">
      <div>
        <p className="section-label">Input</p>
        <textarea
          className="tool-textarea h-28"
          placeholder="Enter a URL or URL-encoded string..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between mb-2">
            <p className="section-label">Encoded</p>
            <button className="copy-btn" onClick={() => copy(encoded)}>{copied ? '✓' : 'copy'}</button>
          </div>
          <div className="output-box break-all">{encoded}</div>
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <p className="section-label">Decoded</p>
          </div>
          <div className="output-box break-all">{decoded}</div>
        </div>
      </div>
    </div>
  )
}
