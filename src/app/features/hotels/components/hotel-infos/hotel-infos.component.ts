import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationModule } from '../../../../core/modules/translation.module';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";

@Component({
  selector: 'app-hotel-infos',
  standalone: true,
  imports: [TranslationModule, CommonModule, IconComponent],
  templateUrl: './hotel-infos.component.html',
  styleUrl: './hotel-infos.component.css'
})

export class HotelInfosComponent {
  @Input() data: any;

  infos = [
    { key: 'city', icon: 'assets/icons/interface/location.png' },
    { key: 'country', icon: 'assets/icons/interface/globe.png' },
    { key: 'category', icon: 'assets/icons/interface/warranty.png' },
    { key: 'phone', icon: 'assets/icons/interface/phone-call.png', format: (val: string) => val.split('/')[0] }
  ];
}
