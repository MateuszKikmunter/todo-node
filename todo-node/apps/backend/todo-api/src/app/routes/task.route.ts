//libs imports
import { Router } from 'express';
import { TaskController } from './../controllers/task.controller';

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
    
    /** Initialize routes handled by this route. */
    private initRoutes(): void {
        //TODO: init routes here (using methods exposed by the task controller )
    }
}