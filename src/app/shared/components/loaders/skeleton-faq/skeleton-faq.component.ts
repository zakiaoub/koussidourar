import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton-faq',
  imports: [CommonModule, Skeleton],
  templateUrl: './skeleton-faq.component.html',
  styleUrl: './skeleton-faq.component.css'
})
export class SkeletonFaqComponent {

}
