import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule
    ]
})
export class TodoAppCoreModule {}
