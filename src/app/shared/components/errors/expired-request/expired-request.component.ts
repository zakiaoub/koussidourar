import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { IconComponent } from '../../widgets/icon/icon.component';
import { ButtonComponent } from '../../widgets/button/button.component';
import { FormDataService } from '@app/core/services/form-data.service';
import { ReqService } from '@app/core/services/req.service';
import { ToastService } from '@app/core/services/toast.service';

@Component({
  selector: 'app-expired-request',
  imports: [CommonModule, TranslationModule, IconComponent, ButtonComponent],
  templateUrl: './expired-request.component.html',
  styleUrl: './expired-request.component.css'
})
export class ExpiredRequestComponent {

  constructor(private formDataService: FormDataService, private api: ReqService, private toast: ToastService) { }

  isLoading = signal<boolean>(false)
  @Input() target: string

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
