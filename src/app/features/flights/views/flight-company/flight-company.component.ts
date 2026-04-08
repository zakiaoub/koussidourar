import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { SkeletonCompanyComponent } from '@app/shared/components/loaders/skeleton-company/skeleton-company.component';
import { CommonModule } from '@angular/common';
import { TranslationModule } from '@modules/translation.module';
import airlines from "@assets/json/airlines.json"
import { FlightCompanyTimingComponent } from "@app/features/flights/views/flight-company/flight-company-timing/flight-company-timing.component";
import { FlightCardComponent } from "@features/flights/templates/flight-card/flight-card.component";
import { ReqService } from '@app/core/services/req.service';
import { ButtonComponent } from '@app/shared/components/widgets/button/button.component';
import { Airline } from '@app/core/models/airline.interface';
import { ToastService } from '@app/core/services/toast.service';
import { ErrorRequestComponent } from '@app/shared/components/errors/error-request/error-request.component';
import { AmountComponent } from '@app/shared/components/settings/components/amount/amount.component';
import { FilterPipe } from '@app/shared/pipes/filter.pipe';

@Component({
  selector: 'app-flight-company',
  imports: [CommonModule, TranslationModule, SkeletonCompanyComponent, FlightCompanyTimingComponent, FlightCardComponent, ButtonComponent, ErrorRequestComponent, AmountComponent, FilterPipe],
  templateUrl: './flight-company.component.html',
  styleUrl: './flight-company.component.css'
})

export class FlightCompanyComponent {
  constructor(private api: ReqService, private toast: ToastService) { }

  @Input() carrierCode: any;
  @Input() items: any
  @Input() amount: any
  @Input() day: any
  @Input() month: any
  @Input() year: any
  @Input() searchToken: string
  @Input() airportsName: any
  @Input() hotel?: any
  @Input() service: string

  @Output() book = new EventEmitter<{ carrierCode: string; rateKey: string }>();

  data = signal<any>(null)
  isLoading = signal<boolean>(false)
  error = signal<boolean>(false)
  isSubmiting = signal<Record<string, boolean>>({});
  overlay: Record<number, boolean> = {};
  airlines: Airline[] = airlines

  ngOnInit(): void {
    this.getData()
  }

  getData() {

    this.isLoading.set(true);

    this.api.get(['flight', 'company', 'rate', this.searchToken, this.day, this.month, this.year, this.carrierCode, this.amount].join('/'), []).subscribe({
      next: (response: any) => {
        this.data.set(response?.result?.avails);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set(true)
        this.isLoading.set(false);
      }
    })
  }

  getCheckRate(data: any, RateKey: string) {

    this.isSubmiting.update(prev => ({ ...prev, [RateKey]: true }));

    this.api.get(['flight', 'checkrate', this.searchToken, this.day, this.month, this.year, RateKey].join('/'), []).subscribe({
      next: () => {
        this.book.emit({ carrierCode: data.CarrierCode, rateKey: RateKey });
        this.isSubmiting.update(prev => ({ ...prev, [RateKey]: false }));
      },
      error: () => {
        this.toast.show({ severity: 'error', summary: 'error', detail: 'error_request', life: 3000 });
        this.isSubmiting.update(prev => ({ ...prev, [RateKey]: false }));
      }
    })
  }
}
