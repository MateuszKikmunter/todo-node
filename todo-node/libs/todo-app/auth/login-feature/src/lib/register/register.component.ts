//Angular imports
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//libs imports
import { AuthFacadeService } from '@todo-node/todo-app/auth/data-access';
import { Action, AuthPayload, EventBusService } from '@todo-node/shared/utils';
import { MessageService } from 'primeng/api';

//local imports
import { FormAction } from '../enums/action';


@Component({
  selector: 'todo-node-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ MessageService ]
})
export class RegisterComponent implements OnInit {

  get formAction(): typeof FormAction {
    return FormAction;
  }

  constructor(private authFacade: AuthFacadeService,
    private messageService: MessageService,
    private eventBus: EventBusService,
    private router: Router) { }

  ngOnInit(): void {
    this.eventBus.on(Action.REGISTER_SUCCESSFUL, () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Registration successful!',
          detail: 'Redirecting to login page...'
        });

        setTimeout(() => {
          this.router.navigate(['/account/login']);
        }, 2000);
    });
  }

  public onRegister(payload: AuthPayload) {    
    this.authFacade.register(payload);
  }
}
