import { CommonModule } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { IconComponent } from '@app/shared/components/widgets/icon/icon.component';
import { TranslationModule } from '@app/core/modules/translation.module';
import { RatingComponent } from "@app/shared/components/widgets/rating/rating.component";

@Component({
  selector: 'app-booking-content-hotel',
  imports: [CommonModule, TranslationModule, IconComponent, RatingComponent],
  templateUrl: './booking-content-hotel.component.html',
  styleUrl: './booking-content-hotel.component.css'
})

export class BookingContentHotelComponent {

  data = input<any>();
  rooms = input<number>(0);

}
