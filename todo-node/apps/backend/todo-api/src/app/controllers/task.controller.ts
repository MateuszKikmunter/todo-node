//libs imports
import { Task } from '@todo-node/server/database';
import { getConnection, Repository } from 'typeorm';


export class TaskController {

    private _taskRepository: Repository<Task>;

    constructor() {
        this._taskRepository = getConnection('sqlite').getRepository(Task);
    }
}