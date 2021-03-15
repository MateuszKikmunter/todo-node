//Angular imports
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';

//libs imports
import { Task } from '@todo-node/shared/utils';
import { LazyLoadEvent } from 'primeng/api';

@Component({
    selector: 'todo-table',
    templateUrl: './todo-table.component.html',
    styleUrls: ['./todo-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoTableComponent implements OnInit {
    @Input() tasks: Task[];

    public loading: boolean;
    public totalRecords: number;

    ngOnInit(): void {}

    loadTasks(event: LazyLoadEvent) {        
      console.log('in lazy load')
        this.loading = true;
        this.loading = false;
    }

    onRowSelect(event) {
        console.log(event);
    }

    onRowUnselect(event) {
        console.log(event);
    }

    public openNew(): void {

    }

    public colClicked(id): void {
      this.tasks.forEach(task => {
        if(task.id === id) {
          task.completed = !task.completed;
        }
      })      
    }
}
