import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GetFiltersService } from '@app/core/services/get-filters.service';
import { TranslationModule } from '@app/core/modules/translation.module';

@Component({
  selector: 'app-category-filter',
  imports: [CommonModule, FormsModule, TranslationModule],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.css'
})

export class CategoryFilterComponent {

  constructor(private getFiltersService: GetFiltersService) { }

  @Input() title: string;
  @Input() filterList: any[] = [];
  @Input() selectedItems: any[] = [];
  @Input() count: { [key: string]: any } = {};
  @Input() groupName: string = '';

  @Output() selectedItemsChange = new EventEmitter<any[]>();

  toggleSelection(item: string, checked?: boolean) {
    this.selectedItems = this.getFiltersService.toggleSelection(this.selectedItems, item, checked);
    this.selectedItemsChange.emit(this.selectedItems);
  }
}
