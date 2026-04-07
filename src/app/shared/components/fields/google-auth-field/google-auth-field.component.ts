import { CommonModule } from '@angular/common';
import { Component, NgZone, signal } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { AuthService } from '@app/core/services/auth.service';
import { FormDataService } from '@app/core/services/form-data.service';
import { ToastService } from '@app/core/services/toast.service';
import { environment } from '@env/environment';
import { SpinnerComponent } from '../../loaders/spinner/spinner.component';

declare var google: any;

@Component({
  selector: 'app-google-auth-field',
  imports: [CommonModule, TranslationModule, SpinnerComponent],
  templateUrl: './google-auth-field.component.html',
  styleUrl: './google-auth-field.component.css'
})

export class GoogleAuthFieldComponent {
  constructor(
    private authService: AuthService,
    private formDataService: FormDataService,
    private toastService: ToastService,
    private ngZone: NgZone
  ) { }

  private googleCodeClient: any;

  today: any = new Date();
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.initGoogleAuth();
  }

  initGoogleAuth() {
    this.googleCodeClient = google.accounts.oauth2.initCodeClient({
      client_id: environment.NG_APP_GOOGLE_API_ID,
      scope: 'openid profile email',
      ux_mode: 'popup',
      callback: (response: any) => {
        if (response.code) {
          this.handleLoginGoogle(response.code);
        }
      },
    });
  }

  googleConnexion() {
    if (this.googleCodeClient) {
      this.googleCodeClient.requestCode();
    }
  }

  handleLoginGoogle(authCode: string) {
    this.ngZone.run(() => {
      const payload = { code: authCode };

      this.isLoading.set(true);

      this.authService.handleCredentialGoogleResponse(payload)
        .subscribe({
          next: (res: any) => {
            if (res?.status && res?.code === 200 && res?.result?.bearerToken) {
              this.formDataService.sendData('bearer', res.result.bearerToken);
              this.formDataService.sendData('sessionAt', new Date().getTime());
              this.formDataService.sendData('timeout', res.result.timeout);
              this.formDataService.sendData('profile', res.result.profile);

              this.isLoading.set(false);
              window.location.href = '/';
            } else {
              this.isLoading.set(false);
              this.toastService.show({
                severity: 'error',
                summary: 'error',
                detail: 'login_error_message',
                life: 3000
              });
            }
          },
          error: (err: any) => {
            console.error('Login error', err);
            this.isLoading.set(false);
            this.toastService.show({
              severity: 'error',
              summary: 'error',
              detail: 'error_request',
              life: 3000
            });
          },
          complete: () => {
            this.isLoading.set(false);
          }
        });
    });
  }
}
