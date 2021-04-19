//Angular imports
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

//libs imports
import { TodoAppCoreModule } from '@todo-node/todo-app/core';
import { TokenInterceptor } from '@todo-node/todo-app/auth/data-access';

//application imports
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { getDefaultTableConfiguration } from '@todo-node/todo-app/todo/domain';

@NgModule({
    declarations: [AppComponent],
    imports: [
        AppRoutingModule, 
        TodoAppCoreModule
    ],
    bootstrap: [AppComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },
        getDefaultTableConfiguration()
    ]
})
export class AppModule {}
