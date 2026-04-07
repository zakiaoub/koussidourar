import { CommonModule } from '@angular/common';
import { Component, ElementRef, input, signal, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../widgets/button/button.component';
import { ApiService } from '@app/core/services/api.service';
import { ToastService } from '@app/core/services/toast.service';

@Component({
  selector: 'app-cart-form',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './cart-form.component.html',
  styleUrl: './cart-form.component.css'
})

export class CartFormComponent {

  constructor(
    private apiService: ApiService,
    private toastService: ToastService
  ) { }

  @ViewChild('paymentForm') formElement!: ElementRef;

  data = input<any>();
  paymentDataForm: any
  isSubmiting = signal<boolean>(false)

  ids = []


  loadPayment() {
    this.isSubmiting.set(true)
    this.apiService.postData(`payment/shoppingcart`,
      {
        "bookingIds":
          this.data().ids
      }
    ).then(response => {
      this.paymentDataForm = response.result[0]
      setTimeout(() => {
        this.formElement.nativeElement.requestSubmit();
      }, 3000);
    })
      .catch(error => {
        this.isSubmiting.set(false)
        this.toastService.show({ severity: 'error', summary: 'error', detail: 'error_request', life: 3000 });
      });
  }
}
