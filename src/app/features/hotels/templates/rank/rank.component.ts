import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { TranslationModule } from '../../../../core/modules/translation.module';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";

@Component({
  selector: 'app-rank',
  imports: [MultiSelectModule, FormsModule, CommonModule, TranslationModule, IconComponent],
  templateUrl: './rank.component.html',
  styleUrl: './rank.component.css'
})

export class RankComponent {

  category:any = [
    { name: "1", id: 1 },
    { name: "2", id: 2 },
    { name: "3", id: 3 },
    { name: "4", id: 4 },
    { name: "5", id: 5 },
  ]

  rating:any = [
    { name: "pleasant", id: 1, icon: '🌿' },
    { name: "good", id: 3, icon: '👍' },
    { name: "very_good", id: 4, icon: '🏅' },
    { name: "exceptional", id: 5, icon: '💎' }
  ]

  @Input() selected: number[] = [];
  @Input() placeholder: string
  @Input() disabled: boolean = false
  @Output() selectedChange = new EventEmitter<any[]>();

  onChange(value: number[]) {
    this.selectedChange.emit(value);
  }

}
