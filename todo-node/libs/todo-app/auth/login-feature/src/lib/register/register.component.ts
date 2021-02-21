import { AuthFacadeService } from '@todo-node/todo-app/auth/data-access';
import { AuthPayload } from '@todo-node/shared/utils';
import { Component, OnInit } from '@angular/core';
import { FormAction } from '../enums/action';

@Component({
  selector: 'todo-node-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  get formAction(): typeof FormAction {
    return FormAction;
  }

  constructor(private authFacade: AuthFacadeService) { }

  ngOnInit(): void {
  }

  public onRegister(payload: AuthPayload) {    
    this.authFacade.register(payload);
  }
}
