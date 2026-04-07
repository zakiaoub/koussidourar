import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationModule } from '@app/core/modules/translation.module';
import { GalleriaModule } from 'primeng/galleria';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonComponent } from '@app/shared/components/widgets/button/button.component';
import { RatingComponent } from "@app/shared/components/widgets/rating/rating.component";
import { RandomNumberPipe } from '@app/shared/pipes/random-number.pipe';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { ReqService } from '@app/core/services/req.service';
import { ToastService } from '@app/core/services/toast.service';
import { AttractionCategoryComponent } from '../../components/attraction-category/attraction-category.component';
import { AmountComponent } from '@app/shared/components/settings/components/amount/amount.component';

@Component({
  selector: 'app-attraction-card',
  imports: [CommonModule, TranslationModule, GalleriaModule, DialogModule, ToastModule, DropdownModule, ButtonComponent, RatingComponent, RandomNumberPipe, IconComponent, AmountComponent, AttractionCategoryComponent],
  templateUrl: './attraction-card.component.html',
  styleUrl: './attraction-card.component.css'
})

export class AttractionCardComponent {

  constructor(private api: ReqService, private toastService: ToastService) { }

  @Input() items!: any;
  @Input() searchToken!: any;

  data = signal<any>([])
  isLoading = signal<Record<string, boolean>>({});
  overlay: Record<number, boolean> = {};
  visible: Record<string, boolean> = {};

  showDialog(activityCode: string) {
    this.visible[activityCode] = true;
  }

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
}
