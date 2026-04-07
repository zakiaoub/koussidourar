import { CommonModule } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { IconComponent } from '@app/shared/components/widgets/icon/icon.component';
import { TranslationModule } from '@app/core/modules/translation.module';

interface Passenger {
  title: string;
  type: string;
  gender: string;
  lastName: string;
  birth_date: string | Date | null;
  passport_number: string;
  nationality: string;
}

@Component({
  selector: 'app-booking-passengers',
  imports: [CommonModule, TranslationModule, IconComponent],
  templateUrl: './booking-passengers.component.html',
  styleUrl: './booking-passengers.component.css'
})
export class BookingPassengersComponent {

  passengers = input<Passenger[]>([]);

}
