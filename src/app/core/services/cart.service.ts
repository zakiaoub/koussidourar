import { Injectable, signal } from '@angular/core';
import { ReqService } from './req.service';

@Injectable({
    providedIn: 'root'
})

export class CartService {

    constructor(private api: ReqService) { }

    cartModal = signal<boolean>(false);
    cartData = signal<any>(null);
    count = signal<any>(null);
    error = signal<boolean>(false);
    isLoading = signal<boolean>(false);

    open() {
        this.loadCart();
        this.cartModal.set(true);
    }

    close() {
        this.cartModal.set(false);
    }

    loadCart() {
        this.isLoading.set(true);
        this.error.set(true);

        this.api.get('shoppingcart/to-paid').subscribe({
            next: (res: any) => {
                this.cartData.set(res?.result);
                this.error.set(false);
                this.isLoading.set(false);

            },
            error: () => {
                this.error.set(true);
                this.isLoading.set(false);
            }
        });
    }

}