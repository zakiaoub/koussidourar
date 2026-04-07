import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton-flight',
  imports: [CommonModule, Skeleton],
  templateUrl: './skeleton-flight.component.html',
  styleUrl: './skeleton-flight.component.css'
})
export class SkeletonFlightComponent {

}
