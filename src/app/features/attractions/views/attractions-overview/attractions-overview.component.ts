import { Component } from '@angular/core';
import { ProductBackgroundComponent } from '@app/shared/components/templates/product-background/product-background.component';
import { ProductsStepComponent } from '@app/shared/components/templates/products-step/products-step.component';
import { FaqDisplayComponent } from '@app/shared/components/templates/faq-display/faq-display.component';
import { AdReferralProgramComponent } from "@app/shared/components/banner/ad-referral-program/ad-referral-program.component";
import { AttractionsSearchFormComponent } from '@app/shared/components/forms/attractions-search-form/attractions-search-form.component';

@Component({
  selector: 'app-attractions-overview',
  imports: [ProductBackgroundComponent, AttractionsSearchFormComponent, ProductsStepComponent, FaqDisplayComponent, AdReferralProgramComponent],
  templateUrl: './attractions-overview.component.html',
  styleUrl: './attractions-overview.component.css'
})

export class AttractionsOverviewComponent {

  images: string[] = [
    "attraction-bg-1.webp",
    "attraction-bg-2.webp",
    "attraction-bg-3.webp"
  ]
}
