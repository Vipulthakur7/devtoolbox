import { useState } from 'react'
import { marked } from 'marked'

const SAMPLE = `# Hello, DevToolbox!

Write **Markdown** on the left, see the rendered output here.

## Features
- Live preview as you type
- Full [CommonMark](https://commonmark.org) support
- Code highlighting

\`\`\`js
const greet = (name) => \`Hello, \${name}!\`
console.log(greet('World'))
\`\`\`

> "Any tool that helps you write better is worth using."

| Syntax | Description |
|--------|-------------|
| \`**bold**\` | **bold** |
| \`*italic*\` | *italic* |
| \`\`code\`\` | \`code\` |
`

export default function MarkdownPreview() {
  const [md, setMd] = useState(SAMPLE)
  const [view, setView] = useState('split')

  const html = marked.parse(md)

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {['split', 'edit', 'preview'].map(v => (
          <button key={v} onClick={() => setView(v)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${view === v ? 'bg-lime-400 text-base-950 border-lime-400' : 'btn-secondary'}`}>
            {v}
          </button>
        ))}
      </div>

      <div className={`grid gap-4 ${view === 'split' ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {(view === 'edit' || view === 'split') && (
          <div>
            <p className="section-label">Markdown</p>
            <textarea className="tool-textarea h-[500px]" value={md} onChange={e => setMd(e.target.value)} />
          </div>
        )}
        {(view === 'preview' || view === 'split') && (
          <div>
            <p className="section-label">Preview</p>
            <div
              className="bg-base-950 border border-base-600 rounded-lg p-5 h-[500px] overflow-auto
                prose prose-invert prose-sm max-w-none
                prose-headings:text-zinc-200 prose-headings:font-medium
                prose-p:text-zinc-400 prose-li:text-zinc-400
                prose-code:text-lime-400 prose-code:bg-base-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
                prose-pre:bg-base-800 prose-pre:border prose-pre:border-base-600
                prose-blockquote:border-lime-400/40 prose-blockquote:text-zinc-500
                prose-a:text-lime-400 prose-strong:text-zinc-300
                prose-table:text-xs prose-th:text-zinc-300 prose-td:text-zinc-400
                prose-hr:border-base-600"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
