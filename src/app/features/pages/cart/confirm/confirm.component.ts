import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslationModule } from '@modules/translation.module';
import { SkeletonVoucherComponent } from '@app/shared/components/loaders/skeleton-voucher/skeleton-voucher.component';
import { VoucherOverviewComponent } from '../../voucher/views/voucher-overview/voucher-overview.component';
import { ReqService } from '@app/core/services/req.service';
import { SuccesOverviewComponent } from '../../payment/templates/succes-overview/succes-overview.component';
import { ErrorRequestComponent } from '@app/shared/components/errors/error-request/error-request.component';
import { StepperComponent } from '@app/shared/components/widgets/stepper/stepper.component';

@Component({
  selector: 'app-confirm',
  imports: [CommonModule, TranslationModule, VoucherOverviewComponent, SkeletonVoucherComponent, SuccesOverviewComponent, ErrorRequestComponent, StepperComponent],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent {
  constructor(
    private route: ActivatedRoute, private api: ReqService
  ) { }

  date: Date = new Date()

  data = signal<any>(null)
  isLoading = signal<boolean>(false)
  error = signal<boolean>(false)

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('transactionId');
    this.getData(id)
  }

  getData(id: any) {
    this.isLoading.set(true)

    this.api.post(['booking', 'confirm', id, 'and', 'paid', 'after'].join('/'), null).subscribe({
      next: (response: any) => {
        this.data.set(response?.result?.shoppingcartConfirm);
        if (response?.result?.shoppingcartConfirm?.length == 0) {
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
