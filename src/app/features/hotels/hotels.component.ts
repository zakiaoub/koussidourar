import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HotelDetailsComponent } from '@features/hotels/views/hotel-details/hotel-details.component';
import { HotelsResultsComponent } from '@features/hotels/views/hotels-results/hotels-results.component';
import { HotelsOverviewComponent } from '@features/hotels/views/hotels-overview/hotels-overview.component';
import { HotelsBookingFormComponent } from '@app/shared/components/forms/hotels-booking-form/hotels-booking-form.component';

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.css'
})

export class HotelsComponent {

  currentComponent: any;

  private componentsMap: { [key: string]: any } = {
    home: HotelsOverviewComponent,
    details: HotelDetailsComponent,
    results: HotelsResultsComponent,
    checkout: HotelsBookingFormComponent
  };

  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const componentName = data['component'];
      this.currentComponent = this.componentsMap[componentName] || null;
    });
  }
}
