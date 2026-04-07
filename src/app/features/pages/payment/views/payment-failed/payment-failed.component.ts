import { Component } from '@angular/core';
import { TopBannerComponent } from '@app/shared/components/banner/top-banner/top-banner.component';
import { CommonModule } from '@angular/common';
import { TranslationModule } from '@app/core/modules/translation.module';

@Component({
    selector: 'app-payment-failed',
    imports: [TopBannerComponent, CommonModule, TranslationModule],
    templateUrl: './payment-failed.component.html',
    styleUrl: './payment-failed.component.css'
})

export class PaymentFailedComponent {

}

