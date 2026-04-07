import { Component, signal } from '@angular/core';
import { SessionService } from '@app/core/services/session.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TopBannerComponent } from '@app/shared/components/banner/top-banner/top-banner.component';
import { TranslationModule } from '@app/core/modules/translation.module';

@Component({
    selector: 'app-terms',
    imports: [TopBannerComponent, TranslationModule, CommonModule],
    templateUrl: './terms.component.html',
    styleUrl: './terms.component.css'
})

export class TermsComponent {
    constructor(private sessionService: SessionService, private http: HttpClient, private router: Router) { }

    currentLang = signal<string>(null);
    data = signal<any>(null);

    ngOnInit() {
        this.currentLang.set(this.sessionService.getSession()?.lang)
        this.loadHtmlByLang();
    }

    loadHtmlByLang() {
        const filePath = `assets/html/terms-${this.currentLang()}.html`;

        this.http.get(filePath, { responseType: 'text' })
            .subscribe(
                response => this.data.set(response),
                error => this.router.navigateByUrl('/404')
            );
    }
}
