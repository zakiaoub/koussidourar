import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParseDataService {

  encode(value: any): any {
    try {
      return encodeURIComponent(JSON.stringify(value));
    } catch (error) {
      console.error('Erreur lors de l’encodage', error);
      return '';
    }
  }

  decode(value: any): any {
    try {
      return JSON.parse(decodeURIComponent(value));
    } catch (error) {
      console.error('Erreur lors du décodage', error);
      return null;
    }
  }
}
