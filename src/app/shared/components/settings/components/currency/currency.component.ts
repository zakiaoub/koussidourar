import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import currencies from '../../../../../../assets/json/currencies.json'
import { TranslationModule } from '../../../../../core/modules/translation.module';
import { CurrencyService } from '@app/core/services/currency.service';

@Component({
  selector: 'app-currency',
  imports: [CommonModule, TranslationModule],
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.css'
})
export class CurrencyComponent {

  constructor(private currencyService: CurrencyService) {
    this.currentCurrency = this.currencyService.getDefaultCurrency();
  }

  availableCurrencies: string[] = ["USD", "EUR"];
  currentCurrency: string;
  visible: boolean = false;

  onCurrencyChange(selectedCurrency: string) {
    this.currencyService.changeDefaultCurrency(selectedCurrency);
    this.currentCurrency = selectedCurrency;
    this.visible = false;
    window.location.reload();
  }

  data = currencies
}
