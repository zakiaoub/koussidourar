import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton-cart',
  imports: [CommonModule, SkeletonModule],
  templateUrl: './skeleton-cart.component.html',
  styleUrl: './skeleton-cart.component.css'
})
export class SkeletonCartComponent {
  
}
