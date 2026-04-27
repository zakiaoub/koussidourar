import { Component, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SubmitComponent } from '../../../../shared/components/fields/submit/submit.component';
import { CommonModule } from '@angular/common';
import { TranslationModule } from '../../../../core/modules/translation.module';
import { format, parse } from 'date-fns';
import { ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AutocompleteSuggetionsComponent } from '@app/shared/components/templates/autocomplete-suggetions/autocomplete-suggetions.component';
import { DatePicker } from 'primeng/datepicker';
import { FormDataService } from '@app/core/services/form-data.service';
import { ParseDataService } from '@app/core/services/parse-data.service';
import { ToastService } from '@app/core/services/toast.service';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { GuestsFieldComponent } from '@app/shared/components/fields/guests-field/guests-field.component';
import { ReqService } from '@app/core/services/req.service';


@Component({
  selector: 'app-flights-multi-search-form',
  imports: [GuestsFieldComponent, FormsModule, SubmitComponent, CommonModule, TranslationModule, AutoCompleteModule, AutocompleteSuggetionsComponent, DatePicker, IconComponent],
  templateUrl: './flights-multi-search-form.component.html',
  styleUrl: './flights-multi-search-form.component.css',
  animations: [
    trigger('rotateIcon', [
      state('default', style({ transform: 'rotate(0deg)' })),
      state('rotated', style({ transform: 'rotate(360deg)' })),
      transition('default <=> rotated', animate('0.5s ease-in-out')),
    ])
  ]
})

export class FlightsMultiSearchFormComponent {
  constructor(
    private route: ActivatedRoute,
    private formDataService: FormDataService,
    private parseDataService: ParseDataService,
    private toastService: ToastService,
    private api: ReqService
  ) {
  }

  @Input() fetchCities!: (query: string) => void;
  @Input() airports: any;
  @Input() stops: string
  @Input() refundable: boolean;
  @Input() luggages: boolean;

  departure: any = {};
  arrival: any = {};
  date: Date | undefined;

  minDate = new Date();

  guestData = [
    { name: 'adults', caption: "ages_12_and_up", value: 1, min: 1, max: 6 },
    { name: 'childrens', caption: "between_2_and_12_years_old", value: 0, min: 0, max: 4 },
    { name: 'infant', caption: "under_02_years", value: 0, min: 0, max: 2 },
  ];

  itineraries: any[] = [{
    ref: 1,
    departure: {},
    arrival: {},
    date: undefined
  },
  {
    ref: 2,
    departure: {},
    arrival: {},
    date: undefined
  }];

  showErrors: { arrival: boolean; departure: boolean; date: boolean }[] = [];

  isLoading = signal<boolean>(false)
  isRotated: boolean[] = [];

