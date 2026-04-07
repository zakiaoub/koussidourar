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
import { Airport } from '../../../../core/models/airport.interface';
import { FLIGHTS_SUGGETIONS } from '../../../../shared/constants/suggestions.constant';
import { LoaderCityComponent } from "../../../../shared/components/widgets/loader-city/loader-city.component";
import { FormDataService } from '@app/core/services/form-data.service';
import { ParseDataService } from '@app/core/services/parse-data.service';
import { HistoryService } from '@app/core/services/history.service';
import { ToastService } from '@app/core/services/toast.service';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { GuestsFieldComponent } from '@app/shared/components/fields/guests-field/guests-field.component';
import { ReqService } from '@app/core/services/req.service';

@Component({
  selector: 'app-flights-oneway-search-form',
  imports: [GuestsFieldComponent, FormsModule, SubmitComponent, CommonModule, TranslationModule, AutoCompleteModule, AutocompleteSuggetionsComponent, DatePicker, LoaderCityComponent, IconComponent],
  templateUrl: './flights-oneway-search-form.component.html',
  styleUrl: './flights-oneway-search-form.component.css',
  animations: [
    trigger('rotateIcon', [
      state('default', style({ transform: 'rotate(0deg)' })),
      state('rotated', style({ transform: 'rotate(360deg)' })),
      transition('default <=> rotated', animate('0.5s ease-in-out')),
    ])
  ]
})
export class FlightsOnewaySearchFormComponent {
  
  constructor(private route: ActivatedRoute, private formDataService: FormDataService, private parseDataService: ParseDataService, private historyService: HistoryService, private toastService: ToastService, private api: ReqService) {
  }

  @Input() fetchCities!: (query: string) => void;
  @Input() airports: Airport[];
  @Input() stops: string
  @Input() refundable: boolean;
  @Input() luggages: boolean;

  departure: any = {};
  arrival: any = {};
  date: Date | undefined;

  guestData = [
    { name: 'adults', caption: "ages_12_and_up", value: 1, min: 1, max: 6 },
    { name: 'childrens', caption: "between_2_and_12_years_old", value: 0, min: 0, max: 4 },
    { name: 'infant', caption: "under_02_years", value: 0, min: 0, max: 2 },
  ];

  minDate = new Date();
  isLoading = signal<boolean>(false)
  isSelecting = false;
  isRotated = false;
  guests: boolean = false

  showErrors = {
    arrival: false,
    departure: false,
    date: false
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

    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        const parsedData = this.parseDataService.decode(params['data']);

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

        this.date = parse(parsedData.dataPost.Itineraries[0].Date, 'yyyy-MM-dd', new Date());

        this.guestData[0].value = parsedData.dataPost.Adult;
        this.guestData[1].value = parsedData.dataPost.Child;
        this.guestData[2].value = parsedData.dataPost.Infant;
      }
    });
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

  onDatesChange(value: Date) {
    this.date = value;

    if (this.date) {
      this.showErrors.date = false;

      setTimeout(() => {
        this.guests = true
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

    this.showErrors.date = !(this.date instanceof Date);

    if (this.showErrors.departure || this.showErrors.arrival || this.showErrors.date) {
      return;
    }

    this.isLoading.set(true)

    const payload = {
      "dataPost": {
        "Trip": "OW",
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
            "Date": this.date ? format(this.date, 'yyyy-MM-dd') : ''
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
