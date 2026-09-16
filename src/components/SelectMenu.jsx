import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Check, ChevronDown } from 'lucide-react'

// Select-only combobox: focus stays on the trigger while arrows explore the list.
// A portal keeps menus clear of the form's overflow and the mobile drawer.
export default function SelectMenu({ id, name, label, title = label, subtitle, value, onChange, options, icon: Icon, compact = false, disabled = false, placeholder }) {
  const generatedId = useId()
  const baseId = id || `select-${generatedId}`
  const listId = `${baseId}-options`
  const triggerRef = useRef(null)
  const popupRef = useRef(null)
  const searchRef = useRef({ text: '', time: 0 })
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [position, setPosition] = useState(null)
  const selectedIndex = options.findIndex(option => option.value === value)
  const selected = options[selectedIndex]

  const show = (index = Math.max(0, selectedIndex)) => {
    if (disabled) return
    setActiveIndex(index)
    setOpen(true)
  }
  const choose = index => {
    onChange(options[index].value)
    setOpen(false)
    triggerRef.current?.focus({ preventScroll: true })
  }

  useEffect(() => { if (disabled) setOpen(false) }, [disabled])
  useLayoutEffect(() => {
    if (!open) { setPosition(null); return }
    const update = () => {
      const trigger = triggerRef.current
      const popup = popupRef.current
      if (!trigger || !popup) return
      const rect = trigger.getBoundingClientRect()
      if (!rect.width || rect.bottom < 0 || rect.top > window.innerHeight) { setOpen(false); return }
      const margin = 12, gap = 8
      const width = Math.min(compact ? 276 : Math.max(rect.width, 336), window.innerWidth - margin * 2)
      const below = window.innerHeight - rect.bottom - gap - margin
      const above = rect.top - gap - margin
      const desiredHeight = Math.min(popup.scrollHeight, 448)
      const upwards = below < desiredHeight && above > below
      const maxHeight = Math.max(0, Math.min(448, upwards ? above : below))
      const height = Math.min(desiredHeight, maxHeight)
      const next = {
        width, maxHeight,
        left: Math.max(margin, Math.min(compact ? rect.right - width : rect.left, window.innerWidth - width - margin)),
        top: upwards ? rect.top - gap - height : rect.bottom + gap,
        upwards,
      }
      setPosition(previous => previous && Object.keys(next).every(key => previous[key] === next[key]) ? previous : next)
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(triggerRef.current)
    observer.observe(popupRef.current)
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)
    window.visualViewport?.addEventListener('resize', update)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update, true)
      window.visualViewport?.removeEventListener('resize', update)
    }
  }, [open, compact])

  useEffect(() => {
    if (!open) return
    const outside = event => {
      if (!triggerRef.current?.contains(event.target) && !popupRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('focusin', outside)
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('focusin', outside) }
  }, [open])
  useEffect(() => {
    if (open) document.getElementById(`${baseId}-option-${activeIndex}`)?.scrollIntoView({ block: 'nearest', behavior: 'instant' })
  }, [open, activeIndex, baseId])

  const onKeyDown = event => {
    if (event.key === 'Tab') { setOpen(false); return }
    if (event.key === 'Escape' && open) {
      event.preventDefault(); event.stopPropagation(); setOpen(false); return
    }
    if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      event.preventDefault()
      const last = options.length - 1
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? last : !open ? Math.max(0, selectedIndex) : Math.max(0, Math.min(last, activeIndex + (event.key === 'ArrowDown' ? 1 : -1)))
      show(next); return
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (open) choose(activeIndex); else show()
      return
    }
    if (event.key.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey) {
      const now = Date.now()
      const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
      const query = now - searchRef.current.time < 700 ? searchRef.current.text + event.key : event.key
      searchRef.current = { text: query, time: now }
      const match = options.findIndex(option => normalize(option.label).startsWith(normalize(query)))
      if (match >= 0) { event.preventDefault(); show(match) }
    }
  }

  return <div className={`select-menu ${compact ? 'select-menu-compact' : 'select-menu-field'}`}>
    <span className="sr-only" id={`${baseId}-label`}>{label}</span>
    {name && <input type="hidden" name={name} value={value} disabled={disabled} />}
    <button ref={triggerRef} id={baseId} type="button" role="combobox" aria-haspopup="listbox"
      aria-expanded={open} aria-controls={open ? listId : undefined}
      aria-activedescendant={open ? `${baseId}-option-${activeIndex}` : undefined}
      aria-labelledby={`${baseId}-label ${baseId}-value`} disabled={disabled}
      className={`select-trigger ${open ? 'is-open' : ''} ${!value ? 'is-placeholder' : ''}`}
      onClick={() => open ? setOpen(false) : show()} onKeyDown={onKeyDown}>
      {Icon && <span className="select-trigger-icon"><Icon size={compact ? 17 : 18} aria-hidden="true" /></span>}
      <span id={`${baseId}-value`} className="select-trigger-value">{!value && placeholder ? placeholder : selected?.label}</span>
      <ChevronDown size={15} className="select-chevron" aria-hidden="true" />
    </button>
    {open && createPortal(
      <div ref={popupRef} className={`select-popup ${compact ? 'select-popup-language' : 'select-popup-destination'}`}
        style={{ width: position?.width || (compact ? 276 : 336), left: position?.left || 0, top: position?.top || 0, maxHeight: position?.maxHeight, visibility: position ? 'visible' : 'hidden', transformOrigin: position?.upwards ? 'bottom right' : 'top right' }}>
        <div className="select-popup-heading"><span>{title}</span>{subtitle && <p>{subtitle}</p>}</div>
        <div id={listId} role="listbox" aria-label={label} className="select-options">
          {options.map((option, index) => {
            const OptionIcon = option.icon
            return <div key={option.value} id={`${baseId}-option-${index}`} role="option"
              aria-selected={value === option.value} className={`select-option ${index === activeIndex ? 'is-active' : ''} ${value === option.value ? 'is-selected' : ''}`}
              onPointerMove={event => { if (event.pointerType === 'mouse') setActiveIndex(index) }}
              onPointerDown={event => { if (event.pointerType === 'mouse') event.preventDefault() }} onClick={() => choose(index)}>
              {option.image ? <img src={option.image} alt="" className="select-option-photo" width="48" height="48" /> : <span className={`select-option-symbol ${option.value === 'both' ? 'is-gold' : ''}`} aria-hidden="true">{OptionIcon ? <OptionIcon size={20} /> : option.code}</span>}
              <span className="select-option-copy"><span>{option.label}</span>{option.description && <small>{option.description}</small>}</span>
              <span className="select-option-check" aria-hidden="true">{value === option.value && <Check size={14} strokeWidth={2.5} />}</span>
            </div>
          })}
        </div>
      </div>, document.body
    )}
  </div>
}
