import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { IconComponent } from '@app/shared/components/widgets/icon/icon.component';
import { CheckoutSummaryComponent } from '@app/shared/components/templates/checkout-summary/checkout-summary.component';
import { TranslationModule } from '@app/core/modules/translation.module';

@Component({
  selector: 'app-booking-payment',
  imports: [CommonModule, TranslationModule, IconComponent, CheckoutSummaryComponent],
  templateUrl: './booking-payment.component.html',
  styleUrl: './booking-payment.component.css'
})
export class BookingPaymentComponent {
  amountTotal = input<number>();
}
