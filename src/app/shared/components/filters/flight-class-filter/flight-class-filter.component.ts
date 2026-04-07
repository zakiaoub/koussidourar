import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslationModule } from '@app/core/modules/translation.module';
import { FormDataService } from '@app/core/services/form-data.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SkeletonModule } from 'primeng/skeleton';
import { ProgressBar } from 'primeng/progressbar';
import { ReqService } from '@app/core/services/req.service';
import { ToastService } from '@app/core/services/toast.service';

@Component({
  selector: 'app-flight-class-filter',
  imports: [RadioButtonModule, FormsModule, CommonModule, TranslationModule, SkeletonModule, ProgressBar],
  templateUrl: './flight-class-filter.component.html',
  styleUrl: './flight-class-filter.component.css'
})

export class FlightClassFilterComponent {

  constructor(private formDataService: FormDataService, private api: ReqService, private toast: ToastService) { }

  class!: string;
  isLoading = signal<boolean>(false)

  data = [
    { title: 'Toutes', value: 'ALL' },
    { title: 'economy', value: 'Y' },
    { title: 'business', value: 'C' },
    { title: 'first', value: 'F' },
  ]

  ngOnInit(): void {
    let params = this.formDataService.getData('flightParams')
    this.class = params.dataPost.Cabin
  }

  flight() {

    this.isLoading.set(true)

    const payload = this.formDataService.getData('flightParams')


    if (payload && payload.dataPost) {
      payload.dataPost.Cabin = this.class;
    }

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
}
