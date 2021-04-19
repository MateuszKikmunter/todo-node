//libs imports
import { HttpCode } from '@todo-node/shared/utils';
import { NextFunction, Request, Response } from 'express';
import { validationResult, check } from 'express-validator';
import * as dayjs from 'dayjs';


/**
 * Validation rules applied for task create/update requests.
 */
export const taskValidationRules = [
    check('name').notEmpty().withMessage('Name is required.'),
    check('name').isLength({ max: 255 }).withMessage('Maximum 255 characters allowed.'),
    check('completed').notEmpty().withMessage('Task completion state is required.'),
    check('deadline').notEmpty().withMessage('Deadline is required.'),    
    check('deadline').custom((deadline: string) => {    
        return !dayjs().isAfter(new Date(deadline), 'days');        
    }).withMessage('Deadline can\'t be in the past.')
];

/**
 * * Validates details provided by the user when creating a new task.
 * * Returns HTTP 422 if invalid details provided.
 * @param req request
 * @param res response
 * @param next next function
 */
export const validateTaskAddOrUpdateRequest = (req: Request, res: Response, next: NextFunction): void | Response => {
    
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()) {
        return res.status(HttpCode.UNPROCESSABLE_ENTITY).json({ errors: validationErrors.array()?.map(err => err.msg) });
    }

    return next();
}