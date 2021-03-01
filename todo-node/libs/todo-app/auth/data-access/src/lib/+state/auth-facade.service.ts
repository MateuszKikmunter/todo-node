//Angular imports
import { Injectable } from '@angular/core';

//libs imports
import { AuthPayload, CurrentUser } from '@todo-node/shared/utils';
import { Observable } from 'rxjs';

//local imports
import { AuthService } from './../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {  

  constructor(private authService: AuthService) { }

  /**
   * Logs the user in and saves tokens in the local storage.
   * @param loginPayload { email: string, password: string }
   */
  public login(loginPayload: AuthPayload): void {
    this.authService.login(loginPayload);
  }

  /**
   * Makes POST request to the server with user's credentials.
   * @param registerPayload — { email: string, password: string } 
   */
  public register(registerPayload: AuthPayload): void {
    this.authService.register(registerPayload);
  }

  /** Logs current user out and clear saved tokens */
  public logout(): void {
    this.authService.logout();
  }

  /** 
  * Keeps user logged in if their token is still valid.
  */
  public getCurrentUser(): Observable<CurrentUser> {
    return this.authService.getCurrentUser();
  }

  /** Gets new tokens. */
  public refreshToken(): Observable<{ accessToken: string; refreshToken: string; }> {
    return this.authService.refreshToken();
  }
}