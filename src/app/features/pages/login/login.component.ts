import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslationModule } from '@modules/translation.module';
import { AccountGradientComponent } from '@app/features/account/templates/account-gradient/account-gradient.component';
import { LoginFormComponent } from "@app/shared/components/forms/login-form/login-form.component";
import { GoogleAuthFieldComponent } from '@app/shared/components/fields/google-auth-field/google-auth-field.component';
import { FacebookAuthFieldComponent } from '@app/shared/components/fields/facebook-auth-field/facebook-auth-field.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    TranslationModule,
    AccountGradientComponent,
    LoginFormComponent,
    GoogleAuthFieldComponent,
    FacebookAuthFieldComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {


}
