//libs imports
import { Router } from 'express';

//local imports
import { AuthController } from '../controllers/auth.controller';
import { Route } from '../shared/interfaces/route';
import { validateRegistrationRequest, registrationValidationRules } from './../utils/user.validator';


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

    /**
     * Initialize routes related to authentication and authorization.
     */
    private initRoutes(): void {
        this._router.post(`${ this._url }/register`, registrationValidationRules, [validateRegistrationRequest, this._authController.register]);        
        this._router.post(`${ this._url }/login`, this._authController.login);
    }

}
