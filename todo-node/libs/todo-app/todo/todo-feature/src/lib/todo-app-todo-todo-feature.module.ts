//Angular imports
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

//libs imports
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TodoAppSharedUiLayoutModule } from '@todo-node/todo-app/shared/ui-layout';

//local impports
import { TodoAppRoutingModule } from './todo-app-todo-feature-routing.module';
import { MainComponent } from './main/main.component';
import { TodoTableComponent } from './todo-table-wrapper/todo-table/todo-table.component';
import { TodoTableWrapperComponent } from './todo-table-wrapper/todo-table-wrapper.component';
import { TodoFormComponent } from './todo-table-wrapper/todo-form/todo-form.component';
import { PastDeadlineDirective } from './directives/past-deadline.directive';
import { MissedDeadlinePipe } from './pipes/missed-deadline.pipe';


@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        CheckboxModule,
        ConfirmDialogModule,
        DialogModule,
        InputTextareaModule,
        InputTextModule,
        ReactiveFormsModule,
        TableModule,
        ToastModule,
        ToolbarModule,
        TodoAppSharedUiLayoutModule,
        TodoAppRoutingModule
    ],
    declarations: [
        MainComponent,
        TodoTableComponent,
        TodoTableWrapperComponent,
        TodoFormComponent,
        PastDeadlineDirective,
        MissedDeadlinePipe
    ],
})
export class TodoAppTodoTodoFeatureModule {}
