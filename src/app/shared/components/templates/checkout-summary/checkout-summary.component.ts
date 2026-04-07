import { CommonModule } from '@angular/common';
import { TranslationModule } from '@app/core/modules/translation.module';
import { Component, Input } from '@angular/core';
import { AmountComponent } from '../../settings/components/amount/amount.component';

@Component({
  selector: 'app-checkout-summary',
  imports: [TranslationModule, CommonModule, AmountComponent],
  templateUrl: './checkout-summary.component.html',
  styleUrl: './checkout-summary.component.css'
})

export class CheckoutSummaryComponent {

  @Input() price: number
  @Input() title: string = ""
}
