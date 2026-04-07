import { Component, Input } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";

@Component({
  selector: 'app-account-active',
  imports: [TranslationModule, IconComponent],
  templateUrl: './account-active.component.html',
  styleUrl: './account-active.component.css'
})
export class AccountActiveComponent {


  @Input() appName: string

}
