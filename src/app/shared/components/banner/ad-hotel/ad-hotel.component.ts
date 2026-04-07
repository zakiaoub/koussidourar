import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconComponent } from '@app/shared/components/widgets/icon/icon.component';
import { ButtonComponent } from '../../widgets/button/button.component';
import { TranslationModule } from '@app/core/modules/translation.module';
import { format } from "date-fns";
import { AutocompleteService } from '@app/core/services/autocomplete.service';
import { FormDataService } from '@app/core/services/form-data.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-ad-hotel',
  imports: [CommonModule, TranslationModule, IconComponent, ButtonComponent],
  templateUrl: './ad-hotel.component.html',
  styleUrl: './ad-hotel.component.css'
})
export class AdHotelComponent {

  constructor(
    private autocompleteService: AutocompleteService,
    private formData: FormDataService
  ) { }

  params: any;
  isLoading: boolean = false;

  cities: any;
  date: any;

  rooms = [{ adult: 1, child: 0, childAge: [] }];

  roomsData = {
    rooms: this.rooms,
    roomsCount: 1,
    adultCount: 0,
    childCount: 0,
  };

  ngOnInit() {
    this.params = this.formData.getData('flightParams')?.dataPost
    this.fetchCities(this.params?.Itineraries?.[0]?.ArrivalCityName);
    this.date = format(this.params.Itineraries?.[0].Date, "dd/MM/yyyy");
    this.rooms[0].adult = this.params?.Adult
    this.rooms[0].child = this.params?.Child + this.params?.Infant
  }

  fetchCities(query: string): void {
    if (query?.length > 0) {

      this.isLoading = true;

      this.autocompleteService.getData("autocomplete", query)
        .pipe(
          finalize(() => this.isLoading = false)
        )
        .subscribe(
          (citiesResponse) => {
            this.cities = citiesResponse.result
              .filter(
                (item) =>
                  item.city_name.toLowerCase() ===
                  this.params?.Itineraries[0]?.ArrivalCityName?.toLowerCase() &&
                  item.country_id.toLowerCase() ===
                  this.params?.Itineraries[0]?.ArrivalCountryId?.toLowerCase()
              )
              .map((item) => ({
                id: item.id,
                city_id: item.city_id,
                destination: item.destination,
                city_name: item.city_name,
                name: item.name,
                hotel_count: item.hotel_count,
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

    const params = {
      destination: this.cities[0]?.["destination"],
      country_name: this.cities[0]?.["country_name"],
      city_name: this.cities[0]?.["city_name"],
      checkin: this.params.Itineraries[0].Date
        ? format(this.params.Itineraries[0].Date, "dd/MM/yyyy")
        : "",
      checkout: this.params.Itineraries[1].Date
        ? format(this.params.Itineraries[1].Date, "dd/MM/yyyy")
        : format(this.params.Itineraries[0].Date, "dd/MM/yyyy"),
      rooms: this.roomsData["rooms"],
      id: this.cities[0]?.["id"],
      city_id: this.cities[0]?.["city_id"],
      country_id: this.cities[0]?.["country_id"],
      type: this.cities[0]?.["type"],
      nationality: "DZ",
      roomsCount: this.roomsData["roomsCount"],
      adultCount: this.params.Adult,
      childCount: this.params.Child,
      category: [],
      tripAdvisorRating: [],
    };

    setTimeout(() => {
      this.formData.sendData("hotelParams", params);
      window.open('/hotels', '_blank');
      this.isLoading = false;
    }, 1000);
  }
}
