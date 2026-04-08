import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslationModule } from '@modules/translation.module';
import { CityImageComponent } from '@app/shared/components/widgets/city-image/city-image.component';
import { RatingComponent } from "@app/shared/components/widgets/rating/rating.component";
import { CheckoutSummaryComponent } from '@app/shared/components/templates/checkout-summary/checkout-summary.component';

@Component({
  selector: 'app-checkout-hotel-recap',
  standalone: true,
  imports: [CommonModule, TranslationModule, CheckoutSummaryComponent, CityImageComponent, RatingComponent],
  templateUrl: './checkout-hotel-recap.component.html',
  styleUrl: './checkout-hotel-recap.component.css'
})
export class CheckoutHotelRecapComponent {
  @Input() data: any


  defaultImages: string[] = [
    'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2598638/pexels-photo-2598638.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2134224/pexels-photo-2134224.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/2255424/pexels-photo-2255424.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3688261/pexels-photo-3688261.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/3659681/pexels-photo-3659681.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/6890413/pexels-photo-6890413.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1457845/pexels-photo-1457845.jpeg?auto=compress&cs=tinysrgb&w=600'
  ];

  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    const randomIndex = Math.floor(Math.random() * this.defaultImages.length);
    img.src = this.defaultImages[randomIndex];
  }

}
