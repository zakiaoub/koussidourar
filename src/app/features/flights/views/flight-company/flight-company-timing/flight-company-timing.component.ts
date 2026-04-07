import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import airlines from "@assets/json/airlines.json"
import { TranslationModule } from '@app/core/modules/translation.module';
import { FlightStopoversComponent } from "@features/flights/templates/flight-stopovers/flight-stopovers.component";

@Component({
  selector: 'app-flight-company-timing',
  imports: [CommonModule, TranslationModule, FlightStopoversComponent],
  templateUrl: './flight-company-timing.component.html',
  styleUrl: './flight-company-timing.component.css'
})
export class FlightCompanyTimingComponent {
 
  @Input() Itinerary: any
  @Input() stops: any
  @Input() airportsName: any
  firstSegment: any
  lastSegment: any
  airlines = airlines

  ngOnInit(): void {
    this.firstSegment = this.Itinerary.Segments[0]
    this.lastSegment = this.Itinerary.Segments[this.Itinerary.Segments.length - 1]
  }

}
