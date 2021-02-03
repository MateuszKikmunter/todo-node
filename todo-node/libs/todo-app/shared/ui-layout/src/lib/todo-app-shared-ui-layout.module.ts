
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoAppSharedUiFooterModule } from '@todo-node/todo-app/shared/ui-footer';
import { TodoAppSharedUiHeaderModule } from '@todo-node/todo-app/shared/ui-header';

import { LayoutComponent } from './layout/layout.component';

@NgModule({
    imports: [
        CommonModule,
        TodoAppSharedUiHeaderModule,
        TodoAppSharedUiFooterModule
    ],
    declarations: [LayoutComponent],
    exports: [LayoutComponent]
})
export class TodoAppSharedUiLayoutModule {}
