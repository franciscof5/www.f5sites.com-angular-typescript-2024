import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { LanguageSelectorModule } from '../components/language-selector/language-selector.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslocoModule, LanguageSelectorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'f5sites2';
    // Método que carrega o script main.js dinamicamente
  private loadScript(url: string) {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    document.body.appendChild(script);
  }

  ngAfterViewInit() {
    // Carrega o main.js após a view ser inicializada
    this.loadScript('assets/js/main.js');
  }
}
