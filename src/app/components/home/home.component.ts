import { Component, ChangeDetectorRef } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { TranslocoModule } from '@jsverse/transloco';
import { RouterModule, RouterLink } from '@angular/router';
import { LanguageSelectorModule } from '../language-selector/language-selector.module';
import { LeadFormComponent } from '../form_espocrm/lead-form.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TranslocoModule,
    LanguageSelectorModule,
    RouterLink,
    RouterModule,
    LeadFormComponent,
    FormsModule,
    FooterComponent,
    NavbarComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currentLang: string = 'en';

  constructor(
    private transloco: TranslocoService,
    private cdr: ChangeDetectorRef
  ) {
    // define o idioma atual ao iniciar
    this.currentLang = this.transloco.getActiveLang();

    // observa mudanças de idioma
    this.transloco.langChanges$.subscribe(lang => {
      console.log('Idioma mudou para:', lang);
      this.currentLang = lang;
      this.cdr.detectChanges(); // força atualização da view
    });
  }

  getCurrentLang(): string {
    return this.currentLang;
  }
}
