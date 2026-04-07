import { Component, Input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { SkeletonFlightComponent } from "../skeleton-flight/skeleton-flight.component";
import { CommonModule } from '@angular/common';
import { SkeletonAttractionComponent } from "../skeleton-attraction/skeleton-attraction.component";

@Component({
  selector: 'app-skeleton-availability',
  imports: [CommonModule, SkeletonModule, SkeletonFlightComponent, SkeletonAttractionComponent],
  templateUrl: './skeleton-availability.component.html',
  styleUrl: './skeleton-availability.component.css'
})

export class SkeletonAvailabilityComponent {
  @Input() service: string
  @Input() layout: string
}
