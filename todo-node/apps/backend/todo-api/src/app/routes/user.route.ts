//libs imports
import { Request, Response, Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { User } from '@todo-node/server/database';

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

    private initRoutes(): void {
        //TODO: init routes here (using user methods exposed by user controller )
    }
}