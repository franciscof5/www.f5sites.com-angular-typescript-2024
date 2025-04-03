import { Component } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { TranslocoModule } from '@jsverse/transloco';
import { RouterModule, RouterLink } from '@angular/router'; // Add RouterLink
import { LanguageSelectorModule } from '../language-selector/language-selector.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TranslocoModule, 
    LanguageSelectorModule,
    RouterLink,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(public translocoService: TranslocoService) {} 
  title = 'f5sites';
  language = "en";
  get currentLang(): string {
    return this.translocoService.getActiveLang();
  }
  // Método que carrega o script main.js dinamicamente
  private loadScript(url: string) {
    console.log("Loading script:", url);
  
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = () => console.log(`Script ${url} loaded successfully.`);
    script.onerror = () => console.error(`Failed to load script ${url}.`);
    document.body.appendChild(script);
  }
  ngAfterViewInit() {
    // Carrega o main.js após a view ser inicializada
    console.log("ngAfterViewInit")
    if (typeof window !== 'undefined') {
      requestAnimationFrame(() => {
        setTimeout(() => {
          this.loadScript('assets/js/main.js');
          this.loadScript('assets/js/plugins.js');
        }, 60);
      });
    }
  }
}
