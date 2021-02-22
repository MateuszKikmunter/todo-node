import { Action } from './../enums/action';

export interface EventData {
    action: Action;
    value?: any;
}