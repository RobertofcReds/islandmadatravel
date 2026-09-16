import { useEffect, useRef, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { useLanguage } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
const Destinations = lazy(() => import('./pages/Destinations'))
const Diego = lazy(() => import('./pages/Diego'))
const Nosy = lazy(() => import('./pages/Nosy'))
const Services = lazy(() => import('./pages/Services'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Information = lazy(() => import('./pages/Information'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageEffects() {
  const { pathname, hash } = useLocation()
  const { t } = useLanguage()
  const first = useRef(true)
  useEffect(() => {
    const key = { '/':'home', '/destinations':'destinations', '/diego':'diego', '/nosy':'nosy', '/services':'services', '/about':'about', '/contact':'contact' }[pathname]
    document.title = `${key ? t(`navbar.${key}`) : t(pathname === '/privacy' ? 'footer.privacy' : pathname === '/terms' ? 'footer.terms' : 'ui.notFound')} | Island Mada Travel`
    const description = key && t(`${key}.hero.subtitle`)
    if (description) document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [pathname, t])
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      if (!first.current) document.getElementById('main-content')?.focus({ preventScroll: true })
      first.current = false
      return
    }
    let observer
    const scroll = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (!el) return false
      el.scrollIntoView({ behavior: 'instant', block: 'start' }); return true
    }
    if (!scroll()) {
      observer = new MutationObserver(() => { if (scroll()) observer.disconnect() })
      observer.observe(document.getElementById('main-content'), { childList: true, subtree: true })
    }
    return () => observer?.disconnect()
  }, [pathname, hash])
  return null
}
function Shell() {
  const { t } = useLanguage()
  return <div className="site-shell"><a className="skip-link" href="#main-content">{t('ui.skip')}</a><PageEffects/><Navbar/>
    <main id="main-content" tabIndex={-1} className="site-main">
      <Suspense fallback={<div className="legal-page container-custom" role="status">{t('ui.loading')}</div>}>
        <Routes><Route path="/" element={<Home/>}/><Route path="/destinations" element={<Destinations/>}/><Route path="/diego" element={<Diego/>}/><Route path="/nosy" element={<Nosy/>}/><Route path="/services" element={<Services/>}/><Route path="/about" element={<About/>}/><Route path="/contact" element={<Contact/>}/><Route path="/privacy" element={<Information/>}/><Route path="/terms" element={<Information type="terms"/>}/><Route path="*" element={<NotFound/>}/></Routes>
      </Suspense>
    </main><Footer/></div>
}
export default function App() { return <ThemeProvider><Router><Shell/></Router></ThemeProvider> }
