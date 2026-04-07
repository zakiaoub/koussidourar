import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { ButtonComponent } from '@app/shared/components/widgets/button/button.component';
import { DialogModule } from 'primeng/dialog';
import { ReferralLinkFormComponent } from '@app/shared/components/forms/referral-link-form/referral-link-form.component';

@Component({
  selector: 'app-referrals-link',
  imports: [CommonModule, TranslationModule, ButtonComponent, DialogModule, ReferralLinkFormComponent],
  templateUrl: './referrals-link.component.html',
  styleUrl: './referrals-link.component.css'
})

export class ReferralsLinkComponent {

  @Input() referralLink: string
  @Input() referralCode: string

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }
}
