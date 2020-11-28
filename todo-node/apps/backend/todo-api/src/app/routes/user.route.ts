//libs imports
import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

//local imports
import { Route } from './../interfaces/route';


export class UserRoute implements Route {

    private _url: string = "/api/user";
    private _userController: UserController;
    private _router: Router;

    get router(): Router {
        return this._router;
    }

    constructor() {
        this._router = Router();
        this._userController = new UserController();
        this.initRoutes();
    }

    /** Initialize routes handled by this route. */
    private initRoutes(): void {
        //TODO: init routes here (using methods exposed by the user controller )
    }
}