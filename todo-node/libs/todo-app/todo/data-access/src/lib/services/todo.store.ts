//Angular imports
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//libs imports
import { Observable } from 'rxjs';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { AuthFacadeService } from '@todo-node/todo-app/auth/data-access';
import { Task, EventBusService, CurrentUser } from '@todo-node/shared/utils';


@Injectable({
  providedIn: 'root'
})
export class TodoStore {

  private readonly taskApiUrl = 'http://localhost:4000/api/task';

  private _tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  public readonly tasks$: Observable<Task[]> = this._tasks.asObservable();

  private _selectedTask: BehaviorSubject<Task> = new BehaviorSubject<Task>(null);
  public readonly selectedTask$: Observable<Task> = this._selectedTask.asObservable();

  constructor(private http: HttpClient,
    private authFacade: AuthFacadeService,
    private eventBus: EventBusService) {      
      this.getUserTasks();
    }

    /** Sets currently selected task in the store. */
    public selectTask(task: Task): void {     
      this._selectedTask.next(task ? { ...task } : null);   
    }

    public createTask(task: Task): void {
      this.http.post<void>(`${this.taskApiUrl}/create`, task).subscribe(        
        //TODO: emit event from event buss to show toast
        () => {},
        //TODO: handle error (show toast), if validation errors, emit with event bus
        error => console.log(error))
    }

    /** Changes completion state (true/false) for a particular task. */
    public changeTaskState(taskId: string): void {
      //TODO: temp solution, will call backend later      
      this._tasks.value.forEach((task: Task) => {
        if(task.id === taskId) {
          task.completed = !task.completed;
        }
      });
      
      this._tasks.next([...this._tasks.value]);
    }

    /** Gets currently logged in user tasks via HTTP and saves the result in the store. */
  private getUserTasks(): void {    
    this.authFacade.getCurrentUser().pipe(
      withLatestFrom((user: CurrentUser) => user?.id),
      switchMap((userID: string) => {
        return userID ? this.http.get<Task[]>(`${this.taskApiUrl}/user/${userID}`) : of([])
      })
    ).subscribe((tasks: Task[]) => this._tasks.next(tasks));
    
  }
}
