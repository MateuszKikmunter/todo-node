//libs imports
import { Task } from '@todo-node/server/database';
import { Router } from 'express';
import { getConnection, Repository } from 'typeorm';

export class TaskController {

    private _taskRepository: Repository<Task>;

    constructor() {
        this._taskRepository = getConnection('sqlite').getRepository(Task);
    }

    private initRoutes(): void {
        //TODO: init routes here (using user methods exposed by user controller )
    }
}