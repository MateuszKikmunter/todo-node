//libs imports
import { Request, Response, Router } from 'express';
import { TaskController } from './../controllers/task.controller';
import { Task } from '@todo-node/server/database';

//local imports
import { Route } from './../interfaces/route';


export class TaskRoute implements Route {

    private _url: string = "/api/task";
    private _taskController: TaskController;
    private _router: Router;

    get router(): Router {
        return this._router;
    }

    constructor() {
        this._router = Router();
        this._taskController = new TaskController();
        this.initRoutes();
    }
    
    private initRoutes(): void {
        //TODO: init routes here (using user methods exposed by task controller )
    }
}