import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { IconComponent } from '@app/shared/components/widgets/icon/icon.component';
import { ProductDescriptionComponent } from '@app/shared/components/templates/product-description/product-description.component';
import { TranslationModule } from '@app/core/modules/translation.module';

@Component({
  selector: 'app-booking-content-attraction',
  imports: [CommonModule, TranslationModule, IconComponent, ProductDescriptionComponent],
  templateUrl: './booking-content-attraction.component.html',
  styleUrl: './booking-content-attraction.component.css'
})
export class BookingContentAttractionComponent {

  data = input<any>();

}
