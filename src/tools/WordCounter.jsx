import { useState, useMemo } from 'react'

export default function WordCounter() {
  const [text, setText] = useState('')

  const stats = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const chars = text.length
    const charsNoSpace = text.replace(/\s/g, '').length
    const lines = text ? text.split('\n').length : 0
    const sentences = text ? (text.match(/[.!?]+/g) || []).length : 0
    const paragraphs = text ? text.split(/\n\s*\n/).filter(Boolean).length : 0
    const readTime = Math.max(1, Math.ceil(words / 200))
    const speakTime = Math.max(1, Math.ceil(words / 130))

    const wordFreq = text.trim()
      ? Object.entries(
          text.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(w => w.length > 2)
            .reduce((acc, w) => { acc[w] = (acc[w] || 0) + 1; return acc }, {})
        ).sort((a, b) => b[1] - a[1]).slice(0, 10)
      : []

    return { words, chars, charsNoSpace, lines, sentences, paragraphs, readTime, speakTime, wordFreq }
  }, [text])

  const metrics = [
    { label: 'Words', value: stats.words },
    { label: 'Characters', value: stats.chars },
    { label: 'No spaces', value: stats.charsNoSpace },
    { label: 'Lines', value: stats.lines },
    { label: 'Sentences', value: stats.sentences },
    { label: 'Paragraphs', value: stats.paragraphs },
    { label: 'Read time', value: `~${stats.readTime} min` },
    { label: 'Speak time', value: `~${stats.speakTime} min` },
  ]

  return (
    <div className="space-y-5">
      <div>
        <p className="section-label">Text input</p>
        <textarea
          className="tool-textarea h-48"
          placeholder="Paste or type your text here..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {metrics.map(({ label, value }) => (
          <div key={label} className="bg-base-900 border border-base-700 rounded-lg p-3 text-center">
            <div className="text-xl font-700 text-zinc-200 font-mono tabular-nums">{value}</div>
            <div className="text-xs text-zinc-600 mt-1 font-sans">{label}</div>
          </div>
        ))}
      </div>

      {stats.wordFreq.length > 0 && (
        <div>
          <p className="section-label">Top words</p>
          <div className="space-y-1.5">
            {stats.wordFreq.map(([word, count]) => (
              <div key={word} className="flex items-center gap-3">
                <span className="font-mono text-sm text-zinc-400 w-32 truncate">{word}</span>
                <div className="flex-1 h-2 bg-base-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-lime-400/60 rounded-full transition-all"
                    style={{ width: `${(count / stats.wordFreq[0][1]) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-mono text-zinc-600 w-6 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
