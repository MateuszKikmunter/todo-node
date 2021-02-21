//Angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//local imports
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TodoAppAuthLoginRoutingModule {}