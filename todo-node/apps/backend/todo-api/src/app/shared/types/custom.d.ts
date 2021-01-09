//local imports
import { CurrentUser } from './current.user';

declare global {
    namespace Express {
        interface Request {
            user?: CurrentUser;
        }
    }
}