import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslationModule } from '@modules/translation.module';
import { VoucherHeaderComponent } from '../../templates/voucher-header/voucher-header.component';
import { ProductCancellationPolicyComponent } from "@app/shared/components/templates/product-cancellation-policy/product-cancellation-policy.component";
import { QRCodeComponent } from 'angularx-qrcode';
import { parseDate } from '@app/core/utils/parseDate.util';
import { environment } from 'environments/environment'
import { VoucherFooterComponent } from '../../templates/voucher-footer/voucher-footer.component';

@Component({
  selector: 'app-voucher-transfert',
  imports: [CommonModule, TranslationModule, VoucherHeaderComponent, ProductCancellationPolicyComponent, QRCodeComponent, VoucherFooterComponent],
  templateUrl: './voucher-transfert.component.html',
  styleUrl: './voucher-transfert.component.css'
})
export class VoucherTransfertComponent {

  @Input() data: any
  @Input() isQrCode: boolean = true

  appUrl: string = environment.NG_APP_WEB_URl

  parsedate = parseDate

}
