import { CommonModule } from '@angular/common';
import { Component, input, Input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslationModule } from '@app/core/modules/translation.module';
import { DropdownModule } from 'primeng/dropdown';
import { format } from "date-fns";
import { ButtonComponent } from '@app/shared/components/widgets/button/button.component';
import { SelectModule } from 'primeng/select';
import { ReqService } from '@app/core/services/req.service';
import { ToastService } from '@app/core/services/toast.service';
import { NoResultsFoundComponent } from '@app/shared/components/errors/no-results-found/no-results-found.component';
import { AmountComponent } from "@app/shared/components/settings/components/amount/amount.component";

@Component({
  selector: 'app-attraction-category',
  imports: [FormsModule, CommonModule, TranslationModule, DropdownModule, ButtonComponent, SelectModule, NoResultsFoundComponent, AmountComponent],
  templateUrl: './attraction-category.component.html',
  styleUrl: './attraction-category.component.css'
})

export class AttractionCategoryComponent {

  constructor(private api: ReqService, private toast: ToastService) { }

  data = input<any>();
  count = input<number>();
  @Input() ActivityCode: string;
  @Input() searchToken: string;

  isLoading = signal<Record<string, boolean>>({});

  onSubmit(NumberOfDay: number, RateKey: any, DateFrom: string) {
    this.isLoading.update(prev => ({ ...prev, [RateKey]: true }));

    const date = format(new Date(DateFrom), 'yyyy/MM/dd')

    this.api.get(['activity', 'checkrate', date, this.ActivityCode, NumberOfDay, this.searchToken, RateKey].join('/')).subscribe({
      next: (response: any) => {
        window.location.href = ['attractions', this.searchToken, date, response.result.category.Adult, response.result.category.Child, this.ActivityCode, NumberOfDay, RateKey].join('/');
        this.isLoading.update(prev => ({ ...prev, [RateKey]: false }));
      },
      error: () => {
        this.toast.show({ severity: 'error', summary: 'error', detail: 'error_request', life: 3000 });
        this.isLoading.update(prev => ({ ...prev, [RateKey]: false }));
      }
    })
  }
}
