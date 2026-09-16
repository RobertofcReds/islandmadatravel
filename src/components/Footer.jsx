import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import logo from '../images/optimized/islandmadatravel.webp'
export default function Footer() {
  const { t } = useLanguage()
  return <footer className="site-footer"><div className="container-custom">
    <div className="footer-cta"><div><p className="eyebrow" style={{color:'#d6bc80',marginBottom:14}}>ISLAND MADA TRAVEL</p><h2>{t('footer.cta.title')}</h2><p>{t('footer.cta.subtitle')}</p></div><Link to="/contact" className="button">{t('ui.plan')}<ArrowUpRight size={18}/></Link></div>
    <div className="footer-grid">
      <div><Link to="/" className="brand"><img src={logo} width="42" height="42" alt=""/><span>ISLAND MADA <strong>TRAVEL</strong><small>MADAGASCAR</small></span></Link><p className="footer-bio">{t('footer.bio')}</p><a href="https://wa.me/261325539635" target="_blank" rel="noopener noreferrer" className="button button-glass">WhatsApp<ArrowUpRight size={16}/></a></div>
      <div><h3>{t('footer.navigation')}</h3><ul>{[['/','home'],['/destinations','destinations'],['/services','services'],['/about','about'],['/contact','contact']].map(([path,key]) => <li key={path}><Link to={path}>{t(`navbar.${key}`)}</Link></li>)}</ul></div>
      <div><h3>{t('footer.highlights')}</h3><ul><li><Link to="/diego">Diégo-Suarez</Link></li><li><Link to="/nosy">Nosy Be</Link></li><li><Link to="/diego#explore">{t('footer.highlight_emerald')}</Link></li><li><Link to="/nosy#explore">Nosy Iranja</Link></li></ul></div>
      <div><h3>{t('footer.contact')}</h3><ul><li>Antsiranana (Diégo-Suarez)<br/>Madagascar</li><li><a href="mailto:islandmadatravel@gmail.com">islandmadatravel@gmail.com</a></li><li><a href="tel:+261325539635">+261 32 55 396 35</a></li></ul></div>
    </div>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} ISLAND MADA TRAVEL. {t('footer.copyright')}</p><div><Link to="/privacy">{t('footer.privacy')}</Link><Link to="/terms">{t('footer.terms')}</Link></div></div>
  </div></footer>
}
