//libs imports
import * as bcrypt from 'bcrypt';
import { getConnection } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '@todo-node/server/database';
import { HttpCode } from '@todo-node/shared/utils';

//local imports
import { JwtService } from './../shared/services/jwt.service';
import { JwtPayload } from './../shared/types/jwt.playload';


export class AuthController {

    private _jwtService: JwtService;

    constructor() {
        this._jwtService = new JwtService();
    }

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

    /**
     * Login user based on the provided username and password.
     * @param req request
     * @param res response
     */
    public login = async (req: Request, res: Response): Promise<Response> => {
        try {

            const { email, password } = req.body;
            if(!email || !password) {
                return res.status(HttpCode.BAD_REQUEST).send({ error: 'Invalid username or password!' });
            }

            const user = await getConnection('sqlite').getRepository(User).findOne({ email: email });
            if(!user) {
                return res.status(HttpCode.BAD_REQUEST).send({ error: 'User does not exist!' });
            }

            const passwordsMatch = await bcrypt.compare(password, user.password);
            if(!passwordsMatch) {
                return res.status(HttpCode.BAD_REQUEST).send({ error: 'Invalid username or password!' });
            }

            const jwtPayload = { id: user.id, email: user.email };
            const accessToken = this._jwtService.getAccessToken(jwtPayload);
            const refreshToken = await this._jwtService.getRefreshToken(jwtPayload);
            return res.status(HttpCode.OK).json({ 
                user: jwtPayload,
                access_token: accessToken,
                refresh_token: refreshToken
            });

        } catch (err) {
            console.log(err);
            return res.status(HttpCode.SERVER_ERROR).json({ error: 'Something went wrong!' });
        }
    }
}
