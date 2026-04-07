import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslationModule } from '@app/core/modules/translation.module';
import { FormsModule } from '@angular/forms';
import { AutocompleteService } from '@app/core/services/autocomplete.service';
import { ParseDataService } from '@app/core/services/parse-data.service';
import { FormDataService } from '@app/core/services/form-data.service';
import { IconComponent } from '@app/shared/components/widgets/icon/icon.component';
import { TransfersSearchFormComponent } from '@app/shared/components/forms/transfers-search-form/transfers-search-form.component';

@Component({
  selector: 'app-transfers-form-fields',
  standalone: true,
  imports: [FormsModule, TranslationModule, CommonModule, TransfersSearchFormComponent, IconComponent],
  templateUrl: './transfers-form-fields.component.html',
  styleUrl: './transfers-form-fields.component.css'
})

export class TransfersFormFieldsComponent {

  constructor(private autocompleteService: AutocompleteService, private route: ActivatedRoute, private parseDataService: ParseDataService, private formDataService: FormDataService) { }

  terminals: any
  transferType: string = 'RT';
  data = [
    { title: "round_trip", code: "RT" },
    { title: "one_way", code: "OW" }
  ]

  setTransferType(type: string) {
    this.transferType = type;
  }

  fetchCities(query: string, type: string): void {
    if (query.length <= 2 && !(type === 'arrival' && query === '')) return;

    if (type === 'departure') {
      this.autocompleteService.getData('autocomplete/terminal', query).subscribe(
        response => {
          this.terminals = response.result.map(item => ({
            code: item.code,
            destination: item.destination,
            name: item.name,
            latitude: item.latitude,
            longitude: item.longitude,
            country_id: item.country_id,
            country_name: item.country_name,
            type: item.type,
          }));
        },
        error => {
          console.error('Erreur API (départ):', error);
        }
      );
    }

    else if (type === 'arrival') {

      const country_id = this.formDataService.getData('departureParams').country_id;
      const terminalType = this.formDataService.getData('departureParams').type;

      const arrivalQuery = `${query}&terminalType=${terminalType}`;

      // ✅ Si le pays de départ est connu → appel filtré
      if (country_id) {
        this.autocompleteService.getData(`autocomplete/terminal/${country_id}`, arrivalQuery).subscribe(
          response => {
            this.terminals = response.result.map(item => ({
              code: item.code,
              destination: item.destination,
              name: item.name,
              latitude: item.latitude,
              longitude: item.longitude,
              country_id: item.country_id,
              country_name: item.country_name,
              type: item.type,
            }));
          },
          error => {
            console.error('Erreur API (arrivée filtrée):', error);
          }
        );
      }

      // ❌ Sinon → appel générique

      else {
        this.autocompleteService.getData('autocomplete/terminal', query).subscribe(
          response => {
            this.terminals = response.result.map(item => ({
              code: item.code,
              destination: item.destination,
              name: item.name,
              latitude: item.latitude,
              longitude: item.longitude,
              country_id: item.country_id,
              country_name: item.country_name,
              type: item.type,
            }));
          },
          error => {
            console.error('Erreur API (arrivée non filtrée):', error);
          }
        );
      }
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        const parsedData = this.parseDataService.decode(params['data']);
        this.transferType = parsedData.dataPost.Trip
      }
    })
  }
}
