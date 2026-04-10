import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar.jsx'
import ToolLayout from './components/ToolLayout.jsx'
import HomeScreen from './components/HomeScreen.jsx'
import { TOOLS } from './tools/index.js'
import { Menu, X } from 'lucide-react'

export default function App() {
  const [activeToolId, setActiveToolId] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // URL hash routing
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash && TOOLS.find(t => t.id === hash)) setActiveToolId(hash)

    const handler = () => {
      const h = window.location.hash.slice(1)
      setActiveToolId(TOOLS.find(t => t.id === h) ? h : null)
    }
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  const selectTool = (id) => {
    setActiveToolId(id)
    window.location.hash = id
    setSidebarOpen(false)
  }

  const activeTool = TOOLS.find(t => t.id === activeToolId)

  return (
    <div className="flex min-h-screen bg-base-950">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar — hidden on mobile unless open */}
      <div className={`fixed lg:relative z-30 lg:z-auto transition-transform duration-200
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <Sidebar activeTool={activeToolId} onSelect={selectTool} />
      </div>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-base-700 sticky top-0 bg-base-950 z-10">
          <button onClick={() => setSidebarOpen(true)} className="text-zinc-400 hover:text-zinc-200">
            <Menu size={20} />
          </button>
          <span className="font-bold text-zinc-200 text-sm">
            {activeTool ? activeTool.name : 'DevToolbox'}
          </span>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-8 lg:py-10">
          {activeTool ? (
            <ToolLayout tool={activeTool} />
          ) : (
            <HomeScreen onSelect={selectTool} />
          )}
        </div>
      </main>
    </div>
  )
}
