//libs imports
import { User } from '@todo-node/server/database';
import { RefreshToken } from '@todo-node/server/database';
import { getConnection } from 'typeorm';
import * as jwt from 'jsonwebtoken';

//local imports
import { CurrentUser } from './../shared/types/current.user';

export class JwtService {

    /**
     * Returns access token.
     * @param payload - { id: string, email: string }
     */
    public generateAccessToken = (payload: CurrentUser): string => {
        return jwt.sign(
            { user: payload },
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME ?? '15min' }
        );
    }

    /**
     * Returns new refresh token.
     * @param payload - { id: string, email: string }
     */
    public generateRefreshToken = async (payload: CurrentUser): Promise<string> => {

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
                { user: payload },
                process.env.REFRESH_TOKEN_SECRET, 
                { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME ?? '30d' }
            );

            await getConnection('sqlite').getRepository(RefreshToken).save({ userId: payload.id, token: refreshToken });

            return refreshToken;
        } catch (error) {
            console.log(error);
            throw new Error('Refresh token creation failed!');
        }
    }

    /**
     *  Generates new access and refresh tokens based on the currently used refresh token.
     * @param refreshToken currently used refresh token
     */
    public getNewTokens = async (refreshToken: string): Promise<any> => {

        const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) as any;
        const user = await getConnection('sqlite').getRepository(User).findOne({ id: decodedToken.user.id });

        if (!user) {
            throw new Error('Access is forbidden!');
        }

        const userRefreshTokens = await getConnection('sqlite').getRepository(RefreshToken).find({ userId: user.id });
        if (!userRefreshTokens || !userRefreshTokens?.length) {
            throw new Error(`There is no refresh token for the user with id: ${ user.id }`);
        }        

        const currentRefreshToken = userRefreshTokens.find(token => token.token === refreshToken)?.token;
        if (!currentRefreshToken) {
            throw new Error('Invalid token!');
        }

        const payload = {
            id: user.id,
            email: user.email
        };

        return {
            access_token: await this.generateAccessToken(payload),
            refresh_token: await this.getUpdatedRefreshToken(currentRefreshToken, payload),
        };
    }

    /**
     * Finds currently used refresh token in the database, replaces it with a new one and returns new token back to the caller.
     * @param oldRefreshToken currently used refresh token
     * @param payload current user data - { id: string, email: string }
     */
    private getUpdatedRefreshToken = async (oldRefreshToken: string, payload: CurrentUser): Promise<string> => {

        const newRefreshToken = jwt.sign(
            { user: payload },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME ?? '30d' }
        );

        // for security reasons replace current refresh token with the new one
        const currentToken = await getConnection('sqlite').getRepository(RefreshToken).findOne({ token: oldRefreshToken });
        currentToken.token = newRefreshToken;

        await getConnection('sqlite').getRepository(RefreshToken).save(currentToken);
        return newRefreshToken;
    }
}