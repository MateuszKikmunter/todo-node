//Angular imports
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

//libs imports
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { AuthFacadeService } from '@todo-node/todo-app/auth/data-access';
import { Action, AuthPayload, EventBusService } from '@todo-node/shared/utils';

//local imports
import { FormAction } from '../enums/action';


@Component({
  selector: 'todo-node-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ MessageService ]
})
export class LoginComponent implements OnInit, OnDestroy {

  private subSink = new Subscription();

  get formAction(): typeof FormAction {
    return FormAction;
  }

  constructor(private authFacade: AuthFacadeService,
    private eventBus: EventBusService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit(): void {
    this.onLoginSuccess();
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }

  public onLogin(payload: AuthPayload) {
    this.authFacade.login(payload);
  }

  private onLoginSuccess(): void {
    this.subSink.add(
      this.eventBus.on(Action.LOGIN_SUCCESSFUL, () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Logged in successfully!',
          detail: 'Redirecting to your TODOs...'
        });

        setTimeout(() => {
          this.router.navigate(['/todo/all']);
        }, 2000);
      })
    );
  }

}