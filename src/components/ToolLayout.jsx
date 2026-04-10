export default function ToolLayout({ tool }) {
  const Component = tool.component
  return (
    <div className="animate-slide-in">
      <div className="mb-6 pb-5 border-b border-base-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-base-800 border border-base-600 flex items-center justify-center">
            <span className="font-mono text-lime-400 text-sm font-medium">{tool.icon}</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-zinc-200 tracking-tight">{tool.name}</h1>
            <p className="text-sm text-zinc-500 font-mono">{tool.description}</p>
          </div>
        </div>
      </div>
      <Component />
    </div>
  )
}
