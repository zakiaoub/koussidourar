import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SubmitComponent } from '@app/shared/components/fields/submit/submit.component';
import { TranslationModule } from '@app/core/modules/translation.module';
import { format, parse } from 'date-fns';
import { AutocompleteSuggetionsComponent } from '@app/shared/components/templates/autocomplete-suggetions/autocomplete-suggetions.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DatePicker } from 'primeng/datepicker';
import { HOTELS_SUGGETIONS } from '@app/shared/constants/suggestions.constant'
import { Hotel } from '@app/core/models/hotel.interface';
import { MultiSelectModule } from 'primeng/multiselect';
import { RankComponent } from "@features/hotels/templates/rank/rank.component";
import { LoaderCityComponent } from "@app/shared/components/widgets/loader-city/loader-city.component";
import { AutocompleteService } from '@app/core/services/autocomplete.service';
import { FormDataService } from '@app/core/services/form-data.service';
import { SessionService } from '@app/core/services/session.service';
import { HistoryService } from '@app/core/services/history.service';
import { ToastService } from '@app/core/services/toast.service';
import { forkJoin } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { RoomsFieldComponent } from '@app/shared/components/fields/rooms-field/rooms-field.component';
import { ReqService } from '@app/core/services/req.service';


@Component({
  selector: 'app-hotels-search-form',
  imports: [CommonModule, FormsModule, SubmitComponent, TranslationModule, AutocompleteSuggetionsComponent, AutoCompleteModule, DatePicker, RoomsFieldComponent, MultiSelectModule, RankComponent, LoaderCityComponent],
  templateUrl: './hotels-search-form.component.html',
  styleUrl: './hotels-search-form.component.css'
})
export class HotelsSearchFormComponent {

  constructor(private autocompleteService: AutocompleteService, private formDataService: FormDataService, private sessionService: SessionService, private historyService: HistoryService, private toastService: ToastService, private breakpointObserver: BreakpointObserver, private api: ReqService) {
    this.nationality = this.sessionService.getSession()?.location?.countryCode
  }

  isXsOrSm: boolean = false;

  cities: Hotel[]
  destination: any = {};
  dates: Date[] = [];
  nationality: string
  category: number[] = [];
  rating: number[] = [];
  rooms = [
    { adult: 1, child: 0, childAge: [] }
  ];
  roomsData = {
    rooms: this.rooms,
    roomsCount: 1,
    adultCount: 0,
    childCount: 0
  }

  roomsDataChange(data: any) {
    this.roomsData = data
  }

  minDate = new Date();
  minCheckoutDate: Date | null = null;

  isLoading = signal<boolean>(false)
  isSelecting: boolean = false;
  guests: boolean = false
  showErrors = {
    destination: false,
    dates: false
  };

  ngOnInit(): void {
    const parsedData = this.formDataService.getData('hotelParams')
    this.destination = {
      destination: parsedData.destination,
      country_name: parsedData.country_name,
      city_name: parsedData.city_name,
      id: parsedData.id,
      city_id: parsedData.city_id,
      country_id: parsedData.country_id,
      type: parsedData.type,
    };

    this.dates = [
      parse(parsedData.checkin, 'dd/MM/yyyy', new Date()),
      parse(parsedData.checkout, 'dd/MM/yyyy', new Date()),
    ];

    this.nationality = parsedData.nationality
    this.rooms = parsedData.rooms
    this.roomsData.rooms = parsedData.rooms

    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
        this.isXsOrSm = result.matches;
      });
  }

  onDestinationChange(event: any) {
    this.isSelecting = true;
    this.destination = event.value;

    if (this.destination) {
      this.showErrors.destination = false;

      setTimeout(() => {
        const inputElement = document.getElementById('hotels-search-dates');
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

    if (dates && dates.length > 0 && dates[0] instanceof Date) {
      this.minCheckoutDate = new Date(dates[0]);
      this.minCheckoutDate.setDate(this.minCheckoutDate.getDate() + 1);
    }

    if (dates && dates.length === 2 && dates[1] instanceof Date) {
      if (dates[1] <= this.minCheckoutDate!) {
        this.dates[1] = this.minCheckoutDate!;
      }
      setTimeout(() => (this.guests = true), 10);
    }
  }

  onFocus(event: any) {
    if (this.isSelecting) {
      return;
    }
    this.destination = {}
    this.cities = this.historyService.getHistory('hotels', HOTELS_SUGGETIONS);
    setTimeout(() => {
      event.show();
    }, 10);
  }

  fetchCities(query: string): void {
    if (query.length > 0) {
      const cities$ = this.autocompleteService.getData('autocomplete', query);
      const hotels$ = this.autocompleteService.getData('autocomplete/hotels', query);

      forkJoin([cities$, hotels$]).subscribe(
        ([citiesResponse, hotelsResponse]) => {
          const cityResults = citiesResponse.result.map(item => ({
            id: item.id,
            city_id: item.city_id,
            destination: item.destination,
            city_name: item.city_name,
            name: item.name,
            houtel_count: item.houtel_count,
            country_id: item.country_id,
            country_name: item.country_name,
            type: item.type
          }));

          const hotelResults = hotelsResponse.result.map(hotel => ({
            id: hotel.id,
            city_id: hotel.city_id,
            destination: hotel.destination,
            city_name: hotel.country_name,
            name: hotel.name,
            houtel_count: hotel.houtel_count,
            country_id: hotel.country_code,
            country_name: hotel.country_name,
            type: hotel.type
          }));

          this.cities = [...cityResults, ...hotelResults]
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
      "destination": this.destination['destination'],
      "country_name": this.destination['country_name'],
      "city_name": this.destination['city_name'],
      "checkin": this.dates[0] ? format(this.dates[0], 'dd/MM/yyyy') : '',
      "checkout": this.dates[1] ? format(this.dates[1], 'dd/MM/yyyy') : '',
      "rooms": this.roomsData['rooms'],
      "id": this.destination['id'],
      "city_id": this.destination['city_id'],
      "country_id": this.destination['country_id'],
      "type": this.destination['type'],
      "nationality": this.nationality,
      "roomsCount": this.roomsData['roomsCount'],
      "adultCount": this.roomsData['adultCount'],
      "childCount": this.roomsData['childCount'],
      "category": this.category,
      "tripAdvisorRating": this.rating,
    };

    this.api.post(['hotel', 'load'].join('/'), payload).subscribe({
      next: (response: any) => {
        this.historyService.addToHistory('hotels', HOTELS_SUGGETIONS, this.destination);
        this.formDataService.sendData('hotelParams', payload);
        this.isLoading.set(false)

        if (response.result.count > 0) {
          localStorage.setItem('exchangeRate', response.result.exchangeRate)
          window.location.href = ['hotels', 'results', response.result.searchToken].join('/')

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
