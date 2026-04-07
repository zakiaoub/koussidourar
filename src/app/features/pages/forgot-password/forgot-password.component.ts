import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslationModule } from '@modules/translation.module';
import { AccountGradientComponent } from '@app/features/account/templates/account-gradient/account-gradient.component';
import { ForgotPasswordFormComponent } from '@app/shared/components/forms/forgot-password-form/forgot-password-form.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    TranslationModule,
    AccountGradientComponent,
    ForgotPasswordFormComponent
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})

export class ForgotPasswordComponent {

}
