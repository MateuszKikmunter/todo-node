//libs imports
import { Router } from 'express';

//local imports
import { UserController } from '../controllers/user.controller';
import { Route } from '../shared/interfaces/route';


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

    /** Initialize routes related to user. */
    private initRoutes(): void {
        this._router.get(`${ this._url }/getAll`, [ this._userController.getAll ]);
    }
}