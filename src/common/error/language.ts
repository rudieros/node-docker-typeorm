import { Lang } from './errorDictionary'

export type GetLanguageType = (headers: {[key: string]: string }) => Lang
export const getLanguage: GetLanguageType = (headers) => {
  let language
  let complement
  if (headers['Accepted-Language']) {
    [language, complement] = headers['Accepted-Language'].split('-')
  } else {
    language = headers['Accepted-Language']
  }
  return language as Lang || Lang.enUS
}
