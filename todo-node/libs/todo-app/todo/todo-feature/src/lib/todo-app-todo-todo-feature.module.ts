//Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//libs imports
import { TodoAppSharedUiLayoutModule } from '@todo-node/todo-app/shared/ui-layout';

//local impports
import { TodoAppRoutingModule } from './todo-app-todo-feature-routing.module';
import { MainComponent } from './main/main.component';
import { TodoTableComponent } from './todo-table/todo-table.component';


@NgModule({
    imports: [
        CommonModule,
        TodoAppSharedUiLayoutModule,
        TodoAppRoutingModule
    ],
    declarations: [MainComponent, TodoTableComponent]
})
export class TodoAppTodoTodoFeatureModule {}
