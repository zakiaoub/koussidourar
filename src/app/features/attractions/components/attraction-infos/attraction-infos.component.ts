import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslationModule } from '../../../../core/modules/translation.module';

@Component({
    selector: 'app-attraction-infos',
    imports: [CommonModule, TranslationModule],
    templateUrl: './attraction-infos.component.html',
    styleUrl: './attraction-infos.component.css'
})

export class AttractionInfosComponent {

  @Input() data: any;

  infos = [
    { title: 'city', key: "City", icon: 'assets/icons/interface/location.png' },
    { title: 'country', key: "Country", icon: 'assets/icons/interface/globe.png' },
    { title: 'duration', key: 'Duration', icon: 'assets/icons/interface/alarm-clock.png' },
    { title: 'start', key: 'dateFrom', icon: 'assets/icons/interface/appointment.png' },
  ];
}
