//Angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//local imports
import { AboutComponent } from './about/about.component';
import { TodoAppAboutRoutingModule } from './todo-app-about-feature-routing.module';


@NgModule({
    imports: [
      CommonModule,
      TodoAppAboutRoutingModule
    ],
    declarations: [
      AboutComponent
    ]
})
export class TodoAppTodoAboutFeatureModule {}