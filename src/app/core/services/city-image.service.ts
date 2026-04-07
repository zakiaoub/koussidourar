import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CityImageService {
  private accessKey = 'D7NrS4ET_6LrgRDwtQwHkrZBwCJv1m7xMWcLZ3Tj5ks';
  private apiUrl = 'https://api.unsplash.com/search/photos';

  constructor(private http: HttpClient) { }

  getCityPhoto(city: string, orientation: 'portrait' | 'landscape' | 'squarish') {
    const params = new HttpParams()
      .set('query', city)
      .set('per_page', '10')
      .set('orientation', orientation)
      .set('client_id', this.accessKey);

    return this.http.get<any>(this.apiUrl, { params });
  }
}

