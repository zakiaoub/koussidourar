import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { SumPipe } from '@app/shared/pipes/sum.pipe';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { TranslationModule } from '@app/core/modules/translation.module';
import { CityImageComponent } from '../../widgets/city-image/city-image.component';

@Component({
  selector: 'app-form-display',
  imports: [CommonModule, TranslationModule, CityImageComponent, InputTextModule, IftaLabelModule, SumPipe, IconComponent],
  templateUrl: './form-display.component.html',
  styleUrl: './form-display.component.css'
})

export class FormDisplayComponent {
  @Input() params: any
  @Input() service: string
  @Input() buttonDisplay: boolean = true

  parseDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  }

}
