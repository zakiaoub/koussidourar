import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, signal } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { CommonModule } from '@angular/common';
import { TimelineModule } from 'primeng/timeline';
import { ActivatedRoute } from '@angular/router';
import { FlightsItineraryComponent } from "../flights-itinerary/flights-itinerary.component";
import { FlightCardComponent } from "../flight-card/flight-card.component";
import { FlightCompanyComponent } from '@features/flights/views/flight-company/flight-company.component'
import { DialogService } from 'primeng/dynamicdialog';
import airlines from "@assets/json/airlines.json"
import { ReqService } from '@app/core/services/req.service';
import { ButtonComponent } from '@app/shared/components/widgets/button/button.component';
import { DialogModule } from 'primeng/dialog';
import { Airline } from '@app/core/models/airline.interface';
import { ToastService } from '@app/core/services/toast.service';
import { TooltipModule } from 'primeng/tooltip';
import { FlightDetailsComponent } from '@features/flights/views/flight-details/flight-details.component';
import { FlightsBookingFormComponent } from '@app/shared/components/forms/flights-booking-form/flights-booking-form.component';

@Component({
  selector: 'app-flight-flex',
  imports: [CommonModule, TranslationModule, TimelineModule, FlightsItineraryComponent, FlightCardComponent, ButtonComponent, DialogModule, FlightCompanyComponent, TooltipModule, FlightDetailsComponent, FlightsBookingFormComponent],
  templateUrl: './flight-flex.component.html',
  styleUrl: './flight-flex.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DialogService]
})

export class FlightFlexComponent {

  constructor(private route: ActivatedRoute, private api: ReqService, private toast: ToastService) { }

  airlines: Airline[] = airlines

  @Input() items!: any;
  @Input() day: any
  @Input() month: any
  @Input() year: any
  @Input() searchToken: string
  @Input() airportsName: any
  @Input() params: any;

  isLoading = signal<Record<string, boolean>>({});

  overlay: Record<number, boolean> = {};

  visible: Record<string, boolean> = {};

  bookingVisible: boolean = false;
  bookingStep: 'details' | 'checkout' = 'details';

  selectedRateKey?: string;
  selectedCarrierCode?: string;
  selectedRateCategory?: string;
  selectedDetails?: any;

  showDialog(RateKey: number) {
    this.visible[RateKey] = true;
  }

  openBooking(carrierCode: string, RateKey: string) {
    this.selectedRateKey = RateKey;
    this.selectedCarrierCode = carrierCode;
    this.selectedRateCategory = undefined;
    this.bookingStep = 'details';
    this.bookingVisible = true;
  }

  onCheckoutSelected(pack: string) {
    this.selectedRateCategory = pack;
    this.bookingStep = 'checkout';
  }

  ngOnInit(): void {
    this.day = this.route.snapshot.paramMap.get('day');
    this.month = this.route.snapshot.paramMap.get('month');
    this.year = this.route.snapshot.paramMap.get('year');
  }

  getCheckRate(data: any, RateKey: string) {

    this.isLoading.update(prev => ({ ...prev, [RateKey]: true }));

    this.api.get(['flight', 'checkrate', this.searchToken, this.day, this.month, this.year, RateKey].join('/'), []).subscribe({
      next: (response: any) => {
        this.selectedDetails = response?.result;
        this.openBooking(data?.CarrierCode, RateKey);
        this.isLoading.update(prev => ({ ...prev, [RateKey]: false }));
      },
      error: () => {
        this.toast.show({ severity: 'error', summary: 'error', detail: 'error_request', life: 3000 });
        this.isLoading.update(prev => ({ ...prev, [RateKey]: false }));
      }
    })
  }
}
