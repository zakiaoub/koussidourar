import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingsOverviewComponent } from './views/bookings-overview/bookings-overview.component';
import { BookingsDetailsComponent } from './views/bookings-details/bookings-details.component';

@Component({
  selector: 'app-bookings',
  imports: [CommonModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})

export class BookingsComponent {

  constructor(private route: ActivatedRoute) { }

  currentComponent: any;
  isHomeComponent = false;

  private componentsMap: { [key: string]: any } = {
    home: BookingsOverviewComponent,
    details: BookingsDetailsComponent,
  };

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const componentName = data['component'];
      this.currentComponent = this.componentsMap[componentName] || null;
      this.isHomeComponent = componentName === 'home';
    });
  }

}
