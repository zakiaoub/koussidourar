import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslationModule } from '@app/core/modules/translation.module';
import { PriceFilterComponent } from '@app/shared/components/filters/price-filter/price-filter.component';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton-filters',
  imports: [CommonModule, Skeleton, TranslationModule, FormsModule, PriceFilterComponent],
  templateUrl: './skeleton-filters.component.html',
  styleUrl: './skeleton-filters.component.css'
})

export class SkeletonFiltersComponent {

  rangeValues: number[] = [0, 4982];

}

