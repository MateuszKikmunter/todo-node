//libs imports
import { Router } from 'express';

//local imports
import { UserController } from '../controllers/user.controller';
import { JwtMiddleware } from '../middleware/jwt.middleware';
import { Route } from '../shared/interfaces/route';


export class UserRoute implements Route {

    private _url: string = "/api/user";
    private _userController: UserController;
    private _jwtMiddleware: JwtMiddleware;
    private _router: Router;

    get router(): Router {
        return this._router;
    }

    constructor() {
        this._router = Router();
        this._userController = new UserController();
        this._jwtMiddleware = new JwtMiddleware();
        this.initRoutes();
    }

    /** Initialize routes related to user. */
    private initRoutes(): void {
        this._router.get(`${ this._url }/getAll`, this._jwtMiddleware.validateJwtToken, [ this._userController.getAll ]);
    }
}