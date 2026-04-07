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

  params: any
  searchToken: any
  rateKey: any
  day: any
  month: any
  year: any
  carrierCode: string

  data = signal<any>(null)
  isLoading = signal<boolean>(false)
  error = signal<boolean>(false)

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
      this.error.set(false);
      this.isLoading.set(false);
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
      this.error.set(false);
      this.isLoading.set(false);
    }
  }

  getdetails() {
    this.isLoading.set(true)

    this.api.get(['flight', 'checkrate', this.searchToken, this.day, this.month, this.year, this.rateKey].join('/')).subscribe({
      next: (response: any) => {
        this.data.set(response?.result);
        if (response.result?.rateCategory && response.result?.rateCategory.length > 0) {
          this.data.set(response?.result);
        }
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
}
