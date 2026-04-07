import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationModule } from '@app/core/modules/translation.module';
import { AmountComponent } from '@app/shared/components/settings/components/amount/amount.component';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'app-flight-card',
  imports: [CommonModule, TranslationModule, AmountComponent, Tooltip],
  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.css'
})
export class FlightCardComponent {

  @Input() luggages: any
  @Input() amount: any
  @Input() availStatus: any
  @Input() itineraries: any
}
