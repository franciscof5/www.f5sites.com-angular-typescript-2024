declare var hbspt: any;

import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-lead-form',
  standalone: true,
  templateUrl: './lead-form.component.html',
})
export class LeadFormComponent implements AfterViewInit {
    ngAfterViewInit(): void {
        const script = document.createElement('script');
        script.src = 'https://js-eu1.hsforms.net/forms/embed/v2.js';
        script.onload = () => {
          const waitForElement = setInterval(() => {
            const target = document.querySelector('#hubspotForm');
            if (target && typeof hbspt !== 'undefined') {
              clearInterval(waitForElement);
              hbspt.forms.create({
                portalId: '145294488',
                formId: 'd648a8ae-fd17-42a4-a02b-b4e2241734d3',
                region: 'eu1',
                target: '#hubspotForm',
                redirectUrl: 'https://www.f5sites.com/grace'
              });
            }
          }, 100); // tenta a cada 100ms
        };
        document.body.appendChild(script);
      }
}
