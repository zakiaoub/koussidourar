import { Component, Input } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { SkeletonFlightComponent } from "../skeleton-flight/skeleton-flight.component"; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-company',
  imports: [SkeletonModule, SkeletonFlightComponent, CommonModule],
  templateUrl: './skeleton-company.component.html',
  styleUrl: './skeleton-company.component.css'
})
export class SkeletonCompanyComponent {
  @Input() service: string
  
}
