//Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//local imports
import { LoginComponent } from './login/login.component';
import { TodoAppAuthLoginRoutingModule } from './todo-app-auth-login-routing.module';


@NgModule({
    imports: [
        CommonModule,
        TodoAppAuthLoginRoutingModule
    ],
    declarations: [LoginComponent]
})
export class TodoAppAuthLoginFeatureModule {}