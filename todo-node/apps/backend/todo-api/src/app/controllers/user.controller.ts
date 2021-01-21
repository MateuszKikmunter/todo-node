//libs imports
import { User } from '@todo-node/server/database';
import { HttpCode } from '@todo-node/shared/utils';
import { Request, Response } from 'express';
import { getConnection } from 'typeorm';


export class UserController {


    /**
     * Get all users.
     * @param req request
     * @param res response
     */
    public async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const users = await getConnection('sqlite').getRepository(User).find({ relations: [ 'todos' ] });
            return res.status(HttpCode.OK).json(users?.map(user => {
                return { 
                    id: user.id,
                    email: user.email,
                    todos: user?.todos
                };
            }));
        } catch (err) {
            console.log(err);
            return res.status(HttpCode.BAD_REQUEST).json({ error: 'Something went wrong!' });
        }
    }
}