import { Component, Input } from '@angular/core';
import currencies from '../../../../../../assets/json/currencies.json'
import { CommonModule } from '@angular/common';
import { SessionService } from '@app/core/services/session.service';

@Component({
  selector: 'app-amount',
  imports: [CommonModule],
  templateUrl: './amount.component.html',
  styleUrl: './amount.component.css'
})

export class AmountComponent {

  constructor(private sessionService: SessionService) {
    this.currency = this.sessionService.getSession()?.currency
  }

  @Input() value: number | any
  // @Input() exchangeRate: any
  currency: any;

  // ngOnInit() {
  //   this.exchangeRate = localStorage.getItem('exchangeRate')
  //   this.value = Math.ceil(parseFloat(this.value) * parseFloat(this.exchangeRate))
  // }

  data = currencies
}
