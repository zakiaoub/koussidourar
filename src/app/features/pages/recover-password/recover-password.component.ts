import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslationModule } from '@modules/translation.module';
import { CheckboxModule } from 'primeng/checkbox';
import { AccountGradientComponent } from '@app/features/account/templates/account-gradient/account-gradient.component';
import { RecoverPasswordFormComponent } from '@app/shared/components/forms/recover-password-form/recover-password-form.component';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [
    CommonModule,
    TranslationModule,
    CheckboxModule,
    AccountGradientComponent,
    RecoverPasswordFormComponent
  ],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.css'
})

export class RecoverPasswordComponent {
}
