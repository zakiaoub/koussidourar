import { AfterViewInit, Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { TranslationModule } from '../../core/modules/translation.module';
import { CommonModule } from '@angular/common';
import { PanelComponent } from '../../shared/components/settings/components/panel/panel.component';
import { AsideComponent } from "../aside/aside.component";
import { SidebarModule } from 'primeng/sidebar';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { UrlService } from '@app/core/services/url.service';
import { FormDataService } from '@app/core/services/form-data.service';
import { Profile } from '@app/core/models/profile.interface';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [LogoComponent, NavComponent, TranslationModule, CommonModule, PanelComponent, AsideComponent, SidebarModule, IconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  encapsulation: ViewEncapsulation.None
})

export class Header implements OnInit, AfterViewInit {

  constructor(private url: UrlService, private formDataService: FormDataService, private router: Router) { }

  href: string = '';
  sidebar: boolean = false;
  profileData: Profile | null = null;;

  ngOnInit(): void {
    this.profileData = this.formDataService.getData('profile')

    this.url.currentUrl$.subscribe(url => {
      this.href = url;
    });

    this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)).subscribe(() => {
      setTimeout(() => this.syncScrollState(), 0);
    });
  }

  ngAfterViewInit(): void {
    this.syncScrollState();
  }

  scrolled: boolean = false;

  /** Scroll sur `html` : lire documentElement en priorité (aligné avec global.css) */
  private getScrollY(): number {
    if (typeof document === 'undefined') {
      return 0;
    }
    const doc = document.documentElement;
    const y = window.scrollY ?? doc.scrollTop ?? document.body?.scrollTop ?? 0;
    return y;
  }

  private syncScrollState(): void {
    this.scrolled = this.getScrollY() > 10;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.syncScrollState();
  }

  routes: string[] = ['/', '/flights', '/hotels', '/attractions', '/transfers'];

  isRouteIncluded(): boolean {
    const currentUrl = this.router.url.split('?')[0];
    return this.routes.includes(currentUrl);
  }
}
