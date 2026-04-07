import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { TranslationModule } from '@modules/translation.module';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { SpinnerComponent } from '@app/shared/components/loaders/spinner/spinner.component';
import { ReqService } from '@app/core/services/req.service';

interface Option {
  label: string;
  icon: string;
  color: string;
  value: number;
}

@Component({
  selector: 'app-bookings-numbers',
  imports: [CommonModule, TranslationModule, IconComponent, SpinnerComponent],
  templateUrl: './bookings-numbers.component.html',
  styleUrl: './bookings-numbers.component.css'
})

export class BookingsNumbersComponent {

  constructor(
    private api: ReqService,
  ) { }

  isLoading = signal<boolean>(false)
  error = signal<boolean>(false)

  options: Option[] = [
    { label: "confirmed_bookings", icon: "calendar2-check", color: "green-text", value: 0 },
    { label: "cancelled_bookings", icon: "calendar2-x", color: "red-text", value: 0 },
    { label: "paid_bookings", icon: "check-circle-fill", color: "green-text", value: 0 },
    { label: "unpaid_bookings", icon: "x-circle-fill", color: "red-text", value: 0 },
  ]

  ngOnInit(): void {
    this.getNumbers();
  }

  getNumbers() {
    this.isLoading.set(true)

    this.api.get(['account', 'dashboard'].join('/')).subscribe({
      next: (response: any) => {
        this.options[0].value = response?.result?.totalBookingConfirmed;
        this.options[1].value = response?.result?.totalBookingCanceled;
        this.options[2].value = response?.result?.totalBookingPaid;
        this.options[3].value = response?.result?.totalBookingUnpaid;
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set(true)
        this.isLoading.set(false);
      }
    })
  }
}
