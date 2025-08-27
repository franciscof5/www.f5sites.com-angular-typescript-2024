import { Component } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { TranslocoModule } from '@jsverse/transloco';
import { RouterModule, RouterLink } from '@angular/router'; // Add RouterLink
import { FooterComponent } from '../footer/footer.component'
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    FooterComponent,
    NavbarComponent
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  constructor(public translocoService: TranslocoService) {} 
  title = 'af5sites about';
  language = "en";
  get currentLang(): string {
    return this.translocoService.getActiveLang();
  }
}
