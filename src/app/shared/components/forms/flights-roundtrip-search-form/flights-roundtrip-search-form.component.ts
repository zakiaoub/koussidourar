import { Component, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SubmitComponent } from '@app/shared/components/fields/submit/submit.component';
import { CommonModule } from '@angular/common';
import { TranslationModule } from '@app/core/modules/translation.module';
import { format, parse } from 'date-fns';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AutocompleteSuggetionsComponent } from '@app/shared/components/templates/autocomplete-suggetions/autocomplete-suggetions.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DatePicker } from 'primeng/datepicker';
import { Airport } from '@app/core/models/airport.interface';
import { FLIGHTS_SUGGETIONS } from '@app/shared/constants/suggestions.constant';
import { LoaderCityComponent } from "@app/shared/components/widgets/loader-city/loader-city.component";
import { FormDataService } from '@app/core/services/form-data.service';
import { HistoryService } from '@app/core/services/history.service';
import { ToastService } from '@app/core/services/toast.service';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { GuestsFieldComponent } from '@app/shared/components/fields/guests-field/guests-field.component';
import { ReqService } from '@app/core/services/req.service';

@Component({
  selector: 'app-flights-roundtrip-search-form',
  imports: [GuestsFieldComponent, FormsModule, SubmitComponent, CommonModule, TranslationModule, AutocompleteSuggetionsComponent, AutoCompleteModule, DatePicker, LoaderCityComponent, IconComponent],
  templateUrl: './flights-roundtrip-search-form.component.html',
  styleUrl: './flights-roundtrip-search-form.component.css',
  animations: [
    trigger('rotateIcon', [
      state('default', style({ transform: 'rotate(0deg)' })),
      state('rotated', style({ transform: 'rotate(360deg)' })),
      transition('default <=> rotated', animate('0.5s ease-in-out')),
    ])
  ]
})
export class FlightsRoundtripSearchFormComponent {

  constructor(private formDataService: FormDataService, private historyService: HistoryService, private toastService: ToastService, private api: ReqService) { }

  @Input() fetchCities!: (query: string) => void;
  @Input() airports: Airport[];
  @Input() stops: string;
  @Input() refundable: boolean;
  @Input() luggages: boolean;
  @Input() isXsOrSm = signal<boolean>(false);

  departure: any = {};
  arrival: any = {};
  dates: Date[] = [];

  guestData = [
    { name: 'adults', caption: "ages_12_and_up", value: 1, min: 1, max: 6 },
    { name: 'childrens', caption: "between_2_and_12_years_old", value: 0, min: 0, max: 4 },
    { name: 'infant', caption: "under_02_years", value: 0, min: 0, max: 2 },
  ];

  isLoading = signal<boolean>(false)

  minDate = new Date();

  isSelecting = false;
  isRotated = false;
  guests: boolean = false

  showErrors = {
    arrival: false,
    departure: false,
    dates: false
  };

  ngOnInit(): void {

    const parsedData = this.formDataService.getData('flightParams')
    this.departure = {
      code: parsedData.dataPost.Itineraries[0].DepartureCode,
      destination: parsedData.dataPost.Itineraries[0].Deprature,
      country_id: parsedData.dataPost.Itineraries[0].DepartureCountryId,
      country_name: parsedData.dataPost.Itineraries[0].DepartureCountryName,
      city_name: parsedData.dataPost.Itineraries[0].DepartureCityName,
      type: parsedData.dataPost.Itineraries[0].DepartureType,
    };

    this.arrival = {
      code: parsedData.dataPost.Itineraries[0].ArrivalCode,
      destination: parsedData.dataPost.Itineraries[0].Arrival,
      country_id: parsedData.dataPost.Itineraries[0].ArrivalCountryId,
      country_name: parsedData.dataPost.Itineraries[0].ArrivalCountryName,
      city_name: parsedData.dataPost.Itineraries[0].ArrivalCityName,
      type: parsedData.dataPost.Itineraries[0].ArrivalType,
    };

    this.dates = [
      parse(parsedData.dataPost.Itineraries[0].Date, 'yyyy-MM-dd', new Date()),
      parse(parsedData.dataPost.Itineraries[1].Date, 'yyyy-MM-dd', new Date()),
    ];

    this.guestData[0].value = parsedData.dataPost.Adult;
    this.guestData[1].value = parsedData.dataPost.Child;
    this.guestData[2].value = parsedData.dataPost.Infant;
  }

  onDepartureChange(event: any, target?: any) {
    this.isSelecting = true;
    this.departure = event.value;
    if (this.departure) {
      this.showErrors.departure = false;
      setTimeout(() => {
        const inputElement = document.getElementById('arrivalInput');
        if (inputElement) {
          inputElement.focus();
          target.show()
        }
        this.isSelecting = false;
      }, 10);
    }
  }

