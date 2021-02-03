import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'todo',
                loadChildren: () => import('@todo-node/todo-app/todo/todo-feature').then((m) => m.TodoAppTodoTodoFeatureModule)
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
