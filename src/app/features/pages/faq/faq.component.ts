import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { TranslationModule } from '@app/core/modules/translation.module';
import { TopBannerComponent } from '@app/shared/components/banner/top-banner/top-banner.component';
import { FaqDisplayComponent } from '@app/shared/components/templates/faq-display/faq-display.component';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [TranslationModule, AccordionModule, AvatarModule, BadgeModule, TopBannerComponent, FaqDisplayComponent, CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css',
  encapsulation: ViewEncapsulation.None
})

export class FaqComponent {

  @ViewChild(FaqDisplayComponent)
  child!: FaqDisplayComponent;

  getFaqData() {
    this.child.getFaqData();
  }

  service: string = "flights"

  setValue(value: string): void {
    this.service = value
    this.getFaqData()
  };

  data = [
    { label: "flights", value: "flights" },
    { label: "hotels", value: "hotel" },
    { label: "attractions", value: "visit" },
    { label: "transfers", value: "transfer" },
    // { label: "payment", value: "payment" },
  ]
}
