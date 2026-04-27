import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchLoaderService {
  visible = signal<boolean>(false);
  city = signal<string>('');
  country = signal<string>('');

  show(params?: { city?: string; country?: string }) {
    this.city.set(params?.city || '');
    this.country.set(params?.country || '');
    this.visible.set(true);
  }

  hide() {
    this.visible.set(false);
  }
}
