import { Component, Input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { CommonModule } from '@angular/common';
import { TranslationModule } from '@app/core/modules/translation.module';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { ReferralAdComponent } from '../../banner/referral-ad/referral-ad.component';

@Component({
  selector: 'app-skeleton-details',
  imports: [CommonModule, SkeletonModule, TranslationModule, IconComponent, ReferralAdComponent],
  templateUrl: './skeleton-details.component.html',
  styleUrl: './skeleton-details.component.css'
})

export class SkeletonDetailsComponent {

  @Input() service: string
}
