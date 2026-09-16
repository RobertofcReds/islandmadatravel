import Hero from '../components/Hero'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import PlacesGrid from '../components/PlacesGrid'
import nosyParfums from '../images/optimized/destination/Nosy Be - Île aux Parfums.webp'
import nosyIranja from '../images/optimized/destination/Nosy Iranja.webp'
import { getNosySections, nosyHeroImages } from '../data/nosyData'

const Nosy = () => {
  const { t, language } = useLanguage()
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [activeSection, setActiveSection] = useState('islands')

  const heroImages = nosyHeroImages
  const nosySections = getNosySections(language)


  // Sync selectedPlace with current language if a place is currently open
  useEffect(() => {
    if (selectedPlace) {
      for (const sec of nosySections) {
        const found = sec.places.find(p => p.id === selectedPlace.id)
        if (found) {
          setSelectedPlace(found)
          break
        }
      }
    }
  }, [language])

  const currentSection = nosySections.find(s => s.id === activeSection) || nosySections[0]

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      {/* ── Hero ── */}
      <Hero images={heroImages} title={t('nosy.hero.title')} subtitle={t('nosy.hero.subtitle')} badge={t('navbar.nosy')} anchor="explore"  actions={[{ to: '/contact?destination=nosy', label: t('nosy.hero.cta_book') }, { href: '#explore', label: t('ui.discover') }]} />

      {/* ── À propos ── */}
      <div className="py-20" id="explore">
        <div className="container-custom max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24 bg-white dark:bg-gray-800 p-6 sm:p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="rounded-2xl overflow-hidden shadow-lg h-72 sm:h-96">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-105"
                style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2)), url("${nosyParfums}")` }}
              />
            </div>
            <div>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider text-sm uppercase mb-2 block">
                {t('nosy.about.badge')}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {t('nosy.about.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                {t('nosy.about.paragraph1')}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {t('nosy.about.paragraph2')}
              </p>
              <div className="bg-emerald-500/10 dark:bg-emerald-400/10 p-4 rounded-xl mb-8 border border-emerald-500/20">
                <h3 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-1 flex items-center gap-2">
                  <i className="fas fa-calendar-alt text-emerald-500" />
                  {t('nosy.about.best_time_label')}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 font-medium">{t('nosy.about.best_time_value')}</p>
              </div>
              <Link
                to="/contact?destination=nosy"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3.5 rounded-xl transition-all inline-block shadow-md"
              >
                {t('nosy.about.cta')}
              </Link>
            </div>
          </div>

          {/* ── Tabs des sections ── */}
          <div className="mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-2">
              {t('nosy_page.explore_title')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
              {t('nosy_page.explore_subtitle')}
            </p>

            <div className="destination-filters flex flex-wrap gap-2 justify-center mb-10">
              {nosySections.map(section => (
                <button
                  key={section.id}
                  aria-pressed={activeSection === section.id}
                  onClick={() => { setActiveSection(section.id); setSelectedPlace(null) }}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeSection === section.id
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400'
                  }`}
                >
                  <i className={`${section.icon} text-sm`} />
                  <span>{section.title}</span>
                </button>
              ))}
            </div>

            <div
              key={activeSection}
              style={{ animation: 'modalIn 0.3s ease-out' }}
            >
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 mb-6 text-white">
                <div className="flex items-center gap-3 mb-1">
                  <i className={`${currentSection.icon} text-2xl`} />
                  <h3 className="font-serif text-2xl font-bold">{currentSection.title}</h3>
                </div>
                <p className="text-emerald-50 text-sm">{currentSection.description}</p>
                <p className="text-emerald-200 text-xs mt-2">
                  {currentSection.places.length} {t('nosy_page.places_suffix')}
                </p>
              </div>

              <PlacesGrid places={currentSection.places} selectedPlace={selectedPlace} onSelect={p => setSelectedPlace(previous => previous?.id === p.id ? null : p)} onClose={() => setSelectedPlace(null)} />
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="mt-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-center text-white overflow-hidden relative">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `url("${nosyIranja}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }} />
            <div className="relative z-10">
              <i className="fas fa-anchor text-emerald-400 text-4xl mb-4 block" />
              <h3 className="font-serif text-2xl md:text-3xl font-bold mb-3">
                {t('nosy_page.cta_title')}
              </h3>
              <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                {t('nosy_page.cta_subtitle')}
              </p>
              <Link
                to="/contact?destination=nosy"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3.5 rounded-xl transition-all inline-flex items-center gap-2 shadow-lg"
              >
                <i className="fas fa-envelope" />
                {t('nosy_page.cta_btn')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nosy