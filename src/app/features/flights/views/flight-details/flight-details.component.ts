import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslationModule } from '@app/core/modules/translation.module';
import { FlightSegmentComponent } from "./components/flight-segment/flight-segment.component";
import { FlightPackComponent } from "./components/flight-pack/flight-pack.component";
import { FlightDefaultComponent } from "./components/flight-default/flight-default.component";
import { SessionTimeComponent } from '@app/shared/components/settings/templates/session-time/session-time.component';
import { SessionExpiredComponent } from '@app/shared/components/settings/templates/session-expired/session-expired.component';
import { SkeletonDetailsComponent } from '@app/shared/components/loaders/skeleton-details/skeleton-details.component';
import { FormDataService } from '@app/core/services/form-data.service';
import { StepperComponent } from "@app/shared/components/widgets/stepper/stepper.component";
import { FormDisplayComponent } from '@app/shared/components/templates/form-display/form-display.component';
import { AdDiscountComponent } from "@app/shared/components/banner/ad-discount/ad-discount.component";
import { ButtonComponent } from '@app/shared/components/widgets/button/button.component';
import { ScrollToDirective } from '@app/shared/directives/scrollTo';
import { MapPipe } from '@app/shared/pipes/map.pipe';
import { ReqService } from '@app/core/services/req.service';
import { NoResultsFoundComponent } from '@app/shared/components/errors/no-results-found/no-results-found.component';
import { ErrorRequestComponent } from '@app/shared/components/errors/error-request/error-request.component';
import { AmountComponent } from '@app/shared/components/settings/components/amount/amount.component';

