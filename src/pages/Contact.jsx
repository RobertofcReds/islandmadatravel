import LocationMap from '../components/LocationMap'
import DestinationSelector from '../components/DestinationSelector'
import { Link, useSearchParams } from 'react-router-dom'
import useDialog from '../hooks/useDialog'
import { FAQ } from '../components/Journey'
import Hero from '../components/Hero'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useLanguage } from '../context/LanguageContext'

import diegoMerEmeraude from '../images/optimized/destination/Mer d\'Émeraude.webp'
import nosyIranja from '../images/optimized/destination/Nosy Iranja.webp'
import diegoTroisBaies from '../images/optimized/destination/Les Trois Baies.webp'
import nosyParfums from '../images/optimized/destination/Nosy Be - Île aux Parfums.webp'
import diegoRamena from '../images/optimized/destination/Plage de Ramena.webp'
import nosyAndilana from '../images/optimized/destination/Plage d\'Andilana.webp'

// HD images
import hdCapDiego from '../images/optimized/diego/031-cap diego_three.webp'
import hdNosyBeach from '../images/optimized/nosy/019-caption.webp'

const Contact = () => {
  const { t } = useLanguage()
  const [searchParams] = useSearchParams()
  const requestedDestination = searchParams.get('destination')
  const initialDestination = ['diego', 'nosy', 'both'].includes(requestedDestination) ? requestedDestination : ''

  const heroImages = [
    nosyIranja,
    hdCapDiego,
    diegoTroisBaies,
    nosyAndilana,
    hdNosyBeach,
    diegoMerEmeraude,
    nosyParfums,
    diegoRamena,
  ]


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: initialDestination,
    dates: '',
    message: ''
  })

  const [submitStatus, setSubmitStatus] = useState(null) // null | 'submitting' | 'success' | 'error'
  const [isModalOpen, setIsModalOpen] = useState(false)
  const formTopRef = useRef(null)
  const formRef = useRef(null)
  const modalRef = useRef(null)
  const sendingRef = useRef(false)
  const requestRef = useRef(null)
  const closeModal = useCallback(() => setIsModalOpen(false), [])
  useDialog(modalRef, isModalOpen, closeModal)
  useEffect(() => () => requestRef.current?.abort(), [])


  const getWhatsAppLink = () => {
    const text = `Bonjour Roberto, je vous contacte depuis le site Island Mada Travel.\n\n*Nom :* ${formData.name || 'Voyageur'}\n*Destination :* ${formData.destination || 'Non spécifiée'}\n*Dates :* ${formData.dates || 'À définir'}\n*Message :* ${formData.message || 'Demande d\'informations'}`
    return `https://wa.me/261325539635?text=${encodeURIComponent(text)}`
  }

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()
    if (sendingRef.current || !formRef.current?.reportValidity()) return
    sendingRef.current = true
    setIsModalOpen(false)
    const controller = new AbortController()
    requestRef.current = controller
    const timeout = setTimeout(() => controller.abort(), 20000)
    setSubmitStatus('submitting')

    let destinationLabel = 'Non spécifiée'
    if (formData.destination === 'diego') destinationLabel = 'Diégo-Suarez'
    else if (formData.destination === 'nosy') destinationLabel = 'Nosy Be'
    else if (formData.destination === 'both') destinationLabel = 'Diégo-Suarez & Nosy Be'
    else if (formData.destination) destinationLabel = formData.destination

    try {
      const response = await fetch('https://formsubmit.co/ajax/islandmadatravel@gmail.com', {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `Nouvelle demande de voyage - ${formData.name}`,
          _replyto: formData.email,
          _template: 'table',
          _captcha: 'false',
          'Nom': formData.name,
          'Email': formData.email,
          'Téléphone': formData.phone || 'Non renseigné',
          'Destination': destinationLabel,
          'Dates': formData.dates || 'Non spécifiées',
          'Message': formData.message
        })
      })

      const data = await response.json().catch(() => ({}))

      if (response.ok && (data.success === 'true' || data.success === true) && !/activat/i.test(data.message || '')) {
        setSubmitStatus('success')
        setIsModalOpen(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          destination: '',
          dates: '',
          message: ''
        })
      } else {
        throw new Error(data.message || 'Erreur d\'envoi')
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error)
      setSubmitStatus('error')
      setIsModalOpen(true)
    } finally {
      clearTimeout(timeout)
      sendingRef.current = false
      requestRef.current = null
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="relative">
      {/* Centered Notification Modal */}
      {isModalOpen && submitStatus && submitStatus !== 'submitting' && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md transition-all animate-fadeIn"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-lg rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border backdrop-blur-xl animate-modal-in overflow-hidden transition-all text-center ${submitStatus === 'success'
                ? 'bg-white/95 dark:bg-gray-900/95 border-emerald-500/30 text-gray-900 dark:text-white shadow-emerald-950/20 dark:shadow-emerald-950/50'
                : 'bg-white/95 dark:bg-gray-900/95 border-rose-500/30 text-gray-900 dark:text-white shadow-rose-950/20 dark:shadow-rose-950/50'
              }`}
          >
            {/* Decorative ambient glow */}
            <div
              className={`absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none ${submitStatus === 'success' ? 'bg-emerald-400/20' : 'bg-rose-400/20'
                }`}
            />
            <div
              className={`absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-3xl pointer-events-none ${submitStatus === 'success' ? 'bg-teal-400/20' : 'bg-amber-400/20'
                }`}
            />

            {/* Close button at top right */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              aria-label="Fermer"
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300 flex items-center justify-center transition-all hover:scale-105"
            >
              <i className="fas fa-times text-sm"></i>
            </button>

            {/* Big Icon Badge */}
            <div className="flex justify-center mb-5">
              <div
                className={`w-20 h-20 rounded-3xl flex items-center justify-center text-3xl text-white shadow-xl transition-transform ${submitStatus === 'success'
                    ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-emerald-500/30'
                    : 'bg-gradient-to-tr from-rose-500 to-amber-500 shadow-rose-500/30'
                  }`}
              >
                <i className={`fas ${submitStatus === 'success' ? 'fa-check' : 'fa-triangle-exclamation'}`}></i>
              </div>
            </div>

            {/* Status Pill */}
            <div className="mb-3">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${submitStatus === 'success'
                    ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300/40 dark:border-emerald-700/50'
                    : 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-300/40 dark:border-rose-700/50'
                  }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${submitStatus === 'success' ? 'bg-emerald-500' : 'bg-rose-500'
                    } animate-pulse`}
                ></span>
                {submitStatus === 'success'
                  ? t('contact.form.success_title')
                  : t('contact.form.error_title')}
              </span>
            </div>

            {/* Main Title */}
            <h3
              id="contact-modal-title"
              className="text-xl sm:text-2xl font-serif font-bold text-gray-900 dark:text-white mb-3"
            >
              {submitStatus === 'success'
                ? t('contact.form.success_title')
                : t('contact.form.error_title')}
            </h3>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-6 max-w-md mx-auto">
              {submitStatus === 'success'
                ? t('contact.form.success')
                : t('contact.form.error_desc')}
            </p>

            {/* Info Badges for Success */}
            {submitStatus === 'success' && (
              <div className="mb-6 bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/50 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-around gap-2 text-xs text-emerald-900 dark:text-emerald-200 font-medium">
                <span className="flex items-center gap-2">
                  <i className="fas fa-clock text-emerald-500 text-sm"></i>
                  {t('contact.form.response_time')}
                </span>
                <span className="hidden sm:inline opacity-40">•</span>
                <span className="flex items-center gap-2">
                  <i className="fas fa-map-marked-alt text-emerald-500 text-sm"></i>
                  Diégo-Suarez & Nosy Be
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {submitStatus === 'success' ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-semibold py-3.5 px-6 rounded-2xl transition-all shadow-lg shadow-emerald-500/25 text-center text-sm sm:text-base"
                  >
                    {t('contact.form.modal_close')}
                  </button>
                  <a
                    href="https://wa.me/261325539635"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-700/60 font-semibold py-3.5 px-5 rounded-2xl transition-all text-center text-sm whitespace-nowrap"
                  >
                    <i className="fab fa-whatsapp text-lg text-emerald-500"></i>
                    <span>WhatsApp Direct</span>
                  </a>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false)
                      handleSubmit()
                    }}
                    className="w-full sm:flex-1 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-semibold py-3.5 px-6 rounded-2xl transition-all shadow-lg shadow-rose-600/25 text-center text-sm sm:text-base flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-redo-alt text-sm"></i>
                    <span>{t('contact.form.retry')}</span>
                  </button>
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-semibold py-3.5 px-6 rounded-2xl transition-all shadow-lg shadow-emerald-500/25 text-center text-sm sm:text-base"
                  >
                    <i className="fab fa-whatsapp text-lg"></i>
                    <span>{t('contact.form.contact_whatsapp')}</span>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <Hero images={heroImages} title={t('contact.hero.title')} subtitle={t('contact.hero.subtitle')} badge={t('navbar.contact')} anchor="contact-form"  actions={[{ href: '#contact-form', label: t('contact.hero.cta_form') }, { href: 'https://wa.me/261325539635', label: t('contact.hero.cta_whatsapp') }]} />

      {/* Main Content */}
      <div className="py-20 overflow-hidden" id="contact-form">
        <div className="container-custom max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 min-w-0">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 break-words">{t('contact.info.title')}</h2>
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-2xl mx-auto break-words">
              {t('contact.info.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 min-w-0">
            {/* Contact Info Side */}
            <div className="space-y-8 min-w-0">
              <h3 className="font-serif text-2xl font-semibold text-gray-900 dark:text-white break-words">
                {t('contact.info.coordinates')}
              </h3>

              <div className="space-y-6 min-w-0">
                <div className="flex items-start gap-4 min-w-0">
                  <div className="bg-emerald-500/10 text-emerald-500 dark:bg-emerald-400/20 dark:text-emerald-400 w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-xl">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-lg text-gray-900 dark:text-white break-words">{t('contact.info.location')}</h4>
                    <p className="text-gray-600 dark:text-gray-300 break-words">{t('contact.info.location_value')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 min-w-0">
                  <div className="bg-emerald-500/10 text-emerald-500 dark:bg-emerald-400/20 dark:text-emerald-400 w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-xl">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-lg text-gray-900 dark:text-white break-words">{t('contact.info.email')}</h4>
                    <a href="mailto:islandmadatravel@gmail.com" className="text-gray-600 dark:text-gray-300 hover:text-emerald-500 transition-colors break-all block min-w-0">
                      islandmadatravel@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 min-w-0">
                  <div className="bg-emerald-500/10 text-emerald-500 dark:bg-emerald-400/20 dark:text-emerald-400 w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-xl">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-lg text-gray-900 dark:text-white break-words">{t('contact.info.phone')}</h4>
                    <a href="tel:+261325539635" className="text-gray-600 dark:text-gray-300 hover:text-emerald-500 transition-colors whitespace-nowrap block min-w-0">
                      +261 32 55 396 35
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 min-w-0">
                  <div className="bg-emerald-500/10 text-emerald-500 dark:bg-emerald-400/20 dark:text-emerald-400 w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-xl">
                    <i className="fab fa-whatsapp"></i>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-lg text-gray-900 dark:text-white break-words">{t('contact.info.whatsapp')}</h4>
                    <a className="text-gray-600 dark:text-gray-300 whitespace-nowrap" href="https://wa.me/261325539635" target="_blank" rel="noopener noreferrer">+261 32 55 396 35</a>
                  </div>
                </div>
              </div>

              {/* Map Box */}
              <LocationMap />
            </div>

            {/* Contact Form Side */}
            <div className="bg-gray-50 dark:bg-gray-800/80 p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden min-w-0 relative">
              <div ref={formTopRef} className="-translate-y-24 invisible" aria-hidden="true" />

              <div className="flex items-center justify-between gap-4 mb-6">
                <h3 className="font-serif text-2xl font-semibold text-gray-900 dark:text-white break-words">
                  {t('contact.form.title')}
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300/40 dark:border-emerald-700/40 shrink-0">
                  <i className="fas fa-bolt text-emerald-500"></i>
                  <span>{t('contact.form.response_time')}</span>
                </span>
              </div>

              {/* IN-FORM NOTIFICATION: SUCCESS STATE */}
              {submitStatus === 'success' && (
                <div
                  role="status"
                  aria-live="polite"
                  className="mb-6 rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-50 via-teal-50/40 to-emerald-50 dark:from-emerald-950/40 dark:via-gray-800/90 dark:to-emerald-950/30 p-5 sm:p-6 shadow-xl shadow-emerald-500/10 relative overflow-hidden animate-banner-in backdrop-blur-sm"
                >
                  {/* Decorative Glow */}
                  <div className="absolute -right-8 -top-8 w-36 h-36 bg-emerald-400/20 dark:bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center text-xl shadow-lg shadow-emerald-500/30 shrink-0">
                      <i className="fas fa-check"></i>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                          {t('contact.form.success_title')}
                        </span>
                        <button
                          type="button"
                          onClick={() => setSubmitStatus(null)}
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                          aria-label="Fermer"
                        >
                          <i className="fas fa-times text-sm"></i>
                        </button>
                      </div>

                      <p className="mt-2 text-base sm:text-lg font-medium text-gray-900 dark:text-white leading-relaxed">
                        {t('contact.form.success')}
                      </p>

                      <div className="mt-4 pt-3 border-t border-emerald-200/70 dark:border-emerald-800/50 flex flex-wrap items-center justify-between gap-3 text-xs text-emerald-900/80 dark:text-emerald-300 font-medium">
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                          <span className="flex items-center gap-1.5">
                            <i className="fas fa-clock text-emerald-600 dark:text-emerald-400"></i>
                            {t('contact.form.response_time')}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <i className="fas fa-compass text-emerald-600 dark:text-emerald-400"></i>
                            Diégo-Suarez & Nosy Be
                          </span>
                        </div>

                        <a
                          href="https://wa.me/261325539635"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300 font-semibold hover:text-emerald-800 dark:hover:text-emerald-200 transition-colors"
                        >
                          <i className="fab fa-whatsapp text-emerald-600 dark:text-emerald-400 text-sm"></i>
                          {t('contact.form.contact_whatsapp')}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* IN-FORM NOTIFICATION: ERROR STATE */}
              {submitStatus === 'error' && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="mb-6 rounded-2xl border-2 border-rose-500/40 bg-gradient-to-br from-rose-50 via-red-50/40 to-amber-50/30 dark:from-rose-950/40 dark:via-gray-800/90 dark:to-rose-950/30 p-5 sm:p-6 shadow-xl shadow-rose-500/10 relative overflow-hidden animate-banner-in backdrop-blur-sm"
                >
                  {/* Decorative Glow */}
                  <div className="absolute -right-8 -top-8 w-36 h-36 bg-rose-400/20 dark:bg-rose-400/10 rounded-full blur-2xl pointer-events-none" />

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white flex items-center justify-center text-xl shadow-lg shadow-rose-500/30 shrink-0">
                      <i className="fas fa-triangle-exclamation"></i>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300">
                          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                          {t('contact.form.error_title')}
                        </span>
                        <button
                          type="button"
                          onClick={() => setSubmitStatus(null)}
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                          aria-label="Fermer"
                        >
                          <i className="fas fa-times text-sm"></i>
                        </button>
                      </div>

                      <p className="mt-2 text-sm sm:text-base font-medium text-gray-900 dark:text-white leading-relaxed">
                        {t('contact.form.error_desc')}
                      </p>

                      {/* Action buttons */}
                      <div className="mt-4 pt-3 border-t border-rose-200/70 dark:border-rose-800/50 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => formRef.current?.requestSubmit()}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-rose-600/20 transition-all"
                        >
                          <i className="fas fa-redo-alt"></i>
                          <span>{t('contact.form.retry')}</span>
                        </button>

                        <a
                          href={getWhatsAppLink()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-emerald-500/20 transition-all"
                        >
                          <i className="fab fa-whatsapp text-base"></i>
                          <span>{t('contact.form.contact_whatsapp')}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} aria-busy={submitStatus === 'submitting'} className="space-y-5 min-w-0">
                <div className="min-w-0">
                  <label htmlFor="contact-name" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 break-words">{t('contact.form.label_name')}</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={submitStatus === 'submitting'}
                    className="contact-input min-w-0 disabled:opacity-60"
                    placeholder={t('contact.form.placeholder_name')}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 min-w-0">
                  <div className="min-w-0">
                    <label htmlFor="contact-email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 break-words">{t('contact.form.label_email')}</label>
                    <input
                      type="email"
                      id="contact-email"
                    name="email"
                    autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={submitStatus === 'submitting'}
                      className="contact-input min-w-0 disabled:opacity-60"
                      placeholder={t('contact.form.placeholder_email')}
                    />
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="contact-phone" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 break-words">{t('contact.form.label_phone')}</label>
                    <input
                      type="tel"
                      id="contact-phone"
                    name="phone"
                    autoComplete="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={submitStatus === 'submitting'}
                      className="contact-input min-w-0 disabled:opacity-60"
                      placeholder={t('contact.form.placeholder_phone')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 min-w-0">
                  <div className="min-w-0">
                    <label htmlFor="contact-destination" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 break-words">{t('contact.form.label_destination')}</label>
                    <DestinationSelector value={formData.destination}
                      onChange={destination => setFormData(previous => ({ ...previous, destination }))}
                      disabled={submitStatus === 'submitting'} />
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="contact-dates" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 break-words">{t('contact.form.label_dates')}</label>
                    <input
                      type="text"
                      id="contact-dates"
                    name="dates"
                      value={formData.dates}
                      onChange={handleChange}
                      disabled={submitStatus === 'submitting'}
                      className="contact-input min-w-0 disabled:opacity-60"
                      placeholder={t('contact.form.placeholder_dates')}
                    />
                  </div>
                </div>

                <div className="min-w-0">
                  <label htmlFor="contact-message" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300 break-words">{t('contact.form.label_message')}</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    maxLength={5000}
                    disabled={submitStatus === 'submitting'}
                    className="contact-input resize-none min-w-0 disabled:opacity-60"
                    placeholder={t('contact.form.placeholder_message')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitStatus === 'submitting'}
                  className={`w-full font-semibold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 shrink-0 ${submitStatus === 'submitting'
                      ? 'bg-emerald-400 dark:bg-emerald-600 text-white cursor-not-allowed opacity-90'
                      : 'bg-emerald-500 hover:bg-emerald-600 text-white hover:shadow-emerald-500/25 active:scale-[0.99]'
                    }`}
                >
                  {submitStatus === 'submitting' ? (
                    <>
                      <i className="fas fa-circle-notch fa-spin text-lg"></i>
                      <span>{t('contact.form.submitting')}</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane text-sm"></i>
                      <span>{t('contact.form.submit')}</span>
                    </>
                  )}
                </button>
                <p className="form-note">{t('ui.formPrivacy')} <Link to="/privacy">{t('footer.privacy')}</Link></p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <FAQ />
    </div>
  )
}
export default Contact
