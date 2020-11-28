//libs imports
import { User } from '@todo-node/server/database';
import { getConnection, Repository } from 'typeorm';


export class UserController {

    private _userRepository: Repository<User>;

    constructor() {
        this._userRepository = getConnection('sqlite').getRepository(User);
    }
}