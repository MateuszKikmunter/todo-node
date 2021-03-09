//Angular imports
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

//libs imports
import { Task } from '@todo-node/shared/utils';


@Component({
  selector: 'todo-node-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoTableComponent implements OnInit {
  
  @Input() tasks: Task[];

  ngOnInit(): void {
    
  }

}
