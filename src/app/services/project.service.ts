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

  /** Cache for every GET request */
  private cache = new Map<string, Observable<any>>();

  constructor(private http: HttpClient) {}

  /**
   * Generic cached GET
   */
  private cachedGet<T>(url: string, params?: HttpParams): Observable<T> {
    const key = `${url}?${params?.toString() ?? ''}`;

    if (!this.cache.has(key)) {
      console.log('HTTP:', key);

      const request = this.http.get<T>(url, { params }).pipe(
        shareReplay({ bufferSize: 1, refCount: false })
      );

      this.cache.set(key, request);
    } else {
      console.log('CACHE:', key);
    }

    return this.cache.get(key)!;
  }

  getProjects(query: ProjectQueryParams = {}): Observable<ProjectsResponse> {
    let params = new HttpParams();

    if (query.featured) params = params.set('featured', '1');
    if (query.status) params = params.set('status', query.status);
    if (query.type) params = params.set('type', query.type);
    if (query.search) params = params.set('search', query.search);
    if (query.refresh) params = params.set('refresh', '1');
    if (query.lang) params = params.set('lang', query.lang);

    return this.cachedGet<ProjectsResponse>(this.projectsApiUrl, params);
  }

  getProjectBySlug(
    slug: string,
    lang?: string
  ): Observable<Project | ProjectErrorResponse> {

    let params = new HttpParams().set('slug', slug);

    if (lang) {
      params = params.set('lang', lang);
    }

    return this.cachedGet<Project | ProjectErrorResponse>(
      this.projectsApiUrl,
      params
    );
  }

  getStats(): Observable<ProjectStats> {
    const params = new HttpParams().set('stats', '1');

    return this.cachedGet<ProjectStats>(this.statsApiUrl, params);
  }

  getFeatured(lang?: string): Observable<ProjectsResponse> {
    return this.getProjects({
      featured: true,
      lang
    });
  }

  clearCache(): void {
    this.cache.clear();
  }

  clearCacheByUrl(url: string): void {
    [...this.cache.keys()]
      .filter(key => key.startsWith(url))
      .forEach(key => this.cache.delete(key));
  }
}