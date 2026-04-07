import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationModule } from '../../../../core/modules/translation.module';

@Component({
    selector: 'app-product-included',
    imports: [CommonModule, TranslationModule],
    templateUrl: './product-included.component.html',
    styleUrl: './product-included.component.css'
})
export class ProductIncludedComponent {


  @Input() included: any
  @Input() excluded: any
}