  onArrivalChange(event: any) {
    this.isSelecting = true;
    this.arrival = event.value;
    if (this.arrival) {
      this.showErrors.arrival = false;

      setTimeout(() => {
        const inputElement = document.getElementById('datepickerInput');
        if (inputElement) {
          inputElement.click();
        }
        this.isSelecting = false;
      }, 10);
    }
  }

  onDatesChange(dates: Date[]) {
    this.dates = dates;
    this.showErrors.dates = !dates;

    if (dates && dates.length === 2 && dates[0] instanceof Date && dates[1] instanceof Date) {
      setTimeout(() => {
        this.guests = true;
      }, 10);
    }
  }

  onFocus(event: any, target: string) {
    if (this.isSelecting) return;
    this[target] = {};
    this.airports = this.historyService.getHistory(target + 'Flight', FLIGHTS_SUGGETIONS);
    setTimeout(() => {
      event.show();
    }, 10);
  }

  onDepartureFocus(event: any) {
    this.onFocus(event, 'departure');
  }

  onArrivalFocus(event: any) {
    this.onFocus(event, 'arrival');
  }

  swapLocations() {
    const temp = this.departure;
    this.departure = this.arrival;
    this.arrival = temp;
    this.isRotated = !this.isRotated;
  }

  onSubmit() {
    this.showErrors.departure = !(this.departure && this.departure.destination);
    this.showErrors.arrival = !(this.arrival && this.arrival.destination);

    this.showErrors.dates = !(this.dates[0] instanceof Date && this.dates[1] instanceof Date);

    if (this.showErrors.departure || this.showErrors.arrival || this.showErrors.dates) {
      return;
    }

    this.isLoading.set(true)

    const payload = {
      "dataPost": {
        "Trip": "RT",
        "Adult": this.guestData[0].value,
        "Child": this.guestData[1].value,
        "Infant": this.guestData[2].value,
        "Cabin": "ALL",
        "Stops": this.stops,
        "ExactDates": 'c2',
        "RefundableFares": this.refundable,
        "AirlineInclude": [],
        "AirlineExclude": [],
        "withLuggage": this.luggages,
        "Itineraries": [
          {
            "Ref": 1,
            "Deprature": this.departure['destination'],
            "DepartureCountryName": this.departure['country_name'],
            "DepartureCityName": this.departure['city_name'],
            "DepartureCountryId": this.departure['country_id'],
            "DepartureCode": this.departure['code'],
            "DepartureType": this.departure['type'],
            "Arrival": this.arrival['destination'],
            "ArrivalCountryName": this.arrival['country_name'],
            "ArrivalCityName": this.arrival['city_name'],
            "ArrivalCountryId": this.arrival['country_id'],
            "ArrivalCode": this.arrival['code'],
            "ArrivalType": this.arrival['type'],
            "Date": this.dates[0] ? format(this.dates[0], 'yyyy-MM-dd') : ''
          },
          {
            "Ref": 2,
            "Deprature": this.arrival['destination'],
            "DepartureCountryName": this.arrival['country_name'],
            "DepartureCityName": this.arrival['city_name'],
            "DepartureCountryId": this.arrival['country_id'],
            "DepartureCode": this.arrival['code'],
            "DepartureType": this.arrival['type'],
            "Arrival": this.departure['destination'],
            "ArrivalCountryName": this.departure['country_name'],
            "ArrivalCityName": this.departure['city_name'],
            "ArrivalCountryId": this.departure['country_id'],
            "ArrivalCode": this.departure['code'],
            "ArrivalType": this.departure['type'],
            "Date": this.dates[1] ? format(this.dates[1], 'yyyy-MM-dd') : ''
          }
        ]
      }
    }

    this.api.post(['flight', 'availability'].join('/'), payload).subscribe({
      next: (response: any) => {
        this.historyService.addToHistory('departureFlight', FLIGHTS_SUGGETIONS, this.departure);
        this.historyService.addToHistory('arrivalFlight', FLIGHTS_SUGGETIONS, this.arrival);
        this.formDataService.sendData('flightParams', payload);

        this.isLoading.set(false)

        if (response?.result?.count > 0) {
          var date = response?.result?.first_date.split('-');
          localStorage.setItem('exchangeRate', response?.result?.exchangeRate)
          window.location.href = ['flights', 'results', response?.result?.searchToken, date[2], date[1], date[0]].join('/')
        } else {
          this.toastService.show({ severity: 'warn', summary: 'we_are_sorry', detail: 'no_results_found_for_your_search', life: 3000 });
        }
      },
      error: () => {
        this.toastService.show({ severity: 'error', summary: 'error', detail: 'error_request', life: 3000 });
        this.isLoading.set(false)
      }
    })
  }

}
