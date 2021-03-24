//libs imports
import { DD_MM_YYYY, HttpCode } from '@todo-node/shared/utils';
import { NextFunction, Request, Response } from 'express';
import { validationResult, check } from 'express-validator';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';


/**
 * Validation rules applied for task create/update requests.
 */
export const taskValidationRules = [
    check('name').notEmpty().withMessage('Name is required.'),
    check('name').isLength({ max: 255 }).withMessage('Maximum 255 characters allowed.'),
    check('completed').notEmpty().withMessage('Task completion state is required.'),
    check('deadline').notEmpty().withMessage('Deadline is required.'),      
    check('deadline').isDate({ format: DD_MM_YYYY.toLowerCase() }).withMessage('Please enter a valid date.'),
    check('deadline').custom(deadlineDateString => {
        //extend dayjs with custom parse format plugin
        //so it supports custom formats of input strings
        dayjs.extend(customParseFormat);
        const deadline = dayjs(deadlineDateString, DD_MM_YYYY);
        const todaydayjs = dayjs(dayjs().format(DD_MM_YYYY), DD_MM_YYYY);

        return !deadline.isBefore(todaydayjs);
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