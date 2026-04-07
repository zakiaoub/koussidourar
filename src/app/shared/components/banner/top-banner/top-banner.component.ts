import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationModule } from '@app/core/modules/translation.module';
import { IconComponent } from '../../widgets/icon/icon.component';

@Component({
  selector: 'app-top-banner',
  imports: [RouterLink, TranslationModule, IconComponent],
  templateUrl: './top-banner.component.html',
  styleUrl: './top-banner.component.css'
})
export class TopBannerComponent {

  @Input() target: string = ""
}
