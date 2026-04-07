import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { SumPipe } from '@app/shared/pipes/sum.pipe';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { TranslationModule } from '@app/core/modules/translation.module';

@Component({
  selector: 'app-form-display-small',
  imports: [CommonModule, TranslationModule, InputTextModule, IftaLabelModule, SumPipe, IconComponent],
  templateUrl: './form-display-small.component.html',
  styleUrl: './form-display-small.component.css'
})
export class FormDisplaySmallComponent {

  @Input() params: any
  @Input() service: string

  parseDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  }

}
