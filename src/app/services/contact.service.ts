import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ContactPayload {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  street?: string;
  company?: string;
  site?: string;
  language: string;
}

export interface ContactResponse {
  ok: boolean;
  error?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = '/api/contact';

  constructor(private http: HttpClient) {}

  send(payload: ContactPayload): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(this.apiUrl, payload);
  }
}
