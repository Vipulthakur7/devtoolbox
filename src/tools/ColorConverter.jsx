import { useState } from 'react'
import { useCopy } from '../hooks/useCopy.js'

const hexToRgb = (hex) => {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h
  const n = parseInt(full, 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}
const rgbToHsl = ({ r, g, b }) => {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2
  if (max === min) { h = s = 0 } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}
const isValidHex = (h) => /^#?[0-9A-Fa-f]{3,6}$/.test(h)

const PRESETS = ['#FF6B6B','#4ECDC4','#45B7D1','#96CEB4','#FFEAA7','#DDA0DD','#98D8C8','#F7DC6F','#BB8FCE','#85C1E9']

export default function ColorConverter() {
  const [hex, setHex] = useState('#a3e635')
  const { copy } = useCopy()
  const [copiedKey, setCopiedKey] = useState('')

  const valid = isValidHex(hex)
  const normalized = valid ? (hex.startsWith('#') ? hex : '#' + hex) : null
  const rgb = valid ? hexToRgb(normalized) : null
  const hsl = rgb ? rgbToHsl(rgb) : null

  const copyVal = (key, val) => {
    copy(val); setCopiedKey(key); setTimeout(() => setCopiedKey(''), 1500)
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <div
          className="w-20 h-20 rounded-xl border border-base-600 flex-shrink-0 transition-colors"
          style={{ background: valid ? normalized : '#1e1e25' }}
        />
        <div className="flex-1">
          <p className="section-label">HEX value</p>
          <input
            className="tool-input text-lg"
            value={hex}
            onChange={e => setHex(e.target.value)}
            placeholder="#a3e635"
          />
          {!valid && hex && <p className="text-red-400 text-xs font-mono mt-1">Invalid hex color</p>}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {PRESETS.map(c => (
          <button
            key={c}
            onClick={() => setHex(c)}
            className="w-8 h-8 rounded-lg border-2 transition-all hover:scale-110"
            style={{ background: c, borderColor: hex === c ? '#a3e635' : 'transparent' }}
            title={c}
          />
        ))}
      </div>

      {valid && rgb && hsl && (
        <div className="grid grid-cols-1 gap-2">
          {[
            { label: 'HEX', value: normalized },
            { label: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
            { label: 'HSL', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
            { label: 'RGB raw', value: `${rgb.r}, ${rgb.g}, ${rgb.b}` },
            { label: 'CSS var', value: `--color: ${normalized};` },
            { label: 'Tailwind', value: `[${normalized}]` },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center bg-base-950 border border-base-600 rounded-lg px-4 py-2.5 group">
              <span className="text-xs font-mono text-lime-400 w-20 shrink-0">{label}</span>
              <span className="font-mono text-sm text-zinc-300 flex-1">{value}</span>
              <button
                className="copy-btn opacity-0 group-hover:opacity-100"
                onClick={() => copyVal(label, value)}
              >{copiedKey === label ? '✓' : 'copy'}</button>
            </div>
          ))}
        </div>
      )}

      {valid && hsl && (
        <div className="space-y-2">
          {[
            { label: 'H', max: 360, value: hsl.h, style: `linear-gradient(to right, hsl(0,100%,50%), hsl(60,100%,50%), hsl(120,100%,50%), hsl(180,100%,50%), hsl(240,100%,50%), hsl(300,100%,50%), hsl(360,100%,50%))` },
            { label: 'S', max: 100, value: hsl.s, style: `linear-gradient(to right, hsl(${hsl.h},0%,${hsl.l}%), hsl(${hsl.h},100%,${hsl.l}%))` },
            { label: 'L', max: 100, value: hsl.l, style: `linear-gradient(to right, #000, hsl(${hsl.h},${hsl.s}%,50%), #fff)` },
          ].map(({ label, max, value, style }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="text-xs font-mono text-zinc-500 w-4">{label}</span>
              <div className="flex-1 h-3 rounded-full" style={{ background: style }}>
                <div className="relative h-full">
                  <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white shadow"
                    style={{ left: `calc(${(value / max) * 100}% - 6px)` }} />
                </div>
              </div>
              <span className="text-xs font-mono text-zinc-400 w-8 text-right">{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
