//libs imports
import { User } from '@todo-node/server/database';
import { RefreshToken } from '@todo-node/server/database';
import * as jwt from 'jsonwebtoken';
import { getConnection } from 'typeorm';

//loval imports
import { JwtPayload } from './../types/jwt.playload';


export class JwtService {

    /**
     * Returns access token.
     * @param payload - { id: string, email: string }
     */
    public getAccessToken = (payload: JwtPayload): string => {
        return jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME ?? '15min' });
    }

    /**
     * Returns new refresh token.
     * @param payload - { id: string, email: string }
     */
    public getRefreshToken = async (payload: JwtPayload): Promise<string> => {

        try {
            const user = await getConnection('sqlite').getRepository(User).findOne({ id: payload.id });
            if(!user) {
                throw new Error('User does not exist!');
            }

            const userRefreshTokens = await getConnection('sqlite').getRepository(RefreshToken).find({ userId: payload.id });
            if (userRefreshTokens.length >= (process.env.MAX_REFRESH_TOKEN_COUNT ?? 5)) {
                await getConnection('sqlite').getRepository(RefreshToken).delete({ userId: payload.id });
            }

            const refreshToken = jwt.sign(
                payload,
                process.env.REFRESH_TOKEN_SECRET, 
                { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME ?? '30d' }
            );

            await getConnection('sqlite').getRepository(RefreshToken).save({ userId: payload.id });
            return refreshToken;
        } catch (error) {
            console.log(error);
            throw new Error('Refresh token creation failed!');
        }
    }
}