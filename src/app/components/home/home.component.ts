import { Component, OnInit } from '@angular/core';
import { TranslocoService, TranslocoModule } from '@jsverse/transloco';
import { RouterModule, RouterLink, Router } from '@angular/router';
import { LanguageSelectorModule } from '../language-selector/language-selector.module';
import { LeadFormComponent } from '../form_espocrm/lead-form.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

import { ProjectService } from '../../services/project.service';
import { ProjectStats, Project } from '../../models/projects';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
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
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'f5sites';
  language = "en";

  clients: any[] = [];

  stats?: ProjectStats;
  projects: Project[] = [];

  constructor(
    public translocoService: TranslocoService,
    private projectService: ProjectService,
    private router: Router
  ) {

    this.translocoService
      .selectTranslateObject<any[]>('clientSection.clients')
      .subscribe(clients => {
        this.clients = clients;
        console.log("ClientsClients", this.clients);
      });
  }

  ngOnInit() {

    this.projectService
      .getStats()
      .subscribe(stats => {
        this.stats = stats;
      });

    this.translocoService.langChanges$.subscribe(lang => {
      this.projectService
        .getFeatured(lang)
        .subscribe(res => {
          if (res.success) {
            this.projects = res.data;
          }
        });
    });
  }

  goToProject(slug: string) {
    this.router.navigate(['/', this.currentLang, 'projects', slug]);
  }

  get blobRows() {
    const rows = [];
    for (let i = 0; i < this.projects.length; i += 3) {
      rows.push(this.projects.slice(i, i + 3));
    }
    return rows;
  }

  get clientRows() {
    const rows = [];
    for (let i = 0; i < this.clients.length; i += 4) {
      rows.push(this.clients.slice(i, i + 4));
    }
    return rows;
  }

  get currentLang(): string {
    return this.translocoService.getActiveLang();
  }

}