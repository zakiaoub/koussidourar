import { Component, Input } from '@angular/core';
import { TranslationModule } from '../../../../core/modules/translation.module';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-product-promo',
    imports: [TranslationModule, CommonModule],
    templateUrl: './product-promo.component.html',
    styleUrl: './product-promo.component.css'
})
export class ProductPromoComponent {

  @Input()data:any;
  @Input()href:string = "";
  @Input()card:string = "";
}
