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
import { ReqService } from '@app/core/services/req.service';
import { ButtonComponent } from '@app/shared/components/widgets/button/button.component';
import { ToastService } from '@app/core/services/toast.service';
import { SpinnerComponent } from '@app/shared/components/loaders/spinner/spinner.component';
import { AmountComponent } from '@app/shared/components/settings/components/amount/amount.component';

@Component({
  selector: 'app-hotel-card',
  standalone: true,
  imports: [CommonModule, RatingModule, FormsModule, RatingComponent, TranslationModule, GalleriaModule, DialogModule, ToastModule, IconComponent, ButtonComponent, SpinnerComponent, AmountComponent],
  templateUrl: './hotel-card.component.html',
  styleUrl: './hotel-card.component.css'
})

export class HotelCardComponent {

  constructor(public dis: DefaultImagesService, private api: ReqService, private toast: ToastService) { }

  @Input() items!: any;
  @Input() searchToken!: any;
  isTruePriceLoad = input<boolean>(false)

  isLoading = signal<Record<string, boolean>>({});
  overlay: Record<number, boolean> = {};

  defaultImages: string[] = defaultImages.hotels

  getRooms(hotel: any) {
    this.isLoading.update(prev => ({ ...prev, [hotel.id]: true }));

    this.api.get(['hotel', 'rooms', hotel.id, this.searchToken].join('/')).subscribe({
      next: () => {
        window.open(['hotels', hotel.country_code, hotel.roomsCount, hotel.adultCount, hotel.childCount, hotel.nights, hotel.id, this.searchToken].join('/'))
        this.isLoading.update(prev => ({ ...prev, [hotel.id]: false }));
      },
      error: () => {
        this.toast.show({ severity: 'error', summary: 'error', detail: 'error_request', life: 3000 });
        this.isLoading.update(prev => ({ ...prev, [hotel.id]: false }));
      }
    })
  }
}
