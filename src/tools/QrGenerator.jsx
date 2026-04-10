import { useState, useEffect, useRef } from 'react'
import QRCode from 'qrcode'

export default function QrGenerator() {
  const [text, setText] = useState('https://devtoolbox.vercel.app')
  const [size, setSize] = useState(256)
  const [errorLevel, setErrorLevel] = useState('M')
  const [darkColor, setDarkColor] = useState('#a3e635')
  const [lightColor, setLightColor] = useState('#070709')
  const [qrUrl, setQrUrl] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!text) { setQrUrl(''); return }
    QRCode.toDataURL(text, {
      width: size,
      errorCorrectionLevel: errorLevel,
      color: { dark: darkColor, light: lightColor },
      margin: 2,
    }).then(url => { setQrUrl(url); setError('') })
    .catch(e => setError(e.message))
  }, [text, size, errorLevel, darkColor, lightColor])

  const download = () => {
    const a = document.createElement('a')
    a.href = qrUrl
    a.download = 'qrcode.png'
    a.click()
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="section-label">Content</p>
        <textarea
          className="tool-textarea h-24"
          placeholder="Enter URL, text, email, phone number..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-6 flex-wrap">
        <div>
          <p className="section-label mb-1.5">Error correction</p>
          <div className="flex gap-1.5">
            {['L', 'M', 'Q', 'H'].map(l => (
              <button key={l} onClick={() => setErrorLevel(l)}
                className={`badge cursor-pointer w-8 text-center ${errorLevel === l ? '!bg-lime-400/20 !text-lime-400 !border-lime-400/30' : ''}`}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="section-label mb-1.5">Size: {size}px</p>
          <input type="range" min="128" max="512" step="64" value={size} onChange={e => setSize(+e.target.value)}
            className="accent-lime-400 w-32" />
        </div>
        <div className="flex items-center gap-3">
          <div>
            <p className="section-label mb-1.5">Foreground</p>
            <input type="color" value={darkColor} onChange={e => setDarkColor(e.target.value)}
              className="w-10 h-8 rounded cursor-pointer bg-transparent border-0 p-0" />
          </div>
          <div>
            <p className="section-label mb-1.5">Background</p>
            <input type="color" value={lightColor} onChange={e => setLightColor(e.target.value)}
              className="w-10 h-8 rounded cursor-pointer bg-transparent border-0 p-0" />
          </div>
        </div>
      </div>

      {error && <div className="error-box">{error}</div>}

      {qrUrl && (
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 rounded-xl border border-base-600" style={{ background: lightColor }}>
            <img src={qrUrl} alt="QR Code" width={size} height={size} className="block" />
          </div>
          <button className="btn-primary" onClick={download}>Download PNG</button>
        </div>
      )}
    </div>
  )
}
