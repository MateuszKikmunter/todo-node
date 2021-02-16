//Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//libs imports
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { TodoAppSharedUiLayoutModule } from '@todo-node/todo-app/shared/ui-layout';
import { ButtonModule } from 'primeng/button';

//local imports
import { LoginComponent } from './login/login.component';
import { TodoAppAuthLoginRoutingModule } from './todo-app-auth-login-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';


@NgModule({
    imports: [
        CommonModule,
        InputTextModule,
        TodoAppSharedUiLayoutModule,
        PasswordModule,
        CardModule,
        ButtonModule,
        TodoAppAuthLoginRoutingModule
    ],
    declarations: [
        LoginComponent, 
        LoginFormComponent
    ]
})
export class TodoAppAuthLoginFeatureModule {}