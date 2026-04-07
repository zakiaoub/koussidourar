import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { TranslationModule } from '../../../../core/modules/translation.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";

@Component({
  selector: 'app-airlines',
  imports: [ ButtonModule, MultiSelectModule, TranslationModule, CommonModule, FormsModule, IconComponent],
  templateUrl: './airlines.component.html',
  styleUrl: './airlines.component.css'
})

export class AirlinesComponent {

  @Input() filteredAirlines: any[] = [];
  @Input() selectedAirlines: any[] = [];
  @Input() placeholder: string;
  @Input() disabled: any;
  @Output() selectedAirlinesChange = new EventEmitter<any[]>();
  @Output() onAirlineFilter = new EventEmitter<any>();

  updateSelectedAirlines(value: any[]) {
    this.selectedAirlines = value;
    this.selectedAirlinesChange.emit(this.selectedAirlines);
  }

  handleFilter(event: any) {
    this.onAirlineFilter.emit(event);
  }

}
