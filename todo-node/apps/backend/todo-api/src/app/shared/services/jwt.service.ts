//libs imports
import * as jwt from 'jsonwebtoken';

//loval imports
import { JwtPayload } from './../types/jwt.playload';


export class JwtService {

    /**
     * Returns access token for a provided user.
     * @param payload - { id: string, email: string }
     */
    public getAccessToken = (payload: JwtPayload): string => {
        return jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME ?? '15min' });
    }
}