import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { ScrollerModule } from 'primeng/scroller';
import fares from '@assets/json/fares.json'
import { ButtonComponent } from '@app/shared/components/widgets/button/button.component';
import { AmountComponent } from '@app/shared/components/settings/components/amount/amount.component';

@Component({
  selector: 'app-flight-pack',
  imports: [CommonModule, TranslationModule, ScrollerModule, ButtonComponent, AmountComponent],
  templateUrl: './flight-pack.component.html',
  styleUrl: './flight-pack.component.css'
})

export class FlightPackComponent {

  ticket: string
  checkoutResponse: any
  fareFamilyDescription: any
  fares = fares
  @Input() details: any
  @Input() pack: any
  @Input() searchToken: any
  @Input() rateKey: any
  @Input() day: any
  @Input() month: any
  @Input() year: any
  @Input() carrierCode: any
  @Input() exchangeRate: number

  @Output() selectFare = new EventEmitter<string>();

  isLoading = signal<Record<string, boolean>>({});

  get visibleFares() {
    return this.fares.filter(f => this.details?.fareFamilyDescription?.[f.key]);
  }

  ngOnInit(): void {
    this.fareFamilyDescription = Object.entries(this.details.fareFamilyDescription)
  }
  
  onSelectfare(pack: any) {
        this.isLoading.update(prev => ({ ...prev, [pack]: true }));

    setTimeout(() => {
      this.selectFare.emit(pack);
      this.isLoading.update(prev => ({ ...prev, [pack]: false }));
    }, 2000);
  }
}
