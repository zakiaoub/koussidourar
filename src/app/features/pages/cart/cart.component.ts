import { Component, signal } from '@angular/core';
import { CartEmptyComponent } from "./components/cart-empty/cart-empty.component";
import { CommonModule } from '@angular/common';
import { TranslationModule } from '@app/core/modules/translation.module';
import { FormsModule } from '@angular/forms';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ToastService } from '@app/core/services/toast.service';
import { ReqService } from '@app/core/services/req.service';
import { CartService } from '@app/core/services/cart.service';
import { AdServiceAddComponent } from '@app/shared/components/banner/ad-service-add/ad-service-add.component';

@Component({
  selector: 'app-cart',
  imports: [CartEmptyComponent, CommonModule, TranslationModule, FormsModule, CartItemComponent, AdServiceAddComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  providers: [DialogService]
})

export class CartComponent {

  constructor(
    public cart: CartService
  ) { }

  data = signal<any>(null)
  paymentData = signal<any>(null)
  isLoad = signal<boolean>(false)

  get cartCount() {
    return this.cart.count();
  }
}
