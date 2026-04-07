import { Injectable } from '@angular/core';
import { SessionService } from '@app/core/services/session.service';
import { environment } from 'environments/environment'

@Injectable({
  providedIn: 'root'
})

export class AmountService {

  constructor(private sessionService: SessionService) { }

  /**
   * @param amount 
   * @returns
   */
  calculateAmount(amount: number): number {
    if (!amount) return 0;

    const exchangeRate = parseFloat(localStorage.getItem('exchangeRate') || '1');
    const convertedAmount = Math.ceil(amount * exchangeRate);

    return convertedAmount;
  }

  getCurrency(): string {
    return this.sessionService.getSession()?.currency || environment.NG_APP_CURRENCY;
  }
}
