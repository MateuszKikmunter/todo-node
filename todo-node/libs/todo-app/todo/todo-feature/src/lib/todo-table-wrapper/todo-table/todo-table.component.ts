//Angular imports
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
    AfterViewInit
} from '@angular/core';

//libs imports
import { Task } from '@todo-node/shared/utils';
import { LazyLoadEvent } from 'primeng/api';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';


@Component({
    selector: 'todo-table',
    templateUrl: './todo-table.component.html',
    styleUrls: ['./todo-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoTableComponent implements OnInit, AfterViewInit {
    
    @Input() tasks: Task[];
    @Input() selectedTask: Task;

    @Output() selectTask: EventEmitter<Task> = new EventEmitter<Task>();
    @Output() filterTasks: EventEmitter<string> = new EventEmitter<string>();
    @Output() taskStateChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() deleteTask: EventEmitter<string> = new EventEmitter<string>();
    @Output() editTask: EventEmitter<string> = new EventEmitter<string>();
    @Output() createTask: EventEmitter<void> = new EventEmitter<void>();  
    
    @ViewChild('search') searchInput: ElementRef;

    public loading: boolean;
    public totalRecords: number;

    ngOnInit(): void {}

    ngAfterViewInit(): void {
      this.onSearchChange();
    }

    loadTasks(event: LazyLoadEvent) {        
      console.log('in lazy load')
        this.loading = true;
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

    //TODO: to implement
    public openNew(): void {

    }

    //TODO: to implement
    public edit(): void {

    }

    /** Tells parent that task's completion state changed. */
    public changeTaskState(taskId: string): void {
      this.taskStateChange.emit(taskId);
    }

    /** Tells parent what task should be deleted. */
    public delete(): void {
      if(this.selectedTask) {
        this.deleteTask.emit(this.selectedTask.id);
      }      
    }

    /** Handles search input value change. */
    private onSearchChange(): void {
      fromEvent(this?.searchInput?.nativeElement, 'keyup').pipe(
        debounceTime(500),        
        map((search: any) => search.target.value)
      ).subscribe((value: string) => {       
        if(value?.trim()) {          
          this.filterTasks.emit(value);
        } 
      });
    }
}
