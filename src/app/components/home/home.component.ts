import { Component } from '@angular/core';
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
