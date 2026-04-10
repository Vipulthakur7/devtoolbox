import { useState, useMemo } from 'react'

export default function RegexTester() {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('g')
  const [testStr, setTestStr] = useState('')

  const result = useMemo(() => {
    if (!pattern) return { matches: [], error: null }
    try {
      const re = new RegExp(pattern, flags)
      const matches = []
      let m
      if (flags.includes('g')) {
        while ((m = re.exec(testStr)) !== null) {
          matches.push({ index: m.index, match: m[0], groups: m.slice(1) })
          if (m[0].length === 0) re.lastIndex++
        }
      } else {
        m = re.exec(testStr)
        if (m) matches.push({ index: m.index, match: m[0], groups: m.slice(1) })
      }
      return { matches, error: null }
    } catch (e) {
      return { matches: [], error: e.message }
    }
  }, [pattern, flags, testStr])

  const highlighted = useMemo(() => {
    if (!testStr || !pattern || result.error) return testStr
    try {
      return testStr.replace(new RegExp(pattern, flags.includes('g') ? flags : flags + 'g'),
        (m) => `<mark class="bg-lime-400/30 text-lime-300 rounded px-0.5">${m}</mark>`)
    } catch { return testStr }
  }, [testStr, pattern, flags, result])

  const allFlags = ['g', 'i', 'm', 's', 'u']

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-start">
        <div className="flex-1">
          <p className="section-label">Pattern</p>
          <div className="flex items-center bg-base-850 border border-base-600 rounded-lg focus-within:border-lime-400 focus-within:ring-1 focus-within:ring-lime-400/20 transition-colors">
            <span className="text-zinc-600 font-mono text-lg pl-3">/</span>
            <input
              className="flex-1 bg-transparent px-2 py-2 font-mono text-sm text-zinc-300 outline-none placeholder:text-zinc-600"
              placeholder="[a-z]+"
              value={pattern}
              onChange={e => setPattern(e.target.value)}
            />
            <span className="text-zinc-600 font-mono text-lg pr-1">/</span>
            <input
              className="w-16 bg-transparent px-2 py-2 font-mono text-sm text-lime-400 outline-none"
              value={flags}
              onChange={e => setFlags(e.target.value)}
              placeholder="gi"
            />
          </div>
        </div>
        <div className="flex gap-1.5 mt-6">
          {allFlags.map(f => (
            <button
              key={f}
              onClick={() => setFlags(fl => fl.includes(f) ? fl.replace(f, '') : fl + f)}
              className={`w-7 h-7 rounded font-mono text-xs border transition-all ${
                flags.includes(f) ? 'bg-lime-400/20 text-lime-400 border-lime-400/30' : 'bg-base-800 border-base-600 text-zinc-500'
              }`}
            >{f}</button>
          ))}
        </div>
      </div>

      {result.error && <div className="error-box">{result.error}</div>}

      <div>
        <p className="section-label">Test string</p>
        <textarea
          className="tool-textarea h-32"
          placeholder="Enter text to test against the pattern..."
          value={testStr}
          onChange={e => setTestStr(e.target.value)}
        />
      </div>

      {testStr && pattern && !result.error && (
        <>
          <div>
            <p className="section-label">Highlighted matches</p>
            <div
              className="output-box font-mono text-sm leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: highlighted || '<span class="text-zinc-600">No matches</span>' }}
            />
          </div>

          <div className="bg-base-900 border border-base-700 rounded-lg p-4">
            <p className="section-label">{result.matches.length} match{result.matches.length !== 1 ? 'es' : ''}</p>
            {result.matches.length > 0 && (
              <div className="space-y-1 mt-2">
                {result.matches.map((m, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs font-mono">
                    <span className="text-zinc-600 w-4">{i}</span>
                    <span className="text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded">{m.match}</span>
                    <span className="text-zinc-600">at index {m.index}</span>
                    {m.groups.length > 0 && <span className="text-zinc-500">groups: [{m.groups.join(', ')}]</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
