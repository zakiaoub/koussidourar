import { Component, signal } from '@angular/core';
import { SessionService } from '@app/core/services/session.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TopBannerComponent } from '@app/shared/components/banner/top-banner/top-banner.component';
import { TranslationModule } from '@app/core/modules/translation.module';

@Component({
    selector: 'app-policy',
    imports: [TopBannerComponent, TranslationModule, CommonModule],
    templateUrl: './policy.component.html',
    styleUrl: './policy.component.css'
})

export class PolicyComponent {

    constructor(private sessionService: SessionService, private http: HttpClient, private router: Router) { }

    currentLang = signal<string>(null);
    data = signal<any>(null);

    ngOnInit() {
        this.currentLang.set(this.sessionService.getSession()?.lang)
        this.loadHtmlByLang();
    }

    loadHtmlByLang() {
        const filePath = `assets/html/policy-${this.currentLang()}.html`;

        this.http.get(filePath, { responseType: 'text' })
            .subscribe(
                response => this.data.set(response),
                error => this.router.navigateByUrl('/404')
            );
    }
}
