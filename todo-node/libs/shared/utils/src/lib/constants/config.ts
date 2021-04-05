import { SortOrder } from '../enums/sort.order';
import { TaskRequestPayload } from './../interfaces/task-request.payload';


/** Standard date format in uppercase case - DD/MM/YYYY */
export const DD_MM_YYYY = 'DD/MM/YYYY';

/** Standard date format - dd/MM/yyyy */
export const dd_MM_yyyy = 'dd/MM/yyyy';

/** Success emoji 🎉 */
export const SUCCESS_EMOJI = '🎉';

export const DEFAULT_TASK_REQUEST_PAYLOAD: TaskRequestPayload = {
    first: 0,
    rows: 10,
    sortField: 'name',
    sortOrder: SortOrder.ASC
}