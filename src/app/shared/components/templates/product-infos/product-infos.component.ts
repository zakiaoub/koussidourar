import { Component, Input } from '@angular/core';
import { TranslationModule } from '../../../../core/modules/translation.module';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-product-infos',
    imports: [TranslationModule, CommonModule],
    templateUrl: './product-infos.component.html',
    styleUrl: './product-infos.component.css'
})
export class ProductInfosComponent {

  @Input() informations: any
  @Input() keys: any

}
