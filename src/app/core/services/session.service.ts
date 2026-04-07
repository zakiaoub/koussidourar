import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { interval, Observable } from 'rxjs';
import { map, startWith, takeWhile } from 'rxjs/operators';
import { GeolocationService } from './geo-location.service';
import { DEFAULT_LOCATION } from '@app/shared/constants/location.constant';
import { environment } from 'environments/environment'

interface Session {
  token?: string;
  tokenExpiry?: number;
  location: any | null;
  lang: string;
  currency: string;
}

@Injectable({
  providedIn: 'root',
})

export class SessionService {
  private readonly SESSION_KEY = 'userSession';
  private readonly EXPIRY_DURATION_MS = environment.NG_APP_SESSION_EXPIRY_DURATION * 60 * 1000;

  constructor(private geolocationService: GeolocationService) { }

  private countryCurrencyMap: { [key: string]: string } = {
    'US': 'USD',
    'FR': 'EUR',
    'GB': 'GBP',
    'JP': 'JPY',
    'CN': 'CNY',
    'AU': 'AUD',
    'CA': 'CAD',
    'CH': 'CHF',
    'IN': 'INR',
    'MX': 'MXN',
    'BR': 'BRL',
    'AE': 'AED',
    'TR': 'TRY',
    'ZA': 'ZAR',
    'TH': 'THB',
    'KR': 'KRW',
    'DZ': 'DZD',
    'TN': 'TND'
  };

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  public initializeSession(): void {
    if (!this.getSession()) {
      this.generateNewSession();
    }
  }

  private generateNewSession(): void {
    this.geolocationService.getFullLocation().then(location => {
      const lang = location.countryCode.toLowerCase();
      const sessionData: Session = {
        location,
        lang: lang === 'fr' || lang === 'es' ? lang : 'en',
        currency: this.countryCurrencyMap[location.countryCode] || environment.NG_APP_CURRENCY,
      };
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
    }).catch(() => {
      const sessionData: Session = {
        location: DEFAULT_LOCATION,
        lang: environment.NG_APP_LANG,
        currency: environment.NG_APP_CURRENCY
      };
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
    });
  }

  getSession(): Session | null {
    const data = localStorage.getItem(this.SESSION_KEY);
    return data ? JSON.parse(data) : null;
  }

  getRemainingTimeObservable(): Observable<string> {
    return interval(1000).pipe(
      startWith(0),
      map(() => this.getRemainingTime()),
      takeWhile(() => !this.isTokenExpired())
    );
  }

  getRemainingTime(): string {
    const session = this.getSession();
    if (!session?.tokenExpiry) return '00:00';

    const remaining = session.tokenExpiry - Date.now();
    if (remaining <= 0) return '00:00';

    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    return `${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }

  updateSessionData(data: Partial<Pick<Session, 'lang' | 'currency'>>): void {
    const session = this.getSession();
    if (!session) return;

    const updatedSession = {
      ...session,
      ...data,
    };

    localStorage.setItem(this.SESSION_KEY, JSON.stringify(updatedSession));
  }

  public generateToken(): string | null {
    const session = this.getSession();
    if (!session) return null;

    const now = Date.now();

    // Si token existe et n'est pas expiré → sliding expiration
    if (session.token && session.tokenExpiry && now < session.tokenExpiry) {

      const updatedSession: Session = {
        ...session,
        tokenExpiry: now + this.EXPIRY_DURATION_MS // 🔥 Reset à 20 min
      };

      localStorage.setItem(this.SESSION_KEY, JSON.stringify(updatedSession));
      return session.token;
    }

    // Sinon → créer nouveau token
    const token = uuidv4();
    const tokenExpiry = now + this.EXPIRY_DURATION_MS;

    const updatedSession: Session = {
      ...session,
      token,
      tokenExpiry
    };

    localStorage.setItem(this.SESSION_KEY, JSON.stringify(updatedSession));
    return token;
  }



  public isTokenExpired(): boolean {
    const session = this.getSession();
    if (!session?.token || !session?.tokenExpiry) return true;

    const expired = Date.now() > session.tokenExpiry;
    if (expired) {
      delete session.token;
      delete session.tokenExpiry;
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    }
    return expired;
  }
}
