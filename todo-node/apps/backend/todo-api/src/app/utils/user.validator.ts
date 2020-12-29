//libs imports
import { HttpCode } from '@todo-node/shared/utils';
import { NextFunction, Request, Response } from 'express';
import { validationResult, check } from 'express-validator';


/**
 * Validation rules applied for account registration.
 */
export const registrationValidationRules = [
    check('email').isEmail().withMessage('Please enter a valid email.'),
    check('email').notEmpty().withMessage('Email is required.'),
    check('password').notEmpty().withMessage('Password is required.'),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
];

/**
 * * Validates details provided by the user when creating a new account.
 * * Returns HTTP 422 if invalid details provided.
 * @param req request
 * @param res response
 * @param next next function
 */
export const validateRegistrationRequest = (req: Request, res: Response, next: NextFunction) => {
    
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()) {
        return res.status(HttpCode.UNPROCESSABLE_ENTITY).json({ errors: validationErrors.array()?.map(err => err.msg) });
    }

    return next();
}