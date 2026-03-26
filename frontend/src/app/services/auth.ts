import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { LoginRequest } from '../models/LoginRequest';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/LoginResponse';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  
  private http = inject(HttpClient);
  private readonly LOGIN_URL = `${environment.apiUrl}/auth/login`;

  login(req: LoginRequest) : Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.LOGIN_URL, req)
  }

}
