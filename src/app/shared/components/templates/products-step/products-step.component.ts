import { Component } from '@angular/core';
import { TranslationModule } from '../../../../core/modules/translation.module';
import { CommonModule } from '@angular/common';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";

export interface Data {
  icon: string;
  label: string;
  caption: string;
}

@Component({
  selector: 'app-products-step',
  imports: [TranslationModule, CommonModule, IconComponent],
  templateUrl: './products-step.component.html',
  styleUrl: './products-step.component.css'
})
export class ProductsStepComponent {

  data: Data[] = [
    {icon:'search', label:'browse', caption: 'browse_process_caption'},
    {icon:'sliders2', label:'selection', caption: 'select_process_caption'},
    {icon:'book', label:'information', caption: 'information_process_caption'},
    {icon:'credit-card', label:'payment', caption: 'payment_process_caption'},
  ]
}
