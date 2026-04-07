import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { IconComponent } from '@app/shared/components/widgets/icon/icon.component';
import { ButtonComponent } from '@app/shared/components/widgets/button/button.component';
import { TranslationModule } from '@app/core/modules/translation.module';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { PrintService } from '@app/core/services/print.service';
import { VoucherAttractionComponent } from '@app/features/pages/voucher/views/voucher-attraction/voucher-attraction.component';
import { VoucherHotelComponent } from '@app/features/pages/voucher/views/voucher-hotel/voucher-hotel.component';
import { VoucherFlightComponent } from '@app/features/pages/voucher/views/voucher-flight/voucher-flight.component';
import { VoucherTransfertComponent } from '@app/features/pages/voucher/views/voucher-transfert/voucher-transfert.component';

@Component({
  selector: 'app-booking-status',
  imports: [CommonModule, TranslationModule, TagModule, IconComponent, ButtonComponent, DialogModule, VoucherAttractionComponent, VoucherHotelComponent, VoucherFlightComponent, VoucherTransfertComponent],
  templateUrl: './booking-status.component.html',
  styleUrl: './booking-status.component.css'
})
export class BookingStatusComponent {

  constructor(
    private print: PrintService) { }

  data = input<any>();

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  toPdf(id: string) {
    setTimeout(() => {
      this.print.toPdf(id);
    }, 100);
  }
}
