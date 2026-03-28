import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { PasswordResetRequest } from '../models/PasswordResetRequest';
import { PasswordUpdateRequest } from '../models/PasswordUpdateRequest';
import { PasswordUpdateResponse } from '../models/PasswordUpdateResponse';

@Injectable({
  providedIn: 'root',
})
export class PasswordResetService {
  
  private http = inject(HttpClient);
  private readonly PASSWORD_RESET_URL = `${environment.apiUrl}/password/reset`;
  private readonly PASSWORD_UPDATE_URL = `${environment.apiUrl}/password/update`;

  reset(json: PasswordResetRequest): Observable<any> {
    return this.http.post<any>(this.PASSWORD_RESET_URL, json);
  }

  update(json: PasswordUpdateRequest): Observable<PasswordUpdateResponse> {
    return this.http.post<PasswordUpdateResponse>(this.PASSWORD_UPDATE_URL, json);
  }

}
