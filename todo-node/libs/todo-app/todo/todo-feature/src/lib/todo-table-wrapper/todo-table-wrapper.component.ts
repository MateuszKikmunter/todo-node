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
    
    private showForm: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    readonly showForm$: Observable<boolean> = this.showForm.asObservable();

    private formMode: BehaviorSubject<Mode> = new BehaviorSubject<Mode>(Mode.ADD);
    readonly formMode$: Observable<Mode> = this.formMode.asObservable();    

    constructor(
        readonly todoFacade: TodoFacadeService,
        private confirmationService: ConfirmationService) {}

    ngOnInit(): void {}

    /** Sends task to the store for deletion. */
    public onDeleteTask(task: Task): void {
        this.showDeleteDialog(task);
    }

    /** Opens task form dialog in EDIT mode. */
    public onEditTask(task: Task): void {
        this.showForm.next(true);
        this.formMode.next(Mode.EDIT);
    }
    
    /** Opens task form dialog in ADD mode. */
    public onCreateTask(): void {        
        this.showForm.next(true);
        this.formMode.next(Mode.ADD);
    }

    /** Opens task form dialog in READONLY mode. */
    public onViewTask(task: Task): void {
        this.showForm.next(true);
        this.formMode.next(Mode.READONLY);
    }

    /** Saves task to the store on task form dialog submit. */
    public onSaveTask(task: Task): void {
        this.todoFacade.createTask(task);
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

    /** Tells child component to close task form dialog. */
    public onDialogClose(): void {
        this.showForm.next(false);
    }

    /** Shows delete dialog and handles selected action. */
    private showDeleteDialog(task: Task) {
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
