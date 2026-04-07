import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient,withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { authInterceptor } from '@app/core/interceptors/auth.interceptor';
import { errorInterceptor } from './errorInterceptor';
import 'animate.css';
registerLocaleData(fr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
     provideHttpClient(
    withInterceptors([authInterceptor, errorInterceptor])
    ),
     provideRouter(routes), 
     importProvidersFrom(FormsModule),
      provideAnimationsAsync(),
       provideHttpClient(),
        provideStore(),
         providePrimeNG({
    theme: {
        preset: Aura,
        options: {
          darkModeSelector: false || 'none',
      }
    }
})]
};

