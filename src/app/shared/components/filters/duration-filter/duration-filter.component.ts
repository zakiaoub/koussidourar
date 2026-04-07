import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { TranslationModule } from '@app/core/modules/translation.module';

@Component({
  selector: 'app-duration-filter',
  imports: [SliderModule, CommonModule, FormsModule, TranslationModule],
  templateUrl: './duration-filter.component.html',
  styleUrl: './duration-filter.component.css'
})
export class DurationFilterComponent {

  @Input() title: string;
  @Input() filterList: any;
  @Input() selectedItems: any[] = [];
  @Input() count: { [key: string]: any } = {};
  @Input() i: number;
  selectedIndex: number = 0;

  @Output() selectedItemsChange = new EventEmitter<any[]>();

  onTimeChange(time: string) {
    this.selectedItems = [time]
    this.selectedItemsChange.emit(this.selectedItems);
  }
}
