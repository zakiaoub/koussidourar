import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { TranslationModule } from '../../../core/modules/translation.module';
import { LangComponent } from './components/lang/lang.component';
import { SessionService } from '../../../core/services/session.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-settings',
  imports: [DialogModule, CommonModule, TranslationModule, LangComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})

export class SettingsComponent {

  constructor(private sessionService: SessionService) { }

  defaultLang: string = environment.NG_APP_LANG;
  defaultCurrency: string = environment.NG_APP_CURRENCY;
  settings: boolean = false;
  activeSettings: string = 'lang';


  ngOnInit(): void {
    if (this.sessionService.getSession()?.lang && this.sessionService.getSession()?.currency) {
      this.defaultLang = this.sessionService.getSession()?.lang;
      this.defaultCurrency = this.sessionService.getSession()?.currency;
    }
  }

  setActiveSettings(buttonId: string) {
    this.activeSettings = buttonId;
  }
}
