import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Output, signal } from '@angular/core';
import { TranslationModule } from '@modules/translation.module';
import { TagModule } from 'primeng/tag';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { NoResultsFoundComponent } from '@app/shared/components/errors/no-results-found/no-results-found.component';
import { ReqService } from '@app/core/services/req.service';
import { ToastService } from '@app/core/services/toast.service';
import { ConfirmModalComponent } from '@app/shared/components/widgets/confirm-modal/confirm-modal.component';
import { SpinnerComponent } from '@app/shared/components/loaders/spinner/spinner.component';
import { AmountComponent } from '@app/shared/components/settings/components/amount/amount.component';
import { SessionService } from '@app/core/services/session.service';

@Component({
  selector: 'app-bookings-list',
  imports: [CommonModule, TranslationModule, TagModule, IconComponent, NoResultsFoundComponent, ConfirmModalComponent, SpinnerComponent, AmountComponent],
  templateUrl: './bookings-list.component.html',
  styleUrl: './bookings-list.component.css'
})

export class BookingsListComponent {

  constructor(
    private api: ReqService,
    private toastService: ToastService,
    private session: SessionService
  ) { }

  @Output() refreshData = new EventEmitter<any>();

  data = input<any>();
  response = signal<any>(null)
  isLoading = signal<Record<string, boolean>>({});
  bookingNumber = signal<string>(null)

  cancelItemModal: boolean = false

  showCancelItemModal() {
    this.cancelItemModal = true
  }

  closeCancelItemModal() {
    this.cancelItemModal = false
  }

  cancelBooking(bookingNumber: string) {
    this.isLoading.update(prev => ({ ...prev, [bookingNumber]: true }));

    this.api.delete(['account', 'booking', 'cancel', bookingNumber].join('/')).subscribe({
      next: (response: any) => {
        this.response.set(response?.result);
        this.bookingNumber.set(bookingNumber)
        this.showCancelItemModal()
        this.isLoading.update(prev => ({ ...prev, [bookingNumber]: false }));
      },
      error: () => {
        this.toastService.show({ severity: 'error', summary: 'error', detail: 'error_request', life: 3000 });
        this.isLoading.update(prev => ({ ...prev, [bookingNumber]: false }));
      }
    })
  }

  confirmCancellation() {
    this.api.delete(['account', 'booking', 'cancel', this.bookingNumber()].join('/') + `?charge=${this.response()?.Charge}&token=${this.response()?.Token}`).subscribe({
      next: () => {
        this.toastService.show({ severity: 'success', summary: 'operation_successful', detail: 'cancel_booking_message_success', life: 3000 });
        this.refreshData.emit();
      },
      error: () => {
        this.toastService.show({ severity: 'error', summary: 'error', detail: 'error_request', life: 3000 });
      }
    })
    this.closeCancelItemModal()
  }

}
