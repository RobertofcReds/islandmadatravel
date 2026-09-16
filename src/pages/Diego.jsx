import Hero from '../components/Hero'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import PlacesGrid from '../components/PlacesGrid'
import diegoMerEmeraude from '../images/optimized/destination/Mer d\'Émeraude.webp'
import diegoTroisBaies from '../images/optimized/destination/Les Trois Baies.webp'
import { getDiegoSections, diegoHeroImages } from '../data/diegoData'

const Diego = () => {
  const { t, language } = useLanguage()
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [activeSection, setActiveSection] = useState('beaches')

  const heroImages = diegoHeroImages
  const diegoSections = getDiegoSections(language)


  // Sync selectedPlace with current language if a place is currently open
  useEffect(() => {
    if (selectedPlace) {
      for (const sec of diegoSections) {
        const found = sec.places.find(p => p.id === selectedPlace.id)
        if (found) {
          setSelectedPlace(found)
          break
        }
      }
    }
  }, [language])

  const currentSection = diegoSections.find(s => s.id === activeSection) || diegoSections[0]

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen">
      {/* ── Hero ── */}
      <Hero images={heroImages} title={t('diego.hero.title')} subtitle={t('diego.hero.subtitle')} badge={t('navbar.diego')} anchor="explore"  actions={[{ to: '/contact?destination=diego', label: t('diego.hero.cta_book') }, { href: '#explore', label: t('diego.hero.cta_explore') }]} />

      {/* ── À propos ── */}
      <div className="py-20" id="explore">
        <div className="container-custom max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24 bg-white dark:bg-gray-800 p-6 sm:p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="rounded-2xl overflow-hidden shadow-lg h-72 sm:h-96">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-105"
                style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2)), url("${diegoMerEmeraude}")` }}
              />
            </div>
            <div>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider text-sm uppercase mb-2 block">
                {t('diego.about.badge')}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {t('diego.about.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                {t('diego.about.paragraph1')}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {t('diego.about.paragraph2')}
              </p>
              <div className="bg-emerald-500/10 dark:bg-emerald-400/10 p-4 rounded-xl mb-8 border border-emerald-500/20">
                <h3 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-1 flex items-center gap-2">
                  <i className="fas fa-calendar-alt text-emerald-500" />
                  {t('diego.about.best_time_label')}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 font-medium">{t('diego.about.best_time_value')}</p>
              </div>
              <Link
                to="/contact?destination=diego"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3.5 rounded-xl transition-all inline-block shadow-md"
              >
                {t('diego.about.cta')}
              </Link>
            </div>
          </div>

          {/* ── Tabs des sections ── */}
          <div className="mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-2">
              {t('diego_page.explore_title')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
              {t('diego_page.explore_subtitle')}
            </p>

            {/* Navigation des sections */}
            <div className="destination-filters flex flex-wrap gap-2 justify-center mb-10">
              {diegoSections.map(section => (
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

            {/* Section active */}
            <div
              key={activeSection}
              style={{ animation: 'modalIn 0.3s ease-out' }}
            >
              {/* En-tête de section */}
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6 mb-6 text-white">
                <div className="flex items-center gap-3 mb-1">
                  <i className={`${currentSection.icon} text-2xl`} />
                  <h3 className="font-serif text-2xl font-bold">{currentSection.title}</h3>
                </div>
                <p className="text-emerald-50 text-sm">{currentSection.description}</p>
                <p className="text-emerald-200 text-xs mt-2">
                  {currentSection.places.length} {t('diego_page.places_suffix')}
                </p>
              </div>

              {/* Grille de cartes avec détails sous la carte cliquée */}
              <PlacesGrid places={currentSection.places} selectedPlace={selectedPlace} onSelect={p => setSelectedPlace(previous => previous?.id === p.id ? null : p)} onClose={() => setSelectedPlace(null)} />
            </div>
          </div>

          {/* ── CTA final ── */}
          <div className="mt-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-center text-white overflow-hidden relative">
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `url("${diegoTroisBaies}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }} />
            <div className="relative z-10">
              <i className="fas fa-compass text-emerald-400 text-4xl mb-4 block" />
              <h3 className="font-serif text-2xl md:text-3xl font-bold mb-3">
                {t('diego_page.cta_title')}
              </h3>
              <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                {t('diego_page.cta_subtitle')}
              </p>
              <Link
                to="/contact?destination=diego"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3.5 rounded-xl transition-all inline-flex items-center gap-2 shadow-lg"
              >
                <i className="fas fa-envelope" />
                {t('diego_page.cta_btn')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Diego