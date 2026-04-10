import { useState } from 'react'
import { useCopy } from '../hooks/useCopy.js'

export default function UuidGenerator() {
  const [count, setCount] = useState(5)
  const [uuids, setUuids] = useState([])
  const [uppercase, setUppercase] = useState(false)
  const [noDashes, setNoDashes] = useState(false)
  const { copy, copied } = useCopy()

  const generate = () => {
    const list = Array.from({ length: count }, () => {
      let id = crypto.randomUUID()
      if (noDashes) id = id.replace(/-/g, '')
      if (uppercase) id = id.toUpperCase()
      return id
    })
    setUuids(list)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="section-label mb-0">Count:</span>
          <input
            type="number" min="1" max="100"
            value={count}
            onChange={e => setCount(Math.min(100, Math.max(1, +e.target.value)))}
            className="tool-input w-20 text-center"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer">
          <input type="checkbox" checked={uppercase} onChange={e => setUppercase(e.target.checked)} className="accent-lime-400" />
          Uppercase
        </label>
        <label className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer">
          <input type="checkbox" checked={noDashes} onChange={e => setNoDashes(e.target.checked)} className="accent-lime-400" />
          No dashes
        </label>
        <button className="btn-primary" onClick={generate}>Generate</button>
      </div>

      {uuids.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="section-label">{uuids.length} UUIDs generated</p>
            <button className="copy-btn" onClick={() => copy(uuids.join('\n'))}>{copied ? '✓ copied all' : 'copy all'}</button>
          </div>
          <div className="bg-base-950 border border-base-600 rounded-lg divide-y divide-base-700">
            {uuids.map((id, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-2.5 group">
                <span className="font-mono text-sm text-zinc-300">{id}</span>
                <button
                  className="copy-btn opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => copy(id)}
                >copy</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {uuids.length === 0 && (
        <div className="border border-dashed border-base-600 rounded-lg p-10 text-center text-zinc-600 font-mono text-sm">
          Click Generate to create UUIDs
        </div>
      )}
    </div>
  )
}
