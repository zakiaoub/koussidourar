import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslationModule } from '@modules/translation.module';
import { VoucherHeaderComponent } from '../../templates/voucher-header/voucher-header.component';
import { QRCodeComponent } from 'angularx-qrcode';
import { VoucherFooterComponent } from "../../templates/voucher-footer/voucher-footer.component";
import { ProductCancellationPolicyComponent } from "@app/shared/components/templates/product-cancellation-policy/product-cancellation-policy.component";
import { parseDate } from '@app/core/utils/parseDate.util';
import { environment } from 'environments/environment'

@Component({
  selector: 'app-voucher-attraction',
  imports: [CommonModule, TranslationModule, VoucherHeaderComponent, QRCodeComponent, VoucherFooterComponent, ProductCancellationPolicyComponent],
  templateUrl: './voucher-attraction.component.html',
  styleUrl: './voucher-attraction.component.css'
})
export class VoucherAttractionComponent {

  @Input() data: any
  @Input() isQrCode: boolean = true
  appUrl: string = environment.NG_APP_WEB_URl

  parsedate = parseDate
}
