//Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//libs imports
import { TodoAppCoreModule } from '@todo-node/todo-app/core';


@NgModule({
    imports: [
        CommonModule,
        TodoAppCoreModule
    ]
})
export class TodoAppAuthDataAccessModule {}
