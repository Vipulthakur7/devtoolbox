import { useState } from 'react'
import { TOOLS, CATEGORIES } from '../tools/index.js'

export default function Sidebar({ activeTool, onSelect }) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = TOOLS.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
                        t.description.toLowerCase().includes(search.toLowerCase())
    const matchCat = activeCategory === 'All' || t.category === activeCategory
    return matchSearch && matchCat
  })

  const grouped = CATEGORIES.reduce((acc, cat) => {
    const tools = filtered.filter(t => t.category === cat)
    if (tools.length) acc[cat] = tools
    return acc
  }, {})

  return (
    <aside className="w-64 flex-shrink-0 bg-base-900 border-r border-base-700 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-base-700">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded bg-lime-400 flex items-center justify-center">
            <span className="text-base-950 font-mono font-bold text-xs">DT</span>
          </div>
          <span className="font-sans font-bold text-zinc-200 text-base tracking-tight">DevToolbox</span>
        </div>
        <p className="text-xs text-zinc-600 font-mono mt-1.5">22 utilities · no login</p>
      </div>

      {/* Search */}
      <div className="px-3 py-3 border-b border-base-700">
        <input
          type="text"
          placeholder="Search tools..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="tool-input text-xs py-2"
        />
      </div>

      {/* Category pills */}
      <div className="px-3 pt-3 pb-2 flex flex-wrap gap-1.5 border-b border-base-700">
        {['All', ...CATEGORIES].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`text-xs font-mono px-2.5 py-1 rounded-md border transition-all ${
              activeCategory === cat
                ? 'bg-lime-400 text-base-950 border-lime-400 font-medium'
                : 'bg-base-800 border-base-600 text-zinc-400 hover:border-zinc-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tool list */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {Object.entries(grouped).map(([cat, tools]) => (
          <div key={cat} className="mb-4">
            <p className="text-xs font-mono text-zinc-600 uppercase tracking-widest px-2 mb-1.5">{cat}</p>
            {tools.map(tool => (
              <button
                key={tool.id}
                onClick={() => onSelect(tool.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg mb-0.5 transition-all group ${
                  activeTool === tool.id
                    ? 'bg-base-700 border border-base-500 text-zinc-200'
                    : 'hover:bg-base-800 text-zinc-400 border border-transparent hover:text-zinc-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`text-xs font-mono w-8 text-center shrink-0 ${
                    activeTool === tool.id ? 'text-lime-400' : 'text-zinc-600 group-hover:text-zinc-500'
                  }`}>{tool.icon}</span>
                  <div>
                    <div className="text-sm font-sans font-medium leading-tight">{tool.name}</div>
                    <div className="text-xs text-zinc-600 font-mono leading-tight mt-0.5">{tool.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-xs text-zinc-600 font-mono text-center py-8">No tools found</p>
        )}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-base-700">
        <p className="text-xs text-zinc-600 font-mono">Open source · MIT License</p>
      </div>
    </aside>
  )
}
