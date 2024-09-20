// app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoService, TranslocoModule } from '@jsverse/transloco';
import { AppRoutingModule } from './app.routes'; // Importa o módulo de roteamento
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Corrigir para styleUrls
  imports: [CommonModule, RouterModule, TranslocoModule, RouterOutlet], // Adicionando RouterOutlet
})
export class AppComponent {
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
