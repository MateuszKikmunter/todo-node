//libs imports
import * as bcrypt from 'bcrypt';
import { getConnection } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '@todo-node/server/database';
import { HttpCode } from '@todo-node/shared/utils';

//local imports
import { JwtService } from '../services/jwt.service';
import { messages } from './../utils/config';


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
            return res.status(HttpCode.SERVER_ERROR).json({ error: messages.somethingWentWrong });
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
                return res.status(HttpCode.BAD_REQUEST).send({ error: messages.invalidCredentials });
            }

            const user = await getConnection('sqlite').getRepository(User).findOne({ email: email });
            if(!user) {
                return res.status(HttpCode.BAD_REQUEST).send({ error: messages.userDoesNotExist });
            }

            const passwordsMatch = await bcrypt.compare(password, user.password);
            if(!passwordsMatch) {
                return res.status(HttpCode.BAD_REQUEST).send({ error: messages.invalidCredentials });
            }

            const jwtPayload = { id: user.id, email: user.email };
            const accessToken = this._jwtService.generateAccessToken(jwtPayload);
            const refreshToken = await this._jwtService.generateRefreshToken(jwtPayload);
            return res.status(HttpCode.OK).json({ 
                user: jwtPayload,
                accessToken: accessToken,
                refreshToken: refreshToken
            });

        } catch (err) {
            console.log(err);
            return res.status(HttpCode.SERVER_ERROR).json({ error: messages.somethingWentWrong });
        }
    }

    /**
     * Generates new access and refresh tokens based on the refresh token in the request body.
     * @param req reqest
     * @param res response
     */
    public getNewTokens = async (req: Request, res: Response): Promise<Response> => {

        const refreshToken = req.body.refresh_token;
        if (!refreshToken) {
            return res.status(HttpCode.FORBIDDEN).json({ error: messages.forbiddenAccess });
        }

        try {
            const newTokens = await this._jwtService.getNewTokens(refreshToken);
            return res.status(HttpCode.OK).json(newTokens);
        } catch (err) {
            const message = (err && err.message) || err;
            console.log(message);
            res.status(HttpCode.FORBIDDEN).json({ error: message });
        }
    }

        /**
     * Returns currently logged in user if JWT validation passed.
     * @param req request
     * @param res response
     */
    public async getCurrentUser(req: Request, res: Response): Promise<Response> {
        try {
            if(req.user) {
                const user = await getConnection('sqlite').getRepository(User).findOne(req.user.id);
                if(user) {
                    return res.status(HttpCode.OK).json({ id: user.id, email: user.email });                    
                }
                return res.status(HttpCode.NOT_FOUND).json( 'User not found!');
            }
        } catch (err) {
            console.log(err);
            return res.status(HttpCode.BAD_REQUEST).json({ error: 'Something went wrong!' });
        }
    }
}
