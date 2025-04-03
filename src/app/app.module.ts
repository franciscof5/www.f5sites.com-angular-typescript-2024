//import { TranslocoModule } from '@jsverse/transloco';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes'; // Importação do módulo de roteamento
import { TranslocoRootModule } from './transloco.module';
//import { RouterModule } from '@angular/router'; // Importação necessária!
import { AppComponent } from './app.component'; // Make sure you have this

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslocoModule,
    // TranslocoRootModule,
    // RouterModule
  ],
  providers: [GtmService],
  bootstrap: [AppComponent],
  // declarações, providers, bootstrap, etc.
})
export class AppModule { }
