import { Globe } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import SelectMenu from './SelectMenu'

const languages = [
  { value: 'fr', label: 'Français', code: 'FR' },
  { value: 'en', label: 'English', code: 'EN' },
  { value: 'de', label: 'Deutsch', code: 'DE' },
  { value: 'it', label: 'Italiano', code: 'IT' },
  { value: 'es', label: 'Español', code: 'ES' },
]
export default function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage()
  return <SelectMenu compact label={t('ui.language')} subtitle={t('selectors.languageHint')}
    value={language} onChange={setLanguage} options={languages} icon={Globe} />
}
