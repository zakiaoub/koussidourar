import { Injectable } from '@angular/core';

type CookieConsent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

@Injectable({ providedIn: 'root' })
export class CookiesService {

  private COOKIES_KEY = 'isCookies';

  /* =========================
     CONSENT MANAGEMENT
  ========================== */

  getConsent(): CookieConsent | null {
    const data = localStorage.getItem(this.COOKIES_KEY);
    return data ? JSON.parse(data) : null;
  }

  setConsent(consent: CookieConsent) {
    localStorage.setItem(this.COOKIES_KEY, JSON.stringify(consent));
    this.applyConsent(consent);
  }

  hasConsent(type: keyof CookieConsent): boolean {
    const consent = this.getConsent();
    return consent ? consent[type] : false;
  }

  isConsentGiven(): boolean {
    return !!this.getConsent();
  }

  /* =========================
     COOKIE OPERATIONS
  ========================== */

  setCookie(name: string, value: string, days: number = 365, type: keyof CookieConsent = 'necessary') {
    // Vérifier le consentement avant de créer le cookie
    if (!this.hasConsent(type)) {
      console.warn(`Cookie "${name}" blocked: no consent for ${type}`);
      return;
    }

    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
  }

  getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length);
      }
    }
    return null;
  }

  getAllCookies(): { [key: string]: string } {
    const cookies: { [key: string]: string } = {};
    const cookieArray = document.cookie.split(';');

    cookieArray.forEach(cookie => {
      const [name, value] = cookie.split('=').map(c => c.trim());
      if (name) {
        cookies[name] = value;
      }
    });

    return cookies;
  }

  deleteCookie(name: string) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }

  deleteAllCookies(except: string[] = [this.COOKIES_KEY]) {
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
      const cookieName = cookie.split('=')[0].trim();
      if (!except.includes(cookieName)) {
        this.deleteCookie(cookieName);
      }
    }
  }

  /* =========================
     APPLY CONSENT
  ========================== */

  private applyConsent(consent: CookieConsent) {
    this.cleanupCookiesByConsent(consent);

    if (consent.analytics) {
      this.loadAnalytics();
    } else {
      this.blockAnalytics();
    }

    /* Continuer pour les autres catégories */

    window.dispatchEvent(new CustomEvent('cookieConsentChanged', { detail: consent }));
  }

  private cleanupCookiesByConsent(consent: CookieConsent) {
    const cookieTypes = {
      analytics: ['_ga', '_gat', '_gid', '_gat_gtag'],
      marketing: ['_fbp', '_fbc', 'fr'],
      social: [],
      functional: [],
      performance: []
    };

    Object.entries(cookieTypes).forEach(([type, cookies]) => {
      if (!consent[type as keyof CookieConsent]) {
        cookies.forEach(cookieName => this.deleteCookie(cookieName));
      }
    });
  }

  /* =========================
     THIRD-PARTY SCRIPTS
  ========================== */

  private loadAnalytics() {
    /* Get Analytics script */
  }

  private blockAnalytics() {

    /* Remove Analytics script */
  }
}