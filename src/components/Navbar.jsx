import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Moon, Sun, ArrowUpRight, Compass } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'
import useDialog from '../hooks/useDialog'
import LanguageSelector from './LanguageSelector'
import logo from '../images/optimized/islandmadatravel.webp'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { isDark, toggleTheme } = useTheme()
  const { t } = useLanguage()
  const panel = useRef(null)
  const close = useCallback(() => setOpen(false), [])
  useDialog(panel, open, close)
  useEffect(() => { close() }, [location.pathname, close])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    const onResize = () => { if (window.innerWidth >= 1180) close() }
    window.addEventListener('resize', onResize)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize) }
  }, [close])
  const links = [['/', 'home'], ['/destinations', 'destinations'], ['/services', 'services'], ['/about', 'about'], ['/contact', 'contact']]
  const brand = <><img src={logo} alt="" width="44" height="44" /><span>ISLAND MADA <strong>TRAVEL</strong><small>MADAGASCAR</small></span></>
  const themeButton = <button className="icon-button" onClick={toggleTheme} aria-label={t(isDark ? 'ui.light' : 'ui.dark')} title={t(isDark ? 'ui.light' : 'ui.dark')}>{isDark ? <Sun size={19} /> : <Moon size={19} />}</button>
  return <>
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="nav-shell" aria-label={t('footer.navigation')}>
        <Link to="/" className="brand" aria-label="Island Mada Travel — Madagascar">{brand}</Link>
        <div className="desktop-nav">{links.map(([path, key]) => <NavLink key={path} end={path === '/'} to={path}>{t(`navbar.${key}`)}</NavLink>)}</div>
        <div className="nav-actions"><div className="desktop-language"><LanguageSelector /></div>{themeButton}<Link to="/contact" className="nav-book">{t('ui.plan')}<ArrowUpRight size={16} /></Link><button className="icon-button menu-toggle" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={t('ui.menu')}><Menu size={23} /></button></div>
      </nav>
    </header>
    {open && <div className="drawer-backdrop" onClick={close}><aside ref={panel} id="mobile-navigation" className="mobile-drawer" role="dialog" aria-modal="true" aria-label={t('ui.menu')} onClick={e => e.stopPropagation()}>
      <div className="drawer-heading"><Link to="/" className="brand">{brand}</Link><button className="icon-button" onClick={close} aria-label={t('ui.close')}><X size={22} /></button></div>
      <div className="drawer-body"><p className="eyebrow">MADAGASCAR · ISLAND MADA TRAVEL</p><nav aria-label={t('ui.menu')}>{links.map(([path, key], i) => <NavLink end={path === '/'} to={path} key={path} onClick={close}><span className="nav-number">0{i + 1}</span>{t(`navbar.${key}`)}<ArrowUpRight size={20} /></NavLink>)}</nav><div className="drawer-destinations"><Compass size={20} /><Link to="/diego">Diégo-Suarez</Link><Link to="/nosy">Nosy Be</Link></div><LanguageSelector /></div>
      <div className="drawer-footer"><Link to="/contact" className="button button-primary" onClick={close}>{t('ui.plan')}<ArrowUpRight size={18} /></Link><a href="tel:+261325539635">+261 32 55 396 35</a></div>
    </aside></div>}
  </>
}
