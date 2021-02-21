import { AuthPayload } from '@todo-node/shared/utils';
import { FormAction } from './../enums/action';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'todo-node-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Input() action: FormAction;
  @Output() login: EventEmitter<AuthPayload> = new EventEmitter<AuthPayload>();
  @Output() register: EventEmitter<AuthPayload> = new EventEmitter<AuthPayload>();

  public loginForm: FormGroup;

  get header(): string {
    return this.action === FormAction.LOGIN
      ? 'Log In'
      : 'Register';
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  public submit(): void {
    if(this.loginForm.valid) {
      this.action === FormAction.LOGIN
        ? this.login.emit(this.loginForm.value)
        : this.register.emit(this.loginForm.value);
    }
  }

  private buildForm(): void {    
    if(!this.loginForm) {
      this.loginForm = this.formBuilder.group({
        email: this.formBuilder.control(null, [ Validators.required, Validators.email ]),
        password: this.formBuilder.control(null, [ Validators.required, Validators.minLength(8) ])
      }); 
    }
  }

}
