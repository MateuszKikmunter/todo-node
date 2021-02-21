import { CurrentUser } from '@todo-node/shared/utils';

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: CurrentUser;
}