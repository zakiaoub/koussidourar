import { Component } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton-voucher',
  imports: [Skeleton, TranslationModule],
  templateUrl: './skeleton-voucher.component.html',
  styleUrl: './skeleton-voucher.component.css'
})
export class SkeletonVoucherComponent {

}
