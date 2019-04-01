import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
class User {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public name: string

    @Column({nullable: true})
    public age: string

    @Column()
    public email: string
}

export default User
