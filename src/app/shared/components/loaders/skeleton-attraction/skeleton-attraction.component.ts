import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";

@Component({
  selector: 'app-skeleton-attraction',
  imports: [CommonModule, Skeleton, IconComponent],
  templateUrl: './skeleton-attraction.component.html',
  styleUrl: './skeleton-attraction.component.css'
})

export class SkeletonAttractionComponent {

  @Input() activeButton: string = "flex"

}
