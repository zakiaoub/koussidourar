import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import en from '@assets/i18n/en.json';
import fr from '@assets/i18n/fr.json';
import es from '@assets/i18n/es.json';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})

export class TranslationService {
  private session: any;
  private currentLang = new BehaviorSubject<string>('');
  private translations: any = {};

  private langData = {
    'en': en,
    'fr': fr,
    'es': es
  };

  constructor(private SessionService: SessionService) {
    this.session = this.SessionService.getSession() || { lang: 'en'};
  
    if (this.session.lang) {
      this.loadTranslations(this.session.lang);
    } else {
      this.loadTranslations('en');
    }
  
    const lang = this.getSavedLanguage();
    this.currentLang.next(lang);
    this.loadTranslations(lang);
  }
  
  private getSavedLanguage(): string {
    return this.session.lang || 'en';
  }

  loadTranslations(lang: string) {
    this.translations = this.langData[lang] || en;
    this.currentLang.next(lang);
    this.SessionService.updateSessionData({ lang: lang });
  }

  getTranslation(key: string) {
    return this.translations[key] || key;
  }

  switchLanguage(lang: string) {
    this.loadTranslations(lang);
  }

  getTranslations() {
    return this.translations;
  }
}

