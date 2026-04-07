import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import airlines from '@data/airlines.json'
import { FilterPipe } from '@app/shared/pipes/filter.pipe';
import { TranslationModule } from '@app/core/modules/translation.module';
import { StopoverPipe } from '@app/shared/pipes/stopover.pipe';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { Airline } from '@app/core/models/airline.interface';

@Component({
  selector: 'app-flight-segment',
  imports: [CommonModule, FilterPipe, TranslationModule, StopoverPipe, IconComponent],
  templateUrl: './flight-segment.component.html',
  styleUrl: './flight-segment.component.css'
})

export class FlightSegmentComponent {

  @Input() data: any
  airlines:Airline[] = airlines
  airportsName: any

  ngOnInit(): void {
    this.airportsName = this.data.airportsName
  }
}
