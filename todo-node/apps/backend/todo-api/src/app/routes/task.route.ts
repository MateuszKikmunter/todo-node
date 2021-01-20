//libs imports
import { Router } from 'express';

//local imports
import { Route } from '../shared/interfaces/route';
import { taskValidationRules, validateTaskAddOrUpdateRequest } from '../shared/validators/task.validator';
import { TaskController } from './../controllers/task.controller';
import { JwtMiddleware } from './../middleware/jwt.middleware';


export class TaskRoute implements Route {

    private _url: string = "/api/task";
    private _taskController: TaskController;
    private _jwtMiddleware: JwtMiddleware;
    private _router: Router;

    get router(): Router {
        return this._router;
    }

    constructor() {
        this._router = Router();
        this._taskController = new TaskController();
        this._jwtMiddleware = new JwtMiddleware();
        this.initRoutes();
    }
    
    /** Initialize routes handled by this route. */
    private initRoutes(): void {
        this._router.post(`${ this._url }/create`, this._jwtMiddleware.validateJwtToken, taskValidationRules, [ 
            validateTaskAddOrUpdateRequest, 
            this._taskController.createTask 
        ]);        
    }
}