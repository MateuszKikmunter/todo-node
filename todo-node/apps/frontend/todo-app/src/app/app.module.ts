//Angular imports
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

//libs imports
import { TodoAppCoreModule } from '@todo-node/todo-app/core';

//application imports
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    TodoAppCoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
