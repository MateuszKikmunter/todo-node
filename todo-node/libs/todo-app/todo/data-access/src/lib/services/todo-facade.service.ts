//Angular imports
import { Injectable } from '@angular/core';

//libs imports
import { DD_MM_YYYY, Mode, TaskRequestPayload } from '@todo-node/shared/utils';
import { Task } from '@todo-node/shared/utils';
import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

//local imports
import { TodoStore } from './todo.store';


@Injectable({
    providedIn: 'root'
})
export class TodoFacadeService {

    constructor(private store: TodoStore) {}

    /** Returns tasks for currently logged in user. */
    readonly tasks$ = this.store.tasks$;

    /** Returns currently selected task. */
    readonly selectedTask$ = this.store.selectedTask$;

    /** Sets/clears currently selected task in the store. */
    public selectTask(task: Task | undefined): void {
        this.store.selectTask(task);
    }

    /** Changes task completion state. */
    public changeTaskState(taskId: string): void {
        this.store.changeTaskState(taskId);
    }

    /** Sends request to the server to remove selected task.
     * @param taskId id of task to delete
     */
    public deleteTask(taskId: string): void {
        this.store.deleteTask(taskId);
    }

    /** Sends request to the server and saves task in the store on success.
     * @param task task to edit
     */
    public editTask(task: Task): void {
        this.createOrUpdateTask(task, Mode.EDIT);
    }

    /** Sends request to the server and saves task in the store on success.
     * @param task task to save
     */
    public createTask(task: Task): void {        
        this.createOrUpdateTask(task, Mode.ADD);
    }

    /** Initializes HTTP call to fetch tasks.
     * @param payload - request options to get tasks with filters applied
     */
    public fetchTasks(payload: TaskRequestPayload): void {
        this.store.getUserTasks(payload);
    }


    /**
     * Creates or updates task based on the provided mode (ADD/EDIT)
     * @param task - task to add/edit
     * @param mode - action mode (ADD/EDIT)
     */
    private createOrUpdateTask(task: Task, mode: Mode): void {
        const payload = { ...task, lastModified: new Date() };
        mode === Mode.ADD
            ? this.store.createTask(payload)
            : this.store.editTask(payload);
    }
}
