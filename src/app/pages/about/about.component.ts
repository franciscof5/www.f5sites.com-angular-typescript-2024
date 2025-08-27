// about.component.ts
import { Component } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { TranslocoPipe } from '@jsverse/transloco'; // ← Adicione esta linha
import { LanguageSelectorModule } from '../../components/language-selector/language-selector.module';
import { LeadFormComponent } from '../../components/form_espocrm/lead-form.component';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone: false // ← Certifique-se que não é standalone
})
export class AboutComponent {
  constructor(private transloco: TranslocoService) {}
}