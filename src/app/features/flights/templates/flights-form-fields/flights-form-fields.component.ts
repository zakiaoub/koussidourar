import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslationModule } from '@app/core/modules/translation.module';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Airport } from '@app/core/models/airport.interface';
import { CheckboxModule } from 'primeng/checkbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { AutocompleteService } from '@app/core/services/autocomplete.service';
import { ParseDataService } from '@app/core/services/parse-data.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FlightsOnewaySearchFormComponent } from '@app/shared/components/forms/flights-oneway-search-form/flights-oneway-search-form.component';
import { FlightsRoundtripSearchFormComponent } from '@app/shared/components/forms/flights-roundtrip-search-form/flights-roundtrip-search-form.component';
import { FlightsMultiSearchFormComponent } from '@app/shared/components/forms/flights-multi-search-form/flights-multi-search-form.component';

@Component({
  selector: 'app-flights-form-fields',
  imports: [FormsModule, TranslationModule, CommonModule, FlightsOnewaySearchFormComponent, FlightsRoundtripSearchFormComponent, FlightsMultiSearchFormComponent, CheckboxModule, MultiSelectModule, ButtonModule, ToggleSwitchModule],
  templateUrl: './flights-form-fields.component.html',
  styleUrl: './flights-form-fields.component.css'
})
export class FlightsFormFieldsComponent {

  constructor(private autocompleteService: AutocompleteService, private route: ActivatedRoute, private parseDataService: ParseDataService, private breakpointObserver: BreakpointObserver) { }

  flightType: string = 'RT';
  stops: string = 'all';
  refundable: boolean = false
  luggages: boolean = false
  isXsOrSm = signal<boolean>(false);

  setFlightTYpe(type: string) {
    this.flightType = type;
  }

  data = [
    { title: "round_trip", code: "RT" },
    { title: "one_way", code: "OW" },
    { title: "multi_city", code: "MD" }
  ]

  airports: Airport[]

  fetchCities(query: string): void {

    
    if (query.length > 1) {
      this.autocompleteService.getData('autocomplete/airports', query).subscribe(
        response => {
          this.airports = response.result.map(item => ({
            code: item.code,
            destination: item.destination,
            name: item.name,
            country_id: item.country_id,
            country_name: item.country_name,
            city_name: item.city_name,
            type: item.type,
          }));
        },
        error => {
          console.error('Erreur API:', error);
        }
      );
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        const parsedData = this.parseDataService.decode(params['data']);
        this.flightType = parsedData.dataPost.Trip
      }
    })
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
        this.isXsOrSm.set(result.matches)
      });
  }

}
