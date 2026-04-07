import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { TopBannerComponent } from '@app/shared/components/banner/top-banner/top-banner.component';
import { TranslationModule } from '@app/core/modules/translation.module';
import { PaginatorModule } from 'primeng/paginator';
import { BookingsNumbersComponent } from '../../components/bookings-numbers/bookings-numbers.component';
import { BookingsListComponent } from '../../components/bookings-list/bookings-list.component';
import { SkeletonBookingsComponent } from '@app/shared/components/loaders/skeleton-bookings/skeleton-bookings.component';
import { ReqService } from '@app/core/services/req.service';
import { ScrollService } from '@app/core/services/scroll.service';
import { ErrorRequestComponent } from '@app/shared/components/errors/error-request/error-request.component';
import { BookingsSearchFormComponent } from '@app/shared/components/forms/bookings-search-form/bookings-search-form.component';
import { SessionService } from '@app/core/services/session.service';

export interface ApiResponse<T> {
  status: boolean;
  code: number;
  message: string;
  result: T;
}

@Component({
  selector: 'app-bookings-overview',
  imports: [CommonModule, TranslationModule, TopBannerComponent, BookingsNumbersComponent, BookingsListComponent, PaginatorModule, SkeletonBookingsComponent, ErrorRequestComponent, BookingsSearchFormComponent],
  templateUrl: './bookings-overview.component.html',
  styleUrl: './bookings-overview.component.css'
})

export class BookingsOverviewComponent {

  constructor(
    private api: ReqService,
    private scroll: ScrollService
  ) { }

  data = signal<any>(null)
  isLoading = signal<boolean>(false)
  error = signal<boolean>(false)
  currentPage = signal<number>(1)
  totalCount = signal<number>(0)
  perPage = signal<number>(20)

  filters: any = {};

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  }

  onPageChange(event: any) {
    this.isLoading.set(true)
    this.currentPage.set(event.page + 1)
    this.getBookings();
    this.scroll.scrollTo('bookings-list');
    setTimeout(() => {
      this.isLoading.set(false)
    }, 2000);
  }

  onSubmit(filters: any) {
    this.filters = filters;
    this.currentPage.set(1);
    this.getBookings();
  }

  getBookings() {

    this.isLoading.set(true)

    const formValue = this.filters || {};

    const [dateFrom, dateTo] = formValue.dates || [];

    const payload = {
      BookingNumber: formValue.bookingNumber,
      BookingType: "",
      BookingStatus: formValue.bookingStatus,
      PaymentStatus: "",
      CountryCode: "",
      DateFrom: this.formatDate(dateFrom),
      DateTo: this.formatDate(dateTo),
      DateType: "DEPARTURE"
    };

    this.api.post(['account', 'booking', 'list?page='].join('/') + this.currentPage(), payload).subscribe({
      next: (response: any) => {
        this.data.set(response?.result);
        this.totalCount.set(response?.result?.total);
        this.currentPage.set(response?.result?.current_page);
        this.perPage.set(response?.result?.per_page);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set(true)
        this.isLoading.set(false);
      }
    })
  }
}
