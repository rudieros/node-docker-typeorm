import 'jest'
import {GetUserUC} from '../useCases/getUser'
import {UserController} from '../UserController'
import User from '../../../common/database/models/user'
import {setupDatabase} from '../../../common/database/setup'
import {getConnection} from 'typeorm'

let userController: UserController
let getUserUseCase: GetUserUC

beforeAll(async () => {
    await setupDatabase(true)
    userController = new UserController()
    getUserUseCase = new GetUserUC(userController)
})

afterEach(async () => {
    const connection = await getConnection()
    await connection.synchronize(true)
})

describe('getUserTests', () => {
    test('Should fetch user', async () => {
        const user = new User()
        user.id = 1
        user.name = 'Pedrao'
        user.age = '18'
        user.email = 'pedrinhodoceu'

        await userController.createUser(user)

        const fetchedUser = await getUserUseCase.execute(1)

        expect(fetchedUser.id).toBe(1)
        expect(fetchedUser.name).toBe('Pedrao')
    })

    test('Should return not found error', async () => {
        await expect(getUserUseCase.execute(1)).rejects.toThrow('Nao achou')
    })
})
