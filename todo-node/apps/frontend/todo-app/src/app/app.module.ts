//Angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

//libs imports
import { ClarityModule } from '@clr/angular';

//application imports
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    ClarityModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
