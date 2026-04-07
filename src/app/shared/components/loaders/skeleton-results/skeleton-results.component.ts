import { Component, Input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { SkeletonFlightComponent } from "../skeleton-flight/skeleton-flight.component";
import { SkeletonFiltersComponent } from "../skeleton-filters/skeleton-filters.component";
import { CommonModule } from '@angular/common';
import { SkeletonAttractionComponent } from "../skeleton-attraction/skeleton-attraction.component";
import { StepperComponent } from '../../widgets/stepper/stepper.component';
import { SessionTimeComponent } from '../../settings/templates/session-time/session-time.component';

@Component({
  selector: 'app-skeleton-results',
  imports: [SkeletonModule, SkeletonFlightComponent, SkeletonFiltersComponent, CommonModule, SkeletonAttractionComponent, StepperComponent, SessionTimeComponent],
  templateUrl: './skeleton-results.component.html',
  styleUrl: './skeleton-results.component.css'
})

export class SkeletonResultsComponent {
  @Input() service: string
  
}
