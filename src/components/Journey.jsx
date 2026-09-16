import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
export function Journey() {
  const { t } = useLanguage()
  return <section className="journey-section"><div className="container-custom">
    <div className="journey-heading"><div><p className="eyebrow">{t('journey.eyebrow')}</p><h2>{t('journey.title')}</h2></div><p>{t('journey.subtitle')}</p></div>
    <div className="journey-grid">{[1,2,3].map(i => <article className="journey-step" key={i}><span>0{i}</span><h3>{t(`journey.step${i}.title`)}</h3><p>{t(`journey.step${i}.text`)}</p></article>)}</div>
  </div></section>
}
export function FAQ() {
  const { t } = useLanguage()
  return <section className="journey-section"><div className="container-custom faq-layout">
    <div className="faq-intro"><p className="eyebrow">{t('faq.eyebrow')}</p><h2>{t('faq.title')}</h2><p>{t('faq.subtitle')}</p><Link className="button button-primary" to="/contact">{t('navbar.contact')}<ArrowUpRight size={18}/></Link></div>
    <div className="faq-list">{[1,2,3,4].map(i => <details key={i}><summary>{t(`faq.q${i}`)}</summary><p>{t(`faq.a${i}`)}</p></details>)}</div>
  </div></section>
}
