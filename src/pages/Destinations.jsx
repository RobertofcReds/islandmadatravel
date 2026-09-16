import Hero from '../components/Hero'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

import diegoTroisBaies from '../images/optimized/destination/Les Trois Baies.webp'
import diegoMontagneAmbre from '../images/optimized/destination/Forêt de Montagne d\'Ambre.webp'
import diegoTsingyRouges from '../images/optimized/destination/Tsingy Rouges.webp'
import diegoRamena from '../images/optimized/destination/Plage de Ramena.webp'
import diegoMerEmeraude from '../images/optimized/destination/Mer d\'Émeraude.webp'
import nosyParfums from '../images/optimized/destination/Nosy Be - Île aux Parfums.webp'
import nosyIranja from '../images/optimized/destination/Nosy Iranja.webp'
import nosyTanikely from '../images/optimized/destination/Nosy Tanikely.webp'
import nosyAndilana from '../images/optimized/destination/Plage d\'Andilana.webp'
import nosyKomba from '../images/optimized/destination/Nosy Komba.webp'

// HD images
import hdCapDiego from '../images/optimized/diego/031-cap diego_three.webp'
import hdAmbre from '../images/optimized/diego/026-ambre.webp'
import hdCascade from '../images/optimized/nosy/021-cascade_caption.webp'

const Destinations = () => {
  const { t } = useLanguage()

  const heroImages = [
    nosyTanikely,
    hdAmbre,
    diegoTroisBaies,
    nosyKomba,
    hdCascade,
    diegoTsingyRouges,
    nosyParfums,
    hdCapDiego,
    diegoRamena,
    nosyIranja,
    diegoMontagneAmbre,
    nosyAndilana,
    diegoMerEmeraude,
  ]


  return (
    <div>
      {/* Hero Section */}
      <Hero images={heroImages} title={t('destinations.hero.title')} subtitle={t('destinations.hero.subtitle')} badge={t('navbar.destinations')} anchor="page-content"  actions={[{ to: '/diego', label: t('destinations.hero.cta_diego') }, { to: '/nosy', label: t('destinations.hero.cta_nosy') }]} />

      {/* Main Content */}
      <div id="page-content" className="py-20 overflow-hidden">
        <div className="container-custom max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 min-w-0">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 break-words">
              {t('destinations.content.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-2xl mx-auto break-words">
              {t('destinations.content.subtitle')}
            </p>
          </div>
        
          <div className="grid md:grid-cols-2 gap-10 min-w-0">
            {/* Diégo-Suarez Card */}
            <div className="travel-card bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between min-w-0">
              <div className="min-w-0">
                <div 
                  className="relative h-72 bg-cover bg-center min-w-0"
                  style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("${diegoMerEmeraude}")` }}
                >
                  <span className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow truncate max-w-[75%] whitespace-nowrap shrink-0">
                    {t('destinations.content.diego.badge')}
                  </span>
                </div>
                
                <div className="p-6 sm:p-8 min-w-0">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3 break-words">
                    <i className="fas fa-wind text-emerald-500 dark:text-emerald-400 shrink-0"></i> <span>{t('destinations.content.diego.title')}</span>
                  </h3>
                  <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-4 flex items-center gap-2 break-words">
                    <i className="fas fa-map-marker-alt shrink-0"></i> <span>{t('destinations.content.diego.location')}</span>
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-sm sm:text-base break-words">
                    {t('destinations.content.diego.description')}
                  </p>
                  <ul className="space-y-3 mb-8 text-gray-700 dark:text-gray-300 min-w-0 text-sm sm:text-base">
                    <li className="flex items-center gap-3 min-w-0 break-words">
                      <i className="fas fa-check-circle text-emerald-500 dark:text-emerald-400 shrink-0"></i>
                      <span className="break-words min-w-0">{t('destinations.content.diego.feature_bays')}</span>
                    </li>
                    <li className="flex items-center gap-3 min-w-0 break-words">
                      <i className="fas fa-check-circle text-emerald-500 dark:text-emerald-400 shrink-0"></i>
                      <span className="break-words min-w-0">{t('destinations.content.diego.feature_parks')}</span>
                    </li>
                    <li className="flex items-center gap-3 min-w-0 break-words">
                      <i className="fas fa-check-circle text-emerald-500 dark:text-emerald-400 shrink-0"></i>
                      <span className="break-words min-w-0">{t('destinations.content.diego.feature_tsingy')}</span>
                    </li>
                    <li className="flex items-center gap-3 min-w-0 break-words">
                      <i className="fas fa-check-circle text-emerald-500 dark:text-emerald-400 shrink-0"></i>
                      <span className="break-words min-w-0">{t('destinations.content.diego.feature_history')}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0 min-w-0">
                <Link 
                  to="/diego" 
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3.5 rounded-xl transition-all text-center block shadow-md hover:shadow-emerald-500/20 whitespace-normal shrink-0"
                >
                  {t('destinations.content.diego.cta')} <i className="fas fa-arrow-right ml-2 shrink-0"></i>
                </Link>
              </div>
            </div>

            {/* Nosy Be Card */}
            <div className="travel-card bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between min-w-0">
              <div className="min-w-0">
                <div 
                  className="relative h-72 bg-cover bg-center min-w-0"
                  style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("${nosyIranja}")` }}
                >
                  <span className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow truncate max-w-[75%] whitespace-nowrap shrink-0">
                    {t('destinations.content.nosy.badge')}
                  </span>
                </div>
                
                <div className="p-6 sm:p-8 min-w-0">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3 break-words">
                    <i className="fas fa-tree text-emerald-500 dark:text-emerald-400 shrink-0"></i> <span>{t('destinations.content.nosy.title')}</span>
                  </h3>
                  <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-4 flex items-center gap-2 break-words">
                    <i className="fas fa-map-marker-alt shrink-0"></i> <span>{t('destinations.content.nosy.location')}</span>
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-sm sm:text-base break-words">
                    {t('destinations.content.nosy.description')}
                  </p>
                  <ul className="space-y-3 mb-8 text-gray-700 dark:text-gray-300 min-w-0 text-sm sm:text-base">
                    <li className="flex items-center gap-3 min-w-0 break-words">
                      <i className="fas fa-check-circle text-emerald-500 dark:text-emerald-400 shrink-0"></i>
                      <span className="break-words min-w-0">{t('destinations.content.nosy.feature_excursions')}</span>
                    </li>
                    <li className="flex items-center gap-3 min-w-0 break-words">
                      <i className="fas fa-check-circle text-emerald-500 dark:text-emerald-400 shrink-0"></i>
                      <span className="break-words min-w-0">{t('destinations.content.nosy.feature_snorkeling')}</span>
                    </li>
                    <li className="flex items-center gap-3 min-w-0 break-words">
                      <i className="fas fa-check-circle text-emerald-500 dark:text-emerald-400 shrink-0"></i>
                      <span className="break-words min-w-0">{t('destinations.content.nosy.feature_lokobe')}</span>
                    </li>
                    <li className="flex items-center gap-3 min-w-0 break-words">
                      <i className="fas fa-check-circle text-emerald-500 dark:text-emerald-400 shrink-0"></i>
                      <span className="break-words min-w-0">{t('destinations.content.nosy.feature_sunset')}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0 min-w-0">
                <Link 
                  to="/nosy" 
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3.5 rounded-xl transition-all text-center block shadow-md hover:shadow-emerald-500/20 whitespace-normal shrink-0"
                >
                  {t('destinations.content.nosy.cta')} <i className="fas fa-arrow-right ml-2 shrink-0"></i>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Destinations