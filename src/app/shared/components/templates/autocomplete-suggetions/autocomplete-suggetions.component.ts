import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";

@Component({
  selector: 'app-autocomplete-suggetions',
  imports: [CommonModule, TranslationModule, IconComponent],
  templateUrl: './autocomplete-suggetions.component.html',
  styleUrl: './autocomplete-suggetions.component.css'
})

export class AutocompleteSuggetionsComponent {

  @Input() type: string
  @Input() item: any

  getIcon(type: string): any {
    switch (type) {
      case 'city':
      case 'City':
      case 'region':
        return 'geo-alt-fill';
      case 'Airport':
      case 'A':
        return 'airplane-fill';
      case 'H':
      case 'hotel':
        return 'building-fill';
      case 'T':
        return 'train-front-fill';
      case 'P':
        return 'geo-alt-fill';
      default:
        return 'geo-alt';
    }
  }
}
