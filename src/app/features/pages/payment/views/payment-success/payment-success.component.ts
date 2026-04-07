import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslationModule } from '@modules/translation.module';
import { TopBannerComponent } from '@app/shared/components/banner/top-banner/top-banner.component';
import { SuccesOverviewComponent } from '../../templates/succes-overview/succes-overview.component';
import { VoucherOverviewComponent } from '@app/features/pages/voucher/views/voucher-overview/voucher-overview.component';
import { DialogModule } from 'primeng/dialog';
import { SkeletonVoucherComponent } from '@app/shared/components/loaders/skeleton-voucher/skeleton-voucher.component';
import { ReqService } from '@app/core/services/req.service';
import { ErrorRequestComponent } from '@app/shared/components/errors/error-request/error-request.component';
import { StepperComponent } from '@app/shared/components/widgets/stepper/stepper.component';

@Component({
  selector: 'app-payment-success',
  imports: [CommonModule, TranslationModule, SuccesOverviewComponent, VoucherOverviewComponent, DialogModule, SkeletonVoucherComponent, ErrorRequestComponent, StepperComponent],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})

export class PaymentSuccessComponent {

  constructor(
    private route: ActivatedRoute, private api: ReqService) { }

  data = signal<any>(null)

  isLoading = signal<boolean>(false)
  error = signal<boolean>(false)

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('transactionId');
    this.getData(id)
  }

  getData(id: any) {
    this.isLoading.set(true)

    this.api.post(['booking', 'confirm', id].join('/')).subscribe({
      next: (response: any) => {
        if (response?.status) {
          this.data.set(response?.result?.shoppingcartConfirm);
        } else {
          this.error.set(true)
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set(true)
        this.isLoading.set(false);
      }
    })
  }
}
