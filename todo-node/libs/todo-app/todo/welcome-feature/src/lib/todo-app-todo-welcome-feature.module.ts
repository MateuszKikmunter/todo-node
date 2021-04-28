import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@NgModule({
    imports: [CommonModule, ButtonModule, CardModule],
    declarations: [WelcomeComponent],
    exports: [WelcomeComponent],
})
export class TodoAppTodoWelcomeFeatureModule {}
