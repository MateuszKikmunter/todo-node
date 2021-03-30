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
import { dd_MM_yyyy, Task } from '@todo-node/shared/utils';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
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
    @Output() viewTask: EventEmitter<string> = new EventEmitter<string>();

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
     * @param event
     */
    public loadTasks(event: LazyLoadEvent) {
        this.loading = true;       
        this.data = [...this.tasks].splice(event.first, event.rows);        
        this.loading = false;
    }

    /** Tells parent what task has been selected. */
    public onRowSelect(event) {
        this.selectTask.emit(event.data);
    }

    /** Tells parent to clear task selection. */
    public onRowUnselect() {
        this.selectTask.emit(null);
    }

    /** Emits event to the parent to show dialog in ADD mode. */
    public add(): void {
        this.createTask.emit();
    }

    //TODO: fix data EDIT (old record is selected all the time)
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
        this?.table?.onLazyLoad.emit({
            first: this?.table?._first,
            rows: 10,
        });
        this.totalRecords = data.length;
    }
}