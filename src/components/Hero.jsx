import ResponsiveImage from './ResponsiveImage'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight, MapPin, Pause, Play } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Hero({ images, title, subtitle, badge, actions = [], home = false, anchor = 'page-content' }) {
  const { t } = useLanguage()
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [interacting, setInteracting] = useState(false)
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setPlaying(!media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  useEffect(() => {
    if (!playing || interacting || images.length < 2) return
    const timer = window.setInterval(() => {
      if (!document.hidden) setIndex(i => (i + 1) % images.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [playing, interacting, images.length])
  const move = direction => { setPlaying(false); setIndex(i => (i + direction + images.length) % images.length) }
  return (
    <section className={`travel-hero ${home ? 'travel-hero-home' : ''}`} aria-label={title} onFocusCapture={() => setInteracting(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setInteracting(false) }}>
      <div className="hero-images" aria-hidden="true">
        {images.map((src, i) => (i === index || i === (index + 1) % images.length) && (
          <ResponsiveImage key={src} src={src} loading={i === index ? "eager" : "lazy"} sizes="100vw" alt="" fetchPriority={i === 0 ? 'high' : 'auto'} decoding="async" className={i === index ? 'is-current' : ''} />
        ))}
      </div>
      <div className="hero-shade" />
      <div className="hero-content container-custom">
        <div className="hero-eyebrow"><span />{badge || 'ISLAND MADA TRAVEL'}</div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <div className="hero-actions">
          {actions.map((action, i) => {
            const className = i === 0 ? 'button button-primary' : 'button button-glass'
            const content = <>{action.label}<ArrowUpRight size={18} aria-hidden="true" /></>
            return action.to ? <Link key={action.to} to={action.to} className={className}>{content}</Link> : <a key={action.href} href={action.href} className={className} {...(action.href.startsWith('https:') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{content}</a>
          })}
        </div>
      </div>
      <div className="hero-bottom container-custom">
        <a href={`#${anchor}`} className="hero-discover"><ArrowDown size={18} /><span>{t('ui.discover')}</span></a>
        <span className="hero-location"><MapPin size={15} /> Madagascar · {home ? 'Diégo-Suarez & Nosy Be' : badge || 'Nord de Madagascar'}</span>
        <div className="hero-controls">
          <span className="hero-count">{String(index + 1).padStart(2, '0')} <span>/ {String(images.length).padStart(2, '0')}</span></span>
          <button onClick={() => move(-1)} aria-label={t('ui.previous')}><ChevronLeft size={18} /></button>
          <button onClick={() => setPlaying(p => !p)} aria-label={t(playing ? 'ui.pause' : 'ui.play')} aria-pressed={playing}>{playing ? <Pause size={15} /> : <Play size={15} />}</button>
          <button onClick={() => move(1)} aria-label={t('ui.next')}><ChevronRight size={18} /></button>
        </div>
      </div>
    </section>
  )
}
