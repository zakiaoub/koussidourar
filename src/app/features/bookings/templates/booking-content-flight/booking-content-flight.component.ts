import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { IconComponent } from '@app/shared/components/widgets/icon/icon.component';
import { Airline } from '@app/core/models/airline.interface';
import { TranslationModule } from '@app/core/modules/translation.module';
import { FilterPipe } from '@app/shared/pipes/filter.pipe';
import airlines from '@assets/json/airlines.json'

@Component({
  selector: 'app-booking-content-flight',
  imports: [CommonModule, TranslationModule, IconComponent, FilterPipe],
  templateUrl: './booking-content-flight.component.html',
  styleUrl: './booking-content-flight.component.css'
})
export class BookingContentFlightComponent {

  data = input<any>();
  airlines: Airline[] = airlines

}
