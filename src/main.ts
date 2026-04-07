/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeEn from '@angular/common/locales/en';
import localeEs from '@angular/common/locales/es';

const session = localStorage.getItem('userSession');
let userLang = 'en';

if (session) {
  try {
    const parsed = JSON.parse(session);
    if (parsed && typeof parsed === 'object' && parsed.lang) {
      userLang = parsed.lang;
    }
  } catch (e) {
    console.warn('Erreur lors de la lecture de userSession:', e);
  }
}

switch (userLang) {
  case 'fr':
    registerLocaleData(localeFr);
    break;
  case 'es':
    registerLocaleData(localeEs);
    break;
  case 'en':
  default:
    registerLocaleData(localeEn);
    break;
}


bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    { provide: LOCALE_ID, useValue: userLang }
  ]
}).catch(err => console.error(err));

