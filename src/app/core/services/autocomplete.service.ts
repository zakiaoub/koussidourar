import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';
import { environment } from 'environments/environment'

@Injectable({
    providedIn: 'root'
})

export class AutocompleteService {

    constructor(private http: HttpClient, private SessionService: SessionService) {
        this.sessionToken = this.SessionService.generateToken()
        this.lang = this.SessionService.getSession()?.lang
    }

    private baseUrl = environment.NG_APP_API_URL;
    private sessionToken: string
    private lang: string

    getData(service: string, query: string): Observable<any> {
        const url = `${this.baseUrl}/${service}?q=${query}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'sessionToken': this.sessionToken,
            'lang': this.lang
        });

        return this.http.get(url, { headers });
    }
}
