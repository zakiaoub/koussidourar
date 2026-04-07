import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationModule } from '@app/core/modules/translation.module';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { AmountComponent } from '../../settings/components/amount/amount.component';

@Component({
  selector: 'app-product-cancellation-policy',
  imports: [CommonModule, TranslationModule, IconComponent, AmountComponent],
  templateUrl: './product-cancellation-policy.component.html',
  styleUrl: './product-cancellation-policy.component.css'
})

export class ProductCancellationPolicyComponent {

  @Input() data: any
}
