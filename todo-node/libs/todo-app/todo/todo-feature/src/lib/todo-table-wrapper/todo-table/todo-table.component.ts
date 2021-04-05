//Angular imports
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
    AfterViewInit,
    OnChanges,
    SimpleChanges
} from '@angular/core';

//libs imports
import { dd_MM_yyyy, Task, TaskRequestPayload } from '@todo-node/shared/utils';
import { LazyLoadEvent } from 'primeng/api';
import { SelectableRow, Table } from 'primeng/table';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';


@Component({
    selector: 'todo-table',
    templateUrl: './todo-table.component.html',
    styleUrls: ['./todo-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoTableComponent implements OnChanges, AfterViewInit {

    @Input() tasks: Task[];
    @Input() selectedTask: Task;

    @Output() selectTask: EventEmitter<Task> = new EventEmitter<Task>();
    @Output() filterTasks: EventEmitter<string> = new EventEmitter<string>();
    @Output() taskStateChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() deleteTask: EventEmitter<string> = new EventEmitter<string>();
    @Output() editTask: EventEmitter<void> = new EventEmitter<void>();
    @Output() createTask: EventEmitter<void> = new EventEmitter<void>();
    @Output() viewTask: EventEmitter<void> = new EventEmitter<void>();
    @Output() fetchTasks: EventEmitter<TaskRequestPayload> = new EventEmitter<TaskRequestPayload>();

    @ViewChild(Table) table: Table;
    @ViewChild('search') searchInput: ElementRef;

    public data: Task[];
    public loading: boolean;
    public totalRecords: number;

    readonly dateFormat = dd_MM_yyyy;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.tasks && changes.tasks.currentValue) {
            this.handleDataSourceChange(changes.tasks.currentValue);
        }
    }

    ngAfterViewInit(): void {
        this.onSearchChange();
    }

    /**
     * Updates data on the table by calling splice on the original data source.
     * @param event - event with filters to be applied on datasource
     */
    public loadTasks(event: LazyLoadEvent) {        
        this.fetchTasks.emit({
            first: event.first,
            rows: event.rows,
            sortField: event.sortField,
            sortOrder: event.sortOrder
        });
    }

    /** Tells parent what task has been selected. */
    public onRowSelect(event: SelectableRow) {
        this.selectTask.emit(event.data);
    }

    /** Tells parent to clear task selection. */
    public onRowUnselect() {
        this.selectTask.emit(undefined);
    }

    /** Emits event to the parent to show dialog in ADD mode. */
    public add(): void {
        this.createTask.emit();
    }
    
    /** Emits event to the parent to show dialog in EDIT mode. */
    public edit(): void {
        this.editTask.emit();
    }

    /** Emits event to the parent to show dialog in READONLY mode. */
    public view(): void {
        this.viewTask.emit();
    }

    /** Tells parent that task's completion state changed. */
    public changeTaskState(taskId: string): void {
        this.taskStateChange.emit(taskId);
    }

    /** Tells parent what task should be deleted. */
    public delete(): void {
        if (this.selectedTask) {
            this.deleteTask.emit(this.selectedTask.id);
        }
    }

    /** Handles search input value change. */
    //TODO: change it to use fetchTasks @Output
    private onSearchChange(): void {
        fromEvent(this?.searchInput?.nativeElement, 'keyup')
            .pipe(
                debounceTime(500),
                map((search: any) => search.target.value)
            )
            .subscribe((value: string) => {
                if (value?.trim()) {
                    this.filterTasks.emit(value);
                }
            });
    }

    /**
     * * Triggers LazyLoadEvent on the table.
     * * PrimeNG table does not refresh automatically on data change so it has to be triggered manually.
     * @param data Task[] emitted in onChanges
     */
    private handleDataSourceChange(data: Task[]): void {
        this.data = [...this.tasks].splice(this?.table?.first, this?.table?.rows);
        this.totalRecords = data.length;
    }
}