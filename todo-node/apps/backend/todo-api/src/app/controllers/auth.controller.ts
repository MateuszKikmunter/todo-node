//libs imports
import { getConnection, Repository } from 'typeorm';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { User } from '@todo-node/server/database';
import { HttpCode } from '@todo-node/shared/utils';


export class AuthController {

    private _userRepository: Repository<User>;

    constructor() {
        this._userRepository = getConnection('sqlite').getRepository(User);
    }

    public async register(req: Request, res: Response) {
        try {
            if (req.body) {
                const { email, password } = req.body;
                const salt: string = await bcrypt.genSalt();
                const passwordHash: string = await bcrypt.hash(password, salt);

                await this._userRepository.save({
                    email: email,
                    password: passwordHash,
                });

                return res.status(HttpCode.OK).json(email);
            }
        } catch (err) {
            console.log(err);
            return res.status(HttpCode.SERVER_ERROR).json({ error: 'There was an error ' })
        }
    }
}
