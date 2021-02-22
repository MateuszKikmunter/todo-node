//Angular imports
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//libs imports
import { Action, EventBusService, LocalStorageService } from '@todo-node/shared/utils';
import { LoginResponse } from '@todo-node/todo-app/auth/domain';
import { CurrentUser } from '@todo-node/shared/utils';
import { AuthPayload } from '@todo-node/shared/utils';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = 'http://localhost:4000/api/auth';

  private user: BehaviorSubject<CurrentUser> = new BehaviorSubject<CurrentUser>(null);
  readonly user$: Observable<CurrentUser> = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private eventBus: EventBusService,
    private localStorageService: LocalStorageService) { }

  
  public login(loginPayload: AuthPayload): void {
    this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginPayload).subscribe((response: LoginResponse) => {
      this.user.next(response.user);
      this.setToken('token', response.accessToken);
      this.setToken('refreshToken', response.refreshToken);
    });
  }

  public register(registerPayload: AuthPayload): void {
    this.http.post<string>(`${this.apiUrl}/register`, registerPayload).subscribe((response: string) => {
      this.eventBus.emit({ action: Action.REGISTER_SUCCESSFUL });
    });
  }


  public logout(): void {
    this.localStorageService.removeItem('token');
    this.localStorageService.removeItem('refreshToken');
    this.user.next(null);
  }

  private setToken(key: string, token: string): void {
    this.localStorageService.setItem(key, token);
  }
}
