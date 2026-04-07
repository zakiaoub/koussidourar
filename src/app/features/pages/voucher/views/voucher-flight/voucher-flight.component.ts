import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { TranslationModule } from "@modules/translation.module";
import { VoucherHeaderComponent } from "../../templates/voucher-header/voucher-header.component";
import { QRCodeComponent } from "angularx-qrcode";
import { ProductCancellationPolicyComponent } from "@app/shared/components/templates/product-cancellation-policy/product-cancellation-policy.component";
import { parseDate } from "@app/core/utils/parseDate.util";
import { environment } from 'environments/environment'
import { VoucherFooterComponent } from "../../templates/voucher-footer/voucher-footer.component";

@Component({
  selector: "app-voucher-flight",
  imports: [
    CommonModule,
    TranslationModule,
    VoucherHeaderComponent,
    QRCodeComponent,
    ProductCancellationPolicyComponent,
    VoucherFooterComponent
  ],
  templateUrl: "./voucher-flight.component.html",
  styleUrl: "./voucher-flight.component.css",
})

export class VoucherFlightComponent {

  @Input() data: any;
  @Input() isQrCode: boolean = true

  appUrl: string = environment.NG_APP_WEB_URl



  ngOnInit() {
    this.allSegments = this.data.flight.itineraries.flatMap(
      (itinerary) => itinerary.segments
    );
  }

  allSegments: any[] = [];

  parsedate = parseDate
}
