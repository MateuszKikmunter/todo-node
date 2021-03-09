import { BehaviorSubject } from 'rxjs';
//Angular imports
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//libs imports
import { Observable } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { CurrentUser } from '@todo-node/shared/utils';
import { AuthFacadeService } from '@todo-node/todo-app/auth/data-access';
import { Task } from '@todo-node/shared/utils';

@Injectable({
  providedIn: 'root'
})
export class TodoStore {

  private readonly taskApiUrl = 'http://localhost:4000/api/task';
  private _tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(null);
  public readonly tasks$: Observable<Task[]> = this._tasks.asObservable();

  constructor(private http: HttpClient,
    private authFacade: AuthFacadeService) {
      //load initial data on service creation 
      this.getUserTasks();
    }

    /** Gets currently logged in user tasks via HTTP and saves the result in the store. */
  private getUserTasks(): void {
    this.authFacade.getCurrentUser().pipe(
      withLatestFrom((user: CurrentUser) => user?.id),
      switchMap((userID: string) => this.http.get<Task[]>(`${this.taskApiUrl}/user/${userID}`))
    ).subscribe((tasks: Task[]) => this._tasks.next(tasks));
    
  }
}
