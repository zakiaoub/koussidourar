import { Component } from '@angular/core';
import { AdReferralProgramComponent } from '@app/shared/components/banner/ad-referral-program/ad-referral-program.component';
import { FaqDisplayComponent } from '@app/shared/components/templates/faq-display/faq-display.component';
import { ProductBackgroundComponent } from '@app/shared/components/templates/product-background/product-background.component';
import { ProductsStepComponent } from '@app/shared/components/templates/products-step/products-step.component';
import { TransfersFormFieldsComponent } from "@features/transfers/templates/transfers-form-fields/transfers-form-fields.component";

@Component({
  selector: 'app-transfers-overview',
  standalone: true,
  imports: [ProductBackgroundComponent, ProductsStepComponent, FaqDisplayComponent, TransfersFormFieldsComponent, AdReferralProgramComponent],
  templateUrl: './transfers-overview.component.html',
  styleUrl: './transfers-overview.component.css'
})

export class TransfersOverviewComponent {

  images: string[] = [
    "transfer-bg-1.webp",
    "transfer-bg-2.webp",
    "transfer-bg-3.webp"
  ]
}
