import { Component, ElementRef, Input, signal, ViewChild } from '@angular/core';
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
import { AmountComponent } from '@app/shared/components/settings/components/amount/amount.component';
import { LogoComponent } from '@app/shared/components/logo/logo.component';
import airlines from '@assets/json/airlines.json';
import { Airline } from '@app/core/models/airline.interface';
import { ApiService } from '@app/core/services/api.service';

@Component({
  selector: 'app-flights-booking-form',
  imports: [CommonModule, TranslationModule, FormsModule, ReactiveFormsModule, ButtonComponent, CheckoutFlightRecapComponent, SessionTimeComponent, CheckboxModule, FlightRulesComponent, BookingPaxesFieldsComponent, BookingContactFieldsComponent, SkeletonBookingComponent, SessionExpiredComponent, StepperComponent, ErrorRequestComponent, AmountComponent, LogoComponent],
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
    public cart: CartService,
    private apiService: ApiService
  ) { }

  @ViewChild('paymentForm') paymentForm!: ElementRef<HTMLFormElement>;

  @Input() popupMode: boolean = false;
  @Input() inputSearchToken?: string;
  @Input() inputRateKey?: string;
  @Input() inputDay?: string;
  @Input() inputMonth?: string;
  @Input() inputYear?: string;
  @Input() inputCarrierCode?: string;
  @Input() inputRateCategory?: string;

  checkoutForm: FormGroup;

  airlines: Airline[] = airlines as any;

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

  proceedToPaymentAfterCart = signal<boolean>(false)

  paymentDataForm: any

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
      cardName: new FormControl(null),
      cardNumber: new FormControl(null),
      expDate: new FormControl(null),
      cvv: new FormControl(null),
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
        this.data.set(response?.result);
        this.city = response?.result?.dataPost?.Itineraries[0]?.ArrivalCityName + ' , ' + response?.result?.dataPost?.Itineraries[0]?.ArrivalCountryName
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
    this.proceedToPaymentAfterCart.set(false);
    this.submitCartFlow();
  }

  proceedToPayment() {
    this.proceedToPaymentAfterCart.set(true);
    this.submitCartFlow();
  }

  private async submitPayment(bookingId: any) {
    try {
      this.isSubmiting.set(true);
      const response = await this.apiService.postData(`payment/shoppingcart`, {
        bookingIds: [bookingId]
      });

      this.paymentDataForm = response?.result?.[0];

      setTimeout(() => {
        this.paymentForm?.nativeElement?.requestSubmit();
      }, 0);
    } catch (error) {
      this.isSubmiting.set(false);
      this.toastService.show({ severity: 'error', summary: 'error', detail: 'error_request', life: 3000 });
    }
  }

  private submitCartFlow() {
    if (!this.popupMode && !this.isPaymentValid()) {
      this.toastService.show({ severity: 'warn', summary: 'missing_required_fields', detail: 'missing_required_fields_caption', life: 5000 });
      return;
    }

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

          if (this.popupMode && this.proceedToPaymentAfterCart()) {
            this.submitPayment(response?.result?.preBooking);
            return;
          }
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

  private isPaymentValid() {
    const formValue = this.checkoutForm.value;
    const cardName = (formValue.cardName || '').trim();
    const cardNumber = (formValue.cardNumber || '').replace(/\s+/g, '');
    const expDate = (formValue.expDate || '').trim();
    const cvv = (formValue.cvv || '').trim();
    return !!cardName && cardNumber.length === 16 && /^\d{2}\/\d{2}$/.test(expDate) && cvv.length >= 3;
  }

  formatCardNumber(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = (input.value || '').replace(/\D/g, '').slice(0, 16);
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    this.checkoutForm.get('cardNumber')?.setValue(value, { emitEvent: false });
  }

  formatExpDate(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = (input.value || '').replace(/\D/g, '').slice(0, 4);
    if (value.length > 2) value = `${value.slice(0, 2)}/${value.slice(2)}`;
    this.checkoutForm.get('expDate')?.setValue(value, { emitEvent: false });
  }

  formatCvv(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = (input.value || '').replace(/\D/g, '').slice(0, 4);
    this.checkoutForm.get('cvv')?.setValue(value, { emitEvent: false });
  }

  paxGroupById(paxId: string): FormGroup {
    return this.checkoutForm.get(['paxes', paxId]) as FormGroup;
  }

  paxTypeLabel(pax: any): string {
    const type = (pax?.PaxType || '').toUpperCase();
    if (type === 'ADT') return 'Adulte';
    if (type === 'CHD') return 'Enfant';
    if (type === 'INF') return 'Bebe';
    return 'Voyageur';
  }

  getAdditionalProducts() {
    const source = this.data() || {};
    const candidates = [
      ...(Array.isArray(source?.hotelItems) ? source.hotelItems : []),
      ...(Array.isArray(source?.attractionItems) ? source.attractionItems : []),
      ...(Array.isArray(source?.transferItems) ? source.transferItems : []),
      ...(Array.isArray(source?.otherItems) ? source.otherItems : [])
    ];
    return candidates.slice(0, 4);
  }

  getFlightPrice(): number {
    const totalAmount = this.data()?.totalAmount;
    if (typeof totalAmount === 'number') return totalAmount;
    if (totalAmount && this.rateCategory && typeof totalAmount[this.rateCategory] === 'number') {
      return totalAmount[this.rateCategory];
    }
    if (totalAmount && typeof totalAmount['default'] === 'number') {
      return totalAmount['default'];
    }
    return 0;
  }

  getAdditionalProductsTotal(): number {
    return this.getAdditionalProducts().reduce((sum: number, item: any) => {
      const amount = Number(item?.amount ?? item?.price ?? 0);
      return sum + (Number.isFinite(amount) ? amount : 0);
    }, 0);
  }

  getGrandTotal(): number {
    return this.getFlightPrice() + this.getAdditionalProductsTotal();
  }

  getUniqueCarrierCodes(): string[] {
    const itineraries = this.data()?.itineraries;
    if (!Array.isArray(itineraries)) return [];

    const codes = new Set<string>();
    for (const itinerary of itineraries) {
      const segments = itinerary?.Segments;
      if (!Array.isArray(segments)) continue;
      for (const seg of segments) {
        const code = (seg?.MarketingCarrier || seg?.Operator || seg?.CarrierCode || '').toString().trim();
        if (code) codes.add(code);
      }
    }

    if (codes.size === 0 && this.carrierCode) codes.add(this.carrierCode);
    return Array.from(codes);
  }

  getAirlineLogoUrl(code: string): string {
    if (!code) return '';
    const match: any = (this.airlines || []).find((a: any) => (a?.id || '').toString().toUpperCase() === code.toUpperCase());
    return match?.logo || '';
  }
}
