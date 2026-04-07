import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslationModule } from '@modules/translation.module';
import { RatingComponent } from "@app/shared/components/widgets/rating/rating.component";
import { VoucherHeaderComponent } from '../../templates/voucher-header/voucher-header.component';
import { QRCodeComponent } from 'angularx-qrcode';
import { VoucherFooterComponent } from "../../templates/voucher-footer/voucher-footer.component";
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { ProductCancellationPolicyComponent } from "@app/shared/components/templates/product-cancellation-policy/product-cancellation-policy.component";
import { parseDate } from '@app/core/utils/parseDate.util';
import { environment } from 'environments/environment'

@Component({
  selector: 'app-voucher-hotel',
  imports: [CommonModule, TranslationModule, RatingComponent, VoucherHeaderComponent, QRCodeComponent, VoucherFooterComponent, IconComponent, ProductCancellationPolicyComponent],
  templateUrl: './voucher-hotel.component.html',
  styleUrl: './voucher-hotel.component.css'
})

export class VoucherHotelComponent {

  @Input() data: any
  @Input() isQrCode: boolean = true

  appUrl: string = environment.NG_APP_WEB_URl

  parsedate = parseDate
}
