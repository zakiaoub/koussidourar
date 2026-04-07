import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslationModule } from '@app/core/modules/translation.module';
import { TransferRecapComponent } from '@features/transfers/components/transfer-recap/transfer-recap.component';
import { ProductDescriptionComponent } from '@app/shared/components/templates/product-description/product-description.component';
import { SessionTimeComponent } from '@app/shared/components/settings/templates/session-time/session-time.component';
import { SessionExpiredComponent } from '@app/shared/components/settings/templates/session-expired/session-expired.component';
import { SkeletonDetailsComponent } from '@app/shared/components/loaders/skeleton-details/skeleton-details.component';
import { StepperComponent } from '@app/shared/components/widgets/stepper/stepper.component';
import { IconComponent } from '@app/shared/components/widgets/icon/icon.component';
import { ReqService } from '@app/core/services/req.service';
import { ErrorRequestComponent } from '@app/shared/components/errors/error-request/error-request.component';

@Component({
  selector: 'app-transfers-details',
  standalone: true,
  imports: [CommonModule, ProductDescriptionComponent, TranslationModule, TransferRecapComponent, SessionTimeComponent, SessionExpiredComponent, SkeletonDetailsComponent, StepperComponent, IconComponent, ErrorRequestComponent],
  templateUrl: './transfers-details.component.html',
  styleUrl: './transfers-details.component.css'
})

export class TransfersDetailsComponent {

  constructor(
    private route: ActivatedRoute,
    private api: ReqService
  ) { }


  data = signal<any>(null)
  isLoading = signal<boolean>(false)
  error = signal<boolean>(false)

  searchToken: any
  rateKey: any

  ngOnInit(): void {
    this.searchToken = this.route.snapshot.paramMap.get('searchToken');
    this.rateKey = this.route.snapshot.paramMap.get('rateKey')
    this.getDetails()
  }

  getDetails() {
    this.isLoading.set(true)

    this.api.get(['transfer', 'detail', this.searchToken, this.rateKey].join('/')).subscribe({
      next: (response: any) => {
        this.data.set(response?.result);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set(true)
        this.isLoading.set(false);
      }
    })
  }
}
