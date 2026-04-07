import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TopBannerComponent } from '@app/shared/components/banner/top-banner/top-banner.component';
import { SessionService } from '@app/core/services/session.service';

@Component({
  selector: 'app-cookies',
  imports: [TopBannerComponent],
  templateUrl: './app-cookies.component.html',
  styleUrl: './app-cookies.component.css'
})
export class CookiesComponent {

  constructor(private sessionService: SessionService, private http: HttpClient, private router: Router) { }

  currentLang = signal<string>(null);
  data = signal<any>(null);

  ngOnInit() {
    this.currentLang.set(this.sessionService.getSession()?.lang)
    this.loadHtmlByLang();
  }

  loadHtmlByLang() {
    const filePath = `assets/html/cookies-${this.currentLang()}.html`;

    this.http.get(filePath, { responseType: 'text' })
      .subscribe(
        response => this.data.set(response),
        error => this.router.navigateByUrl('/404')
      );
  }

}
