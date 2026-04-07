import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {

  constructor() { }

  serializeData(data: any): string {
    return JSON.stringify(data);
  }

  deserializeData(serializedData: string): any {
    try {
      return JSON.parse(serializedData);
    } catch (e) {
      console.error('Erreur lors de la désérialisation des données:', e);
      return null;
    }
  }

  sendData(key: string, data: any) {
    const serializedData = this.serializeData(data);
    localStorage.setItem(key, serializedData);
  }

  getData(key: string): any {
    const serializedData = localStorage.getItem(key);
    if (serializedData) {
      return this.deserializeData(serializedData);
    }
    return null;
  }

  clearData(key: string) {
    localStorage.removeItem(key);
  }
}
