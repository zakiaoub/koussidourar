import { Component } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";

@Component({
  selector: 'app-account-inactive',
  imports: [TranslationModule, IconComponent],
  templateUrl: './account-inactive.component.html',
  styleUrl: './account-inactive.component.css'
})

export class AccountInactiveComponent {

  reloadPage():void {
    window.location.reload()
  }

}
