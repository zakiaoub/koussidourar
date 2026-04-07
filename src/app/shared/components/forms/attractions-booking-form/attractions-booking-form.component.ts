import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationModule } from '@app/core/modules/translation.module';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonComponent } from '@app/shared/components/widgets/button/button.component';
import { SessionTimeComponent } from '../../settings/templates/session-time/session-time.component';
import { CheckboxModule } from 'primeng/checkbox';
import { ActivatedRoute } from '@angular/router';
import { ProductCancellationPolicyComponent } from '@app/shared/components/templates/product-cancellation-policy/product-cancellation-policy.component';
import { SkeletonBookingComponent } from '@app/shared/components/loaders/skeleton-booking/skeleton-booking.component';
import { SessionExpiredComponent } from '@app/shared/components/settings/templates/session-expired/session-expired.component';
import { ToastService } from '@app/core/services/toast.service';
import { StepperComponent } from "@app/shared/components/widgets/stepper/stepper.component";
import { ReqService } from '@app/core/services/req.service';
import { ErrorRequestComponent } from '@app/shared/components/errors/error-request/error-request.component';
import { CheckoutAttractionRecapComponent } from '@app/features/attractions/components/checkout-attraction-recap/checkout-attraction-recap.component';
import { BookingPaxesFieldsComponent } from '../../fields/booking-paxes-fields/booking-paxes-fields.component';
import { BookingContactFieldsComponent } from '../../fields/booking-contact-fields/booking-contact-fields.component';
import { ScrollService } from '@app/core/services/scroll.service';
import { CartService } from '@app/core/services/cart.service';

@Component({
  selector: 'app-attractions-booking-form',
  imports: [CommonModule, TranslationModule, CheckoutAttractionRecapComponent, FormsModule, DropdownModule, ReactiveFormsModule, ButtonComponent, SessionTimeComponent, CheckboxModule, BookingPaxesFieldsComponent, ProductCancellationPolicyComponent, BookingContactFieldsComponent, SkeletonBookingComponent, SessionExpiredComponent, StepperComponent, ErrorRequestComponent],
  templateUrl: './attractions-booking-form.component.html',
  styleUrl: './attractions-booking-form.component.css'
})

export class AttractionsBookingFormComponent {

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastService: ToastService,
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
  activityCode: string
  rateKey: string
  activityName: any
  terms: boolean = false

  isCartAdded = signal<boolean>(false)

  ngOnInit(): void {
    this.searchToken = this.route.snapshot.paramMap.get('searchToken');
    this.activityCode = this.route.snapshot.paramMap.get('activityCode');
    this.rateKey = this.route.snapshot.paramMap.get('rateKey');
    this.activityName = this.route.snapshot.paramMap.get('activityName');

    this.checkoutForm = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required]),
      specialRequests: new FormControl(null, [Validators.minLength(20), Validators.maxLength(300)]),
      paxes: this.fb.group({})
    });
    this.getActivity()
  }

  loadPaxes() {
    const paxGroup = this.checkoutForm.get('paxes') as FormGroup;

    this.data().paxes.forEach((pax: any) => {
      paxGroup.addControl(pax.PaxId, this.fb.group({
        Gender: new FormControl(pax?.Gender?.[0] || null, [Validators.required]),
        Title: new FormControl(pax?.Title?.[0] || null, [Validators.required]),
        FirstName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
        LastName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      }));
    });
  }

  getActivity() {
    this.isLoading.set(true)

    this.api.get(['activity', 'detail', this.activityCode, this.searchToken, this.rateKey].join('/')).subscribe({
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

    this.api.post(['activity', 'prebooking', this.activityCode, this.searchToken, this.rateKey].join('/'), this.dataBook()).subscribe({
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
