import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import {
  Project,
  ProjectsResponse,
  ProjectErrorResponse,
  ProjectStats,
  ProjectQueryParams
} from '../models/projects';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private statsApiUrl =
    'https://script.google.com/macros/s/AKfycbzVXHm2cd7kFYs9-jwWeJBD680QNklievatD0kVrueSauzc4x5lO4LpsMO3zAw6LGvc/exec';

  private projectsApiUrl =
    'https://script.google.com/macros/s/AKfycby22VxGgLCO0M8M7GmKZXOB05A6OIrjT2pbQjwnRAb9cHzW4SefIt-RI_Zj132NWTN8/exec';

  constructor(private http: HttpClient) {}
  
  private projectsCache = new Map<string, Observable<ProjectsResponse>>();

  getProjects(query: ProjectQueryParams = {}): Observable<ProjectsResponse> {

    const key = JSON.stringify(query);

    if (!this.projectsCache.has(key)) {

      let params = new HttpParams();

      if (query.featured) params = params.set('featured', '1');
      if (query.status) params = params.set('status', query.status);
      if (query.type) params = params.set('type', query.type);
      if (query.search) params = params.set('search', query.search);
      if (query.lang) params = params.set('lang', query.lang);

      const request = this.http
        .get<ProjectsResponse>(this.projectsApiUrl, { params })
        .pipe(shareReplay(1));

      this.projectsCache.set(key, request);
    }

    return this.projectsCache.get(key)!;
  }

  clearCache() {
    this.projectsCache.clear();
  }

  getStats(): Observable<ProjectStats> {
    return this.http.get<ProjectStats>(`${this.statsApiUrl}?stats=1`);
  }
  
  getProjectBySlug(slug: string, lang?: string): Observable<Project | ProjectErrorResponse> {
    let params = new HttpParams().set('slug', slug);
    if (lang) params = params.set('lang', lang);

    return this.http.get<Project | ProjectErrorResponse>(this.projectsApiUrl, { params });
  }

  getFeatured(lang?: string): Observable<ProjectsResponse> {
    return this.getProjects({ featured: true, lang });
  }
}