import { CommonModule } from '@angular/common';
import { Component, input, Input } from '@angular/core';
import { IconComponent } from '@app/shared/components/widgets/icon/icon.component';
import { TranslationModule } from '@app/core/modules/translation.module';

@Component({
  selector: 'app-booking-content-transfer',
  imports: [CommonModule, TranslationModule, IconComponent],
  templateUrl: './booking-content-transfer.component.html',
  styleUrl: './booking-content-transfer.component.css'
})

export class BookingContentTransferComponent {

  data = input<any>();

}
