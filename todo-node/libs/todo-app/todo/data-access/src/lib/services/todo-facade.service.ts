//Angular imports
import { Injectable } from '@angular/core';

//libs imports
import { DD_MM_YYYY } from '@todo-node/shared/utils';
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
    public selectTask(task: Task): void {
        this.store.selectTask(task);
    }

    /** Changes task completion state. */
    public changeTaskState(taskId: string): void {
        this.store.changeTaskState(taskId);
    }

    //TODO: to implent
    public deleteTask(taskId: string): void {

    }

    /** Sends request to the server and saves task in the store on success.
     * @param task task to edit
     */    
    public editTask(task: Task): void {
        this.store.editTask({ ...task, deadline: this.formatDeadline(task.deadline) });
    }

    /** Sends request to the server and saves task in the store on success.
     * @param task task to save
     */
    public createTask(task: Task): void {
        dayjs.extend(customParseFormat);           
        this.store.createTask({  ...task, deadline: this.formatDeadline(task.deadline), lastModified: new Date().toDateString() });
    }

    /** 
     * * Sets task deadline to DD/MM/YYYY
     * * Deadline comes either as string or object depending if user updated it in the form.
     * @param deadline - passing deadline as any as any so dayjs can access it as param in the constructor but it's string | object
     */
    private formatDeadline(deadline: any): string {
        dayjs.extend(customParseFormat);
        return typeof deadline === 'object' 
            ? dayjs(deadline).format(DD_MM_YYYY) 
            : dayjs(deadline, DD_MM_YYYY).format(DD_MM_YYYY);
    }
}
