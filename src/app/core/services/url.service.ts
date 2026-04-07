import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UrlService {
  currentUrl$!: BehaviorSubject<string>;

  constructor(private router: Router) {

    this.currentUrl$ = new BehaviorSubject<string>(this.router.url);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentUrl$.next(event.urlAfterRedirects);
      });
  }
}
