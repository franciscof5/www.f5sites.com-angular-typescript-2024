import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EspoCrmService {
  private apiUrl = 'http://192.168.18.102:8080/api/v1/Lead'; // URL da API do EspoCRM
  private apiToken = '7f3a4b9e2f9da09f4e2671126c22fde0'; // Token gerado no passo 1

  constructor(private http: HttpClient) {}

  createLead(leadData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Api-Key': this.apiToken
    });

    return this.http.post(this.apiUrl, leadData, { headers });
  }
}