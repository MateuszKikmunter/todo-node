//Angular imports
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

//libs imports
import { Action, EventBusService, LocalStorageService } from '@todo-node/shared/utils';
import { LoginResponse } from '@todo-node/todo-app/auth/domain';
import { CurrentUser } from '@todo-node/shared/utils';
import { AuthPayload } from '@todo-node/shared/utils';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly authApiUrl = 'http://localhost:4000/api/auth';  

  private user: BehaviorSubject<CurrentUser> = new BehaviorSubject<CurrentUser>(null);
  private user$: Observable<CurrentUser> = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private eventBus: EventBusService,
    private localStorageService: LocalStorageService) { }

  /**
   * Logs the user in and saves tokens in the local storage.
   * @param loginPayload { email: string, password: string }
   */
  public login(loginPayload: AuthPayload): void {
    this.http.post<LoginResponse>(`${this.authApiUrl}/login`, loginPayload).subscribe((response: LoginResponse) => {
      this.user.next(response.user);
      this.eventBus.emit({ action: Action.LOGIN_SUCCESSFUL });
      this.localStorageService.setItem('token', response.accessToken);
      this.localStorageService.setItem('refreshToken', response.refreshToken);
    });
  }

  /**
   * Makes POST request to the server with user's credentials.
   * @param registerPayload { email: string, password: string }
   */
  public register(registerPayload: AuthPayload): void {
    this.http.post<string>(`${this.authApiUrl}/register`, registerPayload).subscribe((response: string) => {
      this.eventBus.emit({ action: Action.REGISTER_SUCCESSFUL });
    });
  }

  /** Logs current user out and clear saved tokens. */
  public logout(): void {
    this.localStorageService.removeItem('token');
    this.localStorageService.removeItem('refreshToken');
    this.user.next(null);
  }

  /** 
   * Keeps user logged in if their token is still valid.
   */
  public getCurrentUser(): Observable<CurrentUser> {
    return this.user$.pipe(
      switchMap(user => {
        // check if we already have user data
        if (user) {
          return of(user);
        }

        const token = this.localStorageService.getItem('token');
        // if there is token then fetch the current user
        if (token) {
          return this.fetchCurrentUser();
        }

        return of(null);
      })
    );
  }

  /** Makes an HTTP call to the backed to check if user can be logged in. */
  private fetchCurrentUser(): Observable<CurrentUser> {
    return this.http.get<CurrentUser>(`${this.authApiUrl}/get-current-user`)
      .pipe(
        tap(user => {
          this.user.next(user);
        })
      );
  }

  /** Gets fresh tokens if the old is already expired. */
  public refreshToken(): Observable<{accessToken: string; refreshToken: string}> {
    const refreshToken = this.localStorageService.getItem('refreshToken');

    return this.http.post<{accessToken: string; refreshToken: string}>(
      `${this.authApiUrl}/refresh-token`, { refreshToken }).pipe(
        tap(response => {
          this.localStorageService.setItem('token', response.accessToken);
          this.localStorageService.setItem('refreshToken', response.refreshToken);
        })
    );
  }
}
