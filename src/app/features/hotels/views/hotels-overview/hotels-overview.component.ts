import { Component } from '@angular/core';
import { ProductsStepComponent } from '@app/shared/components/templates/products-step/products-step.component';
import { ProductBackgroundComponent } from '@app/shared/components/templates/product-background/product-background.component';
import { FaqDisplayComponent } from '@app/shared/components/templates/faq-display/faq-display.component';
import { CommonModule } from '@angular/common';
import { AdReferralProgramComponent } from "@app/shared/components/banner/ad-referral-program/ad-referral-program.component";
import { HotelsSearchFormComponent } from '@app/shared/components/forms/hotels-search-form/hotels-search-form.component';

@Component({
  selector: 'app-hotels-overview',
  standalone: true,
  imports: [ProductsStepComponent, ProductBackgroundComponent, HotelsSearchFormComponent, FaqDisplayComponent, CommonModule, AdReferralProgramComponent],
  templateUrl: './hotels-overview.component.html',
  styleUrl: './hotels-overview.component.css'
})

export class HotelsOverviewComponent {

  images: string[] = [
    "hotel-bg-1.webp",
    "hotel-bg-2.webp",
    "hotel-bg-3.webp"
  ]
}
