import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { CheckoutSummaryComponent } from '@app/shared/components/templates/checkout-summary/checkout-summary.component';
import { CityImageComponent } from '@app/shared/components/widgets/city-image/city-image.component';

@Component({
  selector: 'app-checkout-transfer-recap',
  imports: [CommonModule, TranslationModule, CityImageComponent, CheckoutSummaryComponent],
  templateUrl: './checkout-transfer-recap.component.html',
  styleUrl: './checkout-transfer-recap.component.css'
})
export class CheckoutTransferRecapComponent {

  @Input() data: any

  get countAdults(): number {
    return this.data.paxes.filter(p => p.Type === 'ADT').length;
  }

  get countChildren(): number {
    return this.data.paxes.filter(p => p.Type === 'CHD').length;
  }

}
