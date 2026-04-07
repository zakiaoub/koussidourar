import { Component } from '@angular/core';
import { ProductBackgroundComponent } from '@app/shared/components/templates/product-background/product-background.component';
import { ProductsStepComponent } from '@app/shared/components/templates/products-step/products-step.component';
import { CommonModule } from '@angular/common';
import { FaqDisplayComponent } from '@app/shared/components/templates/faq-display/faq-display.component';
import { TranslationModule } from '@app/core/modules/translation.module';
import { FormsModule } from '@angular/forms';
import { FlightsFormFieldsComponent } from '@features/flights/templates/flights-form-fields/flights-form-fields.component';
import { AdReferralProgramComponent } from "@app/shared/components/banner/ad-referral-program/ad-referral-program.component";

@Component({
    selector: 'app-flights-overview',
    imports: [ProductBackgroundComponent, ProductsStepComponent, CommonModule, FaqDisplayComponent, TranslationModule, FormsModule, FlightsFormFieldsComponent, AdReferralProgramComponent],
    templateUrl: './flights-overview.component.html',
    styleUrl: './flights-overview.component.css'
})

export class FlightsOverviewComponent {

    images: string[] = [
        "flight-bg-1.webp",
        "flight-bg-2.webp",
        "flight-bg-3.webp"
    ]
}
