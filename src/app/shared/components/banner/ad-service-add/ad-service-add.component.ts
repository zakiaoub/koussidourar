import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { AutocompleteService } from '@app/core/services/autocomplete.service';
import { FormDataService } from '@app/core/services/form-data.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-ad-service-add',
  imports: [CommonModule, TranslationModule],
  templateUrl: './ad-service-add.component.html',
  styleUrl: './ad-service-add.component.css'
})
export class AdServiceAddComponent {

  constructor(private formData: FormDataService, private auto: AutocompleteService) { }

  @Input() service: string = ""
  isLoading: boolean = false;

  payload = {
    city: null,
    checkin: null,
    checkout: null
  }

  ngOnInit() {
    this.getStorageData()
  }

  getStorageData() {
    const keys = ['flightParams', 'hotelParams', 'attractionParams', 'transferParams'];

    for (const key of keys) {
      const data = this.formData.getData(key);

      if (!data) continue;

      if (key === 'flightParams') {
        this.payload.checkin = data?.dataPost?.Itineraries[0]?.Date;
        this.payload.checkout = data?.dataPost?.Itineraries[1]?.Date;

        this.fetchCitiesFlight(
          data?.dataPost?.Itineraries[0]?.ArrivalCityName,
          data?.dataPost?.Itineraries[0]?.ArrivalCountryId
        );

        break;
      }

      if (key === 'hotelParams') {
        this.payload.checkin = data?.checkin;
        this.payload.checkout = data?.checkout;

        this.fetchCities(data?.city_name, data?.country_id);

        break;
      }

      if (key === 'attractionParams') {
        this.payload.checkin = data?.dataPost?.DateFrom;
        this.payload.checkout = data?.dataPost?.DateTo;

        this.fetchCities(data?.dataPost?.CityName, data?.dataPost?.CountryId);

        break;
      }
    }
  }

  fetchCitiesFlight(query: string, id: string): void {

    this.auto.getData("autocomplete/airports", query)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(
        (citiesResponse) => {
          this.payload.city = citiesResponse.result
            .filter(
              (item) =>
                item.city_name.toLowerCase() ===
                query.toLowerCase() &&
                item.country_id.toLowerCase() ===
                id.toLowerCase()
            )
            .map((item) => ({
              code: item.code,
              destination: item.destination,
              name: item.name,
              country_id: item.country_id,
              country_name: item.country_name,
              city_name: item.city_name,
              type: item.type,
            }));
        },
        (error) => {
          console.error("Erreur API:", error);
        }
      );
  }

  fetchCities(query: string, id: string): void {
    this.auto.getData("autocomplete/cities", query)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(
        (citiesResponse) => {
          this.payload.city = citiesResponse.result
            .filter(
              (item) =>
                item.city.toLowerCase() ===
                query.toLowerCase() &&
                item.country_id.toLowerCase() ===
                id.toLowerCase()
            )
            .map((item) => ({
              id: item.id,
              city_id: item.city_id,
              destination: item.destination,
              city_name: item.city,
              country_id: item.country_id,
              country_name: item.country_name,
              type: item.type,
            }));
        },
        (error) => {
          console.error("Erreur API:", error);
        }
      );
  }
}
