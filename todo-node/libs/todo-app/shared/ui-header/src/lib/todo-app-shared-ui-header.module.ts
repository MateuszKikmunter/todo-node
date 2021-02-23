//Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//libs imports
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';

//local imports
import { HeaderComponent } from './header/header.component';


@NgModule({
    imports: [
        CommonModule, 
        MenubarModule,
        ButtonModule
    ],
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
})
export class TodoAppSharedUiHeaderModule {}
