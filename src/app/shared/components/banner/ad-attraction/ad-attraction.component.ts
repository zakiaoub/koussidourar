import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { AutocompleteService } from '@app/core/services/autocomplete.service';
import { FormDataService } from '@app/core/services/form-data.service';
import { finalize } from 'rxjs';
import { format, parse } from "date-fns";
import { ButtonComponent } from '../../widgets/button/button.component';
import { IconComponent } from '../../widgets/icon/icon.component';

@Component({
  selector: 'app-ad-attraction',
  imports: [CommonModule, TranslationModule, ButtonComponent, IconComponent],
  templateUrl: './ad-attraction.component.html',
  styleUrl: './ad-attraction.component.css'
})
export class AdAttractionComponent {

  constructor(
    private autocompleteService: AutocompleteService,
    private formData: FormDataService
  ) { }

  params: any;
  isLoading: boolean = false;

  cities: any;

  ngOnInit() {
    this.params = this.formData.getData('hotelParams')
    this.fetchCities(this.params?.city_name);
  }

  fetchCities(query: string): void {
    if (query?.length > 0) {

      this.isLoading = true;

      this.autocompleteService.getData("autocomplete/cities", query)
        .pipe(
          finalize(() => this.isLoading = false)
        )
        .subscribe(
          (citiesResponse) => {
            this.cities = citiesResponse.result
              .filter(
                (item) =>
                  item.city.toLowerCase() ===
                  this.params?.city_name.toLowerCase() &&
                  item.country_id.toLowerCase() ===
                  this.params?.country_id.toLowerCase()
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

  async onSubmit() {

    this.isLoading = true;

    const checkin = parse(this.params?.checkin, 'dd/MM/yyyy', new Date());
    const checkout = parse(this.params?.checkout, 'dd/MM/yyyy', new Date());

    const payload = {
      "dataPost": {
        "Destination": this.cities[0]['destination'],
        "CountryId": this.cities[0]['country_id'],
        "DestinationId": this.cities[0]['id'],
        "CityName": this.cities[0]['city_name'],
        DateFrom: format(checkin, 'yyyy-MM-dd'),
        DateTo: format(checkout, 'yyyy-MM-dd'),
        "Nationality": this.params?.nationality,
        "Adult": this.params?.rooms[0]?.adult,
        "Child": this.params?.rooms[0]?.child,
        "Type": this.cities[0]['type'],
        "CountryName": this.cities[0]['country_name'],
        "ChildAge": []
      }
    };

    setTimeout(() => {
      this.formData.sendData("attractionParams", payload);
      window.open('/attractions', '_blank');
      this.isLoading = false;
    }, 1000);
  }

}
