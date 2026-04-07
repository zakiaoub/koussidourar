import { Component } from '@angular/core';
import { TopBannerComponent } from '@app/shared/components/banner/top-banner/top-banner.component';
import { AccountPreferencesComponent } from '../../components/account-preferences/account-preferences.component';
import { SettingsComponent } from '@app/shared/components/settings/settings.component';
import { AccountPasswordComponent } from '../../components/account-password/account-password.component';
import { TranslationModule } from '@modules/translation.module';
import { AccountProfilComponent } from '../../components/account-profil/account-profil.component';
import { CommonModule } from '@angular/common';
import { AccountDeleteComponent } from "../../components/account-delete/account-delete.component";

@Component({
  selector: 'app-account-overview',
  imports: [TopBannerComponent, AccountPreferencesComponent, SettingsComponent, AccountPasswordComponent, TranslationModule, AccountProfilComponent, CommonModule, AccountDeleteComponent],
  templateUrl: './account-overview.component.html',
  styleUrl: './account-overview.component.css'
})

export class AccountOverviewComponent {

}
