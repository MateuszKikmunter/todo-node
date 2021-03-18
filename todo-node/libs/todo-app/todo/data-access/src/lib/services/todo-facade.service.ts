//Angular imports
import { Injectable } from '@angular/core';

//libs imports
import { Task } from '@todo-node/shared/utils';

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

    //TODO: to implement
    public createTask(task: Task): void {

    }
}
