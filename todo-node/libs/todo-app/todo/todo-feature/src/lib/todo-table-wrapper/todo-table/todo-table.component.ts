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
    OnDestroy,
    SimpleChanges,
    Inject
} from '@angular/core';

//libs imports
import { LazyLoadEvent } from 'primeng/api';
import { SelectableRow, Table } from 'primeng/table';
import { fromEvent } from 'rxjs';
import { Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { dd_MM_yyyy, Task, TaskRequestPayload, Recordset } from '@todo-node/shared/utils';
import { DEFAULT_TABLE_CONFIG, TableConfig } from '@todo-node/todo-app/todo/domain';


@Component({
    selector: 'todo-table',
    templateUrl: './todo-table.component.html',
    styleUrls: ['./todo-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoTableComponent implements OnChanges, AfterViewInit, OnDestroy {

    @Input() tasks: Recordset<Task>;
    @Input() selectedTask: Task;
    @Input() isLoading: boolean;

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
    public totalRecords: number;

    readonly dateFormat = dd_MM_yyyy;

    private subSink: Subscription = new Subscription();

    constructor(@Inject(DEFAULT_TABLE_CONFIG) readonly tableConfig: TableConfig) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.tasks && changes.tasks.currentValue) {
            this.handleDataSourceChange(changes.tasks.currentValue);
        }
    }

    ngAfterViewInit(): void {
        this.onSearchChange();
    }

    ngOnDestroy(): void {
        this.subSink.unsubscribe();
    }

    /**
     * Updates data on the table by calling splice on the original data source.
     * @param event - event with filters to be applied on datasource
     */
    public loadTasks(event: LazyLoadEvent) {
        this.fetchTasks.emit({
            first: event.first,
            rows: event.rows,
            sortField: event.sortField ?? 'name',
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
    private onSearchChange(): void {
        this.subSink.add(
            fromEvent(this?.searchInput?.nativeElement, 'keyup')
                .pipe(
                    debounceTime(500),
                    map((search: any) => search.target.value)
                )
                .subscribe((value: string) => {
                    const payload = {
                        first: this.table.first,
                        rows: this.table.rows,
                        sortField: this.table.sortField ?? 'name',
                        sortOrder: this.table.sortOrder
                    };

                    //when value === '' do not send search param
                    value?.trim()
                        ? this.fetchTasks.emit({ ...payload, search: value })
                        : this.fetchTasks.emit(payload);
                })
        );
    }

    /**
     * * Triggers LazyLoadEvent on the table.
     * * PrimeNG table does not refresh automatically on data change so it has to be triggered manually.
     * @param dataset Task[] emitted in onChanges
     */
    private handleDataSourceChange(dataset: Recordset<Task>): void {
        this.data = dataset.data;
        this.totalRecords = dataset.totalRecords;
    }
}