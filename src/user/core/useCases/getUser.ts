import {UserController} from '../UserController'

export class GetUserUC {
    constructor(private userController: UserController) {}

    public execute(id: number) {
        return this.userController.getUser(id)
    }
}
