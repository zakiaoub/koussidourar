import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton-promo',
  imports: [CommonModule, Skeleton],
  templateUrl: './skeleton-promo.component.html',
  styleUrl: './skeleton-promo.component.css'
})
export class SkeletonPromoComponent {

}
