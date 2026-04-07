import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';
import airlines from '@assets/json/airlines.json'
import { FilterPipe } from '@app/shared/pipes/filter.pipe';
import { TranslationModule } from '@app/core/modules/translation.module';
import { AmountComponent } from '@app/shared/components/settings/components/amount/amount.component';
import { Airline } from '@app/core/models/airline.interface';

@Component({
  selector: 'app-check-group',
  imports: [CommonModule, FormsModule, TranslationModule, Checkbox, FilterPipe, AmountComponent],
  templateUrl: './check-group.component.html',
  styleUrl: './check-group.component.css'
})

export class CheckGroupComponent {

  airlines:Airline[] = airlines

  @Input() title: string;
  @Input() filterList: any[] = [];
  @Input() selectedItems: any[] = [];
  @Input() count: { [key: string]: any } = {};
  @Input() groupName: string = '';

  @Output() selectedItemsChange = new EventEmitter<any[]>();

  showAll: boolean = false;

  get visibleItems(): any[] {
    return this.showAll ? this.filterList : this.filterList.slice(0, 5);
  }

}
