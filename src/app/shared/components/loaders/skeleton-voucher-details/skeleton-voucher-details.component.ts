import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton-voucher-details',
  imports: [Skeleton, CommonModule],
  templateUrl: './skeleton-voucher-details.component.html',
  styleUrl: './skeleton-voucher-details.component.css'
})
export class SkeletonVoucherDetailsComponent {

}
