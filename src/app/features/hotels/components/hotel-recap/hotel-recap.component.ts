import { Component, Input } from '@angular/core';
import { TranslationModule } from '../../../../core/modules/translation.module';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@app/shared/components/widgets/button/button.component';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { ScrollToDirective } from '@app/shared/directives/scrollTo';
import { SumPipe } from '@app/shared/pipes/sum.pipe';

@Component({
  selector: 'app-hotel-recap',
  standalone: true,
  imports: [TranslationModule, CommonModule, ButtonComponent, IconComponent, ScrollToDirective, SumPipe],
  templateUrl: './hotel-recap.component.html',
  styleUrl: './hotel-recap.component.css'
})

export class HotelRecapComponent {

  @Input() data: any

  params: any
  amount: any
  count = 0
  isLoading = false

  ngOnInit(): void {
    this.params = this.data.dataPost
  }

  parseDate(dateStr: string): Date | null {
    if (!dateStr) return null;

    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  }
}
