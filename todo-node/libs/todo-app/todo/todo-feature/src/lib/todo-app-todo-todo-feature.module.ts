//Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//libs imports
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { TodoAppSharedUiLayoutModule } from '@todo-node/todo-app/shared/ui-layout';

//local impports
import { TodoAppRoutingModule } from './todo-app-todo-feature-routing.module';
import { MainComponent } from './main/main.component';
import { TodoTableComponent } from './todo-table-wrapper/todo-table/todo-table.component';
import { TodoTableWrapperComponent } from './todo-table-wrapper/todo-table-wrapper.component';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        CardModule,
        ConfirmDialogModule,
        InputTextModule,
        TableModule,
        ToolbarModule,
        TodoAppSharedUiLayoutModule,
        TodoAppRoutingModule
    ],
    declarations: [
        MainComponent,
        TodoTableComponent,
        TodoTableWrapperComponent
    ],
})
export class TodoAppTodoTodoFeatureModule {}
