// about.component.ts
import { Component } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { TranslocoPipe } from '@jsverse/transloco'; // ← Adicione esta linha
import { LeadFormComponent } from '../../components/form_espocrm/lead-form.component';
import { TranslocoModule } from '@jsverse/transloco';
import { RouterModule, RouterLink } from '@angular/router';
import { LanguageSelectorModule } from '../language-selector/language-selector.module';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone: true,
  imports: [ 
    TranslocoModule,
    LanguageSelectorModule,
    RouterLink,
    RouterModule,
    LeadFormComponent,
    TranslocoPipe,
    // FormsModule,
    FooterComponent,
    NavbarComponent
  ],
})
export class AboutComponent {
  constructor(public translocoService: TranslocoService) {} 
  title = 'f5sites';
  language = "en";

  get currentLang(): string {
    return this.translocoService.getActiveLang();
  }
  ngAfterViewInit() {
    console.log("ngAfterViewInit"); 
  }
}