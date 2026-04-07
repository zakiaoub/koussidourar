import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { ViewEncapsulation } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { CommonModule } from '@angular/common';
import { AmountComponent } from '../../settings/components/amount/amount.component';

@Component({
    selector: 'app-price-filter',
    imports: [FormsModule, SliderModule, TranslationModule, CommonModule, AmountComponent],
    templateUrl: './price-filter.component.html',
    styleUrl: './price-filter.component.css',
    encapsulation: ViewEncapsulation.None
})

export class PriceFilterComponent {
  exchangeRate: number
  @Input() min: number
  @Input() max: number
 
  @Input() rangeValues: number[];
  @Output() rangeValuesChange = new EventEmitter<number[]>();
 

  bars: { height: number; active: boolean }[] = [];

  ngOnInit() {
    this.generateBars();
    this.updateBars();
    this.exchangeRate = parseFloat(localStorage.getItem('exchangeRate'))
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['rangeValues'] || changes['min'] || changes['max']) {
      this.updateBars();
    }
  }

  onRangeChange() {
    this.updateBars();
  }

  onSlideEnd() {
    this.rangeValuesChange.emit(this.rangeValues)
  }

  generateBars() {
    const numBars = 22;
    this.bars = Array.from({ length: numBars }, () => ({ height: 10, active: false }));
  }

  updateBars() {
    const min = this.min;
    const max = this.max;
    const range = max - min;

    const start = ((this.rangeValues[0] - min) / range) * 100;
    const end = ((this.rangeValues[1] - min) / range) * 100;

    this.bars.forEach((bar, index) => {
      const position = (index / this.bars.length) * 100;
      bar.active = position >= start && position <= end;
      bar.height = bar.active ? 20 + Math.random() * 60 : 10;
    });
  }
}
