//Angular imports
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

//libs imports
import { TodoAppCoreModule } from '@todo-node/todo-app/core';
import { TokenInterceptor } from '@todo-node/todo-app/auth/data-access';
import { DEFAULT_TASK_REQUEST_PAYLOAD, DEFAULT_TASK_REQUEST_PAYLOAD_CONFIG } from '@todo-node/shared/utils';

//application imports
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

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
        {
            provide: DEFAULT_TASK_REQUEST_PAYLOAD_CONFIG,
            useValue: DEFAULT_TASK_REQUEST_PAYLOAD
        }
    ]
})
export class AppModule {}
