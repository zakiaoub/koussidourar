import { Component, Input, signal } from '@angular/core';
import { GuestsFieldComponent } from '@app/shared/components/fields/guests-field/guests-field.component';
import { FormsModule } from '@angular/forms';
import { SubmitComponent } from '@app/shared/components/fields/submit/submit.component';
import { CommonModule } from '@angular/common';
import { TranslationModule } from '@app/core/modules/translation.module';
import { format, parse } from 'date-fns';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AutocompleteSuggetionsComponent } from '@app/shared/components/templates/autocomplete-suggetions/autocomplete-suggetions.component';
import { TRANSFERS_SUGGETIONS } from '@app/shared/constants/suggestions.constant';
import { DatePicker } from 'primeng/datepicker';
import { Terminal } from '@app/core/models/terminal.interface';
import { LoaderCityComponent } from '@app/shared/components/widgets/loader-city/loader-city.component';
import { FormDataService } from '@app/core/services/form-data.service';
import { SessionService } from '@app/core/services/session.service';
import { HistoryService } from '@app/core/services/history.service';
import { ToastService } from '@app/core/services/toast.service';
import { IconComponent } from '@app/shared/components/widgets/icon/icon.component';
import { ReqService } from '@app/core/services/req.service';

@Component({
  selector: 'app-transfers-search-form',
  imports: [DatePicker, GuestsFieldComponent, FormsModule, SubmitComponent, CommonModule, TranslationModule, AutoCompleteModule, AutocompleteSuggetionsComponent, LoaderCityComponent, IconComponent],
  templateUrl: './transfers-search-form.component.html',
  styleUrl: './transfers-search-form.component.css',
  animations: [
    trigger('rotateIcon', [
      state('default', style({ transform: 'rotate(0deg)' })),
      state('rotated', style({ transform: 'rotate(360deg)' })),
      transition('default <=> rotated', animate('0.5s ease-in-out')),
    ])
  ]
})

export class TransfersSearchFormComponent {
  constructor(private FormDataService: FormDataService, private SessionService: SessionService, private HistoryService: HistoryService, private toastService: ToastService, private api: ReqService) {
    this.nationality = this.SessionService.getSession().location.countryCode
  }

  @Input() fetchCities!: (query: string, type: string) => void;
  @Input() transferType: string
  @Input() terminals: Terminal[];
  departure: any = {};
  arrival: any = {};
  dates: Date[] = [];

  nationality: string

  guestData = [
    { name: 'adults', caption: "ages_12_and_up", value: 1, min: 1, max: 6 },
    { name: 'childrens', caption: "under_12_years_old", value: 0, min: 0, max: 4, ages: [] }
  ];

  minDate = new Date();
  isSelecting = false;
  isLoading = signal<boolean>(false)
  isRotated = false;
  guests: boolean = false

  showErrors = {
    arrival: false,
    departure: false,
    departureDate: false,
    returnDate: false
  };


  departureDate: Date | null = null;
  departureTime: Date | null = null;
  returnDate: Date | null = null;
  returnTime: Date | null = null;
  mindate: Date = new Date();

  ngOnInit(): void {
    const parsedData = this.FormDataService.getData('transferParams')
    if (parsedData) {
      this.departure = {
        code: parsedData.dataPost.From.Code,
        destination: parsedData.dataPost.From.Destination,
        latitude: parsedData.dataPost.From.Latitude,
        longitude: parsedData.dataPost.From.Longitude,
        country_id: parsedData.dataPost.From.CountryId,
        country_name: parsedData.dataPost.From.CountryName,
        type: parsedData.dataPost.From.Type,
      };

      this.arrival = {
        code: parsedData.dataPost.To.Code,
        destination: parsedData.dataPost.To.Destination,
        latitude: parsedData.dataPost.To.Latitude,
        longitude: parsedData.dataPost.To.Longitude,
        country_id: parsedData.dataPost.To.CountryId,
        country_name: parsedData.dataPost.To.CountryName,
        type: parsedData.dataPost.To.Type,
      };

      this.dates[0] = parse(parsedData.dataPost.DateFrom, 'yyyy-MM-dd HH:mm', new Date())
      if (this.transferType == 'RT') {
        this.dates[1] = parse(parsedData.dataPost.DateReturn, 'yyyy-MM-dd HH:mm', new Date())
      }
      this.departureDate = this.dates[0];
      if (this.transferType == 'RT') {
        this.returnDate = this.dates[1];
      }
      this.guestData[0].value = parsedData.dataPost.Adult;
      this.guestData[1].value = parsedData.dataPost.Child;
      this.guestData[2].value = parsedData.dataPost.Infant;
    }
  }

