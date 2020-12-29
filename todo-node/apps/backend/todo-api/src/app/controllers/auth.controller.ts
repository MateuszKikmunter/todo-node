//libs imports
import * as bcrypt from 'bcrypt';
import { getConnection } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '@todo-node/server/database';
import { HttpCode } from '@todo-node/shared/utils';


export class AuthController {

    /**
     * Create an account for a user if correct details provided and validation rules passed.
     * @param req request
     * @param res response
     */
    public register = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { email, password } = req.body;
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);

            await getConnection('sqlite').getRepository(User).save({
                email: email,
                password: passwordHash
            });

            return res.status(HttpCode.OK).json(email);

        } catch (err) {
            console.log(err);
            return res.status(HttpCode.SERVER_ERROR).json({ error: 'Something went wrong!' });
        }
    }
}
