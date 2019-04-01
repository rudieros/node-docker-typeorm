import { NoPassword } from '../types/NoPasswordType'
import { Auth } from './Auth'

export type TokenPayload = NoPassword<Auth>
