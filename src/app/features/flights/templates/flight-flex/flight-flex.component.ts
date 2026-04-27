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
import { AmountComponent } from '@app/shared/components/settings/components/amount/amount.component';
import { FilterPipe } from '@app/shared/pipes/filter.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-flex',
  imports: [CommonModule, TranslationModule, TimelineModule, FlightsItineraryComponent, FlightCardComponent, ButtonComponent, DialogModule, FlightCompanyComponent, TooltipModule, FlightDetailsComponent, FlightsBookingFormComponent, AmountComponent, FilterPipe],
  templateUrl: './flight-flex.component.html',
  styleUrl: './flight-flex.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DialogService]
})

export class FlightFlexComponent {

  constructor(private route: ActivatedRoute, private api: ReqService, private toast: ToastService, private router: Router) { }

  airlines: Airline[] = airlines

  @Input() items!: any;
  @Input() day: any
  @Input() month: any
  @Input() year: any
  @Input() searchToken: string
  @Input() airportsName: any
  @Input() params: any;

  isLoading = signal<Record<string, boolean>>({});

  sortMode = signal<'cheap' | 'fast' | 'best'>('cheap');

  overlay: Record<number, boolean> = {};

  visible: Record<number, boolean> = {};

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
    this.bookingVisible = true;
  }

  backToDetails() {
    this.bookingStep = 'details';
  }

  ngOnInit(): void {
    this.day = this.route.snapshot.paramMap.get('day');
    this.month = this.route.snapshot.paramMap.get('month');
    this.year = this.route.snapshot.paramMap.get('year');
  }

  setSortMode(mode: 'cheap' | 'fast' | 'best') {
    this.sortMode.set(mode);
  }

  getDisplayItems(): any[] {
    const list = Array.isArray(this.items) ? [...this.items] : [];

    const mode = this.sortMode();
    const sorted = list.sort((a, b) => {
      if (mode === 'cheap') {
        return this.getTotalPrice(a) - this.getTotalPrice(b);
      }

      if (mode === 'fast') {
        return this.getTotalDurationMinutes(a) - this.getTotalDurationMinutes(b);
      }

      const priceDiff = this.getTotalPrice(a) - this.getTotalPrice(b);
      if (priceDiff !== 0) return priceDiff;
      return this.getTotalDurationMinutes(a) - this.getTotalDurationMinutes(b);
    });

    const seen = new Set<string>();
    const unique: any[] = [];
    for (const item of sorted) {
      const carrier = (item?.CarrierCode || '').toString();
      if (!carrier) continue;
      if (seen.has(carrier)) continue;
      seen.add(carrier);
      unique.push(item);
    }

    return unique;
  }

  private getTotalPrice(item: any): number {
    const value = item?.TotalAmount;
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const normalized = value.replace(/\s/g, '').replace(',', '.').replace(/[^0-9.]/g, '');
      const parsed = parseFloat(normalized);
      return Number.isFinite(parsed) ? parsed : Number.POSITIVE_INFINITY;
    }
    return Number.POSITIVE_INFINITY;
  }

  private getTotalDurationMinutes(item: any): number {
    const itineraries = item?.Itinerary;
    if (!Array.isArray(itineraries) || itineraries.length === 0) return Number.POSITIVE_INFINITY;

    return itineraries.reduce((sum: number, it: any) => sum + this.parseDurationToMinutes(it?.Duration), 0);
  }

  private parseDurationToMinutes(raw: any): number {
    if (!raw) return 0;
    if (typeof raw === 'number') return raw;

    const str = String(raw).trim().toLowerCase();

    const hm = str.match(/^(\d{1,2}):(\d{2})$/);
    if (hm) {
      return (parseInt(hm[1], 10) * 60) + parseInt(hm[2], 10);
    }

    let minutes = 0;
    const h = str.match(/(\d+)\s*h/);
    const m = str.match(/(\d+)\s*m/);
    if (h) minutes += parseInt(h[1], 10) * 60;
    if (m) minutes += parseInt(m[1], 10);
    return minutes;
  }

  getStopoverTooltip(itinerary: any): string {
    const segments = itinerary?.Segments;
    if (!Array.isArray(segments) || segments.length <= 1) return '';

    const parts: string[] = [];

    for (let i = 0; i < segments.length - 1; i++) {
      const current = segments[i];
      const next = segments[i + 1];

      const arrCode = current?.ArrivalAirportCode || current?.ArrivalAirport || current?.Arrival || '';
      const depCode = next?.DepartureAirportCode || next?.DepartureAirport || next?.Departure || '';

      const stopCode = arrCode || depCode;
      if (!stopCode) continue;

      let layover = '';
      const arrTimeRaw = current?.ArrivalDateTime;
      const depTimeRaw = next?.DepartureDateTime;

      const arrTime = arrTimeRaw ? new Date(String(arrTimeRaw).replace(' ', 'T')) : null;
      const depTime = depTimeRaw ? new Date(String(depTimeRaw).replace(' ', 'T')) : null;
      if (arrTime && depTime && !isNaN(arrTime.getTime()) && !isNaN(depTime.getTime())) {
        const diffMin = Math.max(0, Math.round((depTime.getTime() - arrTime.getTime()) / 60000));
        const h = Math.floor(diffMin / 60);
        const m = diffMin % 60;
        layover = h > 0 ? `${h}h ${m}m` : `${m}m`;
      }

      parts.push(layover ? `Escale: ${stopCode} (${layover})` : `Escale: ${stopCode}`);
    }

    return parts.join('\n');
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
