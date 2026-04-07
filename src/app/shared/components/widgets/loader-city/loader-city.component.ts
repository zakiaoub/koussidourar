import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CityImageComponent } from '@app/shared/components/widgets/city-image/city-image.component';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { TranslationModule } from '../../../../core/modules/translation.module';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";

@Component({
  selector: 'app-loader-city',
  imports: [CityImageComponent, DialogModule, CommonModule, TranslationModule, IconComponent],
  templateUrl: './loader-city.component.html',
  styleUrl: './loader-city.component.css',
  encapsulation: ViewEncapsulation.None
})

export class LoaderCityComponent {

  @Input() height: string
  @Input() city: string
  @Input() country: string
  @Input() visible: boolean = false;
}
