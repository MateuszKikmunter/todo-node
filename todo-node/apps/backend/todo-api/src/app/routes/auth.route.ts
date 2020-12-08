import { Router } from 'express';


import { AuthController } from '../controllers/auth.controller';
import { Route } from '../shared/interfaces/route';

export class AuthRoute implements Route {

    private _url: string = '/api/auth';
    private _router: Router;
    private _authController: AuthController;

    get router(): Router {
        return this._router;
    }

    constructor() {
        this._router = Router();
        this._authController = new AuthController();
        this.initRoutes();
    }

    private initRoutes(): void {
        this._router.post(`${ this._url }/register`, this._authController.register);
    }

}
