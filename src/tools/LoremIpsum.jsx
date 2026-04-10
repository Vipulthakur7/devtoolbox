import { useState } from 'react'
import { useCopy } from '../hooks/useCopy.js'

const WORDS = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ')

const sentence = () => {
  const len = 8 + Math.floor(Math.random() * 12)
  const words = Array.from({ length: len }, () => WORDS[Math.floor(Math.random() * WORDS.length)])
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
  return words.join(' ') + '.'
}

const paragraph = () => Array.from({ length: 4 + Math.floor(Math.random() * 4) }, sentence).join(' ')

export default function LoremIpsum() {
  const [count, setCount] = useState(3)
  const [type, setType] = useState('paragraphs')
  const [startLorem, setStartLorem] = useState(true)
  const [output, setOutput] = useState('')
  const { copy, copied } = useCopy()

  const generate = () => {
    let result = ''
    if (type === 'paragraphs') {
      const paras = Array.from({ length: count }, paragraph)
      if (startLorem) paras[0] = 'Lorem ipsum dolor sit amet, ' + paras[0].slice(paras[0].indexOf(' ') + 1)
      result = paras.join('\n\n')
    } else if (type === 'sentences') {
      const sents = Array.from({ length: count }, sentence)
      if (startLorem) sents[0] = 'Lorem ipsum dolor sit amet.'
      result = sents.join(' ')
    } else {
      const words = Array.from({ length: count }, () => WORDS[Math.floor(Math.random() * WORDS.length)])
      if (startLorem) words[0] = 'lorem'
      result = words.join(' ')
    }
    setOutput(result)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="section-label mb-0">Count:</span>
          <input type="number" min="1" max="50" value={count} onChange={e => setCount(Math.min(50, Math.max(1, +e.target.value)))}
            className="tool-input w-20 text-center" />
        </div>
        <div className="flex gap-1.5">
          {['paragraphs', 'sentences', 'words'].map(t => (
            <button key={t} onClick={() => setType(t)}
              className={`badge cursor-pointer ${type === t ? '!bg-lime-400/20 !text-lime-400 !border-lime-400/30' : ''}`}>
              {t}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-zinc-400 cursor-pointer">
          <input type="checkbox" checked={startLorem} onChange={e => setStartLorem(e.target.checked)} className="accent-lime-400" />
          Start with "Lorem ipsum"
        </label>
        <button className="btn-primary" onClick={generate}>Generate</button>
      </div>

      {output ? (
        <div>
          <div className="flex justify-between mb-2">
            <p className="section-label">{count} {type} generated</p>
            <button className="copy-btn" onClick={() => copy(output)}>{copied ? '✓ copied' : 'copy'}</button>
          </div>
          <div className="output-box leading-relaxed whitespace-pre-wrap">{output}</div>
        </div>
      ) : (
        <div className="border border-dashed border-base-600 rounded-lg p-10 text-center text-zinc-600 font-mono text-sm">
          Click Generate to create placeholder text
        </div>
      )}
    </div>
  )
}
