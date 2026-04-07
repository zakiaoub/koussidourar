import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslationModule } from '@app/core/modules/translation.module';
import { TopBannerComponent } from '@app/shared/components/banner/top-banner/top-banner.component';
import { BookingStatusComponent } from '../../components/booking-status/booking-status.component';
import { ProductCancellationPolicyComponent } from "@app/shared/components/templates/product-cancellation-policy/product-cancellation-policy.component";
import { BookingInformationComponent } from '../../components/booking-information/booking-information.component';
import { BookingPaymentComponent } from '../../components/booking-payment/booking-payment.component';
import { BookingPassengersComponent } from '../../components/booking-passengers/booking-passengers.component';
import { BookingContentAttractionComponent } from "../../templates/booking-content-attraction/booking-content-attraction.component";
import { BookingContentHotelComponent } from '../../templates/booking-content-hotel/booking-content-hotel.component';
import { BookingContentFlightComponent } from '../../templates/booking-content-flight/booking-content-flight.component';
import { BookingContentTransferComponent } from "../../templates/booking-content-transfer/booking-content-transfer.component";
import { SkeletonBookingDetailsComponent } from '@app/shared/components/loaders/skeleton-booking-details/skeleton-booking-details.component';
import { ReqService } from '@app/core/services/req.service';
import { ErrorRequestComponent } from "@app/shared/components/errors/error-request/error-request.component";

@Component({
  selector: 'app-bookings-details',
  imports: [CommonModule, TranslationModule, TopBannerComponent, BookingStatusComponent, ProductCancellationPolicyComponent, BookingInformationComponent, BookingPaymentComponent, BookingPassengersComponent, BookingContentAttractionComponent, BookingContentHotelComponent, BookingContentFlightComponent, BookingContentTransferComponent, SkeletonBookingDetailsComponent, ErrorRequestComponent],
  templateUrl: './bookings-details.component.html',
  styleUrl: './bookings-details.component.css'
})

export class BookingsDetailsComponent {

  constructor(private route: ActivatedRoute, private api: ReqService) { }

  bookingNumber: string;
  isLoading = signal<boolean>(false);
  error = signal<boolean>(false);
  data = signal<any>(null);


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.bookingNumber = params.get('number')!;
    });

    this.getDetails()
  }

  getDetails() {
    this.isLoading.set(true)

    this.api.get(['account', 'booking', 'retrieve', this.bookingNumber].join('/')).subscribe({
      next: (response: any) => {
        this.data.set(response?.result);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set(true)
        this.isLoading.set(false);
      }
    })
  }
}
