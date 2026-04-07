import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import airlines from "@assets/json/airlines.json"
import { TranslationModule } from '@app/core/modules/translation.module';
import { Tooltip } from 'primeng/tooltip';
import { FlightStopoversComponent } from "@features/flights/templates/flight-stopovers/flight-stopovers.component";
import { FilterPipe } from '@app/shared/pipes/filter.pipe';
import { Airline } from '@app/core/models/airline.interface';

@Component({
  selector: 'app-flights-itinerary',
  imports: [CommonModule, FilterPipe, TranslationModule, Tooltip, FlightStopoversComponent],
  templateUrl: './flights-itinerary.component.html',
  styleUrl: './flights-itinerary.component.css'
})

export class FlightsItineraryComponent {

  @Input() Itinerary: any
  @Input() stops: any
  @Input() airportsName: any
  firstSegment: any
  lastSegment: any
  airlines:Airline[] = airlines

  ngOnInit(): void {
    this.firstSegment = this.Itinerary.Segments[0]
    this.lastSegment = this.Itinerary.Segments[this.Itinerary.Segments.length - 1]
  }

}
