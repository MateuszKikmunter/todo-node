//Angular imports
import { NgModule } from '@angular/core';

//libs imports
import { TodoAppCoreModule } from '@todo-node/todo-app/core';

//application imports
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    TodoAppCoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
