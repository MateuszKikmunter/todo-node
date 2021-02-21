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

  readonly currentUser$: Observable<CurrentUser> = this.authService.user$;

  constructor(private authService: AuthService) { }

  public login(loginPayload: AuthPayload): void {
    this.authService.login(loginPayload);
  }

  public register(registerPayload: AuthPayload): void {
    this.authService.register(registerPayload);
  }

  public logout(): void {
    this.authService.logout();
  }
}
