import { Component, Input } from '@angular/core';
import { TranslationModule } from '../../../../core/modules/translation.module';

@Component({
  selector: 'app-login-banner',
  imports: [TranslationModule],
  templateUrl: './login-banner.component.html',
  styleUrl: './login-banner.component.css'
})

export class LoginBannerComponent {

  @Input() caption: string = ""
  @Input() href: string = ""
  @Input() login: string = ""
  @Input() register: string = ""

}
