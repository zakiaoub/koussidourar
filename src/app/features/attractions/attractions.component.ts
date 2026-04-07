import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AttractionsResultsComponent } from '@features/attractions/views/attractions-results/attractions-results.component';
import { AttractionsDetailsComponent } from '@features/attractions/views/attractions-details/attractions-details.component';
import { AttractionsOverviewComponent } from '@features/attractions/views/attractions-overview/attractions-overview.component';
import { AttractionsBookingFormComponent } from '@app/shared/components/forms/attractions-booking-form/attractions-booking-form.component';

@Component({
  selector: 'app-attractions',
  imports: [CommonModule],
  templateUrl: './attractions.component.html',
  styleUrl: './attractions.component.css'
})

export class AttractionsComponent {

  constructor(private route: ActivatedRoute) { }

  currentComponent: any;
  isHomeComponent = false;

  private componentsMap: { [key: string]: any } = {
    home: AttractionsOverviewComponent,
    results: AttractionsResultsComponent,
    details: AttractionsDetailsComponent,
    checkout: AttractionsBookingFormComponent
  };

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const componentName = data['component'];
      this.currentComponent = this.componentsMap[componentName] || null;
      this.isHomeComponent = componentName === 'home';
    });
  }
}
