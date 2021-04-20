//Angular imports
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

//libs imports
import { Observable } from 'rxjs';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { AuthFacadeService } from '@todo-node/todo-app/auth/data-access';
import { Task, EventBusService, CurrentUser, Action, Recordset } from '@todo-node/shared/utils';
import { DEFAULT_TABLE_CONFIG, TableConfig } from '@todo-node/todo-app/todo/domain';


@Injectable({
  providedIn: 'root'
})
export class TodoStore {

  private readonly taskApiUrl = 'http://localhost:4000/api/task';

  private _tasks: BehaviorSubject<Recordset<Task>> = new BehaviorSubject<Recordset<Task>>({ data: [], totalRecords: 0 });
  public readonly tasks$: Observable<Recordset<Task>> = this._tasks.asObservable();

  private _selectedTask: BehaviorSubject<Task> = new BehaviorSubject<Task>(null);
  public readonly selectedTask$: Observable<Task> = this._selectedTask.asObservable();  

  constructor(private http: HttpClient,
    private authFacade: AuthFacadeService,
    private eventBus: EventBusService,
    @Inject(DEFAULT_TABLE_CONFIG) private defaultConfig: TableConfig)
    {}

    /** Sets currently selected task in the store. */
    public selectTask(task: Task | undefined): void {     
      this._selectedTask.next(task ? { ...task } : undefined);   
    }

    /** 
     * Sends POST request to the server and emits new values on success.
     * @param task - task to create
    */
  public createTask(task: Task): void {
    this.http.post<{ id: string }>(`${this.taskApiUrl}`, task).subscribe(
      (result: { id: string }) => {
        this.emitSuccess();
        this._tasks.next(
          {
            data:  this._tasks.value.data.length < this.defaultConfig.rows
              ? [...this._tasks.value.data, { ...task, id: result.id }]
              : [...this._tasks.value.data],
            totalRecords: this._tasks.value.totalRecords + 1
          });
      },
      error => {
        console.log(error);
        this.emitFailure();
      });
  }

    /** 
     * Sends PUT request to the server and emits new values on success.
     * @param task - task to update
    */
  public editTask(task: Task): void {
    this.http.put<void>(`${this.taskApiUrl}/${task?.id}`, task).subscribe(
      () => {
        this._tasks.value.data.forEach((item, index) => {
          if (item.id === task.id) {
            this._tasks.value.data[index] = { ...task };
            this._tasks.next(
              {
                data: [...this._tasks.value.data],
                totalRecords: this._tasks.value.totalRecords
              });

            if (this._selectedTask.value?.id === task?.id) {
              this._selectedTask.next({ ...task });
            }

            this.emitSuccess();
          }
        });
      },
      error => {
        console.log(error);
        this.emitFailure();
      });
  }

  /** 
   * Sends DELETE request to the server and clears current selection on success.
   * @param taskId - id of task to delete
  */
  public deleteTask(taskId: string): void {
    this.http.delete<void>(`${this.taskApiUrl}/${taskId}`).subscribe(
      () => {
        this._tasks.next(
          {
            data: this._tasks.value.data.filter(task => task.id !== taskId),
            totalRecords: this._tasks.value.totalRecords - 1
          });
        this._selectedTask.next(undefined);
        this.emitSuccess();
      },
      error => {
        console.log(error);
        this.emitFailure();
      });
  }

    /** 
     * * Sends PUT request to the server and emits new values on success.
     * * Changes completion state (true/false) for a particular task.
     * @param taskId - id of task to change
    */
    public changeTaskState(taskId: string): void {
      this.http.put<void>(`${this.taskApiUrl}/${taskId}/change-state`, null).subscribe(() => {
        this._tasks.value.data.forEach((task: Task) => {
          if(task.id === taskId) {
            task.completed = !task.completed;
            task.lastModified = new Date();

            this._selectedTask.next({ ...task });
          }
          this._tasks.next({ ...this._tasks.value });
        });
      },
      error => {
        console.log(error);
        this.emitFailure();
      });
    }

  /** Gets currently logged in user tasks via HTTP and saves the result in the store. */
  public getUserTasks(requestConfig: any): void {    
    this.authFacade.getCurrentUser().pipe(
      withLatestFrom((user: CurrentUser) => user?.id),
      switchMap((userID: string) => {        
        return userID ? this.http.get<Recordset<Task>>(`${this.taskApiUrl}/user/${userID}`, { params: requestConfig }) : of([])
      })
    ).subscribe(
      (result: Recordset<Task>) => this._tasks.next({ ...result }),
      error => {
        console.log(error);
        this.emitFailure();
      }
    );
  }

  /** Emits success if task has been successfully saved. */
  private emitSuccess(): void {
    this.eventBus.emit({ action: Action.TASK_SAVED });
  }

  /** Emits failure if action failed. */
  private emitFailure(): void {
    this.eventBus.emit({ action: Action.ACTION_FAILED });
  }
}
