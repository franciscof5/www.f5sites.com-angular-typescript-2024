// app.component.ts
import { Component, OnInit, AfterViewInit, OnDestroy, Renderer2, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoService, TranslocoModule } from '@jsverse/transloco';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RouterModule, TranslocoModule, RouterOutlet],
  template: `
    <!-- Tela de carregamento -->
    @if (!resourcesLoaded) {
      <div class="loading-screen">
        <div class="spinner"></div>
        <p>Carregando F5 Sites...</p>
      </div>
    }
    
    <!-- Google Tag Manager (noscript) -->
    <noscript>
      <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TPCMBN7C"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
    </noscript>
    
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
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
    private translocoService: TranslocoService,
    private router: Router,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    console.log('Environment production:', environment.production);
    
    if (environment.production) {
      this.loadGtmScript();
    }
    this.loadCSSFiles();
    setTimeout(() => {
      this.checkGtmStatus();
    }, 3000);
  }
  private checkGtmStatus() {
    console.log("checkGtmStatus()")
    if ((window as any).google_tag_manager) {
      console.log('✅ GTM carregado:', (window as any).google_tag_manager);
    } else {
      console.warn('⚠️ GTM não detectado na window');
    }
    
    if ((window as any).dataLayer) {
      console.log('✅ DataLayer disponível:', (window as any).dataLayer);
    } else {
      console.warn('⚠️ DataLayer não encontrado');
    }
  }
  ngAfterViewInit() {
    this.loadScripts();
  }

  ngOnDestroy() {
    this.removeElements(this.loadedStyles);
    this.removeElements(this.loadedScripts);
  }

  private loadGtmScript() {
    console.log('Carregando Google Tag Manager...');
    
    // Primeiro, verifique se já existe para evitar duplicação
    if (this.document.getElementById('gtm-script')) {
      return;
    }

    const script = this.renderer.createElement('script');
    script.id = 'gtm-script';
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id=GTM-TPCMBN7C';f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-TPCMBN7C');
    `;
    
    script.onload = () => {
      console.log('✅ Google Tag Manager carregado com sucesso');
      // Força o push de um evento para testar
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({'gtm.start': new Date().getTime(), event:'gtm.js'});
    };
    
    script.onerror = (e: ErrorEvent) => {
      console.error('❌ Erro ao carregar Google Tag Manager', e);
    };
    
    this.renderer.appendChild(this.document.head, script);
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
    // Aguarda um breve momento para garantir que tudo está carregado
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
        // Inicialize o Magnific Popup aqui se necessário
        // Exemplo: $( '.popup' ).magnificPopup({ type: 'image' });
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
        // Inicialize o Owl Carousel aqui se necessário
        // Exemplo: $(".owl-carousel").owlCarousel();
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

  setLang(lang: string) {
    console.log(`🌐 Mudando idioma para: ${lang}`);
    this.translocoService.setActiveLang(lang);
    this.router.navigate([lang]);
  }

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}