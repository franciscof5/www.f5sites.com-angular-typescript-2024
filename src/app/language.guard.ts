// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { TranslocoService } from '@jsverse/transloco';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class LanguageGuard implements CanActivate {
//   constructor(private translocoService: TranslocoService) {}

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean> | Promise<boolean> | boolean {
//     const lang = next.paramMap.get('lang'); // Pega o idioma da URL
//     if (lang && this.translocoService.getAvailableLangs().includes(lang)) {
//       this.translocoService.setActiveLang(lang); // Se o idioma for válido, define o idioma ativo
//       return true;
//     }
//     // Se o idioma não for válido, retorna falso ou redireciona para o idioma padrão
//     this.translocoService.setActiveLang('en'); // Defina o idioma padrão
//     return true;
//   }
// }

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class LanguageGuard implements CanActivate {

  constructor(private translocoService: TranslocoService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const lang = route.url[0].path; // Extract language from the URL path
    const availableLangs = ['en', 'it', 'br', 'es']; // List of supported languages

    if (availableLangs.includes(lang)) {
      this.translocoService.setActiveLang(lang); // Set the language using TranslocoService
      return true;
    } else {
      this.router.navigate(['en']); // Fallback to default language if not supported
      return false;
    }
  }
}
