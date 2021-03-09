//Angular imports
import { Component, OnInit } from '@angular/core';

//libs imports
import { Observable } from 'rxjs';
import { Task } from '@todo-node/shared/utils';
import { TodoFacadeService } from '@todo-node/todo-app/todo/data-access';

@Component({
  selector: 'todo-node-todo-table-wrapper',
  templateUrl: './todo-table-wrapper.component.html',
  styleUrls: ['./todo-table-wrapper.component.scss']
})
export class TodoTableWrapperComponent implements OnInit {

  public tasks$: Observable<Task[]>;

  constructor(private todoFacade: TodoFacadeService) {     
  }

  ngOnInit(): void {
    this.tasks$ = this.todoFacade.getUserTasks();
  }

}
