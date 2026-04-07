import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationModule } from '@app/core/modules/translation.module';
import { CheckoutHotelRecapComponent } from '@features/hotels/components/checkout-hotel-recap/checkout-hotel-recap.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { InputIconModule } from 'primeng/inputicon';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ButtonComponent } from '@app/shared/components/widgets/button/button.component';
import { SessionTimeComponent } from '@app/shared/components/settings/templates/session-time/session-time.component';
import { CheckboxModule } from 'primeng/checkbox';
import { ActivatedRoute } from '@angular/router';
import { ProductCancellationPolicyComponent } from '@app/shared/components/templates/product-cancellation-policy/product-cancellation-policy.component';
import { SkeletonBookingComponent } from '@app/shared/components/loaders/skeleton-booking/skeleton-booking.component';
import { SessionExpiredComponent } from '@app/shared/components/settings/templates/session-expired/session-expired.component';
import { ToastService } from '@app/core/services/toast.service';
import { StepperComponent } from "@app/shared/components/widgets/stepper/stepper.component";
import { ReqService } from '@app/core/services/req.service';
import { ErrorRequestComponent } from '@app/shared/components/errors/error-request/error-request.component';
import { BookingPaxesFieldsComponent } from '../../fields/booking-paxes-fields/booking-paxes-fields.component';
import { BookingContactFieldsComponent } from '../../fields/booking-contact-fields/booking-contact-fields.component';
import { ScrollService } from '@app/core/services/scroll.service';
import { CartService } from '@app/core/services/cart.service';

@Component({
  selector: 'app-hotels-booking-form',
  imports: [CommonModule, TranslationModule, CheckoutHotelRecapComponent, FormsModule, DropdownModule, InputTextModule, TextareaModule, InputIconModule, ReactiveFormsModule, IftaLabelModule, ButtonComponent, SessionTimeComponent, CheckboxModule, ProductCancellationPolicyComponent, BookingContactFieldsComponent, BookingPaxesFieldsComponent, SkeletonBookingComponent, SessionExpiredComponent, StepperComponent, ErrorRequestComponent],
  templateUrl: './hotels-booking-form.component.html',
  styleUrl: './hotels-booking-form.component.css'
})

export class HotelsBookingFormComponent {

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private api: ReqService,
    private scroll: ScrollService,
    public cart: CartService
  ) { }

  checkoutForm: FormGroup;

  isLoading = signal<boolean>(false)
  error = signal<boolean>(false)
  data = signal<any>(null)
  isSubmiting = signal<boolean>(false)
  dataBook = signal<any>(null)

  searchToken: string
  id: string
  rateKey: string
  terms: boolean = false

  isCartAdded = signal<boolean>(false)

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('hotelId');
    this.searchToken = this.route.snapshot.paramMap.get('searchToken');
    this.rateKey = this.route.snapshot.paramMap.get('rateKey');

    this.checkoutForm = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required]),
      specialRequests: new FormControl(null, [Validators.minLength(20), Validators.maxLength(300)]),
      paxes: this.fb.group({})
    });

    this.getCheckRate()
  }

  loadPaxes() {
    const paxGroup = this.checkoutForm.get('paxes') as FormGroup;

    if (!this.data() || !Array.isArray(this.data()?.roomPaxes)) {
      this.error.set(true);
    }

    this.data().roomPaxes.forEach((roomPax: any) => {
      roomPax.Rooms.forEach((room: any) => {
        room.Paxes.forEach((pax: any) => {
          paxGroup.addControl(pax.PaxId, this.fb.group({
            Gender: new FormControl(pax?.Gender?.[0] || null, [Validators.required]),
            Title: new FormControl(pax?.Title?.[0] || null, [Validators.required]),
            FirstName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
            LastName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
          }));
        });
      });
    });
  }

  getCheckRate() {
    this.isLoading.set(true)

    this.api.get(['hotel', 'checkrate', this.id, this.searchToken, this.rateKey].join('/')).subscribe({
      next: (response: any) => {
        this.data.set(response?.result);
        this.loadPaxes()
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set(true)
        this.isLoading.set(false);
      }
    })
  }

  getRoomGlobalIndex(outerIndex: number, innerIndex: number): number {
    let globalIndex = 0;
    const roomPaxes = this.data()?.roomPaxes || [];

    for (let i = 0; i < outerIndex; i++) {
      globalIndex += roomPaxes[i].Rooms.length;
    }

    globalIndex += innerIndex;

    return globalIndex;
  }

  addToCart() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      this.scroll.scrollTo(0);
      this.toastService.show({ severity: 'warn', summary: 'missing_required_fields', detail: 'missing_required_fields_caption', life: 6000 });
      return;
    }

    this.isSubmiting.set(true)

    const formValue = this.checkoutForm.value

    this.dataBook.set({
      dataBook: {
        Question: {
          EMAIL: formValue.email,
          PHONENUMBER: formValue.phone
        },
        comment: formValue.specialRequests,
        phone: formValue.phone,
        email: formValue.email,
        ...formValue.paxes
      }
    });

    this.api.post(['hotel', 'prebooking', this.id, this.searchToken, this.rateKey].join('/'), this.dataBook()).subscribe({
      next: (response: any) => {
        if (response?.status == true && response?.result?.preBooking != '' && response?.result?.preBooking) {
            this.isCartAdded.set(true)
          this.cart.open();
        } else {
          this.toastService.show({ severity: 'warn', summary: 'we_are_sorry', detail: 'cart_not_saved', life: 3000 });
        }
        this.isSubmiting.set(false);
      },
      error: () => {
        this.toastService.show({ severity: 'error', summary: 'error', detail: 'error_request', life: 3000 });
        this.isSubmiting.set(false);
      }
    })
  }
}
