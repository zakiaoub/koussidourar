import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { ButtonComponent } from '@app/shared/components/widgets/button/button.component';

@Component({
  selector: 'app-promo-product-card',
  imports: [CommonModule, TranslationModule, ButtonComponent],
  templateUrl: './promo-product-card.component.html',
  styleUrl: './promo-product-card.component.css'
})
export class PromoProductCardComponent {

  isLoading:boolean = false;

  @Input() image:string
  @Input() text:string
  @Input() href:string

  navigate(path: string) {
    this.isLoading = true;
  
    setTimeout(() => {
      window.open(path, '_blank');
      this.isLoading = false;
    }, 1000);
  }  
}
