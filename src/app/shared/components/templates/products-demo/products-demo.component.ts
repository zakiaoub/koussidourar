import { Component, Input } from '@angular/core';
import { TranslationModule } from '../../../../core/modules/translation.module';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-products-demo',
    imports: [TranslationModule, CommonModule],
    templateUrl: './products-demo.component.html',
    styleUrl: './products-demo.component.css'
})
export class ProductsDemoComponent {

    @Input() data:any 

}
