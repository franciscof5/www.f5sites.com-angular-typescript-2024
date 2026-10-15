// about.component.ts
import { Component } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { TranslocoPipe } from '@jsverse/transloco'; // ← Adicione esta linha
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
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
    ContactFormComponent,
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