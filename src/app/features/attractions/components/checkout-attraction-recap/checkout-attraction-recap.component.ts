import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { CheckoutSummaryComponent } from '@app/shared/components/templates/checkout-summary/checkout-summary.component';
import { CityImageComponent } from '@app/shared/components/widgets/city-image/city-image.component';

@Component({
  selector: 'app-checkout-attraction-recap',
  imports: [CommonModule, TranslationModule, CheckoutSummaryComponent, CityImageComponent],
  templateUrl: './checkout-attraction-recap.component.html',
  styleUrl: './checkout-attraction-recap.component.css'
})
export class CheckoutAttractionRecapComponent {

  @Input() data: any

}
