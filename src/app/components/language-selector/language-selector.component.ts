import { Component, Input } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent {
  constructor(private translocoService: TranslocoService) {}

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
      code: 'pt',
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
  public changeLanguage(languageCode: string): void {
    console.log(`Mudando idioma para: ${languageCode}`);

    this.translocoService.setActiveLang(languageCode);
    languageCode === 'fa'
      ? (document.body.style.direction = 'rtl')
      : (document.body.style.direction = 'ltr');
  }
}
