import { Component, signal } from '@angular/core';
import { TranslationModule } from '@modules/translation.module';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountInprogressComponent } from "./account-inprogress/account-inprogress.component";
import { AccountActiveComponent } from "./account-active/account-active.component";
import { AccountInactiveComponent } from "./account-inactive/account-inactive.component";
import { AccountGradientComponent } from '@app/features/account/templates/account-gradient/account-gradient.component';
import { ReqService } from '@app/core/services/req.service';
import { environment } from 'environments/environment'

@Component({
  selector: 'app-activate-account',
  imports: [TranslationModule, CommonModule, AccountGradientComponent, AccountInprogressComponent, AccountActiveComponent, AccountInactiveComponent],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.css'
})

export class ActivateAccountComponent {

  constructor(
    private route: ActivatedRoute,
    private api: ReqService
  ) { }

  appName: string = environment.NG_APP_NAME
  appMail: string = environment.NG_APP_MAIL
  accountStatus: boolean | null = null;

  activateCode: string

  isLoading = signal<boolean>(false)
  error = signal<boolean>(false)

  ngOnInit(): void {
    this.activateCode = this.route.snapshot.paramMap.get('activateCode');
    this.getAccountStatus()
  }

  getAccountStatus() {
    this.isLoading.set(true)

    this.api.get(['register', 'activate', this.activateCode, 'account'].join('/')).subscribe({
      next: (response: any) => {
        if (response.code == 200 && response?.result?.message == 'activated') {
          this.error.set(false)
        }
        else {
          this.error.set(true)
        }
        this.isLoading.set(false)
      },
      error: () => {
        this.error.set(true)
        this.isLoading.set(false)
      }
    })
  }
}
