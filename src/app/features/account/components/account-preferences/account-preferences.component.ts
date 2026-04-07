import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReqService } from '@app/core/services/req.service';
import { ToastService } from '@app/core/services/toast.service';
import { TranslationModule } from '@modules/translation.module';
import { FormDataService } from '@services/form-data.service';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { CookiesService } from '@app/core/services/cookies.service';

@Component({
  selector: 'app-account-preferences',
  imports: [TranslationModule, ToggleSwitch, FormsModule, CommonModule],
  templateUrl: './account-preferences.component.html',
  styleUrl: './account-preferences.component.css'
})

export class AccountPreferencesComponent {

  constructor(private formDataService: FormDataService, private api: ReqService, private toastService: ToastService, private cookies: CookiesService) { }

  profile: any

  cookiesData: boolean
  text = signal<string>(null)

  ngOnInit(): void {
    this.profile = this.formDataService.getData('profile')
     this.cookiesData = this.cookies.isConsentGiven() ? true : false;
  }

  updateProfilePreference(key: string, value: boolean) {
    const payload = {
      param: key,
      value: value ? 1 : 0
    };

    this.api.post('account/update/single', payload).subscribe({
      next: (response: any) => {
        if (response?.code == 200) {
          this.profile[key] = value
          this.formDataService.sendData('profile', this.profile)
        }
        this.toastService.show({ severity: 'success', summary: 'success', detail: 'profile_update_success', life: 3000 });
      },
      error: () => {
        this.toastService.show({ severity: 'error', summary: 'error', detail: 'error_request', life: 3000 });
      }
    })
  }

  onNotificationToggle(value: boolean) {
    this.updateProfilePreference('is_send_notification', value);
  }

  onEventToggle(value: boolean) {
    this.updateProfilePreference('is_send_event', value);
  }

  onCookiesToggles(value: boolean) {
    if (value) {
      this.cookies.setConsent({
        necessary: true,
        analytics: true,
        marketing: true
      });
      this.toastService.show({ severity: 'success', summary: 'success', detail: 'profile_update_success', life: 3000 });
    } else {
      this.cookies.setConsent({
        necessary: true,
        analytics: false,
        marketing: false,
      });
      this.toastService.show({ severity: 'success', summary: 'success', detail: 'profile_update_success', life: 3000 });
    }
  }
}
