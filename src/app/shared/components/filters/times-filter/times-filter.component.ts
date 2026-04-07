import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimesPipe } from '@app/shared/pipes/times.pipe';
import { GetFiltersService } from '@app/core/services/get-filters.service';
import { TranslationModule } from '@app/core/modules/translation.module';
import { LineSwitchComponent } from '../../widgets/line-switch/line-switch.component';
import { IconComponent } from '../../widgets/icon/icon.component';

@Component({
  selector: 'app-times-filter',
  imports: [CommonModule, FormsModule, TranslationModule, TimesPipe, LineSwitchComponent, IconComponent],
  templateUrl: './times-filter.component.html',
  styleUrl: './times-filter.component.css'
})
export class TimesFilterComponent {

  constructor(private getFiltersService: GetFiltersService) { }

  @Input() title: string;
  @Input() filterList: any;
  @Input() selectedItems: any[] = [];
  @Input() count: { [key: string]: any } = {};
  @Input() groupName: string = '';

  @Output() selectedItemsChange = new EventEmitter<any[]>();

  toggleSelection(item: string, checked?: boolean) {
    this.selectedItems = this.getFiltersService.toggleSelection(this.selectedItems, item, checked);
    this.selectedItemsChange.emit(this.selectedItems);
  }

  getTimeIcon(time: string) {
    return this.getFiltersService.getTimeIcon(time);
  }

  convertToDate(timeStr: string): Date {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0);
    return date;
  }

  activeLine: 'DEPARTURE' | 'RETURN' = 'DEPARTURE';
}
