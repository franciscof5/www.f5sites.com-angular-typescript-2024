// navbar.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';
import { TranslocoModule } from '@jsverse/transloco';
import { RouterModule, RouterLink } from '@angular/router'; // Add RouterLink

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private translocoService: TranslocoService) {}

  language = "en";

  get currentLang(): string {
    return this.translocoService.getActiveLang();
  }
  // método usado no template para tradução
  t = this.translocoService.translate.bind(this.translocoService);
}
