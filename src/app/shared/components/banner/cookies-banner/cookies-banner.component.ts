import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { CookiesService } from '@app/core/services/cookies.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonComponent } from '../../widgets/button/button.component';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cookies-banner',
  standalone: true,
  imports: [CommonModule, DialogModule, TranslationModule, ButtonComponent, ToggleSwitchModule, FormsModule],
  templateUrl: './cookies-banner.component.html',
  styleUrl: './cookies-banner.component.css'
})

export class CookiesBannerComponent implements OnInit {

  constructor(private cookies: CookiesService) { }

  @Input() visible: boolean = false;
  necessary: boolean = true
  analytics: boolean = true
  marketing: boolean = true
  functional: boolean = true
  social: boolean = true
  performance: boolean = true

  ngOnInit(): void {
    this.visible = !this.cookies.isConsentGiven();
  }

  acceptAll(analytics: boolean, marketing: boolean, functional: boolean, social: boolean, performance: boolean) {
    this.cookies.setConsent({
      necessary: true,
      analytics: analytics,
      marketing: marketing
    });
    this.visible = false;
    location.reload();
  }

  refuseAll() {
    this.cookies.setConsent({
      necessary: true,
      analytics: false,
      marketing: false,
    });
    this.visible = false;
  }
}
