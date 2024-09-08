import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'f5sites';
  
  // Método que carrega o script main.js dinamicamente
  private loadScript(url: string) {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    document.body.appendChild(script);
  }

  ngAfterViewInit() {
    // Carrega o main.js após a view ser inicializada
    this.loadScript('assets/js/main.js');
  }
}
