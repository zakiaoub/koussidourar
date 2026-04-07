import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  const bearer = authService.getToken()
  if (!bearer) {
    return next(req)
  }



  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'sessionToken': authService.sessionToken,
    'lang': authService.lang,
    'currencyPaid': authService.currency,
    Authorization: "Bearer " + bearer
  })
  const newReq = req.clone({
    headers
  })

  return next(newReq)
}
