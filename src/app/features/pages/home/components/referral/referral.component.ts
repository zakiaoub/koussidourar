import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TranslationModule } from '@app/core/modules/translation.module';
import { CarouselModule } from 'primeng/carousel';
import { CarousleService } from '@app/core/services/carousel-service.service';
import { AdReferralProgramComponent } from "@app/shared/components/banner/ad-referral-program/ad-referral-program.component";

@Component({
  selector: 'app-referral',
  imports: [CommonModule, ToastModule, ButtonModule, RippleModule, TranslationModule, CarouselModule, AdReferralProgramComponent],
  templateUrl: './referral.component.html',
  styleUrl: './referral.component.css',
  providers: [CarousleService]
})

export class ReferralComponent {

}
