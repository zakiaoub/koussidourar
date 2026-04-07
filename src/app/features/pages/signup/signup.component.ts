import { Component } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { CommonModule } from '@angular/common';
import { AccountGradientComponent } from '@app/features/account/templates/account-gradient/account-gradient.component';
import { SignupFormComponent } from "@app/shared/components/forms/signup-form/signup-form.component";
import { GoogleAuthFieldComponent } from '@app/shared/components/fields/google-auth-field/google-auth-field.component';
import { FacebookAuthFieldComponent } from '@app/shared/components/fields/facebook-auth-field/facebook-auth-field.component';

@Component({
  selector: 'app-signup',
  imports: [TranslationModule, CommonModule, AccountGradientComponent, SignupFormComponent, GoogleAuthFieldComponent, FacebookAuthFieldComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {

}
