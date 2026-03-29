import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegistraCorsaRequest } from '../models/RegistraCorsaRequest';
import SecureLS from 'secure-ls';
import { Observable } from 'rxjs';
import { RegistraCorsaResponse } from '../models/RegistraCorsaResponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Corsa {
  
  private http = inject(HttpClient);
  private ls = new SecureLS();

  private readonly REGISTRA_CORSA_URL = `${environment.apiUrl}/corsa/add`;

  registraCorsa(req: RegistraCorsaRequest) : Observable<RegistraCorsaResponse> {

    const token = this.ls.get('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<RegistraCorsaResponse>(this.REGISTRA_CORSA_URL, req, { headers });

  }

}
