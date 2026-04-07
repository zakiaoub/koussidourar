import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { IconComponent } from '@app/shared/components/widgets/icon/icon.component';
import { TranslationModule } from '@app/core/modules/translation.module';
import { parseDate } from '@app/core/utils/parseDate.util';

@Component({
  selector: 'app-booking-information',
  imports: [CommonModule, TranslationModule, IconComponent],
  templateUrl: './booking-information.component.html',
  styleUrl: './booking-information.component.css'
})
export class BookingInformationComponent {
  
  parseDate = parseDate;
  data = input<any>();

}
