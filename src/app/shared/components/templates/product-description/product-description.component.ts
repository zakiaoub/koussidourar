import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslationModule } from '../../../../core/modules/translation.module';

@Component({
    selector: 'app-product-description',
    imports: [TranslationModule],
    templateUrl: './product-description.component.html',
    styleUrls: ['./product-description.component.css']
})
export class ProductDescriptionComponent implements OnChanges {

  @Input() title: string = "";
  @Input() text: string = "";
  visibleText: string = '';
  showAll: boolean = false;
  @Input()limit: number = 50;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['text']) {
      this.updateText();
    }
  }

  toggleText() {
    this.showAll = !this.showAll;
    this.updateText();
  }

  private updateText() {
    const words = this.text.split(' ');
    if (this.showAll) {
      this.visibleText = this.text.replace(/\.\s*/g, '.<br/><br/>');
      this.visibleText = this.text.replace(/\/\/\s*/g, '<br/><br/>');
    } else {
      this.visibleText = words.slice(0, this.limit).join(' ') + '...';
    }
  }
  
}
