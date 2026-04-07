import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { AttractionCategoryComponent } from '@features/attractions/components/attraction-category/attraction-category.component';
import { ButtonComponent } from '@app/shared/components/widgets/button/button.component';
import { RatingComponent } from "@app/shared/components/widgets/rating/rating.component";
import { RandomNumberPipe } from '@app/shared/pipes/random-number.pipe';
import { NotationPipe } from '@app/shared/pipes/notation.pipe';
import { FixedPipe } from '@app/shared/pipes/fixed.pipe';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { AdDiscountComponent } from "@app/shared/components/banner/ad-discount/ad-discount.component";
import { TranslationModule } from '@app/core/modules/translation.module';
import { ReqService } from '@app/core/services/req.service';
import { ToastService } from '@app/core/services/toast.service';
import { AmountComponent } from '@app/shared/components/settings/components/amount/amount.component';

@Component({
  selector: 'app-attraction-flex',
  imports: [TranslationModule, CommonModule, DialogModule, FormsModule, DropdownModule, ButtonComponent, RatingComponent, RandomNumberPipe, NotationPipe, FixedPipe, IconComponent, AdDiscountComponent, AmountComponent, AttractionCategoryComponent, AmountComponent],
  templateUrl: './attraction-flex.component.html',
  styleUrl: './attraction-flex.component.css'
})

export class AttractionFlexComponent {

  constructor(private api: ReqService, private toastService: ToastService) { }

  data = signal<any>([])
  isLoading = signal<Record<string, boolean>>({});

  @Input() items!: any;
  @Input() searchToken!: any;

  getCategories(attraction: any) {
    this.isLoading.update(prev => ({ ...prev, [attraction.ActivityCode]: true }));

    this.api.get(['activity', 'category', attraction?.ActivityCode, this.searchToken].join('/')).subscribe({
      next: (response: any) => {
        if (response?.result?.count) {
          this.data.set(response?.result)
          this.showDialog(attraction?.ActivityCode)
        }
        this.isLoading.update(prev => ({ ...prev, [attraction.ActivityCode]: false }));
      },
      error: () => {
        this.toastService.show({ severity: 'error', summary: 'error', detail: 'error_request', life: 3000 });
        this.isLoading.update(prev => ({ ...prev, [attraction.ActivityCode]: false }));
      }
    })
  }

  visible: Record<string, boolean> = {};

  showDialog(activityCode: string) {
    this.visible[activityCode] = true;
  }

  Disabled() {
    alert("Cette option est désactivée tomporairement !!!")
  }

  stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').slice(0,90);
}
}

