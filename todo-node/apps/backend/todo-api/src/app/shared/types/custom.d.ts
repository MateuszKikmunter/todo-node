//libs imports
import { Request } from 'express-serve-static-core';

//local imports
import { CurrentUser } from './current.user';

declare module 'express-serve-static-core' {
    interface Request {
        user?: CurrentUser;
    }
}
