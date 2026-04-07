import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment'

@Injectable({
  providedIn: 'root'
})

export class GeolocationService {
  private apiKey = environment.NG_APP_GOOGLE_API_KEY;

  constructor(private http: HttpClient) {}

  getFullLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('La géolocalisation n\'est pas supportée.');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.apiKey}`;

          this.http.get<any>(url).subscribe(
            response => {
              const results = response.results;
              const locationData: any = {
                latitude: lat,
                longitude: lng,
                country: null,
                countryCode: null,
                city: null,
                region: null,
                postalCode: null,
                street: null,
                streetNumber: null,
                fullAddress: results[0]?.formatted_address || null
              };

              if (results.length > 0) {
                const components = results[0].address_components;

                for (let component of components) {
                  const types = component.types;

                  if (types.includes('country')) {
                    locationData.country = component.long_name;
                    locationData.countryCode = component.short_name;
                  }
                  

                  if (types.includes('locality')) {
                    locationData.city = component.long_name;
                  }

                  if (types.includes('administrative_area_level_1')) {
                    locationData.region = component.long_name;
                  }

                  if (types.includes('postal_code')) {
                    locationData.postalCode = component.long_name;
                  }

                  if (types.includes('route')) {
                    locationData.street = component.long_name;
                  }

                  if (types.includes('street_number')) {
                    locationData.streetNumber = component.long_name;
                  }
                }
              }

              resolve(locationData);
            },
            error => {
              console.error('Erreur API Google:', error);
              reject(error);
            }
          );
        },
        error => {
          console.error('Erreur de géolocalisation:', error);
          reject(error);
        }
      );
    });
  }
}
