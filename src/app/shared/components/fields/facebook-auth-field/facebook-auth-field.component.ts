import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { TranslationModule } from '@app/core/modules/translation.module';
import { SpinnerComponent } from '../../loaders/spinner/spinner.component';

@Component({
  selector: 'app-facebook-auth-field',
  imports: [CommonModule, TranslationModule, SpinnerComponent],
  templateUrl: './facebook-auth-field.component.html',
  styleUrl: './facebook-auth-field.component.css'
})

export class FacebookAuthFieldComponent {

  isLoading = signal<boolean>(false);

}
