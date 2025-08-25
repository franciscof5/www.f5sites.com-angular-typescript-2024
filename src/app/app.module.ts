import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Para ngModel
import { TranslocoModule } from '@jsverse/transloco'; // Descomente se for usar

// Components
import { AppComponent } from './app.component';
import { LeadFormComponent } from './components/form_espocrm/lead-form.component'; // Ajuste o caminho conforme sua estrutura

// Services
// import { EspoCrmService } from './services/espocrm.service';
import { GtmService } from './services/gtm.service'; // Ajuste o caminho se necessário
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    LeadFormComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, // OBRIGATÓRIO para ngModel
    TranslocoModule, // Descomente se for usar
    // TranslocoRootModule // (Descomente se necessário)
  ],
  providers: [
    GtmService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }