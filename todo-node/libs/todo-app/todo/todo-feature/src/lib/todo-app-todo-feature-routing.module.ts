//Angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//local imports
import { MainComponent } from './main/main.component';


const routes: Routes = [
    {
        path: '',
        component: MainComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TodoAppRoutingModule {}