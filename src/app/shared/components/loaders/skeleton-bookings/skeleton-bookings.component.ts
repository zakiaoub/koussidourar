import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton-bookings',
  imports: [CommonModule, Skeleton],
  templateUrl: './skeleton-bookings.component.html',
  styleUrl: './skeleton-bookings.component.css'
})
export class SkeletonBookingsComponent {

}
