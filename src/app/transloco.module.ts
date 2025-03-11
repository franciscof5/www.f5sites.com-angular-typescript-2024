import { NgModule } from '@angular/core';
import { TranslocoModule, TRANSLOCO_CONFIG, TRANSLOCO_LOADER, translocoConfig } from '@jsverse/transloco';
import { environment } from '../environments/environment';
import { TranslocoHttpLoader } from './transloco-loader';

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en', 'it', 'br', 'es'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: environment.production,
      })
    },
    {
      provide: TRANSLOCO_LOADER,
      useClass: TranslocoHttpLoader
    }
  ]
})
export class TranslocoRootModule {}
