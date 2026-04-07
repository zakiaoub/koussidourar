import { Component, signal } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { ContactFormComponent } from "@app/shared/components/forms/contact-form/contact-form.component";
import { TopBannerComponent } from '@app/shared/components/banner/top-banner/top-banner.component';
import { TranslationModule } from '@app/core/modules/translation.module';
import { environment } from 'environments/environment'

@Component({
  selector: 'app-contact',
  imports: [TopBannerComponent, TranslationModule, CheckboxModule, CommonModule, IconComponent, ContactFormComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})

export class ContactComponent {

  phone = environment.NG_APP_PHONE
  address = environment.NG_APP_ADDRESS
}
