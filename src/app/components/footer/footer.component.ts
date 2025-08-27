// footer.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { TranslocoModule } from '@jsverse/transloco';
import { RouterModule, RouterLink } from '@angular/router'; // Add RouterLink

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    TranslocoModule,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(private translocoService: TranslocoService) {}

  // método usado no template para tradução
  t = this.translocoService.translate.bind(this.translocoService);
}