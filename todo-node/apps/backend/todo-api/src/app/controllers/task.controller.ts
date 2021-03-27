//libs imports
import { Task, User } from '@todo-node/server/database';
import { HttpCode } from '@todo-node/shared/utils';
import { Request, Response } from 'express';
import { getConnection } from 'typeorm';


//local imports
import { messages } from './../utils/config';


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

            const result = await getConnection('sqlite').getRepository(Task).save(task);            
            return res.status(HttpCode.OK).send({ id: result.id });
            
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
                return res.status(HttpCode.NOT_FOUND).json({ error: messages.taskNotFound });
            }

            this.isUserAuthorizedToAccessTask(req, res, task);

            await getConnection('sqlite').getRepository(Task).save({ ...task, ...req.body });
            return res.status(HttpCode.OK).send();
        } catch (err) {
            console.log(err);
            return res.status(HttpCode.BAD_REQUEST).json({ error: err.message });
        }    
    }

    /**
     * Deletes task with specific id.
     * @param req request
     * @param res response
     */
    public deleteTask = async (req: Request, res: Response): Promise<Response> => {

        try {
            const task = await getConnection('sqlite').getRepository(Task).findOne({where: { id: req.params.id }, relations: [ 'user' ] });
            if(!task) {
                return res.status(HttpCode.NOT_FOUND).json({ error: messages.taskNotFound });
            }

            this.isUserAuthorizedToAccessTask(req, res, task);

            await getConnection('sqlite').getRepository(Task).delete({ id: task.id });
            return res.sendStatus(HttpCode.OK);
        } catch (err) {
            console.log(err);
            return res.status(HttpCode.BAD_REQUEST).json({ error: err.message });
        }    
    }

    /**
     * Returns all tasks for a specific user.
     * @param req request
     * @param res response
     */
    public getUserTasks = async (req: Request, res: Response): Promise<Response> => {

        try {                     
            const tasks = await getConnection('sqlite')
                .getRepository(Task)
                .createQueryBuilder('task')
                .where('userId = :id', { id: req.params.id })
                .getMany();
                
            if(!tasks) {
                return res.status(HttpCode.NOT_FOUND).json({ error: messages.userHasNoTasks });
            }          

            return res.status(HttpCode.OK).json(tasks);
        } catch (err) {
            console.log(err);
            return res.status(HttpCode.BAD_REQUEST).json({ error: err.message });
        }    
    }

    /**
     * * Checks if user can access specific task.
     * * Returns 403 forbidden if user is not allowed to access the task.
     * * Otherwise lets process to continue.
     * @param req request
     * @param task task
    */
    private isUserAuthorizedToAccessTask = (req: Request, res: Response, task: Task): Response => {
        if(task.user.id !== req.user?.id) {
            return res.status(HttpCode.FORBIDDEN).json({ error: messages.cantAccessSomeonesTask });
        }
    }
}