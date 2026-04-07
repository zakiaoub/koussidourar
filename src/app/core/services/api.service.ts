import { Injectable } from '@angular/core';
import axios from 'axios';
import { SessionService } from './session.service';
import { FormDataService } from '@services/form-data.service';
import { environment } from 'environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.NG_APP_API_URL || 'http://localhost:3000';

  constructor(private sessionService: SessionService, private formDataService: FormDataService) { }

  private get sessionToken(): string {
    return this.sessionService.generateToken();
  }

  private get lang(): string {
    return this.sessionService.getSession()?.lang || environment.NG_APP_LANG;
  }

  private get currency(): string {
    return this.sessionService.getSession()?.currency || environment.NG_APP_CURRENCY;
  }

  private get bearerToken(): string {
    return this.formDataService.getData('bearer');
  }

  private getHeaders(): any {

    return {
      'Content-Type': 'application/json',
      'sessionToken': this.sessionToken,
      'lang': this.lang,
      'currencyPaid': this.currency,
      'Authorization': 'Bearer ' + this.bearerToken
    };
  }

  async postData(endpoint: string, params?: any): Promise<any> {
    try {
      const response = await axios.post(`${this.baseUrl}/${endpoint}`, params, {
        headers: this.getHeaders()
      });
      if (response.data.result.exchangeRate) {
        localStorage.setItem('exchangeRate', response.data.result.exchangeRate)
      }
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la requête POST', error);
      throw error;
    }
  }

  async getData(endpoint: string, params?: any): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/${endpoint}`, {
        headers: this.getHeaders(),
        params: params
      });
      if (response.data.result.exchangeRate) {
        localStorage.setItem('exchangeRate', response.data.result.exchangeRate)
      }
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la requête GET', error);
      throw error;
    }
  }

  async deleteData(endpoint: string, params?: any): Promise<any> {
    try {
      const response = await axios.delete(`${this.baseUrl}/${endpoint}`, {
        headers: this.getHeaders(),
        data: params
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la requête DELETE', error);
      throw error;
    }
  }
}
