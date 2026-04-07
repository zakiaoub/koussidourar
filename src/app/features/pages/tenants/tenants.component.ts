import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationModule } from '@app/core/modules/translation.module';
import { TopBannerComponent } from '@app/shared/components/banner/top-banner/top-banner.component';
import { TenantsPricingComponent } from './components/tenants-pricing/tenants-pricing.component';
import { FaqDisplayComponent } from '@app/shared/components/templates/faq-display/faq-display.component';
import { ServicesBackgroundComponent } from '@app/shared/components/templates/services-background/services-background.component';
import { ComingSoonComponent } from '../../../shared/components/errors/coming-soon/coming-soon.component';

interface Data {
  title: string;
  caption: string;
  img: string
}

@Component({
  selector: 'app-tenants',
  imports: [CommonModule, TranslationModule, TopBannerComponent, TenantsPricingComponent, FaqDisplayComponent, ServicesBackgroundComponent, ComingSoonComponent],
  templateUrl: './tenants.component.html',
  styleUrl: './tenants.component.css'
})

export class TenantsComponent {

  data = [
    { title: "rent_store", caption: "rent_store_caption", img: "assets/icons/interface/deal.png" },
    { title: "make_profits", caption: "make_profits_caption", img: "assets/icons/interface/promo.png" },
  ]

  steps = [
    { id: 1, title: "register", content: "register_tenants_content" },
    { id: 2, title: "pricing", content: "pricing_content" },
    { id: 3, title: "details", content: "details_content" },
    { id: 4, title: "payment", content: "payment_content" }
  ]

  adventages = [
    { title: "quick_and_easy", caption: "quick_and_easy_caption", image: "https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-CohostingMarketingLandingPage/original/74b89191-6508-425b-ab32-4b93c306f184.png" },
    { title: "increased_visibility", caption: "increased_visibility_caption", image: "https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-CohostingMarketingLandingPage/original/f2326b21-540d-4d5e-baa0-3f5b98828db3.png" },
    { title: "security", caption: "security_caption", image: "https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-CohostingMarketingLandingPage/original/7d548ddd-fdd1-453d-a901-190d41a6f927.png" },
    { title: "flexibility", caption: "flexibility_caption", image: "https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-CohostingMarketingLandingPage/original/0ef54159-b39c-4c20-b7c1-2f6d772f3638.png" },
  ]

}
