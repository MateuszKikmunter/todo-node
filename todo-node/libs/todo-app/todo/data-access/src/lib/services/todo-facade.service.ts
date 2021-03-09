//Angular imports
import { Injectable } from '@angular/core';

//libs imports
import { Observable } from 'rxjs';
import { Task } from '@todo-node/shared/utils';

//local imports
import { TodoStore } from './todo.store';


@Injectable({
  providedIn: 'root'
})
export class TodoFacadeService {

  constructor(private store: TodoStore) { }

  public getUserTasks(): Observable<Task[]> {
    return this.store.tasks$;
  }
}
