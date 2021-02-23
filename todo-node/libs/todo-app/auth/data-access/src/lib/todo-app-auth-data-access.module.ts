//Angular imports
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//local imports
import { TokenInterceptor } from './interceptors/token.interceptor';


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        { 
            provide: HTTP_INTERCEPTORS, 
            useClass: TokenInterceptor, 
            multi: true 
        }
    ]
})
export class TodoAppAuthDataAccessModule {}
