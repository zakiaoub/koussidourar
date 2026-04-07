import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton-booking-details',
  imports: [CommonModule, Skeleton],
  templateUrl: './skeleton-booking-details.component.html',
  styleUrl: './skeleton-booking-details.component.css'
})
export class SkeletonBookingDetailsComponent {

}
