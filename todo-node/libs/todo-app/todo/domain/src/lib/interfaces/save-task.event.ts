import { Mode, Task } from '@todo-node/shared/utils';

export interface SaveTaskEvent {
    task: Task;
    action: Mode;
}