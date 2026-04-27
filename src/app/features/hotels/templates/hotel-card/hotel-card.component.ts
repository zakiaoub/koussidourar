import { Component, input, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { RatingComponent } from '@app/shared/components/widgets/rating/rating.component';
import { TranslationModule } from '@app/core/modules/translation.module';
import { GalleriaModule } from 'primeng/galleria';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import defaultImages from "@assets/json/defaultImages.json"
import { DefaultImagesService } from '@app/core/services/default-images.service';
import { ButtonComponent } from '@app/shared/components/widgets/button/button.component';
import { SpinnerComponent } from '@app/shared/components/loaders/spinner/spinner.component';
import { AmountComponent } from '@app/shared/components/settings/components/amount/amount.component';
import { HotelsRoomsComponent } from '@app/features/hotels/components/hotels-rooms/hotels-rooms.component';

@Component({
  selector: 'app-hotel-card',
  standalone: true,
  imports: [CommonModule, RatingModule, FormsModule, RatingComponent, TranslationModule, GalleriaModule, DialogModule, ToastModule, IconComponent, ButtonComponent, SpinnerComponent, AmountComponent, HotelsRoomsComponent],
  templateUrl: './hotel-card.component.html',
  styleUrl: './hotel-card.component.css'
})

export class HotelCardComponent {

  constructor(public dis: DefaultImagesService) { }

  @Input() items!: any;
  @Input() searchToken!: any;
  isTruePriceLoad = input<boolean>(false)

  isLoading = signal<Record<string, boolean>>({});
  overlay: Record<number, boolean> = {};
  detailsVisible: boolean = false;
  selectedHotel: any = null;

  defaultImages: string[] = defaultImages.hotels

  getRooms(hotel: any) {
    this.selectedHotel = hotel;
    this.detailsVisible = true;
  }
}
