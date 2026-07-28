import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ZapbotComponent } from './components/zapbot/zapbot.component';
import { LanguageGuard } from './language.guard';  // Import LanguageGuard
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';

export const routes: Routes = [
  {
    path: ':lang', // Dynamic language part
    canActivate: [LanguageGuard], // Add LanguageGuard here
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'zapbot', component: ZapbotComponent },
      { path: 'projects/:slug', component: ProjectDetailComponent },
    ],
  },
  { path: '**', redirectTo: 'en' }, // Default redirect to English
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
