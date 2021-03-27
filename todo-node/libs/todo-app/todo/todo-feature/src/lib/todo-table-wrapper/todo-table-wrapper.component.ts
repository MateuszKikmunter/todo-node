//Angular imports
import { Component, OnInit, OnDestroy } from '@angular/core';

//libs imports
import { Observable } from 'rxjs';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SaveTaskEvent } from '@todo-node/todo-app/todo/domain';
import { Task, Mode, EventBusService, Action, SUCCESS_EMOJI } from '@todo-node/shared/utils';
import { TodoFacadeService } from '@todo-node/todo-app/todo/data-access';


@Component({
    selector: 'todo-table-wrapper',
    templateUrl: './todo-table-wrapper.component.html',
    styleUrls: ['./todo-table-wrapper.component.scss'],
    providers: [ 
        ConfirmationService,
        MessageService
    ]
})
export class TodoTableWrapperComponent implements OnInit, OnDestroy {
    
    private showForm: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    readonly showForm$: Observable<boolean> = this.showForm.asObservable();

    private formMode: BehaviorSubject<Mode> = new BehaviorSubject<Mode>(Mode.ADD);
    readonly formMode$: Observable<Mode> = this.formMode.asObservable();

    private subSink: Subscription = new Subscription();

    constructor(
        readonly todoFacade: TodoFacadeService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private eventBus: EventBusService) {}

    ngOnInit(): void {
        this.onTaskCreateSuccess();
    }

    ngOnDestroy(): void {
        this.subSink.unsubscribe();
    }

    /** Sends taskId to the store to identify task that should be deleted. */
    public onDeleteTask(taskId: string): void {
        this.showDeleteDialog(taskId);
    }

    /** Opens task form dialog in EDIT mode. */
    public onEditTask(): void {
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

    /** 
     * Sends create/edit request to the store based on the event action.
     * @param event - { task: Task, action: Mode }
     */
    public onSaveTask(event: SaveTaskEvent): void {
        event.action === Mode.ADD
            ? this.todoFacade.createTask(event.task)
            : this.todoFacade.editTask(event.task);
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
    private showDeleteDialog(taskId: string) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.todoFacade.deleteTask(taskId);
            },
            reject: () => {
                //do nothing, user cancelled
            }
        });
    }

    /** 
     * * Shows success toast on successful task creation.
     * * Tells table component to refresh its data.
    */
    private onTaskCreateSuccess(): void {        
        this.subSink.add(            
            this.eventBus.on(Action.TASK_SAVED, () => {
                this.messageService.add({
                    severity: 'success',
                    summary: `Success!${ SUCCESS_EMOJI }`,
                });
                //TODO: tell table component to refresh its data
            })
        );
    }
}
