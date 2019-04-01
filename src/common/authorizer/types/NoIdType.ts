import { Omit } from './OmitType'

export type NoId<T extends { id: string }> = Omit<T, 'id'>
