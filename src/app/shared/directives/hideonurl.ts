import { Directive, Input, TemplateRef, ViewContainerRef, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Directive({
  selector: '[appHideOnUrl]'
})
export class HideOnUrlDirective implements OnInit, OnDestroy {
  @Input('appHideOnUrl') hiddenUrls: string[] = [];

  private sub!: Subscription;

  constructor(
    private tpl: TemplateRef<any>,
    private vcr: ViewContainerRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateView(event.urlAfterRedirects);
      });

    // initialisation
    this.updateView(this.router.url);
  }

  private updateView(currentUrl: string): void {
  // Supprime les query params
  const urlWithoutQuery = currentUrl.split('?')[0];

  this.vcr.clear();
  if (!this.shouldHide(urlWithoutQuery)) {
    this.vcr.createEmbeddedView(this.tpl);
  }
}

  private shouldHide(currentUrl: string): boolean {
    return this.hiddenUrls.some(pattern => this.matchesPattern(currentUrl, pattern));
  }

  private matchesPattern(url: string, pattern: string): boolean {
    // Correspondance exacte
    if (url === pattern) {
      return true;
    }

    // Support des wildcards (*)
    if (pattern.includes('*')) {
      const regexPattern = pattern.replace(/\*/g, '.*');
      const regex = new RegExp(`^${regexPattern}$`);
      return regex.test(url);
    }

    // Support des paramètres Angular (:param)
    if (pattern.includes(':')) {
      const regexPattern = pattern
        .replace(/:[^/]+/g, '[^/]+') // Remplace :param par [^/]+
        .replace(/\//g, '\\/');      // Échappe les slashes
      
      const regex = new RegExp(`^${regexPattern}$`);
      return regex.test(url);
    }

    return false;
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}