  ngOnInit(): void {
    this.showErrors = this.itineraries.map(() => ({
      arrival: false,
      departure: false,
      date: false
    }));

    this.isRotated = this.itineraries.map(() => false);

    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        const parsedData = this.parseDataService.decode(params['data']);

        this.itineraries = parsedData.dataPost.Itineraries.map((itinerary: any) => ({
          departure: {
            code: itinerary.DepartureCode,
            destination: itinerary.Deprature,
            country_id: itinerary.DepartureCountryId,
            country_name: itinerary.DepartureCountryName,
            city_name: itinerary.DepartureCityName,
            type: itinerary.DepartureType,
          },
          arrival: {
            code: itinerary.ArrivalCode,
            destination: itinerary.Arrival,
            country_id: itinerary.ArrivalCountryId,
            country_name: itinerary.ArrivalCountryName,
            city_name: itinerary.ArrivalCityName,
            type: itinerary.ArrivalType,
          },
          date: parse(itinerary.Date, 'yyyy-MM-dd', new Date()),
        }));

        this.guestData = [
          { name: 'adults', caption: "adults_caption", value: parsedData.dataPost.Adult || 1, min: 1, max: 6 },
          { name: 'childs', caption: "childs_caption", value: parsedData.dataPost.Child || 0, min: 0, max: 4 },
          { name: 'babies', caption: "babies_caption", value: parsedData.dataPost.Infant || 0, min: 0, max: 2 },
        ];
        this.isRotated = this.itineraries.map(() => false);
        this.showErrors = this.itineraries.map(() => ({
          arrival: false,
          departure: false,
          date: false
        }));
      }
    });
  }

  swapLocations(index: number) {
    const itin = this.itineraries[index];
    [itin.departure, itin.arrival] = [itin.arrival, itin.departure];
    this.isRotated[index] = !this.isRotated[index];
  }

  getMinDate(index: number): Date {
    if (index === 0) {
      return this.minDate;
    }
    const prevDate = this.itineraries[index - 1].date;
    return prevDate instanceof Date ? prevDate : this.minDate;
  }


  addFlight() {
    const newRef = this.itineraries.length + 1;
    this.itineraries.push({
      ref: newRef,
      departure: {},
      arrival: {},
      date: undefined
    });

    this.showErrors.push({ arrival: false, departure: false, date: false });

    if (this.isRotated.length < this.itineraries.length) {
      this.isRotated.push(false);
    }
  }

  removeFlight(index: number) {
    if (this.itineraries.length > 1) {
      this.itineraries.splice(index, 1);
      this.showErrors.splice(index, 1);
    }
  }

  onArrivalChange(selectedArrival: any, currentIndex: number) {
    if (!this.showErrors[currentIndex]) {
      this.showErrors[currentIndex] = { arrival: false, departure: false, date: false };
    }

    const newItineraries = [...this.itineraries];

    newItineraries[currentIndex].arrival = { ...selectedArrival };
    this.showErrors[currentIndex].arrival = false;

    if (currentIndex < newItineraries.length - 1) {
      const nextIndex = currentIndex + 1;

      if (!this.showErrors[nextIndex]) {
        this.showErrors[nextIndex] = { arrival: false, departure: false, date: false };
      }

      newItineraries[nextIndex].departure = { ...selectedArrival };
      this.showErrors[nextIndex].departure = false;
    }

    this.itineraries = newItineraries;
  }

  onSubmit() {
    this.showErrors = this.itineraries.map(itin => ({
      departure: !itin.departure?.destination,
      arrival: !itin.arrival?.destination,
      date: !(itin.date instanceof Date),
    }));

    if (this.showErrors.some(error => error.departure || error.arrival || error.date)) {
      return;
    }

    this.isLoading.set(true)

    const payload = {
      "dataPost": {
        "Trip": "MD",
        "Adult": this.guestData[0].value,
        "Child": this.guestData[1].value,
        "Infant": this.guestData[2].value,
        "Cabin": "ALL",
        "Stops": this.stops,
        "ExactDates": 'e',
        "RefundableFares": this.refundable,
        "AirlineInclude": [],
        "AirlineExclude": [],
        "withLuggage": this.luggages,
        "Itineraries": this.itineraries.map((itin, index) => ({
          "Ref": index + 1,
          "Deprature": itin.departure.destination,
          "DepartureCountryName": itin.departure.country_name,
          "DepartureCityName": itin.departure.city_name,
          "DepartureCountryId": itin.departure.country_id,
          "DepartureCode": itin.departure.code,
          "DepartureType": itin.departure.type,
          "Arrival": itin.arrival.destination,
          "ArrivalCountryName": itin.arrival.country_name,
          "ArrivalCityName": itin.arrival.city_name,
          "ArrivalCountryId": itin.arrival.country_id,
          "ArrivalCode": itin.arrival.code,
          "ArrivalType": itin.arrival.type,
          "Date": itin.date ? format(itin.date, 'yyyy-MM-dd') : ''
        }))
      }
    }

    this.api.post(['flight', 'availability'].join('/'), payload).subscribe({
      next: (response: any) => {
        this.formDataService.sendData('flightParams', payload);

        if (response.result.count > 0) {
          var date = response.result.first_date.split('-');
          localStorage.setItem('exchangeRate', response.result.exchangeRate)
          window.location.href = ['flights', 'results', response.result.searchToken, date[2], date[1], date[0]].join('/')
        } else {
          this.toastService.show({ severity: 'warn', summary: 'we_are_sorry', detail: 'no_results_found_for_your_search', life: 3000 });
        }

        this.isLoading.set(false)
      },
      error: () => {
        this.toastService.show({ severity: 'error', summary: 'error', detail: 'error_request', life: 3000 });
        this.isLoading.set(false)
      }
    })
  }
}
