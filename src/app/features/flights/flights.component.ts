import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightsResultsComponent } from '@features/flights/views/flights-results/flights-results.component';
import { ActivatedRoute } from '@angular/router';
import { FlightsOverviewComponent } from '@features/flights/views/flights-overview/flights-overview.component';
import { FlightDetailsComponent } from '@features/flights/views/flight-details/flight-details.component';
import { FlightsBookingFormComponent } from '@app/shared/components/forms/flights-booking-form/flights-booking-form.component';

@Component({
  selector: 'app-flights',
  imports: [CommonModule],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.css'
})

export class FlightsComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  currentComponent: any;
  isHomeComponent: boolean = false;

  private componentsMap: { [key: string]: any } = {
    home: FlightsOverviewComponent,
    results: FlightsResultsComponent,
    details: FlightDetailsComponent,
    checkout: FlightsBookingFormComponent
  };

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const componentName = data['component'];
      this.currentComponent = this.componentsMap[componentName] || null;
      this.isHomeComponent = componentName === 'home';
    });
  }
}
