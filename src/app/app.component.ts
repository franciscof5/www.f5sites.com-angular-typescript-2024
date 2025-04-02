// app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoService, TranslocoModule } from '@jsverse/transloco';
import { AppRoutingModule } from './app.routes'; // Importa o módulo de roteamento
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Corrigir para styleUrls
  imports: [CommonModule, RouterModule, TranslocoModule, RouterOutlet], // Adicionando RouterOutlet
  template: `
    <!-- Noscript fallback apenas em produção -->
    @if (environment.production) {
      <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXX"
                height="0" width="0" style="display:none;visibility:hidden"></iframe>
      </noscript>
    }
    <router-outlet></router-outlet>
  `
})
// export class AppComponent {
export class AppComponent {
  ngOnInit() {
    if (environment.production) {
      this.loadGtmScript();
    }
  }

  private loadGtmScript() {
    const script = document.createElement('script');
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${environment.gtmId}');
    `;
    document.head.appendChild(script);
  }

  constructor(
    private translocoService: TranslocoService,
    private router: Router // Injeta o serviço de roteamento
  ) { }

  setLang(lang: string) {
    console.log(`setLang Mudando idioma para: ${lang}`);
    this.translocoService.setActiveLang(lang);
    // if (this.isBrowser()) {

    // localStorage.setItem('lang', lang); // Salva o idioma selecionado no localStorage
    // }
    this.router.navigate([lang]);
    // Navegação programática para uma rota específica
  }
  // Função para verificar se o código está sendo executado no navegador
  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
