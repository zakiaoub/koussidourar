import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransfersOverviewComponent } from '@features/transfers/views/transfers-overview/transfers-overview.component';
import { TransfersResultsComponent } from '@features/transfers/views/transfers-results/transfers-results.component';
import { TransfersDetailsComponent } from '@features/transfers/views/transfers-details/transfers-details.component';
import { TransfersBookingFormComponent } from '@app/shared/components/forms/transfers-booking-form/transfers-booking-form.component';

@Component({
  selector: 'app-transfers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transfers.component.html',
  styleUrl: './transfers.component.css'
})
export class TransfersComponent {

  constructor(private route: ActivatedRoute) { }

  currentComponent: any;
  isHomeComponent: boolean = false;

  private componentsMap: { [key: string]: any } = {
    home: TransfersOverviewComponent,
    results: TransfersResultsComponent,
    details: TransfersDetailsComponent,
    checkout: TransfersBookingFormComponent
  };

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const componentName = data['component'];
      this.currentComponent = this.componentsMap[componentName] || null;
      this.isHomeComponent = componentName === 'home';
    });
  }
}
