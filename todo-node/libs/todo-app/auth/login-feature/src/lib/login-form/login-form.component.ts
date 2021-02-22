//Angular imports
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

//libs imports
import { AuthPayload } from '@todo-node/shared/utils';

//local imports
import { FormAction } from './../enums/action';


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

  get email(): AbstractControl { 
    return this.loginForm.get('email');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  get header(): string {
    return this.action === FormAction.LOGIN
      ? 'Log In'
      : 'Register';
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  /** Emits login or register event depending on the action type provided. */
  public submit(): void {
    if(this.loginForm.valid) {
      this.action === FormAction.LOGIN
        ? this.login.emit(this.loginForm.value)
        : this.register.emit(this.loginForm.value);
    }
  }

  /** Checks if form whether form is in register mode. */
  public isRegisterMode(): boolean {
    return this.action === FormAction.REGISTER;
  }

  /** Builds login form group if it does not exist already. */
  private buildForm(): void {    
    if(!this.loginForm) {
      this.loginForm = this.formBuilder.group({
        email: this.formBuilder.control(null, [ Validators.required, Validators.email ]),
        password: this.formBuilder.control(null, [ Validators.required, Validators.minLength(8) ])
      }); 
    }
  }

}
