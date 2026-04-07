import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { CopyTextDirective } from '@app/shared/directives/copyText';
import { TranslationModule } from '@app/core/modules/translation.module';
import { AuthService } from '@app/core/services/auth.service';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { FormDataService } from '@app/core/services/form-data.service';

interface Features {
  icon: string;
  label: string;
  caption: string;
}

@Component({
  selector: 'app-ad-referral-program',
  imports: [IconComponent, TagModule, TranslationModule, CommonModule, CopyTextDirective, TooltipModule],
  templateUrl: './ad-referral-program.component.html',
  styleUrl: './ad-referral-program.component.css'
})

export class AdReferralProgramComponent {

  constructor(
    private auth: AuthService,
    private formDataService: FormDataService
  ) { }


  @Input() layout: string
  isAuth: boolean
  referral_code: string

  ngOnInit(): void {
    this.isAuth = this.auth.checkAuthentication()
    this.referral_code = this.formDataService.getData('profile')?.referral_code
  }

  data: Features[] = [
    { icon: "hand-index", label: 'simple', caption: 'simple_caption' },
    { icon: "trophy", label: 'advantageous', caption: 'advantageous_caption' },
    { icon: "cash-coin", label: 'equitable', caption: 'equitable_caption' }
  ]
}
