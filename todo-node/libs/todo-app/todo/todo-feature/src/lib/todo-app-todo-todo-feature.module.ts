import { TodoAppRoutingModule } from './todo-app-todo-feature-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';

import { TodoAppSharedUiLayoutModule } from '@todo-node/todo-app/shared/ui-layout';

@NgModule({
    imports: [
        CommonModule,
        TodoAppSharedUiLayoutModule,
        TodoAppRoutingModule
    ],
    declarations: [MainComponent],
})
export class TodoAppTodoTodoFeatureModule {}
