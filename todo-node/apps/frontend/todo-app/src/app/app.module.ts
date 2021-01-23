//Angular imports
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

//libs imports
import { TodoAppCoreModule } from '@todo-node/todo-app/core';
import { TodoAppSharedModule } from '@todo-node/todo-app/shared';

//application imports
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    TodoAppCoreModule,
    TodoAppSharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
