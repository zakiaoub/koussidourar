import { Injectable } from '@angular/core';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private session: any;

  constructor(private sessionService: SessionService) {
    // récupérer la session ou définir EUR par défaut
    this.session = this.sessionService.getSession() || { currency: 'EUR' };

    // initialiser la currency par défaut si elle existe
    if (!this.session.currency) {
      this.changeDefaultCurrency('EUR');
    }
  }

  // retourner la currency par défaut
  getDefaultCurrency(): string {
    return this.session.currency || 'EUR';
  }

  // changer la currency par défaut et mettre à jour la session
  changeDefaultCurrency(currency: string): void {
    this.session.currency = currency;
    this.sessionService.updateSessionData({ currency });
  }
}
