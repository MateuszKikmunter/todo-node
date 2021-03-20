import { BehaviorSubject } from 'rxjs';
//Angular imports
import { Component, OnInit } from '@angular/core';

//libs imports
import { Observable } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { Task, Mode } from '@todo-node/shared/utils';
import { TodoFacadeService } from '@todo-node/todo-app/todo/data-access';


@Component({
    selector: 'todo-table-wrapper',
    templateUrl: './todo-table-wrapper.component.html',
    styleUrls: ['./todo-table-wrapper.component.scss'],
    providers: [ ConfirmationService ]
})
export class TodoTableWrapperComponent implements OnInit {
    
    public selectedTask$: Observable<Task>;

    private showForm: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    readonly showForm$: Observable<boolean> = this.showForm.asObservable();

    private formMode: BehaviorSubject<Mode> = new BehaviorSubject<Mode>(Mode.DEFAULT);
    readonly formMode$: Observable<Mode> = this.formMode.asObservable();

    constructor(
        readonly todoFacade: TodoFacadeService,
        private confirmationService: ConfirmationService) {}

    ngOnInit(): void {}

    /** Sends task to the store for deletion. */
    public onDeleteTask(task: Task): void {
        this.showFormDialog(task);
    }

    //TODO: to implement
    public onEditTask(task: Task): void {
        this.formMode.next(Mode.DEFAULT);
    }

    //TODO: to implement
    public onCreateTask(): void {        
        this.showForm.next(true);
        this.formMode.next(Mode.DEFAULT);
    }

    //TODO: to implement
    public onViewTask(event): void {
        this.showForm.next(true);
        this.formMode.next(Mode.READONLY);
    }

    /** Sends filter value to the store to get tasks containing search phrase. */
    public onTasksFilter(search: string): void {
        //TODO: to implement
    }

    /** Sends taskId to the store so it's completion state can be changed. */
    public onTaskStateChange(taskId: string): void {
        this.todoFacade.changeTaskState(taskId);
    }

    /** Sends selected task to the store.  */
    public onSelectTask(event: Task | null): void {        
        this.todoFacade.selectTask(event);
    }

    public onDialogClose(): void {
        this.showForm.next(false);
    }

    /** Shows delete dialog and handles selected action. */
    private showFormDialog(task: Task) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.todoFacade.deleteTask(task.id);
            },
            reject: () => {
                //do nothing, user cancelled
            }
        });
    }
}
