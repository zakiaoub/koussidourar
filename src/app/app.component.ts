import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "@layout/header/header.component";
import { Footer } from './layout/footer/footer.component';
import { CommonModule } from '@angular/common';
import { PrimeNG } from 'primeng/config';
import { PRIMENG_TRANSLATIONS } from './shared/constants/primeng';
import { SessionService } from './core/services/session.service';
import { ChatbotService } from './core/services/chatbot.service';
import { StorageSizeService } from './core/services/storage-size.service';
import { HideOnUrlDirective } from './shared/directives/hideonurl';
import { ToastComponent } from './shared/components/widgets/toast/toast.component';
import { CookiesService } from './core/services/cookies.service';
import { PrimeNgTranslations } from './core/models/translation.interafce';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, CommonModule, HideOnUrlDirective, ToastComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(
    private sessionService: SessionService,
    private PrimeNG: PrimeNG
  ) {
    this.lang = this.sessionService.getSession()?.lang
  }

  isLogged: string
  isLoading: boolean = false;
  lang: string
  primengTranslations:PrimeNgTranslations = PRIMENG_TRANSLATIONS

  async ngOnInit() {
    this.isLogged = localStorage.getItem('isLogged')
    this.sessionService.initializeSession();

    // console.log(
    //   {
    //     'storage': {
    //       'used': this.storageSizeService.getLocalStorageSize() + 'MO',
    //       'remaining': this.storageSizeService.getRemainingSpace() + 'MO'
    //     }
    //   }
    // )

    this.PrimeNG.setTranslation(this.primengTranslations[this.lang]);

    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }
}
