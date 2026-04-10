import { TOOLS, CATEGORIES } from '../tools/index.js'

export default function HomeScreen({ onSelect }) {
  return (
    <div className="animate-fade-in">
      <div className="mb-10">
        <div className="inline-block bg-lime-400/10 border border-lime-400/20 rounded-full px-3 py-1 text-xs font-mono text-lime-400 mb-4">
          v1.0 · 22 tools · no login required
        </div>
        <h1 className="text-4xl font-bold text-zinc-100 tracking-tight leading-tight mb-3">
          Every tool a dev<br />
          <span className="text-lime-400">actually needs.</span>
        </h1>
        <p className="text-zinc-500 font-mono text-sm max-w-md">
          No ads. No accounts. No friction. Just fast, offline-capable utilities.
          Pick a tool from the sidebar or search below.
        </p>
      </div>

      {CATEGORIES.map(cat => {
        const tools = TOOLS.filter(t => t.category === cat)
        return (
          <div key={cat} className="mb-8">
            <p className="section-label">{cat}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {tools.map(tool => (
                <button
                  key={tool.id}
                  onClick={() => onSelect(tool.id)}
                  className="text-left p-4 rounded-xl bg-base-900 border border-base-700 hover:border-base-500
                             hover:bg-base-800 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-sm text-lime-400/70 group-hover:text-lime-400 w-8 text-center mt-0.5 transition-colors shrink-0">
                      {tool.icon}
                    </span>
                    <div>
                      <div className="font-medium text-zinc-300 group-hover:text-zinc-200 text-sm transition-colors">
                        {tool.name}
                      </div>
                      <div className="text-xs text-zinc-600 font-mono mt-0.5 group-hover:text-zinc-500 transition-colors">
                        {tool.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
