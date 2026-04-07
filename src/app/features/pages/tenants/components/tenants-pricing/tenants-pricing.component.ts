import { Component } from '@angular/core';
import { TranslationModule } from '@modules/translation.module';
import { CommonModule } from '@angular/common';
import plans from "@assets/json/plans.json"
import { IconComponent } from "@app/shared/components/widgets/icon/icon.component";
import { environment } from 'environments/environment'

@Component({
  selector: 'app-tenants-pricing',
  imports: [TranslationModule, CommonModule, IconComponent],
  templateUrl: './tenants-pricing.component.html',
  styleUrl: './tenants-pricing.component.css'
})

export class TenantsPricingComponent {

  extranetHref: string = environment.NG_APP_EXTRANET_LINK

  data: any = plans.plans

  currentDate = new Date();

  store: boolean = false;

}
