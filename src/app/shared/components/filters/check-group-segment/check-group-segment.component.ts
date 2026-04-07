import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LineSwitchComponent } from '../../widgets/line-switch/line-switch.component';
import { TranslationModule } from '@app/core/modules/translation.module';
import { Checkbox } from 'primeng/checkbox';

@Component({
  selector: 'app-check-group-segment',
  imports: [CommonModule, FormsModule, TranslationModule, Checkbox, LineSwitchComponent],
  templateUrl: './check-group-segment.component.html',
  styleUrl: './check-group-segment.component.css'
})
export class CheckGroupSegmentComponent {

  @Input() title: string;
  @Input() filterList: any;
  @Input() selectedItems: any[] = [];
  @Input() count: { [key: string]: any } = {};
  @Input() groupName: string = '';

  @Output() selectedItemsChange = new EventEmitter<any[]>();

  showAll: boolean = false;

  get visibleItems(): any[] {
    return this.showAll ? this.filterList : this.filterList.slice(0, 5);
  }

  activeLine: 'DEPARTURE' | 'RETURN' = 'DEPARTURE';
}
