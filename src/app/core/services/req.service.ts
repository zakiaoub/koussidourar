import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { FormDataService } from '@services/form-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs';
import { environment } from 'environments/environment'

@Injectable({
    providedIn: 'root'
})

export class ReqService {

    private baseUrl = environment.NG_APP_API_URL;
    private attempts = environment.NG_APP_REQ_COUNT_ATTEMPTS

    constructor(
        private http: HttpClient,
        private sessionService: SessionService,
        private formDataService: FormDataService
    ) { }

    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'sessionToken': this.sessionService.generateToken(),
            'lang': this.sessionService.getSession()?.lang || environment.NG_APP_LANG,
            'currencyPaid': this.sessionService.getSession()?.currency || environment.NG_APP_CURRENCY,
            'Authorization': `Bearer ${this.formDataService.getData('bearer')}`
        });
    }

    get<T>(endpoint: string, params?: any) {
        return this.http.get<T>(`${this.baseUrl}/${endpoint}`, {
            headers: this.getHeaders(),
            params
        }).pipe(
            retry(this.attempts)
        );;
    }

    post<T>(endpoint: string, body?: any) {
        return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, {
            headers: this.getHeaders()
        }).pipe(
            retry(this.attempts)
        );
    }

    delete<T>(endpoint: string, body?: any) {
        return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, {
            headers: this.getHeaders(),
            body
        }).pipe(
            retry(1)
        );
    }
}
