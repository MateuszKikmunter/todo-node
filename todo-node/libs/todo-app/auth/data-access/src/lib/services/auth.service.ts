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

  /**
   * Logs the user in and saves tokens in the local storage.
   * @param loginPayload { email: string, password: string }
   */
  public login(loginPayload: AuthPayload): void {
    this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginPayload).subscribe((response: LoginResponse) => {
      this.user.next(response.user);
      this.localStorageService.setItem('token', response.accessToken);
      this.localStorageService.setItem('refreshToken', response.refreshToken);      
    });
  }

  /**
   * Makes POST request to the server with user's credentials.
   * @param registerPayload { email: string, password: string }
   */
  public register(registerPayload: AuthPayload): void {
    this.http.post<string>(`${this.apiUrl}/register`, registerPayload).subscribe((response: string) => {
      this.eventBus.emit({ action: Action.REGISTER_SUCCESSFUL });
    });
  }

  /** Logs current user out and clear saved tokens. */
  public logout(): void {
    this.localStorageService.removeItem('token');
    this.localStorageService.removeItem('refreshToken');
    this.user.next(null);
  }
}
