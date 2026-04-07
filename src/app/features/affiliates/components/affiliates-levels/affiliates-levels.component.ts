import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import data from "@assets/json/ranks.json"
import { TooltipModule } from 'primeng/tooltip';
import { TranslationModule } from '@app/core/modules/translation.module';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";

@Component({
  selector: 'app-affiliates-levels',
  imports: [CommonModule, TranslationModule, CommonModule, TooltipModule, IconComponent],
  templateUrl: './affiliates-levels.component.html',
  styleUrl: './affiliates-levels.component.css'
})
export class AffiliatesLevelsComponent {

  data: any = data.ranks

  isBoolean(value: any): boolean {
    return typeof value === 'boolean';
  }

}