  onDepartureChange(event: any, target?: any) {

    this.FormDataService.sendData('departureParams', event.value);
    this.isSelecting = true;
    this.departure = event.value;
    if (this.departure) {
      this.showErrors.departure = false;
      setTimeout(() => {
        const inputElement = document.getElementById('transfers-search-arrival');
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
        const inputElement = document.getElementById('transfers-search-startDate');
        if (inputElement) {
          inputElement.click();
        }
        this.isSelecting = false;
      }, 10);
    }
  }

  onDatesChange(dates: Date[]) {
    this.dates = dates;
    this.showErrors.departureDate = !this.dates[0]
    this.showErrors.returnDate = !this.dates[1]

    if (dates && dates.length === 2 && dates[0] instanceof Date && dates[1] instanceof Date) {
      setTimeout(() => {
        this.guests = true;
      }, 10);
    }
  }

  onFocus(event: any, target: string) {
    if (this.isSelecting) return;
    this[target] = {};
    this.terminals = this.HistoryService.getHistory(target + 'Transfer', TRANSFERS_SUGGETIONS);
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

  onDateDepartureChange(departureDate: Date) {
    this.departureDate = departureDate;
    this.dates[0] = departureDate;
    this.showErrors.departureDate = false;
  }

  onDateReturnChange(returnDate: Date) {
    this.returnDate = returnDate;
    this.dates[1] = returnDate;
    this.showErrors.returnDate = false;

    if (returnDate && this.dates.length === 2 && this.dates[0] instanceof Date && this.dates[1] instanceof Date) {
      setTimeout(() => {
        this.guests = true;
      }, 10);
    }
  }

  onSubmit() {
    this.showErrors.departure = !(this.departure && this.departure.destination);
    this.showErrors.arrival = !(this.arrival && this.arrival.destination);

    this.showErrors.departureDate = !(this.dates[0] instanceof Date);

    if (this.transferType === 'RT') {
      this.showErrors.returnDate = !(this.dates[1] instanceof Date);
    } else {
      this.showErrors.returnDate = false;
    }


    if (this.showErrors.departure || this.showErrors.arrival || this.showErrors.departureDate || this.showErrors.returnDate) {
      return;
    }
    this.isLoading.set(true)

    const payload = {
      "dataPost": {
        "Adult": this.guestData[0].value,
        "Child": this.guestData[1].value,
        "ChildAge": this.guestData[1].ages,
        "CountryOfResidence": this.nationality,
        "DateFrom": this.dates[0] ? format(this.dates[0], 'yyyy-MM-dd HH:mm') : '',
        "DateReturn": this.dates[1] ? format(this.dates[1], 'yyyy-MM-dd HH:mm') : '',
        "From": {
          "Code": this.departure?.code,
          "Destination": this.departure?.destination,
          "Latitude": this.departure?.latitude,
          "Longitude": this.departure?.longitude,
          "CountryId": this.departure?.country_id,
          "CountryName": this.departure?.country_name,
          "Type": this.departure?.type
        },
        "Nationality": this.nationality,
        "To": {
          "Code": this.arrival?.code,
          "Destination": this.arrival?.destination,
          "Latitude": this.arrival?.latitude,
          "Longitude": this.arrival?.longitude,
          "CountryId": this.arrival?.country_id,
          "CountryName": this.arrival?.country_name,
          "Type": this.arrival?.type
        },
        "Trip": this.transferType
      }
    }

    this.api.post(['transfer', 'availability'].join('/'), payload).subscribe({
      next: (response: any) => {
        this.HistoryService.addToHistory('departureTransfer', TRANSFERS_SUGGETIONS, this.departure);
        this.HistoryService.addToHistory('arrivalTransfer', TRANSFERS_SUGGETIONS, this.arrival);
        this.FormDataService.sendData('transferParams', payload);

        this.isLoading.set(false)
        if (response.result.count > 0) {
          localStorage.setItem('exchangeRate', response.result.exchangeRate)
          window.location.href = ['transfers', 'results', response.result.searchToken].join('/')
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
