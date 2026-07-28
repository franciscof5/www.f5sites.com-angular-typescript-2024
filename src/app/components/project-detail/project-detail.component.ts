import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { combineLatest } from 'rxjs';

import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/projects';

import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

import { TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  homeSectionAnchor = 'products';
  project?: Project;
  notFound = false;
  loading = true;

  linkMeta: Record<string, { icon: string; label: string }> = {
    github:    { icon: 'fa-brands fa-github',    label: 'GitHub' },
    youtube:   { icon: 'fa-brands fa-youtube',   label: 'YouTube' },
    instagram: { icon: 'fa-brands fa-instagram', label: 'Instagram' },
    tiktok:    { icon: 'fa-brands fa-tiktok',     label: 'TikTok' },
    twitter:   { icon: 'fa-brands fa-x-twitter',  label: 'Twitter' },
    facebook:  { icon: 'fa-brands fa-facebook',  label: 'Facebook' },
    domain:    { icon: 'fa-solid fa-globe',      label: 'Website' },
  };

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private titleService: Title,
    private metaService: Meta,
    private translocoService: TranslocoService
  ) {}

  get currentLang(): string {
    return this.translocoService.getActiveLang();
  }

  ngOnInit() {
    combineLatest([
      this.route.paramMap,
      this.translocoService.langChanges$
    ]).subscribe(([params, lang]) => {
      const slug = params.get('slug');
      if (!slug) {
        this.notFound = true;
        this.loading = false;
        return;
      }
      this.loadProject(slug, lang);
    });
  }

  private loadProject(slug: string, lang: string) {
    this.loading = true;
    this.notFound = false;

    this.projectService.getProjectBySlug(slug, lang).subscribe({
      next: (result) => {
        this.loading = false;

        if ('error' in result) {
          this.notFound = true;
          return;
        }

        this.project = result;
        this.setSeo(result);
      },
      error: () => {
        this.loading = false;
        this.notFound = true;
      }
    });
  }

  private setSeo(project: Project) {
    const title = project.seoTitle || project.title;
    const description = project.seoDescription || project.description;

    this.titleService.setTitle(title);

    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });

    if (project.banner) {
      this.metaService.updateTag({ property: 'og:image', content: project.banner });
    }
  }

  get links(): { key: string; url: string; icon: string; label: string }[] {
    if (!this.project) return [];

    return Object.keys(this.linkMeta)
      .map(key => ({
        key,
        url: (this.project as any)[key] as string,
        icon: this.linkMeta[key].icon,
        label: this.linkMeta[key].label
      }))
      .filter(link => !!link.url && link.url.trim() !== '');
  }

  get statusClass(): string {
    const status = (this.project?.status || '').toLowerCase();

    switch (status) {
      case 'production':  return 'badge-status badge-production';
      case 'startup':      return 'badge-status badge-startup';
      case 'paused':       return 'badge-status badge-paused';
      case 'discontinued': return 'badge-status badge-discontinued';
      default:             return 'badge-status badge-default';
    }
  }
}