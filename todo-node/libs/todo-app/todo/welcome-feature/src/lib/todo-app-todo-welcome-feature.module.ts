//Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//libs imports
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TodoAppSharedUiLayoutModule } from '@todo-node/todo-app/shared/ui-layout';

//local imports
import { WelcomeComponent } from './welcome/welcome.component';
import { TodoAppWelcomeRoutingModule } from './todo-app-welcome-feature-routing.module';


@NgModule({
    imports: [
        ButtonModule,
        CardModule,
        CommonModule,
        TodoAppSharedUiLayoutModule,
        TodoAppWelcomeRoutingModule
    ],
    declarations: [WelcomeComponent]
})
export class TodoAppTodoWelcomeFeatureModule {}