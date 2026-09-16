import { useEffect } from 'react'
// Shared focus trap, Escape handling and focus restoration.
export default function useDialog(ref, open, close) {
  useEffect(() => {
    if (!open || !ref.current) return
    const previous = document.activeElement
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const root = ref.current
    const focusable = () => [...root.querySelectorAll('a[href], button:not([disabled]), select, input, textarea, [tabindex="0"]')].filter(el => el.getClientRects().length)
    focusable()[0]?.focus()
    const handleKey = event => {
      if (event.key === 'Escape') { event.preventDefault(); close() }
      if (event.key !== 'Tab') return
      const items = focusable(), first = items[0], last = items.at(-1)
      if (!first) { event.preventDefault(); return }
      if (event.shiftKey && (document.activeElement === first || !root.contains(document.activeElement))) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && (document.activeElement === last || !root.contains(document.activeElement))) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', handleKey)
    return () => { document.body.style.overflow = overflow; document.removeEventListener('keydown', handleKey); previous?.focus({ preventScroll: true }) }
  }, [open, ref, close])
}

