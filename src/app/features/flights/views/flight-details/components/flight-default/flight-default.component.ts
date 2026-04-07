import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { ScrollerModule } from 'primeng/scroller';
import { ButtonComponent } from '@app/shared/components/widgets/button/button.component';
import { FlightRulesComponent } from "@features/flights/components/flight-rules/flight-rules.component";

@Component({
  selector: 'app-flight-default',
  imports: [CommonModule, TranslationModule, ScrollerModule, ButtonComponent, FlightRulesComponent],
  templateUrl: './flight-default.component.html',
  styleUrl: './flight-default.component.css'
})
export class FlightDefaultComponent {

  @Input() details: any
  @Input() searchToken: any
  @Input() rateKey: any
  @Input() day: any
  @Input() month: any
  @Input() year: any
  @Input() carrierCode: any

  @Output() selectFare = new EventEmitter<string>();

  isLoading = signal<Record<string, boolean>>({});

  onSelectfare(pack: any) {
    this.isLoading.update(prev => ({ ...prev, [pack]: true }));

    setTimeout(() => {
      this.selectFare.emit(pack);
      this.isLoading.update(prev => ({ ...prev, [pack]: false }));
    }, 2000);
  }
}
