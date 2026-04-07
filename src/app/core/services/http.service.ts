import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormDataService } from '@services/form-data.service';
import { environment } from 'environments/environment'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseUrl = environment.NG_APP_API_URL || 'http://localhost:3000';

  constructor(private sessionService: SessionService, private http: HttpClient,private formDataService:FormDataService) { }

  private get sessionToken(): string {
    return this.sessionService.generateToken();
  }

  private get lang(): string {
    return this.sessionService.getSession()?.lang;
  }

  private get currency(): string {
    return this.sessionService.getSession()?.currency;
  }
private get bearerToken(): string {
  return this.formDataService.getData('bearer');
}
  private getHeaders(): any {
    return new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'sessionToken': this.sessionToken,
      'lang': this.lang,
      'currencyPaid': this.currency,
      'Authorization': 'Bearer ' + this.bearerToken
    });
  }

  getData(endpoint: string, params?: any): Observable<any> {

    return this.http.get<any>(`${this.baseUrl}/${endpoint}`, {
      params: params,
      'headers': this.getHeaders()
    })
  }



}
