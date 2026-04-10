import { useState, useCallback } from 'react'

export function useCopy() {
  const [copied, setCopied] = useState(false)

  const copy = useCallback((text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }, [])

  return { copy, copied }
}
