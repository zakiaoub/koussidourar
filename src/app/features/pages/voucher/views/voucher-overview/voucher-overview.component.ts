import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { PrintService } from '@app/core/services/print.service';
import { VoucherFlightComponent } from '../voucher-flight/voucher-flight.component';
import { VoucherAttractionComponent } from '../voucher-attraction/voucher-attraction.component';
import { VoucherHotelComponent } from '../voucher-hotel/voucher-hotel.component';
import { VoucherTransfertComponent } from '../voucher-transfert/voucher-transfert.component';
import { Dialog } from 'primeng/dialog';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { ReqService } from '@app/core/services/req.service';
import { ToastService } from '@app/core/services/toast.service';
import { ButtonComponent } from '@app/shared/components/widgets/button/button.component';

@Component({
  selector: 'app-voucher-overview',
  imports: [CommonModule, TranslationModule, Dialog, IconComponent, ButtonComponent, VoucherHotelComponent, VoucherFlightComponent, VoucherTransfertComponent, VoucherAttractionComponent],
  templateUrl: './voucher-overview.component.html',
  styleUrl: './voucher-overview.component.css'
})

export class VoucherOverviewComponent {

  constructor(
    private print: PrintService, private api: ReqService, private toast: ToastService) { }

  isLoading = signal<Record<string, boolean>>({});

  visible: Record<string, boolean> = {};

  showDialog(bookingNumber: string) {
    this.visible[bookingNumber] = true;
  }

  @Input() data: any
  booking: any
  cancellationPolicies: any = []
  bookingData = signal<any>([])

  componentsVoucher: any = {
    hotel: VoucherHotelComponent,
    flight: VoucherFlightComponent,
    transfer: VoucherTransfertComponent,
    activity: VoucherAttractionComponent
  }

  parseInt(number): void {
    Number(number)
  }

  getData(item: any) {
    this.isLoading.update(prev => ({ ...prev, [item?.bookingNumber]: true }));

    this.api.get(item?.urlRetrieve).subscribe({
      next: (response: any) => {
        this.bookingData.set(response?.result)
        this.isLoading.update(prev => ({ ...prev, [item?.bookingNumber]: false }));
        this.showDialog(item?.bookingNumber)
      },
      error: () => {
        this.toast.show({ severity: 'error', summary: 'error', detail: 'error_request', life: 3000 });
        this.isLoading.update(prev => ({ ...prev, [item?.bookingNumber]: false }));
      }
    })
  }

  Print(id: string) {
    setTimeout(() => {
      this.print.print(id);
    }, 100);
  }

  toPdf(id: string) {
    setTimeout(() => {
      this.print.toPdf(id);
    }, 100);
  }

}
