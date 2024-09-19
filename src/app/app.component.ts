// app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoService, TranslocoModule } from '@jsverse/transloco';
import { AppRoutingModule } from './app.routes'; // Importa o módulo de roteamento
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Corrigir para styleUrls
  imports: [CommonModule, RouterModule, TranslocoModule, RouterOutlet], // Adicionando RouterOutlet
})
export class AppComponent {
  constructor(private translocoService: TranslocoService) {}

  setLang(lang: string) {
    console.log(`Mudando idioma para: ${lang}`);
    this.translocoService.setActiveLang(lang);
  }
}

// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterOutlet } from '@angular/router';
// import { TranslocoModule } from '@jsverse/transloco';
// import { LanguageSelectorModule } from './components/language-selector/language-selector.module';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CommonModule, RouterOutlet, TranslocoModule, LanguageSelectorModule],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   // title = 'f5sites2';
//   //   // Método que carrega o script main.js dinamicamente
//   // private loadScript(url: string) {
//   //   const script = document.createElement('script');
//   //   script.src = url;
//   //   script.async = true;
//   //   document.body.appendChild(script);
//   // }

//   // ngAfterViewInit() {
//   //   // Carrega o main.js após a view ser inicializada
//   //   this.loadScript('assets/js/main.js');
//   // }
// }
