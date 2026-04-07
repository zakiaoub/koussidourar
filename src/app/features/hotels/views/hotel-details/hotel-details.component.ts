import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagesCarouselComponent } from '@app/shared/components/templates/images-carousel/images-carousel.component';
import { ProductDescriptionComponent } from '@app/shared/components/templates/product-description/product-description.component';
import { CommonModule } from '@angular/common';
import { HotelsRoomsComponent } from "@features/hotels/components/hotels-rooms/hotels-rooms.component";
import { ProductAmentiesComponent } from '@app/shared/components/templates/product-amenties/product-amenties.component';
import { HotelInfosComponent } from "@features/hotels/components/hotel-infos/hotel-infos.component";
import { HotelRecapComponent } from "@features/hotels/components/hotel-recap/hotel-recap.component";
import { FaqDisplayComponent } from '@app/shared/components/templates/faq-display/faq-display.component';
import { SessionTimeComponent } from '@app/shared/components/settings/templates/session-time/session-time.component';
import { SkeletonDetailsComponent } from '@app/shared/components/loaders/skeleton-details/skeleton-details.component';
import { SessionExpiredComponent } from '@app/shared/components/settings/templates/session-expired/session-expired.component';
import { StepperComponent } from "@app/shared/components/widgets/stepper/stepper.component";
import { RatingComponent } from "@app/shared/components/widgets/rating/rating.component";
import { WeatherComponent } from '@app/shared/components/templates/app-weather/app-weather.component';
import { HotelNearbyComponent } from "../../components/hotel-nearby/hotel-nearby.component";
import { ReqService } from '@app/core/services/req.service';
import { ErrorRequestComponent } from '@app/shared/components/errors/error-request/error-request.component';

@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [
    ImagesCarouselComponent,
    ProductDescriptionComponent,
    CommonModule,
    HotelsRoomsComponent,
    ProductAmentiesComponent,
    HotelInfosComponent,
    HotelRecapComponent,
    SessionTimeComponent,
    SkeletonDetailsComponent,
    SessionExpiredComponent,
    StepperComponent,
    RatingComponent,
    WeatherComponent,
    HotelNearbyComponent,
    ErrorRequestComponent
  ],
  templateUrl: './hotel-details.component.html',
  styleUrl: './hotel-details.component.css'
})

export class HotelDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private api: ReqService) { }

  data = signal<any>(null)
  isLoading = signal<boolean>(false)
  error = signal<boolean>(false)
  id: string
  searchToken: string

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('hotelId');
    this.searchToken = this.route.snapshot.paramMap.get('searchToken');
    this.getDetails();
  }

  getDetails() {
    this.isLoading.set(true)

    this.api.get(['hotel', this.id, 'detail', this.searchToken].join('/')).subscribe({
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
