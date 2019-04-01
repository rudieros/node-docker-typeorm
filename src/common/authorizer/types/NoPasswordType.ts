import { Omit } from './OmitType'

export type NoPassword<T extends { password: string }> = Omit<T, 'password'>
