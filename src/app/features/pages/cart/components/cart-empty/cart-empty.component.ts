import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';

@Component({
    selector: 'app-cart-empty',
    imports: [CommonModule, TranslationModule],
    templateUrl: './cart-empty.component.html',
    styleUrl: './cart-empty.component.css'
})
export class CartEmptyComponent {

}
