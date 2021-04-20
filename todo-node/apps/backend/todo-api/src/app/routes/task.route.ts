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

        this._router.post(`${ this._url }`, this._jwtMiddleware.validateJwtToken, taskValidationRules, [ 
            validateTaskAddOrUpdateRequest, 
            this._taskController.createTask 
        ]);

        this._router.put(`${ this._url }/:id`, this._jwtMiddleware.validateJwtToken, taskValidationRules, [ 
            validateTaskAddOrUpdateRequest, 
            this._taskController.updateTask 
        ]);

        this._router.put(`${ this._url }/:id/change-state`, this._jwtMiddleware.validateJwtToken, this._taskController.changeTaskState);

        this._router.get(`${ this._url }/user/:id`, this._jwtMiddleware.validateJwtToken, this._taskController.getUserTasks );
        this._router.delete(`${ this._url }/:id`, this._jwtMiddleware.validateJwtToken, this._taskController.deleteTask);

        this._router.post(`${ this._url }/seed`, this._jwtMiddleware.validateJwtToken, this._taskController.seed);
    }
}