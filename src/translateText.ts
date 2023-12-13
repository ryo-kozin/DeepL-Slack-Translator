import axios from 'axios'
import { francAll } from 'franc'

const SUPPORTED_LANGUAGES = {
  eng: 'EN',
  deu: 'DE',
  fra: 'FR',
  spa: 'ES',
  por: 'PT',
  ita: 'IT',
  nld: 'NL',
  pol: 'PL',
  rus: 'RU',
  jpn: 'JA',
  cmn: 'ZH',
}

const minLength = 3

export async function translateText(text: string): Promise<string> {
  const { DEEPL_API_BASE_URL, DEEPL_AUTH_KEY } = process.env

  if (DEEPL_AUTH_KEY === undefined || DEEPL_AUTH_KEY === '') {
    throw new Error('DeepL auth key is not defined')
  }

  if (text === undefined || text === '') {
    throw new Error('No text provided')
  }

  const detectedLangs = francAll(text, { minLength })

  if (detectedLangs.length === 0 || detectedLangs[0][0] === 'und') {
    throw new Error('No language detected')
  }

  let detectedLang = detectedLangs[0][0]
  for (const [lang] of detectedLangs) {
    if (lang === 'eng' || lang === 'jpn') {
      detectedLang = lang
      break
    }
  }

  if (detectedLang === '' || SUPPORTED_LANGUAGES[detectedLang] === undefined) {
    throw new Error('Unsupported language')
  }

  let targetLang: string = 'EN'
  let sourceLang: string = 'JA'
  if (
    typeof detectedLang === 'string' &&
    SUPPORTED_LANGUAGES[detectedLang] !== undefined &&
    SUPPORTED_LANGUAGES[detectedLang] !== ''
  ) {
    sourceLang = SUPPORTED_LANGUAGES[detectedLang]
    targetLang = sourceLang === 'JA' ? 'EN' : 'JA'
  }
  const url = `${DEEPL_API_BASE_URL}?auth_key=${DEEPL_AUTH_KEY}&text=${encodeURIComponent(
    text,
  )}&target_lang=${targetLang}&source_lang=${sourceLang}`

  const response = await axios.get(url)
  return response.data.translations[0].text
}
