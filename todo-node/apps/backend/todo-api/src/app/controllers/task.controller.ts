//libs imports
import { Task, User } from '@todo-node/server/database';
import { HttpCode } from '@todo-node/shared/utils';
import { Request, Response } from 'express';
import { getConnection } from 'typeorm';


export class TaskController {

    /**
     * Creates task based on the payload and links it to the user sending the request.
     * @param req request
     * @param res response
     */
    public createTask = async (req: Request, res: Response): Promise<Response> => {
        try {
            const task = {         
                ...req.body,
                user: await getConnection('sqlite').getRepository(User).findOne({ id: req?.user.id })
            } as Task;      

            await getConnection('sqlite').getRepository(Task).insert(task);
            return res.sendStatus(HttpCode.OK);
            
        } catch (err) {
            console.log(err);
            return res.status(HttpCode.BAD_REQUEST).json({ error: err.message });
        }    
    }

    /**
     * Updates task based on the payload.
     * @param req request
     * @param res response
     */
    public updateTask = async (req: Request, res: Response): Promise<Response> => {

        try {
            const task = await getConnection('sqlite').getRepository(Task).findOne({where: { id: req.params.id }, relations: [ 'user' ] });
            if(!task) {
                return res.status(HttpCode.NOT_FOUND).json({ error: 'Task not found!' });
            }

            if(task.user.id !== req.user?.id) {
                return res.status(HttpCode.FORBIDDEN).json({ error: 'Access denied, you can\'t modify someone else\'s tasks!' });
            }

            await getConnection('sqlite').getRepository(Task).save({ ...task, ...req.body });
            return res.sendStatus(HttpCode.OK);
        } catch (err) {
            console.log(err);
            return res.status(HttpCode.BAD_REQUEST).json({ error: err.message });
        }    
    }
}