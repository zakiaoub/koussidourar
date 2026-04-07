import { CommonModule } from '@angular/common';
import { Component, input, Input, signal } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { AttractionFlexComponent } from '@app/features/attractions/templates/attraction-flex/attraction-flex.component';
import { SessionTimeComponent } from '../../settings/templates/session-time/session-time.component';
import { StepperComponent } from '../../widgets/stepper/stepper.component';
import { AttractionCardComponent } from '@app/features/attractions/templates/attraction-card/attraction-card.component';
import { IconComponent } from '../../widgets/icon/icon.component';
import { Paginator } from 'primeng/paginator';
import { ReqService } from '@app/core/services/req.service';
import { SkeletonAvailabilityComponent } from '../../loaders/skeleton-availability/skeleton-availability.component';
import { FormDisplayComponent } from '../form-display/form-display.component';
import { FormDisplaySmallComponent } from '../form-display-small/form-display-small.component';
import { FiltersComponent } from '../../filters/filters.component';
import { AdReferralProgramComponent } from '../../banner/ad-referral-program/ad-referral-program.component';
import { Dialog } from 'primeng/dialog';
import { SessionExpiredComponent } from '../../settings/templates/session-expired/session-expired.component';
import { AttractionsSearchFormComponent } from "../../forms/attractions-search-form/attractions-search-form.component";
import { HotelCardComponent } from '@app/features/hotels/templates/hotel-card/hotel-card.component';
import { HotelFlexComponent } from '@app/features/hotels/templates/hotel-flex/flex-hotel.component';
import { HotelsSearchFormComponent } from '../../forms/hotels-search-form/hotels-search-form.component';
import { FlightsFormFieldsComponent } from '@app/features/flights/templates/flights-form-fields/flights-form-fields.component';
import { TransfersFormFieldsComponent } from '@app/features/transfers/templates/transfers-form-fields/transfers-form-fields.component';
import { TransferFlexComponent } from '@app/features/transfers/templates/transfer-flex/transfer-flex.component';
import { FlightFlexComponent } from '@app/features/flights/templates/flight-flex/flight-flex.component';
import { FlightsCalendarComponent } from '@app/features/flights/components/flights-calendar/flights-calendar.component';
import { ScrollService } from '@app/core/services/scroll.service';
import { NoResultsFoundComponent } from '../../errors/no-results-found/no-results-found.component';
import { SidebarModule } from 'primeng/sidebar';
import { ToastService } from '@app/core/services/toast.service';

@Component({
  selector: 'app-app-product-avails',
  imports: [CommonModule, TranslationModule, AttractionFlexComponent, AttractionCardComponent, HotelCardComponent, HotelFlexComponent, TransferFlexComponent, FlightFlexComponent, SessionTimeComponent, StepperComponent, IconComponent, Paginator, SkeletonAvailabilityComponent, FormDisplayComponent, FormDisplaySmallComponent, FiltersComponent, AdReferralProgramComponent, Dialog, SessionExpiredComponent, AttractionsSearchFormComponent, HotelsSearchFormComponent, TransfersFormFieldsComponent, FlightsFormFieldsComponent, FlightsCalendarComponent, NoResultsFoundComponent, SidebarModule],
  templateUrl: './app-product-avails.component.html',
  styleUrl: './app-product-avails.component.css'
})

export class AppProductAvailsComponent {

  constructor(
    private api: ReqService,
    private scroll: ScrollService,
    private toast: ToastService) { }

  loadedData = input<any>(null)

  @Input() service: string
  @Input() serviceApi: string
  @Input() searchToken: string
  @Input() day: string
  @Input() month: string
  @Input() year: string

  selectedItems: string[] = [];

  data = signal<any>(null);
  count = signal<number>(null);
  params = signal<any>(null);
  airportsName = signal<any>(null);
  calendar = signal<any>(null);
  min = signal<number>(null);
  max = signal<number>(null);

  layout = signal<string>('flex')
  isLoading = signal<boolean>(false)
  isTruePriceLoad = signal<boolean>(false)

  currentPage: number = 1;
  itemsPerPage: number = 20

  searchModal: boolean = false;
  filtersModal: boolean = false;

