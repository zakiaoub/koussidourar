import { Component, Input } from '@angular/core';
import { RatingComponent } from "@app/shared/components/widgets/rating/rating.component";
import { CommonModule } from '@angular/common';
import { TranslationModule } from '@app/core/modules/translation.module';
import { FixedPipe } from '@app/shared/pipes/fixed.pipe';
import defaultImages from "@assets/json/defaultImages.json"
import { DefaultImagesService } from '@app/core/services/default-images.service';
import { NotationPipe } from '@app/shared/pipes/notation.pipe';
import { AmountComponent } from '@app/shared/components/settings/components/amount/amount.component';

@Component({
  selector: 'app-map-card-hotel',
  imports: [RatingComponent, CommonModule, TranslationModule, FixedPipe, NotationPipe, AmountComponent],
  templateUrl: './map-card-hotel.component.html',
  styleUrl: './map-card-hotel.component.css'
})
export class MapCardHotelComponent {

  constructor(public dis: DefaultImagesService) { }

  @Input() data: any

  defaultImages: string[] = defaultImages.hotels

  getPricePerNight(amount: number, nights: number): number {
    return nights > 0 ? amount / nights : amount;
  }

}
