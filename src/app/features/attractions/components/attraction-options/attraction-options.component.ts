import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { ButtonComponent } from '@app/shared/components/widgets/button/button.component';
import { ProductCancellationPolicyComponent } from '@app/shared/components/templates/product-cancellation-policy/product-cancellation-policy.component';
import { AmountComponent } from '@app/shared/components/settings/components/amount/amount.component';

@Component({
  selector: 'app-attraction-options',
  imports: [CommonModule, TranslationModule, ButtonComponent, ProductCancellationPolicyComponent, AmountComponent],
  templateUrl: './attraction-options.component.html',
  styleUrl: './attraction-options.component.css'
})

export class AttractionOptionsComponent {

  @Input() data: any
  @Input() searchToken: any
  isLoading: boolean = false

  onSubmit() {
    this.isLoading = true

    setTimeout(() => {
      this.isLoading = false;
      window.location.href = ['attractions', 'checkout', this.data?.activity?.ActivityCode, this.searchToken, this.data?.category?.RateKey].join('/')
    }, 1000);
  }
}
