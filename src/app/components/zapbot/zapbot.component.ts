import { Component } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-zapbot',
  templateUrl: './zapbot.component.html',
  styleUrls: ['./zapbot.component.css']
})
export class ZapbotComponent {
  constructor(private transloco: TranslocoService) {}
}