  ngOnInit() {
    this.data.set(this.loadedData()?.avails);
    this.count.set(this.loadedData()?.count)
    this.params.set(this.loadedData()?.dataPost)
    this.airportsName.set(this.loadedData()?.airportsName)
    this.calendar.set(this.loadedData()?.calendar)

    const exchangeRate = parseFloat(localStorage.getItem("exchangeRate"));
    this.min.set(Math.ceil(parseFloat(this.loadedData()?.filter?.prices?.min) * exchangeRate))
    this.max.set(Math.ceil(parseFloat(this.loadedData()?.filter?.prices?.max) * exchangeRate))
  }

  ngAfterViewInit() {
    if (this.service === 'hotel') {
      setTimeout(() => {
        this.getRealPrices();
      }, 500);
    }
  }

  setLayout(event: string) {
    this.isLoading.set(true)
    this.layout.set(event)
    setTimeout(() => {
      this.isLoading.set(false)
    }, 500);
  }

  onPageChange(event: any): void {
    this.scroll.scrollTo(0)
    this.currentPage = event.page + 1;
    this._load(true);
  }

  _load(isLOadingTrigger: boolean) {
    if (isLOadingTrigger) {
      this.isLoading.set(true);
    }

    let url: any[] = [this.serviceApi, "paginate", this.searchToken]

    if (this.service == "flight") {
      url.push(this.day);
      url.push(this.month);
      url.push(this.year);
    }
    url.push(this.currentPage);

    this.api.get(url.join("/"), []).subscribe({
      next: (response: any) => {
        this.data.set(response?.result);
        this.isLoading.set(false);
      },
      error: () => {
        this.toast.show({ severity: 'error', summary: 'error', detail: 'error_load_results', life: 3000 });
        this.isLoading.set(false);
      }
    });
  }

  getRealPrices() {
    let url: any[] = [this.serviceApi, "availability", this.searchToken]

    this.api.get(url.join("/"), []).subscribe({
      next: (response: any) => {
        if (response?.result.count > 0) {
          this.count.set(response?.result?.count)
        }

        if (response?.result?.min > 0) {
          this.min.set(response?.result?.min)
        }

        if (response?.result?.max > 0) {
          this.max.set(response?.result?.max)
        }

        if (response?.result?.countRequest > 0) {
          setTimeout(() => {
            this.getRealPrices();
          }, 500);
        } else {
          this.isTruePriceLoad.set(true)
        }

        this.currentPage = 1;
        this._load(false);
      },
      error: () => {
        this.toast.show({ severity: 'error', summary: 'error', detail: 'error_load_results', life: 3000 });
      }
    });
  }

  onFilterChange(filters: string[]): void {
    this.selectedItems = filters;

    this.getFilters({ form: this.selectedItems });
  }

  onPriceRangeChange(newRange: number[]) {
    this.getFilters({ PRICES_SLIDERS: newRange });
  }

  onResetFilters(value: string): void {
    this.getFilters({ RESET: value });
  }

  getFilters(filter: any) {
    this.currentPage = 1;

    const payload = {
      filter,
      searchToken: this.searchToken,
    };

    let url: any[] = [this.serviceApi, "filter", this.searchToken]

    if (this.service == "flight") {
      url.push(this.day);
      url.push(this.month);
      url.push(this.year);
    }

    this.scroll.scrollTo(0)

    this.api.post(url.join("/"), payload).subscribe({
      next: (response: any) => {
        this.count.set(response?.result?.count);
        this._load(true);
      },
      error: () => {
        this.toast.show({ severity: 'warn', summary: 'error', detail: 'error_filters', life: 3000 });
      }
    });
  }

  flightChangeDate(event: { day: any; month: any; year: any }) {
    this.isLoading.set(true);

    this.api.get([this.serviceApi, 'list', this.searchToken, event.day, event.month, event.year, this.currentPage].join("/"), []).subscribe({
      next: (response: any) => {
        console.log('res :', response)
        this.data.set(response?.result?.avails)
        this.count.set(response?.result?.count)
        this.params.set(response?.result?.dataPost)
        this.airportsName.set(response?.result?.airportsName)
        this.calendar.set(response?.result?.calendar);
        localStorage.setItem("exchangeRate", response.result.exchangeRate);
        this.isLoading.set(false);
      },
      error: () => {
        this.toast.show({ severity: 'warn', summary: 'error', detail: 'error_filters', life: 3000 });
        this.isLoading.set(false);
      }
    });
  }
}
