//Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

//libs imports
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { TodoAppSharedUiLayoutModule } from '@todo-node/todo-app/shared/ui-layout';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';

//local imports
import { LoginComponent } from './login/login.component';
import { TodoAppAuthLoginRoutingModule } from './todo-app-auth-login-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputTextModule,
        TodoAppSharedUiLayoutModule,
        PasswordModule,
        CardModule,
        ButtonModule,
        TodoAppAuthLoginRoutingModule,
        ToastModule,
        MessageModule
    ],
    declarations: [
        LoginComponent, 
        LoginFormComponent, 
        RegisterComponent
    ]
})
export class TodoAppAuthLoginFeatureModule {}
