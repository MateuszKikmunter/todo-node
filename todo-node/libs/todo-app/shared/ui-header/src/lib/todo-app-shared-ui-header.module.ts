import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoAppSharedUtilModule } from '@todo-node/todo-app/shared/util';

import { HeaderComponent } from './header/header.component';

@NgModule({
    imports: [
        CommonModule, 
        TodoAppSharedUtilModule
    ],
    declarations: [HeaderComponent],
    exports: [HeaderComponent]
})
export class TodoAppSharedUiHeaderModule {}
