import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageGuard implements CanActivate {

  private availableLangs = ['en', 'it', 'br', 'es'];

  constructor(
    private translocoService: TranslocoService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const lang = route.url[0]?.path;

    if (!this.availableLangs.includes(lang)) {
      this.router.navigate(['en']);
      return of(false);
    }

    return this.translocoService.load(lang).pipe(
      tap(() => this.translocoService.setActiveLang(lang)),
      map(() => true),
      catchError(() => {
        this.router.navigate(['en']);
        return of(false);
      })
    );
  }
}