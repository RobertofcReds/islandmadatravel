import { Compass, MapPin, Route } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import SelectMenu from './SelectMenu'
import diego from '../images/optimized/destination/Mer d\'Émeraude-768.webp'
import nosy from '../images/optimized/destination/Nosy Iranja-768.webp'

export default function DestinationSelector({ value, onChange, disabled }) {
  const { t } = useLanguage()
  const options = [
    { value: '', label: t('selectors.undecided'), description: t('selectors.undecidedHint'), icon: Compass },
    { value: 'diego', label: t('contact.form.option_diego'), description: t('selectors.diegoHint'), image: diego },
    { value: 'nosy', label: t('contact.form.option_nosy'), description: t('selectors.nosyHint'), image: nosy },
    { value: 'both', label: t('contact.form.option_both'), description: t('selectors.bothHint'), icon: Route },
  ]
  return <SelectMenu id="contact-destination" name="destination" label={t('contact.form.label_destination')}
    title={t('selectors.destinationTitle')} subtitle={t('selectors.destinationHint')}
    placeholder={t('selectors.destinationPlaceholder')} value={value} onChange={onChange} disabled={disabled} options={options} icon={MapPin} />
}
