import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
export default function Information({ type = 'privacy' }) {
  const { t } = useLanguage()
  return <div className="legal-page container-custom"><article><p className="eyebrow">ISLAND MADA TRAVEL</p><h1>{t(`information.${type}.title`)}</h1>{[1,2,3].map(i => <section key={i}><h2>{t(`information.${type}.heading${i}`)}</h2><p>{t(`information.${type}.text${i}`)}</p></section>)}<p><a href="mailto:islandmadatravel@gmail.com">islandmadatravel@gmail.com</a></p><Link to="/contact">{t('navbar.contact')} →</Link></article></div>
}

