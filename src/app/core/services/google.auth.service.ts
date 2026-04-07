import { Injectable, NgZone } from '@angular/core';
import { environment } from '@env/environment';
import { AuthService } from './auth.service';
import { FormDataService } from './form-data.service';
import { ToastService } from './toast.service';

declare var google: any;

@Injectable({
    providedIn: 'root'
})

export class GoogleAuthService {

    constructor(
        private authService: AuthService,
        private formDataService: FormDataService,
        private toastService: ToastService,
        private ngZone: NgZone
    ) { }

    init() {
        google.accounts.id.initialize({
            client_id: environment.NG_APP_GOOGLE_API_ID,
            callback: (response: any) => {
                if (response.credential) {
                    this.handleLoginGoogle(response.credential);
                }
            },
            auto_select: false,
            cancel_on_tap_outside: true
        });

        google.accounts.id.prompt((notification: any) => {
            console.log('OneTap notification:', notification);
        });

    }

    handleLoginGoogle(token: string) {
        this.ngZone.run(() => {
            const payload = { token: token };

            this.authService.handleCredentialGoogleTokenResponse(payload)
                .subscribe({
                    next: (res: any) => {
                        if (res?.status && res?.code === 200 && res?.result?.bearerToken) {
                            this.formDataService.sendData('bearer', res.result.bearerToken);
                            this.formDataService.sendData('sessionAt', new Date().getTime());
                            this.formDataService.sendData('timeout', res.result.timeout);
                            this.formDataService.sendData('profile', res.result.profile);
                            window.location.href = '/';
                        } else {
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
                        this.toastService.show({
                            severity: 'error',
                            summary: 'error',
                            detail: 'error_request',
                            life: 3000
                        });
                    }
                });
        });
    }
}