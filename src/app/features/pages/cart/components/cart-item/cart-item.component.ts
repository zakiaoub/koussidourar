import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationModule } from '@app/core/modules/translation.module';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { TagModule } from 'primeng/tag';
import { DefaultImagesService } from '@app/core/services/default-images.service';
import defaultImages from "@assets/json/defaultImages.json"
import { ReqService } from '@app/core/services/req.service';
import { ToastService } from '@app/core/services/toast.service';
import { AmountComponent } from '@app/shared/components/settings/components/amount/amount.component';
import { CartService } from '@app/core/services/cart.service';
import { SpinnerComponent } from '@app/shared/components/loaders/spinner/spinner.component';

@Component({
  selector: 'app-cart-item',
  imports: [AmountComponent, TranslationModule, CommonModule, IconComponent, TagModule, SpinnerComponent],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})

export class CartItemComponent {

  constructor(
    public dis: DefaultImagesService,
    private api: ReqService,
    private toast: ToastService,
    private cart: CartService
  ) { }

  defaultImages: string[] = defaultImages.hotels

  @Input() item: any

  data = signal<any>(null)
  isLoading = signal<boolean>(false)

  deleteCartItem(id: any) {
    this.isLoading.set(true)

    this.api.delete(['shoppingcart', id].join('/'), null).subscribe({
      next: () => {
        this.toast.show({
          severity: 'success',
          summary: 'success',
          detail: 'delete_cart_item_success_message',
          life: 3000
        });
        this.cart.loadCart();
        this.isLoading.set(false);
      },
      error: () => {
        this.toast.show({
          severity: 'error',
          summary: 'error',
          detail: 'delete_cart_item_error_message',
          life: 3000
        });
        this.isLoading.set(false);
      }
    })
  }
}
