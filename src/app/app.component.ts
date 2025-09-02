// app.component.ts - VERSÃO SIMPLIFICADA
import { Component, AfterViewInit, Renderer2, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoService, TranslocoModule } from '@jsverse/transloco';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RouterModule, TranslocoModule, RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements AfterViewInit {
  resourcesLoaded = false;
  
  // Lista de CSS para carregar
  private cssFiles = [
    './assets/css/bootstrap.min.css',
    './assets/css/owl.carousel.min.css',
    './assets/css/themify-icons.css',
    './assets/css/animate.css',
    './assets/css/magnific-popup.css',
    './assets/css/space.css',
    './assets/css/theme.css',
    './assets/css/overright.css',
    './assets/css/normalize.css',
    './assets/css/style.css',
    './assets/css/responsive.css'
  ];
  
  // Lista de scripts para carregar (em ordem)
  private jsFiles = [
    './assets/js/vendor/jquery-1.12.4.min.js',
    './assets/js/vendor/bootstrap.min.js',
    './assets/js/owl.carousel.min.js',
    './assets/js/scrollUp.min.js',
    './assets/js/magnific-popup.min.js',
    './assets/js/ripples-min.js',
    './assets/js/spectragram.min.js',
    './assets/js/ajaxchimp.js',
    './assets/js/wow.min.js',
    './assets/js/plugins.js'
  ];
  
  private loadedStyles: HTMLLinkElement[] = [];
  private loadedScripts: HTMLScriptElement[] = [];

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.loadCSSFiles();
  }

  ngAfterViewInit() {
    this.loadScripts();
  }

  ngOnDestroy() {
    this.removeElements(this.loadedStyles);
    this.removeElements(this.loadedScripts);
  }

  // Carrega arquivos CSS de forma assíncrona
  private loadCSSFiles() {
    let loadedCount = 0;
    
    this.cssFiles.forEach(cssFile => {
      const link = this.renderer.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssFile;
      link.onload = () => {
        loadedCount++;
        if (loadedCount === this.cssFiles.length) {
          console.log('✅ Todos os arquivos CSS foram carregados');
        }
      };
      link.onerror = (e: ErrorEvent) => {
        console.error(`❌ Erro ao carregar CSS: ${cssFile}`, e);
      };
      
      this.renderer.appendChild(this.document.head, link);
      this.loadedStyles.push(link);
    });
  }

  // Carrega scripts em sequência para garantir dependências
  private loadScripts() {
    this.loadScriptSequentially(0);
  }

  private loadScriptSequentially(index: number) {
    if (index >= this.jsFiles.length) {
      console.log('✅ Todos os scripts foram carregados');
      this.resourcesLoaded = true;
      this.initPlugins();
      return;
    }

    const script = this.renderer.createElement('script');
    script.src = this.jsFiles[index];
    script.async = false;
    script.onload = () => {
      console.log(`✅ Script carregado: ${this.jsFiles[index]}`);
      this.loadScriptSequentially(index + 1);
    };
    script.onerror = (e: ErrorEvent) => {
      console.error(`❌ Erro ao carregar script: ${this.jsFiles[index]}`, e);
      this.loadScriptSequentially(index + 1);
    };

    this.renderer.appendChild(this.document.body, script);
    this.loadedScripts.push(script);
  }

  // Inicializa plugins que dependem dos scripts carregados
  private initPlugins() {
    setTimeout(() => {
      try {
        if (typeof (window as any).WOW === 'function') {
          new (window as any).WOW().init();
          console.log('✅ WOW.js inicializado');
        }
        
        this.initMagnificPopup();
        this.initOwlCarousel();
        
        console.log('✅ Todos os recursos do site foram carregados e inicializados');
      } catch (error) {
        console.error('❌ Erro ao inicializar plugins:', error);
      }
    }, 500);
  }

  private initMagnificPopup() {
    try {
      if (typeof (window as any).jQuery !== 'undefined' && 
          (window as any).jQuery.fn.magnificPopup) {
        console.log('✅ Magnific Popup disponível');
      }
    } catch (error) {
      console.error('❌ Erro ao inicializar Magnific Popup:', error);
    }
  }

  private initOwlCarousel() {
    try {
      if (typeof (window as any).jQuery !== 'undefined' && 
          (window as any).jQuery.fn.owlCarousel) {
        console.log('✅ Owl Carousel disponível');
      }
    } catch (error) {
      console.error('❌ Erro ao inicializar Owl Carousel:', error);
    }
  }

  private removeElements(elements: HTMLElement[]) {
    elements.forEach(element => {
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });
  }
}