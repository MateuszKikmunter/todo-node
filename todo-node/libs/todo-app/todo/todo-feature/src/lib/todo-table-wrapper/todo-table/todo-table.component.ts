//Angular imports
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
    Output,
    EventEmitter
} from '@angular/core';

//libs imports
import { Task } from '@todo-node/shared/utils';
import { LazyLoadEvent } from 'primeng/api';


@Component({
    selector: 'todo-table',
    templateUrl: './todo-table.component.html',
    styleUrls: ['./todo-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoTableComponent implements OnInit {

    @Input() tasks: Task[];
    @Input() selectedTask: Task;

    @Output() selectTask: EventEmitter<Task> = new EventEmitter<Task>();
    @Output() deleteTask: EventEmitter<string> = new EventEmitter<string>();
    @Output() editTask: EventEmitter<string> = new EventEmitter<string>();
    @Output() createTask: EventEmitter<void> = new EventEmitter<void>();

    public loading: boolean;
    public totalRecords: number;

    ngOnInit(): void {}

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
    public colClicked(id): void {
      this.tasks.forEach(task => {
        if(task.id === id) {
          task.completed = !task.completed;
        }
      })      
    }

    /** Tells parent what task should be deleted. */
    public delete(): void {
      if(this.selectedTask) {
        this.deleteTask.emit(this.selectedTask.id);
      }      
    }
}
