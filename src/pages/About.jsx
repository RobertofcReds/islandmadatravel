import ResponsiveImage from '../components/ResponsiveImage'
import Hero from '../components/Hero'
import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

import about4 from '../images/optimized/about/IMG20251113153333.webp'
import about5 from '../images/optimized/about/IMG_20250818_095525131_MF_PORTRAIT.webp'
import about6 from '../images/optimized/about/IMG_20250818_105958718_MF_PORTRAIT.webp'
import about7 from '../images/optimized/about/IMG_20250818_112042306.webp'
import about8 from '../images/optimized/about/IMG_20250901_105406224_MF_PORTRAIT.webp'
import about9 from '../images/optimized/about/IMG_20250901_114656041_MF_PORTRAIT.webp'
import about10 from '../images/optimized/about/IMG_20250901_114719079_MF_PORTRAIT.webp'
import about11 from '../images/optimized/about/IMG_20250902_131209829_MF_PORTRAIT.webp'

const About = () => {
  const { t } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const heroImages = [
    about9,
    about5,
    about11,
    about6,
    about4,
    about8,
    about7,
    about10,
  ]


  const guideImages = [
    { url: about5, caption: 'Guidage dans la forêt de Montagne d\'Ambre' },
    { url: about6, caption: 'Visite des Tsingy Rouges' },
    { url: about8, caption: 'Excursion à la Mer d\'Émeraude' },
    { url: about9, caption: 'Randonnée à la Montagne des Français' },
    { url: about11, caption: 'Découverte de Nosy Be' },
  ]


  return (
    <div>
      {/* Hero Section */}
      <Hero images={heroImages} title={t('about.hero.title')} subtitle={t('about.hero.subtitle')} badge={t('navbar.about')} anchor="about"  actions={[{ to: '/contact', label: t('about.hero.cta_contact') }, { href: '#about', label: t('about.hero.cta_learn') }]} />

      {/* Main Content */}
      <div className="py-20 overflow-hidden" id="about">
        <div className="container-custom max-w-7xl mx-auto px-6">

          {/* Bio + Image Slider */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24 min-w-0">
            <div className="min-w-0">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6 break-words">
                {t('about.bio.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-base sm:text-lg break-words">
                {t('about.bio.paragraph1')}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-base sm:text-lg break-words">
                {t('about.bio.paragraph2')}
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg break-words">
                {t('about.bio.paragraph3')}
              </p>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[360px] sm:h-[420px] border border-gray-100 dark:border-gray-800 min-w-0">
              <ResponsiveImage
                loading="lazy" decoding="async"
                src={guideImages[currentImageIndex].url}
                alt={guideImages[currentImageIndex].caption}
                className="w-full h-full object-cover transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-8 min-w-0">
                <p className="text-white font-medium text-lg sm:text-xl mb-4 truncate min-w-0">{guideImages[currentImageIndex].caption}</p>
                <div className="flex gap-2 shrink-0">
                  {guideImages.map((_, index) => (
                    <button
                      key={index}
                      aria-label={`Photo ${index + 1}`}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-1.5 rounded-full transition-all ${index === currentImageIndex ? 'w-8 bg-emerald-400' : 'w-2 bg-white/50'
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            <div className="bg-gray-50 dark:bg-gray-800/80 p-8 rounded-3xl text-center border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden min-w-0">
              <div className="text-4xl sm:text-5xl font-extrabold text-emerald-500 dark:text-emerald-400 mb-2 break-words">5+</div>
              <div className="text-gray-700 dark:text-gray-300 text-base sm:text-lg font-medium break-words">{t('about.stats.experience')}</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/80 p-8 rounded-3xl text-center border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden min-w-0">
              <div className="text-4xl sm:text-5xl font-extrabold text-emerald-500 dark:text-emerald-400 mb-2 break-words">500+</div>
              <div className="text-gray-700 dark:text-gray-300 text-base sm:text-lg font-medium break-words">{t('about.stats.travelers')}</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800/80 p-8 rounded-3xl text-center border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden min-w-0">
              <div className="text-4xl sm:text-5xl font-extrabold text-emerald-500 dark:text-emerald-400 mb-2 break-words">100%</div>
              <div className="text-gray-700 dark:text-gray-300 text-base sm:text-lg font-medium break-words">{t('about.stats.custom')}</div>
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white rounded-3xl p-10 md:p-16 shadow-2xl">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center text-emerald-600 dark:text-emerald-400">
              {t('about.values.title')}
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="text-center space-y-3">
                <div className="text-4xl text-emerald-600 dark:text-emerald-400 mb-4">
                  <i className="fas fa-handshake"></i>
                </div>
                <h3 className="font-serif text-2xl font-semibold">{t('about.values.authenticity.title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {t('about.values.authenticity.description')}
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="text-4xl text-emerald-600 dark:text-emerald-400 mb-4">
                  <i className="fas fa-leaf"></i>
                </div>
                <h3 className="font-serif text-2xl font-semibold">{t('about.values.ecotourism.title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {t('about.values.ecotourism.description')}
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="text-4xl text-emerald-600 dark:text-emerald-400 mb-4">
                  <i className="fas fa-star"></i>
                </div>
                <h3 className="font-serif text-2xl font-semibold">{t('about.values.serenity.title')}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {t('about.values.serenity.description')}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default About