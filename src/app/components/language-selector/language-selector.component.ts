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
      imgUrl: '/assets/images/flags/English.png',
      code: 'en',
      name: 'English',
      shorthand: 'EN',
    },
    {
      imgUrl: '/assets/images/flags/Italian.png',
      code: 'it',
      name: 'Italian',
      shorthand: 'IT',
    },
    {
      imgUrl: '/assets/images/flags/Persian.png',
      code: 'pt',
      name: 'Portuguese',
      shorthand: 'BR',
    },
    {
      imgUrl: '/assets/images/flags/Persian.png',
      code: 'sp',
      name: 'Spanish',
      shorthand: 'SP',
    },
  ];
  public changeLanguage(languageCode: string): void {
    this.translocoService.setActiveLang(languageCode);
    languageCode === 'fa'
      ? (document.body.style.direction = 'rtl')
      : (document.body.style.direction = 'ltr');
  }
}
