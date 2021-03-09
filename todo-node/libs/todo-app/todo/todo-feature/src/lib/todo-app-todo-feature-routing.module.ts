//Angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//local imports
import { MainComponent } from './main/main.component';
import { TodoTableWrapperComponent } from './todo-table-wrapper/todo-table-wrapper.component';


const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: 'all',
                component: TodoTableWrapperComponent
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TodoAppRoutingModule {}