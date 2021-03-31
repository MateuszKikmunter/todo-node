//Angular imports
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//libs imports
import { Observable } from 'rxjs';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { AuthFacadeService } from '@todo-node/todo-app/auth/data-access';
import { Task, EventBusService, CurrentUser, Action } from '@todo-node/shared/utils';


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
    public selectTask(task: Task | null): void {     
      this._selectedTask.next({ ...task });   
    }

    /** 
     * Sends POST request to the server and emits new values on success.
     * @param task - task to create
    */
    public createTask(task: Task): void {
      this.http.post<{ id: string }>(`${this.taskApiUrl}`, task).subscribe(
        (result: { id: string }) => {          
          this.eventBus.emit({ action: Action.TASK_SAVED });
          this._tasks.next([ ...this._tasks.getValue(), { ...task, id: result.id }]);          
        },
        //TODO: handle error (show toast), if validation errors, emit with event bus
        error => console.log(error));
    }

    /** 
     * Sends PUT request to the server and emits new values on success.
     * @param task - task to update
    */
    public editTask(task: Task): void {
      this.http.put<void>(`${this.taskApiUrl}/${task?.id}`, task).subscribe(
        () => {          
          this._tasks.getValue().forEach((item, index) => {
            if(item.id === task.id) {
              this._tasks.value[index] = { ...task };
              this._tasks.next([ ...this._tasks.value ]);
              this.eventBus.emit({ action: Action.TASK_SAVED });
            }
          });
        },
        //TODO: handle error (show toast), if validation errors, emit with event bus
        error => console.log(error));
    }

    /** 
     * Sends DELETE request to the server and emits new values on success.
     * @param taskId - id of task to delete
    */
    public deleteTask(taskId: string): void {
      this.http.delete<void>(`${this.taskApiUrl}/${taskId}`).subscribe(
        () => {
          this._tasks.next(this._tasks.value.filter(task => task.id !== taskId));
          this.eventBus.emit({ action: Action.TASK_SAVED });
        },        
        //TODO: handle error (show toast)
        error => console.log(error));
    }

    /** 
     * * Sends PUT request to the server and emits new values on success.
     * * Changes completion state (true/false) for a particular task.
     * @param taskId - id of task to change
    */
    public changeTaskState(taskId: string): void {
      this.http.put<void>(`${this.taskApiUrl}/change-state/${taskId}`, null).subscribe(() => {
        this._tasks.value.forEach((task: Task) => {
          if(task.id === taskId) {
            task.completed = !task.completed;
            task.lastModified = new Date().toDateString();
          }
          this._tasks.next([...this._tasks.value]);
        });
      },
      //TODO: handle error (show toast)
      error => console.log(error));
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
