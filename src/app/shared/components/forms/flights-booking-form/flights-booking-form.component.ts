import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationModule } from '@app/core/modules/translation.module';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ButtonComponent } from '@app/shared/components/widgets/button/button.component';
import { CheckoutFlightRecapComponent } from '@features/flights/components/checkout-flight-recap/checkout-flight-recap.component';
import { SessionTimeComponent } from '@app/shared/components/settings/templates/session-time/session-time.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FlightRulesComponent } from "@features/flights/components/flight-rules/flight-rules.component";
import { ActivatedRoute } from '@angular/router';
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
import { environment } from 'environments/environment';

@Component({
  selector: 'app-flights-booking-form',
  imports: [CommonModule, TranslationModule, FormsModule, ReactiveFormsModule, ButtonComponent, CheckoutFlightRecapComponent, SessionTimeComponent, CheckboxModule, FlightRulesComponent, BookingPaxesFieldsComponent, BookingContactFieldsComponent, SkeletonBookingComponent, SessionExpiredComponent, StepperComponent, ErrorRequestComponent],
  templateUrl: './flights-booking-form.component.html',
  styleUrl: './flights-booking-form.component.css'
})

export class FlightsBookingFormComponent {
  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private api: ReqService,
    private scroll: ScrollService,
    public cart: CartService
  ) { }

  @Input() popupMode: boolean = false;
  @Input() inputSearchToken?: string;
  @Input() inputRateKey?: string;
  @Input() inputDay?: string;
  @Input() inputMonth?: string;
  @Input() inputYear?: string;
  @Input() inputCarrierCode?: string;
  @Input() inputRateCategory?: string;

  checkoutForm: FormGroup;

  isLoading = signal<boolean>(false)
  error = signal<boolean>(false)
  data = signal<any>(null)
  isSubmiting = signal<boolean>(false)
  dataBook = signal<any>(null)

  searchToken: any
  rateKey: any
  day: any
  month: any
  year: any
  carrierCode: string
  city: string
  rateCategory: string
  terms: boolean = false

  isCartAdded = signal<boolean>(false)

  ngOnInit(): void {
    this.searchToken = this.popupMode ? this.inputSearchToken : this.route.snapshot.paramMap.get('searchToken');
    this.carrierCode = this.popupMode ? this.inputCarrierCode : this.route.snapshot.paramMap.get('carrierCode');
    this.day = this.popupMode ? this.inputDay : this.route.snapshot.paramMap.get('day');
    this.month = this.popupMode ? this.inputMonth : this.route.snapshot.paramMap.get('month');
    this.year = this.popupMode ? this.inputYear : this.route.snapshot.paramMap.get('year');
    this.rateKey = this.popupMode ? this.inputRateKey : this.route.snapshot.paramMap.get('rateKey');
    this.rateCategory = this.popupMode ? this.inputRateCategory : this.route.snapshot.paramMap.get('rateCategory');


    this.checkoutForm = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required]),
      specialRequests: new FormControl(null, [Validators.minLength(20), Validators.maxLength(300)]),
      paxes: this.fb.group({})
    });

    this.getFlight();
  }

  loadPaxes() {
    const paxGroup = this.checkoutForm.get('paxes') as FormGroup;

    this.data().paxes.forEach((pax: any) => {

      const paxForm = this.fb.group({
        Gender: new FormControl(pax?.Gender?.[0] || null, [Validators.required]),
        Title: new FormControl(pax?.Title?.[0] || null, [Validators.required]),
        FirstName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
        LastName: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
        DateOfBirth: new FormControl(null, [Validators.required]),
        ExpiryDate: new FormControl(null, [Validators.required]),
        Nationality: new FormControl(null, [Validators.required]),
        PassportCountry: new FormControl(null, [Validators.required]),
        PassportNumber: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      });

      paxForm.get('Nationality')?.valueChanges.subscribe(value => {
        paxForm.get('PassportCountry')?.setValue(value);
      });

      paxGroup.addControl(pax.PaxId, paxForm);
    });
  }

  getFlight() {
    this.isLoading.set(true)

    this.api.get(['flight', 'detail', this.searchToken, this.day, this.month, this.year, this.rateKey, this.rateCategory].join('/')).subscribe({
      next: (response: any) => {
        if (!environment.production) {
          console.log('[flight/detail] raw response:', response);
          console.log('[flight/detail] result.rateComment (conditions):', response?.result?.rateComment);
        }
        this.data.set(response?.result);
        if (!environment.production) {
          console.log('[flight/detail] component data() after set:', this.data());
        }
        this.city = response?.result?.dataPost?.Itineraries[0]?.ArrivalCityName + ' , ' + response?.result?.dataPost?.Itineraries[0]?.ArrivalCountryName
        this.loadPaxes()
        this.isLoading.set(false);
      },
      error: (err: any) => {
        if (!environment.production) {
          console.error('[flight/detail] request error:', err);
        }
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
        ...formValue.paxes,
        comment: formValue.specialRequests,
        phone: formValue.phone,
        email: formValue.email,
      }
    });

    this.api.post(['flight', 'prebooking', this.searchToken, this.day, this.month, this.year, this.rateKey, this.rateCategory].join('/'), this.dataBook()).subscribe({
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
