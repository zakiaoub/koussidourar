import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslationModule } from '../../../../core/modules/translation.module';
import { DialogModule } from 'primeng/dialog';
import { IconComponent } from '@app/shared/components/widgets/icon/icon.component';
import { ButtonComponent } from '@app/shared/components/widgets/button/button.component';
import { TransfersTripFormComponent } from '@app/shared/components/forms/transfers-trip-form/transfers-trip-form.component';
import { AmountComponent } from '@app/shared/components/settings/components/amount/amount.component';

@Component({
  selector: 'app-transfer-flex',
  standalone: true,
  imports: [CommonModule, TranslationModule, DialogModule, ButtonComponent, IconComponent, AmountComponent, TransfersTripFormComponent],
  templateUrl: './transfer-flex.component.html',
  styleUrl: './transfer-flex.component.css'
})

export class TransferFlexComponent {

  @Input() items!: any;
  @Input() searchToken!: any;

  itinerary: number = 0
  itineraries = [
    { title: "depart", value: 0 },
    { title: "return", value: 1 },
  ]

  setActiveItinerary(itinerary: number) {
    this.itinerary = itinerary
  }

  visible: Record<string, boolean> = {};

  showDialog(RateKey: string) {
    this.visible[RateKey] = true;
  }
}
