import { Component, Input } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent {
  // constructor(private translocoService: TranslocoService) {}
  constructor(
    private translocoService: TranslocoService,
    private router: Router // Injeta o serviço de roteamento
  ) { }
  
  @Input() showTitle: boolean = true;
  @Input() showButton: boolean = true;
  public languagesList: Array<
    Record<'imgUrl' | 'code' | 'name' | 'shorthand', string>
  > = [
    {
      imgUrl: '/assets/images/flags/us.svg',
      code: 'en',
      name: 'English',
      shorthand: 'EN',
    },
    {
      imgUrl: '/assets/images/flags/it.svg',
      code: 'it',
      name: 'Italian',
      shorthand: 'IT',
    },
    {
      imgUrl: '/assets/images/flags/br.svg',
      code: 'br',
      name: 'Portuguese',
      shorthand: 'BR',
    },
    {
      imgUrl: '/assets/images/flags/es.svg',
      code: 'es',
      name: 'Spanish',
      shorthand: 'ES',
    },
  ];
  setLang(lang: string) {
    console.log(`setLang Mudando idioma para: ${lang}`);
    this.translocoService.setActiveLang(lang);
    // Obtém o idioma atual da rota
    const currentLang = this.router.url.split('/')[1]; // Primeiro segmento da URL

    // Substitui apenas o idioma na URL mantendo o restante da rota
    const newUrl = this.router.url.replace(`/${currentLang}`, `/${lang}`);

    this.router.navigateByUrl(newUrl, { replaceUrl: true });
    // if (this.isBrowser()) {
    // localStorage.setItem('lang', lang); // Salva o idioma selecionado no localStorage
    // }
    // this.router.navigate([lang]);
    // Navegação programática para uma rota específica
  };
  public changeLanguage(languageCode: string): void {
    console.log(`changeLanguage Mudando idioma para: ${languageCode}`);

    this.translocoService.setActiveLang(languageCode);
    languageCode === 'fa'
      ? (document.body.style.direction = 'rtl')
      : (document.body.style.direction = 'ltr');
  }
}
