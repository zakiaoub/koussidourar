import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaymentFailedComponent } from './views/payment-failed/payment-failed.component';
import { PaymentSuccessComponent } from './views/payment-success/payment-success.component';

@Component({
    selector: 'app-payment',
    imports: [CommonModule],
    templateUrl: './payment.component.html',
    styleUrl: './payment.component.css'
})

export class PaymentComponent implements OnInit{

  currentComponent: any;

  private componentsMap: { [key: string]: any } = {
    fail: PaymentFailedComponent,
    success: PaymentSuccessComponent,
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const componentName = data['component'];
      this.currentComponent = this.componentsMap[componentName] || null;
    });
  }

}
