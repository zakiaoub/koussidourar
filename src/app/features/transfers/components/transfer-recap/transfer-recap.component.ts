import { Component, Input } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { CommonModule } from '@angular/common';
import { ProductCancellationPolicyComponent } from '@app/shared/components/templates/product-cancellation-policy/product-cancellation-policy.component';
import { ButtonComponent } from '@app/shared/components/widgets/button/button.component';
import { AmountComponent } from '@app/shared/components/settings/components/amount/amount.component';

@Component({
  selector: 'app-transfer-recap',
  standalone: true,
  imports: [TranslationModule, CommonModule, ProductCancellationPolicyComponent, ButtonComponent, AmountComponent],
  templateUrl: './transfer-recap.component.html',
  styleUrl: './transfer-recap.component.css'
})

export class TransferRecapComponent {

  @Input() data: any
  @Input() parsedData: any
  @Input() searchToken: any
  @Input() RateKey: any
  isLoading = false

  get countAdults(): number {
    return this.data.paxes.filter(p => p.Type === 'ADT').length;
  }

  get countChildren(): number {
    return this.data.paxes.filter(p => p.Type === 'CHD').length;
  }

  onSubmit() {
    this.isLoading = true

    setTimeout(() => {
      this.isLoading = false;
      window.location.href = ['transfers', 'checkout', this.searchToken, this.RateKey].join('/')
    }, 1000);
  }

}
