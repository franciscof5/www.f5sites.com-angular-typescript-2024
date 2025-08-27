// home.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // obrigatoriamente

import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule // ← sem isso o routerLink não funciona
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule {}
