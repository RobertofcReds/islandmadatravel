import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
export default function NotFound() {
  const { t } = useLanguage()
  return <div className="legal-page container-custom"><p className="eyebrow">404</p><h1>{t('ui.notFound')}</h1><p className="mb-8">{t('ui.notFoundText')}</p><Link to="/" className="button button-primary">{t('navbar.home')}</Link></div>
}

