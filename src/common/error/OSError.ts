export class OSError extends Error {
  constructor(public type: string,
              public devMessage?: string,
              public httpCode?: number,
  ) {
    super(devMessage)
    const message = ''
  }
}
