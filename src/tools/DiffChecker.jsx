import { useState, useMemo } from 'react'

function diffLines(a, b) {
  const aLines = a.split('\n')
  const bLines = b.split('\n')
  const result = []
  const maxLen = Math.max(aLines.length, bLines.length)
  for (let i = 0; i < maxLen; i++) {
    const al = aLines[i]
    const bl = bLines[i]
    if (al === undefined) result.push({ type: 'added', line: bl, lineNo: i + 1 })
    else if (bl === undefined) result.push({ type: 'removed', line: al, lineNo: i + 1 })
    else if (al !== bl) {
      result.push({ type: 'removed', line: al, lineNo: i + 1 })
      result.push({ type: 'added', line: bl, lineNo: i + 1 })
    } else {
      result.push({ type: 'same', line: al, lineNo: i + 1 })
    }
  }
  return result
}

export default function DiffChecker() {
  const [left, setLeft] = useState('Hello World\nThis is line two\nSame line here\nOnly in left')
  const [right, setRight] = useState('Hello World!\nThis is line 2\nSame line here\nOnly in right')

  const diff = useMemo(() => diffLines(left, right), [left, right])
  const added = diff.filter(d => d.type === 'added').length
  const removed = diff.filter(d => d.type === 'removed').length

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="section-label">Original</p>
          <textarea className="tool-textarea h-48" value={left} onChange={e => setLeft(e.target.value)} />
        </div>
        <div>
          <p className="section-label">Modified</p>
          <textarea className="tool-textarea h-48" value={right} onChange={e => setRight(e.target.value)} />
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs font-mono">
        <span className="px-2 py-1 rounded bg-red-950/40 text-red-400 border border-red-900/50">— {removed} removed</span>
        <span className="px-2 py-1 rounded bg-lime-400/10 text-lime-400 border border-lime-400/20">+ {added} added</span>
        <span className="text-zinc-600">{diff.filter(d => d.type === 'same').length} unchanged</span>
      </div>

      <div className="bg-base-950 border border-base-600 rounded-lg overflow-hidden">
        <div className="overflow-auto max-h-[400px]">
          {diff.map((d, i) => (
            <div key={i} className={`flex items-start text-xs font-mono px-0 py-0.5 ${
              d.type === 'added' ? 'bg-lime-400/8' :
              d.type === 'removed' ? 'bg-red-500/8' : ''
            }`}>
              <span className="w-8 text-zinc-700 text-right pr-3 pt-0.5 select-none shrink-0">{d.lineNo}</span>
              <span className={`w-4 shrink-0 pt-0.5 ${
                d.type === 'added' ? 'text-lime-400' :
                d.type === 'removed' ? 'text-red-400' : 'text-zinc-700'
              }`}>{d.type === 'added' ? '+' : d.type === 'removed' ? '−' : ' '}</span>
              <span className={`flex-1 pr-4 py-0.5 whitespace-pre-wrap break-all ${
                d.type === 'added' ? 'text-lime-300' :
                d.type === 'removed' ? 'text-red-400' : 'text-zinc-500'
              }`}>{d.line}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
