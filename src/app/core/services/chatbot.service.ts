import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private widgetLoaded = false;

  constructor() {
    this.loadScript();
  }

  private loadScript() {
    if (this.widgetLoaded) return;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://embed.tawk.to/683eec2f678f5e19096efcee/1isqsl6at';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    }

    this.widgetLoaded = true;
  }

  hideWidget() {
    if ((window as any).Tawk_API?.hideWidget) {
      (window as any).Tawk_API.hideWidget();
    }
  }

  showWidget() {
    if ((window as any).Tawk_API?.showWidget) {
      (window as any).Tawk_API.showWidget();
    }
  }

}

