import { Column, Entity, PrimaryColumn, Unique } from 'typeorm'
import { Auth as AuthAppModel } from '../../authorizer/models/Auth'

@Entity()
@Unique(['username'])
export class Auth extends AuthAppModel { // TODO maybe only one model?
    @PrimaryColumn()
    public id: string

    @Column()
    public username: string

    @Column('text', {array: true})
    public roles: string[]

    @Column()
    public password: string
}
