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
