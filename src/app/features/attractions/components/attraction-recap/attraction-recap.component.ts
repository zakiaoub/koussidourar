import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationModule } from '@app/core/modules/translation.module';
import { ButtonComponent } from '@app/shared/components/widgets/button/button.component';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { ScrollToDirective } from '@app/shared/directives/scrollTo';

@Component({
  selector: 'app-attraction-recap',
  imports: [CommonModule, TranslationModule, ButtonComponent, IconComponent, ScrollToDirective],
  templateUrl: './attraction-recap.component.html',
  styleUrl: './attraction-recap.component.css'
})

export class AttractionRecapComponent {
  @Input() data: any
}
