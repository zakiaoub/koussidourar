import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleUser, GoogleUserToken, User, UserPasword, UserPaswordReset } from '@models/users.interfaces';
import { SessionService } from '@services/session.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormDataService } from '@services/form-data.service';
import { environment } from 'environments/environment'

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, public router: Router, private sessionService: SessionService, private formDataService: FormDataService) { }
  signIn(user: User) {
    return this.http.post<any>(environment['NG_APP_API_URL'] + '/auth', user).pipe(
      catchError(this.handleError) // Add error handling
    );
  }

  handleCredentialGoogleResponse(user: GoogleUser) {
    return this.http.post<any>(environment['NG_APP_API_URL'] + '/google/verify/code', user).pipe(
      catchError(this.handleError)
    )
  }

  handleCredentialGoogleTokenResponse(user: GoogleUserToken) {
    return this.http.post<any>(environment['NG_APP_API_URL'] + '/google/verify/token', user).pipe(
      catchError(this.handleError)
    )
  }

  recoveryPassword(user: UserPasword) {
    return this.http.post<any>(environment['NG_APP_API_URL'] + '/forgot/password', user).pipe(
      catchError(this.handleError) // Add error handling
    );
  }
  resetPassword(user: UserPaswordReset, token: string) {
    return this.http.post<any>(environment['NG_APP_API_URL'] + '/reset/password/' + token, user).pipe(
      catchError(this.handleError) // Add error handling
    );
  }

  getToken(): any {
    return this.formDataService.getData('bearer');
  }
  // A generic error handling function
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    // You might want to display a more user-friendly error message
    return throwError('Something bad happened; please try again later.');
  }

  logout() {
    let removeToken = this.formDataService.clearData('bearer');
    if (removeToken == null) {
      window.location.href = '/'
    }
  }

  checkAuthentication(): boolean {
    let bearer = this.formDataService.getData('bearer')
    if (bearer == '' || bearer == null || bearer == 'undefined') {
      return false;
    }

    return this.checkTimeOut();
  }

  checkTimeOut(): boolean {
    let timeAt = new Date().getTime();
    let sessionAt: any = this.formDataService.getData('sessionAt');
    let timeout: any = this.formDataService.getData('timeout');
    let diffTime = Math.abs(timeAt - sessionAt) / 1000;
    return true
    // return (diffTime > timeout) ? false : true;
  }

  public get sessionToken(): string {
    return this.sessionService.generateToken();
  }

  public get lang(): string {
    return this.sessionService.getSession()?.lang;
  }

  public get currency(): string {
    return this.sessionService.getSession()?.currency;
  }
}
