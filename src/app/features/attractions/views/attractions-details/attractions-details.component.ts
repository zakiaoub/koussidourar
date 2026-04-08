import { Component, signal } from '@angular/core';
import { ImagesCarouselComponent } from '@app/shared/components/templates/images-carousel/images-carousel.component';
import { ProductDescriptionComponent } from '@app/shared/components/templates/product-description/product-description.component';
import { ProductRateCommentComponent } from '@app/shared/components/templates/product-rate-comment/product-rate-comment.component';
import { ProductIncludedComponent } from '@app/shared/components/templates/product-included/product-included.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AttractionInfosComponent } from "@features/attractions/components/attraction-infos/attraction-infos.component";
import { AttractionRecapComponent } from "@features/attractions/components/attraction-recap/attraction-recap.component";
import { AttractionOptionsComponent } from "@features/attractions/components/attraction-options/attraction-options.component";
import { FormsModule } from '@angular/forms';
import { SessionTimeComponent } from '@app/shared/components/settings/templates/session-time/session-time.component';
import { AttractionOthersComponent } from "@features/attractions/components/attraction-others/attraction-others.component";
import { SkeletonDetailsComponent } from '@app/shared/components/loaders/skeleton-details/skeleton-details.component';
import { SessionExpiredComponent } from '@app/shared/components/settings/templates/session-expired/session-expired.component';
import { StepperComponent } from "@app/shared/components/widgets/stepper/stepper.component";
import { ReqService } from '@app/core/services/req.service';
import { ErrorRequestComponent } from '@app/shared/components/errors/error-request/error-request.component';

@Component({
  selector: 'app-attractions-details',
  imports: [
    ImagesCarouselComponent,
    ProductDescriptionComponent,
    ProductIncludedComponent,
    CommonModule,
    AttractionInfosComponent,
    AttractionRecapComponent,
    AttractionOptionsComponent,
    FormsModule,
    SessionTimeComponent,
    ProductRateCommentComponent,
    AttractionOthersComponent,
    SkeletonDetailsComponent,
    SessionExpiredComponent,
    StepperComponent,
    ErrorRequestComponent
  ],
  templateUrl: './attractions-details.component.html',
  styleUrl: './attractions-details.component.css'
})
export class AttractionsDetailsComponent {

  constructor(private route: ActivatedRoute, private api: ReqService) { }

  searchToken: string
  activityCode: string
  rateKey: string

  data = signal<any>(null)
  isLoading = signal<boolean>(false)
  error = signal<boolean>(false)

  ngOnInit(): void {
    this.searchToken = this.route.snapshot.paramMap.get('searchToken');
    this.activityCode = this.route.snapshot.paramMap.get('activityCode');
    this.rateKey = this.route.snapshot.paramMap.get('rateKey');
    this.getDetails()
  }

  getDetails() {
    this.isLoading.set(true)

    this.api.get(['activity', 'detail', this.activityCode, this.searchToken, this.rateKey].join('/')).subscribe({
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
