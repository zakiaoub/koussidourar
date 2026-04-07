import { Component } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { ButtonComponent } from '@app/shared/components/widgets/button/button.component';
import { IconComponent } from "../../widgets/icon/icon.component";

@Component({
  selector: 'app-promo-code',
  imports: [TranslationModule, CommonModule, FormsModule, IftaLabelModule, ButtonComponent, IconComponent],
  templateUrl: './promo-code.component.html',
  styleUrl: './promo-code.component.css'
})

export class PromoCodeComponent {

  codePromo: string = ""

}
