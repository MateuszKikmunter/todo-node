//Angular imports
import { InjectionToken } from '@angular/core';

//local imports
import { TaskRequestPayload } from '../interfaces/task-request.payload';


/**
 * @const DEFAULT_TASK_REQUEST_PAYLOAD_CONFIG
 * Injection token for the default task request payload config.
 */
export const DEFAULT_TASK_REQUEST_PAYLOAD_CONFIG: InjectionToken<TaskRequestPayload> = new InjectionToken('DEFAULT_TASK_REQUEST_PAYLOAD_CONFIG');