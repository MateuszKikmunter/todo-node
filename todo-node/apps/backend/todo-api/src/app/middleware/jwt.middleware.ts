//libs imports
import { HttpCode } from '@todo-node/shared/utils';
import * as jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';

export class JwtMiddleware {

    private BEARER_STRING_LENGTH: number = 7;

    /**
     * * Validates JWT token. Returns 401 if token is invalid.
     * * Adds user data from the token to the request to reduce database calls.
     * @param req request
     * @param res response
     * @param next next function
     */
    public validateJwtToken = (req: Request, res: Response, next: NextFunction): Response => {
        const token = req.get('Authorization');
        if (!token) {
            return res.status(HttpCode.UNAUTHORIZED).send({ error: 'Invalid token' });
        }

        this.verifyJWTToken(token).then(user => {
            req.user = user;
            next();
        }).catch(err => {
            console.log(err);
            res.status(HttpCode.UNAUTHORIZED).send(err);
        });
    }

    /**
     * Verifies if JWT token is valid.
     * Returns user data stored in the token.
     * @param token - JWT token
     */
    private verifyJWTToken = (token: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            if (!token.startsWith('Bearer')) {
                return reject('Invalid token');
            }
            // Remove Bearer from string
            const rawToken = token.slice(this.BEARER_STRING_LENGTH, token.length);
            jwt.verify(rawToken, process.env.ACCESS_TOKEN_SECRET, (err: jwt.VerifyErrors, decodedToken: any) => {
                if (err) {
                    return reject(err.message);
                }

                if (!decodedToken || !decodedToken.user) {
                    return reject('Invalid token');
                }

                resolve(decodedToken.user);
            });
        });
    }
}