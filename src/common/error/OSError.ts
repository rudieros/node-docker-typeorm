export class OSError {
  constructor(public type: string,
              public devMessage?: string,
              public httpCode?: number,
  ) {
    const message = ''
  }
}
