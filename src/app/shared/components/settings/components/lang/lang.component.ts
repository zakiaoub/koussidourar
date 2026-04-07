import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationModule } from '../../../../../core/modules/translation.module';
import { TranslationService } from '@app/core/services/translation.service';
import { SessionService } from '@app/core/services/session.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-lang',
  imports: [CommonModule, TranslationModule],
  templateUrl: './lang.component.html',
  styleUrl: './lang.component.css'
})

export class LangComponent {

  constructor(private translationService: TranslationService, private sessionService: SessionService) {}

  switchLanguage(lang: string) {
    this.translationService.switchLanguage(lang);
    window.location.reload();
  }

  flags = [
    { key: 'en', value: 'assets/images/flags/en.png', title: 'English', country: "United States" },
    { key: 'fr', value: 'assets/images/flags/fr.png', title: 'Français', country: "France" },
    { key: 'es', value: 'assets/images/flags/es.png', title: 'Español', country: "España" },
  ];
}
