import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationModule } from '@app/core/modules/translation.module';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { FlightClassFilterComponent } from "./flight-class-filter/flight-class-filter.component";
import { PriceFilterComponent } from './price-filter/price-filter.component';
import { CheckGroupComponent } from './check-group/check-group.component';
import { CategoryFilterComponent } from './category-filter/category-filter.component';
import { TwoDimensionFilterComponent } from './two-dimension-filter/two-dimension-filter.component';
import { CheckGroupSegmentComponent } from './check-group-segment/check-group-segment.component';
import { TimesFilterComponent } from './times-filter/times-filter.component';
import { DurationFilterComponent } from './duration-filter/duration-filter.component';

@Component({
  selector: 'app-filters',
  imports: [CommonModule, TranslationModule, SliderModule, FormsModule, PriceFilterComponent, CheckGroupComponent, CategoryFilterComponent, TwoDimensionFilterComponent, CheckGroupSegmentComponent, TimesFilterComponent, DurationFilterComponent, FlightClassFilterComponent],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {


  private _selectedItems: string[] = [];
  priceValues: number[] = [];
  @Input() service: string;
  @Input() data: any;
  @Input() min: number;
  @Input() max: number;

  @Output() filterChanged = new EventEmitter<string[]>();
  @Output() resetFilters = new EventEmitter<string>();
  @Output() priceRangeChange = new EventEmitter<number[]>();

  get selectedItems(): string[] {
    return this._selectedItems;
  }

  set selectedItems(value: string[]) {
    this._selectedItems = value;
    this.filterChanged.emit(this._selectedItems);
  }

  ngOnInit() {
    this.priceValues = [this.min, this.max];
  }

  onPriceRangeChange(newRange: number[]) {
    this.priceRangeChange.emit(this.priceValues);
  }

  reset(): void {
    this.resetFilters.emit("RESET");
    this.selectedItems = []
    this.priceValues = [this.min, this.max];
  }

  category = [
    { name: 'N/A', id: 0 },
    { name: '1', id: 1 },
    { name: '2', id: 2 },
    { name: '3', id: 3 },
    { name: '4', id: 4 },
    { name: '5', id: 5 },
  ];

  reviews = [
    { name: "pleasant", id: 1, icon: '🌿' },
    { name: "good", id: 3, icon: '👍' },
    { name: "very_good", id: 4, icon: '🏅' },
    { name: "exceptional", id: 5, icon: '💎' }
  ]
}
