import { useState } from 'react'
import { MapPin, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
export default function LocationMap() {
  const [visible, setVisible] = useState(false)
  const { t, language } = useLanguage()
  return <div className="location-map">
    {visible ? <iframe title="Antsiranana · Madagascar" src={`https://maps.google.com/maps?q=Antsiranana%20Madagascar&z=12&output=embed&hl=${language}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /> : <div className="map-placeholder"><MapPin size={30}/><strong>Antsiranana</strong><span>Diégo-Suarez · Madagascar</span><button className="button button-primary" onClick={() => setVisible(true)}>{t('ui.showMap')}</button></div>}
    <a href="https://www.google.com/maps/search/?api=1&query=Antsiranana+Madagascar" target="_blank" rel="noopener noreferrer">Google Maps <ArrowUpRight size={15}/></a>
  </div>
}
