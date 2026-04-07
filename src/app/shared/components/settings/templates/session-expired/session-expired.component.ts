import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { DialogModule } from 'primeng/dialog';
import { SessionService } from '@app/core/services/session.service';
import { Subscription } from 'rxjs';
import { FormDataService } from '@app/core/services/form-data.service';
import { ReqService } from '@app/core/services/req.service';
import { ToastService } from '@app/core/services/toast.service';
import { ButtonComponent } from "@app/shared/components/widgets/button/button.component";

@Component({
  selector: 'app-session-expired',
  imports: [CommonModule, TranslationModule, DialogModule, ButtonComponent],
  templateUrl: './session-expired.component.html',
  styleUrl: './session-expired.component.css'
})

export class SessionExpiredComponent {

  constructor(private sessionService: SessionService, private formDataService: FormDataService, private api: ReqService, private toast: ToastService) { }

  private subscription?: Subscription;

  @Output() action = new EventEmitter<void>();
  @Input() target: string
  isLoading = signal<boolean>(false)
  isTokenExpired: boolean = false;
  visible: boolean = false;

  services = {
    flight: 'flights',
    hotel: 'hotels',
    attraction: 'attractions',
    transfer: 'transfers'
  }

  ngOnInit() {
    this.subscription = this.sessionService.getRemainingTimeObservable().subscribe(timeStr => {
      this.visible = timeStr === '00:00';
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  refreshSearch() {
    switch (this.target) {

      case 'flight':
        this.flight()
        break;

      case 'hotel':
        this.hotel()
        break;

      case 'attraction':
        this.attraction()
        break;

      case 'transfer':
        this.transfer()
        break;

      default:
        break;
    }
  }

  flight() {

    this.isLoading.set(true)

    const payload = this.formDataService.getData('flightParams')

    this.api.post(['flight', 'availability'].join('/'), payload).subscribe({
      next: (response: any) => {
        if (response?.result?.count > 0) {
          var date = response?.result?.first_date.split('-');
          localStorage.setItem('exchangeRate', response?.result?.exchangeRate)
          window.location.href = ['flights', 'results', response?.result?.searchToken, date[2], date[1], date[0]].join('/')
        } else {
          this.toast.show({
            severity: 'error',
            summary: 'error',
            detail: 'error_request',
            life: 3000
          });
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.toast.show({
          severity: 'error',
          summary: 'error',
          detail: 'error_request',
          life: 3000
        });
        this.isLoading.set(false);
      }
    })
  }

  hotel() {

    this.isLoading.set(true)

    const payload = this.formDataService.getData('hotelParams')

    this.api.post(['hotel', 'load'].join('/'), payload).subscribe({
      next: (response: any) => {
        if (response?.result?.count > 0) {
          localStorage.setItem('exchangeRate', response?.result?.exchangeRate)
          window.location.href = ['hotels', 'results', response?.result?.searchToken].join('/')
        } else {
          this.toast.show({
            severity: 'error',
            summary: 'error',
            detail: 'error_request',
            life: 3000
          });
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.toast.show({
          severity: 'error',
          summary: 'error',
          detail: 'error_request',
          life: 3000
        });
        this.isLoading.set(false);
      }
    })
  }

  attraction() {

    this.isLoading.set(true)

    const payload = this.formDataService.getData('attractionParams')

    this.api.post(['activity', 'availability'].join('/'), payload).subscribe({
      next: (response: any) => {
        if (response?.result?.count > 0) {
          localStorage.setItem('exchangeRate', response?.result?.exchangeRate)
          window.location.href = ['attractions', 'results', response?.result?.searchToken].join('/')
        } else {
          this.toast.show({
            severity: 'error',
            summary: 'error',
            detail: 'error_request',
            life: 3000
          });
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.toast.show({
          severity: 'error',
          summary: 'error',
          detail: 'error_request',
          life: 3000
        });
        this.isLoading.set(false);
      }
    })
  }

  transfer() {

    this.isLoading.set(true)

    const payload = this.formDataService.getData('transferParams')

    this.api.post(['transfer', 'availability'].join('/'), payload).subscribe({
      next: (response: any) => {
        if (response?.result?.count > 0) {
          localStorage.setItem('exchangeRate', response?.result?.exchangeRate)
          window.location.href = ['transfers', 'results', response?.result?.searchToken].join('/')
        } else {
          this.toast.show({
            severity: 'error',
            summary: 'error',
            detail: 'error_request',
            life: 3000
          });
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.toast.show({
          severity: 'error',
          summary: 'error',
          detail: 'error_request',
          life: 3000
        });
        this.isLoading.set(false);
      }
    })
  }
}
