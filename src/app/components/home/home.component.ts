import { Component, AfterViewInit } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { TranslocoModule } from '@jsverse/transloco';
import { RouterModule, RouterLink } from '@angular/router';
import { LanguageSelectorModule } from '../language-selector/language-selector.module';
import { LeadFormComponent } from '../form_espocrm/lead-form.component';
import { FormsModule } from '@angular/forms'; // Adicionado para ngModel
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ // Correção: "imports" (não "declarations") em componentes standalone
    TranslocoModule,
    LanguageSelectorModule,
    RouterLink,
    RouterModule,
    LeadFormComponent, 
    FormsModule,
    FooterComponent,
    NavbarComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit { // Implementa AfterViewInit
  constructor(public translocoService: TranslocoService) {} 
  
  title = 'f5sites';
  language = "en";

  get currentLang(): string {
    return this.translocoService.getActiveLang();
  }

  private loadScript(url: string) {
    console.log("Loading script:", url);
  
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.onload = () => console.log(`Script ${url} loaded successfully.`);
    script.onerror = () => console.error(`Failed to load script ${url}.`);
    document.body.appendChild(script);
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit");
    // if (typeof window !== 'undefined') {
    //   requestAnimationFrame(() => {
    //     setTimeout(() => {
    //       this.loadScript('assets/js/main.js');
    //       // this.loadScript('assets/js/plugins.js');
    //     }, 600);
    //     setTimeout(() => {
    //       // this.loadScript('assets/js/main.js');
    //       this.loadScript('assets/js/plugins.js');
    //     }, 900);
    //   });
    // }
  }
}