@Component({
  selector: 'app-flight-details',
  imports: [CommonModule, TranslationModule, FlightSegmentComponent, FlightPackComponent, FlightDefaultComponent, SessionTimeComponent, SessionExpiredComponent, SkeletonDetailsComponent, StepperComponent, FormDisplayComponent, AdDiscountComponent, AmountComponent, ButtonComponent, ScrollToDirective, MapPipe, NoResultsFoundComponent, ErrorRequestComponent],
  templateUrl: './flight-details.component.html',
  styleUrl: './flight-details.component.css'
})
export class FlightDetailsComponent implements OnInit, OnChanges {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private FormDataService: FormDataService,
    private api: ReqService
  ) { }

  @Input() popupMode: boolean = false;
  @Input() inputSearchToken?: string;
  @Input() inputRateKey?: string;
  @Input() inputDay?: string;
  @Input() inputMonth?: string;
  @Input() inputYear?: string;
  @Input() inputCarrierCode?: string;
  @Input() inputDetails?: any;

  @Output() checkout = new EventEmitter<string>();
  @Output() closePopup = new EventEmitter<void>();

  params: any
  searchToken: any
  rateKey: any
  day: any
  month: any
  year: any
  carrierCode: string
  airportsName: any = {}

  data = signal<any>(null)
  isLoading = signal<boolean>(false)
  error = signal<boolean>(false)
  selectedPopupPack = signal<string>('default')

  ngOnInit(): void {
    this.params = this.FormDataService.getData('flightParams')

    this.searchToken = this.popupMode ? this.inputSearchToken : this.route.snapshot.paramMap.get('searchToken');
    this.carrierCode = this.popupMode ? this.inputCarrierCode : this.route.snapshot.paramMap.get('carrierCode');
    this.day = this.popupMode ? this.inputDay : this.route.snapshot.paramMap.get('day');
    this.month = this.popupMode ? this.inputMonth : this.route.snapshot.paramMap.get('month');
    this.year = this.popupMode ? this.inputYear : this.route.snapshot.paramMap.get('year');
    this.rateKey = this.popupMode ? this.inputRateKey : this.route.snapshot.paramMap.get('rateKey');

    if (this.popupMode && this.inputDetails) {
      this.data.set(this.inputDetails);
      this.airportsName = this.inputDetails?.airportsName || {};
      this.error.set(false);
      this.isLoading.set(false);
      this.initPopupPack();
      return;
    }

    if (!this.searchToken || !this.day || !this.month || !this.year || !this.rateKey) {
      this.error.set(true)
      return;
    }

    this.getdetails();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.popupMode) return;

    if (changes['inputDetails'] && this.inputDetails) {
      this.data.set(this.inputDetails);
      this.airportsName = this.inputDetails?.airportsName || {};
      this.error.set(false);
      this.isLoading.set(false);
      this.initPopupPack();
    }
  }

  getdetails() {
    this.isLoading.set(true)

    this.api.get(['flight', 'checkrate', this.searchToken, this.day, this.month, this.year, this.rateKey].join('/')).subscribe({
      next: (response: any) => {
        this.data.set(response?.result);
        this.airportsName = response?.result?.airportsName || {};
        if (response.result?.rateCategory && response.result?.rateCategory.length > 0) {
          this.data.set(response?.result);
        }
        this.initPopupPack();
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set(true)
        this.isLoading.set(false);
      }
    })
  }

  onSelectFare(pack: string) {
    if (this.popupMode) {
      this.checkout.emit(pack);
      return;
    }

    this.router.navigate([
      'flights',
      this.carrierCode,
      'checkout',
      this.searchToken,
      this.carrierCode,
      this.day,
      this.month,
      this.year,
      this.rateKey,
      pack
    ]);
  }

  initPopupPack() {
    const rateCategory = this.data()?.rateCategory || [];
    if (!rateCategory.length) {
      this.selectedPopupPack.set('default');
      return;
    }

    const preferredPack = rateCategory.find((item: string) => item === 'default') || rateCategory[0];
    this.selectedPopupPack.set(preferredPack);
  }

  getPopupRouteTitle(itinerary: any) {
    if (!itinerary) return '';
    if (itinerary.Ref === 1) return 'outbound';
    if (itinerary.Ref === 2) return 'return';
    return 'flight';
  }

  getPopupDuration(itinerary: any) {
    const segment = itinerary?.Segments?.[0];
    return segment?.Duration || '';
  }

  getPopupAirline(segment: any) {
    return segment?.MarketingCarrier || segment?.Operator || '';
  }

  getPopupFlightNumber(segment: any) {
    const carrier = this.getPopupAirline(segment);
    const number = segment?.FlightNumber || '';
    return `${carrier}${number}`.trim();
  }

  getPopupBaggageItems() {
    const details = this.data();
    const selectedPack = this.selectedPopupPack();
    const itinerary = details?.itineraries?.[0];
    const segment = itinerary?.Segments?.[0];
    const flightNumber = segment?.FlightNumber;
    const baggageNode = details?.baggages?.[selectedPack]?.[flightNumber]?.Pax?.[0];
    const quantity = baggageNode?.Quantity;

    if (!quantity) {
      return [
        { icon: 'fa-solid fa-briefcase', title: 'Baggage details', desc: 'According to airline fare rules', status: 'Included' }
      ];
    }

    return [
      { icon: 'fa-solid fa-briefcase', title: 'Cabin baggage', desc: `${quantity} piece(s) included`, status: 'Included' }
    ];
  }

  getPopupRateComments() {
    const details = this.data();
    const selectedPack = this.selectedPopupPack();
    const comments = details?.rateComment?.[selectedPack] || details?.rateComment?.default || details?.rateComment || [];
    return Array.isArray(comments) ? comments.slice(0, 4) : [];
  }

  getPopupExtras() {
    const details = this.data();
    const selectedPack = this.selectedPopupPack();
    const fareDescription = details?.fareFamilyDescription || {};

    return Object.entries(fareDescription)
      .map(([key, value]: [string, any]) => ({ key, rates: value?.rates || {} }))
      .filter((item: any) => item?.rates?.[selectedPack] === 'at Charge')
      .slice(0, 4);
  }
}
