import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubmitComponent } from '@app/shared/components/fields/submit/submit.component';
import { TranslationModule } from '@app/core/modules/translation.module';
import { format, parse } from 'date-fns';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { AutocompleteSuggetionsComponent } from '@app/shared/components/templates/autocomplete-suggetions/autocomplete-suggetions.component';
import { DatePicker } from 'primeng/datepicker';
import { City } from '@app/core/models/city.interface';
import { ATTRACTIONS_SUGGETIONS } from '@app/shared/constants/suggestions.constant';
import { Guests } from '@app/core/models/guests.interface';
import { LoaderCityComponent } from "@app/shared/components/widgets/loader-city/loader-city.component";
import { SessionService } from '@app/core/services/session.service';
import { HistoryService } from '@app/core/services/history.service';
import { ToastService } from '@app/core/services/toast.service';
import { AutocompleteService } from '@app/core/services/autocomplete.service';
import { FormDataService } from '@app/core/services/form-data.service';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { GuestsFieldComponent } from '@app/shared/components/fields/guests-field/guests-field.component';
import { ReqService } from '@app/core/services/req.service';

@Component({
  selector: 'app-attractions-search-form',
  imports: [CommonModule, GuestsFieldComponent, FormsModule, SubmitComponent, TranslationModule, AutoCompleteModule, IconFieldModule, InputIconModule, AutocompleteSuggetionsComponent, DatePicker, LoaderCityComponent, IconComponent],
  templateUrl: './attractions-search-form.component.html',
  styleUrl: './attractions-search-form.component.css'
})
export class AttractionsSearchFormComponent {
  constructor(private autocompleteService: AutocompleteService, private FormDataService: FormDataService, private sessionService: SessionService, private historyService: HistoryService, private toastService: ToastService, private breakpointObserver: BreakpointObserver, private api: ReqService) {
    this.nationality = this.sessionService.getSession()?.location?.countryCode
  }

  cities: City[];
  destination: Partial<City> = {}
  dates: Date[] = [];
  nationality: string
  guestData: Guests[] = [
    { name: 'adults', caption: "ages_02_and_up", value: 1, min: 1, max: 6 },
    { name: 'childrens', caption: "under_12_years_old", value: 0, min: 0, max: 4, ages: [] },
  ];

  minDate = new Date();
  isLoading = signal<boolean>(false)
  isSelecting: boolean = false;
  guests: boolean = false
  showErrors = {
    destination: false,
    dates: false
  };

  isXsOrSm = signal<boolean>(false);

  ngOnInit(): void {

    const parsedData = this.FormDataService.getData('attractionParams')

    this.destination = {
      id: parsedData.dataPost.DestinationId,
      destination: parsedData.dataPost.Destination,
      country_id: parsedData.dataPost.CountryId,
      city_name: parsedData.dataPost.CityName,
      country_name: parsedData.dataPost.CountryName,
      type: parsedData.dataPost.Type,
    };

    this.dates = [
      parse(parsedData.dataPost.DateFrom, 'yyyy-MM-dd', new Date()),
      parse(parsedData.dataPost.DateTo, 'yyyy-MM-dd', new Date()),
    ];

    this.guestData[0].value = parsedData.dataPost.Adult;
    this.guestData[1].value = parsedData.dataPost.Child;
    this.guestData[1].ages = parsedData.dataPost.ChildAge;
    this.nationality = parsedData.dataPost.Nationality

    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
        this.isXsOrSm.set(result.matches)
      });
  }

  onDestinationChange(event: any) {
    this.isSelecting = true;
    this.destination = event.value;

    if (this.destination) {
      this.showErrors.destination = false;

      setTimeout(() => {
        const inputElement = document.getElementById('attractions-search-dates');
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

  onFocus(event: any) {
    if (this.isSelecting) {
      return;
    }
    this.destination = {};
    this.cities = this.historyService.getHistory('attractions', ATTRACTIONS_SUGGETIONS);
    setTimeout(() => {
      event.show();
    }, 10);
  }

  fetchCities(query: string): void {
    if (query.length > 1) {
      this.autocompleteService.getData('autocomplete/cities', query).subscribe(
        response => {
          this.cities = response.result.map(item => ({
            id: item.id,
            city_id: item.city_id,
            destination: item.destination,
            city_name: item.city,
            country_id: item.country_id,
            country_name: item.country_name,
            type: item.type,
          }));
        },
        error => {
          console.error('Erreur API:', error);
        }
      );
    }
  }

  onSubmit() {
    this.showErrors.destination = !(this.destination && this.destination.destination);
    this.showErrors.dates = !(this.dates[0] instanceof Date && this.dates[1] instanceof Date);

    if (this.showErrors.destination || this.showErrors.dates) {
      return;
    }

    this.isLoading.set(true)

    const payload = {
      "dataPost": {
        "Destination": this.destination['destination'],
        "CountryId": this.destination['country_id'],
        "DestinationId": this.destination['id'],
        "CityName": this.destination['city_name'],
        "DateFrom": this.dates[0] ? format(this.dates[0], 'yyyy-MM-dd') : '',
        "DateTo": this.dates[1] ? format(this.dates[1], 'yyyy-MM-dd') : '',
        "Nationality": this.nationality,
        "CountryOfResidence": this.nationality,
        "Adult": this.guestData[0].value,
        "Child": this.guestData[1].value,
        "Type": this.destination['type'],
        "CountryName": this.destination['country_name'],
        "ChildAge": this.guestData[1].ages
      }
    };

    this.api.post(['activity', 'availability'].join('/'), payload).subscribe({
      next: (response: any) => {
        this.historyService.addToHistory('attractions', ATTRACTIONS_SUGGETIONS, this.destination);
        this.FormDataService.sendData('attractionParams', payload);
        this.isLoading.set(false)

        if (response.result.count > 0) {
          localStorage.setItem('exchangeRate', response.result.exchangeRate)
          window.location.href = ['attractions', 'results', response.result.searchToken].join('/')
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
