//Angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//libs imports
import { AuthGuard } from '@todo-node/todo-app/auth/data-access';


const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('@todo-node/todo-app/todo/welcome-feature').then((m) => m.TodoAppTodoWelcomeFeatureModule)
    },
    {
        path: 'todo',
        canActivate: [AuthGuard],
        loadChildren: () => import('@todo-node/todo-app/todo/todo-feature').then((m) => m.TodoAppTodoTodoFeatureModule)
    },
    {
        path: 'account',
        loadChildren: () => import('@todo-node/todo-app/auth/login-feature').then((m) => m.TodoAppAuthLoginFeatureModule)
    },
    {
        path: 'welcome',
        loadChildren: () => import('@todo-node/todo-app/todo/welcome-feature').then((m) => m.TodoAppTodoWelcomeFeatureModule)
    },
    {
        path: 'about',
        loadChildren: () => import('@todo-node/todo-app/todo/about-feature').then((m) => m.TodoAppTodoAboutFeatureModule)
    },
    {
        path: "**",
        redirectTo: '/welcome',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}