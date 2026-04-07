import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton-rooms',
  imports: [SkeletonModule, CommonModule],
  templateUrl: './skeleton-rooms.component.html',
  styleUrl: './skeleton-rooms.component.css'
})
export class SkeletonRoomsComponent {

}
