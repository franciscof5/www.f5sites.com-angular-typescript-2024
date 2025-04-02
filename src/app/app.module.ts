import { TranslocoModule } from '@jsverse/transloco';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes'; // Importação do módulo de roteamento
import { TranslocoRootModule } from './transloco.module';
@NgModule({
  imports: [
    TranslocoModule,
    BrowserModule,
    AppRoutingModule,
    TranslocoRootModule
  ],
  bootstrap: [],
  providers: [GtmService],
  // declarações, providers, bootstrap, etc.
})
export class AppModule { }
