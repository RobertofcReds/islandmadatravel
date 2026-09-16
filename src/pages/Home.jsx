import ResponsiveImage from '../components/ResponsiveImage'
import { Journey, FAQ } from '../components/Journey'
import Hero from '../components/Hero'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

// Local destination images imports
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
import hdAmbre from '../images/optimized/diego/026-ambre.webp'
import hdCapDiego from '../images/optimized/diego/031-cap diego_three.webp'
import hdCascade from '../images/optimized/nosy/021-cascade_caption.webp'
import hdNosyBeach from '../images/optimized/nosy/019-caption.webp'

const Home = () => {
  const { t } = useLanguage()
  const [diegoIndex, setDiegoIndex] = useState(0)
  const [nosyIndex, setNosyIndex] = useState(0)

  const heroImages = [
    nosyIranja,
    hdAmbre,
    diegoTroisBaies,
    nosyParfums,
    hdCapDiego,
    diegoMerEmeraude,
    hdCascade,
    nosyAndilana,
    nosyTanikely,
    hdNosyBeach,
    diegoMontagneAmbre,
    diegoTsingyRouges,
  ]

  const diegoMedia = [
    { type: 'image', url: diegoTroisBaies, caption: 'Baie de Diégo-Suarez' },
    { type: 'image', url: diegoMontagneAmbre, caption: "Forêt de Montagne d'Ambre" },
    { type: 'image', url: diegoTsingyRouges, caption: 'Tsingy Rouges' },
    { type: 'image', url: diegoRamena, caption: 'Plage de Ramena' },
    { type: 'image', url: diegoMerEmeraude, caption: "Mer d'Émeraude" },
  ]

  const nosyMedia = [
    { type: 'image', url: nosyParfums, caption: 'Nosy Be - Île aux Parfums' },
    { type: 'image', url: nosyIranja, caption: 'Nosy Iranja' },
    { type: 'image', url: nosyTanikely, caption: 'Nosy Tanikely' },
    { type: 'image', url: nosyAndilana, caption: "Plage d'Andilana" },
    { type: 'image', url: nosyKomba, caption: 'Nosy Komba' },
  ]


  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <Hero images={heroImages} title={t('home.hero.title')} subtitle={t('home.hero.subtitle')} badge={t('home.hero.badge')} anchor="page-content" home actions={[{ to: '/destinations', label: t('home.hero.cta_explore') }, { to: '/contact', label: t('ui.plan') }]} />

      {/* Destinations Preview */}
      <section id="page-content" className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors overflow-hidden">
        <div className="container-custom max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 min-w-0">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-3 break-words">{t('home.destinations.title')}</h2>
            <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full mb-4 shrink-0"></div>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto break-words">{t('home.destinations.subtitle')}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            
            {/* Diégo-Suarez Card */}
            <div className="travel-card bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700/60 flex flex-col justify-between min-w-0">
              <div className="min-w-0">
                <div className="relative h-72 overflow-hidden group min-w-0">
                  {diegoMedia.map((media, idx) => (
                    <div
                      key={idx}
                      className={`absolute inset-0 transition-opacity duration-700 ${
                        idx === diegoIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      {media.type === 'image' ? (
                        <ResponsiveImage
                loading="lazy" decoding="async"
                          src={media.url}
                          alt={media.caption}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <video
                          src={media.url}
                          autoPlay
                          muted
                          loop
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  ))}
                  <span className="absolute top-4 right-4 bg-emerald-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-md z-10 tracking-wide uppercase truncate max-w-[75%] whitespace-nowrap shrink-0">
                    {t('home.destinations.diego.badge')}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 z-10 flex flex-col items-start gap-2 min-w-0">
                    <p className="text-white font-medium text-sm tracking-wide truncate min-w-0">{diegoMedia[diegoIndex].caption}</p>
                    
                    {/* Inner Card Dots */}
                    <div className="flex gap-1.5 shrink-0">
                      {diegoMedia.map((_, index) => (
                        <button
                          key={index}
                          aria-label={`Photo ${index + 1}`}
                          onClick={() => setDiegoIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === diegoIndex ? 'bg-emerald-400 w-4' : 'bg-white/60'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 min-w-0">
                  <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2 break-words">
                    <i className="fas fa-wind text-emerald-500 shrink-0"></i> <span>{t('home.destinations.diego.title')}</span>
                  </h3>
                  <p className="text-emerald-600 dark:text-emerald-400 font-medium text-sm mb-4 flex items-center gap-2 break-words">
                    <i className="fas fa-location-dot shrink-0"></i> <span>{t('home.destinations.diego.location')}</span>
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-sm break-words">
                    {t('home.destinations.diego.description')}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-sm text-gray-700 dark:text-gray-300 min-w-0">
                    <li className="flex items-center gap-2 min-w-0"><i className="fas fa-compass text-emerald-500 text-xs shrink-0"></i> <span className="break-words min-w-0">{t('home.destinations.diego.feature_bays')}</span></li>
                    <li className="flex items-center gap-2 min-w-0"><i className="fas fa-tree text-emerald-500 text-xs shrink-0"></i> <span className="break-words min-w-0">{t('home.destinations.diego.feature_parks')}</span></li>
                    <li className="flex items-center gap-2 min-w-0"><i className="fas fa-mountain text-emerald-500 text-xs shrink-0"></i> <span className="break-words min-w-0">{t('home.destinations.diego.feature_hiking')}</span></li>
                    <li className="flex items-center gap-2 min-w-0"><i className="fas fa-camera text-emerald-500 text-xs shrink-0"></i> <span className="break-words min-w-0">{t('home.destinations.diego.feature_culture')}</span></li>
                  </ul>
                </div>
              </div>

              <div className="px-6 sm:px-8 pb-6 sm:pb-8 min-w-0">
                <Link to="/diego" className="block w-full text-center bg-gray-900 dark:bg-gray-700 hover:bg-emerald-600 dark:hover:bg-emerald-600 text-white font-medium py-3 rounded-2xl transition-colors whitespace-normal">
                  {t('home.destinations.diego.cta')}
                </Link>
              </div>
            </div>

            {/* Nosy Be Card */}
            <div className="travel-card bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700/60 flex flex-col justify-between min-w-0">
              <div className="min-w-0">
                <div className="relative h-72 overflow-hidden group min-w-0">
                  {nosyMedia.map((media, idx) => (
                    <div
                      key={idx}
                      className={`absolute inset-0 transition-opacity duration-700 ${
                        idx === nosyIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      {media.type === 'image' ? (
                        <ResponsiveImage
                loading="lazy" decoding="async"
                          src={media.url}
                          alt={media.caption}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <video
                          src={media.url}
                          autoPlay
                          muted
                          loop
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  ))}
                  <span className="absolute top-4 right-4 bg-teal-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-md z-10 tracking-wide uppercase truncate max-w-[75%] whitespace-nowrap shrink-0">
                    {t('home.destinations.nosy.badge')}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 z-10 flex flex-col items-start gap-2 min-w-0">
                    <p className="text-white font-medium text-sm tracking-wide truncate min-w-0">{nosyMedia[nosyIndex].caption}</p>
                    
                    {/* Inner Card Dots */}
                    <div className="flex gap-1.5 shrink-0">
                      {nosyMedia.map((_, index) => (
                        <button
                          key={index}
                          aria-label={`Photo ${index + 1}`}
                          onClick={() => setNosyIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === nosyIndex ? 'bg-teal-400 w-4' : 'bg-white/60'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 min-w-0">
                  <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2 break-words">
                    <i className="fas fa-umbrella-beach text-teal-500 shrink-0"></i> <span>{t('home.destinations.nosy.title')}</span>
                  </h3>
                  <p className="text-teal-600 dark:text-teal-400 font-medium text-sm mb-4 flex items-center gap-2 break-words">
                    <i className="fas fa-location-dot shrink-0"></i> <span>{t('home.destinations.nosy.location')}</span>
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-sm break-words">
                    {t('home.destinations.nosy.description')}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-sm text-gray-700 dark:text-gray-300 min-w-0">
                    <li className="flex items-center gap-2 min-w-0"><i className="fas fa-sailboat text-teal-500 text-xs shrink-0"></i> <span className="break-words min-w-0">{t('home.destinations.nosy.feature_excursions')}</span></li>
                    <li className="flex items-center gap-2 min-w-0"><i className="fas fa-water text-teal-500 text-xs shrink-0"></i> <span className="break-words min-w-0">{t('home.destinations.nosy.feature_beaches')}</span></li>
                    <li className="flex items-center gap-2 min-w-0"><i className="fas fa-fish text-teal-500 text-xs shrink-0"></i> <span className="break-words min-w-0">{t('home.destinations.nosy.feature_snorkeling')}</span></li>
                    <li className="flex items-center gap-2 min-w-0"><i className="fas fa-sun text-teal-500 text-xs shrink-0"></i> <span className="break-words min-w-0">{t('home.destinations.nosy.feature_sunset')}</span></li>
                  </ul>
                </div>
              </div>

              <div className="px-6 sm:px-8 pb-6 sm:pb-8 min-w-0">
                <Link to="/nosy" className="block w-full text-center bg-gray-900 dark:bg-gray-700 hover:bg-teal-600 dark:hover:bg-teal-600 text-white font-medium py-3 rounded-2xl transition-colors whitespace-normal">
                  {t('home.destinations.nosy.cta')}
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-white dark:bg-gray-950 transition-colors overflow-hidden">
        <div className="container-custom max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 min-w-0">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-3 break-words">{t('home.services.title')}</h2>
            <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full mb-4 shrink-0"></div>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto break-words">{t('home.services.subtitle')}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: 'fa-map-location-dot', titleKey: 'home.services.guiding.title', descKey: 'home.services.guiding.description' },
              { icon: 'fa-clipboard-check', titleKey: 'home.services.organization.title', descKey: 'home.services.organization.description' },
              { icon: 'fa-van-shuttle', titleKey: 'home.services.transfers.title', descKey: 'home.services.transfers.description' },
              { icon: 'fa-route', titleKey: 'home.services.excursions.title', descKey: 'home.services.excursions.description' },
              { icon: 'fa-comments', titleKey: 'home.services.translation.title', descKey: 'home.services.translation.description' },
              { icon: 'fa-camera-retro', titleKey: 'home.services.photos.title', descKey: 'home.services.photos.description' },
            ].map((service, index) => (
              <div 
                key={index} 
                className="bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-800 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 overflow-hidden min-w-0"
              >
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform shrink-0">
                  <i className={`fas ${service.icon}`}></i>
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-3 break-words">{t(service.titleKey)}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed break-words">{t(service.descKey)}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-14">
            <Link 
              to="/services" 
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all whitespace-nowrap shrink-0"
            >
              <span className="truncate">{t('home.services.cta')}</span>
              <i className="fas fa-arrow-right text-xs shrink-0"></i>
            </Link>
          </div>
        </div>
      </section>

      <Journey />
      <FAQ />

      </div>
  )
}

export default Home