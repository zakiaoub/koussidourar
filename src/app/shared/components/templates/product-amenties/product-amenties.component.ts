import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationModule } from '@app/core/modules/translation.module';

@Component({
  selector: 'app-product-amenties',
  imports: [CommonModule, TranslationModule],
  templateUrl: './product-amenties.component.html',
  styleUrl: './product-amenties.component.css'
})
export class ProductAmentiesComponent {
  @Input() title: string;
  @Input() data: any[];

  showAll = false;

  toggleShowAll() {
    this.showAll = !this.showAll;
  }
}
