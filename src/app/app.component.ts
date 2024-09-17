import { CommonModule } from "@angular/common";
import { Component, inject, OnDestroy } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TranslocoService } from "@jsverse/transloco";
import { LangDefinition } from "@jsverse/transloco";
import { Subscription, take } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class AppComponent implements OnDestroy {
  service = inject(TranslocoService);
  availableLangs = this.service.getAvailableLangs() as LangDefinition[];
  private subscription: Subscription | null;

  get activeLang() {
    return this.service.getActiveLang();
  }

  changeLang(lang: string) {
    // Ensure new active lang is loaded
    this.subscription?.unsubscribe();
    this.subscription = this.service
      .load(lang)
      .pipe(take(1))
      .subscribe(() => {
        this.service.setActiveLang(lang);
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscription = null;
  }
}

// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CommonModule, RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title = 'f5sites';
  
//   // Método que carrega o script main.js dinamicamente
//   private loadScript(url: string) {
//     const script = document.createElement('script');
//     script.src = url;
//     script.async = true;
//     document.body.appendChild(script);
//   }

//   ngAfterViewInit() {
//     // Carrega o main.js após a view ser inicializada
//     this.loadScript('assets/js/main.js');
//   }
// }
