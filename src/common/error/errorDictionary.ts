export enum Lang {
  ptBR = 'pt', enUS = 'en',
}

export interface Dictionary {
  ['pt']: { [key: string]: string }
  ['en']: { [key: string]: string }
}

export class ErrorDictionary {
  constructor(private dictionary: Dictionary) {}

  public get(language: Lang) {
    return this.dictionary[language] || this.dictionary[Lang.enUS]
  }
}

let errorDictionary: ErrorDictionary

export const defineErrorDictionary = (dictionary: Dictionary) => {
  errorDictionary = new ErrorDictionary(dictionary)
}

export const getErrorDictionary = () => {
  return errorDictionary as ErrorDictionary
}
