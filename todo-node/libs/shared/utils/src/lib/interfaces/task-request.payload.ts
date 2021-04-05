import { SortOrder } from "../enums/sort.order";


export interface TaskRequestPayload {
    first: number;
    rows: number;
    sortField: string;
    sortOrder: SortOrder;
    search?: string;
}