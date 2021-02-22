//Angular imports
import { Component, OnInit } from '@angular/core';

//libs imports
import { AuthFacadeService } from '@todo-node/todo-app/auth/data-access';
import { AuthPayload } from '@todo-node/shared/utils';

//local imports
import { FormAction } from '../enums/action';


@Component({
  selector: 'todo-node-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  get formAction(): typeof FormAction {
    return FormAction;
  }

  constructor(private authFacade: AuthFacadeService) { }

  ngOnInit(): void {
  }

  public onLogin(payload: AuthPayload) {
    this.authFacade.login(payload);
  }

}