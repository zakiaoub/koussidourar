import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';
import { TranslationModule } from '@app/core/modules/translation.module';

@Component({
  selector: 'app-two-dimension-filter',
  imports: [TranslationModule, CommonModule, Checkbox, FormsModule],
  templateUrl: './two-dimension-filter.component.html',
  styleUrl: './two-dimension-filter.component.css'
})
export class TwoDimensionFilterComponent {

  @Input() items: any;
  @Input() selectedItems: any[] = [];
  @Input() count: { [key: string]: any } = {};
  @Input() groupName: string;
  @Output() selectedItemsChange = new EventEmitter<any[]>();

  // Map to store toggle state for each category
  expandedCategories: { [key: string]: boolean } = {};

  toggleCategory(categoryId: string) {
    this.expandedCategories[categoryId] = !this.expandedCategories[categoryId];
  }

  isExpanded(categoryId: string): boolean {
    return !!this.expandedCategories[categoryId];
  }
} 