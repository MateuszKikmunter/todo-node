//Angular imports
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//libs imports
import { Observable } from 'rxjs';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { CurrentUser } from '@todo-node/shared/utils';
import { AuthFacadeService } from '@todo-node/todo-app/auth/data-access';
import { Task } from '@todo-node/shared/utils';


@Injectable({
  providedIn: 'root'
})
export class TodoStore {

  private readonly taskApiUrl = 'http://localhost:4000/api/task';

  //TODO: temp data, it will come from the API later
  private _tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([
    {
        name: 'learn some node and nestjs development',
        additionalDetails: 'dupa details',
        completed: false,
        lastModified: '11/03/2021',
        deadline: '25/05/2021',
        id: 'a',
    },
    {
        name: 'buy milk',
        additionalDetails: 'buy some whole milk for cereal',
        completed: false,
        lastModified: '12/03/2021',
        deadline: '31/03/2021',
        id: 'b',
    },
    {
        name: 'become jedi master',
        additionalDetails: 'STAR WARS!',
        completed: false,
        lastModified: '12/03/2021',
        deadline: '31/03/2021',
        id: 'c',
    },
    {
        name: 'watch out, zombies!',
        additionalDetails: 'braaains!',
        completed: false,
        lastModified: '12/03/2021',
        deadline: '31/03/2021',
        id: 'd',
    },
    {
        name: 'hello world!',
        additionalDetails: 'whats up?',
        completed: false,
        lastModified: '12/03/2021',
        deadline: '31/03/2021',
        id: 'e',
    },
    {
        name: 'typescript',
        additionalDetails: 'ts is cool',
        completed: false,
        lastModified: '12/03/2021',
        deadline: '31/03/2021',
        id: 'f',
    },
    {
        name: 'JS',
        additionalDetails: 'JavaScript',
        completed: false,
        lastModified: '12/03/2021',
        deadline: '31/03/2021',
        id: 'g',
    },
    {
        name: 'blah',
        additionalDetails: 'blah details',
        completed: false,
        lastModified: '12/03/2021',
        deadline: '31/03/2021',
        id: 'h',
    },
    {
        name: 'Im Batman!',
        additionalDetails: 'Batman would kick Supermans ass!',
        completed: false,
        lastModified: '12/03/2021',
        deadline: '31/03/2021',
        id: 'i',
    },
    {
        name: 'trololololololo',
        additionalDetails: 'singining Russian guy',
        completed: false,
        lastModified: '12/03/2021',
        deadline: '31/03/2021',
        id: 'j',
    }
]);
  public readonly tasks$: Observable<Task[]> = this._tasks.asObservable();

  private _selectedTask: BehaviorSubject<Task> = new BehaviorSubject<Task>(null);
  public readonly selectedTask$: Observable<Task> = this._selectedTask.asObservable();

  constructor(private http: HttpClient,
    private authFacade: AuthFacadeService) {
      //TODO: load initial data from the API on service creation 
      //this.getUserTasks();
    }

    /** Sets currently selected task in the store. */
    public selectTask(task: Task): void {     
      this._selectedTask.next(task ? { ...task } : null);   
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
